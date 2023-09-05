"use client";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
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

export default function GameTypeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [gameType, setGameType] = useState<EGameType>(EGameType.PVP);
  return (
    <GameTypeContext.Provider value={{ gameType, setGameType }}>
      {children}
    </GameTypeContext.Provider>
  );
}
