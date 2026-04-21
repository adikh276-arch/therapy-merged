export interface Milestone {
  id: string;
  minutes: number; // minutes after quit
  label: string;
  description: string;
}

export const MILESTONES: Milestone[] = [
  { id: "20min", minutes: 20, label: "20 min", description: "Heart rate and blood pressure normalising" },
  { id: "8hr", minutes: 480, label: "8 hrs", description: "Blood oxygen returns to normal" },
  { id: "24hr", minutes: 1440, label: "24 hrs", description: "Carbon monoxide eliminated" },
  { id: "48hr", minutes: 2880, label: "48 hrs", description: "Nerve endings regenerate" },
  { id: "72hr", minutes: 4320, label: "72 hrs", description: "Nicotine fully cleared" },
  { id: "1wk", minutes: 10080, label: "1 week", description: "Breathing becomes easier" },
  { id: "2wk", minutes: 20160, label: "2 weeks", description: "Circulation improving" },
  { id: "1mo", minutes: 43200, label: "1 month", description: "Cough and fatigue reduce" },
  { id: "3mo", minutes: 129600, label: "3 months", description: "Lung function increases 10%" },
  { id: "1yr", minutes: 525600, label: "1 year", description: "Heart disease risk halved" },
  { id: "5yr", minutes: 2628000, label: "5 years", description: "Stroke risk equals non-smoker" },
  { id: "10yr", minutes: 5256000, label: "10 years", description: "Lung cancer risk halved" },
  { id: "15yr", minutes: 7884000, label: "15 years", description: "Heart disease risk equals never-smoker" },
];

export function getMinutesSinceQuit(quitDate: string): number {
  const quit = new Date(quitDate);
  const now = new Date();
  return (now.getTime() - quit.getTime()) / (1000 * 60);
}

export function getDaysSinceQuit(quitDate: string): number {
  return Math.floor(getMinutesSinceQuit(quitDate) / 1440);
}

export function getReachedMilestones(quitDate: string): Milestone[] {
  const mins = getMinutesSinceQuit(quitDate);
  return MILESTONES.filter(m => mins >= m.minutes);
}

export function getNextMilestone(quitDate: string): Milestone | null {
  const mins = getMinutesSinceQuit(quitDate);
  return MILESTONES.find(m => mins < m.minutes) || null;
}

export function formatTimeUntil(minutes: number, quitDate: string): string {
  const minsSinceQuit = getMinutesSinceQuit(quitDate);
  const remaining = minutes - minsSinceQuit;
  if (remaining <= 0) return "Reached";
  if (remaining < 60) return `In ${Math.ceil(remaining)} min`;
  if (remaining < 1440) return `In ${Math.ceil(remaining / 60)} hours`;
  const days = Math.ceil(remaining / 1440);
  if (days === 1) return "Tomorrow";
  if (days < 30) return `In ${days} days`;
  const months = Math.floor(days / 30);
  if (months < 12) return `In ${months} month${months > 1 ? 's' : ''}`;
  const years = Math.floor(days / 365);
  return `In ${years} year${years > 1 ? 's' : ''}`;
}

export function formatDateReached(milestoneMinutes: number, quitDate: string): string {
  const quit = new Date(quitDate);
  const reached = new Date(quit.getTime() + milestoneMinutes * 60 * 1000);
  return reached.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function formatDuration(quitDate: string): string {
  const quit = new Date(quitDate);
  const now = new Date();
  const diffMs = now.getTime() - quit.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  const parts: string[] = [];
  if (totalDays > 0) parts.push(`${totalDays} days`);
  parts.push(`${hours} hrs`);
  
  const dateStr = quit.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  return `${parts.join(', ')} since ${dateStr}`;
}

export function calculateLifeRegained(quitDate: string, avgPerDay: number = 10): { hours: number; minutes: number } {
  const days = getDaysSinceQuit(quitDate);
  const totalMinutes = days * avgPerDay * 11;
  return { hours: Math.floor(totalMinutes / 60), minutes: totalMinutes % 60 };
}
