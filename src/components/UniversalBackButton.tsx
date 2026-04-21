import { ArrowLeft } from "lucide-react";
import React from "react";

export function UniversalBackButton({ action = "exit" }: { action?: string }) {
  const handleBack = () => {
    if (window.parent !== window) {
      window.parent.postMessage({ action }, 'https://web.mantracare.com');
    } else {
      window.history.back();
    }
  };

  return (
    <button
      onClick={handleBack}
      className="fixed top-4 left-4 z-[999] flex items-center gap-1.5 w-10 h-10 justify-center rounded-2xl bg-card border shadow-sm hover:shadow-md text-foreground transition-all"
    >
      <ArrowLeft className="w-5 h-5 flex-shrink-0" />
    </button>
  );
}
