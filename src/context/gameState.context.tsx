"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export enum GameState {
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
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
}>({
  gameState: GameState.CHOOSE_GAME_TYPE,
  setGameState: () => {},
});

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(
    GameState.CHOOSE_GAME_TYPE
  );

  return (
    <GameStateContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameStateContext.Provider>
  );
};
