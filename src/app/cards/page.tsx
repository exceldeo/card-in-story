"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from "lucide-react";
import {
  triviaQuestions,
  categories,
  getCategoryById,
} from "@/data/triviaData";
import { cn } from "@/utils/cn";

const CardList = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredQuestions = triviaQuestions.filter((question) => {
    const matchesSearch = question.question
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || question.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/20 z-10">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="hover:bg-muted/50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-card-foreground">
              All Cards
            </h1>
            <div className="w-10" />
          </div>

          {/* Search and Filter */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 rounded-xl border-border/20"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                  selectedCategory === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                )}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2",
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 text-muted-foreground"
                  )}
                >
                  <span>{category.emoji}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredQuestions.length} of {triviaQuestions.length}{" "}
          questions
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
          {filteredQuestions.map((question, index) => {
            const category = getCategoryById(question.category);

            return (
              <div
                key={question.id}
                className="trivia-card p-6 hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className={cn(
                      "category-chip text-xs px-3 py-1",
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
                  <span className="text-xs text-muted-foreground">
                    #{index + 1}
                  </span>
                </div>

                <p className="text-lg leading-relaxed text-card-foreground">
                  {question.question}
                </p>

                {question.difficulty && (
                  <div className="mt-4 flex justify-end">
                    <span
                      className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        question.difficulty === "easy" &&
                          "bg-success/20 text-success",
                        question.difficulty === "medium" &&
                          "bg-secondary/20 text-secondary",
                        question.difficulty === "hard" &&
                          "bg-destructive/20 text-destructive"
                      )}
                    >
                      {question.difficulty}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">
              No questions found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardList;
