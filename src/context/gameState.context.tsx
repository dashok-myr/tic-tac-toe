"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

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
}>({
  gameState: EGameState.CHOOSE_GAME_TYPE,
  setGameState: () => {},
});

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<EGameState>(
    EGameState.CHOOSE_GAME_TYPE
  );

  return (
    <GameStateContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameStateContext.Provider>
  );
};
