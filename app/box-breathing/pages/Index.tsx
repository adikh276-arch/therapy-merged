"use client";
import { useState } from "react";
import OverviewScreen from "@/app/box-breathing/components/OverviewScreen";
import SessionScreen from "@/app/box-breathing/components/SessionScreen";
import CompleteScreen from "@/app/box-breathing/components/CompleteScreen";

type Screen = "overview" | "session" | "complete";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("overview");

  return (
    <div className="max-w-md mx-auto">
      {screen === "overview" && (
        <OverviewScreen onStart={() => setScreen("session")} />
      )}
      {screen === "session" && (
        <SessionScreen
          onComplete={() => setScreen("complete")}
          onEnd={() => setScreen("overview")}
        />
      )}
      {screen === "complete" && (
        <CompleteScreen
          onRestart={() => setScreen("session")}
          onBack={() => setScreen("overview")}
        />
      )}
    </div>
  );
};

export default Index;
