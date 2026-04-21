export type MoodLevel = 'great' | 'good' | 'okay' | 'low' | 'difficult';

export type Factor = 'Work' | 'Sleep' | 'Health' | 'Relationships' | 'Recovery' | 'Other';

export type TobaccoUrge = 'none' | 'mild' | 'strong';

export interface MoodLog {
  id: string;
  timestamp: number;
  date: string; // YYYY-MM-DD
  mood: MoodLevel;
  factors?: Factor[];
  tobaccoUrge?: TobaccoUrge;
  notes?: string;
}

export const MOOD_CONFIG: Record<MoodLevel, { emoji: string; label: string; colorClass: string }> = {
  great: { emoji: '😄', label: 'Great', colorClass: 'mood-great' },
  good: { emoji: '🙂', label: 'Good', colorClass: 'mood-good' },
  okay: { emoji: '😐', label: 'Okay', colorClass: 'mood-okay' },
  low: { emoji: '😟', label: 'Low', colorClass: 'mood-low' },
  difficult: { emoji: '😣', label: 'Difficult', colorClass: 'mood-difficult' },
};

export const FACTORS: Factor[] = ['Work', 'Sleep', 'Health', 'Relationships', 'Recovery', 'Other'];
