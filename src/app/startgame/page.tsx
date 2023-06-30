"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import logo from "@/icons/logo.svg";
import nought from "@/icons/icon-o.svg";
import cross from "@/icons/icon-x.svg";
import restart from "@/icons/icon-restart.svg";
import Modal from "@/components/Modal";
import { Mark, PlayersContext } from "@/context/playersContext";
import { GameState, GameStateContext } from "@/context/gameState.context";

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

function getModalOptions(state: GameState) {
  switch (state) {
    case GameState.WIN:
      return {
        gameResult: "YOU WON!",
        firstBtnLabel: "QUIT",
        secondBtnLabel: "NEXT ROUND",
        navigate: "/",
      };
    case GameState.FIRST_PLAYER_WIN:
      return {
        gameResult: "PLAYER 1 WINS!",
        firstBtnLabel: "QUIT",
        secondBtnLabel: "NEXT ROUND",
        navigate: "/",
      };
    case GameState.SECOND_PLAYER_WIN:
      return {
        gameResult: "PLAYER 2 WINS!",
        firstBtnLabel: "QUIT",
        secondBtnLabel: "NEXT ROUND",
        navigate: "/",
      };
    case GameState.TIED:
      return {
        gameResult: "IT'S A TIE!",
        firstBtnLabel: "QUIT",
        secondBtnLabel: "NEXT ROUND",
        navigate: "/",
      };
    case GameState.LOST:
      return {
        gameResult: "ON NO, YOU LOST...",
        firstBtnLabel: "QUIT",
        secondBtnLabel: "NEXT ROUND",
        navigate: "/",
      };
    case GameState.RESTART:
      return {
        gameResult: "RESTART THE GAME?",
        firstBtnLabel: "NO, CANCEL",
        secondBtnLabel: "YES, RESTART",
      };
    default:
      return null;
  }
}

function MarkIcon({ mark }: { mark: Mark }) {
  if (mark === Mark.CROSS) {
    return <Image src={cross} alt="cross" width="80" height="80" />;
  }
  return <Image src={nought} alt="nought" width="80" height="80" />;
}

export default function StartGame() {
  const { players, setPlayers } = useContext(PlayersContext);
  const { gameState, setGameState } = useContext(GameStateContext);
  const [isCrossTurn, setIsCrossTurn] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState<"p1" | "p2">(
    players.p1.mark === Mark.CROSS ? "p1" : "p2"
  );

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
    }
    if (hasTied([...players.p1.slots, ...players.p2.slots])) {
      setGameState(GameState.TIED);
    }
    setPlayers(copyPlayers);
    setIsCrossTurn(!isCrossTurn);
    setCurrentPlayer(currentPlayer === "p1" ? "p2" : "p1");
    console.log(players.p1, "p1", players.p2, "p2");
  }

  const modalOptions = getModalOptions(gameState);

  return (
    <div className="flex flex-col justify-center gap-10 mx-auto w-1/2 md:w-1/4 h-screen">
      <div className="flex justify-around text-silver">
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
      <Modal
        gameResult={modalOptions?.gameResult || ""}
        firstBtnLabel={modalOptions?.firstBtnLabel || ""}
        secondBtnLabel={modalOptions?.secondBtnLabel || ""}
        showModal={modalOptions !== null}
        navigate={modalOptions?.navigate || ""}
        onFirstBtnClick={() => {
          if (gameState === GameState.RESTART) {
            setGameState(GameState.CHOOSE_MARK);
          } else {
            setPlayers({
              p1: { mark: Mark.CROSS, slots: [] },
              p2: { mark: Mark.NOUGHT, slots: [] },
            });
            setIsCrossTurn(true);
            setGameState(GameState.CHOOSE_MARK);
          }
        }}
        onSecondBtnClick={() => {
          if (gameState === GameState.RESTART) {
            setPlayers({
              p1: { mark: Mark.CROSS, slots: [] },
              p2: { mark: Mark.NOUGHT, slots: [] },
            });
            setIsCrossTurn(true);
            setGameState(GameState.CHOOSE_MARK);
          } else {
            setPlayers({
              p1: { mark: Mark.CROSS, slots: [] },
              p2: { mark: Mark.NOUGHT, slots: [] },
            });
            setIsCrossTurn(true);
            setGameState(GameState.CHOOSE_MARK);
            //+ save the score
          }
        }}
      />
      <div className="flex justify-between items-end">
        <Image src={logo} alt="logo" className="h-10 w-20" />
        <div className="flex justify-center items-center gap-2 h-12 w-36 bg-light-green rounded-xl">
          {isCrossTurn ? (
            <Image src={cross} alt="turn" className="h-4 w-4" />
          ) : (
            <Image src={nought} alt="turn" className="h-4 w-4" />
          )}
          <div className="text-silver">TURN</div>
        </div>
        <button
          onClick={() => {
            setGameState(GameState.RESTART);
            setIsCrossTurn(true);
            setPlayers({
              p1: { mark: Mark.CROSS, slots: [] },
              p2: { mark: Mark.NOUGHT, slots: [] },
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
            <span>X(YOU)</span>
            <span className="font-bold">0</span>
          </div>
        </div>
        <div className="flex justify-center items-center h-12 w-full bg-silver rounded-xl">
          <div className="flex flex-col items-center">
            <span>TIES</span>
            <span className="font-bold">0</span>
          </div>
        </div>
        <div className="flex justify-center items-center h-12 w-full bg-bright-yellow rounded-xl">
          <div className="flex flex-col items-center">
            <span>0 (CPU)</span>
            <span className="font-bold">0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
