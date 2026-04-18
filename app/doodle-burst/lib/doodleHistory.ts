export interface DoodleEntry {
  doodle_id: string; // From the database schema
  dataUrl: string; // The S3 URL
  timestamp: number;
  date: string; // YYYY-MM-DD
}

export async function getDoodleHistory(): Promise<DoodleEntry[]> {
  const userId = sessionStorage.getItem("user_id");
  if (!userId) return [];

  try {
    const res = await fetch(`/doodle_burst/api/doodles/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch doodles");
    const data = await res.json();
    return data.doodles.map((row: any) => ({
      doodle_id: row.doodle_id,
      dataUrl: row.image_url, // Maps to the fetched Cloudinary URL
      timestamp: new Date(row.created_at).getTime(),
      date: new Date(row.created_at).toISOString().split("T")[0],
    }));
  } catch (error) {
    console.error("Failed to fetch doodle history", error);
    return [];
  }
}

export async function saveDoodle(dataUrl: string): Promise<DoodleEntry | null> {
  const userId = sessionStorage.getItem("user_id");
  if (!userId) return null;

  try {
    const res = await fetch("/doodle_burst/api/doodles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, imageData: dataUrl }),
    });
    if (!res.ok) throw new Error("Failed to save doodle");
    const data = await res.json();
    const now = new Date();

    return {
      doodle_id: data.doodle_id,
      dataUrl: data.image_url,
      timestamp: now.getTime(),
      date: now.toISOString().split("T")[0],
    };
  } catch (error) {
    console.error("Save doodle error", error);
    return null;
  }
}

export async function deleteDoodle(id: string) {
  const userId = sessionStorage.getItem("user_id");
  if (!userId) return;

  try {
    const res = await fetch(`/doodle_burst/api/doodles/${userId}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete doodle");
  } catch (error) {
    console.error("Delete doodle error", error);
  }
}

export function groupByDate(entries: DoodleEntry[]): Record<string, DoodleEntry[]> {
  const groups: Record<string, DoodleEntry[]> = {};
  for (const entry of entries) {
    if (!groups[entry.date]) groups[entry.date] = [];
    groups[entry.date].push(entry);
  }
  return groups;
}
