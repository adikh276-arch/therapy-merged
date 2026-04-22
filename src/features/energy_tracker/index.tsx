import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { EnergyProvider } from "./context/EnergyContext";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import EnergyCheckIn from "./pages/EnergyCheckIn";
import EnergyFactors from "./pages/EnergyFactors";
import TodaySummary from "./pages/TodaySummary";
import WeeklyOverview from "./pages/WeeklyOverview";
import NotFound from "./pages/NotFound";
import PageTransition from "./components/PageTransition";
import AuthGuard from "./components/AuthGuard";
import React from 'react';
import { TooltipProvider } from "./components/ui/tooltip";
import { UniversalBackButton } from "../../components/UniversalBackButton";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<AuthGuard><EnergyCheckIn /></AuthGuard>} />
          <Route path="/factors" element={<AuthGuard><EnergyFactors /></AuthGuard>} />
          <Route path="/summary" element={<AuthGuard><TodaySummary /></AuthGuard>} />
          <Route path="/weekly" element={<AuthGuard><WeeklyOverview /></AuthGuard>} />
          <Route path="*" element={<AuthGuard><NotFound /></AuthGuard>} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <I18nextProvider i18n={i18n}>
          <div className="min-h-[100dvh] w-full">
            <UniversalBackButton action="energy" />
            <Toaster />
            <Sonner />
            <EnergyProvider>
              <AnimatedRoutes />
            </EnergyProvider>
          </div>
        </I18nextProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
