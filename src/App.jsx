import React from "react";
import { HashRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import PPPartOne from "./PPPpart-1";
import PartFourFive from "./PartFourFive";

// Dictionary imports
import Dictionary from "./Dictionary/Dictionary";
import A_Series from "./Dictionary/A_Series";
import A_Part_1 from "./Dictionary/A_Part_1";
// Add more parts as you create them:
import A_Part_2 from "./Dictionary/A_Part_2";
// import A_Part_3 from "./Dictionary/A_Part_3";
// import A_Part_4 from "./Dictionary/A_Part_4";
// import A_Part_5 from "./Dictionary/A_Part_5";
import Current-Affairs from "./Current_Affairs/Current_Affairs"
import Jan_2026 from "./Current_Affairs/Jan_2026"

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
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* AE EEE routes */}
        <Route path="/part1" element={<PPPartOne />} />
        <Route path="/parts" element={<PartFourFive />} />
        <Route path="/part4" element={<PartFourFive defaultPart={4} />} />
        <Route path="/part5" element={<PartFourFive defaultPart={5} />} />

        {/* Dictionary routes */}
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/dictionary/a-series" element={<A_Series />} />
        <Route path="/dictionary/a-series/part1" element={<A_Part_1 />} />
        {/*Add more as you build them: */}
        <Route path="/dictionary/a-series/part2" element={<A_Part_2 />} /> 
        {/* <Route path="/dictionary/a-series/part3" element={<A_Part_3 />} /> */}
        {/* <Route path="/dictionary/a-series/part4" element={<A_Part_4 />} /> */}
        {/* <Route path="/dictionary/a-series/part5" element={<A_Part_5 />} /> */}

<Route path="/Current_Affairs" element={<Current_Affairs />} />
<Route path="/Current_Affairs/Jan_2026" element={<Jan_2026 />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
