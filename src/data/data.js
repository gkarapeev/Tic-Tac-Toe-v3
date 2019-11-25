import { PLAYER_X } from "../utilities/enums";

export const initialStats = {
  PLAYER_X: {
    wins: 0,
    losses: 0
  },
  PLAYER_O: {
    wins: 0,
    losses: 0
  }
};

export const initialState = {
  squares: Array(9).fill(null),
  currentPlayer: PLAYER_X,
  playerXName: "Player 1",
  playerOName: "Player 2",
  currentGameHistory: [Array(9).fill(null)],
  currentStep: 0,
  currentGameIsOver: false,
  stats: initialStats
};
