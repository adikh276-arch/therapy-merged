"use client";
import { Toaster } from "@/app/therapy/doodle-burst/components/ui/toaster";
import { Toaster as Sonner } from "@/app/therapy/doodle-burst/components/ui/sonner";
import { TooltipProvider } from "@/app/therapy/doodle-burst/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DoodleHistory from "./pages/DoodleHistory";
import NotFound from "./pages/NotFound";
import Token from "./pages/Token";
import AuthGuard from "./components/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/therapy/doodle-burst">
        <Routes>
          <Route path="/token" element={<Token />} />
          <Route
            path="/"
            element={
              <AuthGuard>
                <Index />
              </AuthGuard>
            }
          />
          <Route
            path="/history"
            element={
              <AuthGuard>
                <DoodleHistory />
              </AuthGuard>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
