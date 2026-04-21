import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { QuizContainer } from "@/components/quiz/QuizContainer";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Testimonials } from "@/components/Testimonials";
import { TrustSection } from "@/components/TrustSection";
import { LeadForm } from "@/components/LeadForm";
import { ConfirmationPage } from "@/components/ConfirmationPage";
import { calculatePattern, type BodyPattern } from "@/lib/patternCalculator";
import type { QuizAnswers } from "@/lib/quizQuestions";

type FunnelStage =
  | "hero"
  | "quiz"
  | "loading"
  | "form"
  | "confirmation";

const Index = () => {
  const [stage, setStage] = useState<FunnelStage>("hero");
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);
  const [pattern, setPattern] = useState<BodyPattern | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  const handleStartQuiz = useCallback(() => {
    setStage("quiz");
  }, []);

  const handleQuizComplete = useCallback((answers: QuizAnswers) => {
    setQuizAnswers(answers);
    setStage("loading");
  }, []);

  const handleLoadingComplete = useCallback(() => {
    if (quizAnswers) {
      const calculatedPattern = calculatePattern(quizAnswers);
      setPattern(calculatedPattern);
    }
    // Skip results, go straight to form to save profile
    setStage("form");
  }, [quizAnswers]);


  const handleFormSubmit = useCallback((data: { email: string }) => {
    setUserEmail(data.email);
    // Redirect to external pricing page
    window.location.href = "https://web.mantracare.com/plans/physiotherapy";
  }, []);

  const handleBackToHero = useCallback(() => {
    setStage("hero");
    setQuizAnswers(null);
    setPattern(null);
  }, []);

  // Render based on current stage
  switch (stage) {
    case "quiz":
      return (
        <QuizContainer
          onComplete={handleQuizComplete}
          onBack={handleBackToHero}
        />
      );

    case "loading":
      return <LoadingScreen onComplete={handleLoadingComplete} />;

    case "form":
      return (
        <>
          <LeadForm
            onSubmit={handleFormSubmit}
            onBack={handleBackToHero} // Back to start if they drop off at form
          />
          <div className="pb-20">
            <TrustSection />
            <Testimonials />
          </div>
        </>
      );

    case "confirmation":
      // This state might not be reached due to redirect, but keeping as fallback/safety
      return <ConfirmationPage email={userEmail} />;

    default:
      return (
        <>
          <Header />
          <Hero onStartQuiz={handleStartQuiz} />
        </>
      );
  }
};

export default Index;
