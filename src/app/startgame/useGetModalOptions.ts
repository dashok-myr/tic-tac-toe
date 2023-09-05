import { EGameState, GameStateContext } from "@/context/gameState.context";
import { useContext } from "react";
import { PlayersContext } from "@/context/playersContext";

export default function useGetModalOptions(
  state: EGameState,
  resetCurrentPlayer: () => void
) {
  const { resetPlayers, resetPlayersSlots } = useContext(PlayersContext);
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
          resetPlayers();
        },
        onSecondBtnClick: () => {
          resetPlayersSlots();
          setGameState(EGameState.PLAYING);
          resetCurrentPlayer();
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
          resetPlayers();
        },
        onSecondBtnClick: () => {
          resetPlayersSlots();
          setGameState(EGameState.PLAYING);
          resetCurrentPlayer();
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
          resetPlayers();
        },
        onSecondBtnClick: () => {
          resetPlayersSlots();
          setGameState(EGameState.PLAYING);
          resetCurrentPlayer();
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
          resetPlayers();
        },
        onSecondBtnClick: () => {
          resetPlayersSlots();
          setGameState(EGameState.PLAYING);
          resetCurrentPlayer();
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
          resetPlayers();
        },
        onSecondBtnClick: () => {
          resetPlayersSlots();
          setGameState(EGameState.PLAYING);
          resetCurrentPlayer();
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
          resetPlayersSlots();
          setGameState(EGameState.PLAYING);
          resetCurrentPlayer();
        },
      };
    default:
      return null;
  }
}
