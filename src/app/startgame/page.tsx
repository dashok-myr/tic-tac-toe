"use client";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import logo from "@/icons/logo.svg";
import Modal from "@/components/Modal";
import { EMark, PlayersContext } from "@/providers/PlayersProvider";
import { EGameState, GameStateContext } from "@/providers/GameStateProvider";
import { GameScoreContext } from "@/app/startgame/GameScoreProvider";
import useGetModalOptions from "@/app/startgame/useGetModalOptions";
import TurnLogo from "@/app/startgame/TurnLogo";
import RestartButton from "@/app/startgame/RestartButton";
import GameScoreLabels from "@/app/startgame/GameScoreLabels";
import SlotButton from "@/app/startgame/SlotButton";
import { EGameType, GameTypeContext } from "@/providers/GameTypeProvider";
import useCurrentPlayer from "@/app/startgame/useCurrentPlayer";
import getBestMove from "@/app/startgame/getBestMove";
import { WINNING_POSSIBILITIES } from "@/app/startgame/constants";
import delay from "@/utils/delay";

const CELL_DESIGN = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function hasPlayerWon(mark: number[]) {
  function checkArrayIncludesArray(array1: number[], array2: number[]) {
    for (let num1 of array1) {
      if (!array2.includes(num1)) {
        return false;
      }
    }
    return true;
  }

  if (mark.length < 3) return;

  for (let possibility of WINNING_POSSIBILITIES) {
    if (checkArrayIncludesArray(possibility, mark)) {
      return true;
    }
  }
  return false;
}

function hasTied(slots: number[]) {
  return slots.length === 9;
}

export default function StartGame() {
  const { players, setPlayers, resetPlayers } = useContext(PlayersContext);
  const { gameState, setGameState, setWinner, setTieGame } =
    useContext(GameStateContext);
  const { gameScore, updateScore, incrementTieScoreByOne } =
    useContext(GameScoreContext);
  const { gameType } = useContext(GameTypeContext);

  const {
    currentPlayer,
    setCurrentPlayer,
    toggleCurrentPlayer,
    resetCurrentPlayer,
  } = useCurrentPlayer();
  const modalOptions = useGetModalOptions(gameState, resetCurrentPlayer);

  async function handleOnSlotClick(slot: number) {
    if (gameType === EGameType.PVP) {
      const copyPlayers = { ...players };
      copyPlayers[currentPlayer].slots.push(slot);

      if (hasPlayerWon(players[currentPlayer].slots)) {
        setWinner(currentPlayer);
        updateScore(currentPlayer);
        return;
      }

      if (hasTied([...copyPlayers.p1.slots, ...copyPlayers.p2.slots])) {
        setTieGame();
        incrementTieScoreByOne();
        return;
      }

      setPlayers(copyPlayers);
      toggleCurrentPlayer();
    } else if (gameType === EGameType.CPU) {
      const copyPlayers = { ...players };
      copyPlayers.p1.slots.push(slot);

      if (hasPlayerWon(copyPlayers.p1.slots)) {
        setWinner("p1");
        updateScore("p1");
        return;
      }

      if (hasTied([...copyPlayers.p1.slots, ...copyPlayers.p2.slots])) {
        setTieGame();
        incrementTieScoreByOne();
        return;
      }

      setPlayers(copyPlayers);
      setCurrentPlayer("p2");

      await delay(0.5);

      const copyPlayersCPU = { ...copyPlayers };
      const cpuMove = getBestMove(players.p1.slots, players.p2.slots, "p2");
      copyPlayersCPU.p2.slots.push(cpuMove);

      if (hasPlayerWon(players.p2.slots)) {
        setWinner("p2");
        updateScore("p2");
        return;
      }

      const allSlots = [...copyPlayers.p1.slots, ...copyPlayersCPU.p2.slots];
      if (hasTied(allSlots)) {
        setTieGame();
        incrementTieScoreByOne();
        return;
      }

      setCurrentPlayer("p1");
      setPlayers(copyPlayersCPU);
    }
  }

  useEffect(() => {
    if (
      gameType === EGameType.CPU &&
      players.p2.mark === EMark.CROSS &&
      players.p2.slots.length === 0
    ) {
      delay(0.5).then(() => {
        const copyPlayersCPU = { ...players };
        const cpuMove = getBestMove(players.p1.slots, players.p2.slots, "p2");
        copyPlayersCPU.p2.slots.push(cpuMove);
        toggleCurrentPlayer();
        setPlayers(copyPlayersCPU);
      });
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [players.p2.slots.length]);

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
              setGameState(EGameState.RESTART);
              resetPlayers();
            }}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 justify-between">
          {CELL_DESIGN.map((_, index) => {
            const slot = index + 1;
            return (
              <SlotButton
                key={slot}
                onClick={() => handleOnSlotClick(slot)}
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
