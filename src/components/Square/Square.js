import React, { useContext } from "react";
import "./Square.css";
import { Dispatch, State } from "../App/App";
import { FILL_SQUARE } from "../../actions/actions";

function Square({ index, sign }) {
  const dispatch = useContext(Dispatch);
  const state = useContext(State);
  const fillSquare = () => {
    dispatch({
      type: FILL_SQUARE,
      payload: { squareIndex: index, player: state.currentPlayer }
    });
  };
  return (
    <div className={sign ? "Square" : state.currentGameIsOver ? "Square" : "Square valid"} onClick={state.currentGameIsOver ? null : fillSquare}>
      <span>{sign}</span>
    </div>
  );
}
export default Square;
