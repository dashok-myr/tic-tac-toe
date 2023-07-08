import Link from "next/link";
import React from "react";

export default function NewGameWithPlayerButton() {
  return (
    <Link
      onClick={() => {}}
      href="startgame"
      className="bg-bright-blue h-14 rounded-xl cursor-pointer active:translate-y-2  active:[box-shadow:0_0px_0_0_#228c88,0_0px_0_0_#228c88] active:border-b-[0px] transition-all duration-150 [box-shadow:0_10px_0_0_#228c88] border-b-[1px] border-y-light-green"
    >
      <span className="flex justify-center items-center h-full font-semibold">
        NEW GAME (VS PLAYER)
      </span>
    </Link>
  );
}
