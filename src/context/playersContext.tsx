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
  resetPlayers: () => void;
  resetPlayersSlots: () => void;
  updatePlayersMarks: (p1Mark: EMark, p2Mark: EMark) => void;
}>({
  players: {
    p1: { mark: EMark.CROSS, slots: [] },
    p2: { mark: EMark.NOUGHT, slots: [] },
  },
  setPlayers: () => {},
  resetPlayers: () => {},
  resetPlayersSlots: () => {},
  updatePlayersMarks: () => {},
});

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<IPlayers>({
    p1: { mark: EMark.CROSS, slots: [] },
    p2: { mark: EMark.NOUGHT, slots: [] },
  });

  const resetPlayers = () => {
    setPlayers({
      p1: { mark: EMark.CROSS, slots: [] },
      p2: { mark: EMark.NOUGHT, slots: [] },
    });
  };

  const resetPlayersSlots = () => {
    setPlayers({
      p1: { ...players.p1, slots: [] },
      p2: { ...players.p2, slots: [] },
    });
  };

  const updatePlayersMarks = (p1Mark: EMark, p2Mark: EMark) => {
    const copyPlayerObj = { ...players };
    copyPlayerObj.p1.mark = p1Mark;
    copyPlayerObj.p2.mark = p2Mark;
    setPlayers(copyPlayerObj);
  };

  return (
    <PlayersContext.Provider
      value={{
        players,
        setPlayers,
        resetPlayers,
        resetPlayersSlots,
        updatePlayersMarks,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
};
