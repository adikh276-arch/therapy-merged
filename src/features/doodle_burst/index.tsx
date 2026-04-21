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
import DoodleHistory from "./pages/DoodleHistory";
import NotFound from "./pages/NotFound";
import Token from "./pages/Token";
import AuthGuard from "./components/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UniversalBackButton /><Toaster />
      <Sonner />
      <React.Fragment>
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
      </React.Fragment>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
