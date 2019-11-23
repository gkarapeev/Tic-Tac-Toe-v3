import { nullArrayOfLength } from '../utilities/utilities';
import { PLAYER_X } from '../utilities/enums';

export const initialState = {
  squares: nullArrayOfLength(9),
  currentPlayer: PLAYER_X,
  currentGameIsOver: false
};