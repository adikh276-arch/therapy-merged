import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LanguageSelector from "./components/LanguageSelector";

import MoodSelection from "./pages/MoodSelection";
import GratitudeEntry from "./pages/GratitudeEntry";
import ReviewEntry from "./pages/ReviewEntry";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import Token from "./pages/Token";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <>
    <>
      <LanguageSelector />
      <Toaster />
      <Sonner />
      <>
        <Routes>
          <Route path="/token" element={<Token />} />
          <Route path="/" element={<GratitudeEntry />} />
          <Route path="/mood" element={<MoodSelection />} />
          <Route path="/review" element={<ReviewEntry />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </>
  </>
    </TooltipProvider>
  </QueryClientProvider>);

export default App;
