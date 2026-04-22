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
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <I18nextProvider i18n={i18n}>
        <UniversalBackButton /><Toaster />
        <Sonner />
        <React.Fragment>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Fragment>
      </I18nextProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
