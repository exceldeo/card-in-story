"use client";

import React, { useState, useRef } from "react";
import { TriviaQuestion, getCategoryById } from "@/data/triviaData";
import { cn } from "@/utils/cn";

interface SwipeCardProps {
  question: TriviaQuestion;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  question,
  onSwipeLeft,
  onSwipeRight,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [rotation, setRotation] = useState(0);
  const cardRef = useRef<HTMLButtonElement>(null);
  const startX = useRef(0);

  const category = getCategoryById(question.category);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    startX.current = clientX;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;

    const offset = clientX - startX.current;
    setDragOffset(offset);
    setRotation(offset * 0.1); // Subtle rotation based on drag
  };

  const handleEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
    }

    // Reset position
    setDragOffset(0);
    setRotation(0);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      onSwipeLeft?.();
    } else if (e.key === "ArrowRight") {
      onSwipeRight?.();
    }
  };

  return (
    <button
      ref={cardRef}
      className={cn(
        "trivia-card cursor-grab active:cursor-grabbing select-none",
        "min-h-[400px] flex flex-col justify-center items-center text-center",
        "transform-gpu transition-transform duration-200 ease-out",
        isDragging && "transition-none",
        className
      )}
      type="button"
      aria-label="Swipe card"
      style={{
        transform: `translateX(${dragOffset}px) rotate(${rotation}deg)`,
        opacity: isDragging ? 0.9 : 1,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
    >
      {/* Category Badge */}
      <div className="mb-6">
        <span
          className={cn(
            "category-chip text-sm px-4 py-2",
            category?.color === "primary" &&
              "bg-gradient-to-r from-primary/20 to-primary-glow/20 text-primary",
            category?.color === "secondary" &&
              "bg-gradient-to-r from-secondary/20 to-secondary/10 text-secondary",
            category?.color === "accent" &&
              "bg-gradient-to-r from-accent/20 to-accent/10 text-accent",
            category?.color === "success" &&
              "bg-gradient-to-r from-success/20 to-success/10 text-success"
          )}
        >
          {category?.emoji} {category?.name}
        </span>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold leading-relaxed text-card-foreground">
          {question.question}
        </h2>
      </div>

      {/* Swipe Hints */}
      <div className="flex justify-between w-full px-8 mt-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-accent to-accent/80 flex items-center justify-center">
            <span className="text-white text-xs">←</span>
          </div>
          <span>Previous</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Next</span>
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
            <span className="text-white text-xs">→</span>
          </div>
        </div>
      </div>
    </button>
  );
};
