import React from "react";
import { createBrowserRouter, Navigate } from "react-router";
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

export const router = createBrowserRouter([
  { path: "/", element: <SelfCareResources /> },
  { path: "/self-care", element: <Navigate to="/" replace /> },
  { path: "/service/meditation", element: <MindfulnessPage /> },
  { path: "/ocd", element: <OCDPage /> },
  { path: "/mindfulness-self-care", element: <MindfulnessSelfCare /> },
  { path: "/ocd-self-care", element: <OCDSelfCare /> },
  { path: "/journal", element: <Journal /> },
  { path: "/journal-new", element: <JournalNew /> },
  { path: "/journal/:id", element: <JournalNew /> },
  { path: "/categories", element: <CategoriesPage /> },
  { path: "/subcategory/:subcategoryId", element: <SubcategoryPage /> },
  { path: "/time/:timeId", element: <TimePage /> },
  { path: "/meditation-detail/:meditationId", element: <MeditationDetailPage /> },
  { path: "/browse-by-goal-detail/:goalId", element: <BrowseByGoalDetail /> },
  { path: "/see-all/:section", element: <SeeAllPage /> },
  { path: "/collection-detail/:collectionId", element: <CollectionDetailPage /> },
  { path: "/daily-program/:programId", element: <DailyProgramPage /> },
  { path: "/care-team", element: <CareTeam /> },
  { path: "*", element: <Navigate to="/" replace /> },
], { basename: "/therapy" });
