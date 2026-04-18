"use client";
import { Toaster } from "@/app/breathing-4-6-8/components/ui/toaster";
import { Toaster as Sonner } from "@/app/breathing-4-6-8/components/ui/sonner";
import { TooltipProvider } from "@/app/breathing-4-6-8/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroScreen from "./pages/IntroScreen";
import ActiveBreathing from "./pages/ActiveBreathing";
import CompletionScreen from "./pages/CompletionScreen";
import NotFound from "./pages/NotFound";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageSwitcher />
      <BrowserRouter basename="/therapy/breathing-4-6-8">
        <Routes>
          <Route path="/" element={<IntroScreen />} />
          <Route path="/breathe" element={<ActiveBreathing />} />
          <Route path="/complete" element={<CompletionScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
