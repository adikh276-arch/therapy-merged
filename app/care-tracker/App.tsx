"use client";
import React from "react";
import { Toaster } from "@/app/care-tracker/components/ui/toaster";
import { Toaster as Sonner } from "@/app/care-tracker/components/ui/sonner";
import { TooltipProvider } from "@/app/care-tracker/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { LanguageSelector } from "@/app/care-tracker/components/LanguageSelector";
import { AuthProvider } from "@/app/care-tracker/components/AuthProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Trigger build after environment variable setup
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter basename="/therapy/care-tracker">
          <LanguageSelector />
          <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading translations...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
