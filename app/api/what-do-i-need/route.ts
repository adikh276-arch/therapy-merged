import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

async function ensureTableExists() {
  await db`
    CREATE TABLE IF NOT EXISTS what_do_i_need_entries (
      id VARCHAR(255) PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      needs TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
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
      SELECT id, needs, created_at FROM what_do_i_need_entries 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `;
    return NextResponse.json(rows);
  } catch (err) {
    console.error("Failed to fetch needs reflections:", err);
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
    const entry = await req.json();

    const id = entry.id || crypto.randomUUID();
    const needsDataStr = JSON.stringify(entry);

    await db`
      INSERT INTO what_do_i_need_entries (id, user_id, needs, created_at)
      VALUES (${id}, ${userId}, ${needsDataStr}, NOW())
      ON CONFLICT (id) 
      DO UPDATE SET needs = EXCLUDED.needs
    `;

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("Failed to save needs reflection:", err);
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
      DELETE FROM what_do_i_need_entries WHERE id = ${id} AND user_id = ${userId}
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete needs reflection:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
