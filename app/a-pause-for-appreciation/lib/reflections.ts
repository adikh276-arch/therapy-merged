export interface ReflectionEntry {
  id: string;
  timestamp: string;
  responses: string[];
  intention: string;
  checkIn: string;
}

const STORAGE_KEY = "reflection-history";

export function getReflections(): ReflectionEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveReflection(entry: ReflectionEntry) {
  const existing = getReflections();
  existing.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function deleteReflection(id: string) {
  const existing = getReflections().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}
