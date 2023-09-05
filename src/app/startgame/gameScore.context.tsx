"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { IPlayerId } from "@/context/gameState.context";

export interface IGameScore {
  p1: number;
  p2: number;
  ties: number;
}

export const GameScoreContext = createContext<{
  gameScore: IGameScore;
  setGameScore: Dispatch<SetStateAction<IGameScore>>;
  updateScore: (currentPlayer: IPlayerId) => void;
  incrementTieScoreByOne: () => void;
}>({
  gameScore: { p1: 0, p2: 0, ties: 0 },
  setGameScore: () => {},
  updateScore: () => {},
  incrementTieScoreByOne: () => {},
});

export const GameScoreProvider = ({ children }: { children: ReactNode }) => {
  const [gameScore, setGameScore] = useState<IGameScore>({
    p1: 0,
    p2: 0,
    ties: 0,
  });

  const updateScore = (currentPlayer: IPlayerId) => {
    setGameScore({
      ...gameScore,
      [currentPlayer]: gameScore[currentPlayer] + 1,
    });
  };

  const incrementTieScoreByOne = () => {
    setGameScore({
      ...gameScore,
      ties: gameScore.ties + 1,
    });
  };

  return (
    <GameScoreContext.Provider
      value={{ gameScore, setGameScore, updateScore, incrementTieScoreByOne }}
    >
      {children}
    </GameScoreContext.Provider>
  );
};
