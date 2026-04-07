import React from "react";
import { HashRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import PPPartOne from "./PPPpart-1";
import PartFourFive from "./PartFourFive";

function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", width: "100%" }}>
      <h1>StudyWithDhilip</h1>
      <a href="PYQ/previous_years.html" className="btn">Previous Year Questions</a>
      <a href="Tamil/Tamil.html" className="btn">Tamil</a>
      <a href="AE/YCT-1/YCT-1.html" className="btn">Assistant Engineer</a>

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <h2>Assistant Engineer (EEE)</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "15px" }}>
          <Link to="/part1" className="btn">Part-1</Link>
          <Link to="/parts" className="btn">Part-4 and 5</Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/part1" element={<PPPartOne />} />
        <Route path="/parts" element={<PartFourFive />} />
        <Route path="/part4" element={<PartFourFive defaultPart={4} />} />
        <Route path="/part5" element={<PartFourFive defaultPart={5} />} />

        {/* fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}