"use client";
import { Toaster } from "@/app/therapy/grounded-technique/components/ui/toaster";
import { Toaster as Sonner } from "@/app/therapy/grounded-technique/components/ui/sonner";
import { TooltipProvider } from "@/app/therapy/grounded-technique/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TechniqueDetail from "./pages/TechniqueDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/therapy/grounded-technique">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/technique/:id" element={<TechniqueDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
