import React, { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AppBetterPopup } from "./components/AppBetterPopup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const queryClient = new QueryClient();

function App() {
  const [showAppPopup, setShowAppPopup] = useState(false);

  useEffect(() => {
    // Check if user is logged in and should see the popup
    const userString = localStorage.getItem("mantraUser");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        if (user.showAppPopup !== false) {
          setShowAppPopup(true);
        }
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
  }, []);

  const handleClosePopup = () => {
    setShowAppPopup(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {showAppPopup && <AppBetterPopup onClose={handleClosePopup} />}
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
