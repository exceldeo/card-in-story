import { Metadata } from "next";
import * as React from "react";

export const metadata: Metadata = {
  title: "Game",
  description: "Explore various trivia games",
};

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
