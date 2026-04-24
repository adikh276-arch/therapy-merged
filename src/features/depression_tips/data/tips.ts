import React from 'react';
import { Heart, Brain, Target, Shield, Sparkles } from "lucide-react";

export interface Tip {
  id: string;
  title: string;
  preview: string;
  icon: React.ElementType;
  iconBg: string;
  whyItHelps: string;
  whatYouCanDo: string[];
  gentleReminder?: string;
  example?: { instead: string; tryThis: string };
  actionLabel: string;
}

export const tips: Tip[] = [
  {
    id: "enjoyable-activities",
    title: "Engage in Enjoyable Activities",
    preview: "Do small activities that bring even a tiny bit of comfort or interest.",
    icon: Heart,
    iconBg: "pastel-slate",
    whyItHelps:
      "Depression reduces motivation and pleasure. Small enjoyable actions can slowly rebuild positive feelings and energy.",
    whatYouCanDo: [
      "Listen to a favorite song",
      "Take a short walk outside",
      "Watch something light or funny",
      "Try a hobby for 10 minutes",
      "Text or call someone supportive",
    ],
    gentleReminder:
      "You don't need to feel motivated first. Action can come before motivation.",
    actionLabel: "Try One Small Thing Today",
  },
  {
    id: "challenge-negative-thoughts",
    title: "Challenge Negative Thoughts",
    preview: "Notice harsh thoughts and gently replace them with balanced ones.",
    icon: Brain,
    iconBg: "pastel-cyan",

    whyItHelps:
      "Depression often creates automatic negative thoughts that feel true but may not be fully accurate.",
    whatYouCanDo: [
      "Write down the negative thought",
      'Ask: "Is this 100% true?"',
      'Ask: "What would I tell a friend?"',
      "Replace it with a kinder, balanced statement",
    ],
    example: {
      instead: '"I always fail."',
      tryThis: '"I didn\'t succeed this time, but I can try again."',
    },
    actionLabel: "Reframe a Thought Now",
  },
  {
    id: "set-realistic-goals",
    title: "Set Realistic Goals",
    preview: "Break tasks into very small steps and focus on just one.",
    icon: Target,
    iconBg: "pastel-blue",
    whyItHelps:
      "Large tasks can feel overwhelming. Small goals build confidence and momentum.",
    whatYouCanDo: [
      "Choose ONE small task",
      "Break it into 2–3 mini steps",
      "Do just the first step",
      "Acknowledge completion",
    ],
    example: {
      instead: '"Clean the whole room."',
      tryThis: '"Make the bed."',
    },
    actionLabel: "Pick One Small Goal",
  },
  {
    id: "limit-stressors",
    title: "Limit Stressors",
    preview: "Protect your energy by reducing overwhelming situations.",
    icon: Shield,
    iconBg: "pastel-green",
    whyItHelps:
      "When energy is low, too many stressors can worsen symptoms.",
    whatYouCanDo: [
      "Say no to one non-essential task",
      "Take a short break from social media",
      "Spend quiet time alone",
      "Reduce exposure to negative environments",
    ],
    gentleReminder:
      "Protecting your energy is not selfish — it's necessary.",
    actionLabel: "Set One Boundary Today",
  },
  {
    id: "practice-self-care",
    title: "Practice Self-Care",
    preview: "Take care of your basic physical and emotional needs.",
    icon: Sparkles,
    iconBg: "pastel-beige",
    whyItHelps:
      "Sleep, hydration, nutrition, and sunlight strongly affect mood and brain chemistry.",
    whatYouCanDo: [
      "Drink a glass of water",
      "Eat something nourishing",
      "Get 10 minutes of sunlight",
      "Sleep at a regular time",
      "Take a warm shower",
    ],
    gentleReminder:
      "Small physical care can create real emotional change.",
    actionLabel: "Do One Self-Care Act",
  },
];
