// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import HomePage from './components/home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Signup/>} />
        <Route path="/home" element={<HomePage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
