"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, List } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* App Title */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            TriviaSwipe
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Swipe through fun questions with couples, friends, and family
          </p>
        </div>

        {/* Fun animated emoji */}
        <div className="mb-12 text-6xl animate-pulse">💕🎉👫</div>

        {/* Action Buttons */}
        <div className="space-y-4 w-full max-w-sm mx-auto">
          <Link href="/categories" className="block">
            <Button
              size="lg"
              className="btn-primary w-full h-16 text-lg font-semibold rounded-2xl"
            >
              <Play className="mr-3 h-6 w-6" />
              Start Playing
            </Button>
          </Link>

          <Link href="/cards" className="block">
            <Button
              variant="outline"
              size="lg"
              className="w-full h-16 text-lg font-semibold rounded-2xl border-2 hover:bg-muted/50 transition-colors"
            >
              <List className="mr-3 h-6 w-6" />
              View All Cards
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl mb-2">👋</div>
            <h3 className="font-semibold text-card-foreground">Easy to Play</h3>
            <p className="text-sm text-muted-foreground">
              Just swipe left or right through questions
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-card-foreground">
              Multiple Categories
            </h3>
            <p className="text-sm text-muted-foreground">
              Choose from couples, friends, family, and more
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl mb-2">❤️</div>
            <h3 className="font-semibold text-card-foreground">
              Build Connections
            </h3>
            <p className="text-sm text-muted-foreground">
              Deepen relationships through meaningful conversations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
