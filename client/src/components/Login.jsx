import React, { useState } from 'react';
import { loginUser } from '../services/authentication';
import '../styles/Login.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(username, password);
            console.log('User logged in:', response);
        } catch (error) {
            setError(error.message || 'Failed to login');
        }
        onLogin();
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-register-form">

                <div className="form-container">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className="form-btn">
                    <button  type="submit">Login</button>
                    </div>
                    
                </div>
            </form>
        </div>
    );
};

export default Login;
