import type React from "react";
import GameClient from "@/app/game/GameClient";

export default function Page({
  searchParams,
}: Readonly<{
  searchParams: { [key: string]: string | string[] | undefined };
}>) {
  const raw = searchParams.cats;
  const catsArray = Array.isArray(raw)
    ? raw.join(",").split(",").filter(Boolean)
    : raw?.split(",").filter(Boolean) ?? ["all"];

  return <GameClient selectedCategories={catsArray} />;
}
