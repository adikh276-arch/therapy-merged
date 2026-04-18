"use client";
import { Toaster } from "@/app/know-your-values/components/ui/toaster";
import { Toaster as Sonner } from "@/app/know-your-values/components/ui/sonner";
import { TooltipProvider } from "@/app/know-your-values/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import LanguageSelector from "./components/LanguageSelector";

import { AuthProvider } from "./components/AuthContext";
import { AuthGuard } from "./components/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter basename="/therapy/know-your-values">
          <LanguageSelector />
          <Routes>
            <Route path="/" element={<AuthGuard><Index /></AuthGuard>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
