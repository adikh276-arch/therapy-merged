import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

async function ensureTableExists() {
  await db`
    CREATE TABLE IF NOT EXISTS prediction_vs_reality_entries (
      id VARCHAR(255) PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      entry_data TEXT NOT NULL,
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
      SELECT id, entry_data, created_at FROM prediction_vs_reality_entries 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `;
    return NextResponse.json(rows);
  } catch (err) {
    console.error("Failed to fetch predictions:", err);
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

    if (!entry.id || !entry.situation || !entry.prediction) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const entryDataStr = JSON.stringify(entry);

    await db`
      INSERT INTO prediction_vs_reality_entries (id, user_id, entry_data, created_at)
      VALUES (${entry.id}, ${userId}, ${entryDataStr}, NOW())
      ON CONFLICT (id) 
      DO UPDATE SET entry_data = EXCLUDED.entry_data
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to save prediction:", err);
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
      DELETE FROM prediction_vs_reality_entries WHERE id = ${id} AND user_id = ${userId}
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete prediction:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
