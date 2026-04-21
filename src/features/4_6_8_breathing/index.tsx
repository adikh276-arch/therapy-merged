import { UniversalBackButton } from '../../components/UniversalBackButton';
import './index.css';
import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import React from 'react';
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroScreen from "./pages/IntroScreen";
import ActiveBreathing from "./pages/ActiveBreathing";
import CompletionScreen from "./pages/CompletionScreen";
import NotFound from "./pages/NotFound";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <I18nextProvider i18n={i18n}>
      <UniversalBackButton /><Toaster />
      <Sonner />
      <LanguageSwitcher />
      <React.Fragment>
        <Routes>
          <Route path="/" element={<IntroScreen />} />
          <Route path="/breathe" element={<ActiveBreathing />} />
          <Route path="/complete" element={<CompletionScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Fragment>
          </I18nextProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
