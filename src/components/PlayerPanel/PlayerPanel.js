import React, { useContext } from "react";
import "./PlayerPanel.css";
import { State, Dispatch } from "../App/App";
import { PLAYER_X } from "../../utilities/enums";
import { Input } from "../StyledComponents/StyledComponents";


function PlayerPanel({ player }) {
  const dispatch = useContext(Dispatch);
  const playerNameKey = player === PLAYER_X ? "playerXName" : "playerOName";
  const {
    stats: {
      PLAYER_X: { wins, losses }
    },
    [playerNameKey]: playerName
  } = useContext(State);
  return (
    <div className="PlayerPanel">
      <div className="player-name">
        <Input
          type="text"
          value={playerName}
          onChange={e =>
            dispatch({
              type: "CHANGE_NAME",
              payload: { player: player, newName: e.target.value }
            })
          }
        />
      </div>
      <div className="total-wins">
        <span>Total Wins:</span>
        &nbsp;
        <span className="stat-number">{wins}</span>
      </div>
      <div className="total-losses">
        <span>Total Losses:</span>
        &nbsp;
        <span className="stat-number">{losses}</span>
      </div>
      <div className="total-score">
        <span>Total Score:</span>
        &nbsp;
        <span className="stat-number">{wins - losses}</span>
      </div>
    </div>
  );
}

export default PlayerPanel;
