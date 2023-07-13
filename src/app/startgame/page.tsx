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
import { EGameType, GameTypeContext } from "@/context/gameType";

const winningPossibilities = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const cellDesign = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
  const { players, setPlayers } = useContext(PlayersContext);
  const { gameState, setGameState } = useContext(GameStateContext);
  const { gameScore, setGameScore } = useContext(GameScoreContext);
  const { gameType } = useContext(GameTypeContext);
  const [currentPlayer, setCurrentPlayer] = useState<"p1" | "p2">(
    players.p1.mark === EMark.CROSS ? "p1" : "p2"
  );
  const modalOptions = useGetModalOptions(gameState, setCurrentPlayer);

  async function handleOnClick(slot: number) {
    if (gameType === EGameType.PVP) {
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
    } else if (gameType === EGameType.CPU) {
      const copyPlayers = { ...players };
      copyPlayers.p1.slots.push(slot);
      setCurrentPlayer(currentPlayer === "p1" ? "p2" : "p1");
      setPlayers(copyPlayers);
      await delay(2);

      const copyPlayersCPU = { ...players };

      const cpuMove = getBestMove(players.p1.slots, players.p2.slots, "p2");
      copyPlayersCPU.p2.slots.push(cpuMove);
      setCurrentPlayer(currentPlayer === "p1" ? "p2" : "p1");
      setPlayers(copyPlayersCPU);
    }
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
