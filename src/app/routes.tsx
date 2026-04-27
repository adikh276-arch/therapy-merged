import React, { Suspense } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { SelfCareResources } from "./components/SelfCareResources";
import { StaticContentViewer } from "../components/StaticContentViewer";
import { AuthGuard } from "../components/AuthGuard";

// Dynamic Imports
const App468Breathing = React.lazy(() => import("../features/4_6_8_breathing"));
const App54321Grounding = React.lazy(() => import("../features/5_4_3_2_1_grounding"));
const Affirmations = React.lazy(() => import("../features/affirmations"));
const AnxietyTips = React.lazy(() => import("../features/anxiety_tips"));
const ALetterToSelf = React.lazy(() => import("../features/a_letter_to_self"));
const APauseForAppreciation = React.lazy(() => import("../features/a_pause_for_appreciation"));
const BoxBreathing = React.lazy(() => import("../features/box_breathing"));
const BrainDumpAndSort = React.lazy(() => import("../features/brain_dump_and_sort"));
const CareTracker = React.lazy(() => import("../features/care_tracker"));
const DailyGratitudeDiary = React.lazy(() => import("../features/daily_gratitude_diary"));
const EnergyTracker = React.lazy(() => import("../features/energy_tracker"));
const DepressionTips = React.lazy(() => import("../features/depression_tips"));
const DiffusionTechnique = React.lazy(() => import("../features/diffusion_technique"));
const DoodleBurst = React.lazy(() => import("../features/doodle_burst"));
const EnvironmentOptimization = React.lazy(() => import("../features/environment_optimization"));
const GratitudeTracker = React.lazy(() => import("../features/gratitude_tracker"));
const GroundingTechnique = React.lazy(() => import("../features/grounding_technique"));
const JoyfulActivities = React.lazy(() => import("../features/joyful_activities"));
const KnowYourValues = React.lazy(() => import("../features/know_your_values"));
const PersonalMissionStatement = React.lazy(() => import("../features/personal_mission_statement"));
const PhysicalActivityLog = React.lazy(() => import("../features/physical_activity_log"));
const RealStoriesToOvercomeAnxiety = React.lazy(() => import("../features/real_stories_to_overcome_anxiety"));
const SelfCareBingo = React.lazy(() => import("../features/self_care_bingo"));
const StressTips = React.lazy(() => import("../features/stress_tips"));
const VibeTracker = React.lazy(() => import("../features/vibe_tracker"));
const WhatAreYourHabits = React.lazy(() => import("../features/what_are_your_habits"));

function ProtectedLayout() {
  return (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  );
}

const loadingFallback = (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" aria-hidden="true"></div>
    <span className="sr-only">Loading</span>
  </div>
);

const withLoading = (element: React.ReactNode) => <Suspense fallback={loadingFallback}>{element}</Suspense>;

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <SelfCareResources /> },
      { path: "concerns/:concern/:type", element: <StaticContentViewer /> },

      {
        element: <ProtectedLayout />,
        children: [
          { path: "exercises/4-6-8-breathing/*", element: withLoading(<App468Breathing />) },
          { path: "exercises/5-4-3-2-1-grounding/*", element: withLoading(<App54321Grounding />) },
          { path: "tools/affirmations/*", element: withLoading(<Affirmations />) },
          { path: "tips/anxiety-tips/*", element: withLoading(<AnxietyTips />) },
          { path: "tools/a-letter-to-self/*", element: withLoading(<ALetterToSelf />) },
          { path: "trackers/a-pause-for-appreciation/*", element: withLoading(<APauseForAppreciation />) },
          { path: "exercises/box-breathing/*", element: withLoading(<BoxBreathing />) },
          { path: "tools/brain-dump-and-sort/*", element: withLoading(<BrainDumpAndSort />) },
          { path: "trackers/care-tracker/*", element: withLoading(<CareTracker />) },
          { path: "trackers/daily-gratitude-diary/*", element: withLoading(<DailyGratitudeDiary />) },
          { path: "trackers/energy-tracker/*", element: withLoading(<EnergyTracker />) },
          { path: "tips/depression-tips/*", element: withLoading(<DepressionTips />) },
          { path: "exercises/diffusion-technique/*", element: withLoading(<DiffusionTechnique />) },
          { path: "tools/doodle-burst/*", element: withLoading(<DoodleBurst />) },
          { path: "tools/environment-optimization/*", element: withLoading(<EnvironmentOptimization />) },
          { path: "trackers/gratitude-tracker/*", element: withLoading(<GratitudeTracker />) },
          { path: "exercises/grounding-technique/*", element: withLoading(<GroundingTechnique />) },
          { path: "tools/joyful-activities/*", element: withLoading(<JoyfulActivities />) },
          { path: "tools/know-your-values/*", element: withLoading(<KnowYourValues />) },
          { path: "tools/personal-mission-statement/*", element: withLoading(<PersonalMissionStatement />) },
          { path: "trackers/physical-activity-log/*", element: withLoading(<PhysicalActivityLog />) },
          { path: "tools/real-stories-to-overcome-anxiety/*", element: withLoading(<RealStoriesToOvercomeAnxiety />) },
          { path: "tools/self-care-bingo/*", element: withLoading(<SelfCareBingo />) },
          { path: "tips/stress-tips/*", element: withLoading(<StressTips />) },
          { path: "trackers/vibe-tracker/*", element: withLoading(<VibeTracker />) },
          { path: "tools/what-are-your-habits/*", element: withLoading(<WhatAreYourHabits />) }
        ]
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ]
  }
], { basename: "/" });
