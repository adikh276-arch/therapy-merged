import { PremiumLayout } from '../../components/shared/PremiumLayout';
import './index.css';
import './i18n';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import React from 'react';
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import IntroScreen from "./pages/IntroScreen";
import WritingScreen from "./pages/WritingScreen";
import EmotionalCheckIn from "./pages/EmotionalCheckIn";
import CompletionScreen from "./pages/CompletionScreen";
import PastLetters from "./pages/PastLetters";
import NotFound from "./pages/NotFound";
import { LanguageSelector } from "./components/LanguageSelector";
import { AuthGuard } from "./components/AuthGuard";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <TooltipProvider>
          <AuthGuard>
            <Routes>
              <Route path="/" element={<IntroScreen />} />
              <Route path="/write" element={<WritingScreen />} />
              <Route path="/check-in" element={<EmotionalCheckIn />} />
              <Route path="/complete" element={<CompletionScreen />} />
              <Route path="/letters" element={<PastLetters />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthGuard>
        </TooltipProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
};


export default App;
