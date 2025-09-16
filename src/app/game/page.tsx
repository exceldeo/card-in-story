"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, Home } from "lucide-react";
import { SwipeCard } from "@/components/SwiperCard";
import {
  getQuestionsByCategories,
  shuffleArray,
  TriviaQuestion,
} from "@/data/triviaData";
import { cn } from "@/utils/cn";

const Game = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const catsParam = searchParams.get("cats");
    const catsArray = catsParam?.split(",").filter(Boolean) || ["all"];
    const allQuestions = getQuestionsByCategories(catsArray);
    setQuestions(shuffleArray(allQuestions));
    // We intentionally depend on searchParams only; parsing happens within the effect
  }, [searchParams]);

  const goToPrevious = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else {
        // Reshuffle and go to last question
        const shuffled = shuffleArray(questions);
        setQuestions(shuffled);
        setCurrentIndex(shuffled.length - 1);
      }
      setIsTransitioning(false);
    }, 150);
  };

  const goToNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Reshuffle and start over
        const shuffled = shuffleArray(questions);
        setQuestions(shuffled);
        setCurrentIndex(0);
      }
      setIsTransitioning(false);
    }, 150);
  };

  const reshuffleQuestions = () => {
    const shuffled = shuffleArray(questions);
    setQuestions(shuffled);
    setCurrentIndex(0);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🤔</div>
          <p className="text-xl text-muted-foreground mb-8">
            Loading questions...
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/categories")}
          className="hover:bg-muted/50"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="text-center">
          <div className="text-sm text-muted-foreground">
            Question {currentIndex + 1} of {questions.length}
          </div>
          <div className="w-32 h-1 bg-muted rounded-full mt-1">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="hover:bg-muted/50"
        >
          <Home className="h-5 w-5" />
        </Button>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg mx-auto">
          <div className="relative h-[500px]">
            <SwipeCard
              key={`${currentQuestion.id}-${currentIndex}`}
              question={currentQuestion}
              onSwipeLeft={goToPrevious}
              onSwipeRight={goToNext}
              className={cn(
                "absolute inset-0 w-full",
                isTransitioning &&
                  "opacity-50 scale-95 transition-all duration-150"
              )}
            />
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="p-4 pb-8">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-center gap-4 mb-4">
            <Button
              onClick={goToPrevious}
              variant="outline"
              size="lg"
              className="rounded-full w-16 h-16 hover:bg-accent/10 hover:border-accent transition-colors"
              disabled={isTransitioning}
            >
              <span className="text-xl">←</span>
            </Button>

            <Button
              onClick={reshuffleQuestions}
              variant="outline"
              size="lg"
              className="rounded-full w-16 h-16 hover:bg-secondary/10 hover:border-secondary transition-colors"
            >
              <RotateCcw className="h-6 w-6" />
            </Button>

            <Button
              onClick={goToNext}
              variant="outline"
              size="lg"
              className="rounded-full w-16 h-16 hover:bg-primary/10 hover:border-primary transition-colors"
              disabled={isTransitioning}
            >
              <span className="text-xl">→</span>
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Swipe or tap the arrows to navigate
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
