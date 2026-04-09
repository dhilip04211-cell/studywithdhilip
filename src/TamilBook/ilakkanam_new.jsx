import React from "react";
import { Link } from "react-router-dom";

export default function ilakkanam_new() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "30px" }}>
      <h1>இலக்கணம்</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>

        {/* JSX Link - Term 1 */}
        <Link to="/Tamilbook/term1-grammar" className="btn">
          1. term 1
        </Link>
<a href="/studywitdhilip/Tamil/lakkanam/term1_grammar.html" className="btn">
  2. term 1 (HTML)
</a>

<a href="/studywitdhilip/Tamil/lakkanam/term2_grammar.html" className="btn">
  3. term 2
</a>

        {/* JSX Link - Term 3 */}
        <Link to="/Tamilbook/term3-grammar" className="btn">
          4. term 3
        </Link>

      </div>
    </div>
  );
}
