import React from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { LanguageSelector } from "./components/LanguageSelector";
import { AuthProvider } from "./components/AuthProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Trigger build after environment variable setup
const App = () => (
  <>
    <>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <>
          <LanguageSelector />
          <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading translations...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </>
      </AuthProvider>
    </>
  </>
);

export default App;
