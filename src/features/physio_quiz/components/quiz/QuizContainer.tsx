import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { quizQuestions, encouragementMessages, type QuizAnswers } from "@/lib/quizQuestions";
import { ProgressBar } from "./ProgressBar";
import { QuizOptionCard, MultiSelectOption } from "./QuizOption";
import { QuizSlider } from "./QuizSlider";
import { BodyMap } from "./BodyMap";
import MantraLogo from "@/assets/mantra-logo.svg";

interface QuizContainerProps {
  onComplete: (answers: QuizAnswers) => void;
  onBack: () => void;
}

export const QuizContainer = ({ onComplete, onBack }: QuizContainerProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for back
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;
  const currentAnswer = answers[currentQuestion.id];
  
  // Check if current question has a valid answer
  const hasAnswer = useCallback(() => {
    if (!currentAnswer) return false;
    if (currentQuestion.type === 'multi') {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0;
    }
    if (currentQuestion.type === 'slider') {
      return typeof currentAnswer === 'number';
    }
    return typeof currentAnswer === 'string' && currentAnswer.length > 0;
  }, [currentAnswer, currentQuestion.type]);
  
  const handleSingleSelect = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
    
    // Auto-advance after a short delay for single select (except last question)
    if (currentQuestionIndex < totalQuestions - 1) {
      setTimeout(() => {
        goToNext();
      }, 300);
    }
  };
  
  const handleMultiSelect = (optionId: string) => {
    const currentSelections = (answers[currentQuestion.id] as string[]) || [];
    const newSelections = currentSelections.includes(optionId)
      ? currentSelections.filter((id) => id !== optionId)
      : [...currentSelections, optionId];
    
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: newSelections }));
  };
  
  const handleSliderChange = (value: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };
  
  const goToNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setDirection(1);
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      onComplete(answers);
    }
  };
  
  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      onBack();
    }
  };
  
  // Get encouragement message if applicable
  const encouragement = encouragementMessages[currentQuestion.id];
  
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };
  
  // Initialize slider values with defaults
  if (currentQuestion.type === 'slider' && currentAnswer === undefined) {
    const config = currentQuestion.sliderConfig!;
    const defaultValue = Math.round((config.min + config.max) / 2);
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: defaultValue }));
  }
  
  return (
    <div className="min-h-screen bg-gradient-surface flex flex-col">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="section-container py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={goToPrevious}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <img src={MantraLogo} alt="PhysioMantra" className="h-8" />
            <div className="w-16" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>
      
      {/* Progress */}
      <div className="section-container pt-6">
        <ProgressBar currentQuestion={currentQuestionIndex + 1} totalQuestions={totalQuestions} />
      </div>
      
      {/* Question content */}
      <main className="flex-1 section-container py-8">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestion.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Category badge */}
              <div className="mb-4">
                <span className="text-xs font-medium text-primary uppercase tracking-wide">
                  {currentQuestion.category}
                </span>
              </div>
              
              {/* Question */}
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">
                {currentQuestion.question}
              </h2>
              
              {/* Encouragement message */}
              {encouragement && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-brand-secondary mb-6 font-medium"
                >
                  {encouragement}
                </motion.p>
              )}
              
              {/* Answer options based on type */}
              <div className="space-y-3">
                {currentQuestion.type === 'body-map' && currentQuestion.options && (
                  <BodyMap
                    options={currentQuestion.options}
                    selectedValue={(currentAnswer as string) || ''}
                    onSelect={handleSingleSelect}
                  />
                )}
                
                {currentQuestion.type === 'single' && currentQuestion.options && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <QuizOptionCard
                        key={option.id}
                        label={option.label}
                        description={option.description}
                        isSelected={currentAnswer === option.id}
                        onClick={() => handleSingleSelect(option.id)}
                        index={index}
                      />
                    ))}
                  </div>
                )}
                
                {currentQuestion.type === 'multi' && currentQuestion.options && (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground mb-4">
                      Select all that apply
                    </p>
                    {currentQuestion.options.map((option, index) => (
                      <MultiSelectOption
                        key={option.id}
                        label={option.label}
                        isSelected={((currentAnswer as string[]) || []).includes(option.id)}
                        onClick={() => handleMultiSelect(option.id)}
                        index={index}
                      />
                    ))}
                  </div>
                )}
                
                {currentQuestion.type === 'slider' && currentQuestion.sliderConfig && (
                  <QuizSlider
                    value={(currentAnswer as number) || currentQuestion.sliderConfig.min}
                    onChange={handleSliderChange}
                    {...currentQuestion.sliderConfig}
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      {/* Footer with continue button (for multi-select and last question) */}
      {(currentQuestion.type === 'multi' || currentQuestion.type === 'slider' || currentQuestionIndex === totalQuestions - 1) && (
        <footer className="sticky bottom-0 bg-background/80 backdrop-blur-md border-t border-border/50">
          <div className="section-container py-4">
            <div className="max-w-2xl mx-auto">
              <motion.button
                onClick={goToNext}
                disabled={!hasAnswer()}
                className="btn-hero w-full disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 disabled:translate-y-0"
                whileHover={hasAnswer() ? { scale: 1.02 } : {}}
                whileTap={hasAnswer() ? { scale: 0.98 } : {}}
              >
                {currentQuestionIndex === totalQuestions - 1 ? 'Get My Results' : 'Continue'}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};
