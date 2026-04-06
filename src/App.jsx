import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PartFourFive from './PartFourFive'; 

function App() {
  return (
    // basename ensures the links work on GitHub's sub-folder
    <BrowserRouter basename="/studywithdhilip">
      <Routes>
        <Route path="/" element={
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Assistant Engineer (EEE)</h1>
            {/* Link stays inside the React App */}
            <Link to="/part4" className="btn">Part-4 and 5</Link>
            
            {/* If you still want to link to your old HTML files in the public folder: */}
            <br /><br />
            <a href="./Tamil/Tamil.html" className="btn">Back to Tamil (HTML)</a>
          </div>
        } />
        
        <Route path="/part4" element={<PartFourFive />} />
      </Routes>
    </BrowserRouter>
  );
}

// THIS MAKES main.jsx HAPPY:
export default App;