// ============================================================
// LOCAL STORAGE UTILITY — Financial Wellness
// ============================================================

export const storage = {
  get<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
      const item = localStorage.getItem(`fw_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  },

  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(`fw_${key}`, JSON.stringify(value));
    } catch {
      // quota issues — silently fail
    }
  },

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`fw_${key}`);
  },

  clear(prefix?: string): void {
    if (typeof window === 'undefined') return;
    const p = `fw_${prefix ?? ''}`;
    Object.keys(localStorage)
      .filter(k => k.startsWith(p))
      .forEach(k => localStorage.removeItem(k));
  },

  async sync(key: string, data: any, score?: number): Promise<void> {
    if (typeof window === 'undefined') return;
    const userId = sessionStorage.getItem("financial_wellbeing_user_id") || localStorage.getItem("fw_guest_id");
    
    // Minimal attempt: if no user, just don't sync
    if (!userId) return;

    try {
      await fetch('/financial_wellbeing/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, key, data, score }),
      });
    } catch (err) {
      console.error('Persistence sync failed:', err);
    }
  },

  async fetch(key: string): Promise<any | null> {
    if (typeof window === 'undefined') return null;
    const userId = sessionStorage.getItem("financial_wellbeing_user_id") || localStorage.getItem("fw_guest_id");
    if (!userId) return null;

    try {
      const res = await fetch(`/financial_wellbeing/api/get?userId=${userId}&key=${key}`);
      if (!res.ok) return null;
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.error('Persistence fetch failed:', err);
      return null;
    }
  }
};

// ─── Format helpers ───────────────────────────────────────────
export const fmt = {
  currency: (n: number, compact = false) => {
    if (compact && n >= 1_000_000) {
      return `${(n / 1_000_000).toFixed(2)}M`;
    }
    if (compact && n >= 1_000) {
      return `${(n / 1_000).toFixed(1)}K`;
    }
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n);
  },
  percent: (n: number, decimals = 1) => `${n.toFixed(decimals)}%`,
  number: (n: number) => new Intl.NumberFormat('en-US').format(Math.round(n)),
};

// ─── Financial calculations ───────────────────────────────────
export const calc = {
  // Compound interest: FV = PV(1+r)^n + PMT * [(1+r)^n - 1] / r
  futureValue: (principal: number, annualRate: number, years: number, monthlyAdd = 0) => {
    const r = annualRate / 100 / 12;
    const n = years * 12;
    const fvLump = principal * Math.pow(1 + r, n);
    const fvSip = monthlyAdd > 0 && r > 0
      ? monthlyAdd * (Math.pow(1 + r, n) - 1) / r * (1 + r)
      : monthlyAdd * n;
    return fvLump + fvSip;
  },

  // EMI: r * P * (1+r)^n / [(1+r)^n - 1]
  emi: (principal: number, annualRate: number, tenureMonths: number) => {
    const r = annualRate / 100 / 12;
    if (r === 0) return principal / tenureMonths;
    return (r * principal * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
  },

  // Monthly savings needed to reach goal
  monthlySavingsNeeded: (target: number, current: number, months: number, annualRate = 0) => {
    const remaining = target - current;
    if (months <= 0) return remaining;
    if (annualRate <= 0) return remaining / months;
    const r = annualRate / 100 / 12;
    return remaining * r / (Math.pow(1 + r, months) - 1);
  },
};
