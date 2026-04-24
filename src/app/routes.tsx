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


export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <SelfCareResources /> },
      { path: "concerns/:concern/:type", element: <StaticContentViewer /> },
      
      {
        element: <ProtectedLayout />,
        children: [
          { path: "exercises/4-6-8-breathing/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><App468Breathing /></Suspense> },
          { path: "exercises/5-4-3-2-1-grounding/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><App54321Grounding /></Suspense> },
          { path: "tools/affirmations/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><Affirmations /></Suspense> },
          { path: "tips/anxiety-tips/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><AnxietyTips /></Suspense> },
          { path: "tools/a-letter-to-self/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><ALetterToSelf /></Suspense> },
          { path: "trackers/a-pause-for-appreciation/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><APauseForAppreciation /></Suspense> },
          { path: "exercises/box-breathing/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><BoxBreathing /></Suspense> },
          { path: "tools/brain-dump-and-sort/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><BrainDumpAndSort /></Suspense> },
          { path: "trackers/care-tracker/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><CareTracker /></Suspense> },
          { path: "trackers/daily-gratitude-diary/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><DailyGratitudeDiary /></Suspense> },
          { path: "trackers/energy-tracker/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><EnergyTracker /></Suspense> },
          { path: "tips/depression-tips/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><DepressionTips /></Suspense> },
          { path: "exercises/diffusion-technique/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><DiffusionTechnique /></Suspense> },
          { path: "tools/doodle-burst/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><DoodleBurst /></Suspense> },
          { path: "tools/environment-optimization/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><EnvironmentOptimization /></Suspense> },
          { path: "trackers/gratitude-tracker/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><GratitudeTracker /></Suspense> },
          { path: "exercises/grounding-technique/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><GroundingTechnique /></Suspense> },
          { path: "tools/joyful-activities/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><JoyfulActivities /></Suspense> },
          { path: "tools/know-your-values/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><KnowYourValues /></Suspense> },
          { path: "tools/personal-mission-statement/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><PersonalMissionStatement /></Suspense> },
          { path: "trackers/physical-activity-log/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><PhysicalActivityLog /></Suspense> },
          { path: "tools/real-stories-to-overcome-anxiety/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><RealStoriesToOvercomeAnxiety /></Suspense> },
          { path: "tools/self-care-bingo/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><SelfCareBingo /></Suspense> },
          { path: "tips/stress-tips/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><StressTips /></Suspense> },
          { path: "trackers/vibe-tracker/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><VibeTracker /></Suspense> },
          { path: "tools/what-are-your-habits/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><WhatAreYourHabits /></Suspense> }
        ]
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ]
  }
], { basename: "/therapy" });
