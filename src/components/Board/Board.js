import React from "react";
import "./Board.css";
import Square from "../Square/Square";

function Board({ squares }) {
  return (
    <div className="Board">
      {squares.map((sign, index) => {
        return <Square index={index} sign={sign} key={index} />;
      })}
    </div>
  );
}

export default Board;
