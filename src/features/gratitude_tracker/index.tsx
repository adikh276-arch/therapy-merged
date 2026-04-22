import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { UniversalBackButton } from '../../components/UniversalBackButton';
import './index.css';
import React from 'react';
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LanguageSelector from "./components/LanguageSelector";
import AuthGuard from "./components/AuthGuard";
import MoodSelection from "./pages/MoodSelection";
import GratitudeEntry from "./pages/GratitudeEntry";
import ReviewEntry from "./pages/ReviewEntry";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import Token from "./pages/Token";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18n}>
      <TooltipProvider>
        <LanguageSelector />
        <UniversalBackButton /><Toaster />
        <Sonner />
        <React.Fragment>
          <Routes>
            <Route path="/token" element={<Token />} />
            <Route path="/" element={<AuthGuard><GratitudeEntry /></AuthGuard>} />
            <Route path="/mood" element={<AuthGuard><MoodSelection /></AuthGuard>} />
            <Route path="/review" element={<AuthGuard><ReviewEntry /></AuthGuard>} />
            <Route path="/history" element={<AuthGuard><History /></AuthGuard>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Fragment>
      </TooltipProvider>
    </I18nextProvider>
  </QueryClientProvider>
);

export default App;
