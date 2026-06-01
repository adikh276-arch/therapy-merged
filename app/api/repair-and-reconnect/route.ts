import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

async function ensureTableExists() {
  await db`
    CREATE TABLE IF NOT EXISTS repair_and_reconnect_entries (
      id VARCHAR(255) PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      repair_data TEXT NOT NULL,
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
      SELECT id, repair_data, created_at FROM repair_and_reconnect_entries 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `;
    return NextResponse.json(rows);
  } catch (err) {
    console.error("Failed to fetch repair logs:", err);
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
    const { id, repairData } = await req.json();

    if (!id || !repairData) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const repairDataStr = typeof repairData === "string" ? repairData : JSON.stringify(repairData);

    await db`
      INSERT INTO repair_and_reconnect_entries (id, user_id, repair_data, created_at)
      VALUES (${id}, ${userId}, ${repairDataStr}, NOW())
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to save repair log:", err);
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
      DELETE FROM repair_and_reconnect_entries WHERE id = ${id} AND user_id = ${userId}
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete repair log:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
