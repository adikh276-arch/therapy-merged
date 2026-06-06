import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const table = searchParams.get("table") || "gratitude_tracker_entries";
    const res = await db`SELECT * FROM gratitude_tracker_entries LIMIT 1`;
    return NextResponse.json({ success: true, data: res });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, detail: err.stack }, { status: 500 });
  }
}
