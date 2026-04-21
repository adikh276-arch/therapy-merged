import { Suspense } from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TipDetail from "./pages/TipDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", fontSize: "14px", color: "#888" }}>Loading…</div>}>
    <>
      <>
        <Toaster />
        <Sonner />
        <>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tip/:id" element={<TipDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      </>
    </>
  </Suspense>
    </TooltipProvider>
  </QueryClientProvider>);

export default App;
