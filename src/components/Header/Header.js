import React, { useContext } from "react";
import "./Header.css";
import { State, Dispatch } from "../App/App";
import { PLAYER_X } from "../../utilities/enums";
import { NEW_GAME } from "../../actions/actions";

function Header() {
  const state = useContext(State);
  const dispatch = useContext(Dispatch)
  const previousPlayer = state.currentPlayer === PLAYER_X ? "O" : "X";
  const currentPlayer = state.currentPlayer === PLAYER_X ? "X" : "O";
  const gameIsDraw = state.currentStep >= 9;
  let message;

  if (state.currentGameIsOver) {
    message = `Player ${previousPlayer} won the game!`;
  } else if (gameIsDraw) {
    message = "It's a draw!"
  }
  else {
    message = `It's ${currentPlayer}'s turn`;
  }
  return (
    <div className="Header">
      {message}
      {state.currentGameIsOver || gameIsDraw ? <button onClick={() => dispatch({ type: NEW_GAME })}>New Game</button> : null}
    </div>
  );
}
export default Header;
