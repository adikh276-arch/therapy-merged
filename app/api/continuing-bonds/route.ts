import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

async function ensureTableExists() {
  await db`
    CREATE TABLE IF NOT EXISTS continuing_bonds_entries (
      id VARCHAR(255) PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      bond_data TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

    // Auto-backfill any missing columns for legacy migrations
    await db`ALTER TABLE continuing_bonds_entries ADD COLUMN IF NOT EXISTS id VARCHAR(255)`.catch(() => {});
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
      SELECT id, bond_data, created_at FROM continuing_bonds_entries 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `;
    return NextResponse.json(rows);
  } catch (err) {
    console.error("Failed to fetch bond reflections:", err);
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
    const { id, bondData } = await req.json();

    if (!id || !bondData) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const bondDataStr = typeof bondData === "string" ? bondData : JSON.stringify(bondData);

    await db`
      INSERT INTO continuing_bonds_entries (id, user_id, bond_data, created_at)
      VALUES (${id}, ${userId}, ${bondDataStr}, NOW())
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to save bond reflection:", err);
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
      DELETE FROM continuing_bonds_entries WHERE id = ${id} AND user_id = ${userId}
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete bond reflection:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
