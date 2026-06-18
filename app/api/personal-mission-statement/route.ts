import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

async function ensureTableExists() {
  await db`
    CREATE TABLE IF NOT EXISTS missions (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      statement TEXT NOT NULL,
      values TEXT[] DEFAULT '{}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;

    // Auto-backfill any missing columns for legacy migrations
    await db`ALTER TABLE missions ADD COLUMN IF NOT EXISTS user_id VARCHAR(255`.catch(() => {});
}

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureTableExists();
    const rows = await db`
      SELECT id, statement, values, created_at AS date 
      FROM missions 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `;

    const formattedRows = rows.map((r: any) => ({
      ...r,
      date: r.date instanceof Date ? r.date.toISOString().split('T')[0] : (typeof r.date === 'string' ? r.date.split('T')[0] : r.date)
    }));
    return NextResponse.json(formattedRows);
  } catch (err) {
    console.error("Failed to fetch missions:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureTableExists();
    const body = await req.json();

    if (!body.statement || !body.values) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Convert values array to PostgreSQL text array format string: '{val1,val2}'
    const formattedValues = body.values.map((v: string) => v.replace(/[{"'}]/g, ''));

    const res = await db`
      INSERT INTO missions (user_id, statement, values)
      VALUES (${userId}, ${body.statement}, ${formattedValues})
      RETURNING id, created_at AS date
    `;

    return NextResponse.json({
      success: true,
      id: res[0].id.toString(),
      date: res[0].date,
    });
  } catch (err) {
    console.error("Failed to save mission statement:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureTableExists();
    const url = new URL(req.url);
    const idStr = url.searchParams.get("id");

    if (!idStr) {
      return NextResponse.json({ error: "Missing mission id" }, { status: 400 });
    }

    const id = parseInt(idStr, 10);

    await db`
      DELETE FROM missions 
      WHERE id = ${id} AND user_id = ${userId}
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete mission statement:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
