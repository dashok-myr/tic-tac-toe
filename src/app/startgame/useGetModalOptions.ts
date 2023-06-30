import { GameState, GameStateContext } from "@/context/gameState.context";
import React, { useContext } from "react";
import { EMark, PlayersContext } from "@/context/playersContext";

export default function useGetModalOptions(
  state: GameState,
  setCurrentPlayer: React.Dispatch<React.SetStateAction<"p1" | "p2">>
) {
  const { players, setPlayers } = useContext(PlayersContext);
  const { setGameState } = useContext(GameStateContext);

  switch (state) {
    case GameState.WIN:
      return {
        gameResult: "YOU WON!",
        firstBtnLabel: "QUIT",
        secondBtnLabel: "NEXT ROUND",
        navigate: "/",
        onFirstBtnClick: () => {
          setGameState(GameState.CHOOSE_GAME_TYPE);
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
          setGameState(GameState.PLAYING);
          setCurrentPlayer(players.p1.mark === EMark.CROSS ? "p1" : "p2");
        },
      };
    case GameState.FIRST_PLAYER_WIN:
      return {
        gameResult: "PLAYER 1 WINS!",
        firstBtnLabel: "QUIT",
        secondBtnLabel: "NEXT ROUND",
        navigate: "/",
        onFirstBtnClick: () => {
          setGameState(GameState.CHOOSE_GAME_TYPE);
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
          setGameState(GameState.PLAYING);
          setCurrentPlayer(players.p1.mark === EMark.CROSS ? "p1" : "p2");
        },
      };
    case GameState.SECOND_PLAYER_WIN:
      return {
        gameResult: "PLAYER 2 WINS!",
        firstBtnLabel: "QUIT",
        secondBtnLabel: "NEXT ROUND",
        navigate: "/",
        onFirstBtnClick: () => {
          setGameState(GameState.CHOOSE_GAME_TYPE);
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
          setGameState(GameState.PLAYING);
          setCurrentPlayer(players.p1.mark === EMark.CROSS ? "p1" : "p2");
        },
      };
    case GameState.TIED:
      return {
        gameResult: "IT'S A TIE!",
        firstBtnLabel: "QUIT",
        secondBtnLabel: "NEXT ROUND",
        navigate: "/",
        onFirstBtnClick: () => {
          setGameState(GameState.CHOOSE_GAME_TYPE);
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
          setGameState(GameState.PLAYING);
          setCurrentPlayer(players.p1.mark === EMark.CROSS ? "p1" : "p2");
        },
      };
    case GameState.LOST:
      return {
        gameResult: "ON NO, YOU LOST...",
        firstBtnLabel: "QUIT",
        secondBtnLabel: "NEXT ROUND",
        navigate: "/",
        onFirstBtnClick: () => {
          setGameState(GameState.CHOOSE_GAME_TYPE);
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
          setGameState(GameState.PLAYING);
          setCurrentPlayer(players.p1.mark === EMark.CROSS ? "p1" : "p2");
        },
      };
    case GameState.RESTART:
      return {
        gameResult: "RESTART THE GAME?",
        firstBtnLabel: "NO, CANCEL",
        secondBtnLabel: "YES, RESTART",
        navigate: "",
        onFirstBtnClick: () => {
          setGameState(GameState.PLAYING);
        },
        onSecondBtnClick: () => {
          setPlayers({
            p1: { ...players.p1, slots: [] },
            p2: { ...players.p2, slots: [] },
          });
          setGameState(GameState.PLAYING);
          setCurrentPlayer(players.p1.mark === EMark.CROSS ? "p1" : "p2");
        },
      };
    default:
      return null;
  }
}
