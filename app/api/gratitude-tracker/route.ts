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
    // PostgreSQL requires USING id::VARCHAR if column was originally BIGINT
    await db`ALTER TABLE gratitude_tracker_entries ALTER COLUMN id TYPE VARCHAR(255) USING id::VARCHAR`.catch(() => {});
    // Ensure user_id column is VARCHAR
    await db`ALTER TABLE gratitude_tracker_entries ALTER COLUMN user_id TYPE VARCHAR(255) USING user_id::VARCHAR`.catch(() => {});
    // Add missing columns if table already existed without them
    await db`ALTER TABLE gratitude_tracker_entries ADD COLUMN IF NOT EXISTS gratitude2 TEXT`.catch(() => {});
    await db`ALTER TABLE gratitude_tracker_entries ALTER COLUMN mood_emoji TYPE VARCHAR(255) USING mood_emoji::VARCHAR`.catch(() => {});
    await db`ALTER TABLE gratitude_tracker_entries ALTER COLUMN mood_label TYPE VARCHAR(255) USING mood_label::VARCHAR`.catch(() => {});
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
        WHERE user_id::text = ${userId}::text AND date = ${date}
        ORDER BY date DESC, id DESC
        LIMIT 1
      `;
      const formattedRows = rows.map((r: any) => ({
        ...r,
        date: r.date instanceof Date ? r.date.toISOString().split('T')[0] : (typeof r.date === 'string' ? r.date.split('T')[0] : r.date)
      }));
      return NextResponse.json(formattedRows[0] || null);
    }

    if (month) {
      const [yearStr, monthStr] = month.split("-");
      const lastDay = new Date(parseInt(yearStr), parseInt(monthStr), 0).getDate();
      const monthStart = `${month}-01`;
      const monthEnd = `${month}-${lastDay}`;
      
      const rows = await db`
        SELECT id, date, gratitude1, gratitude2, mood_emoji, mood_label FROM gratitude_tracker_entries
        WHERE user_id::text = ${userId}::text AND date >= ${monthStart} AND date <= ${monthEnd}
        ORDER BY date ASC, id DESC
      `;
      const formattedRows = rows.map((r: any) => ({
        ...r,
        date: r.date instanceof Date ? r.date.toISOString().split('T')[0] : (typeof r.date === 'string' ? r.date.split('T')[0] : r.date)
      }));
      return NextResponse.json(formattedRows);
    }

    const rows = await db`
      SELECT id, date, gratitude1, gratitude2, mood_emoji, mood_label FROM gratitude_tracker_entries
      WHERE user_id::text = ${userId}::text
      ORDER BY date DESC, id DESC
    `;
    const formattedRows = rows.map((r: any) => ({
      ...r,
      date: r.date instanceof Date ? r.date.toISOString().split('T')[0] : (typeof r.date === 'string' ? r.date.split('T')[0] : r.date)
    }));
    return NextResponse.json(formattedRows);
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

    // Try standard insertion with id and userId
    try {
      await db`
        INSERT INTO gratitude_tracker_entries (id, user_id, date, gratitude1, gratitude2, mood_emoji, mood_label, created_at)
        VALUES (${String(id)}, ${String(userId)}, ${String(date)}, ${String(gratitude1)}, ${gratitude2 ? String(gratitude2) : null}, ${String(moodEmoji)}, ${String(moodLabel)}, NOW())
        ON CONFLICT (id) DO UPDATE SET
          gratitude1 = EXCLUDED.gratitude1,
          gratitude2 = EXCLUDED.gratitude2,
          mood_emoji = EXCLUDED.mood_emoji,
          mood_label = EXCLUDED.mood_label
      `;
    } catch (insertErr: any) {
      // If the database has id or user_id defined as BIGINT in a legacy table
      const errMsg = String(insertErr?.message || "").toLowerCase();
      if (errMsg.includes('bigint') || errMsg.includes('integer') || errMsg.includes('numeric')) {
        const numericIdStr = String(id).replace(/\D/g, '').slice(0, 15) || String(Date.now());
        const numericId = BigInt(numericIdStr);
        const numericUserIdStr = String(userId).replace(/\D/g, '') || "1";
        const numericUserId = BigInt(numericUserIdStr);

        await db`
          INSERT INTO gratitude_tracker_entries (id, user_id, date, gratitude1, gratitude2, mood_emoji, mood_label, created_at)
          VALUES (${numericId.toString()}::bigint, ${numericUserId.toString()}::bigint, ${String(date)}, ${String(gratitude1)}, ${gratitude2 ? String(gratitude2) : null}, ${String(moodEmoji)}, ${String(moodLabel)}, NOW())
          ON CONFLICT (id) DO UPDATE SET
            gratitude1 = EXCLUDED.gratitude1,
            gratitude2 = EXCLUDED.gratitude2,
            mood_emoji = EXCLUDED.mood_emoji,
            mood_label = EXCLUDED.mood_label
        `;
      } else {
        throw insertErr;
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Failed to save gratitude tracker entry:", err);
    return NextResponse.json({ error: "Database error", detail: err.message }, { status: 400 });
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
