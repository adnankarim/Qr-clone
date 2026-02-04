import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scanner from './components/Scanner';
import Result from './components/Result';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Routes>
          <Route path="/" element={<Scanner />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
