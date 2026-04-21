import { Activity } from './types';

export const DEFAULT_ACTIVITIES: Activity[] = [
  // BASIC
  { id: 'shower', name: 'Shower', emoji: '🚿', cost: 15, category: 'basic' },
  { id: 'get-dressed', name: 'Get dressed', emoji: '👔', cost: 8, category: 'basic' },
  { id: 'breakfast', name: 'Breakfast', emoji: '🥣', cost: 5, category: 'basic' },
  { id: 'brush-teeth', name: 'Brush teeth', emoji: '🪥', cost: 3, category: 'basic' },
  { id: 'check-email', name: 'Check email', emoji: '📧', cost: 4, category: 'basic' },
  { id: 'morning-routine', name: 'Morning routine', emoji: '☀️', cost: 25, category: 'basic' },
  { id: 'skincare', name: 'Skincare', emoji: '🧴', cost: 5, category: 'basic' },
  { id: 'hair-styling', name: 'Style hair', emoji: '💇', cost: 8, category: 'basic' },
  { id: 'make-bed', name: 'Make bed', emoji: '🛏️', cost: 4, category: 'basic' },
  { id: 'take-meds', name: 'Take medication', emoji: '💊', cost: 2, category: 'basic' },
  { id: 'bathroom', name: 'Bathroom break', emoji: '🚽', cost: 2, category: 'basic' },
  { id: 'snack', name: 'Have a snack', emoji: '🍎', cost: 3, category: 'basic' },

  // WORK/SOCIAL
  { id: 'meeting-1hr', name: '1-hour meeting', emoji: '💼', cost: 25, category: 'work' },
  { id: 'focused-work', name: 'Focused work (1hr)', emoji: '💻', cost: 20, category: 'work' },
  { id: 'phone-call', name: 'Phone call', emoji: '📞', cost: 15, category: 'social' },
  { id: 'social-event', name: 'Social event (2hr)', emoji: '🎉', cost: 45, category: 'social' },
  { id: 'video-call', name: 'Video call', emoji: '📹', cost: 22, category: 'work' },
  { id: 'email-replies', name: 'Reply to emails', emoji: '✉️', cost: 10, category: 'work' },
  { id: 'quick-chat', name: 'Quick chat', emoji: '💬', cost: 8, category: 'social' },
  { id: 'networking', name: 'Networking event', emoji: '🤝', cost: 40, category: 'social' },
  { id: 'presentation', name: 'Give presentation', emoji: '📊', cost: 35, category: 'work' },
  { id: 'brainstorm', name: 'Brainstorming', emoji: '🧠', cost: 18, category: 'work' },
  { id: 'coffee-date', name: 'Coffee with friend', emoji: '☕', cost: 20, category: 'social' },
  { id: 'family-call', name: 'Family call', emoji: '👨‍👩‍👧', cost: 18, category: 'social' },
  { id: 'text-replies', name: 'Text replies', emoji: '📱', cost: 5, category: 'social' },
  { id: 'date-night', name: 'Date night', emoji: '💕', cost: 35, category: 'social' },

  // HOUSEHOLD
  { id: 'dishes', name: 'Wash dishes', emoji: '🍽️', cost: 10, category: 'household' },
  { id: 'laundry', name: 'Laundry', emoji: '🧺', cost: 18, category: 'household' },
  { id: 'cook-meal', name: 'Cook a meal', emoji: '🍳', cost: 22, category: 'household' },
  { id: 'clean-bathroom', name: 'Clean bathroom', emoji: '🧽', cost: 28, category: 'household' },
  { id: 'grocery-shopping', name: 'Grocery shopping', emoji: '🛒', cost: 30, category: 'household' },
  { id: 'vacuum', name: 'Vacuum', emoji: '🧹', cost: 20, category: 'household' },
  { id: 'make-lunch', name: 'Make lunch', emoji: '🥪', cost: 8, category: 'household' },
  { id: 'light-cleaning', name: 'Light cleaning', emoji: '✨', cost: 15, category: 'household' },
  { id: 'meal-prep', name: 'Meal prep', emoji: '🥘', cost: 30, category: 'household', isInvestment: true },
  { id: 'take-out-trash', name: 'Take out trash', emoji: '🗑️', cost: 6, category: 'household' },
  { id: 'tidy-room', name: 'Tidy room', emoji: '🏠', cost: 12, category: 'household' },
  { id: 'organize', name: 'Organize space', emoji: '📦', cost: 18, category: 'household' },
  { id: 'water-plants', name: 'Water plants', emoji: '🌱', cost: 4, category: 'household' },
  { id: 'fold-laundry', name: 'Fold laundry', emoji: '👕', cost: 10, category: 'household' },

  // HEALTH
  { id: 'walk-10min', name: '10-min walk', emoji: '🚶', cost: 12, category: 'health' },
  { id: 'doctor-appt', name: 'Doctor appointment', emoji: '🏥', cost: 35, category: 'health' },
  { id: 'physical-therapy', name: 'Physical therapy', emoji: '🦴', cost: 20, category: 'health', isInvestment: true },
  { id: 'pharmacy', name: 'Pharmacy trip', emoji: '💊', cost: 18, category: 'health' },
  { id: 'therapy', name: 'Therapy session', emoji: '🧠', cost: 25, category: 'health', isInvestment: true },
  { id: 'light-exercise', name: 'Light exercise', emoji: '🏋️', cost: 15, category: 'health' },
  { id: 'walk-30min', name: '30-min walk', emoji: '🏃', cost: 22, category: 'health' },
  { id: 'dental-appt', name: 'Dental appointment', emoji: '🦷', cost: 30, category: 'health' },

  // TRANSPORT
  { id: 'drive-short', name: 'Short drive', emoji: '🚗', cost: 8, category: 'transport' },
  { id: 'drive-long', name: 'Long drive', emoji: '🛣️', cost: 25, category: 'transport' },
  { id: 'public-transit', name: 'Public transit', emoji: '🚌', cost: 15, category: 'transport' },
  { id: 'commute', name: 'Commute', emoji: '🚇', cost: 18, category: 'transport' },
  { id: 'walk-errand', name: 'Walk to errand', emoji: '🚶‍♂️', cost: 12, category: 'transport' },

  // LEISURE (mostly low cost)
  { id: 'read', name: 'Reading', emoji: '📚', cost: 5, category: 'leisure' },
  { id: 'watch-tv', name: 'Watch TV', emoji: '📺', cost: 3, category: 'leisure' },
  { id: 'listen-music', name: 'Listen to music', emoji: '🎵', cost: 2, category: 'leisure' },
  { id: 'podcast', name: 'Listen to podcast', emoji: '🎧', cost: 4, category: 'leisure' },
  { id: 'scroll-phone', name: 'Scroll phone', emoji: '📱', cost: 5, category: 'leisure' },
  { id: 'craft', name: 'Crafts / Hobby', emoji: '🎨', cost: 12, category: 'leisure' },
  { id: 'gaming', name: 'Gaming', emoji: '🎮', cost: 8, category: 'leisure' },
  { id: 'journaling', name: 'Journaling', emoji: '📝', cost: 6, category: 'leisure' },
  { id: 'puzzle', name: 'Puzzle / Brain game', emoji: '🧩', cost: 7, category: 'leisure' },

  // RECOVERY (negative costs = deposits)
  { id: 'nap-20min', name: '20-min nap', emoji: '😴', cost: -12, category: 'recovery' },
  { id: 'meditation', name: 'Meditation', emoji: '🧘', cost: -8, category: 'recovery' },
  { id: 'stretching', name: 'Gentle stretching', emoji: '🤸', cost: -5, category: 'recovery' },
  { id: 'comfort-show', name: 'Comfort show', emoji: '📺', cost: -3, category: 'recovery' },
  { id: 'nap-1hr', name: '1-hour nap', emoji: '💤', cost: -20, category: 'recovery' },
  { id: 'warm-bath', name: 'Warm bath', emoji: '🛁', cost: -10, category: 'recovery' },
  { id: 'deep-breathing', name: 'Deep breathing', emoji: '🌬️', cost: -6, category: 'recovery' },
  { id: 'pet-time', name: 'Pet cuddles', emoji: '🐱', cost: -7, category: 'recovery' },
  { id: 'nature-sit', name: 'Sit in nature', emoji: '🌿', cost: -8, category: 'recovery' },
  { id: 'rest-quiet', name: 'Quiet rest', emoji: '🤫', cost: -10, category: 'recovery' },
  { id: 'guided-relax', name: 'Guided relaxation', emoji: '🎶', cost: -9, category: 'recovery' },
  { id: 'aromatherapy', name: 'Aromatherapy', emoji: '🕯️', cost: -4, category: 'recovery' },
];

export const CATEGORY_LABELS: Record<string, string> = {
  basic: '🌅 Basics',
  work: '💼 Work',
  social: '👥 Social',
  household: '🏠 Household',
  health: '🏥 Health',
  transport: '🚗 Transport',
  leisure: '🎭 Leisure',
  recovery: '💚 Recovery',
};

export const CATEGORY_ORDER = ['basic', 'work', 'social', 'household', 'health', 'transport', 'leisure', 'recovery'];
