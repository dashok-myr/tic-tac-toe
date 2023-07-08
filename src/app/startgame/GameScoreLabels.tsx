import { EMark } from "@/context/playersContext";
import React from "react";

interface IGameScoreLabels {
  p1Mark: EMark;
  p2Mark: EMark;
  p1GameScore: number;
  p2GameScore: number;
  tiesGameScore: number;
}

export default function GameScoreLabels({
  p1Mark,
  p2Mark,
  p1GameScore,
  p2GameScore,
  tiesGameScore,
}: IGameScoreLabels) {
  return (
    <>
      <div className="flex justify-center items-center h-12 w-full bg-bright-blue rounded-xl">
        <div className="flex flex-col items-center">
          {p1Mark === EMark.CROSS ? (
            <span>p1 - CROSS</span>
          ) : (
            <span>p1 - NOUGHT</span>
          )}
          <span className="font-bold">{p1GameScore}</span>
        </div>
      </div>
      <div className="flex justify-center items-center h-12 w-full bg-silver rounded-xl">
        <div className="flex flex-col items-center">
          <span>TIES</span>
          <span className="font-bold">{tiesGameScore}</span>
        </div>
      </div>
      <div className="flex justify-center items-center h-12 w-full bg-bright-yellow rounded-xl">
        <div className="flex flex-col items-center">
          {p2Mark === EMark.CROSS ? (
            <span>p2 - CROSS</span>
          ) : (
            <span>p2 - NOUGHT</span>
          )}
          <span className="font-bold">{p2GameScore}</span>
        </div>
      </div>
    </>
  );
}
