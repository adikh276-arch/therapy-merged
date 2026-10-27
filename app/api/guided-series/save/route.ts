import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { concern, activityName, entryData } = await req.json();

  if (!concern || !activityName || !entryData) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    await db`
      CREATE TABLE IF NOT EXISTS guided_series_logs (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        concern VARCHAR(255) NOT NULL,
        activity_name VARCHAR(255) NOT NULL,
        entry_data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await db`ALTER TABLE guided_series_logs ALTER COLUMN user_id TYPE VARCHAR(255) USING user_id::VARCHAR`.catch(() => {});

    try {
      await db`
        INSERT INTO guided_series_logs (user_id, concern, activity_name, entry_data)
        VALUES (${String(userId)}, ${String(concern)}, ${String(activityName)}, ${JSON.stringify(entryData)})
      `;
    } catch (insertErr: any) {
      const errMsg = String(insertErr?.message || "").toLowerCase();
      if (errMsg.includes('bigint') || errMsg.includes('integer') || errMsg.includes('numeric')) {
        const numericUserId = BigInt(String(userId).replace(/\D/g, '') || "1");
        await db`
          INSERT INTO guided_series_logs (user_id, concern, activity_name, entry_data)
          VALUES (${numericUserId.toString()}::bigint, ${String(concern)}, ${String(activityName)}, ${JSON.stringify(entryData)})
        `;
      } else {
        throw insertErr;
      }
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Failed to save guided series log:", err);
    return NextResponse.json({ error: "Database error", detail: err?.message }, { status: 500 });
  }
}
