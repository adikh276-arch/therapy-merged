import { FC } from "react";
import { Story } from "@/data/stories";
import { useTranslation } from "react-i18next";

interface StoryScreenProps {
  story: Story;
  storyIndex: number;
  isLast: boolean;
  onNext: () => void;
  onBack: () => void;
}

const StoryScreen: FC<StoryScreenProps> = ({ story, storyIndex, isLast, onNext, onBack }) => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen px-6 py-10 animate-fade-in text-left" key={story.name}>
      {/* Back link */}
      <button
        onClick={onBack}
        className="font-body text-sm text-muted-foreground mb-6 flex items-center gap-1.5 hover:text-foreground transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 12L6 8L10 4" />
        </svg>
        {t('allStories')}
      </button>

      <h2 className="font-heading text-2xl text-foreground mb-8 opacity-0 animate-fade-in-up">
        {t(`stories.${storyIndex}.name`)}, {story.age}
      </h2>

      {/* Story photo */}
      {story.image && (
        <div className="rounded-lg overflow-hidden mb-8 opacity-0 animate-fade-in-up-delay-1">
          <img
            src={story.image}
            alt={`${t(`stories.${storyIndex}.name`)}'s story`}
            className="w-full h-52 object-cover"
            loading="lazy"
          />
        </div>
      )}

      <article className="space-y-5 opacity-0 animate-fade-in-up-delay-1 text-left">
        {(t(`stories.${storyIndex}.body`, { returnObjects: true }) as string[]).map((paragraph, i) => (
          <p key={i} className="font-body text-story-body text-foreground text-left">
            {paragraph}
          </p>
        ))}
      </article>

      {/* Reflection */}
      <div className="mt-10 bg-sage-light rounded-lg p-6 border-l-4 border-accent opacity-0 animate-fade-in-up-delay-2">
        <p className="font-body font-medium italic text-primary text-[15px] leading-relaxed">
          "{t(`stories.${storyIndex}.reflection`)}"
        </p>
      </div>

      {/* Navigation button */}
      <div className="mt-10 mb-8 opacity-0 animate-fade-in-up-delay-3">
        {isLast ? (
          <button
            onClick={onBack}
            className="w-full py-4 rounded-pill border-2 border-primary text-primary font-body font-medium text-base hover:bg-primary hover:text-primary-foreground transition-colors duration-200 active:scale-[0.97]"
          >
            {t('backToStories')}
          </button>
        ) : (
          <button
            onClick={onNext}
            className="w-full py-4 rounded-pill border-2 border-primary text-primary font-body font-medium text-base hover:bg-primary hover:text-primary-foreground transition-colors duration-200 active:scale-[0.97]"
          >
            {t('nextStory')}
          </button>
        )}
      </div>
    </main>
  );
};

export default StoryScreen;
