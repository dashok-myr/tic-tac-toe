import { useContext, useState } from "react";
import { EMark, PlayersContext } from "@/context/playersContext";

export default function useCurrentPlayer() {
  const { players } = useContext(PlayersContext);

  const [currentPlayer, setCurrentPlayer] = useState<"p1" | "p2">(
    players.p1.mark === EMark.CROSS ? "p1" : "p2"
  );

  const toggleCurrentPlayer = () => {
    setCurrentPlayer(currentPlayer === "p1" ? "p2" : "p1");
  };

  const resetCurrentPlayer = () => {
    setCurrentPlayer(players.p1.mark === EMark.CROSS ? "p1" : "p2");
  };

  return {
    currentPlayer,
    setCurrentPlayer,
    toggleCurrentPlayer,
    resetCurrentPlayer,
  };
}
2;
