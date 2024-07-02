import React, { useState, useEffect } from 'react';
import '../styles/Question.css';
import ScoreboardButton from './ScoreboardButton.jsx';
import { fetchLastScore, fetchScoreByScoreId } from '../services/scores.js';
import { useParams } from 'react-router-dom';

const Scoreboard = () => {
  const { score_id } = useParams(); // Destructure score_id from useParams
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchScore = async (score_id) => {
    try {
      const fetchedScore = await fetchScoreByScoreId(score_id);
      setScore(fetchedScore);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getLastScore = async () => {
    try {
      const fetchedScore = await fetchLastScore();
      setScore(fetchedScore);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (score_id) {
      fetchScore(score_id);
    } else {
      getLastScore();
    }
  }, [score_id]); // Add score_id to dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!score) {
    return <div>No score available</div>;
  }

  return (
    <div>
      {score.questions.map((question, questionIndex) => (
        <div key={questionIndex} className="question-container">
          <h1>Question {questionIndex + 1}</h1>
          <img src={question.image} alt="Question" className="question-image" />
          <div className="options-container">
            {question.captions.map((caption, captionIndex) => (
              <div key={captionIndex} className="options-item">
                <ScoreboardButton
                  caption={caption}
                  isSelected={caption === question.user_answer}
                  isCorrect={caption === question.correct_answers[0] || caption === question.correct_answers[1]}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Scoreboard;
