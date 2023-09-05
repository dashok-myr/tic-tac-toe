"use client";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { IPlayerId } from "@/app/startgame/useCurrentPlayer";

export enum EGameState {
  CHOOSE_GAME_TYPE,
  PLAYING,
  FIRST_PLAYER_WIN,
  SECOND_PLAYER_WIN,
  WIN,
  TIED,
  LOST,
  RESTART,
}

export const GameStateContext = createContext<{
  gameState: EGameState;
  setGameState: Dispatch<SetStateAction<EGameState>>;
  setWinner: (currentPlayer: IPlayerId) => void;
  setTieGame: () => void;
}>({
  gameState: EGameState.CHOOSE_GAME_TYPE,
  setGameState: () => {},
  setWinner: () => {},
  setTieGame: () => {},
});

export default function GameStateProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [gameState, setGameState] = useState<EGameState>(
    EGameState.CHOOSE_GAME_TYPE
  );

  const setWinner = (currentPlayer: IPlayerId) => {
    setGameState(
      currentPlayer === "p1"
        ? EGameState.FIRST_PLAYER_WIN
        : EGameState.SECOND_PLAYER_WIN
    );
  };

  const setTieGame = () => {
    setGameState(EGameState.TIED);
  };

  return (
    <GameStateContext.Provider
      value={{ gameState, setGameState, setWinner, setTieGame }}
    >
      {children}
    </GameStateContext.Provider>
  );
}
