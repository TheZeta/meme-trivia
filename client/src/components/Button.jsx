import React from 'react';
import '../styles/Button.css';

const Button = ({ caption, buttonId, isSelected, onClick }) => {
  const handleClick = () => {
    onClick(buttonId);
  };

  return (
    <button
      className={`custom-button-question ${isSelected ? 'clicked' : ''}`}
      onClick={handleClick}
    >
      {caption.text}
    </button>
  );
};

export default Button;
