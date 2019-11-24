import {
  FILL_SQUARE,
  LOAD_STATE,
  NEW_GAME,
  UNDO_TURN,
  REDO_TURN
} from "../actions/actions";
import { PLAYER_X, PLAYER_O } from "../utilities/enums";
import checkForWin from "../components/App/checkForWin";
import { initialState } from "../data/data";

export default function appReducer(incomingState, { type, payload }) {
  switch (type) {
    case LOAD_STATE: {
      return payload;
    }
    case FILL_SQUARE: {
      const index = payload.squareIndex;
      const currentPlayer = payload.player;
      const newSquares = [...incomingState.squares];
      const moveIsValid = incomingState.squares[index] === null;
      let nextPlayer = currentPlayer;
      let newStats = incomingState.stats;
      let theGameIsOver = false;
      let stepNumber = incomingState.currentStep;
      let newHistory = incomingState.currentGameHistory;

      if (moveIsValid) {
        // Fill the correct sign in the correct square
        newSquares[index] = payload.player === PLAYER_X ? "X" : "O";
        // Set the next player
        if (currentPlayer === PLAYER_X) {
          nextPlayer = PLAYER_O;
        } else {
          nextPlayer = PLAYER_X;
        }
        // Increment the step number
        stepNumber++;
        // Throw away any future moves from the stack because they're no longer relevant
        newHistory = newHistory.slice(0, stepNumber);
        // Add the new move to the history
        newHistory = newHistory.concat([newSquares]);
        // Check for a victory
        theGameIsOver = checkForWin(newSquares, index);

        if (theGameIsOver) {
          newStats[currentPlayer].wins++;
          newStats[nextPlayer].losses++;
        }
      }
      return {
        currentPlayer: nextPlayer,
        squares: newSquares,
        currentGameHistory: moveIsValid
          ? newHistory
          : incomingState.currentGameHistory,
        currentStep: stepNumber,
        currentGameIsOver: theGameIsOver,
        stats: newStats
      };
    }
    case UNDO_TURN: {
      const hist = incomingState.currentGameHistory;
      const prevStep = incomingState.currentStep - 1;
      if (prevStep < 0) {
        return incomingState;
      }
      const prevPlayer =
        incomingState.currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
      return {
        ...incomingState,
        currentStep: prevStep,
        squares: hist[prevStep],
        currentPlayer: prevPlayer,
        currentGameIsOver: false
      };
    }
    case REDO_TURN: {
      const hist = incomingState.currentGameHistory;
      const nextStep = incomingState.currentStep + 1;

      if (nextStep >= hist.length) {
        return incomingState;
      }

      const nextPlayer =
        incomingState.currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;

      // Check for a victory
      const theGameIsOver = checkForWin(hist[nextStep]);

      return {
        ...incomingState,
        currentStep: nextStep,
        currentPlayer: nextPlayer,
        squares: hist[nextStep],
        currentGameIsOver: theGameIsOver
      };
    }
    case NEW_GAME: {
      return { ...initialState, stats: incomingState.stats };
    }
    default: {
      return incomingState;
    }
  }
}
