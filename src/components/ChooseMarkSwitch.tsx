"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import cross from "@/icons/icon-x.svg";
import nought from "@/icons/icon-o.svg";
import { EMark, PlayersContext } from "@/context/playersContext";
import classnames from "classnames";

export default function ChooseMarkSwitch() {
  const { players, setPlayers } = useContext(PlayersContext);
  const [currentMark, setCurrentMark] = useState<EMark>(EMark.CROSS);

  return (
    <div className="bg-light-green rounded-xl p-5">
      <div className="flex flex-col justify-between gap-4 items-center">
        <div className="text-light-silver font-semibold">
          PICK PLAYER 1&apos;S MARK
        </div>
        <div className="flex items-center bg-dark-green p-2 h-20 w-96 rounded-xl">
          <button
            onClick={() => {
              setCurrentMark(EMark.CROSS);
              const copyPlayerObj = { ...players };
              copyPlayerObj.p1.mark = EMark.CROSS;
              copyPlayerObj.p2.mark = EMark.NOUGHT;
              setPlayers(copyPlayerObj);
            }}
            className={classnames("flex-1", {
              "p-3 bg-silver rounded-xl": currentMark === EMark.CROSS,
            })}
          >
            <div className="flex justify-center">
              <Image src={cross} alt="x" width="40" height="40" />
            </div>
          </button>
          <button
            onClick={() => {
              setCurrentMark(EMark.NOUGHT);
              const copyPlayerObj = { ...players };
              copyPlayerObj.p1.mark = EMark.NOUGHT;
              copyPlayerObj.p2.mark = EMark.CROSS;
              setPlayers(copyPlayerObj);
            }}
            className={classnames("flex-1", {
              "p-3 bg-silver rounded-xl": currentMark === EMark.NOUGHT,
            })}
          >
            <div className="flex justify-center">
              <Image src={nought} alt="o" width="40" height="40" />
            </div>
          </button>
        </div>
        <div className="text-silver">REMEMBER : X GOES FIRST</div>
      </div>
      <div className="flex justify-around mt-2 text-silver">
        <div>
          Player 1:
          {players.p1.mark === EMark.CROSS ? (
            <div>CROSS</div>
          ) : (
            <div>NOUGHT</div>
          )}
        </div>
        <div>
          Player 2:
          {players.p2.mark === EMark.CROSS ? (
            <div>CROSS</div>
          ) : (
            <div>NOUGHT</div>
          )}
        </div>
      </div>
    </div>
  );
}
