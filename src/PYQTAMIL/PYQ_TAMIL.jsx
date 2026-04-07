import React from "react";
import { Link } from "react-router-dom";

export default function PYQ_TAMIL() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "30px" }}>
      <h1>Previous Year Questions - Tamil</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
        {/* ✅ Path matches App.jsx route exactly */}
        <Link to="/PYQTAMIL/special-examination-2025" className="btn">
          1. Special Exam - 2025
        </Link>
        <Link to="/PYQTAMIL/gr-2-mains-2025" className="btn">
          1. Gr2a Mains - 2025
        </Link>
        {/* Add more exam links here as you create the components */}
      </div>
    </div>
  );
}