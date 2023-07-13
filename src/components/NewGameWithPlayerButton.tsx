import Link from "next/link";
import React, { useContext } from "react";
import { EGameType, GameTypeContext } from "@/context/gameType";

export default function NewGameWithCpuButton() {
  const { setGameType } = useContext(GameTypeContext);

  return (
    <Link
      onClick={() => {
        setGameType(EGameType.CPU);
      }}
      href="startgame"
      className="bg-bright-yellow h-14 rounded-xl cursor-pointer active:translate-y-2  active:[box-shadow:0_0px_0_0_#f0a607,0_0px_0_0_#ffd452] active:border-b-[0px] transition-all duration-150 [box-shadow:0_10px_0_0_#d48f04] border-b-[1px] border-y-amber-800"
    >
      <span className="flex justify-center items-center h-full font-semibold">
        NEW GAME (VS CPU)
      </span>
    </Link>
  );
}
