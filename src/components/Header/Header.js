import React, { useContext } from "react";
import "./Header.css";
import { State, Dispatch } from "../App/App";
import { PLAYER_X } from "../../utilities/enums";
import { NEW_GAME } from "../../actions/actions";
import { Button } from "../StyledComponents/StyledComponents";

function Header() {
  const state = useContext(State);
  const dispatch = useContext(Dispatch);
  const previousPlayer =
    state.currentPlayer === PLAYER_X ? state.playerOName : state.playerXName;
  const currentPlayer =
    state.currentPlayer === PLAYER_X ? state.playerXName : state.playerOName;
  const gameIsDraw = state.currentStep >= 9;
  const currentSign = state.currentPlayer.slice(state.currentPlayer.length - 1);
  let message;

  if (state.currentGameIsOver) {
    message = `${previousPlayer} won the game!`;
  } else if (gameIsDraw) {
    message = "It's a draw!";
  } else {
    message = `It's ${currentPlayer}'s turn:`;
  }
  return (
    <div className="Header">
      <span className="game-message">{message} &nbsp;</span>
      {state.currentGameIsOver || gameIsDraw ? null : (
        <span className="current-sign">{currentSign}</span>
      )}
      {state.currentGameIsOver || gameIsDraw ? (
        <Button primary onClick={() => dispatch({ type: NEW_GAME })}>
          New Game
        </Button>
      ) : null}
    </div>
  );
}
export default Header;
