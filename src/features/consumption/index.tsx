import React from 'react';
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthGate } from "./components/AuthGate";
import { lingo } from "./lib/lingo";
import { useState, useEffect, ChangeEvent } from "react";
import { Cigarette, BarChart3 } from "lucide-react";

const queryClient = new QueryClient();

const App = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [locale, setLocale] = useState("en");
  const [translatedTitle, setTranslatedTitle] = useState("Consumption Tracker");

  // Update translation when locale changes
  useEffect(() => {
    const translate = async () => {
      try {
        const result = await lingo.localizeText("Consumption Tracker", {
          sourceLocale: "en",
          targetLocale: locale,
        });
        setTranslatedTitle(result);
      } catch (e) {
        console.error("Translation error", e);
        setTranslatedTitle("Consumption Tracker");
      }
    };
    if (locale !== "en") {
      translate();
    } else {
      setTranslatedTitle("Consumption Tracker");
    }
  }, [locale]);

  const handleLocaleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value);
  };

  return (
    <>
      {/* Header with language selector */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-5 py-3 max-w-lg mx-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Cigarette size={18} className="text-primary" />
            </div>
            <h1 className="text-base font-semibold text-foreground font-sans">
              {translatedTitle}
            </h1>
          </div>
          <div>
            <select
              value={locale}
              onChange={handleLocaleChange}
              className="rounded border p-1"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
          <button
            onClick={() => setShowHistory(true)}
            className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <BarChart3 size={18} />
          </button>
        </div>
      </header>

      <AuthGate>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <React.Fragment>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </React.Fragment>
          </TooltipProvider>
        </QueryClientProvider>
      </AuthGate>
    </>
  );
};

export default App;




import { AuthGate } from './components/AuthGate';

const App = () => {
  const [translatedTitle, setTranslatedTitle] = useState('Consumption Tracker');
  const [locale, setLocale] = useState('en');

  // Update translation when locale changes
  useEffect(() => {
    const translate = async () => {
      try {
        const result = await lingo.localizeText('Consumption Tracker', {
          sourceLocale: 'en',
          targetLocale: locale,
        });
        setTranslatedTitle(result);
      } catch (e) {
        console.error('Translation error', e);
        setTranslatedTitle('Consumption Tracker');
      }
    };
    if (locale !== 'en') {
      translate();
    } else {
      setTranslatedTitle('Consumption Tracker');
    }
  }, [locale]);

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value);
  };

  return (
    <>
      {/* Header with language selector */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-5 py-3 max-w-lg mx-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Cigarette size={18} className="text-primary" />
            </div>
            <h1 className="text-base font-semibold text-foreground font-sans">{translatedTitle}</h1>
          </div>
          <div>
            <select value={locale} onChange={handleLocaleChange} className="rounded border p-1">
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
          <button
            onClick={() => setShowHistory(true)}
            className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <BarChart3 size={18} />
          </button>
        </div>
      </header>

      <AuthGate>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <React.Fragment>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </React.Fragment>
          </TooltipProvider>
        </QueryClientProvider>
      </AuthGate>
      );

      export default App;

// v1.0.1 - Trigger Fresh Build
