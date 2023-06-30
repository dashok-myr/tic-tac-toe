import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { PlayersProvider } from "@/context/playersContext";
import { GameStateProvider } from "@/context/gameState.context";
import { GameScoreProvider } from "@/context/gameScore.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tic Tac Toe",
  description: "Tic Tac Toe Game",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PlayersProvider>
          <GameScoreProvider>
            <GameStateProvider>{children}</GameStateProvider>
          </GameScoreProvider>
        </PlayersProvider>
      </body>
    </html>
  );
}
