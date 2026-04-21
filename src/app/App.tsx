import React, { useState, useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AppBetterPopup } from "./components/AppBetterPopup";

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
    <>
      {showAppPopup && <AppBetterPopup onClose={handleClosePopup} />}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
