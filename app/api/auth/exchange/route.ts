// app/api/auth/exchange/route.ts
import { NextRequest, NextResponse } from "next/server";
import { coreDb } from "@/lib/db";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.json({ error: "No token" }, { status: 400 });
  
  try {
    const sql = await coreDb;
    // Note: The getDb function returns a function (scopedSql).
    // In lib/db.ts: export const coreDb = getDb("core");
    // So coreDb is a function.
    
    const rows = await (coreDb as any)`
      SELECT user_id FROM core.sessions
      WHERE token = ${token} AND expires_at > NOW()
    `;
    
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }
    
    return NextResponse.json({ userId: rows[0].user_id });
  } catch (error: any) {
    console.error("Auth exchange error:", error);
    return NextResponse.json({ error: "DB error", details: error.message }, { status: 500 });
  }
}
