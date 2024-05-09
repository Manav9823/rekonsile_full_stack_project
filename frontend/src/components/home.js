// src/components/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css'; // Import the CSS file

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to My App</h1>
      <p className="homepage-description">
        This is a simple application built with React and NestJS.
      </p>
      <div className="buttons-container">
        <Link to="/" className="homepage-button">Signup</Link>
        <Link to="/login" className="homepage-button">Login</Link>
      </div>
    </div>
  );
};

export default HomePage;
