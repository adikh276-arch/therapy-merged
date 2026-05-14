import React, { Suspense } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { SelfCareResources } from "./components/SelfCareResources";
import { StaticContentViewer } from "../components/StaticContentViewer";
import { AuthGuard } from "../components/AuthGuard";
import { useTranslation } from "react-i18next";

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

// New Activities
const MissingSomeone = React.lazy(() => import("../features/missing_someone"));
const TheUnsentLetter = React.lazy(() => import("../features/the_unsent_letter"));
const WhatDoINeed = React.lazy(() => import("../features/what_do_i_need"));
const RedrawYourCircle = React.lazy(() => import("../features/redraw_your_circle"));
const RelationshipPatternsUnpacked = React.lazy(() => import("../features/relationship_patterns_unpacked"));
const SleepAudit = React.lazy(() => import("../features/sleep_audit"));
const SleepGuide = React.lazy(() => import("../features/sleep_guide"));
const SleepCycleGuide = React.lazy(() => import("../features/sleep_cycle_guide"));
const SleepWindowPlanner = React.lazy(() => import("../features/sleep_window_planner"));
const AngerFactsMyths = React.lazy(() => import("../features/anger_facts_myths"));
const ThePausePractice = React.lazy(() => import("../features/the_pause_practice"));
const TheAngerShameCycle = React.lazy(() => import("../features/the_anger_shame_cycle"));
const RepairAndReconnect = React.lazy(() => import("../features/repair_and_reconnect"));
const GriefJourneyMap = React.lazy(() => import("../features/grief_journey_map"));
const MemoryBox = React.lazy(() => import("../features/memory_box"));
const ContinuingBonds = React.lazy(() => import("../features/continuing_bonds"));
const AGentleWish = React.lazy(() => import("../features/a_gentle_wish"));
const WhyBrainGetsStuck = React.lazy(() => import("../features/why_brain_gets_stuck"));
const WindowOfTolerance = React.lazy(() => import("../features/window_of_tolerance"));
const SafeSpace = React.lazy(() => import("../features/safe_space"));
const WriteYourNarrative = React.lazy(() => import("../features/write_your_narrative"));
const FoodEmotionMap = React.lazy(() => import("../features/food_emotion_map"));
const ChallengingFoodRules = React.lazy(() => import("../features/challenging_food_rules"));
const UnderstandingControl = React.lazy(() => import("../features/understanding_control"));
const CompassionBreak = React.lazy(() => import("../features/compassion_break"));
const Resources = React.lazy(() => import("../features/resources"));
const NameYourMind = React.lazy(() => import("../features/name_your_mind"));
const PredictionVsReality = React.lazy(() => import("../features/prediction_vs_reality"));
const MindReadingCheck = React.lazy(() => import("../features/mind_reading_check"));
const MySafeSpaceCanvas = React.lazy(() => import("../features/my_safe_space_canvas"));
const GuidedSeries = React.lazy(() => import("./pages/GuidedSeries"));
const GuidedActivity = React.lazy(() => import("./pages/GuidedActivity"));

function ProtectedLayout() {
  const { t } = useTranslation();
  return (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  );
}

const LoadingFallback = () => {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" aria-hidden="true"></div>
      <span className="sr-only">{(typeof t !== "undefined" ? t : (k) => k)("loading_0")}</span>
    </div>
  );
};

const withLoading = (element: React.ReactNode) => <Suspense fallback={<LoadingFallback />}>{element}</Suspense>;

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <SelfCareResources /> },
      { path: "guided-series/:concern", element: withLoading(<GuidedSeries />) },
      { path: "guided-series/:concern/:activityName", element: withLoading(<GuidedActivity />) },
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
          { path: "tools/what-are-your-habits/*", element: withLoading(<WhatAreYourHabits />) },
          
          { path: "tools/missing-someone/*", element: withLoading(<MissingSomeone />) },
          { path: "tools/the-unsent-letter/*", element: withLoading(<TheUnsentLetter />) },
          { path: "tools/what-do-i-need/*", element: withLoading(<WhatDoINeed />) },
          { path: "tools/redraw-your-circle/*", element: withLoading(<RedrawYourCircle />) },
          { path: "tools/relationship-patterns-unpacked/*", element: withLoading(<RelationshipPatternsUnpacked />) },
          { path: "trackers/sleep-audit/*", element: withLoading(<SleepAudit />) },
          { path: "tips/sleep-guide/*", element: withLoading(<SleepGuide />) },
          { path: "tips/sleep-cycle-guide/*", element: withLoading(<SleepCycleGuide />) },
          { path: "tools/sleep-window-planner/*", element: withLoading(<SleepWindowPlanner />) },
          { path: "tips/anger-facts-myths/*", element: withLoading(<AngerFactsMyths />) },
          { path: "exercises/the-pause-practice/*", element: withLoading(<ThePausePractice />) },
          { path: "tips/the-anger-shame-cycle/*", element: withLoading(<TheAngerShameCycle />) },
          { path: "tools/repair-and-reconnect/*", element: withLoading(<RepairAndReconnect />) },
          { path: "tools/grief-journey-map/*", element: withLoading(<GriefJourneyMap />) },
          { path: "tools/memory-box/*", element: withLoading(<MemoryBox />) },
          { path: "tools/continuing-bonds/*", element: withLoading(<ContinuingBonds />) },
          { path: "tools/a-gentle-wish/*", element: withLoading(<AGentleWish />) },
          { path: "tips/why-brain-gets-stuck/*", element: withLoading(<WhyBrainGetsStuck />) },
          { path: "exercises/window-of-tolerance/*", element: withLoading(<WindowOfTolerance />) },
          { path: "exercises/safe-space/*", element: withLoading(<SafeSpace />) },
          { path: "tools/write-your-narrative/*", element: withLoading(<WriteYourNarrative />) },
          { path: "tools/food-emotion-map/*", element: withLoading(<FoodEmotionMap />) },
          { path: "tools/challenging-food-rules/*", element: withLoading(<ChallengingFoodRules />) },
          { path: "tools/understanding-control/*", element: withLoading(<UnderstandingControl />) },
          { path: "exercises/compassion-break/*", element: withLoading(<CompassionBreak />) },
          { path: "resources/:concern/:type/*", element: withLoading(<Resources />) },
          { path: "exercises/name-your-mind/*", element: withLoading(<NameYourMind />) },
          { path: "exercises/prediction-vs-reality/*", element: withLoading(<PredictionVsReality />) },
          { path: "exercises/mind-reading-check/*", element: withLoading(<MindReadingCheck />) },
          { path: "exercises/my-safe-space-canvas/*", element: withLoading(<MySafeSpaceCanvas />) }

        ]
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ]
  }
], { basename: "/therapy" });
