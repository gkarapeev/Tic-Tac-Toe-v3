import {
  FILL_SQUARE,
  LOAD_STATE,
  NEW_GAME,
  UNDO_TURN,
  REDO_TURN
} from "../actions/actions";
import { PLAYER_X, PLAYER_O, CHANGE_NAME } from "../utilities/enums";
import checkForWin from "../components/App/checkForWin";
import { initialState } from "../data/data";
import cloneDeep from "lodash.clonedeep";

export default function appReducer(incomingState, { type, payload }) {
  switch (type) {
    case LOAD_STATE: {
      return payload;
    }
    case FILL_SQUARE: {
      const index = payload.squareIndex;
      const currentPlayer = payload.player;
      const newSquares = cloneDeep(incomingState.squares);
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
        ...incomingState,
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
      const prevPlayer =
        incomingState.currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;

      // Disable undoing after reaching the game start
      if (prevStep < 0) {
        return incomingState;
      }

      // Undo the stats if we're undoing a winning turn
      const lastTurnWasAVictory = checkForWin(hist[incomingState.currentStep]);
      let newStats = cloneDeep(incomingState.stats);
      if (lastTurnWasAVictory) {
        newStats[prevPlayer].wins--;
        newStats[incomingState.currentPlayer].losses--;
      }

      return {
        ...incomingState,
        currentStep: prevStep,
        squares: hist[prevStep],
        currentPlayer: prevPlayer,
        stats: newStats,
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

      // Update the stats
      let newStats = cloneDeep(incomingState.stats);
      if (theGameIsOver) {
        newStats[incomingState.currentPlayer].wins++;
        newStats[nextPlayer].losses++;
      }

      return {
        ...incomingState,
        currentStep: nextStep,
        currentPlayer: nextPlayer,
        squares: hist[nextStep],
        stats: newStats,
        currentGameIsOver: theGameIsOver
      };
    }
    case NEW_GAME: {
      return {
        ...initialState,
        stats: incomingState.stats,
        playerXName: incomingState.playerXName,
        playerOName: incomingState.playerOName
      };
    }
    case CHANGE_NAME: {
      const playerNameKey =
        payload.player === PLAYER_X ? "playerXName" : "playerOName";
      return {
        ...incomingState,
        [playerNameKey]: payload.newName
      };
    }
    default: {
      return incomingState;
    }
  }
}
