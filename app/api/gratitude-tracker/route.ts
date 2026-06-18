import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

async function ensureTableExists() {
  try {
    await db`
      CREATE TABLE IF NOT EXISTS gratitude_tracker_entries (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        date VARCHAR(10) NOT NULL,
        gratitude1 TEXT NOT NULL,
        gratitude2 TEXT,
        mood_emoji VARCHAR(255) NOT NULL,
        mood_label VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    // Add missing columns if table already existed without them
    await db`ALTER TABLE gratitude_tracker_entries ADD COLUMN IF NOT EXISTS gratitude2 TEXT`.catch(() => {});
    // Also try to alter mood_emoji to be longer in case it was created as VARCHAR(10)
    // and failed due to longer emoji names or React nodes
    await db`ALTER TABLE gratitude_tracker_entries ALTER COLUMN mood_emoji TYPE VARCHAR(255)`.catch(() => {});
    await db`ALTER TABLE gratitude_tracker_entries ALTER COLUMN mood_label TYPE VARCHAR(255)`.catch(() => {});
  } catch (err) {
    console.error('ensureTableExists failed:', err);
  }
}

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month"); // e.g. "2026-05"
  const date = searchParams.get("date"); // e.g. "2026-05-30"

  try {
    await ensureTableExists();

    if (date) {
      const rows = await db`
        SELECT id, date, gratitude1, gratitude2, mood_emoji, mood_label FROM gratitude_tracker_entries
        WHERE user_id = ${userId} AND date = ${date}
        ORDER BY date DESC, id DESC
        LIMIT 1
      `;
      return NextResponse.json(rows[0] || null);
    }

    if (month) {
      const monthStart = month + "-00";
      const monthEnd = month + "-31";
      const rows = await db`
        SELECT id, date, gratitude1, gratitude2, mood_emoji, mood_label FROM gratitude_tracker_entries
        WHERE user_id = ${userId} AND date >= ${monthStart} AND date <= ${monthEnd}
        ORDER BY date ASC, id DESC
      `;
      return NextResponse.json(rows);
    }

    const rows = await db`
      SELECT id, date, gratitude1, gratitude2, mood_emoji, mood_label FROM gratitude_tracker_entries
      WHERE user_id = ${userId}
      ORDER BY date DESC, id DESC
    `;
    return NextResponse.json(rows);
  } catch (err: any) {
    console.error("Failed to fetch gratitude tracker entries:", err);
    return NextResponse.json({ error: "Database error", detail: err.message }, { status: 500 });
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
    const { id, date, gratitude1, gratitude2, moodEmoji, moodLabel } = await req.json();

    if (!id || !date || !gratitude1 || !moodEmoji || !moodLabel) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await db`
      INSERT INTO gratitude_tracker_entries (id, user_id, date, gratitude1, gratitude2, mood_emoji, mood_label, created_at)
      VALUES (${id}, ${userId}, ${date}, ${gratitude1}, ${gratitude2 || null}, ${moodEmoji}, ${moodLabel}, NOW())
      ON CONFLICT (id) DO UPDATE SET
        gratitude1 = EXCLUDED.gratitude1,
        gratitude2 = EXCLUDED.gratitude2,
        mood_emoji = EXCLUDED.mood_emoji,
        mood_label = EXCLUDED.mood_label
    `;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Failed to save gratitude tracker entry:", err);
    return NextResponse.json({ error: "Database error", detail: err.message }, { status: 500 });
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
      DELETE FROM gratitude_tracker_entries WHERE id = ${id} AND user_id = ${userId}
    `;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Failed to delete gratitude tracker entry:", err);
    return NextResponse.json({ error: "Database error", detail: err.message }, { status: 500 });
  }
}
