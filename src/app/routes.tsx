import React, { Suspense } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { SelfCareResources } from "./components/SelfCareResources";
import { StaticContentViewer } from "../components/StaticContentViewer";
import { AuthGuard } from "../components/AuthGuard";

// Dynamic Imports
const App468Breathing = React.lazy(() => import("../features/4_6_8_breathing"));
const App54321Grounding = React.lazy(() => import("../features/5_4_3_2_1_grounding"));
const AdictionInsights = React.lazy(() => import("../features/adiction_insights"));
const Affirmations = React.lazy(() => import("../features/affirmations"));
const AlcoholCalculator = React.lazy(() => import("../features/alcohol_calculator"));
const AlcoholConsumption = React.lazy(() => import("../features/alcohol_consumption"));
const AlcoholCraving = React.lazy(() => import("../features/alcohol_craving"));
const AlcoholWithdrawal = React.lazy(() => import("../features/alcohol_withdrawal"));
const AnxietyTips = React.lazy(() => import("../features/anxiety_tips"));
const ALetterToSelf = React.lazy(() => import("../features/a_letter_to_self"));
const APauseForAppreciation = React.lazy(() => import("../features/a_pause_for_appreciation"));
const BoxBreathing = React.lazy(() => import("../features/box_breathing"));
const BrainDumpAndSort = React.lazy(() => import("../features/brain_dump_and_sort"));
const BrainDumpAndSortClone = React.lazy(() => import("../features/brain_dump_and_sort_clone"));
const CareTracker = React.lazy(() => import("../features/care_tracker"));
const Consumption = React.lazy(() => import("../features/consumption"));
const ConsumptionApp = React.lazy(() => import("../features/consumption_app"));
const ConsumptionTracker = React.lazy(() => import("../features/consumption_tracker"));
const Craving = React.lazy(() => import("../features/craving"));
const CravingApp = React.lazy(() => import("../features/craving_app"));
const DailyGratitudeDiary = React.lazy(() => import("../features/daily_gratitude_diary"));
const DelayAndDefeat = React.lazy(() => import("../features/delay_and_defeat"));
const DepressionTips = React.lazy(() => import("../features/depression_tips"));
const DiffusionTechnique = React.lazy(() => import("../features/diffusion_technique"));
const DoodleBurst = React.lazy(() => import("../features/doodle_burst"));
const Energy = React.lazy(() => import("../features/energy"));
const EnergyApp = React.lazy(() => import("../features/energy_app"));
const EnergyBank = React.lazy(() => import("../features/energy_bank"));
const EnergyTracker = React.lazy(() => import("../features/energy_tracker"));
const EnvironmentOptimization = React.lazy(() => import("../features/environment_optimization"));
const GratitudeTracker = React.lazy(() => import("../features/gratitude_tracker"));
const GroundedTechnique = React.lazy(() => import("../features/grounded_technique"));
const GroundingTechnique = React.lazy(() => import("../features/grounding_technique"));
const GroundingTechniques = React.lazy(() => import("../features/grounding_techniques"));
const IdentityJourney = React.lazy(() => import("../features/identity_journey"));
const IdentityReflection = React.lazy(() => import("../features/identity_reflection"));
const JoyfulActivities = React.lazy(() => import("../features/joyful_activities"));
const KnowYourValues = React.lazy(() => import("../features/know_your_values"));
const MicroWins = React.lazy(() => import("../features/micro_wins"));
const Mood = React.lazy(() => import("../features/mood"));
const MoodApp = React.lazy(() => import("../features/mood_app"));
const PauseButton = React.lazy(() => import("../features/pause_button"));
const PersonalMissionStatement = React.lazy(() => import("../features/personal_mission_statement"));
const PhysicalActivityLog = React.lazy(() => import("../features/physical_activity_log"));
const PhysiomantraLandingPage = React.lazy(() => import("../features/physiomantra_landing_page"));
const PhysiomantraNavigator = React.lazy(() => import("../features/physiomantra_navigator"));
const PhysioQuiz = React.lazy(() => import("../features/physio_quiz"));
const Pitchdeck = React.lazy(() => import("../features/pitchdeck"));
const QuitMerged = React.lazy(() => import("../features/quit_merged"));
const RealStoriesToOvercomeAnxiety = React.lazy(() => import("../features/Real_stories_to_overcome_anxiety"));
const SelfCareBingo = React.lazy(() => import("../features/self_care_bingo"));
const Sleep = React.lazy(() => import("../features/sleep"));
const SleepApp = React.lazy(() => import("../features/sleep_app"));
const SleepTracker = React.lazy(() => import("../features/sleep_tracker"));
const SmokingCravingTracker = React.lazy(() => import("../features/smoking_craving_tracker"));
const SpinTheWheel = React.lazy(() => import("../features/spin_the_wheel"));
const StressTips = React.lazy(() => import("../features/stress_tips"));
const StudentLandingPage = React.lazy(() => import("../features/student_landing_page"));
const TestingCsDash = React.lazy(() => import("../features/testing_cs_dash"));
const ThoughtReset = React.lazy(() => import("../features/thought_reset"));
const ThoughtShifts = React.lazy(() => import("../features/thought_shifts"));
const TriggerDetective = React.lazy(() => import("../features/trigger_detective"));
const VibeTracker = React.lazy(() => import("../features/vibe_tracker"));
const WhatAreYourHabits = React.lazy(() => import("../features/what_are_your_habits"));
const Withdrawal = React.lazy(() => import("../features/withdrawal"));
const WithdrawalApp = React.lazy(() => import("../features/withdrawal_app"));
const WithdrawalTracker = React.lazy(() => import("../features/withdrawal_tracker"));

function ProtectedLayout() {{
  return (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  );
}}

export const router = createBrowserRouter([
  {{
    path: "/",
    children: [
      {{ index: true, element: <SelfCareResources /> }},
      {{ path: "concerns/:concern/:type", element: <StaticContentViewer /> }},
      
      {{
        element: <ProtectedLayout />,
        children: [
          { path: "exercises/4-6-8-breathing/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><App468Breathing /></Suspense> },
          { path: "exercises/5-4-3-2-1-grounding/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><App54321Grounding /></Suspense> },
          { path: "tools/adiction-insights/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><AdictionInsights /></Suspense> },
          { path: "tools/affirmations/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><Affirmations /></Suspense> },
          { path: "tools/alcohol-calculator/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><AlcoholCalculator /></Suspense> },
          { path: "trackers/alcohol-consumption/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><AlcoholConsumption /></Suspense> },
          { path: "trackers/alcohol-craving/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><AlcoholCraving /></Suspense> },
          { path: "trackers/alcohol-withdrawal/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><AlcoholWithdrawal /></Suspense> },
          { path: "tips/anxiety-tips/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><AnxietyTips /></Suspense> },
          { path: "tools/a-letter-to-self/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><ALetterToSelf /></Suspense> },
          { path: "trackers/a-pause-for-appreciation/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><APauseForAppreciation /></Suspense> },
          { path: "exercises/box-breathing/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><BoxBreathing /></Suspense> },
          { path: "tools/brain-dump-and-sort/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><BrainDumpAndSort /></Suspense> },
          { path: "tools/brain-dump-and-sort-clone/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><BrainDumpAndSortClone /></Suspense> },
          { path: "trackers/care-tracker/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><CareTracker /></Suspense> },
          { path: "trackers/consumption/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><Consumption /></Suspense> },
          { path: "trackers/consumption-app/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><ConsumptionApp /></Suspense> },
          { path: "trackers/consumption-tracker/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><ConsumptionTracker /></Suspense> },
          { path: "trackers/craving/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><Craving /></Suspense> },
          { path: "trackers/craving-app/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><CravingApp /></Suspense> },
          { path: "trackers/daily-gratitude-diary/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><DailyGratitudeDiary /></Suspense> },
          { path: "tools/delay-and-defeat/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><DelayAndDefeat /></Suspense> },
          { path: "tips/depression-tips/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><DepressionTips /></Suspense> },
          { path: "exercises/diffusion-technique/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><DiffusionTechnique /></Suspense> },
          { path: "tools/doodle-burst/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><DoodleBurst /></Suspense> },
          { path: "tools/energy/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><Energy /></Suspense> },
          { path: "trackers/energy-app/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><EnergyApp /></Suspense> },
          { path: "tools/energy-bank/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><EnergyBank /></Suspense> },
          { path: "trackers/energy-tracker/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><EnergyTracker /></Suspense> },
          { path: "tools/environment-optimization/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><EnvironmentOptimization /></Suspense> },
          { path: "trackers/gratitude-tracker/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><GratitudeTracker /></Suspense> },
          { path: "exercises/grounded-technique/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><GroundedTechnique /></Suspense> },
          { path: "exercises/grounding-technique/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><GroundingTechnique /></Suspense> },
          { path: "exercises/grounding-techniques/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><GroundingTechniques /></Suspense> },
          { path: "tools/identity-journey/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><IdentityJourney /></Suspense> },
          { path: "tools/identity-reflection/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><IdentityReflection /></Suspense> },
          { path: "tools/joyful-activities/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><JoyfulActivities /></Suspense> },
          { path: "tools/know-your-values/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><KnowYourValues /></Suspense> },
          { path: "tools/micro-wins/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><MicroWins /></Suspense> },
          { path: "trackers/mood/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><Mood /></Suspense> },
          { path: "trackers/mood-app/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><MoodApp /></Suspense> },
          { path: "tools/pause-button/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><PauseButton /></Suspense> },
          { path: "tools/personal-mission-statement/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><PersonalMissionStatement /></Suspense> },
          { path: "trackers/physical-activity-log/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><PhysicalActivityLog /></Suspense> },
          { path: "tools/physiomantra-landing-page/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><PhysiomantraLandingPage /></Suspense> },
          { path: "tools/physiomantra-navigator/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><PhysiomantraNavigator /></Suspense> },
          { path: "tools/physio-quiz/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><PhysioQuiz /></Suspense> },
          { path: "tools/pitchdeck/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><Pitchdeck /></Suspense> },
          { path: "tools/quit-merged/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><QuitMerged /></Suspense> },
          { path: "tools/Real-stories-to-overcome-anxiety/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><RealStoriesToOvercomeAnxiety /></Suspense> },
          { path: "tools/self-care-bingo/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><SelfCareBingo /></Suspense> },
          { path: "trackers/sleep/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><Sleep /></Suspense> },
          { path: "trackers/sleep-app/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><SleepApp /></Suspense> },
          { path: "trackers/sleep-tracker/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><SleepTracker /></Suspense> },
          { path: "trackers/smoking-craving-tracker/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><SmokingCravingTracker /></Suspense> },
          { path: "tools/spin-the-wheel/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><SpinTheWheel /></Suspense> },
          { path: "tips/stress-tips/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><StressTips /></Suspense> },
          { path: "tools/student-landing-page/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><StudentLandingPage /></Suspense> },
          { path: "tools/testing-cs-dash/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><TestingCsDash /></Suspense> },
          { path: "tools/thought-reset/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><ThoughtReset /></Suspense> },
          { path: "tools/thought-shifts/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><ThoughtShifts /></Suspense> },
          { path: "tools/trigger-detective/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><TriggerDetective /></Suspense> },
          { path: "trackers/vibe-tracker/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><VibeTracker /></Suspense> },
          { path: "tools/what-are-your-habits/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><WhatAreYourHabits /></Suspense> },
          { path: "trackers/withdrawal/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><Withdrawal /></Suspense> },
          { path: "trackers/withdrawal-app/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><WithdrawalApp /></Suspense> },
          { path: "trackers/withdrawal-tracker/*", element: <Suspense fallback={<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}><WithdrawalTracker /></Suspense> }
        ]
      }},
      {{ path: "*", element: <Navigate to="/" replace /> }},
    ]
  }}
], {{ basename: "/therapy" }});
