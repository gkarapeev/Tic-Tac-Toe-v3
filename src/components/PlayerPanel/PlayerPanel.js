import React from 'react';
import './PlayerPanel.css';

function PlayerPanel({ player }) {
  return (
    <div className="PlayerPanel">
        <div className="player-name">
            <span>{player}</span>
        </div>
        <div className="total-wins">
            <span>Total Wins:</span>
            &nbsp;
            <span>0</span>
        </div>
        <div className="total-losses">
            <span>Total Losses:</span>
            &nbsp;
            <span>0</span>
        </div>
        <div className="total-score">
            <span>Total Score:</span>
            &nbsp;
            <span>0</span>
        </div>
    </div>
  );
}

export default PlayerPanel;
