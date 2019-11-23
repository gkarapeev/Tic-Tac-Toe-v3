import React, { useContext } from "react";
import "./Square.css";
import { Context, CurrentPlayer } from "../App/App";
import { FILL_SQUARE } from "../../actions/actions";

function Square({ index, sign }) {
  const dispatch = useContext(Context);
  const currentPlayer = useContext(CurrentPlayer);
  const fillSquare = () => {
    dispatch({
      type: FILL_SQUARE,
      payload: { squareIndex: index, player: currentPlayer }
    });
  };
  return (
    <div className="Square" onClick={fillSquare}>
      <span>{sign}</span>
    </div>
  );
}
export default Square;
