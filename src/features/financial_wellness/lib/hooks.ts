import { useEffect, useRef } from 'react';
import { storage } from './storage';

/**
 * useAutoSave
 * Automatically saves state to localStorage and syncs with the database API.
 * Now it also maintains a history of saves.
 */
export function useAutoSave(key: string, data: any, options: { debounceMs?: number; enabled?: boolean; isDirty?: boolean } = {}) {
  const { debounceMs = 2000, enabled = true, isDirty = false } = options;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled || !isDirty) return;
    // Skip saving if data is empty/default
    if (!data || Object.keys(data).length === 0) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      // 1. Save to local storage (latest state)
      storage.set(key, data);

      // 2. Save to history (localStorage stack)
      const history = storage.get<any[]>(`${key}_history`, []);
      const newEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        data: JSON.parse(JSON.stringify(data)), // Deep clone
      };
      
      // Keep only last 10 entries for history
      const updatedHistory = [newEntry, ...history].slice(0, 10);
      storage.set(`${key}_history`, updatedHistory);

      // 3. Sync with database API
      try {
        let userId = sessionStorage.getItem("financial_wellbeing_user_id");
        if (!userId || userId === "undefined") userId = "anonymous";
        
        await fetch('/financial_wellbeing/api/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            key,
            data,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error('Failed to sync with database:', error);
      }
    }, debounceMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [key, data, debounceMs]);
}
