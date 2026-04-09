import React from "react";
import { Link } from "react-router-dom";

export default function t_book() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "30px" }}>
      <h1>Thirukkural</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
        {/* ✅ Path matches App.jsx route exactly */}
        <Link to="/TamilBook/t-newbook" className="btn">
          1. New Book
        </Link>
        
        {/* Add more exam links here as you create the components */}
      </div>
    </div>
  );
}
