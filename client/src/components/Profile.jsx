import React, { useEffect, useState } from 'react';
import { fetchScoresByUserId } from '../services/scores';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const ProfilePage = () => {
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getScores = async () => {
      try {
        const scoresData = await fetchScoresByUserId();
        setScores(scoresData);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    getScores();
  }, []);

  const handleScoreClick = (id) => {
    navigate(`/scoreboard/${id}`);
  };

  const totalUserScore = scores.reduce((total, score) => {
    return total + score.questions.reduce((scoreTotal, question) => scoreTotal + question.points_earned, 0);
  }, 0);

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile Page</h2>
      <p className="profile-score">User Score: {totalUserScore}</p>
      <p className="profile-description">Game records will be listed here:</p>
      <ul className="list">
        {scores.map((score) => {
          let points_earned = score.questions.reduce((total, question) => total + question.points_earned, 0);

          return (
            <li
              key={score.id}
              className="listItem"
              onClick={() => handleScoreClick(score.id)}
            >
              <span>Game ID: {score.id}</span> - Points Earned: {points_earned}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProfilePage;
