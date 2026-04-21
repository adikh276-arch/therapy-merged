import { neon } from '@neondatabase/serverless';
import i18n from "@/i18n";

const DATABASE_URL = import.meta.env.VITE_NEON_DATABASE_URL;

export interface SelfCareEntry {
  date: string; // ISO date string YYYY-MM-DD
  didSelfCare: boolean | null;
  activities: string[];
  duration: string;
  preventionReasons: string[];
  helpfulType: string;
  mood: string;
  moodEmoji: string;
}

export const ACTIVITIES = [
  "Exercise", "Meditation", "Journaling", "Reading",
  "Rest / Nap", "Skincare", "Healthy Meal", "Nature / Walk",
  "Social Time", "Hobby", "Therapy", "Digital Detox",
];

export const DURATIONS = [
  "< 10 minutes", "10–30 minutes", "30–60 minutes", "1+ hour",
];

export const PREVENTION_REASONS = [
  "Busy schedule", "Low energy", "Stress", "Forgot",
  "No motivation", "Not feeling well", "Lack of time", "Emotional overwhelm",
];

export const HELPFUL_TYPES = [
  "Rest", "Relaxation", "Physical activity",
  "Talking to someone", "Quiet time", "Creative activity",
];

export const MOODS = [
  { emoji: "😀", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😔", label: "Low" },
  { emoji: "😣", label: "Stressed" },
  { emoji: "😴", label: "Tired" },
];

export const POSITIVE_STATEMENTS = [
  "You showed up for yourself today. That's powerful. 🌿",
  "Self-care isn't selfish — it's essential. Well done. 💚",
  "Every small act of care builds a stronger you. 🌱",
  "You invested in yourself today. That matters. ✨",
  "Taking care of you is the best thing you did today. 🍃",
];

export const SUPPORTIVE_STATEMENTS = [
  "It's okay. Tomorrow is a fresh start. Be gentle with yourself. 🤍",
  "Not every day will be perfect, and that's perfectly fine. 🕊️",
  "You're doing your best. That's always enough. 💛",
  "Rest is also a form of self-care. Give yourself grace. 🌸",
  "Acknowledging today takes courage. You're already growing. 🌷",
];

/**
 * Converts a Date object to a local ISO string (YYYY-MM-DD)
 * correctly handling the user's local timezone.
 */
export function toLocalIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper to get Neon client
function getSql() {
  if (!DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }
  return neon(DATABASE_URL);
}

export async function fetchEntries(userId: string): Promise<SelfCareEntry[]> {
  try {
    const sql = getSql();
    const rows = await sql`
      SELECT * FROM selfcare_entries 
      WHERE user_id = ${userId} 
      ORDER BY date DESC
    `;

    return rows.map(r => {
      // Postgres DATE objects might be interpreted at midnight UTC by the driver.
      // We force it to local interpretation to avoid day-shifting.
      const d = new Date(r.date);
      return {
        date: toLocalIsoDate(d),
        didSelfCare: r.did_self_care,
        activities: r.activities || [],
        duration: r.duration || "",
        preventionReasons: r.prevention_reasons || [],
        helpfulType: r.helpful_type || "",
        mood: r.mood || "",
        moodEmoji: r.mood_emoji || "",
      };
    });
  } catch (err) {
    console.error('Error fetching entries:', err);
    return [];
  }
}

export async function saveEntryToDb(userId: string, entry: SelfCareEntry) {
  try {
    const sql = getSql();
    await sql`
      INSERT INTO selfcare_entries (
        user_id, date, did_self_care, activities, duration, 
        prevention_reasons, helpful_type, mood, mood_emoji
      )
      VALUES (
        ${userId}, ${entry.date}, ${entry.didSelfCare}, ${entry.activities}, ${entry.duration},
        ${entry.preventionReasons}, ${entry.helpfulType}, ${entry.mood}, ${entry.moodEmoji}
      )
      ON CONFLICT (user_id, date) DO UPDATE SET
        did_self_care = EXCLUDED.did_self_care,
        activities = EXCLUDED.activities,
        duration = EXCLUDED.duration,
        prevention_reasons = EXCLUDED.prevention_reasons,
        helpful_type = EXCLUDED.helpful_type,
        mood = EXCLUDED.mood,
        mood_emoji = EXCLUDED.mood_emoji
    `;
  } catch (err) {
    console.error('Error saving entry:', err);
    throw err;
  }
}

export async function fetchLast7Days(userId: string): Promise<SelfCareEntry[]> {
  const entries = await fetchEntries(userId);
  const today = new Date();
  const days: SelfCareEntry[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = toLocalIsoDate(d);
    const found = entries.find((e) => e.date === dateStr);
    if (found) days.push(found);
  }
  return days;
}

export function formatDateShort(dateStr: string): string {
  // Use T00:00:00 to ensure the date is interpreted as the start of the day in LOCAL time
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(i18n.language, { weekday: "short", month: "short", day: "numeric" });
}
