import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { PremiumLayout } from '../../components/shared/PremiumLayout';
import './index.css';
import './i18n';
import React, { useEffect } from 'react';
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthGuard } from "./components/AuthGuard";
import { initDatabase } from "./lib/db";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <I18nextProvider i18n={i18n}>
          <Toaster />
          <Sonner />
          <PremiumLayout title="Activity Log">
            <AuthGuard>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthGuard>
          </PremiumLayout>
        </I18nextProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
