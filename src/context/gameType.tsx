"use client";
import React, {
  createContext,
  SetStateAction,
  Dispatch,
  useState,
  ReactNode,
} from "react";

export enum EGameType {
  PVP = "PVP",
  CPU = "CPU",
}

export const GameTypeContext = createContext<{
  gameType: EGameType;
  setGameType: Dispatch<SetStateAction<EGameType>>;
}>({
  gameType: EGameType.PVP,
  setGameType: () => {},
});

export const GameTypeProvider = ({ children }: { children: ReactNode }) => {
  const [gameType, setGameType] = useState<EGameType>(EGameType.PVP);
  return (
    <GameTypeContext.Provider value={{ gameType, setGameType }}>
      {children}
    </GameTypeContext.Provider>
  );
};
