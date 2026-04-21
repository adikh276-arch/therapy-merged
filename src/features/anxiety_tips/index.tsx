import { UniversalBackButton } from '../../components/UniversalBackButton';
import './index.css';
import './i18n';
import React from 'react';
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SeekSupport from "./pages/tips/SeekSupport";
import DeepBreathing from "./pages/tips/DeepBreathing";
import Mindfulness from "./pages/tips/Mindfulness";
import MuscleRelaxation from "./pages/tips/MuscleRelaxation";
import PositiveSelfTalk from "./pages/tips/PositiveSelfTalk";

import LanguageSelector from "./components/LanguageSelector";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageSelector />
      <UniversalBackButton /><Toaster />
      <Sonner />
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tip/seek-support" element={<SeekSupport />} />
          <Route path="/tip/deep-breathing" element={<DeepBreathing />} />
          <Route path="/tip/mindfulness" element={<Mindfulness />} />
          <Route path="/tip/muscle-relaxation" element={<MuscleRelaxation />} />
          <Route path="/tip/positive-self-talk" element={<PositiveSelfTalk />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Fragment>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
