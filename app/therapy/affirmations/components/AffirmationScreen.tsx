"use client";
import React, { useState, useEffect } from "react";
import { feelings } from "@/app/therapy/affirmations/data/affirmations";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const pastelColors = [
  "bg-pastel-peach",
  "bg-pastel-lavender",
  "bg-pastel-mint",
  "bg-pastel-sky",
  "bg-pastel-rose",
  "bg-pastel-butter",
];

interface AffirmationScreenProps {
  feelingId: string;
  colorIndex: number;
  onChooseAnother: () => void;
}

const AffirmationScreen: React.FC<AffirmationScreenProps> = ({
  feelingId,
  colorIndex,
  onChooseAnother,
}) => {
  const { t } = useTranslation();
  const pastelColor = pastelColors[colorIndex % pastelColors.length];
  const feeling = feelings.find((f) => f.id === feelingId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
    setAnimKey(0);
  }, [feelingId]);

  if (!feeling) return null;

  const total = feeling.affirmations.length;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  const goNext = () => {
    if (!isLast) {
      setCurrentIndex((i) => i + 1);
      setAnimKey((k) => k + 1);
    }
  };

  const goPrev = () => {
    if (!isFirst) {
      setCurrentIndex((i) => i - 1);
      setAnimKey((k) => k + 1);
    }
  };

  return (
    <div className="flex min-h-screen flex-col px-6 py-12">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
        {/* Header */}
        <div className="text-center">
          <span className="mb-4 inline-block text-3xl">🌿</span>
          <h1 className="font-serif text-2xl font-medium tracking-tight text-foreground">
            {t(`feelings.${feelingId}.label`)}
          </h1>
        </div>

        {/* Affirmation Card */}
        <div className="flex flex-1 flex-col items-center justify-center py-10">
          <div
            key={animKey}
            className={`affirmation-fade-in w-full rounded-2xl ${pastelColor} p-8 shadow-md`}
          >
            <p className="text-center font-serif text-xl leading-relaxed text-foreground">
              {t(`feelings.${feelingId}.affirmations.${currentIndex}`)}
            </p>
          </div>

          {/* Progress dots */}
          <div className="mt-8 flex items-center gap-2">
            {feeling.affirmations.map((_, i) => (
              <span
                key={i}
                className={`block h-2 w-2 rounded-full transition-all duration-300 ${i === currentIndex
                    ? "scale-125 bg-primary"
                    : "bg-border"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center justify-between pb-2">
          <button
            onClick={goPrev}
            disabled={isFirst}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-card text-foreground shadow-sm transition-all duration-200 hover:shadow-md disabled:opacity-30 disabled:hover:shadow-sm"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <span className="text-sm font-medium text-muted-foreground">
            {currentIndex + 1} / {total}
          </span>

          <button
            onClick={goNext}
            disabled={isLast}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-card text-foreground shadow-sm transition-all duration-200 hover:shadow-md disabled:opacity-30 disabled:hover:shadow-sm"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Bottom buttons */}
        <div className="space-y-3 pb-4 pt-4">
          {isLast && (
            <button
              onClick={() => {
                setCurrentIndex(0);
                setAnimKey((k) => k + 1);
              }}
              className="w-full rounded-lg bg-primary py-4 text-base font-medium text-primary-foreground shadow-sm transition-all duration-300 hover:shadow-md active:scale-[0.98]"
            >
              {t("common.readAgain")}
            </button>
          )}
          <button
            onClick={onChooseAnother}
            className="w-full py-3 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            {t("common.chooseAnother")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AffirmationScreen;
