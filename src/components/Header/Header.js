import React, { useContext } from "react";
import "./Header.css";
import { CurrentPlayer } from "../App/App";
import { PLAYER_X } from "../../utilities/enums";

function Header() {
  const currentPlayer = useContext(CurrentPlayer);
  const sign = currentPlayer === PLAYER_X ? "X" : "O";
  return <div className="Header">{`It's ${sign}'s turn`}</div>;
}
export default Header;
