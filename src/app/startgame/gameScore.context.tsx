"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export interface IGameScore {
  p1: number;
  p2: number;
  ties: number;
}

export const GameScoreContext = createContext<{
  gameScore: IGameScore;
  setGameScore: Dispatch<SetStateAction<IGameScore>>;
}>({
  gameScore: { p1: 0, p2: 0, ties: 0 },
  setGameScore: () => {},
});

export const GameScoreProvider = ({ children }: { children: ReactNode }) => {
  const [gameScore, setGameScore] = useState<IGameScore>({
    p1: 0,
    p2: 0,
    ties: 0,
  });

  return (
    <GameScoreContext.Provider value={{ gameScore, setGameScore }}>
      {children}
    </GameScoreContext.Provider>
  );
};
