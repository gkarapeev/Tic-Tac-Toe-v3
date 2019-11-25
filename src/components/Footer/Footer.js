import React, { useContext } from "react";
import "./Footer.css";
import { UNDO_TURN, REDO_TURN } from "../../actions/actions";
import { Dispatch } from "../App/App";
import { Button } from '../StyledComponents/StyledComponents';

function Footer() {
    const dispatch = useContext(Dispatch)
  return (
    <div className="Footer">
      <Button onClick={() => dispatch({ type: UNDO_TURN })}>Undo Move</ Button>
      <Button onClick={() => dispatch({ type: REDO_TURN })}>Redo Move</ Button>
    </div>
  );
}
export default Footer;
