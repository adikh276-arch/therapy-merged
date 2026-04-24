import { PremiumLayout } from '../../components/shared/PremiumLayout';
import './index.css';
import './i18n';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './i18n';
import React from 'react';
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import IntroScreen from "./pages/IntroScreen";
import ActiveBreathing from "./pages/ActiveBreathing";
import CompletionScreen from "./pages/CompletionScreen";
import NotFound from "./pages/NotFound";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

const queryClient = new QueryClient();

const App = () => {
  const { t } = useTranslation();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <I18nextProvider i18n={i18n}>
          <Toaster />
          <Sonner />
          <PremiumLayout title={i18n.t('app_title')}>
            <Routes>
              <Route path="/" element={<IntroScreen />} />
              <Route path="/breathe" element={<ActiveBreathing />} />
              <Route path="/complete" element={<CompletionScreen />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PremiumLayout>
        </I18nextProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
