"use client";
import { Toaster } from "@/app/therapy/thought-shifts/components/ui/toaster";
import { Toaster as Sonner } from "@/app/therapy/thought-shifts/components/ui/sonner";
import { TooltipProvider } from "@/app/therapy/thought-shifts/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LanguageSelector } from "./components/LanguageSelector";

const queryClient = new QueryClient();

const LanguageHandler = () => {
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = searchParams.get("lang");
    if (lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem("language", lang);
    }
  }, [searchParams, i18n]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/therapy/thought-shifts">
        <LanguageHandler />
        <LanguageSelector />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
