import { z } from "zod";

const blockedDomains = [
  "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "protonmail.com",
  "aol.com", "icloud.com", "mail.com", "zoho.com", "yandex.com",
  "gmx.com", "live.com", "msn.com", "inbox.com", "me.com",
  "yahoo.co.in", "yahoo.co.uk", "rediffmail.com", "fastmail.com",
  "tutanota.com", "mailfence.com", "hushmail.com",
];

export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Only letters and spaces allowed"),
  workEmail: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email is too long")
    .refine((email) => {
      const domain = email.split("@")[1]?.toLowerCase();
      return domain && !blockedDomains.includes(domain);
    }, "Please use your company email address"),
  phone: z
    .string()
    .min(8, "Please enter a valid phone number")
    .max(20, "Phone number is too long"),
  organizationName: z
    .string()
    .trim()
    .min(2, "Organization name must be at least 2 characters")
    .max(200, "Organization name is too long")
    .regex(/^[a-zA-Z0-9\s.&\-']+$/, "Only letters, numbers, and basic punctuation allowed"),
});

export type LeadFormData = z.infer<typeof leadSchema>;

export interface Reward {
  name: string;
  probability: number;
  color: string;
}

export const REWARDS: Reward[] = [
  {
    name: `Organisation Wide
Survey`, probability: 0.55, color: "#043570"
  },
  {
    name: `Organisation Wide
Webinar`, probability: 0.15, color: "#0a5cad"
  },
  { name: "Yoga Session", probability: 0.10, color: "#00C0FF" },
  { name: "Group Coaching", probability: 0.10, color: "#0891b2" },
  {
    name: `Session on
DE&I`, probability: 0.10, color: "#065f8a"
  },
];

export function spinForReward(): Reward {
  const rand = Math.random();
  let cumulative = 0;
  for (const reward of REWARDS) {
    cumulative += reward.probability;
    if (rand <= cumulative) return reward;
  }
  return REWARDS[0]; // fallback
}
