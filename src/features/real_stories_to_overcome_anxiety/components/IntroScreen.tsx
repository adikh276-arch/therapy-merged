import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen: FC<IntroScreenProps> = ({ onStart }) => {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-8 py-12 text-center">
      {/* Decorative element */}
      <div className="mb-8 opacity-0 animate-fade-in-up">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-primary mx-auto">
          <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
          <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          <circle cx="24" cy="24" r="6" fill="currentColor" opacity="0.7" />
        </svg>
      </div>

      <h1 className="font-heading text-[30px] leading-tight text-foreground opacity-0 animate-fade-in-up max-w-[300px]">
        {t('title')}
      </h1>

      <p className="mt-6 font-body font-medium text-lg text-primary opacity-0 animate-fade-in-up-delay-1">
        {t('subtitle')}
      </p>

      <p className="mt-4 font-body text-[15px] text-muted-foreground italic opacity-0 animate-fade-in-up-delay-2 max-w-[280px]">
        "{t('quote')}"
      </p>

      <button
        onClick={onStart}
        className="mt-12 px-10 py-4 bg-primary text-primary-foreground font-body font-medium text-base rounded-pill shadow-lg hover:shadow-xl active:shadow-md transition-all duration-200 active:scale-[0.97] opacity-0 animate-fade-in-up-delay-3"
      >
        {t('readStories')}
      </button>
    </main>
  );
};

export default IntroScreen;
