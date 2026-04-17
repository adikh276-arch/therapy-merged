"use client";
import { Toaster } from "@/app/therapy/personal-mission-statement/components/ui/toaster";
import { Toaster as Sonner } from "@/app/therapy/personal-mission-statement/components/ui/sonner";
import { TooltipProvider } from "@/app/therapy/personal-mission-statement/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import LanguageSelector from "@/app/therapy/personal-mission-statement/components/LanguageSelector";
import AuthGuard from "@/app/therapy/personal-mission-statement/components/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/therapy/personal-mission-statement">
        <LanguageSelector />
        <Routes>
          <Route path="/" element={<AuthGuard><Index /></AuthGuard>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
