// lib/db.ts
import { neon } from "@neondatabase/serverless";

/**
 * Returns a SQL client scoped to a specific Postgres schema.
 *
 * Usage inside any mini:
 *   import { getDb } from "@/lib/db";
 *   const sql = getDb("daily_gratitude_diary");
 *   const rows = await sql`SELECT * FROM entries`;
 */
export function getDb(schema: string) {
  const sql = neon(process.env.DATABASE_URL!);
  const safe = schema.replace(/[^a-z0-9_]/gi, "_").toLowerCase();

  return async function scopedSql(
    strings: TemplateStringsArray,
    ...values: unknown[]
  ) {
    // Note: SET search_path is session-scoped. 
    // Since we are using an HTTP-based neon client, we must prepend it to every call
    // or use schema-qualified names. Prepending SET search_path is one way, 
    // but schema-qualified names are more robust for serverless.
    // However, following the playbook's provided logic:
    await sql`SET search_path TO ${safe}, public`;
    return sql(strings, ...values);
  };
}

// Core schema — users, sessions only
export const coreDb = getDb("core");
