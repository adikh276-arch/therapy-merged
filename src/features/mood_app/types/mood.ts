export type MoodType = 'great' | 'good' | 'okay' | 'low' | 'difficult';
export type TobaccoUrge = 'none' | 'mild' | 'strong';
export type FactorType = 'Work' | 'Sleep' | 'Health' | 'Relationships' | 'Recovery' | 'Other';

export interface MoodEntry {
  id?: number;
  user_id: number;
  timestamp: string;
  date: string;
  mood: MoodType;
  factors?: FactorType[];
  tobacco_urge?: TobaccoUrge;
  notes?: string;
}

export const MOODS: { type: MoodType; emoji: string; label: string }[] = [
  { type: 'great', emoji: '😄', label: 'Great' },
  { type: 'good', emoji: '🙂', label: 'Good' },
  { type: 'okay', emoji: '😐', label: 'Okay' },
  { type: 'low', emoji: '😟', label: 'Low' },
  { type: 'difficult', emoji: '😣', label: 'Difficult' },
];

export const FACTORS: FactorType[] = ['Work', 'Sleep', 'Health', 'Relationships', 'Recovery', 'Other'];

export const MOOD_BG: Record<MoodType, string> = {
  great: 'bg-mood-great',
  good: 'bg-mood-good',
  okay: 'bg-mood-okay',
  low: 'bg-mood-low',
  difficult: 'bg-mood-difficult',
};

export const MOOD_BG_LIGHT: Record<MoodType, string> = {
  great: 'bg-mood-great-light',
  good: 'bg-mood-good-light',
  okay: 'bg-mood-okay-light',
  low: 'bg-mood-low-light',
  difficult: 'bg-mood-difficult-light',
};

export const MOOD_HEX: Record<MoodType, string> = {
  great: '#4ade80',
  good: '#60a5fa',
  okay: '#9ca3af',
  low: '#fbbf24',
  difficult: '#f87171',
};
