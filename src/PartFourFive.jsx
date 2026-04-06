import React, { useState } from "react";

const allQuestions = [
  {
    part: 4,
    q: "Q40",
    topic: "Non-Conventional Energy",
    question: "The range of wind speed for a windmill to generate power is:",
    options: ["5–16 m/s", "0–25 m/s", "10–50 m/s", "15–30 m/s"],
    answer: 0,
    explanation:
      "Windmills generate power effectively in the wind speed range of 5–16 m/s.",
  },
  {
    part: 4,
    q: "Q41",
    topic: "Solar Cell",
    question: "Output of a single photovoltaic cell is:",
    options: ["6 V", "3–5 V", "12 V", "Less than 1 V"],
    answer: 3,
    explanation: "A single PV cell produces around 0.5–0.6V.",
  },

  {
    part: 5,
    q: "Q128",
    topic: "Power Plant Economics",
    question: "Tariff means:",
    options: [
      "Cost per unit generation",
      "Rate charged to consumers",
      "Power factor",
      "Plant efficiency",
    ],
    answer: 1,
    explanation: "Tariff is the rate charged to the consumer for electrical energy.",
  },
];

export default function PartFourFive() {
  const [selectedPart, setSelectedPart] = useState(4);

  const filteredQuestions = allQuestions.filter(
    (item) => item.part === selectedPart
  );

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1000px",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Power Plant - Part 4 & 5
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "25px",
        }}
      >
        <button
          onClick={() => setSelectedPart(4)}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Part 4
        </button>

        <button
          onClick={() => setSelectedPart(5)}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Part 5
        </button>
      </div>

      {filteredQuestions.map((q, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
            background: "#fff",
          }}
        >
          <h3>
            {q.q} - {q.topic}
          </h3>

          <p>{q.question}</p>

          <ul>
            {q.options.map((option, i) => (
              <li key={i}>{option}</li>
            ))}
          </ul>

          <p>
            <b>Correct Answer:</b> {q.options[q.answer]}
          </p>

          <p>
            <b>Explanation:</b> {q.explanation}
          </p>
        </div>
      ))}
    </div>
  );
}