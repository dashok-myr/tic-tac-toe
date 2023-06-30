"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import logo from "@/icons/logo.svg";
import nought from "@/icons/icon-o.svg";
import cross from "@/icons/icon-x.svg";
import restart from "@/icons/icon-restart.svg";
import Modal from "@/components/Modal";
import { EMark, PlayersContext } from "@/context/playersContext";
import { GameState, GameStateContext } from "@/context/gameState.context";
import { GameScoreContext } from "@/context/gameScore.context";
import useGetModalOptions from "@/app/startgame/useGetModalOptions";

const winningPossibilities = [
  [1, 2, 3],
  [1, 4, 7],
  [1, 5, 9],
  [2, 5, 8],
  [3, 2, 1],
  [3, 5, 7],
  [3, 6, 9],
  [4, 5, 6],
  [6, 5, 4],
  [7, 4, 1],
  [7, 5, 3],
  [7, 8, 9],
  [8, 5, 2],
  [9, 5, 1],
  [9, 6, 3],
  [9, 8, 7],
];

function hasPlayerWon(mark: number[]) {
  if (mark.length < 3) return;

  for (let index = 0; index < winningPossibilities.length; index++) {
    let matches = 0;
    const possibility = winningPossibilities[index];
    for (let indexMark = 0; indexMark < mark.length; indexMark++) {
      const markNumber = mark[indexMark];
      if (possibility.includes(markNumber)) {
        matches++;
      } else {
        break;
      }

      if (matches === 3) {
        return true;
      }
    }
  }
  return false;
}

function hasTied(slots: number[]) {
  return slots.length === 9 && !hasPlayerWon(slots);
}

function MarkIcon({ mark }: { mark: EMark }) {
  if (mark === EMark.CROSS) {
    return <Image src={cross} alt="cross" width="70" height="70" />;
  }
  return <Image src={nought} alt="nought" width="70" height="70" />;
}

export default function StartGame() {
  const { players, setPlayers } = useContext(PlayersContext);
  const { gameState, setGameState } = useContext(GameStateContext);
  const { gameScore, setGameScore } = useContext(GameScoreContext);
  const [currentPlayer, setCurrentPlayer] = useState<"p1" | "p2">(
    players.p1.mark === EMark.CROSS ? "p1" : "p2"
  );
  const modalOptions = useGetModalOptions(gameState, setCurrentPlayer);

  const cellDesign = Array.from({ length: 9 }, (_, index) => index + 1);

  function handleOnClick(slot: number) {
    const copyPlayers = { ...players };

    copyPlayers[currentPlayer].slots.push(slot);
    if (hasPlayerWon(players[currentPlayer].slots)) {
      setGameState(
        currentPlayer === "p1"
          ? GameState.FIRST_PLAYER_WIN
          : GameState.SECOND_PLAYER_WIN
      );

      if (currentPlayer === "p1") {
        setGameScore({
          ...gameScore,
          p1: gameScore.p1 + 1,
        });
      }
      if (currentPlayer === "p2") {
        setGameScore({
          ...gameScore,
          p2: gameScore.p2 + 1,
        });
      }
    }
    if (hasTied([...players.p1.slots, ...players.p2.slots])) {
      setGameState(GameState.TIED);
      setGameScore({
        ...gameScore,
        ties: gameScore.ties + 1,
      });
    }
    setPlayers(copyPlayers);
    setCurrentPlayer(currentPlayer === "p1" ? "p2" : "p1");
  }

  return (
    <div className="flex flex-col justify-center gap-10 mx-auto w-1/2 md:w-1/4 h-screen">
      <Modal
        gameResult={modalOptions?.gameResult || ""}
        firstBtnLabel={modalOptions?.firstBtnLabel || ""}
        secondBtnLabel={modalOptions?.secondBtnLabel || ""}
        showModal={modalOptions !== null}
        navigate={modalOptions?.navigate || ""}
        onFirstBtnClick={modalOptions?.onFirstBtnClick || (() => {})}
        onSecondBtnClick={modalOptions?.onSecondBtnClick || (() => {})}
      />
      <div className="flex justify-between items-end">
        <Image src={logo} alt="logo" className="h-10 w-20" />
        <div className="flex justify-center items-center gap-2 h-12 w-36 bg-light-green rounded-xl">
          {players[currentPlayer].mark === EMark.CROSS ? (
            <Image src={cross} alt="turn" className="h-4 w-4" />
          ) : (
            <Image src={nought} alt="turn" className="h-4 w-4" />
          )}
          <div className="text-silver">TURN</div>
        </div>
        <button
          onClick={() => {
            setGameState(GameState.RESTART);
            setPlayers({
              p1: { mark: EMark.CROSS, slots: [] },
              p2: { mark: EMark.NOUGHT, slots: [] },
            });
          }}
          className="flex justify-center items-center h-12 w-12 bg-silver rounded-xl ml-7"
        >
          <Image src={restart} alt="restart" className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 justify-between">
        {cellDesign.map((_, index) => {
          const slot = index + 1;
          return (
            <button
              onClick={() => handleOnClick(slot)}
              disabled={
                players.p1.slots.includes(slot) ||
                players.p2.slots.includes(slot)
              }
              key={slot}
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
        })}
      </div>
      <div className="flex gap-4 justify-between">
        <div className="flex justify-center items-center h-12 w-full bg-bright-blue rounded-xl">
          <div className="flex flex-col items-center">
            {players.p1.mark === EMark.CROSS ? (
              <span>p1 - CROSS</span>
            ) : (
              <span>p1 - NOUGHT</span>
            )}
            <span className="font-bold">{gameScore.p1}</span>
          </div>
        </div>
        <div className="flex justify-center items-center h-12 w-full bg-silver rounded-xl">
          <div className="flex flex-col items-center">
            <span>TIES</span>
            <span className="font-bold">{gameScore.ties}</span>
          </div>
        </div>
        <div className="flex justify-center items-center h-12 w-full bg-bright-yellow rounded-xl">
          <div className="flex flex-col items-center">
            {players.p2.mark === EMark.CROSS ? (
              <span>p2 - CROSS</span>
            ) : (
              <span>p2 - NOUGHT</span>
            )}
            <span className="font-bold">{gameScore.p2}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
