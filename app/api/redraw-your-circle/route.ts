import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

async function ensureTableExists() {
  await db`
    CREATE TABLE IF NOT EXISTS redraw_your_circle_entries (
      id VARCHAR(255) PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      circles TEXT NOT NULL,
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
      SELECT id, circles, created_at FROM redraw_your_circle_entries 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `;
    return NextResponse.json(rows);
  } catch (err) {
    console.error("Failed to fetch circles:", err);
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
    const { id, circles } = await req.json();

    if (!id || !circles) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const circlesStr = typeof circles === "string" ? circles : JSON.stringify(circles);

    await db`
      INSERT INTO redraw_your_circle_entries (id, user_id, circles, created_at)
      VALUES (${id}, ${userId}, ${circlesStr}, NOW())
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to save circle:", err);
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
      DELETE FROM redraw_your_circle_entries WHERE id = ${id} AND user_id = ${userId}
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete circle:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
