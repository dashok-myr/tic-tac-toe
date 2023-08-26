import { EGameState, GameStateContext } from "@/context/gameState.context";
import React, { useContext } from "react";
import { EMark, PlayersContext } from "@/context/playersContext";

export default function useGetModalOptions(
  state: EGameState,
  setCurrentPlayer: React.Dispatch<React.SetStateAction<"p1" | "p2">>
) {
  const { players, setPlayers } = useContext(PlayersContext);
  const { setGameState } = useContext(GameStateContext);

  switch (state) {
    case EGameState.WIN:
      return {
        gameResult: "YOU WON!",
        firstBtnLabel: "QUIT",
        secondBtnLabel: "NEXT ROUND",
        navigateQuitButton: "/",
        onFirstBtnClick: () => {
          setGameState(EGameState.CHOOSE_GAME_TYPE);
          setPlayers({
            p1: { mark: EMark.CROSS, slots: [] },
            p2: { mark: EMark.NOUGHT, slots: [] },
          });
        },
        onSecondBtnClick: () => {
          setPlayers({
            p1: { ...players.p1, slots: [] },
            p2: { ...players.p2, slots: [] },
          });
          setGameState(EGameState.PLAYING);
          setCurrentPlayer(players.p1.mark === EMark.CROSS ? "p1" : "p2");
        },
      };
    case EGameState.FIRST_PLAYER_WIN:
      return {
        gameResult: "PLAYER 1 WINS!",
        firstBtnLabel: "QUIT",
        secondBtnLabel: "NEXT ROUND",
        navigateQuitButton: "/",
        onFirstBtnClick: () => {
          setGameState(EGameState.CHOOSE_GAME_TYPE);
          setPlayers({
            p1: { mark: EMark.CROSS, slots: [] },
            p2: { mark: EMark.NOUGHT, slots: [] },
          });
        },
        onSecondBtnClick: () => {
          setPlayers({
            p1: { ...players.p1, slots: [] },
            p2: { ...players.p2, slots: [] },
          });
          setGameState(EGameState.PLAYING);
          setCurrentPlayer(players.p1.mark === EMark.CROSS ? "p1" : "p2");
        },
      };
    case EGameState.SECOND_PLAYER_WIN:
      return {
        gameResult: "PLAYER 2 WINS!",
        firstBtnLabel: "QUIT",
        secondBtnLabel: "NEXT ROUND",
        navigateQuitButton: "/",
        onFirstBtnClick: () => {
          setGameState(EGameState.CHOOSE_GAME_TYPE);
          setPlayers({
            p1: { mark: EMark.CROSS, slots: [] },
            p2: { mark: EMark.NOUGHT, slots: [] },
          });
        },
        onSecondBtnClick: () => {
          setPlayers({
            p1: { ...players.p1, slots: [] },
            p2: { ...players.p2, slots: [] },
          });
          setGameState(EGameState.PLAYING);
          setCurrentPlayer(players.p1.mark === EMark.CROSS ? "p1" : "p2");
        },
      };
    case EGameState.TIED:
      return {
        gameResult: "IT'S A TIE!",
        firstBtnLabel: "QUIT",
        secondBtnLabel: "NEXT ROUND",
        navigateQuitButton: "/",
        onFirstBtnClick: () => {
          setGameState(EGameState.CHOOSE_GAME_TYPE);
          setPlayers({
            p1: { mark: EMark.CROSS, slots: [] },
            p2: { mark: EMark.NOUGHT, slots: [] },
          });
        },
        onSecondBtnClick: () => {
          setPlayers({
            p1: { ...players.p1, slots: [] },
            p2: { ...players.p2, slots: [] },
          });
          setGameState(EGameState.PLAYING);
          setCurrentPlayer(players.p1.mark === EMark.CROSS ? "p1" : "p2");
        },
      };
    case EGameState.LOST:
      return {
        gameResult: "ON NO, YOU LOST...",
        firstBtnLabel: "QUIT",
        secondBtnLabel: "NEXT ROUND",
        navigateQuitButton: "/",
        onFirstBtnClick: () => {
          setGameState(EGameState.CHOOSE_GAME_TYPE);
          setPlayers({
            p1: { mark: EMark.CROSS, slots: [] },
            p2: { mark: EMark.NOUGHT, slots: [] },
          });
        },
        onSecondBtnClick: () => {
          setPlayers({
            p1: { ...players.p1, slots: [] },
            p2: { ...players.p2, slots: [] },
          });
          setGameState(EGameState.PLAYING);
          setCurrentPlayer(players.p1.mark === EMark.CROSS ? "p1" : "p2");
        },
      };
    case EGameState.RESTART:
      return {
        gameResult: "RESTART THE GAME?",
        firstBtnLabel: "NO, CANCEL",
        secondBtnLabel: "YES, RESTART",
        navigateQuitButton: "",
        onFirstBtnClick: () => {
          setGameState(EGameState.PLAYING);
        },
        onSecondBtnClick: () => {
          setPlayers({
            p1: { ...players.p1, slots: [] },
            p2: { ...players.p2, slots: [] },
          });
          setGameState(EGameState.PLAYING);
          setCurrentPlayer(players.p1.mark === EMark.CROSS ? "p1" : "p2");
        },
      };
    default:
      return null;
  }
}
