"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import cross from "@/icons/icon-x.svg";
import nought from "@/icons/icon-o.svg";
import { Mark, PlayersContext } from "@/context/playersContext";

export default function ChooseMarkSwitch() {
  const { players, setPlayers } = useContext(PlayersContext);
  const [currentMark, setCurrentMark] = useState<Mark>(Mark.CROSS);
  console.log(players);
  return (
    <div className="bg-light-green rounded-xl p-5">
      <div className="flex flex-col justify-between gap-4 items-center">
        <div className="text-light-silver font-semibold">
          PICK PLAYER 1&apos;S MARK
        </div>
        <div className="flex items-center bg-dark-green p-2 h-20 w-96 rounded-xl">
          <button
            onClick={() => {
              setCurrentMark(Mark.CROSS);
              const copyPlayerObj = { ...players };
              copyPlayerObj.p1.mark = Mark.CROSS;
              copyPlayerObj.p2.mark = Mark.NOUGHT;
              setPlayers(copyPlayerObj);
            }}
            className={`flex-1 ${
              currentMark === Mark.CROSS ? "p-3 bg-silver rounded-xl" : ""
            }`}
          >
            <div className="flex justify-center">
              <Image src={cross} alt="x" width="40" height="40" />
            </div>
          </button>
          <button
            onClick={() => {
              setCurrentMark(Mark.NOUGHT);
              const copyPlayerObj = { ...players };
              copyPlayerObj.p1.mark = Mark.NOUGHT;
              copyPlayerObj.p2.mark = Mark.CROSS;
              setPlayers(copyPlayerObj);
            }}
            className={`flex-1 ${
              currentMark === Mark.NOUGHT ? "p-3 bg-silver rounded-xl" : ""
            }`}
          >
            <div className="flex justify-center">
              <Image src={nought} alt="o" width="40" height="40" />
            </div>
          </button>
        </div>
        <div className="text-silver">REMEMBER : X GOES FIRST</div>
      </div>
      <div className="flex justify-around">
        <div>
          Player 1:
          {players.p1.mark === Mark.CROSS ? (
            <div>CROSS</div>
          ) : (
            <div>NOUGHT</div>
          )}
        </div>
        <div>
          Player 2:
          {players.p2.mark === Mark.CROSS ? (
            <div>CROSS</div>
          ) : (
            <div>NOUGHT</div>
          )}
        </div>
      </div>
    </div>
  );
}
