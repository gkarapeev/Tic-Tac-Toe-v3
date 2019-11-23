import React, { useContext } from "react";
import "./Header.css";
import { State } from "../App/App";
import { PLAYER_X } from "../../utilities/enums";

function Header() {
  const state = useContext(State);
  const previousPlayer = state.currentPlayer === PLAYER_X ? "O" : "X";
  const currentPlayer = state.currentPlayer === PLAYER_X ? "X" : "O";
  let message;

  if (state.currentGameIsOver) {
    message = `Player ${previousPlayer} won the game!`;
  } else {
    message = `It's ${currentPlayer}'s turn`;
  }
  return <div className="Header">{message}</div>;
}
export default Header;
