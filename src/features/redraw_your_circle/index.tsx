import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { Suspense } from 'react';
import './index.css';
import { useState, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/features/redraw_your_circle/components/ui/sonner";
import { Toaster } from "@/features/redraw_your_circle/components/ui/toaster";
import { TooltipProvider } from "@/features/redraw_your_circle/components/ui/tooltip";
import Index from "./pages/Index";
import IntroScreen from "./pages/IntroScreen";
import CircleScreen from "./pages/CircleScreen";
import ReflectionScreen from "./pages/ReflectionScreen";
import HistoryScreen from "./pages/HistoryScreen";
import NotFound from "./pages/NotFound";
import { useTranslation } from "react-i18next";

const queryClient = new QueryClient();

const App = () => {
  const { t } = useTranslation();
  const [names, setNames] = useState<Record<string, string>>({});
  const reset = useCallback(() => setNames({}), []);

  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<div className="flex items-center justify-center h-full">{t("common.loading")}</div>}>
        <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/intro" element={<IntroScreen />} />
            <Route
              path="/circle"
              element={<CircleScreen names={names} onNamesChange={setNames} />}
            />
            <Route
              path="/reflection"
              element={<ReflectionScreen names={names} onReset={reset} />}
            />
            <Route path="/history" element={<HistoryScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        
      </TooltipProvider>
    </QueryClientProvider>
      </Suspense>
    </I18nextProvider>
  );
};

export default App;

