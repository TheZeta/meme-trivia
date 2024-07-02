import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Profile from './components/Profile';
import Questionnaire from './Questionnaire';
import './styles/App.css';
import { userIsLoggedIn, logoutUser } from './services/authentication';
import { Home } from './components/Home';
import Scoreboard from './components/Scoreboard';
import GameOver from './components/GameOver';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserStatus = async () => {
      const loggedIn = await userIsLoggedIn();
      setIsLoggedIn(loggedIn);
      setIsLoading(false);
    };

    checkUserStatus();
  }, []);

  const handleLogin = async () => {
    setIsLoggedIn(await userIsLoggedIn());
    navigate("/");
  };

  const handleLogout = async () => {
    const response = await logoutUser();
    if (response) {
      setIsLoggedIn(await userIsLoggedIn());
      navigate("/");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Sidebar isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gameover" element={<GameOver isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {isLoggedIn && <Route path="/profile" element={<Profile onLogin={handleLogin} />} />}
          <Route path="/questionnaire" element={<Questionnaire />} />
          {isLoggedIn && <Route path="/scoreboard/:score_id" element={<Scoreboard />} />}
          {isLoggedIn && <Route path="/scoreboard/" element={<Scoreboard />} />}
        </Routes>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
