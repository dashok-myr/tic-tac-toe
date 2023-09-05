import { EMark } from "@/providers/PlayersProvider";
import Image from "next/image";
import cross from "@/icons/icon-x.svg";
import nought from "@/icons/icon-o.svg";
import React from "react";

interface ITurnLogo {
  currentPlayerMark: EMark;
}

export default function TurnLogo({ currentPlayerMark }: ITurnLogo) {
  return (
    <div className="flex justify-center items-center gap-2 h-12 w-36 bg-light-green rounded-xl">
      {currentPlayerMark === EMark.CROSS ? (
        <Image src={cross} alt="turn" className="h-4 w-4" />
      ) : (
        <Image src={nought} alt="turn" className="h-4 w-4" />
      )}
      <div className="text-silver">TURN</div>
    </div>
  );
}
