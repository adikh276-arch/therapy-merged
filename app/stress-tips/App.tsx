"use client";
import { Toaster } from "@/app/stress-tips/components/ui/toaster";
import { Toaster as Sonner } from "@/app/stress-tips/components/ui/sonner";
import { TooltipProvider } from "@/app/stress-tips/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TipDetail from "./pages/TipDetail";
import NotFound from "./pages/NotFound";
import { LanguageSelector } from "@/app/stress-tips/components/LanguageSelector";
import "./i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageSelector />
      <BrowserRouter basename="/therapy/stress-tips">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tip/:slug" element={<TipDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
