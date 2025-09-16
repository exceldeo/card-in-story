import { Metadata } from "next";
import * as React from "react";

export const metadata: Metadata = {
  title: "Categories",
  description: "Explore various trivia categories",
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
