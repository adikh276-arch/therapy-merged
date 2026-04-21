export function calculateSleepScore(
  totalMinutes: number,
  quality: number,
  wakeUps: number = 0,
  symptoms: string[] = []
): number {
  // Duration points (max 60)
  const hours = totalMinutes / 60;
  let durationPoints = 50;
  if (hours > 8) {
    durationPoints += Math.min(10, Math.floor((hours - 8) * 2) * 5);
  } else if (hours < 8) {
    durationPoints -= Math.floor((8 - hours) * 2) * 5;
  }
  durationPoints = Math.max(0, Math.min(60, durationPoints));

  // Quality points (max 20)
  const qualityPoints = quality * 4;

  // Penalties
  const wakeUpPenalty = wakeUps * 3;
  const symptomPenalty = symptoms.length * 2;

  const score = durationPoints + qualityPoints - wakeUpPenalty - symptomPenalty;
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function getScoreTier(score: number): {
  label: string;
  tier: 'poor' | 'fair' | 'good' | 'excellent';
} {
  if (score <= 50) return { label: 'Needs Improvement', tier: 'poor' };
  if (score <= 70) return { label: 'Fair', tier: 'fair' };
  if (score <= 85) return { label: 'Good', tier: 'good' };
  return { label: 'Excellent', tier: 'excellent' };
}

export function calculateDuration(bedtime: string, wakeTime: string): number {
  const [bH, bM] = bedtime.split(':').map(Number);
  const [wH, wM] = wakeTime.split(':').map(Number);
  let bedMin = bH * 60 + bM;
  let wakeMin = wH * 60 + wM;
  if (wakeMin <= bedMin) wakeMin += 24 * 60; // next day
  return wakeMin - bedMin;
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}hr ${m}min`;
}
