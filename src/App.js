import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;