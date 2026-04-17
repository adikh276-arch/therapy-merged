"use client";
import { useState } from "react";
import IntroScreen from "@/app/therapy/real-stories-anxiety/components/IntroScreen";
import StorySelectionScreen from "@/app/therapy/real-stories-anxiety/components/StorySelectionScreen";
import StoryScreen from "@/app/therapy/real-stories-anxiety/components/StoryScreen";
import { stories } from "@/app/therapy/real-stories-anxiety/data/stories";
import { LanguageSelector } from "@/app/therapy/real-stories-anxiety/components/LanguageSelector";

type Screen = "intro" | "selection" | "story";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("intro");
  const [storyIndex, setStoryIndex] = useState(0);

  const handleReadStories = () => setScreen("selection");
  const handleSelectStory = (index: number) => {
    setStoryIndex(index);
    setScreen("story");
  };
  const handleNextStory = () => {
    if (storyIndex < stories.length - 1) {
      setStoryIndex(storyIndex + 1);
    } else {
      setScreen("selection");
    }
  };
  const handleBackToStories = () => setScreen("selection");

  return (
    <div className="min-h-screen bg-background relative">
      <LanguageSelector />
      <div className="mx-auto max-w-md min-h-screen">
        {screen === "intro" && <IntroScreen onStart={handleReadStories} />}
        {screen === "selection" && <StorySelectionScreen onSelect={handleSelectStory} />}
        {screen === "story" && (
          <StoryScreen
            story={stories[storyIndex]}
            storyIndex={storyIndex}
            isLast={storyIndex === stories.length - 1}
            onNext={handleNextStory}
            onBack={handleBackToStories}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
