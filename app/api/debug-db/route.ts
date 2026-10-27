import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const tables = await db`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    return NextResponse.json({ success: true, tables });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, detail: err.stack }, { status: 500 });
  }
}
