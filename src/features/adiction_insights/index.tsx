import React from 'react';
import { useState, useEffect } from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TokenPage from "./pages/Token";

const queryClient = new QueryClient();

const App = () => {
  const [handshakeComplete, setHandshakeComplete] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const performHandshake = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      const existingUserId = sessionStorage.getItem("qm_user_id");

      if (existingUserId) {
        setHandshakeComplete(true);
        return;
      }

      if (!token) {
        setError(true);
        return;
      }

      try {
        // Step 1: Handshake with MantraCare
        const res = await fetch("https://api.mantracare.com/user/user-info", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (!res.ok) throw new Error("Handshake failed");

        const { user_id } = await res.json();
        sessionStorage.setItem("qm_user_id", user_id);
        window.history.replaceState({}, "", window.location.pathname);

        // Step 2: Init user on local backend
        const initRes = await fetch("http://localhost:4000/api/user/init", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": user_id.toString(),
          },
        });

        if (!initRes.ok) throw new Error("Local init failed");

        setHandshakeComplete(true);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    performHandshake();
  }, []);

  if (error) {
    return (
      <React.Fragment>
        <Routes>
          <Route path="/token" element={<TokenPage />} />
          <Route path="*" element={<Navigate to="/token" />} />
        </Routes>
      </React.Fragment>
    );
  }

  if (!handshakeComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <React.Fragment>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/token" element={<TokenPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Fragment>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
