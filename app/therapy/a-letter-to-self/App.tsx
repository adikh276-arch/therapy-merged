"use client";
import { Toaster } from "@/app/therapy/a-letter-to-self/components/ui/toaster";
import { Toaster as Sonner } from "@/app/therapy/a-letter-to-self/components/ui/sonner";
import { TooltipProvider } from "@/app/therapy/a-letter-to-self/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroScreen from "./pages/IntroScreen";
import WritingScreen from "./pages/WritingScreen";
import EmotionalCheckIn from "./pages/EmotionalCheckIn";
import CompletionScreen from "./pages/CompletionScreen";
import PastLetters from "./pages/PastLetters";
import NotFound from "./pages/NotFound";
import { LanguageSelector } from "./components/LanguageSelector";
import { AuthGuard } from "./components/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageSelector />
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/therapy/a-letter-to-self">
        <AuthGuard>
          <Routes>
            <Route path="/" element={<IntroScreen />} />
            <Route path="/write" element={<WritingScreen />} />
            <Route path="/check-in" element={<EmotionalCheckIn />} />
            <Route path="/complete" element={<CompletionScreen />} />
            <Route path="/letters" element={<PastLetters />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthGuard>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
