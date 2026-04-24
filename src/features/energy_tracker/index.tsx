import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { EnergyProvider } from "./context/EnergyContext";
import { AnimatePresence } from "framer-motion";
import EnergyCheckIn from "./pages/EnergyCheckIn";
import EnergyFactors from "./pages/EnergyFactors";
import TodaySummary from "./pages/TodaySummary";
import WeeklyOverview from "./pages/WeeklyOverview";
import Token from "./pages/Token";
import NotFound from "./pages/NotFound";
import PageTransition from "./components/PageTransition";
import AuthGuard from "./components/AuthGuard";
import React from 'react';
import { TooltipProvider } from "./components/ui/tooltip";
import { PremiumLayout } from "../../components/shared/PremiumLayout";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AuthGuard>
      <EnergyProvider>
        <Routes>
          <Route path="/" element={<EnergyCheckIn />} />
          <Route path="/factors" element={<EnergyFactors />} />
          <Route path="/summary" element={<TodaySummary />} />
          <Route path="/weekly" element={<WeeklyOverview />} />
          <Route path="/token" element={<Token />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </EnergyProvider>
    </AuthGuard>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <I18nextProvider i18n={i18n}>
          <AnimatedRoutes />
        </I18nextProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};


export default App;
