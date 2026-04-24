import { PremiumLayout } from '../../components/shared/PremiumLayout';
import './index.css';
import './i18n';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import React from 'react';
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DoodleHistory from "./pages/DoodleHistory";
import NotFound from "./pages/NotFound";
import Token from "./pages/Token";
import AuthGuard from "./components/AuthGuard";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <I18nextProvider i18n={i18n}>
          <Toaster />
          <Sonner />
          <PremiumLayout title="Doodle Burst">
            <Routes>
              <Route path="/token" element={<Token />} />
              <Route
                path="/"
                element={
                  <AuthGuard>
                    <Index />
                  </AuthGuard>
                }
              />
              <Route
                path="/history"
                element={
                  <AuthGuard>
                    <DoodleHistory />
                  </AuthGuard>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PremiumLayout>
        </I18nextProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
