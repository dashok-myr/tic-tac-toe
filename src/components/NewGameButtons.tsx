import Link from "next/link";
import React from "react";

export default function NewGameButtons() {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="startgame"
        className="bg-bright-yellow h-14 rounded-xl cursor-pointer active:translate-y-2  active:[box-shadow:0_0px_0_0_#f0a607,0_0px_0_0_#ffd452] active:border-b-[0px] transition-all duration-150 [box-shadow:0_10px_0_0_#d48f04] border-b-[1px] border-y-amber-800"
      >
        <span className="flex justify-center items-center h-full font-semibold">
          NEW GAME (VS CPU)
        </span>
      </Link>
      <Link
        onClick={() => {}}
        href="startgame"
        className="bg-bright-blue h-14 rounded-xl cursor-pointer active:translate-y-2  active:[box-shadow:0_0px_0_0_#228c88,0_0px_0_0_#228c88] active:border-b-[0px] transition-all duration-150 [box-shadow:0_10px_0_0_#228c88] border-b-[1px] border-y-light-green"
      >
        <span className="flex justify-center items-center h-full font-semibold">
          NEW GAME (VS PLAYER)
        </span>
      </Link>
    </div>
  );
}
