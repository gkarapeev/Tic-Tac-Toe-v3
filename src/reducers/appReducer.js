import { FILL_SQUARE, LOAD_STATE, NEW_GAME } from "../actions/actions";
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

      if (moveIsValid) {
        // Fill the correct sign in the correct square
        newSquares[index] = payload.player === PLAYER_X ? "X" : "O";
        // Set the next player
        if (currentPlayer === PLAYER_X) {
          nextPlayer = PLAYER_O;
        } else {
          nextPlayer = PLAYER_X;
        }

        theGameIsOver = checkForWin(newSquares, index);

        if (theGameIsOver) {
          newStats[currentPlayer].wins++;
          newStats[nextPlayer].losses++;
        }
      }
      return {
        currentPlayer: nextPlayer,
        squares: newSquares,
        currentGameIsOver: theGameIsOver,
        stats: newStats
      };
    }
    case NEW_GAME: {
      return { ...initialState, stats: incomingState.stats};
    }
    default: {
      return incomingState;
    }
  }
}
