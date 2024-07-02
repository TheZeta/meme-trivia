import React, { useState } from 'react';
import '../styles/Question.css';
import Button from './Button.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Button.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Question = ({ meme, captions, handleNextQuestion }) => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [totalTime, setTotalTime] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(function () {
      if (totalTime > 0) {
        setTotalTime((prevState) => prevState - 1);
      } else {
        navigate('/gameover');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [totalTime]);

  const captionTexts = captions.map((caption) => {
    return caption.text;
  });

  const bestCaptionTexts = captions
    .filter((caption) => caption.id === meme.best_caption1_id || caption.id === meme.best_caption2_id)
    .map((caption) => caption.text);

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };

  const buttonAttributes = captions.map((caption, index) => ({
    caption: caption,
    buttonId: index,
    isSelected: selectedButton === index,
    onClick: handleButtonClick,
  }));

  const handleNextButtonClick = () => {
    if (selectedButton !== null) {
      setTotalTime(10);
      const selectedCaptionId = captions[selectedButton].id;
      const bestCaptionsIds = [meme.best_caption1_id, meme.best_caption2_id];
      const is_user_correct = bestCaptionsIds.includes(selectedCaptionId);
      const points = is_user_correct ? 5 : 0;

      if (is_user_correct) {
        toast.success("Correct Answer");
      } else {
        toast.error("Incorrect Answer");
      }

      const customObject = {
        image: meme.image,
        captions: captionTexts,
        correct_answers: bestCaptionTexts,
        user_answer: captions[selectedButton].text,
        is_user_correct: is_user_correct,
        points_earned: points
      };

      handleNextQuestion(customObject);
      setSelectedButton(null);
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div>
      <h1 className="counter">{totalTime}</h1>
      <div className="question-container">
        <img src={meme.image} alt="Question" className="question-image" />
        <div className="options-container">
          {buttonAttributes.map((attributes, index) => (
            <div key={index} className="option-item">
              <Button {...attributes} className="wide-button" />
            </div>
          ))}
          {showWarning && <p className="warning-message">Please select an option!</p>}
          <button onClick={handleNextButtonClick} className="custom-button-submit">
            Submit
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Question;
