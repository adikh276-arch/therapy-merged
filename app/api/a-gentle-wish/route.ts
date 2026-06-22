import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

async function ensureTableExists() {
  await db`
    CREATE TABLE IF NOT EXISTS gentle_wish_entries (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      wish_data JSONB NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Auto-backfill any missing columns for legacy migrations
  await db`ALTER TABLE gentle_wish_entries ADD COLUMN IF NOT EXISTS user_id VARCHAR(255)`.catch(() => {});
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
      SELECT id, wish_data, created_at 
      FROM gentle_wish_entries 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `;

    const formatted = rows.map(r => ({
      id: r.id.toString(),
      ...r.wish_data
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("Failed to fetch gentle wishes:", err);
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

    if (!body.wish) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await db`
      INSERT INTO gentle_wish_entries (user_id, wish_data)
      VALUES (${userId}, ${JSON.stringify(body)}::jsonb)
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to save gentle wish:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
