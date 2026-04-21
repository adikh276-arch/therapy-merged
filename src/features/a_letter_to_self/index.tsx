import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
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



const App = () => (
  <>
    <>
      <LanguageSelector />
      <>
      <>
      <>
        
          <Routes>
            <Route path="/" element={<IntroScreen />} />
            <Route path="/write" element={<WritingScreen />} />
            <Route path="/check-in" element={<EmotionalCheckIn />} />
            <Route path="/complete" element={<CompletionScreen />} />
            <Route path="/letters" element={<PastLetters />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        
      </>
    </>
  </>
);

export default App;
