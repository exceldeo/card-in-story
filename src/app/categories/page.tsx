"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { categories } from "@/data/triviaData";
import { cn } from "@/utils/cn";

const Categories = () => {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const selectAll = () => {
    setSelectedCategories(["all"]);
  };

  const handlePlay = () => {
    const categoriesToPlay =
      selectedCategories.length === 0 ? ["all"] : selectedCategories;
    const query = new URLSearchParams({
      cats: categoriesToPlay.join(","),
    }).toString();
    router.push(`/game?${query}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8 pt-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="hover:bg-muted/50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-card-foreground">
            Choose Categories
          </h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Select All Button */}
        <div className="mb-8">
          <Button
            onClick={selectAll}
            variant="outline"
            className={cn(
              "w-full h-16 rounded-2xl text-lg font-semibold transition-all",
              selectedCategories.includes("all")
                ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground border-primary"
                : "hover:bg-muted/50"
            )}
          >
            🌟 All Categories
          </Button>
        </div>

        {/* Category Grid */}
        <div className="grid gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              disabled={selectedCategories.includes("all")}
              className={cn(
                "trivia-card p-6 h-20 flex items-center justify-between transition-all text-left",
                "hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
                selectedCategories.includes(category.id) &&
                  !selectedCategories.includes("all") &&
                  "ring-2 ring-primary shadow-glow",
                category.color === "primary" &&
                  selectedCategories.includes(category.id) &&
                  "bg-gradient-to-r from-primary/10 to-primary-glow/10",
                category.color === "secondary" &&
                  selectedCategories.includes(category.id) &&
                  "bg-gradient-to-r from-secondary/10 to-secondary/5",
                category.color === "accent" &&
                  selectedCategories.includes(category.id) &&
                  "bg-gradient-to-r from-accent/10 to-accent/5",
                category.color === "success" &&
                  selectedCategories.includes(category.id) &&
                  "bg-gradient-to-r from-success/10 to-success/5"
              )}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{category.emoji}</span>
                <div>
                  <h3 className="font-semibold text-lg text-card-foreground">
                    {category.name}
                  </h3>
                </div>
              </div>

              {(selectedCategories.includes(category.id) ||
                selectedCategories.includes("all")) && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Play Button */}
        <Button
          onClick={handlePlay}
          className="btn-primary w-full h-16 text-lg font-semibold rounded-2xl"
        >
          <Play className="mr-3 h-6 w-6" />
          Start Game (
          {selectedCategories.length === 0
            ? "All"
            : selectedCategories.length}{" "}
          selected)
        </Button>
      </div>
    </div>
  );
};

export default Categories;
