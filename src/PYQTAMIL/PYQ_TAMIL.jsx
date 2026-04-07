import React from "react";
import { Link } from "react-router-dom";

export default function PYQ_TAMIL() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "30px" }}>
      <h1>Previous Year 2025 Tamil</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
        <Link to="/pyq-tamil/1.special-examination-2026" className="btn">1. Special Exam - 2025</Link>
        <Link to="/current-affairs/feb-2026" className="btn">February 2026</Link>
        <Link to="/current-affairs/mar-2026" className="btn">March 2026</Link>
        <Link to="/current-affairs/apr-2026" className="btn">April 2026</Link>
        <Link to="/current-affairs/may-2026" className="btn">May 2026</Link>
        <Link to="/current-affairs/jun-2026" className="btn">June 2026</Link>
        <Link to="/current-affairs/jul-2026" className="btn">July 2026</Link>
        <Link to="/current-affairs/aug-2026" className="btn">August 2026</Link>
        <Link to="/current-affairs/sep-2026" className="btn">September 2026</Link>
        <Link to="/current-affairs/oct-2026" className="btn">October 2026</Link>
        <Link to="/current-affairs/nov-2026" className="btn">November 2026</Link>
        <Link to="/current-affairs/dec-2026" className="btn">December 2026</Link>
      </div>
    </div>
  );
}