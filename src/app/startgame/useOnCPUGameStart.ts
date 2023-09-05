import { useContext, useEffect } from "react";
import { EGameType, GameTypeContext } from "@/providers/GameTypeProvider";
import { EMark, PlayersContext } from "@/providers/PlayersProvider";

export default function useOnCPUGameStart(onStart: () => {}) {
  const { gameType } = useContext(GameTypeContext);
  const { players } = useContext(PlayersContext);

  useEffect(() => {
    if (
      gameType === EGameType.CPU &&
      players.p2.mark === EMark.CROSS &&
      players.p2.slots.length === 0
    ) {
      onStart();
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [players.p2.slots.length]);
}
