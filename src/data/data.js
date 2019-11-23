import { nullArrayOfLength } from '../utilities/utilities';
import { PLAYER_X } from '../utilities/enums';

export const initialStats = {
    PLAYER_X: {
        wins: 0,
        losses: 0
    },
    PLAYER_O: {
        wins: 0,
        losses: 0
    }
}

export const initialState = {
  squares: nullArrayOfLength(9),
  currentPlayer: PLAYER_X,
  currentGameIsOver: false,
  stats: initialStats
};
