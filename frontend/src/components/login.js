// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });
      // console.log('response data', response);
      if (response.status === 200) {
        // Redirect to login page if signup is successful
        navigate('/home');
      } else {
        // Display error message if status code is not 200
        // console.log('in failed')
        setErrorMessage('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container"> {/* Apply container class */}
      <h2 className="login-title">Login</h2> {/* Apply title class */}
      <input
        className="input-field" 
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="input-field"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>Login</button> {/* Apply button class */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p className="login-link">New to the portal? <Link to="/">Signup</Link></p>

    </div>
  );
};

export default Login;
