import React from 'react';
import '../styles/GameOver.css'; // Assuming you have a separate CSS file for styling
import { useNavigate } from 'react-router-dom';

const GameOver = ({ isLoggedIn }) => {
    const navigate = useNavigate();
    
    const onClickNewGame = () => {
        navigate("/home");
        navigate("/questionnaire");
    }

    const onClickScoreboard = () => {
      navigate("/scoreboard");
  }
    
    return (
      <div className="game-over">
        <h2 className="game-over-title">Game Over</h2>
        <div className="game-over-buttons">
          <button className="game-over-button" onClick={onClickNewGame}>New Game</button>
          {isLoggedIn && (
            <button className="game-over-button" onClick={onClickScoreboard}>View Scoreboard</button>
          )}
        </div>
      </div>
    );
  };

export default GameOver;
