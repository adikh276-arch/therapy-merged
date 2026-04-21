import { FC } from "react";
import { stories } from "@/data/stories";
import { useTranslation } from "react-i18next";

interface StorySelectionScreenProps {
  onSelect: (index: number) => void;
}

const StorySelectionScreen: FC<StorySelectionScreenProps> = ({ onSelect }) => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen px-6 py-10 text-left">
      <h2 className="font-heading text-2xl text-foreground mb-8 opacity-0 animate-fade-in-up">
        {t('chooseStory')}
      </h2>

      <div className="flex flex-col gap-4">
        {stories.map((story, index) => (
          <button
            key={story.name}
            onClick={() => onSelect(index)}
            className={`
              bg-card text-left rounded-lg p-6 shadow-sm
              hover:shadow-md active:animate-card-press
              transition-shadow duration-200
              opacity-0
              ${index === 0 ? "animate-fade-in-up" : ""}
              ${index === 1 ? "animate-fade-in-up-delay-1" : ""}
              ${index === 2 ? "animate-fade-in-up-delay-2" : ""}
              ${index >= 3 ? "animate-fade-in-up-delay-3" : ""}
            `}
          >
            <p className="font-body font-semibold text-base text-foreground">
              {t(`stories.${index}.name`)}, {story.age}
            </p>
            <p className="mt-2 font-body text-sm text-primary italic leading-relaxed">
              "{t(`stories.${index}.quote`)}"
            </p>
          </button>
        ))}
      </div>
    </main>
  );
};

export default StorySelectionScreen;
