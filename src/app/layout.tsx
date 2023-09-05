import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import PlayersProvider from "@/providers/PlayersProvider";
import GameStateProvider from "@/providers/GameStateProvider";
import GameTypeProvider from "@/providers/GameTypeProvider";

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
          <GameTypeProvider>
            <GameStateProvider>{children}</GameStateProvider>
          </GameTypeProvider>
        </PlayersProvider>
      </body>
    </html>
  );
}
