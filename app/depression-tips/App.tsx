"use client";
import { Suspense } from "react";
import { Toaster } from "@/app/depression-tips/components/ui/toaster";
import { Toaster as Sonner } from "@/app/depression-tips/components/ui/sonner";
import { TooltipProvider } from "@/app/depression-tips/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TipDetail from "./pages/TipDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", fontSize: "14px", color: "#888" }}>Loading…</div>}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/therapy/depression-tips">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tip/:id" element={<TipDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Suspense>
);

export default App;
