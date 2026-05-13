import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { Suspense } from 'react';
import './index.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/features/food_emotion_map/components/ui/sonner";
import { Toaster } from "@/features/food_emotion_map/components/ui/toaster";
import { TooltipProvider } from "@/features/food_emotion_map/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { useTranslation } from "react-i18next";

const queryClient = new QueryClient();

const App = () => (
  <I18nextProvider i18n={i18n}>
    <Suspense fallback={<div className="flex items-center justify-center h-full">{t("common.loading")}</div>}>
      <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      
    </TooltipProvider>
  </QueryClientProvider>
    </Suspense>
  </I18nextProvider>
);

export default App;

