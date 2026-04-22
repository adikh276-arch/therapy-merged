import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { UniversalBackButton } from '../../components/UniversalBackButton';
import './index.css';
import i18n from './i18n';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroScreen from "./pages/IntroScreen";
import WritingScreen from "./pages/WritingScreen";
import EmotionalCheckIn from "./pages/EmotionalCheckIn";
import CompletionScreen from "./pages/CompletionScreen";
import PastLetters from "./pages/PastLetters";
import NotFound from "./pages/NotFound";
import { LanguageSelector } from "./components/LanguageSelector";
import { AuthGuard } from "./components/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18n}>
      <TooltipProvider>
        <LanguageSelector />
        <UniversalBackButton /><Toaster />
        <Sonner />
        <React.Fragment>
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
        </React.Fragment>
      </TooltipProvider>
    </I18nextProvider>
  </QueryClientProvider>
);

export default App;
