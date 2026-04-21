import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TipDetail from "./pages/TipDetail";
import NotFound from "./pages/NotFound";
import { LanguageSelector } from "./components/LanguageSelector";
import "./i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <>
    <>
      <Toaster />
      <Sonner />
      <LanguageSelector />
      <>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tip/:slug" element={<TipDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </>
  </>
    </TooltipProvider>
  </QueryClientProvider>);

export default App;
