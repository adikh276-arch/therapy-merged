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
      INSERT INTO guided_series_logs (user_id, concern, activity_name, entry_data)
      VALUES (${userId}, ${concern}, ${activityName}, ${JSON.stringify(entryData)})
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to save guided series log:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
