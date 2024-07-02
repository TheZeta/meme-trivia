import React from 'react';
import '../styles/ScoreboardButton.css';

const ScoreboardButton = ({ caption, isSelected, isCorrect }) => {
    return (
        <div className="button-container">
            <button
                className={`custom-button-scoreboard ${isSelected && !isCorrect ? 'incorrectly_clicked' : ''} ${isSelected && isCorrect ? 'correctly_clicked' : ''} ${isCorrect ? 'correct' : ''}`}
            >
                {caption}
                {isCorrect && <span className="tick">&#10003;</span>}
            </button>
        </div>
    );
};

export default ScoreboardButton;
