"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import logo from "@/icons/logo.svg";
import Modal from "@/components/Modal";
import { EMark, PlayersContext } from "@/context/playersContext";
import { GameState, GameStateContext } from "@/context/gameState.context";
import { GameScoreContext } from "@/app/startgame/gameScore.context";
import useGetModalOptions from "@/app/startgame/useGetModalOptions";
import TurnLogo from "@/app/startgame/TurnLogo";
import RestartButton from "@/app/startgame/RestartButton";
import GameScoreLabels from "@/app/startgame/GameScoreLabels";
import SlotButton from "@/app/startgame/SlotButton";

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
    <>
      <Modal
        gameResult={modalOptions?.gameResult || ""}
        firstBtnLabel={modalOptions?.firstBtnLabel || ""}
        secondBtnLabel={modalOptions?.secondBtnLabel || ""}
        showModal={modalOptions !== null}
        navigateQuitButton={modalOptions?.navigateQuitButton || ""}
        onFirstBtnClick={modalOptions?.onFirstBtnClick || (() => {})}
        onSecondBtnClick={modalOptions?.onSecondBtnClick || (() => {})}
      />
      <div className="flex flex-col justify-center gap-10 mx-auto w-1/2 md:w-1/4 h-screen">
        <div className="flex justify-between items-end">
          <Image src={logo} alt="logo" className="h-10 w-20" />
          <TurnLogo currentPlayerMark={players[currentPlayer].mark} />
          <RestartButton
            onRestart={() => {
              setGameState(GameState.RESTART);
              setPlayers({
                p1: { mark: EMark.CROSS, slots: [] },
                p2: { mark: EMark.NOUGHT, slots: [] },
              });
            }}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 justify-between">
          {cellDesign.map((_, index) => {
            const slot = index + 1;
            return (
              <SlotButton
                key={slot}
                onClick={() => handleOnClick(slot)}
                slot={slot}
              />
            );
          })}
        </div>
        <div className="flex gap-4 justify-between">
          <GameScoreLabels
            p1Mark={players.p1.mark}
            p2Mark={players.p2.mark}
            p1GameScore={gameScore.p1}
            p2GameScore={gameScore.p2}
            tiesGameScore={gameScore.ties}
          />
        </div>
      </div>
    </>
  );
}
