import React, { ReactNode } from "react";
import { GameScoreProvider } from "@/app/startgame/gameScore.context";

export default function Layout({ children }: { children: ReactNode }) {
  return <GameScoreProvider>{children}</GameScoreProvider>;
}
