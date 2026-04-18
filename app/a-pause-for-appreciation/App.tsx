"use client";
import { Toaster } from "@/app/a-pause-for-appreciation/components/ui/toaster";
import { Toaster as Sonner } from "@/app/a-pause-for-appreciation/components/ui/sonner";
import { TooltipProvider } from "@/app/a-pause-for-appreciation/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LanguageSelector from "./components/LanguageSelector";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/therapy/a-pause-for-appreciation">
        <LanguageSelector />
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
