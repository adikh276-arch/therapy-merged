import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { PremiumLayout } from '../../components/shared/PremiumLayout';
import './index.css';
import React from 'react';
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TechniqueDetail from "./pages/TechniqueDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18n}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <PremiumLayout title="Grounding Techniques">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/technique/:id" element={<TechniqueDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PremiumLayout>
      </TooltipProvider>
    </I18nextProvider>
  </QueryClientProvider>
);

export default App;
