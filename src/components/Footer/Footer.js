import React, { useContext } from "react";
import "./Footer.css";
import { UNDO_TURN, REDO_TURN } from "../../actions/actions";
import { Dispatch } from "../App/App";

function Footer() {
    const dispatch = useContext(Dispatch)
  return (
    <div className="Footer">
      <button onClick={() => dispatch({ type: UNDO_TURN })}>Undo Move</button> | 
      <button onClick={() => dispatch({ type: REDO_TURN })}>Redo Move</button>
    </div>
  );
}
export default Footer;
