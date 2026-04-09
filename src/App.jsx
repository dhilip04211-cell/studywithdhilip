import React from "react";
import { HashRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import PPPartOne from "./PPPpart-1";
import PartFourFive from "./PartFourFive";

// Dictionary imports
import Dictionary from "./Dictionary/Dictionary";
import A_Series from "./Dictionary/A_Series";
import A_Part_1 from "./Dictionary/A_Part_1";
import A_Part_2 from "./Dictionary/A_Part_2";

// Current Affairs imports
import CurrentAffairs from "./Current_Affairs/Current_Affairs";
import Jan_2026 from "./Current_Affairs/Jan_2026";

// PYQ Tamil imports
import PYQTAMIL from "./PYQTAMIL/PYQ_TAMIL";
import Special_Examination_2025 from "./PYQTAMIL/Special_Examination_2025"; // ✅ renamed file too
import Gr_2_Mains_2025 from "./PYQTAMIL/Gr_2_Mains_2025"; // ✅ renamed file too
import Gr_4_2025 from "./PYQTAMIL/Gr_4_2025";

// Thirukkural
import Thirukkural from "./Thirukkural/Thirukkural_home";
import ThirukkuralOld from "./Thirukkural/thirukkural_old";
import ThirukkuralOldPart1 from "./Thirukkural/thirukkural_old_part1";
import ThirukkuralOldPart1Quiz from "./Thirukkural/thirukkural_old_part1_quiz";
import ThirukkuralOldPart2 from "./Thirukkural/thirukkural_old_part2";

// Tamil Notes
import SanthiPizai from "./TamilNotes/SanthiPizai";
import Mayankoli from "./TamilNotes/Mayankoli";

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

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <h2>Current Affairs</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "15px" }}>
          <Link to="/current-affairs" className="btn">Current Affairs</Link>
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
        <Route path="/dictionary/a-series/part2" element={<A_Part_2 />} />

        {/* Current Affairs routes */}
        <Route path="/current-affairs" element={<CurrentAffairs />} />
        <Route path="/current-affairs/jan-2026" element={<Jan_2026 />} />

        {/* PYQ Tamil routes */}
        <Route path="/PYQTAMIL" element={<PYQTAMIL />} />  {/* ✅ matches Tamil.html href */}
        <Route path="/PYQTAMIL/special-examination-2025" element={<Special_Examination_2025 />} />
        <Route path="/PYQTAMIL/gr-2-mains-2025" element={<Gr_2_Mains_2025 />} />
        <Route path="/PYQTAMIL/gr-4-2025" element={<Gr_4_2025 />} />

        {/* Thirukkural routes */}
        <Route path="/Thirukkural" element={<Thirukkural />} />
        <Route path="/Thirukkural/thirukkural-old" element={<ThirukkuralOld />} />
        <Route path="/Thirukkural/thirukkural-old-part1" element={<ThirukkuralOldPart1 />} />
        <Route path="/Thirukkural/thirukkural-old-part1-quiz" element={<ThirukkuralOldPart1Quiz />} />        
        <Route path="/Thirukkural/thirukkural-old-part2" element={<ThirukkuralOldPart2 />} />

        {/* Tamil Notes */}
        <Route path="/TamilNotes/santhipizai" element={<SanthiPizai />} />
        <Route path="/TamilNotes/mayankoli" element={<Mayankoli />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
