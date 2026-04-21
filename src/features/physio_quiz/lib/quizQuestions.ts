export interface QuizOption {
  id: string;
  label: string;
  description?: string;
}

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  type: 'single' | 'multi' | 'slider' | 'body-map';
  options?: QuizOption[];
  sliderConfig?: {
    min: number;
    max: number;
    step: number;
    labels: Record<number, string>;
  };
}

export const quizQuestions: QuizQuestion[] = [
  // Category 1: Pain Identification (Q1-Q4)
  {
    id: 1,
    category: "Pain Identification",
    question: "Where do you experience the most discomfort?",
    type: "body-map",
    options: [
      { id: "neck", label: "Neck" },
      { id: "upper-back", label: "Upper back / Shoulders" },
      { id: "lower-back", label: "Lower back" },
      { id: "hips", label: "Hips" },
      { id: "knees", label: "Knees" },
      { id: "multiple", label: "Multiple areas" },
      { id: "other", label: "Other / Generalized stiffness" },
    ],
  },
  {
    id: 2,
    category: "Pain Identification",
    question: "How would you describe this discomfort?",
    type: "single",
    options: [
      { id: "sharp", label: "Sharp, shooting pain" },
      { id: "dull", label: "Dull, constant ache" },
      { id: "stiffness", label: "Stiffness or tightness" },
      { id: "burning", label: "Burning or tingling sensation" },
      { id: "numbness", label: "Numbness or weakness" },
      { id: "combination", label: "Combination of above" },
    ],
  },
  {
    id: 3,
    category: "Pain Identification",
    question: "How long have you been experiencing this?",
    type: "single",
    options: [
      { id: "less-2-weeks", label: "Less than 2 weeks" },
      { id: "2-weeks-1-month", label: "2 weeks - 1 month" },
      { id: "1-3-months", label: "1-3 months" },
      { id: "3-6-months", label: "3-6 months" },
      { id: "more-6-months", label: "More than 6 months" },
      { id: "comes-goes", label: "It comes and goes" },
    ],
  },
  {
    id: 4,
    category: "Pain Identification",
    question: "On a typical day, how much does this affect your activities?",
    type: "slider",
    sliderConfig: {
      min: 0,
      max: 10,
      step: 1,
      labels: {
        0: "Minimal",
        3: "Mild",
        5: "Moderate",
        7: "Significant",
        10: "Severe",
      },
    },
  },
  // Category 2: Lifestyle & Habits (Q5-Q8)
  {
    id: 5,
    category: "Lifestyle & Habits",
    question: "On average, how many hours do you sit each day?",
    type: "slider",
    sliderConfig: {
      min: 0,
      max: 16,
      step: 1,
      labels: {
        0: "0 hrs",
        4: "4 hrs",
        8: "8 hrs",
        12: "12 hrs",
        16: "16 hrs",
      },
    },
  },
  {
    id: 6,
    category: "Lifestyle & Habits",
    question: "Which best describes your typical workday?",
    type: "single",
    options: [
      { id: "desk-based", label: "Desk-based / computer work (8+ hours)" },
      { id: "mix", label: "Mix of sitting and standing/moving" },
      { id: "standing", label: "Mostly standing or moving around" },
      { id: "physical", label: "Physical labor or manual work" },
      { id: "varies", label: "Varies significantly day to day" },
    ],
  },
  {
    id: 7,
    category: "Lifestyle & Habits",
    question: "How often do you engage in intentional physical activity?",
    type: "single",
    options: [
      { id: "daily", label: "Daily or almost daily (5+ times/week)" },
      { id: "regularly", label: "Regularly (3-4 times/week)" },
      { id: "occasionally", label: "Occasionally (1-2 times/week)" },
      { id: "rarely", label: "Rarely (few times/month)" },
      { id: "almost-never", label: "Almost never" },
    ],
  },
  {
    id: 8,
    category: "Lifestyle & Habits",
    question: "Do you experience stiffness or pain when waking up?",
    type: "single",
    options: [
      { id: "frequently", label: "Yes, frequently (most mornings)" },
      { id: "sometimes", label: "Yes, sometimes (2-3 times/week)" },
      { id: "occasionally", label: "Occasionally (few times/month)" },
      { id: "rarely", label: "Rarely or never" },
    ],
  },
  // Category 3: Movement Patterns (Q9-Q10)
  {
    id: 9,
    category: "Movement Patterns",
    question: "How often do you do stretching or mobility exercises?",
    type: "single",
    options: [
      { id: "daily", label: "Daily" },
      { id: "few-times-week", label: "Few times per week" },
      { id: "occasionally", label: "Occasionally" },
      { id: "rarely", label: "Rarely" },
      { id: "never", label: "Never" },
    ],
  },
  {
    id: 10,
    category: "Movement Patterns",
    question: "Have you tried physiotherapy or similar treatment before?",
    type: "single",
    options: [
      { id: "recent", label: "Yes, recently (within 6 months)" },
      { id: "past", label: "Yes, but over 6 months ago" },
      { id: "first-time", label: "No, this would be my first time" },
      { id: "considered", label: "I've considered it but never tried" },
    ],
  },
  // Category 4: Stress & Recovery (Q11-Q12)
  {
    id: 11,
    category: "Stress & Recovery",
    question: "How would you rate your typical stress levels?",
    type: "slider",
    sliderConfig: {
      min: 1,
      max: 4,
      step: 1,
      labels: {
        1: "Low",
        2: "Moderate",
        3: "High",
        4: "Very High",
      },
    },
  },
  {
    id: 12,
    category: "Stress & Recovery",
    question: "What's your primary goal with physiotherapy?",
    type: "single",
    options: [
      { id: "reduce-pain", label: "Reduce or eliminate pain" },
      { id: "improve-mobility", label: "Improve mobility and flexibility" },
      { id: "prevent-injury", label: "Prevent future injury" },
      { id: "return-activity", label: "Return to specific activity/sport" },
      { id: "better-posture", label: "Better posture and body awareness" },
      { id: "overall-wellness", label: "Overall wellness and maintenance" },
    ],
  },
  // Category 5: Pain Patterns & History (Q13-Q14)
  {
    id: 13,
    category: "Pain Patterns",
    question: "Does your pain get worse at specific times or with certain movements?",
    type: "multi",
    options: [
      { id: "morning", label: "Worse in the morning" },
      { id: "end-of-day", label: "Worse by end of day" },
      { id: "sitting", label: "Triggered by sitting too long" },
      { id: "standing", label: "Triggered by standing/walking" },
      { id: "movements", label: "Triggered by specific movements" },
      { id: "exercise", label: "After exercise or physical activity" },
      { id: "stress", label: "During stress or tension" },
      { id: "no-pattern", label: "No clear pattern / Random" },
    ],
  },
  {
    id: 14,
    category: "Pain Patterns",
    question: "Have you injured this area before?",
    type: "single",
    options: [
      { id: "significant", label: "Yes, a significant injury" },
      { id: "minor", label: "Yes, minor strain or overuse" },
      { id: "no", label: "Not that I recall" },
      { id: "not-sure", label: "I'm not sure" },
    ],
  },
  // Category 6: Current Approach & Readiness (Q15-Q16)
  {
    id: 15,
    category: "Current Approach",
    question: "What are you currently doing for this pain?",
    type: "multi",
    options: [
      { id: "otc-meds", label: "Over-the-counter pain medication" },
      { id: "prescription", label: "Prescription medication" },
      { id: "ice-heat", label: "Ice or heat therapy" },
      { id: "stretching", label: "Stretching or self-massage" },
      { id: "gym", label: "Gym or home exercises" },
      { id: "chiro-massage", label: "Chiropractic or massage therapy" },
      { id: "nothing", label: "Nothing yet / Just started looking" },
    ],
  },
  {
    id: 16,
    category: "Commitment",
    question: "How ready are you to commit to a guided physiotherapy program?",
    type: "single",
    options: [
      { id: "fully-committed", label: "Fully Committed", description: "I'll do whatever it takes to fix this" },
      { id: "ready", label: "Ready to Start", description: "I'm prepared to follow a structured plan" },
      { id: "open", label: "Open to Try", description: "I want to see if this works for me" },
      { id: "exploring", label: "Exploring Options", description: "I'm still researching my choices" },
    ],
  },
];

export type QuizAnswers = Record<number, string | string[] | number>;

export const encouragementMessages: Record<number, string> = {
  4: "You're doing great! Just a few more questions",
  8: "Halfway there! Understanding your body pattern",
  12: "Almost done! Final questions",
};
