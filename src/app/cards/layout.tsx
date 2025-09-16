import { Metadata } from "next";
import * as React from "react";

export const metadata: Metadata = {
  title: "List of Cards",
  description: "Explore various trivia cards",
};

export default function CardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
