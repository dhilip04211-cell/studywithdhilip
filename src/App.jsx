import React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import PPPartOne from "./PPPart-1";
import PartFourFive from "./PartFourFive";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Assistant Engineer (EEE)</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px", alignItems: "center" }}>
        <Link to="/part1" className="btn">
          Part-1
        </Link>

        <Link to="/part4" className="btn">
          Part-4 and 5
        </Link>

        <a href="./Tamil/Tamil.html" className="btn">
          Back to Tamil (HTML)
        </a>
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
        <Route path="/part4" element={<PartFourFive />} />
      </Routes>
    </HashRouter>
  );
}