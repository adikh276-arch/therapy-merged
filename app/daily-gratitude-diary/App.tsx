"use client";
import { Toaster } from "@/app/daily-gratitude-diary/components/ui/toaster";
import { Toaster as Sonner } from "@/app/daily-gratitude-diary/components/ui/sonner";
import { TooltipProvider } from "@/app/daily-gratitude-diary/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LanguageSelector from "./components/LanguageSelector";
import AuthGuard from "./components/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageSelector />
      <BrowserRouter basename="/therapy/daily-gratitude-diary">
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

export default App;
