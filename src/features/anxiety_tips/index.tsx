import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { PremiumLayout } from '../../components/shared/PremiumLayout';
import './index.css';
import './i18n';
import React from 'react';
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SeekSupport from "./pages/tips/SeekSupport";
import DeepBreathing from "./pages/tips/DeepBreathing";
import Mindfulness from "./pages/tips/Mindfulness";
import MuscleRelaxation from "./pages/tips/MuscleRelaxation";
import PositiveSelfTalk from "./pages/tips/PositiveSelfTalk";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <I18nextProvider i18n={i18n}>
        <Toaster />
        <Sonner />
        <PremiumLayout title="Anxiety Tips">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tip/seek-support" element={<SeekSupport />} />
            <Route path="/tip/deep-breathing" element={<DeepBreathing />} />
            <Route path="/tip/mindfulness" element={<Mindfulness />} />
            <Route path="/tip/muscle-relaxation" element={<MuscleRelaxation />} />
            <Route path="/tip/positive-self-talk" element={<PositiveSelfTalk />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PremiumLayout>
      </I18nextProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
