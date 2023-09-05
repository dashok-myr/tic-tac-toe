"use client";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import logo from "@/icons/logo.svg";
import Modal from "@/components/Modal";
import { EMark, PlayersContext } from "@/context/playersContext";
import { EGameState, GameStateContext } from "@/context/gameState.context";
import { GameScoreContext } from "@/app/startgame/gameScore.context";
import useGetModalOptions from "@/app/startgame/useGetModalOptions";
import TurnLogo from "@/app/startgame/TurnLogo";
import RestartButton from "@/app/startgame/RestartButton";
import GameScoreLabels from "@/app/startgame/GameScoreLabels";
import SlotButton from "@/app/startgame/SlotButton";
import { EGameType, GameTypeContext } from "@/context/gameType";
import useCurrentPlayer from "@/app/startgame/useCurrentPlayer";

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

const cellDesign = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function checkArrayIncludesArray(array1: number[], array2: number[]) {
  for (let num1 of array1) {
    if (!array2.includes(num1)) {
      return false;
    }
  }
  return true;
}

function hasPlayerWon(mark: number[]) {
  if (mark.length < 3) return;

  for (let possibility of winningPossibilities) {
    if (checkArrayIncludesArray(possibility, mark)) {
      return true;
    }
  }
  return false;
}

function hasTied(slots: number[]) {
  return slots.length === 9;
}

function delay(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

function getBestMove(
  player1Positions: number[],
  player2Positions: number[],
  currentTurn: "p1" | "p2"
) {
  const cellDesign = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // Remove occupied positions from the available positions array
  player1Positions.concat(player2Positions).forEach((position) => {
    const index = cellDesign.indexOf(position);
    if (index !== -1) {
      cellDesign.splice(index, 1);
    }
  });

  // Determine the player's opponent
  const opponentPositions =
    currentTurn === "p1" ? player2Positions : player1Positions;

  // Check for winning moves for the current player
  for (let i = 0; i < cellDesign.length; i += 1) {
    const currentPositions =
      currentTurn === "p1"
        ? player1Positions.slice()
        : player2Positions.slice();
    currentPositions.push(cellDesign[i]);

    // Check if the current position leads to a win
    if (isWinningMove(currentPositions)) {
      return cellDesign[i];
    }
  }

  // Check for winning moves for the opponent and block them
  for (let j = 0; j < cellDesign.length; j += 1) {
    const opponentPositionsCopy = opponentPositions.slice();
    opponentPositionsCopy.push(cellDesign[j]);

    // Check if the opponent's position leads to a win
    if (isWinningMove(opponentPositionsCopy)) {
      return cellDesign[j];
    }
  }

  // If no winning moves are available, return a random position
  return cellDesign[Math.floor(Math.random() * cellDesign.length)];
}

// Helper function to check if a given set of positions leads to a win
function isWinningMove(positions: number[]) {
  // Check if any winning combination is present in the given positions
  for (let i = 0; i < winningPossibilities.length; i += 1) {
    const combination = winningPossibilities[i];
    if (
      combination.every((position) => {
        return positions.includes(position);
      })
    ) {
      return true;
    }
  }

  return false;
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
          {cellDesign.map((_, index) => {
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
