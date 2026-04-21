import React from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { SelfCareResources } from "./components/SelfCareResources";
import { MindfulnessPage } from "./components/MindfulnessPage";
import { OCDPage } from "./components/OCDPage";
import { MindfulnessSelfCare } from "./components/MindfulnessSelfCare";
import { OCDSelfCare } from "./components/OCDSelfCare";
import { Journal } from "./components/Journal";
import { JournalNew } from "./components/JournalNew";
import { CategoriesPage } from "./components/CategoriesPage";
import { SubcategoryPage } from "./components/SubcategoryPage";
import { TimePage } from "./components/TimePage";
import { MeditationDetailPage } from "./components/MeditationDetailPage";
import { BrowseByGoalDetail } from "./components/BrowseByGoalDetail";
import { SeeAllPage } from "./components/SeeAllPage";
import { CollectionDetailPage } from "./components/CollectionDetailPage";
import { DailyProgramPage } from "./components/DailyProgramPage";
import { CareTeam } from "./components/CareTeam";
import { AuthGuard } from "../components/AuthGuard";
import { StaticContentViewer } from "../components/StaticContentViewer";

// Import integrated features (Group A & B)
import BoxBreathing from "../features/box_breathing";
import Breathing468 from "../features/4_6_8_breathing";
import Grounding54321 from "../features/5_4_3_2_1_grounding";
import JoyfulActivities from "../features/joyful_activities";
import Affirmations from "../features/affirmations";
import GroundedTechnique from "../features/grounded_technique";
import SelfCareBingo from "../features/self_care_bingo";
import DiffusionTechnique from "../features/diffusion_technique";
import ThoughtShifts from "../features/thought_shifts";
import EnvironmentOptimization from "../features/environment_optimization";
import PauseForAppreciation from "../features/a_pause_for_appreciation";
import HabitsQuiz from "../features/what_are_your_habits";
import RealStoriesAnxiety from "../features/Real_stories_to_overcome_anxiety";

import DailyGratitudeDiary from "../features/daily_gratitude_diary";
import PersonalMissionStatement from "../features/personal_mission_statement";
import PhysicalActivityLog from "../features/physical_activity_log";
import LetterToSelf from "../features/a_letter_to_self";
import KnowYourValues from "../features/know_your_values";
import BrainDumpAndSort from "../features/brain_dump_and_sort";
import DoodleBurst from "../features/doodle_burst";
import GratitudeTracker from "../features/gratitude_tracker";
import VibeTracker from "../features/vibe_tracker";
import CareTracker from "../features/care_tracker";

import DepressionTips from "../features/depression_tips";
import AnxietyTips from "../features/anxiety_tips";
import StressTips from "../features/stress_tips";

// Wraps auth guard around nested elements
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
      // Public Route
      { index: true, element: <SelfCareResources /> },
      { path: "self-care", element: <Navigate to="/" replace /> },
      
      // Dynamic single HTML routes (Group C2)
      { path: "concerns/:concern/:type", element: <StaticContentViewer /> },

      // Integrated Features (Group A - Public/Semi-Public)
      { path: "exercises/box-breathing/*", element: <BoxBreathing />  },
      { path: "exercises/4-6-8-breathing/*", element: <Breathing468 />  },
      { path: "exercises/5-4-3-2-1-grounding/*", element: <Grounding54321 />  },
      { path: "exercises/joyful-activities/*", element: <JoyfulActivities />  },
      { path: "tools/affirmations/*", element: <Affirmations />  },
      { path: "exercises/grounded-technique/*", element: <GroundedTechnique />  },
      { path: "tools/self-care-bingo/*", element: <SelfCareBingo />  },
      { path: "exercises/diffusion-techniques/*", element: <DiffusionTechnique />  },
      { path: "tools/thought-shifts/*", element: <ThoughtShifts />  },
      { path: "tools/environment-optimization/*", element: <EnvironmentOptimization />  },
      { path: "exercises/a-pause-for-appreciation/*", element: <PauseForAppreciation />  },
      { path: "tools/what-are-your-habits/*", element: <HabitsQuiz />  },
      { path: "content/real-stories-anxiety/*", element: <RealStoriesAnxiety />  },
      
      { path: "tips/depression/*", element: <DepressionTips />  },
      { path: "tips/anxiety/*", element: <AnxietyTips />  },
      { path: "tips/stress/*", element: <StressTips />  },

      // Protected Routes (Group B & Main App Pages)
      {
        element: <ProtectedLayout />,
        children: [
          // Original Pages
          { path: "service/meditation", element: <MindfulnessPage /> },
          { path: "ocd", element: <OCDPage /> },
          { path: "mindfulness-self-care", element: <MindfulnessSelfCare /> },
          { path: "ocd-self-care", element: <OCDSelfCare /> },
          { path: "journal", element: <Journal /> },
          { path: "journal-new", element: <JournalNew /> },
          { path: "journal/:id", element: <JournalNew /> },
          { path: "categories", element: <CategoriesPage /> },
          { path: "subcategory/:subcategoryId", element: <SubcategoryPage /> },
          { path: "time/:timeId", element: <TimePage /> },
          { path: "meditation-detail/:meditationId", element: <MeditationDetailPage /> },
          { path: "browse-by-goal-detail/:goalId", element: <BrowseByGoalDetail /> },
          { path: "see-all/:section", element: <SeeAllPage /> },
          { path: "collection-detail/:collectionId", element: <CollectionDetailPage /> },
          { path: "daily-program/:programId", element: <DailyProgramPage /> },
          { path: "care-team", element: <CareTeam /> },

          // Group B Miniapps
          { path: "tools/daily-gratitude-diary/*", element: <DailyGratitudeDiary />  },
          { path: "tools/personal-mission-statement/*", element: <PersonalMissionStatement />  },
          { path: "trackers/activity-log/*", element: <PhysicalActivityLog />  },
          { path: "tools/letter-to-self/*", element: <LetterToSelf />  },
          { path: "tools/know-your-values/*", element: <KnowYourValues />  },
          { path: "trackers/brain-dump/*", element: <BrainDumpAndSort />  },
          { path: "tools/doodle-burst/*", element: <DoodleBurst />  },
          { path: "trackers/gratitude/*", element: <GratitudeTracker />  },
          { path: "trackers/mood/*", element: <VibeTracker />  },
          { path: "trackers/self-care/*", element: <CareTracker />  },
        ]
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ]
  }
], { basename: "/therapy" });
