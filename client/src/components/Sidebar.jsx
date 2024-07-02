import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isLoggedIn, onLogout }) => {
  return (
    <div className="sidebar sticky-sidebar">
      {!isLoggedIn && (
        <>
          <Link to="/login"><button>Sign in</button></Link>
          <Link to="/questionnaire"><button>Play Anonymously</button></Link>
        </>
      )}
      {isLoggedIn && (
        <>
          <Link to="/profile"><button>Profile</button></Link>
          <Link to="/questionnaire"><button>Play</button></Link>
          <button onClick={onLogout}>Log out</button>
        </>
      )}
    </div>
  );
};

export default Sidebar;
