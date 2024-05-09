// src/components/Signup.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useHistory from react-router-dom
import './signup.css'; // Import the CSS file

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useHistory hook

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', {
        username,
        password,
      });
      console.log(response.data);
      if (response.status === 201) {
        // Redirect to login page if signup is successful
        navigate('/login');
      } else {
        // Display error message if status code is not 200
        setErrorMessage('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      // Display error message if request fails
      setErrorMessage('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Signup</h2>
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
      <button className="signup-button" onClick={handleSignup}>Signup</button>
      {/* Conditional rendering for error message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p className="login-link">Already a customer? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Signup;
