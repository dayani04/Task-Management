import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage'; 
import TaskManagement from './pages/taskManagement';  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/taskManagement" element={<TaskManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
