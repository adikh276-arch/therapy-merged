import type { QuizAnswers } from "./quizQuestions";

export interface BodyPattern {
  id: string;
  name: string;
  description: string;
  whyHappening: string[];
  risks: string[];
  tip: string;
  tipDescription: string;
}

const patterns: BodyPattern[] = [
  {
    id: "desk-strain",
    name: "Desk-Strain Body Pattern",
    description: "Your body shows signs of prolonged sitting combined with minimal movement. This creates compression in your lower spine and tightness in your hip flexors, leading to the stiffness you're experiencing.",
    whyHappening: [
      "Sitting 8+ hours daily compresses your spine",
      "Limited activity means muscles stay tight",
      "Desk posture creates upper body tension"
    ],
    risks: [
      "Stiffness may increase over time",
      "Pain could spread to other areas",
      "Daily comfort may continue declining"
    ],
    tip: "Hourly Movement Break",
    tipDescription: "Every hour, stand up and reach your arms overhead for 20 seconds. This decompresses your spine and releases shoulder tension."
  },
  {
    id: "postural-overload",
    name: "Postural Overload Pattern",
    description: "Your body is compensating for prolonged poor posture, causing specific muscle groups to become overworked while others weaken. This imbalance is creating the tension and discomfort you feel.",
    whyHappening: [
      "Forward head position strains neck muscles",
      "Rounded shoulders cause upper back fatigue",
      "Core muscles aren't supporting your spine effectively"
    ],
    risks: [
      "Headaches and neck pain may become more frequent",
      "Upper back tension could worsen",
      "Range of motion may decrease"
    ],
    tip: "Chin Tuck Exercise",
    tipDescription: "3 times daily, gently pull your chin back (creating a double chin) and hold for 10 seconds. This resets your neck alignment."
  },
  {
    id: "sedentary-tension",
    name: "Sedentary Tension Pattern",
    description: "Your body has adapted to minimal physical activity, resulting in shortened muscles and reduced blood flow to key areas. Stress compounds this, creating the tension patterns you're experiencing.",
    whyHappening: [
      "Muscles shorten from lack of movement",
      "Blood flow decreases to tight areas",
      "Stress hormones increase muscle tension"
    ],
    risks: [
      "Chronic stiffness may develop",
      "Energy levels could decrease further",
      "Sleep quality may be affected"
    ],
    tip: "Walking Reset",
    tipDescription: "Take a 5-minute walk every 2 hours. Even short movement sessions restore blood flow and reduce tension buildup."
  },
  {
    id: "active-imbalance",
    name: "Active Imbalance Pattern",
    description: "Despite being active, certain movement patterns have created muscle imbalances in your body. Some areas are overworked while others need strengthening, leading to the discomfort you experience.",
    whyHappening: [
      "Repetitive activities favor certain muscle groups",
      "Recovery time may be insufficient",
      "Flexibility work has been limited"
    ],
    risks: [
      "Injury risk increases with continued imbalance",
      "Performance may plateau or decline",
      "Recovery between activities may take longer"
    ],
    tip: "Dynamic Stretching",
    tipDescription: "Before any activity, spend 5 minutes on dynamic stretches for the areas that feel tight. This prepares muscles and prevents further imbalance."
  }
];

export function calculatePattern(answers: QuizAnswers): BodyPattern {
  // Simple scoring logic based on answers
  const sittingHours = answers[5] as number || 8;
  const activityLevel = answers[7] as string;
  const workType = answers[6] as string;
  const painLocation = answers[1] as string;
  
  // Desk-based worker with long sitting hours
  if (sittingHours >= 8 && (workType === 'desk-based' || workType === 'mix')) {
    return patterns[0]; // Desk-Strain
  }
  
  // Postural issues (neck/upper back focused)
  if (painLocation === 'neck' || painLocation === 'upper-back') {
    return patterns[1]; // Postural Overload
  }
  
  // Active but still having issues
  if (activityLevel === 'daily' || activityLevel === 'regularly') {
    return patterns[3]; // Active Imbalance
  }
  
  // Default to sedentary tension
  return patterns[2]; // Sedentary Tension
}
