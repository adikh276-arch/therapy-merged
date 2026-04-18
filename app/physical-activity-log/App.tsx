"use client";
import { Toaster } from "@/app/physical-activity-log/components/ui/toaster";
import { Toaster as Sonner } from "@/app/physical-activity-log/components/ui/sonner";
import { TooltipProvider } from "@/app/physical-activity-log/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import { AuthGuard } from "./components/AuthGuard";
import { initSchema } from './lib/db';
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initSchema();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/therapy/physical-activity-log">
          <AuthGuard>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthGuard>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
