import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DoodleHistory from "./pages/DoodleHistory";
import NotFound from "./pages/NotFound";
import Token from "./pages/Token";




const App = () => (
  <>
    <>
      <>
      <>
      <>
        <Routes>
          <Route path="/token" element={<Token />} />
          <Route
            path="/"
            element={
              
                <Index />
              
            }
          />
          <Route
            path="/history"
            element={
              
                <DoodleHistory />
              
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </>
  </>
);

export default App;
