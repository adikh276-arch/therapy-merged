import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

async function ensureTableExists() {
  await db`
    CREATE TABLE IF NOT EXISTS gratitude_diary_entries (
      id VARCHAR(255) PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      date VARCHAR(255) NOT NULL,
      feeling VARCHAR(255) NOT NULL,
      gratitudes TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

    // Auto-backfill any missing columns for legacy migrations
    await db`ALTER TABLE gratitude_diary_entries ADD COLUMN IF NOT EXISTS id VARCHAR(255)`.catch(() => {});
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
      SELECT id, date, feeling, gratitudes FROM gratitude_diary_entries 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `;
    const formattedRows = rows.map((r: any) => ({
      ...r,
      date: r.date instanceof Date ? r.date.toISOString().split('T')[0] : (typeof r.date === 'string' ? r.date.split('T')[0] : r.date)
    }));
    return NextResponse.json(formattedRows);
  } catch (err) {
    console.error("Failed to fetch gratitude diary entries:", err);
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
    const { id, date, feeling, gratitudes } = await req.json();

    if (!id || !date || !feeling || !gratitudes) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const gratitudesStr = typeof gratitudes === "string" ? gratitudes : JSON.stringify(gratitudes);

    await db`
      INSERT INTO gratitude_diary_entries (id, user_id, date, feeling, gratitudes, created_at)
      VALUES (${id}, ${userId}, ${date}, ${feeling}, ${gratitudesStr}, NOW())
      ON CONFLICT (id) DO UPDATE SET
        feeling = EXCLUDED.feeling,
        gratitudes = EXCLUDED.gratitudes
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to save gratitude diary entry:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }

  try {
    await ensureTableExists();
    await db`
      DELETE FROM gratitude_diary_entries WHERE id = ${id} AND user_id = ${userId}
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete gratitude diary entry:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
