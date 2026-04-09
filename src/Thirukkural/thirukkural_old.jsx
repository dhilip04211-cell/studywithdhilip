import React from "react";
import { Link } from "react-router-dom";

export default function thirukkural_old() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "30px" }}>
      <h1>Old Book</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
        {/* ✅ Path matches App.jsx route exactly */}
        <Link to="/Thirukkural/thirukkural-old-part1" className="btn">
          1. Part 1
        </Link>
       <Link to="/Thirukkural/thirukkural-old-part2" className="btn">
          2. Part 2
        </Link>
        
        {/* Add more exam links here as you create the components */}
      </div>
    </div>
  );
}
