"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export enum EMark {
  CROSS = "X",
  NOUGHT = "O",
}

export interface IPlayer {
  mark: EMark;
  slots: number[];
}

export interface IPlayers {
  p1: IPlayer;
  p2: IPlayer;
}

export const PlayersContext = createContext<{
  players: IPlayers;
  setPlayers: Dispatch<SetStateAction<IPlayers>>;
}>({
  players: {
    p1: { mark: EMark.CROSS, slots: [] },
    p2: { mark: EMark.NOUGHT, slots: [] },
  },
  setPlayers: () => {},
});

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  const [player, setPlayer] = useState<IPlayers>({
    p1: { mark: EMark.CROSS, slots: [] },
    p2: { mark: EMark.NOUGHT, slots: [] },
  });

  return (
    <PlayersContext.Provider value={{ players: player, setPlayers: setPlayer }}>
      {children}
    </PlayersContext.Provider>
  );
};
