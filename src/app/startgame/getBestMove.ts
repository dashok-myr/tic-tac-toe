import { WINNING_POSSIBILITIES } from "@/app/startgame/constants";

// Helper function to check if a given set of positions leads to a win
function isWinningMove(positions: number[]) {
  // Check if any winning combination is present in the given positions
  for (let i = 0; i < WINNING_POSSIBILITIES.length; i += 1) {
    const combination = WINNING_POSSIBILITIES[i];
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

export default function getBestMove(
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
