import { Moon, Wind, Footprints, Coffee, ClipboardList } from "lucide-react";
import type { ReactNode } from "react";

export interface TipData {
  slug: string;
  title: string;
  description: string;
  icon: ReactNode;
  iconClass: string;
  whyItHelps: string;
  whatYouCanDo: string[];
  buttonLabel?: string;
  hasBreathing?: boolean;
}

export const tips: TipData[] = [
  {
    slug: "sleep",
    title: "Get Restful Sleep",
    description: "Aim for 7–9 hours of sleep each night. Try to sleep and wake up at the same time daily.",
    icon: <Moon className="w-5 h-5" />,
    iconClass: "pastel-icon-purple",
    whyItHelps: "Sleep helps your brain and body recover and lowers stress hormones.",
    whatYouCanDo: [
      "Keep a fixed sleep schedule",
      "Avoid screens 1 hour before bed",
      "Keep room cool and dark",
      "Avoid caffeine after 4 PM",
    ],
    buttonLabel: "Set Sleep Reminder",
  },
  {
    slug: "breathing",
    title: "Practice Deep Breathing",
    description: "Spend a few minutes focusing on your breath. Slow breathing reduces anxiety.",
    icon: <Wind className="w-5 h-5" />,
    iconClass: "pastel-icon-teal",
    whyItHelps: "Slow breathing activates your body's relaxation response.",
    whatYouCanDo: [
      "Inhale for 4 seconds",
      "Hold for 4 seconds",
      "Exhale for 4 seconds",
      "Repeat for 1 minute",
    ],
    hasBreathing: true,
  },
  {
    slug: "exercise",
    title: "Move Your Body",
    description: "Light walking or stretching helps release stress and improve mood.",
    icon: <Footprints className="w-5 h-5" />,
    iconClass: "pastel-icon-blue",
    whyItHelps: "Exercise releases endorphins and improves mood.",
    whatYouCanDo: [
      "15-minute walk",
      "Light stretching",
      "Short yoga session",
      "Quick home workout",
    ],
  },
  {
    slug: "caffeine",
    title: "Limit Caffeine & Sugar",
    description: "Too much caffeine and sugar can increase anxiety and disturb sleep.",
    icon: <Coffee className="w-5 h-5" />,
    iconClass: "pastel-icon-pink",
    whyItHelps: "Too much caffeine and sugar increases anxiety and sleep problems.",
    whatYouCanDo: [
      "Replace one coffee with herbal tea",
      "Drink more water",
      "Reduce sugary snacks",
      "Avoid caffeine late in the day",
    ],
  },
  {
    slug: "planning",
    title: "Plan Your Day",
    description: "Break large tasks into smaller steps to avoid feeling overwhelmed.",
    icon: <ClipboardList className="w-5 h-5" />,
    iconClass: "pastel-icon-yellow",
    whyItHelps: "Planning reduces mental clutter and overwhelm.",
    whatYouCanDo: [
      "Write 3 main tasks",
      "Break tasks into small steps",
      "Focus on one task at a time",
      "Take short breaks",
    ],
  },
];
