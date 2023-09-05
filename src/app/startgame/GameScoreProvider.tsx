"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { IPlayerId } from "@/app/startgame/useCurrentPlayer";

export interface IGameScore {
  p1: number;
  p2: number;
  ties: number;
}

const DEFAULT_SCORE = {
  p1: 0,
  p2: 0,
  ties: 0,
};

export const GameScoreContext = createContext<{
  gameScore: IGameScore;
  setGameScore: Dispatch<SetStateAction<IGameScore>>;
  updateScore: (currentPlayer: IPlayerId) => void;
  incrementTieScoreByOne: () => void;
}>({
  gameScore: DEFAULT_SCORE,
  setGameScore: () => {},
  updateScore: () => {},
  incrementTieScoreByOne: () => {},
});

export const GameScoreProvider = ({ children }: { children: ReactNode }) => {
  const [gameScore, setGameScore] = useState<IGameScore>(DEFAULT_SCORE);

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
