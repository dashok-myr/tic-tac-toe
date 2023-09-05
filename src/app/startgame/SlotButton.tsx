import { EMark, PlayersContext } from "@/providers/PlayersProvider";
import Image from "next/image";
import cross from "@/icons/icon-x.svg";
import nought from "@/icons/icon-o.svg";
import React, { useContext } from "react";

function MarkIcon({ mark }: { mark: EMark }) {
  if (mark === EMark.CROSS) {
    return <Image src={cross} alt="cross" width="70" height="70" />;
  }
  return <Image src={nought} alt="nought" width="70" height="70" />;
}

interface ISlotButtonProps {
  onClick: () => void;
  slot: number;
  disabled: boolean;
}

export default function SlotButton({
  onClick,
  slot,
  disabled,
}: ISlotButtonProps) {
  const { players } = useContext(PlayersContext);

  return (
    <button
      onClick={onClick}
      disabled={
        [...players.p1.slots, ...players.p2.slots].includes(slot) || disabled
      }
      className="w-full h-28 bg-light-green rounded-xl cursor-pointer active:translate-y-2 active:[box-shadow:0_0px_0_0_#0d151a] active:border-b-[0px] transition-all duration-150 [box-shadow:0_10px_0_0_#0d151a] border-b-[1px] border-y-light-green"
    >
      {players.p1.slots.includes(slot) && (
        <div className="flex justify-center">
          <MarkIcon mark={players.p1.mark} />
        </div>
      )}
      {players.p2.slots.includes(slot) && (
        <div className="flex justify-center">
          <MarkIcon mark={players.p2.mark} />
        </div>
      )}
    </button>
  );
}
