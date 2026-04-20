import { useState, useEffect, useRef } from "react";

// ============================================================
// STYLES
// ============================================================
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Tiro+Tamil:ital@0;1&family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700&family=Noto+Sans+Tamil:wght@400;600;700&display=swap');

  :root {
    --bg: #0a0c14;
    --bg2: #111420;
    --bg3: #161a27;
    --gold: #c9a84c;
    --gold2: #e8c96d;
    --gold3: #f5dfa0;
    --accent: #d4783a;
    --accent2: #e8954f;
    --green: #4caf7d;
    --red: #e05757;
    --blue: #5b8dee;
    --purple: #9b6dfa;
    --text: #e8e4d8;
    --text2: #b0a98c;
    --text3: #6b6552;
    --border: rgba(201,168,76,0.18);
    --border2: rgba(201,168,76,0.08);
    --card: rgba(255,255,255,0.03);
    --card2: rgba(255,255,255,0.06);
    --shadow: 0 4px 32px rgba(0,0,0,0.5);
    --radius: 14px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Outfit', sans-serif;
    min-height: 100vh;
  }

  .app-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 0 80px 0;
  }

  /* HERO */
  .hero {
    background: linear-gradient(135deg, #0e1020 0%, #1a1228 50%, #0e1020 100%);
    border-bottom: 1px solid var(--border);
    padding: 28px 20px 20px;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-badge {
    display: inline-block;
    background: rgba(201,168,76,0.12);
    border: 1px solid var(--border);
    color: var(--gold);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 20px;
    margin-bottom: 10px;
  }
  .hero-title {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(22px, 5vw, 34px);
    color: var(--gold2);
    line-height: 1.2;
    margin-bottom: 4px;
  }
  .hero-subtitle {
    font-family: 'Noto Sans Tamil', sans-serif;
    font-size: clamp(14px, 3vw, 18px);
    color: var(--text2);
    margin-bottom: 12px;
  }
  .hero-meta {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
  .hero-meta-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: var(--text3);
  }
  .hero-meta-item span { color: var(--gold); font-weight: 600; }

  /* MAIN TABS */
  .main-tabs {
    display: flex;
    background: var(--bg2);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 100;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .main-tabs::-webkit-scrollbar { display: none; }
  .main-tab-btn {
    flex: 1;
    min-width: 90px;
    padding: 14px 10px;
    background: none;
    border: none;
    color: var(--text3);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
    white-space: nowrap;
    font-family: 'Outfit', sans-serif;
    letter-spacing: 0.5px;
  }
  .main-tab-btn.active {
    color: var(--gold2);
    border-bottom-color: var(--gold);
    background: rgba(201,168,76,0.05);
  }
  .main-tab-btn:hover:not(.active) { color: var(--text); }

  /* SUB TABS (Notes chapters) */
  .sub-tabs-wrap {
    background: var(--bg3);
    border-bottom: 1px solid var(--border2);
    overflow-x: auto;
    scrollbar-width: none;
    padding: 0 12px;
  }
  .sub-tabs-wrap::-webkit-scrollbar { display: none; }
  .sub-tabs {
    display: flex;
    gap: 4px;
    padding: 8px 0;
    white-space: nowrap;
  }
  .sub-tab-btn {
    padding: 6px 14px;
    border-radius: 20px;
    border: 1px solid var(--border2);
    background: none;
    color: var(--text3);
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Outfit', sans-serif;
    white-space: nowrap;
  }
  .sub-tab-btn.active {
    background: var(--gold);
    border-color: var(--gold);
    color: #0a0c14;
  }
  .sub-tab-btn:hover:not(.active) {
    border-color: var(--border);
    color: var(--text2);
  }

  /* CONTENT AREA */
  .content {
    padding: 20px 16px;
  }

  /* NOTES COMPONENTS */
  .section-title {
    font-family: 'DM Serif Display', serif;
    font-size: 20px;
    color: var(--gold2);
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-title .icon {
    width: 30px; height: 30px;
    background: rgba(201,168,76,0.15);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
  }

  .note-card {
    background: var(--card);
    border: 1px solid var(--border2);
    border-radius: var(--radius);
    padding: 18px;
    margin-bottom: 16px;
    transition: border-color 0.2s;
  }
  .note-card:hover { border-color: var(--border); }

  .note-card-title {
    font-size: 14px;
    font-weight: 700;
    color: var(--gold3);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Outfit', sans-serif;
  }
  .note-card-title .dot {
    width: 8px; height: 8px;
    background: var(--gold);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .note-body {
    font-family: 'Noto Sans Tamil', sans-serif;
    font-size: 13.5px;
    line-height: 1.8;
    color: var(--text);
  }
  .note-body p { margin-bottom: 10px; }
  .note-body strong { color: var(--gold3); font-weight: 600; }
  .note-body em { color: var(--accent2); font-style: normal; font-weight: 500; }

  .highlight-box {
    background: rgba(201,168,76,0.08);
    border-left: 3px solid var(--gold);
    border-radius: 0 8px 8px 0;
    padding: 12px 14px;
    margin: 12px 0;
  }
  .highlight-box.red {
    background: rgba(224,87,87,0.08);
    border-color: var(--red);
  }
  .highlight-box.blue {
    background: rgba(91,141,238,0.08);
    border-color: var(--blue);
  }
  .highlight-box.green {
    background: rgba(76,175,125,0.08);
    border-color: var(--green);
  }
  .highlight-box.purple {
    background: rgba(155,109,250,0.08);
    border-color: var(--purple);
  }

  /* KEY DATES */
  .timeline {
    position: relative;
    padding-left: 20px;
    margin: 12px 0;
  }
  .timeline::before {
    content: '';
    position: absolute;
    left: 7px; top: 0; bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, var(--gold), transparent);
  }
  .timeline-item {
    position: relative;
    margin-bottom: 16px;
    padding-left: 16px;
  }
  .timeline-item::before {
    content: '';
    position: absolute;
    left: -13px; top: 6px;
    width: 8px; height: 8px;
    background: var(--gold);
    border-radius: 50%;
    box-shadow: 0 0 0 2px rgba(201,168,76,0.2);
  }
  .timeline-year {
    font-size: 11px;
    font-weight: 700;
    color: var(--gold);
    letter-spacing: 1px;
    margin-bottom: 2px;
    text-transform: uppercase;
  }
  .timeline-event {
    font-size: 13px;
    color: var(--text);
    line-height: 1.6;
    font-family: 'Noto Sans Tamil', sans-serif;
  }

  /* PERSON CARDS */
  .person-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 12px;
    margin: 12px 0;
  }
  .person-card {
    background: var(--card2);
    border: 1px solid var(--border2);
    border-radius: 12px;
    padding: 14px;
    transition: all 0.2s;
  }
  .person-card:hover {
    border-color: var(--border);
    transform: translateY(-2px);
  }
  .person-emoji {
    font-size: 28px;
    margin-bottom: 8px;
    display: block;
  }
  .person-name {
    font-size: 13px;
    font-weight: 700;
    color: var(--gold2);
    margin-bottom: 4px;
  }
  .person-role {
    font-size: 11px;
    color: var(--accent2);
    font-weight: 600;
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .person-desc {
    font-size: 12px;
    color: var(--text2);
    line-height: 1.6;
    font-family: 'Noto Sans Tamil', sans-serif;
  }

  /* MIND MAP */
  .mind-map-container {
    background: var(--card);
    border: 1px solid var(--border2);
    border-radius: var(--radius);
    padding: 20px;
    margin: 12px 0;
  }
  .mind-map-center {
    background: linear-gradient(135deg, var(--gold), var(--accent));
    color: #0a0c14;
    font-weight: 800;
    font-size: 13px;
    padding: 10px 18px;
    border-radius: 30px;
    text-align: center;
    margin: 0 auto 20px;
    display: block;
    width: fit-content;
  }
  .mind-map-branches {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 10px;
  }
  .mind-map-branch {
    background: rgba(201,168,76,0.06);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 10px;
    text-align: center;
    font-size: 12px;
    color: var(--text);
    font-family: 'Noto Sans Tamil', sans-serif;
    line-height: 1.5;
  }
  .mind-map-branch strong {
    display: block;
    color: var(--gold);
    margin-bottom: 4px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* KEY FACTS BOX */
  .key-facts {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 10px;
    margin: 12px 0;
  }
  .key-fact {
    background: var(--card2);
    border: 1px solid var(--border2);
    border-radius: 10px;
    padding: 12px;
    text-align: center;
  }
  .key-fact-value {
    font-size: 22px;
    font-weight: 800;
    color: var(--gold2);
    font-family: 'DM Serif Display', serif;
    margin-bottom: 4px;
  }
  .key-fact-label {
    font-size: 11px;
    color: var(--text2);
    line-height: 1.4;
    font-family: 'Noto Sans Tamil', sans-serif;
  }

  /* TABLE */
  .info-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12.5px;
    margin: 12px 0;
    border-radius: 10px;
    overflow: hidden;
  }
  .info-table th {
    background: rgba(201,168,76,0.15);
    color: var(--gold2);
    font-weight: 700;
    padding: 10px 12px;
    text-align: left;
    border-bottom: 1px solid var(--border);
    font-family: 'Outfit', sans-serif;
    letter-spacing: 0.3px;
  }
  .info-table td {
    padding: 10px 12px;
    border-bottom: 1px solid var(--border2);
    color: var(--text);
    font-family: 'Noto Sans Tamil', sans-serif;
    line-height: 1.5;
    vertical-align: top;
  }
  .info-table tr:last-child td { border-bottom: none; }
  .info-table tr:nth-child(even) td { background: rgba(255,255,255,0.02); }

  /* SOURCE BADGE */
  .source-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(91,141,238,0.1);
    border: 1px solid rgba(91,141,238,0.25);
    color: var(--blue);
    font-size: 10px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 10px;
    margin-bottom: 8px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .source-badge.book {
    background: rgba(201,168,76,0.1);
    border-color: rgba(201,168,76,0.25);
    color: var(--gold);
  }

  /* ===================== QUIZ ===================== */
  .quiz-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 10px;
  }
  .quiz-info {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  .quiz-badge {
    background: var(--card2);
    border: 1px solid var(--border2);
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 12px;
    color: var(--text2);
  }
  .quiz-badge strong { color: var(--gold); }

  .question-card {
    background: var(--card);
    border: 1px solid var(--border2);
    border-radius: var(--radius);
    padding: 18px;
    margin-bottom: 14px;
  }
  .question-num {
    font-size: 10px;
    font-weight: 700;
    color: var(--gold);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 8px;
  }
  .question-text {
    font-size: 14px;
    color: var(--text);
    line-height: 1.7;
    margin-bottom: 14px;
    font-family: 'Noto Sans Tamil', sans-serif;
  }
  .options-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .option-btn {
    width: 100%;
    text-align: left;
    padding: 11px 14px;
    background: var(--card2);
    border: 1px solid var(--border2);
    border-radius: 10px;
    color: var(--text);
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Noto Sans Tamil', sans-serif;
    line-height: 1.5;
  }
  .option-btn:hover:not(:disabled) {
    border-color: var(--border);
    background: rgba(201,168,76,0.07);
  }
  .option-btn.correct {
    background: rgba(76,175,125,0.12);
    border-color: var(--green);
    color: #7fffb5;
  }
  .option-btn.wrong {
    background: rgba(224,87,87,0.12);
    border-color: var(--red);
    color: #ff9999;
  }
  .option-btn.selected-wrong {
    background: rgba(224,87,87,0.18);
    border-color: var(--red);
    color: #ff9999;
  }

  .explanation-box {
    margin-top: 10px;
    padding: 10px 14px;
    background: rgba(201,168,76,0.07);
    border-left: 3px solid var(--gold);
    border-radius: 0 8px 8px 0;
    font-size: 12.5px;
    color: var(--text2);
    font-family: 'Noto Sans Tamil', sans-serif;
    line-height: 1.6;
    animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }

  /* PROGRESS BAR */
  .progress-bar-wrap {
    background: var(--bg3);
    border-radius: 20px;
    height: 6px;
    margin-bottom: 16px;
    overflow: hidden;
  }
  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--gold), var(--accent));
    border-radius: 20px;
    transition: width 0.4s ease;
  }

  /* RESULT PAGE */
  .result-page {
    text-align: center;
    padding: 30px 16px;
  }
  .result-emoji { font-size: 64px; margin-bottom: 16px; }
  .result-score {
    font-family: 'DM Serif Display', serif;
    font-size: 52px;
    color: var(--gold2);
    margin-bottom: 4px;
  }
  .result-label {
    font-size: 14px;
    color: var(--text2);
    margin-bottom: 20px;
  }
  .result-stats {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }
  .result-stat {
    background: var(--card2);
    border: 1px solid var(--border2);
    border-radius: 12px;
    padding: 12px 20px;
    min-width: 100px;
  }
  .result-stat-value {
    font-size: 24px;
    font-weight: 800;
    color: var(--gold2);
    margin-bottom: 2px;
  }
  .result-stat-value.green { color: var(--green); }
  .result-stat-value.red { color: var(--red); }
  .result-stat-label { font-size: 11px; color: var(--text3); text-transform: uppercase; letter-spacing: 0.5px; }

  .btn {
    padding: 12px 28px;
    border-radius: 10px;
    border: none;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-primary {
    background: linear-gradient(135deg, var(--gold), var(--accent));
    color: #0a0c14;
  }
  .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
  .btn-secondary {
    background: var(--card2);
    border: 1px solid var(--border);
    color: var(--text);
  }
  .btn-secondary:hover { border-color: var(--gold); color: var(--gold); }

  /* PYQ SECTION */
  .pyq-filters {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }
  .pyq-filter-btn {
    padding: 5px 14px;
    border-radius: 20px;
    border: 1px solid var(--border2);
    background: none;
    color: var(--text3);
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Outfit', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .pyq-filter-btn.active {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
  }

  .pyq-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 8px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-right: 6px;
  }
  .pyq-badge.tnpsc { background: rgba(76,175,125,0.15); color: var(--green); border: 1px solid rgba(76,175,125,0.3); }
  .pyq-badge.upsc { background: rgba(91,141,238,0.15); color: var(--blue); border: 1px solid rgba(91,141,238,0.3); }
  .pyq-badge.ssc { background: rgba(155,109,250,0.15); color: var(--purple); border: 1px solid rgba(155,109,250,0.3); }
  .pyq-badge.rrb { background: rgba(212,120,58,0.15); color: var(--accent2); border: 1px solid rgba(212,120,58,0.3); }
  .pyq-badge.bank { background: rgba(224,87,87,0.15); color: var(--red); border: 1px solid rgba(224,87,87,0.3); }

  .pyq-year {
    font-size: 10px;
    color: var(--text3);
    margin-left: 4px;
  }

  /* RESPONSIVE */
  @media (max-width: 600px) {
    .person-grid { grid-template-columns: repeat(2, 1fr); }
    .key-facts { grid-template-columns: repeat(2, 1fr); }
    .mind-map-branches { grid-template-columns: repeat(2, 1fr); }
  }

  .quiz-filter-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 16px;
    padding: 12px;
    background: var(--bg3);
    border-radius: 12px;
    border: 1px solid var(--border2);
    align-items: center;
  }
  .quiz-filter-label {
    font-size: 11px;
    font-weight: 700;
    color: var(--text3);
    text-transform: uppercase;
    letter-spacing: 1px;
    flex-shrink: 0;
  }

  .chapter-pill {
    display: inline-block;
    background: rgba(201,168,76,0.12);
    color: var(--gold);
    border: 1px solid rgba(201,168,76,0.25);
    border-radius: 20px;
    padding: 2px 10px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .empty-state {
    text-align: center;
    padding: 40px 20px;
    color: var(--text3);
    font-size: 14px;
  }
  .empty-state .big { font-size: 40px; margin-bottom: 10px; }
`;

// ============================================================
// DATA - NOTES
// ============================================================

const subChapters = [
  { id: "intro", label: "9.0 அறிமுகம்" },
  { id: "9_1", label: "9.1 தொடக்ககால" },
  { id: "9_2", label: "9.2 சுதேசி இயக்கம்" },
  { id: "9_3", label: "9.3 பிராமணரல்லாதோர்" },
  { id: "9_4", label: "9.4 ஒத்துழையாமை" },
  { id: "9_5", label: "9.5 சட்டமறுப்பு" },
  { id: "9_6", label: "9.6 வெள்ளையனே வெளியேறு" },
  { id: "keys", label: "🔑 முக்கிய புள்ளிகள்" },
];

const notesData = {
  intro: {
    title: "அறிமுகம் — தமிழ்நாட்டில் விடுதலைப் போராட்டம்",
    content: () => (
      <div>
        <div className="source-badge book">📚 புத்தக குறிப்பு</div>
        <div className="note-body">
          <p>தமிழ்நாடு <strong>காலனியாட்சியை எதிர்ப்பதில் முன்னோடியாக</strong> திகழ்ந்தது. பதினெட்டாம் நூற்றாண்டின் இறுதியிலேயே பாளையக்காரர்கள் ஆங்கிலேயரை எதிர்த்தனர்.</p>
          <p>தமிழ்நாட்டில் விடுதலைப் போராட்டம் <strong>தனித்தன்மை</strong> வாய்ந்தது — இது வெறும் ஆங்கிலேய எதிர்ப்பு மட்டுமல்ல, <em>சாதி ஒடுக்குமுறையிலிருந்தும் விடுதலை பெறும் போராட்டமாகவும்</em> அமைந்தது.</p>
        </div>

        <div className="mind-map-container">
          <span className="mind-map-center">தமிழ்நாட்டில் விடுதலைப் போராட்டம்</span>
          <div className="mind-map-branches">
            {[
              { label: "தொடக்ககால இயக்கங்கள்", val: "MNA, மகாஜன சபை, பத்திரிக்கைகள்" },
              { label: "சுதேசி கட்டம்", val: "வ.உ.சி, பாரதி, கப்பல் நிறுவனம்" },
              { label: "பிராமணரல்லாதோர்", val: "நீதிக்கட்சி, SILF" },
              { label: "ஒத்துழையாமை", val: "ராஜாஜி, ஈ.வெ.ரா, கிலாபத்" },
              { label: "சட்டமறுப்பு", val: "வேதாரண்யம் உப்பு சத்தியாகிரகம்" },
              { label: "வெள்ளையனே வெளியேறு", val: "காமராஜர், 1942" },
            ].map((b, i) => (
              <div className="mind-map-branch" key={i}>
                <strong>{b.label}</strong>
                {b.val}
              </div>
            ))}
          </div>
        </div>

        <div className="key-facts">
          {[
            { value: "1806", label: "வேலூர் கோட்டை எழுச்சி" },
            { value: "1885", label: "இந்திய தேசிய காங்கிரஸ் தொடக்கம்" },
            { value: "1905", label: "வங்கப் பிரிவினை / சுதேசி" },
            { value: "1942", label: "வெள்ளையனே வெளியேறு" },
          ].map((f, i) => (
            <div className="key-fact" key={i}>
              <div className="key-fact-value">{f.value}</div>
              <div className="key-fact-label">{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  "9_1": {
    title: "9.1 தமிழ்நாட்டில் தொடக்ககால தேசிய அதிர்வுகள்",
    content: () => (
      <div>
        <div className="source-badge book">📚 புத்தக குறிப்பு</div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>அ) சென்னைவாசிகள் சங்கம் (Madras Native Association - MNA)</div>
          <div className="note-body">
            <div className="highlight-box">
              <strong>🗓 நிறுவப்பட்ட ஆண்டு:</strong> 1852 | <strong>நிறுவனர்கள்:</strong> கஜுலு லட்சுமிநரசு, சீனிவாசனார் மற்றும் நண்பர்கள்
            </div>
            <p><strong>நோக்கங்கள்:</strong></p>
            <p>• உறுப்பினர்களின் நலன்களை முன்னெடுப்பது<br/>
            • வரிகளைக் குறைக்க கோரிக்கை வைப்பது<br/>
            • கிறித்தவ மிஷனரிகளுக்கு அரசு ஆதரவளிப்பதை எதிர்ப்பது<br/>
            • விவசாயிகள் சித்திரவதைக்கு எதிராக போராட்டம்</p>
            <div className="highlight-box green">
              <strong>📌 முக்கிய வெற்றி:</strong> சித்திரவதை ஆணையம் (Torture Commission) நிறுவப்பட்டது → சித்திரவதைச் சட்டம் (Torture Act) ஒழிக்கப்பட்டது!
            </div>
            <p><em>1862க்குப் பின்னர் செயலிழந்தது.</em></p>
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>ஆ) தேசியவாதப் பத்திரிக்கைகள்</div>
          <div className="note-body">
            <div className="highlight-box">
              <strong>🗓 1877:</strong> T. முத்துசாமி → சென்னை உயர்நீதிமன்றத்தின் <strong>முதல் இந்திய நீதிபதி</strong> — இதை அனைத்து பத்திரிக்கைகளும் (ஐரோப்பியர் நடத்திய) விமர்சித்தன. இதனால் இந்தியரின் கருத்துக்களை வெளிப்படுத்த தேசிய பத்திரிக்கை தேவைப்பட்டது.
            </div>

            <table className="info-table">
              <thead>
                <tr><th>பத்திரிக்கை</th><th>ஆண்டு</th><th>நிறுவனர்</th><th>மொழி</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>தி இந்து (The Hindu)</strong></td><td>1878</td><td>G. சுப்பிரமணியம் + நால்வர்</td><td>ஆங்கிலம்</td></tr>
                <tr><td><strong>சுதேசமித்திரன்</strong></td><td>1891 (பருவ இதழ்) → 1899 (நாளிதழ்)</td><td>G. சுப்பிரமணியம்</td><td>தமிழ்</td></tr>
                <tr><td>இந்தியன் பேட்ரியாட்</td><td>-</td><td>-</td><td>ஆங்கிலம்</td></tr>
                <tr><td>இந்தியா, விஜயா, சூர்யோதயம்</td><td>சுதேசி காலம்</td><td>-</td><td>தமிழ்</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>இ) சென்னை மகாஜன சபை</div>
          <div className="note-body">
            <div className="highlight-box">
              <strong>🗓 நிறுவப்பட்ட தேதி:</strong> 1884 மே 16 | <strong>முதல் தலைவர்:</strong> P. ரங்கையா | <strong>செயலாளர்:</strong> P. அனந்தாச்சார்லு
            </div>
            <p><strong>கோரிக்கைகள்:</strong></p>
            <p>• குடிமைப்பணி தேர்வுகள் இங்கிலாந்திலும் இந்தியாவிலும் <strong>ஒரே சமயம்</strong> நடத்தப்பட வேண்டும்<br/>
            • லண்டனிலுள்ள இந்தியக் கவுன்சிலை மூடுவது<br/>
            • வரிகளைக் குறைப்பது<br/>
            • இராணுவ, குடியியல் நிர்வாகச் செலவுகளைக் குறைப்பது</p>
            <div className="highlight-box green">
              இவ்வமைப்பின் பல கோரிக்கைகள் → 1885 இந்திய தேசிய காங்கிரசின் கோரிக்கைகளாயின!
            </div>
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>ஈ) மிதவாதக் கட்டம் — இந்திய தேசிய காங்கிரஸ்</div>
          <div className="note-body">
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-year">1884 டிசம்பர்</div>
                <div className="timeline-event">அடையாறு பிரம்மஞான சபையில் கூட்டம் — தாதாபாய் நௌரோஜி, K.T. தெலாங், G. சுப்பிரமணியம் கலந்துகொண்டனர்</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">1885 — பம்பாய்</div>
                <div className="timeline-event">INC முதல் கூட்டம் — 72 பிரதிநிதிகளில் <strong>22 பேர் சென்னையிலிருந்து</strong></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">1886 — கொல்கத்தா</div>
                <div className="timeline-event">INC இரண்டாவது மாநாடு — தாதாபாய் நௌரோஜி தலைமை</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">1887 — சென்னை</div>
                <div className="timeline-event">INC மூன்றாவது மாநாடு — பத்ருதீன் தியாப்ஜி தலைமை | மக்கிஸ் தோட்டம் (ஆயிரம் விளக்கு) | 607 பிரதிநிதிகளில் <strong>362 பேர் சென்னை மாகாணத்திலிருந்து</strong></div>
              </div>
            </div>

            <div className="highlight-box blue">
              <strong>📌 கவனிக்க:</strong> அன்றைய சென்னை மாகாணம் → இன்றைய ஆந்திரா (கடற்கரை மாவட்டங்கள் + ராயலசீமா), கர்நாடகா (பெங்களூரு, பெல்லாரி), கேரளா (மலபார்), ஒடிசா (கஞ்சம்) ஆகியவற்றை உள்ளடக்கியது.
            </div>

            <div className="note-body">
              <p><strong>முக்கிய மிதவாத தலைவர்கள்:</strong> V.S. சீனிவாசனார், P.S. சிவசாமி, V. கிருஷ்ணசாமி, T.R. வெங்கட்ராமனார், G.A. நடேசன், T.M. மாதவராவ், S. சுப்பிரமணியனார்</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  "9_2": {
    title: "9.2 சுதேசி இயக்கம்",
    content: () => (
      <div>
        <div className="source-badge book">📚 புத்தக குறிப்பு</div>

        <div className="highlight-box red">
          <strong>⚡ தொடங்கியது:</strong> வங்கப் பிரிவினை (1905) → சுதேசி இயக்கத்திற்கு வழிவகுத்தது → விடுதலைப் போராட்டத்தின் போக்கை மாற்றியமைத்தது
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>அ) தமிழ்நாட்டின் எதிர்வினை</div>
          <div className="person-grid">
            {[
              { emoji: "⚓", name: "வ.உ. சிதம்பரனார்", role: "கப்பலோட்டிய தமிழன்", desc: "சுதேசி நீராவிக் கப்பல் நிறுவனம் தொடங்கினார். காலியா, லாவோ என இரு கப்பல்கள் வாங்கி தூத்துக்குடி-கொழும்பு இடையே ஓட்டினார்." },
              { emoji: "✍️", name: "சுப்பிரமணிய பாரதி", role: "கவிஞர் / தேசியவாதி", desc: "தேசபக்திப் பாடல்கள் மூலம் மக்களை தட்டி எழுப்பினார். சிறைத்தண்டனை தவிர்க்க பாண்டிச்சேரிக்கு இடம்பெயர்ந்தார்." },
              { emoji: "⚔️", name: "V. சர்க்கரையார்", role: "சுதேசி தலைவர்", desc: "தமிழ்நாட்டின் சிறந்த சுதேசி தலைவர்களில் ஒருவர்." },
              { emoji: "🎓", name: "சுரேந்திரநாத் ஆரியா", role: "சுதேசி தலைவர்", desc: "தமிழ்நாட்டில் சுதேசி இயக்கத்தில் முக்கிய பங்கு வகித்தார்." },
            ].map((p, i) => (
              <div className="person-card" key={i}>
                <span className="person-emoji">{p.emoji}</span>
                <div className="person-name">{p.name}</div>
                <div className="person-role">{p.role}</div>
                <div className="person-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>சுதேசி நீராவிக் கப்பல் நிறுவனம் (1906)</div>
          <div className="note-body">
            <div className="highlight-box">
              <strong>நிறுவனர்:</strong> வ.உ. சிதம்பரனார் | <strong>இடம்:</strong> தூத்துக்குடி | <strong>கப்பல்கள்:</strong> காலியா மற்றும் லாவோ<br/>
              <strong>வழி:</strong> தூத்துக்குடி ↔️ கொழும்பு
            </div>
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>திருநெல்வேலி எழுச்சி (1908)</div>
          <div className="note-body">
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-year">1908</div>
                <div className="timeline-event">வ.உ.சி → ஐரோப்பியருக்கு சொந்தமான <strong>கோரல் நூற்பாலையில்</strong> வேலை நிறுத்தத்திற்கு தலைமையேற்றார். சுப்பிரமணிய சிவாவுடன் சேர்ந்து போராட்டம் நடத்தினார்.</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">கைது</div>
                <div className="timeline-event">வ.உ.சி மற்றும் சிவா → <strong>அரசத் துரோக குற்றம்</strong> சாட்டப்பட்டு கடுங்காவல் தண்டனை. வ.உ.சிக்கு ஆரம்பத்தில் <strong>இரண்டு ஆயுள் தண்டனைகள்!</strong></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">கலகம்</div>
                <div className="timeline-event">திருநெல்வேலியில் கலகம் வெடித்தது. காவல்நிலைய, நீதிமன்ற, நகராட்சி அலுவலகக் கட்டிடங்கள் தீக்கிரையாக்கப்பட்டன. 4 பேர் கொல்லப்பட்டனர்.</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">சிறை</div>
                <div className="timeline-event">வ.உ.சி சிறையில் <strong>செக்கிழுக்க வைக்கப்பட்டார்</strong> (கொடூரமான நடவடிக்கை)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>ஆ) புரட்சிகர தேசியவாதிகள்</div>
          <div className="note-body">
            <div className="highlight-box purple">
              <strong>புகலிடம்:</strong> பாண்டிச்சேரி (பிரெஞ்சு ஆட்சியில் இருந்தது)<br/>
              <strong>பயிற்சி வழங்கிய இடங்கள்:</strong> லண்டனில் இந்தியா ஹவுஸ் (India House) மற்றும் பாரிஸ்
            </div>
            <p><strong>முக்கிய புரட்சிகர தேசியவாதிகள்:</strong> M.P.T. ஆச்சாரியா, V.V. சுப்ரமணியனார், T.S.S. ராஜன், அரவிந்தகோஷ்</p>
            <p><strong>புரட்சிவாதச் செய்தித்தாள்கள்:</strong> இந்தியா, விஜயா, சூர்யோதயம் (பாண்டிச்சேரியிலிருந்து)</p>
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>ஆஷ் கொலை (1911)</div>
          <div className="note-body">
            <div className="highlight-box red">
              <strong>1904:</strong> நீலகண்ட பிரம்மச்சாரி → <strong>பாரத மாதா சங்கம்</strong> (ரகசிய அமைப்பு) நிறுவினார்<br/>
              <strong>1911 ஜூன் 17:</strong> வாஞ்சிநாதன் (செங்கோட்டை) → திருநெல்வேலி மாவட்ட ஆட்சியர் <strong>ராபர்ட் W.D.E. ஆஷ்</strong>-ஐ <strong>மணியாச்சி ரயில் சந்திப்பில்</strong> சுட்டுக் கொன்றார் → பின்னர் தன்னையும் சுட்டுக்கொண்டார்.
            </div>
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>இ) அன்னிபெசன்ட் அம்மையார் — தன்னாட்சி இயக்கம் (Home Rule League)</div>
          <div className="note-body">
            <div className="highlight-box">
              <strong>👩 அன்னிபெசன்ட்:</strong> அயர்லாந்துப் பெண்மணி | பிரம்மஞான சபை தலைவர்<br/>
              <strong>1916:</strong> Home Rule League தொடங்கினார் | <strong>துணை:</strong> G.S. அருண்டேல், B.P. வாடியா, C.P. ராமசாமி
            </div>
            <p><strong>செய்தித்தாள்கள்:</strong> நியூ இந்தியா (New India) மற்றும் காமன் வீல் (Commonweal)</p>
            <div className="highlight-box green">
              <strong>புகழ்பெற்ற மேற்கோள்:</strong> "அதிநவீன வசதிகளுடன் கூடிய ரயிலில் அடிமைகளாக இருப்பதைவிட சுதந்திரத்துடன் கூடிய மாட்டு வண்டியே சிறந்தது"
            </div>
            <p><strong>நூல்கள்:</strong> "விடுதலை பெற இந்தியா எப்படித் துயருற்றது" | "இந்தியா: ஒரு தேசம்"</p>
          </div>
        </div>
      </div>
    ),
  },

  "9_3": {
    title: "9.3 பிராமணர் அல்லாதோர் இயக்கமும் காங்கிரசிற்கு சவாலும்",
    content: () => (
      <div>
        <div className="source-badge book">📚 புத்தக குறிப்பு</div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>அ) தென்னிந்திய நலவுரிமைச் சங்கம் (SILF)</div>
          <div className="note-body">
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-year">1912</div>
                <div className="timeline-event"><strong>சென்னை திராவிடர் கழகம்</strong> (Madras Dravidian Association) உருவாக்கப்பட்டது — செயலர்: C. நடேசனார்</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">1916 ஜூன்</div>
                <div className="timeline-event">C. நடேசனார் → பிராமணர் அல்லாத மாணவர்களுக்காக <strong>திராவிடர் சங்க தங்கும் விடுதி</strong> நிறுவினார்</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">1916 நவம்பர் 20</div>
                <div className="timeline-event">சென்னை விக்டோரியா பொது அரங்கில் கூட்டம் — தலைவர்கள்: P. தியாகராயர், டாக்டர் T.M. நாயர், C. நடேசனார்<br/><strong>தென்னிந்திய நலவுரிமைச் சங்கம் (SILF)</strong> = நீதிக்கட்சி உருவாக்கப்பட்டது</div>
              </div>
            </div>
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>நீதிக்கட்சி அமைச்சரவை</div>
          <div className="note-body">
            <table className="info-table">
              <thead>
                <tr><th>ஆண்டு</th><th>நிகழ்வு</th></tr>
              </thead>
              <tbody>
                <tr><td>1920</td><td>காங்கிரஸ் தேர்தலை புறக்கணித்தது → 98 இடங்களில் 63 இடங்களில் நீதிக்கட்சி வெற்றி</td></tr>
                <tr><td>1920</td><td><strong>A. சுப்பராயலு</strong> → முதலாவது முதலமைச்சர்</td></tr>
                <tr><td>1923</td><td><strong>பனகல் அரசர்</strong> → அமைச்சரவை அமைத்தார்</td></tr>
                <tr><td>1930</td><td>சுயராஜ்ஜியக் கட்சி போட்டியிடாமல் → நீதிக்கட்சி எளிதாக வெற்றி → 1937 வரை ஆட்சி</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>ஆ) ரௌலட் சட்டம் (1919) & சத்தியாகிரகம்</div>
          <div className="note-body">
            <div className="highlight-box red">
              <strong>ரௌலட் சட்டம்:</strong> 1919 | முறையான விசாரணை இல்லாமலேயே யாரையும் சிறையில் அடைக்கலாம் → "கருப்புச் சட்டம்" என்று அழைக்கப்பட்டது
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-year">1919 மார்ச் 18</div>
                <div className="timeline-event">காந்தியடிகள் சென்னை மெரினா கடற்கரையில் உரையாற்றினார்</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">1919 ஏப்ரல் 6</div>
                <div className="timeline-event">கடையடைப்பு + வேலை நிறுத்தங்கள் | சென்னை சத்தியாகிர சபை தலைவர்கள்: <strong>C. ராஜாஜி</strong> மற்றும் <strong>ஈ.வெ.ரா (பெரியார்)</strong></div>
              </div>
            </div>
            <div className="highlight-box blue">
              <strong>S. சத்தியமூர்த்தி</strong> — சத்தியாகிரக இயக்கத்தில் முக்கிய பங்கு வகித்தார்
            </div>
          </div>
        </div>
      </div>
    ),
  },

  "9_4": {
    title: "9.4 ஒத்துழையாமை இயக்கம்",
    content: () => (
      <div>
        <div className="source-badge book">📚 புத்தக குறிப்பு</div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>தமிழ்நாட்டில் ஒத்துழையாமை</div>
          <div className="note-body">
            <div className="highlight-box">
              <strong>தலைவர்கள்:</strong> C. ராஜாஜி + ஈ.வெ.ரா (பெரியார்) | முஸ்லிம் லீக் சென்னைக் கிளை நிறுவனர் <strong>யாகுப் ஹசனுடன்</strong> ராஜாஜி நெருக்கமாகச் செயல்பட்டார்
            </div>
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>அ) வரிகொடா + கள்ளுக்கடை மறியல்</div>
          <div className="note-body">
            <p>• <strong>தஞ்சாவூரில்</strong> வரிகொடா இயக்கம்<br/>
            • சட்டமன்றங்கள், பள்ளிகள், நீதிமன்றங்கள் புறக்கணிக்கப்பட்டன<br/>
            • <strong>கள்ளுக்கடைகளுக்கு எதிர்ப்பே</strong> தமிழ்நாட்டில் ஒத்துழையாமையின் முக்கிய அம்சம்</p>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-year">1921 நவம்பர்</div>
                <div className="timeline-event">சட்ட மறுப்பு இயக்கம் தொடங்க முடிவு → ராஜாஜி, சுப்பிரமணிய சாஸ்திரி, ஈ.வெ.ரா கைது</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">1922 ஜனவரி 13</div>
                <div className="timeline-event">வேல்ஸ் இளவரசர் வருகை புறக்கணிக்கப்பட்டது → 2 பேர் கொல்லப்பட்டனர்</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">1922</div>
                <div className="timeline-event"><strong>சௌரி சௌரா நிகழ்வில்</strong> 22 காவலர்கள் கொல்லப்பட்டதால் ஒத்துழையாமை இயக்கம் விலக்கிக்கொள்ளப்பட்டது</div>
              </div>
            </div>
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>ஆ) கிலாபத் இயக்கம்</div>
          <div className="note-body">
            <div className="highlight-box">
              <strong>காரணம்:</strong> துருக்கியின் கலீபா அவமரியாதை செய்யப்பட்டு அவரது அதிகாரங்கள் பறிக்கப்பட்டன → கலீபா பதவி மீட்க கிலாபத் இயக்கம்
            </div>
            <p><strong>1920 ஏப்ரல் 17:</strong> மௌலானா சௌகத் அலி தலைமையில் கிலாபத் நாள் கொண்டாட்டம் (தமிழ்நாட்டில்)</p>
            <p><strong>முக்கிய மையம்:</strong> வாணியம்பாடி</p>
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>இ) சுயராஜ்ஜியக் கட்சி vs நீதிக்கட்சி போட்டி</div>
          <div className="note-body">
            <p>ஒத்துழையாமை நின்ற பிறகு காங்கிரஸ் "மாற்றத்தை விரும்பாதோர்" மற்றும் "மாற்றத்தை விரும்புவோர்" என பிரிந்தது.</p>
            <div className="highlight-box">
              <strong>சுயராஜ்ஜியக் கட்சி உருவாக்கினர்:</strong> சித்தரஞ்சன் தாஸ், மோதிலால் நேரு<br/>
              <strong>தமிழ்நாட்டில் தலைவர்கள்:</strong> S. சீனிவாசனார், S. சத்தியமூர்த்தி
            </div>
            <p><strong>1926 தேர்தல்:</strong> சுயராஜ்ஜியக் கட்சி பெரும்பான்மை இடங்கள் வென்றும் ஆட்சிப் பொறுப்பு ஏற்கவில்லை → சுயேட்சை வேட்பாளர் <strong>P. சுப்பராயனுக்கு</strong> உதவினர்</p>
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>ஈ) சைமன் குழுவை புறக்கணித்தல் (1927-29)</div>
          <div className="note-body">
            <div className="highlight-box red">
              <strong>சர் ஜான் சைமன் தலைமையில்</strong> ஆணையம் அமைக்கப்பட்டது → ஆனால் <strong>ஒரு இந்தியர் கூட இடம்பெறவில்லை!</strong> → இந்தியர்களுக்கு மிகப்பெரும் மனச்சோர்வு → காங்கிரஸ் புறக்கணிப்பு
            </div>
            <p><strong>1929 பிப்ரவரி 18:</strong> சைமன் குழு சென்னைக்கு வந்தபோது <strong>கறுப்புக்கொடி</strong> காட்டப்பட்டது</p>
            <p><strong>தலைமை:</strong> S. சத்தியமூர்த்தி</p>
          </div>
        </div>
      </div>
    ),
  },

  "9_5": {
    title: "9.5 சட்ட மறுப்பு இயக்கம்",
    content: () => (
      <div>
        <div className="source-badge book">📚 புத்தக குறிப்பு</div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>அ) பூரண சுயராஜ்ஜியம்</div>
          <div className="note-body">
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-year">1927 — சென்னை மாநாடு</div>
                <div className="timeline-event">INC → முழுமையான சுதந்திரமே இலக்கு என அறிவித்தது</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">1929 — லாகூர் மாநாடு</div>
                <div className="timeline-event"><strong>பூரண சுயராஜ்ஜியம்</strong> (முழு சுதந்திரம்) தீர்மானம் நிறைவேற்றப்பட்டது</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">1930 ஜனவரி 26</div>
                <div className="timeline-event">ராவி நதியின் கரையில் <strong>ஜவகர்லால் நேரு</strong> தேசியக்கொடி ஏற்றினார் — சுதந்திரம் அறிவிக்கப்பட்டது</div>
              </div>
            </div>
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>ஆ) வேதாரண்யம் உப்பு சத்தியாகிரகம் (1930)</div>
          <div className="note-body">
            <div className="highlight-box">
              <strong>தலைவர்:</strong> ராஜாஜி | <strong>தொடங்கிய இடம்:</strong> திருச்சிராப்பள்ளி | <strong>சென்றடைந்த இடம்:</strong> வேதாரண்யம் (தஞ்சாவூர் மாவட்டம்)
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-year">1930 ஏப்ரல் 13</div>
                <div className="timeline-event">திருச்சிராப்பள்ளியிலிருந்து தொடங்கியது</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">1930 ஏப்ரல் 28</div>
                <div className="timeline-event">வேதாரண்யம் சென்றடைந்தது — ராஜாஜி தலைமையில் <strong>12 தொண்டர்கள்</strong> உப்புச் சட்டத்தை மீறி உப்பை அள்ளினர்</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">கைது</div>
                <div className="timeline-event">ராஜாஜி கைது செய்யப்பட்டார்</div>
              </div>
            </div>
            <div className="highlight-box green">
              <strong>🎵 சிறப்புப் பாடல்:</strong> "கத்தியின்றி ரத்தமின்றி யுத்தமொன்று வருகுது, சத்தியத்தின் நித்தியத்தை நம்பும் யாரும் சேருவீர்" — <strong>நாமக்கல் கவிஞர் இராமலிங்கனார்</strong>
            </div>
            <p><strong>முக்கிய பங்கேற்பாளர்கள்:</strong> T.S.S. ராஜன், திருமதி. ருக்மணி லட்சுமிபதி, சர்தார் வேதரத்தினம், C. சாமிநாதர், K. சந்தானம்</p>
            <div className="highlight-box blue">
              <strong>👩 ருக்மணி லட்சுமிபதி:</strong> உப்புச் சட்டத்தை மீறியதற்காக அபராதம் கட்டிய <strong>முதல் பெண்மணி!</strong>
            </div>
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>திருப்பூர் குமரன் (1932)</div>
          <div className="note-body">
            <div className="highlight-box red">
              <strong>1932 ஜனவரி 11 — திருப்பூர்:</strong> கொடிகளை ஏந்தியவண்ணம் ஊர்வலம் → காவல்துறை கொடூரமாக அடித்தது → O.K.S.R. குமாரசாமி (திருப்பூர் குமரன்) <strong>தேசியக் கொடியை உயர்த்திப் பிடித்தவாறே விழுந்து இறந்தார் → "கொடிகாத்த குமரன்" என புகழப்படுகிறார்</strong>
            </div>
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>ஈ) முதல் காங்கிரஸ் அமைச்சரவை (1937)</div>
          <div className="note-body">
            <div className="highlight-box green">
              <strong>1937 தேர்தல்:</strong> காங்கிரஸ் வெற்றி | நீதிக்கட்சி படுதோல்வி<br/>
              <strong>முதல் காங்கிரஸ் முதலமைச்சர்:</strong> ராஜாஜி (சென்னையில்)
            </div>
            <p>• <strong>மது விலக்கு</strong> சேலத்தில் பரிசோதனை முயற்சியாக அறிமுகம்<br/>
            • <strong>விற்பனை வரி</strong> அறிமுகப்படுத்தினார்<br/>
            • ஆங்கில அரசு இந்தியாவை WWII-ல் ஈடுபடுத்தியதால் காங்கிரஸ் அமைச்சரவை <strong>ராஜினாமா</strong> செய்தது</p>
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>உ) இந்தி எதிர்ப்புப் போராட்டம்</div>
          <div className="note-body">
            <div className="highlight-box red">
              <strong>காரணம்:</strong> ராஜாஜியால் பள்ளிகளில் இந்தி மொழி கட்டாயப்படமாக அறிமுகம் → தமிழ் மொழிக்கும் பண்பாட்டிற்கும் தீங்கு என மக்கள் எதிர்ப்பு
            </div>
            <p>• <strong>ஈ.வெ.ரா</strong> → மிகப்பெரிய பரப்புரை மேற்கொண்டார்<br/>
            • <strong>இந்தி எதிர்ப்பு மாநாடு — சேலத்தில்</strong> நடத்தினார்<br/>
            • <strong>ஆதரவளித்தோர்:</strong> ஒடுக்கப்பட்டோர் கூட்டமைப்பு + முஸ்லிம் லீக்<br/>
            • <strong>உயிரிழந்தோர்:</strong> தாளமுத்து மற்றும் நடராஜன் (சிறையில் மரணம்)<br/>
            • <strong>1200 போராட்டக்காரர்கள் கைது</strong> (பெரியார் உட்பட)<br/>
            • <strong>முடிவு:</strong> காங்கிரஸ் பதவி விலகியதால் ஆளுநர் இந்தி கட்டாயப் பாடத்தை நீக்கினார்</p>
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>நீல் சிலை அகற்றும் போராட்டம் (1927)</div>
          <div className="note-body">
            <div className="highlight-box">
              <strong>ஜேம்ஸ் நீல்:</strong> 1857 பேரெழுச்சியில் கான்பூர் படுகொலை நடத்தியவர் → சென்னை மவுண்ட் ரோட்டில் சிலை வைக்கப்பட்டது → தேசியவாதிகள் எதிர்ப்பு<br/>
              <strong>1937:</strong> ராஜாஜி ஆட்சியில் சிலை அகற்றப்பட்டு சென்னை அருங்காட்சியகத்திற்கு கொண்டுசெல்லப்பட்டது
            </div>
          </div>
        </div>
      </div>
    ),
  },

  "9_6": {
    title: "9.6 வெள்ளையனே வெளியேறு இயக்கம் (1942)",
    content: () => (
      <div>
        <div className="source-badge book">📚 புத்தக குறிப்பு</div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>Quit India Movement</div>
          <div className="note-body">
            <div className="highlight-box red">
              <strong>1942 ஆகஸ்டு 8:</strong> வெள்ளையனே வெளியேறு தீர்மானம் நிறைவேற்றப்பட்டது<br/>
              <strong>காந்தியடிகளின் முழக்கம்:</strong> "செய் அல்லது செத்துமடி" (Do or Die)<br/>
              <strong>ஒரே நாள் இரவில்:</strong> ஒட்டுமொத்த காங்கிரஸ் தலைவர்களும் கைது!
            </div>
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>காமராஜரின் தலைமறைவு</div>
          <div className="note-body">
            <div className="highlight-box green">
              ஒவ்வொரு ரயில் நிலையத்திலும் காவலர்கள் தலைவர்களை கைது செய்தனர் → பம்பாயிலிருந்து திரும்பிய <strong>கு. காமராஜர்</strong> இதை கவனித்தார் → <strong>அரக்கோணத்தில் ரயிலிலிருந்து இறங்கி தலைமறைவாகி</strong> மக்களை திரட்டினார்!
            </div>
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>தீரா மக்கள் இயக்கம்</div>
          <div className="note-body">
            <p>• <strong>பக்கிங்காம் & கர்நாட்டிக் மில்</strong>, சென்னை துறைமுகம், சென்னை மாநகராட்சி, மின்சார டிராம் போக்குவரத்து — இவற்றில் தொழிலாளர் போராட்டங்கள்<br/>
            • பெரும் எண்ணிக்கையில் ஆண்கள், பெண்கள் → <strong>இந்திய தேசிய இராணுவம் (INA)</strong> சேர்ந்தனர்<br/>
            • இயக்கம் <strong>வன்முறை மூலம் ஒடுக்கப்பட்டது</strong></p>
            <div className="highlight-box blue">
              <strong>விடுதலைக்கு வழிவகுத்தவை:</strong><br/>
              ✅ ராயல் இந்தியக் கப்பற்படைப் புரட்சி<br/>
              ✅ இங்கிலாந்தில் புதிதாக ஆட்சிப் பொறுப்பேற்ற தொழிலாளர் கட்சி அரசின் பேச்சு வார்த்தைகள்<br/>
              ❌ சோகம்: நாடு இந்தியா, பாகிஸ்தான் என இரண்டாகப் பிரிக்கப்பட்டது
            </div>
          </div>
        </div>
      </div>
    ),
  },

  keys: {
    title: "🔑 முக்கிய புள்ளிகள் — விரைவு மதிப்பாய்வு",
    content: () => (
      <div>
        <div className="source-badge book">📚 தேர்வு குறிப்பு</div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>📅 முக்கிய ஆண்டுகள்</div>
          <div className="note-body">
            <table className="info-table">
              <thead><tr><th>ஆண்டு</th><th>நிகழ்வு</th></tr></thead>
              <tbody>
                {[
                  ["1852","சென்னைவாசிகள் சங்கம் (MNA) நிறுவப்பட்டது"],
                  ["1877","T. முத்துசாமி — சென்னை HC முதல் இந்திய நீதிபதி"],
                  ["1878","தி இந்து பத்திரிக்கை தொடங்கியது"],
                  ["1884 மே 16","சென்னை மகாஜன சபை நிறுவப்பட்டது"],
                  ["1885","INC முதல் கூட்டம் — பம்பாய்"],
                  ["1887","INC 3வது மாநாடு — சென்னை (மக்கிஸ் தோட்டம்)"],
                  ["1891","சுதேசமித்திரன் (தமிழ் பருவ இதழ்) தொடங்கியது"],
                  ["1899","சுதேசமித்திரன் நாளிதழானது"],
                  ["1904","பாரத மாதா சங்கம் நிறுவப்பட்டது"],
                  ["1905","வங்கப் பிரிவினை → சுதேசி இயக்கம்"],
                  ["1906","சுதேசி நீராவிக் கப்பல் நிறுவனம் — வ.உ.சி"],
                  ["1908","திருநெல்வேலி எழுச்சி"],
                  ["1911 ஜூன் 17","வாஞ்சிநாதன் — ஆஷ் கொலை (மணியாச்சி)"],
                  ["1912","சென்னை திராவிடர் கழகம்"],
                  ["1916","Home Rule League — அன்னிபெசன்ட்"],
                  ["1916 நவ. 20","SILF (நீதிக்கட்சி) நிறுவப்பட்டது"],
                  ["1919","ரௌலட் சட்டம் — ரௌலட் சத்தியாகிரகம்"],
                  ["1920","நீதிக்கட்சி தேர்தல் வெற்றி — A. சுப்பராயலு முதலமைச்சர்"],
                  ["1922 ஜன. 13","வேல்ஸ் இளவரசர் வருகை புறக்கணிப்பு"],
                  ["1927","சைமன் குழு / நீல் சிலை அகற்றல் போராட்டம்"],
                  ["1927","INC சென்னை மாநாடு — முழு சுதந்திரம் இலக்கு"],
                  ["1929","INC லாகூர் மாநாடு — பூரண சுயராஜ்ஜியம்"],
                  ["1929 ஜன. 26","நேரு தேசியக்கொடி ஏற்றினார்"],
                  ["1930 ஏப்ரல் 28","வேதாரண்யம் உப்பு சத்தியாகிரகம்"],
                  ["1932 ஜன. 11","திருப்பூர் குமரன் தியாகம்"],
                  ["1932 ஜன. 26","ஆரியா — புனித ஜார்ஜ் கோட்டையில் கொடி ஏற்றினார்"],
                  ["1937","முதல் காங்கிரஸ் அமைச்சரவை — ராஜாஜி"],
                  ["1942 ஆக. 8","வெள்ளையனே வெளியேறு தீர்மானம்"],
                ].map(([yr, ev], i) => (
                  <tr key={i}><td><strong>{yr}</strong></td><td>{ev}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>👤 முக்கிய நபர்கள் — சுருக்கம்</div>
          <div className="note-body">
            <table className="info-table">
              <thead><tr><th>நபர்</th><th>அடைப்பெயர் / சிறப்பு</th></tr></thead>
              <tbody>
                {[
                  ["வ.உ. சிதம்பரனார்","கப்பலோட்டிய தமிழன் | செக்கிழுத்த செம்மல்"],
                  ["சுப்பிரமணிய பாரதி","தேசபக்திக் கவிஞர் | பாண்டிச்சேரிக்கு தப்பினார்"],
                  ["ராஜாஜி (C. ராஜகோபாலாச்சாரி)","முதல் காங்கிரஸ் முதலமைச்சர் | வேதாரண்யம் சத்தியாகிரகம்"],
                  ["ஈ.வெ.ரா (பெரியார்)","வைக்கம் வீரர் | இந்தி எதிர்ப்பு தலைவர்"],
                  ["வாஞ்சிநாதன்","ஆஷ் கொலை (1911) | செங்கோட்டை"],
                  ["திருப்பூர் குமரன்","கொடிகாத்த குமரன் | 1932"],
                  ["அன்னிபெசன்ட்","Home Rule League | நியூ இந்தியா பத்திரிக்கை"],
                  ["S. சத்தியமூர்த்தி","சுயராஜ்ஜியக் கட்சி தலைவர் | சைமன் எதிர்ப்பு"],
                  ["காமராஜர்","Quit India | அரக்கோணத்தில் தப்பினார்"],
                  ["G. சுப்பிரமணியம்","தி இந்து + சுதேசமித்திரன் நிறுவனர்"],
                  ["A. சுப்பராயலு","நீதிக்கட்சி முதல் முதலமைச்சர் (1920)"],
                  ["ருக்மணி லட்சுமிபதி","உப்பு சட்டம் மீறி அபராதம் கட்டிய முதல் பெண்"],
                ].map(([n, r], i) => (
                  <tr key={i}><td><strong>{n}</strong></td><td>{r}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="note-card">
          <div className="note-card-title"><span className="dot"></span>🏛 முக்கிய அமைப்புகள்</div>
          <div className="note-body">
            <table className="info-table">
              <thead><tr><th>அமைப்பு</th><th>ஆண்டு</th><th>சிறப்பு</th></tr></thead>
              <tbody>
                {[
                  ["MNA (சென்னைவாசிகள் சங்கம்)","1852","தென்னிந்தியாவின் முதல் அரசியல் அமைப்பு"],
                  ["சென்னை மகாஜன சபை","1884","தெளிவான தேசிய நோக்கங்கள்"],
                  ["INC","1885","முதல் மாநாடு பம்பாய்"],
                  ["சுதேசி நீராவிக் கப்பல் நிறுவனம்","1906","வ.உ.சி — தூத்துக்குடி"],
                  ["பாரத மாதா சங்கம்","1904","நீலகண்ட பிரம்மச்சாரி — ரகசிய அமைப்பு"],
                  ["Home Rule League","1916","அன்னிபெசன்ட்"],
                  ["SILF (நீதிக்கட்சி)","1916","P. தியாகராயர், T.M. நாயர், C. நடேசனார்"],
                  ["சுயராஜ்ஜியக் கட்சி","1922","தாஸ், மோதிலால் நேரு"],
                  ["இந்திய தேசிய இராணுவம் (INA)","WWII","நேதாஜி சுபாஷ் சந்திரபோஸ்"],
                ].map(([n, yr, sp], i) => (
                  <tr key={i}><td><strong>{n}</strong></td><td>{yr}</td><td>{sp}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ),
  },
};

// ============================================================
// DATA - QUIZ QUESTIONS (Normal Quiz)
// ============================================================
const quizQuestions = [
  // Section 9.1
  { id: 1, section: "9.1", q: "சென்னைவாசிகள் சங்கம் (MNA) எந்த ஆண்டு நிறுவப்பட்டது?", opts: ["1848","1852","1857","1862"], ans: 1, exp: "சென்னைவாசிகள் சங்கம் 1852இல் கஜுலு லட்சுமிநரசு, சீனிவாசனார் மற்றும் அவர்களைச் சேர்ந்தவர்களால் நிறுவப்பட்டது." },
  { id: 2, section: "9.1", q: "சென்னை உயர்நீதிமன்றத்தின் முதல் இந்திய நீதிபதி யார்?", opts: ["G. சுப்பிரமணியம்","T. முத்துசாமி","P. ரங்கையா","M. வீரராகவாச்சாரி"], ans: 1, exp: "T. முத்துசாமி 1877இல் சென்னை உயர்நீதிமன்றத்தின் முதல் இந்திய நீதிபதியாக நியமிக்கப்பட்டார்." },
  { id: 3, section: "9.1", q: "'தி இந்து' பத்திரிக்கை எந்த ஆண்டு தொடங்கப்பட்டது?", opts: ["1875","1878","1880","1885"], ans: 1, exp: "1878இல் G. சுப்பிரமணியம், M. வீரராகவாச்சாரி மற்றும் நண்பர்கள் நால்வரால் 'தி இந்து' தொடங்கப்பட்டது." },
  { id: 4, section: "9.1", q: "சென்னை மகாஜன சபையின் முதல் தலைவர் யார்?", opts: ["M. வீரராகவாச்சாரி","P. அனந்தாச்சார்லு","P. ரங்கையா","G.A. நடேசன்"], ans: 2, exp: "சென்னை மகாஜன சபையின் முதல் தலைவராக P. ரங்கையா பொறுப்பேற்றார்." },
  { id: 5, section: "9.1", q: "சென்னை மகாஜன சபை எந்த தேதியில் நிறுவப்பட்டது?", opts: ["1884 மே 6","1884 மே 16","1884 ஜூன் 16","1885 மே 16"], ans: 1, exp: "சென்னை மகாஜன சபை 1884 மே 16இல் M. வீரராகவாச்சாரி, P. அனந்தாச்சார்லு, P. ரங்கையா மற்றும் சிலரால் நிறுவப்பட்டது." },
  { id: 6, section: "9.1", q: "INC மூன்றாவது மாநாடு சென்னையில் எங்கே நடந்தது?", opts: ["மெரினா கடற்கரை","மைலாப்பூர்","மக்கிஸ் தோட்டம் (ஆயிரம் விளக்கு)","புனித ஜார்ஜ் கோட்டை"], ans: 2, exp: "1887இல் INC மூன்றாவது மாநாடு மக்கிஸ் தோட்டத்தில் (இன்று ஆயிரம் விளக்கு என அழைக்கப்படுகிறது) நடைபெற்றது." },
  { id: 7, section: "9.1", q: "INC முதல் மாநாட்டில் (1885) சென்னையிலிருந்து எத்தனை பேர் கலந்துகொண்டனர்?", opts: ["18","22","30","36"], ans: 1, exp: "INC முதல் மாநாட்டில் மொத்தம் 72 பிரதிநிதிகளில் 22 பேர் சென்னையைச் சேர்ந்தவர்கள்." },
  { id: 8, section: "9.1", q: "INC மூன்றாவது மாநாட்டில் (1887, சென்னை) கலந்துகொண்ட மொத்த பிரதிநிதிகளில் சென்னை மாகாணத்தைச் சேர்ந்தவர்கள் எத்தனை பேர்?", opts: ["200","280","362","450"], ans: 2, exp: "607 அகில இந்தியப் பிரதிநிதிகளில் 362 பேர் சென்னை மாகாணத்தைச் சேர்ந்தவர்கள்." },
  { id: 9, section: "9.1", q: "சுதேசமித்திரன் என்ற தமிழ் பருவ இதழை தொடங்கியவர் யார்?", opts: ["M. வீரராகவாச்சாரி","T. முத்துசாமி","G. சுப்பிரமணியம்","P. அனந்தாச்சார்லு"], ans: 2, exp: "G. சுப்பிரமணியம் 1891இல் சுதேசமித்திரன் என்ற தமிழ் பருவ இதழைத் தொடங்கினார்; 1899இல் அது நாளிதழானது." },
  { id: 10, section: "9.1", q: "INC 3வது மாநாட்டிற்கு தலைமை வகித்தவர் யார்?", opts: ["தாதாபாய் நௌரோஜி","சுரேந்திரநாத் பானர்ஜி","பத்ருதீன் தியாப்ஜி","கோகலே"], ans: 2, exp: "1887இல் சென்னையில் நடைபெற்ற INC 3வது மாநாட்டிற்கு பத்ருதீன் தியாப்ஜி தலைமை வகித்தார்." },

  // Section 9.2
  { id: 11, section: "9.2", q: "சுதேசி இயக்கம் எந்த நிகழ்வினால் தொடங்கப்பட்டது?", opts: ["ஜாலியன்வாலாபாக் படுகொலை","வங்கப் பிரிவினை (1905)","ரௌலட் சட்டம்","வேதாரண்யம் மார்ச்"], ans: 1, exp: "1905இல் வங்கப் பிரிவினை நடந்தது → சுதேசி இயக்கத்திற்கு இட்டுச் சென்றது." },
  { id: 12, section: "9.2", q: "சுதேசி நீராவிக் கப்பல் நிறுவனம் எந்த ஆண்டு தொடங்கப்பட்டது?", opts: ["1904","1905","1906","1908"], ans: 2, exp: "வ.உ.சிதம்பரனார் 1906இல் தூத்துக்குடியில் சுதேசி நீராவிக் கப்பல் நிறுவனம் தொடங்கினார்." },
  { id: 13, section: "9.2", q: "சுதேசி நீராவிக் கப்பல் நிறுவனம் இயக்கிய கப்பல்கள் என்ன?", opts: ["காலியா மற்றும் லாவோ","இந்தியா மற்றும் பாரதி","விஜயா மற்றும் சூர்யோதயம்","கல்கத்தா மற்றும் மதராஸ்"], ans: 0, exp: "காலியா மற்றும் லாவோ என்ற இரு கப்பல்களை வ.உ.சி வாங்கி தூத்துக்குடி-கொழும்பு இடையே ஓட்டினார்." },
  { id: 14, section: "9.2", q: "பாரத மாதா சங்கம் என்ற ரகசிய அமைப்பை தொடங்கியவர் யார்?", opts: ["அரவிந்தகோஷ்","V.V. சுப்பிரமணியனார்","நீலகண்ட பிரம்மச்சாரி","M.P.T. ஆச்சாரியா"], ans: 2, exp: "1904இல் நீலகண்ட பிரம்மச்சாரி பாரத மாதா சங்கம் என்ற ரகசிய அமைப்பை உருவாக்கினார்." },
  { id: 15, section: "9.2", q: "ராபர்ட் W.D.E. ஆஷ் எங்கே கொல்லப்பட்டார்?", opts: ["தூத்துக்குடி","திருநெல்வேலி","மணியாச்சி ரயில் சந்திப்பு","சென்னை"], ans: 2, exp: "1911 ஜூன் 17இல் வாஞ்சிநாதன் திருநெல்வேலி மாவட்ட ஆட்சியர் ஆஷை மணியாச்சி ரயில் சந்திப்பில் சுட்டுக் கொன்றார்." },
  { id: 16, section: "9.2", q: "Home Rule League எந்த ஆண்டு தொடங்கப்பட்டது?", opts: ["1914","1915","1916","1917"], ans: 2, exp: "அன்னிபெசன்ட் 1916இல் Home Rule League தொடங்கினார்." },
  { id: 17, section: "9.2", q: "'கப்பலோட்டிய தமிழன்' என்று அழைக்கப்படுபவர் யார்?", opts: ["சுப்பிரமணிய சிவா","சுப்பிரமணிய பாரதி","வ.உ. சிதம்பரனார்","V. சர்க்கரையார்"], ans: 2, exp: "வ.உ. சிதம்பரனார் 'கப்பலோட்டிய தமிழன்' என்று புகழப்படுகிறார்." },
  { id: 18, section: "9.2", q: "புரட்சிகர தேசியவாதிகளுக்கு எந்த நகரம் பாதுகாப்பான புகலிடமாக இருந்தது?", opts: ["சென்னை","கோவை","பாண்டிச்சேரி","மதுரை"], ans: 2, exp: "பாண்டிச்சேரி பிரெஞ்சு ஆட்சியில் இருந்ததால் புரட்சிகர தேசியவாதிகளுக்கு பாதுகாப்பான புகலிடமாயிற்று." },
  { id: 19, section: "9.2", q: "திருநெல்வேலி எழுச்சியில் எத்தனை பேர் காவல்துறை துப்பாக்கிச் சூட்டில் கொல்லப்பட்டனர்?", opts: ["2","4","6","8"], ans: 1, exp: "திருநெல்வேலி எழுச்சியில் காவல்துறையின் துப்பாக்கிச்சூட்டில் நான்கு நபர்கள் கொல்லப்பட்டனர்." },
  { id: 20, section: "9.2", q: "அன்னிபெசன்ட் தொடங்கிய செய்தித்தாள்கள் எவை?", opts: ["தி இந்து மற்றும் சுதேசமித்திரன்","நியூ இந்தியா மற்றும் காமன் வீல்","இந்தியா மற்றும் விஜயா","தேசாபிமானி மற்றும் சூர்யோதயம்"], ans: 1, exp: "அன்னிபெசன்ட் நியூ இந்தியா (New India) மற்றும் காமன் வீல் (Commonweal) என்ற இரண்டு செய்தித்தாள்களைத் தொடங்கினார்." },

  // Section 9.3
  { id: 21, section: "9.3", q: "தென்னிந்திய நலவுரிமைச் சங்கம் (SILF) எந்த தேதியில் நிறுவப்பட்டது?", opts: ["1916 மே 20","1916 நவம்பர் 20","1917 ஜனவரி 20","1916 அக்டோபர் 20"], ans: 1, exp: "1916 நவம்பர் 20இல் P. தியாகராயர், T.M. நாயர், C. நடேசனார் தலைமையில் SILF நிறுவப்பட்டது." },
  { id: 22, section: "9.3", q: "நீதிக்கட்சியின் முதல் முதலமைச்சர் யார்?", opts: ["பனகல் அரசர்","P. தியாகராயர்","A. சுப்பராயலு","C. நடேசனார்"], ans: 2, exp: "1920 தேர்தலில் நீதிக்கட்சி வெற்றி பெற்றதால் A. சுப்பராயலு முதலாவது முதலமைச்சரானார்." },
  { id: 23, section: "9.3", q: "ரௌலட் சட்டம் எந்த ஆண்டு இயற்றப்பட்டது?", opts: ["1918","1919","1920","1921"], ans: 1, exp: "ஆங்கில அரசு 1919இல் ரௌலட் சட்டம் என்று அழைக்கப்படும் கொடூரமான குழப்பவாத புரட்சிக் குற்றச் சட்டத்தை இயற்றியது." },
  { id: 24, section: "9.3", q: "ரௌலட் சட்டம் எந்த ஆணையத்தின் பரிந்துரையால் உருவானது?", opts: ["சைமன் குழு","ஹண்டர் குழு","சர் சிட்னி ரௌலட் குழு","மக்டொனால்டு குழு"], ans: 2, exp: "சர் சிட்னி ரௌலட் தலைமையிலான குழுவின் பரிந்துரையால் இச்சட்டம் உருவானது, எனவே ரௌலட் சட்டம் எனப்பட்டது." },
  { id: 25, section: "9.3", q: "சென்னை மகாஜன சபையின் செயலாளர் யார்?", opts: ["M. வீரராகவாச்சாரி","P. அனந்தாச்சார்லு","P. ரங்கையா","G. சுப்பிரமணியம்"], ans: 1, exp: "சென்னை மகாஜன சபையின் செயலாளராக P. அனந்தாச்சார்லு பொறுப்பேற்றார்." },
  { id: 26, section: "9.3", q: "1920 தேர்தலில் நீதிக்கட்சி எத்தனை இடங்கள் வென்றது?", opts: ["45","54","63","72"], ans: 2, exp: "1920 தேர்தலில் மொத்தமிருந்த 98 இடங்களில் 63 இடங்களில் நீதிக்கட்சி வெற்றி பெற்றது." },
  { id: 27, section: "9.3", q: "சென்னை திராவிடர் கழகம் எந்த ஆண்டு உருவாக்கப்பட்டது?", opts: ["1910","1912","1914","1916"], ans: 1, exp: "1912இல் சென்னை திராவிடர் கழகம் (Madras Dravidian Association) உருவாக்கப்பட்டது." },

  // Section 9.4
  { id: 28, section: "9.4", q: "கிலாபத் இயக்கம் எதற்காக தொடங்கப்பட்டது?", opts: ["ஜாலியன்வாலாபாக் படுகொலைக்கு எதிர்ப்பாக","துருக்கியின் கலீபா பதவியை மீட்க","வங்கப் பிரிவினை எதிர்ப்பாக","ரௌலட் சட்டத்திற்கு எதிர்ப்பாக"], ans: 1, exp: "துருக்கியின் கலீபாவின் பதவியை மீட்பதற்காக கிலாபத் இயக்கம் தொடங்கப்பட்டது." },
  { id: 29, section: "9.4", q: "1922இல் ஒத்துழையாமை இயக்கம் விலக்கிக்கொள்ளப்படுவதற்கு காரணமான நிகழ்வு என்ன?", opts: ["ஜாலியன்வாலாபாக் படுகொலை","சௌரி சௌரா நிகழ்வு","மணியாச்சி சம்பவம்","திருநெல்வேலி எழுச்சி"], ans: 1, exp: "1922இல் சௌரி சௌரா நிகழ்வில் 22 காவலர்கள் கொல்லப்பட்டதால் காந்தி ஒத்துழையாமை இயக்கத்தை விலக்கிக்கொண்டார்." },
  { id: 30, section: "9.4", q: "முஸ்லிம் லீக்கின் சென்னைக் கிளையை நிறுவியவர் யார்?", opts: ["ஜார்ஜ் ஜோசப்","யாகுப் ஹசன்","S. சத்தியமூர்த்தி","மௌலானா சௌகத் அலி"], ans: 1, exp: "யாகுப் ஹசன் முஸ்லிம் லீக்கின் சென்னைக் கிளையை நிறுவினார்." },
  { id: 31, section: "9.4", q: "தமிழ்நாட்டில் கிலாபத் இயக்கத்தின் முக்கிய மையம் எது?", opts: ["ஈரோடு","வேலூர்","வாணியம்பாடி","கோவை"], ans: 2, exp: "வாணியம்பாடி கிலாபத் எழுச்சி நடவடிக்கைகளின் முக்கிய மையமாக திகழ்ந்தது." },
  { id: 32, section: "9.4", q: "1926 சென்னை மாகாண தேர்தலில் சுயேட்சை வேட்பாளராக அமைச்சரவை அமைத்தவர் யார்?", opts: ["A. சுப்பராயலு","பனகல் அரசர்","P. சுப்பராயன்","S. சத்தியமூர்த்தி"], ans: 2, exp: "1926 தேர்தலில் சுயராஜ்ஜியக் கட்சி ஆட்சிப் பொறுப்பு ஏற்கவில்லை; சுயேட்சை வேட்பாளர் P. சுப்பராயனுக்கு உதவினர்." },
  { id: 33, section: "9.4", q: "ஒத்துழையாமை இயக்கத்தின் போது வேல்ஸ் இளவரசர் வருகை எந்த தேதியில் புறக்கணிக்கப்பட்டது?", opts: ["1922 ஜனவரி 6","1922 ஜனவரி 13","1922 ஜனவரி 26","1921 நவம்பர் 20"], ans: 1, exp: "1922 ஜனவரி 13இல் வேல்ஸ் இளவரசரின் வருகை புறக்கணிக்கப்பட்டது." },
  { id: 34, section: "9.4", q: "சைமன் குழு சென்னைக்கு வந்தபோது (1929) என்ன காட்டப்பட்டது?", opts: ["வெள்ளைக் கொடி","கறுப்புக் கொடி","தேசியக் கொடி","சிவப்புக் கொடி"], ans: 1, exp: "1929 பிப்ரவரி 18இல் சைமன் குழு சென்னைக்கு வந்தபோது கறுப்புக்கொடி காட்டப்பட்டது." },

  // Section 9.5
  { id: 35, section: "9.5", q: "வேதாரண்யம் உப்பு சத்தியாகிரகம் எங்கிருந்து தொடங்கியது?", opts: ["சென்னை","தஞ்சாவூர்","திருச்சிராப்பள்ளி","மதுரை"], ans: 2, exp: "1930 ஏப்ரல் 13இல் திருச்சிராப்பள்ளியிலிருந்து தொடங்கி ஏப்ரல் 28இல் வேதாரண்யம் சென்றடைந்தது." },
  { id: 36, section: "9.5", q: "வேதாரண்யம் உப்பு சத்தியாகிரகத்திற்காக பாடல் இயற்றியவர் யார்?", opts: ["சுப்பிரமணிய பாரதி","நாமக்கல் கவிஞர் இராமலிங்கனார்","பாரதிதாசன்","திருவாரூர் தண்டபாணி தேசிகர்"], ans: 1, exp: "நாமக்கல் கவிஞர் இராமலிங்கனார் 'கத்தியின்றி ரத்தமின்றி யுத்தமொன்று வருகுது...' என்ற பாடலை இயற்றினார்." },
  { id: 37, section: "9.5", q: "உப்பு சத்தியாகிரகத்தில் உப்புச் சட்டங்களை மீறியதற்காக அபராதம் கட்டிய முதல் பெண் யார்?", opts: ["அன்னிபெசன்ட்","திருமதி ருக்மணி லட்சுமிபதி","கமலா நேரு","சரோஜினி நாயுடு"], ans: 1, exp: "திருமதி ருக்மணி லட்சுமிபதி உப்புச் சட்டங்களை மீறியதற்காக அபராதம் கட்டிய முதல் பெண்மணி ஆவார்." },
  { id: 38, section: "9.5", q: "திருப்பூர் குமரன் எந்த ஆண்டு தியாகி ஆனார்?", opts: ["1930","1931","1932","1933"], ans: 2, exp: "1932 ஜனவரி 11இல் திருப்பூரில் தேசியக் கொடியை உயர்த்திப் பிடித்தவாறே O.K.S.R. குமாரசாமி (திருப்பூர் குமரன்) இறந்தார்." },
  { id: 39, section: "9.5", q: "'கொடிகாத்த குமரன்' என்று புகழப்படுபவர் யார்?", opts: ["திருப்பூர் குமரன்","வாஞ்சிநாதன்","ஆரியா","கு. காமராஜர்"], ans: 0, exp: "O.K.S.R. குமாரசாமி, திருப்பூர் குமரன் என்றழைக்கப்படுகிறார். தேசியக் கொடியை உயர்த்திப் பிடித்தவாறே இறந்ததால் 'கொடிகாத்த குமரன்' என்று புகழப்படுகிறார்." },
  { id: 40, section: "9.5", q: "1927இல் INC சென்னை மாநாடு என்ன அறிவித்தது?", opts: ["ஒத்துழையாமை","முழுமையான சுதந்திரமே இலக்கு","உப்பு சத்தியாகிரகம்","Home Rule கோரிக்கை"], ans: 1, exp: "1927இல் INC சென்னை மாநாடு முழுமையான சுதந்திரமே தனது இலக்கு என அறிவித்தது." },
  { id: 41, section: "9.5", q: "1929 லாகூர் மாநாட்டில் தேசியக்கொடியை ஏற்றியவர் யார்?", opts: ["காந்தியடிகள்","சுபாஷ் சந்திரபோஸ்","ஜவகர்லால் நேரு","ஜவகர்லால் நேரு"], ans: 2, exp: "1930 ஜனவரி 26இல் ராவி நதியின் கரையில் ஜவகர்லால் நேரு தேசியக்கொடியை ஏற்றி சுதந்திரத்தை அறிவித்தார்." },
  { id: 42, section: "9.5", q: "இந்தி எதிர்ப்பு மாநாடு எங்கே நடத்தப்பட்டது?", opts: ["ஈரோடு","மதுரை","சேலம்","கோவை"], ans: 2, exp: "ஈ.வெ.ரா சேலத்தில் இந்தி எதிர்ப்பு மாநாடு நடத்தினார்." },
  { id: 43, section: "9.5", q: "இந்தி எதிர்ப்பு போராட்டத்தில் சிறையில் உயிரிழந்தவர்கள் யார்?", opts: ["ஆரியா மற்றும் வாஞ்சிநாதன்","தாளமுத்து மற்றும் நடராஜன்","குமரன் மற்றும் பாரதி","திருப்பூர் குமரன் மற்றும் சிவா"], ans: 1, exp: "இந்தி எதிர்ப்புப் போராட்டத்தில் தாளமுத்து மற்றும் நடராஜன் என்ற இரு போராட்டக்காரர்கள் சிறையில் மரணமடைந்தனர்." },
  { id: 44, section: "9.5", q: "1932 ஜனவரி 26இல் புனித ஜார்ஜ் கோட்டையின் உச்சியில் தேசியக்கொடியை ஏற்றியவர் யார்?", opts: ["காமராஜர்","ஆரியா (பாஷ்யம்)","S. சத்தியமூர்த்தி","ராஜாஜி"], ans: 1, exp: "1932 ஜனவரி 26இல் பரவலாக ஆரியா என அழைக்கப்பட்ட பாஷ்யம் புனித ஜார்ஜ் கோட்டையின் உச்சியில் தேசியக்கொடியை ஏற்றினார்." },
  { id: 45, section: "9.5", q: "சுப்பராயன் அமைச்சரவை எந்த ஆண்டு தேர்தலில் தொடங்கியது?", opts: ["1923","1926","1930","1937"], ans: 1, exp: "1926 சென்னை மாகாண தேர்தலில் சுயராஜ்ஜியக் கட்சி வெற்றி பெற்றாலும் ஆட்சி ஏற்கவில்லை; P. சுப்பராயனுக்கு உதவினர்." },

  // Section 9.6
  { id: 46, section: "9.6", q: "'வெள்ளையனே வெளியேறு' தீர்மானம் எந்த தேதியில் நிறைவேற்றப்பட்டது?", opts: ["1942 ஆகஸ்டு 6","1942 ஆகஸ்டு 8","1942 ஆகஸ்டு 15","1942 செப்டம்பர் 8"], ans: 1, exp: "1942 ஆகஸ்டு 8இல் வெள்ளையனே வெளியேறு தீர்மானம் நிறைவேற்றப்பட்டது." },
  { id: 47, section: "9.6", q: "Quit India இயக்கத்தில் காமராஜர் காவல்துறையிடம் இருந்து தப்புவதற்காக எங்கே ரயிலிலிருந்து இறங்கினார்?", opts: ["சென்னை","தாம்பரம்","அரக்கோணம்","வேலூர்"], ans: 2, exp: "பம்பாயிலிருந்து திரும்பிக்கொண்டிருந்த காமராஜர் காவல்துறையிடமிருந்து தப்ப அரக்கோணத்திலேயே ரயிலிலிருந்து இறங்கி தலைமறைவாகி செயல்பட்டார்." },
  { id: 48, section: "9.6", q: "காந்தியடிகளின் 'செய் அல்லது செத்துமடி' முழக்கம் எந்த இயக்கத்துடன் தொடர்புடையது?", opts: ["சுதேசி இயக்கம்","ஒத்துழையாமை இயக்கம்","வெள்ளையனே வெளியேறு இயக்கம்","சட்ட மறுப்பு இயக்கம்"], ans: 2, exp: "1942 ஆகஸ்டு 8இல் வெள்ளையனே வெளியேறு இயக்கம் தொடங்கியபோது காந்தியடிகள் 'செய் அல்லது செத்துமடி' என்ற முழக்கம் கொடுத்தார்." },
  { id: 49, section: "9.6", q: "INA என்பதன் விரிவாக்கம் என்ன?", opts: ["Indian National Alliance","Indian National Army","Indian Nationalist Association","Independent National Army"], ans: 1, exp: "INA = Indian National Army (இந்திய தேசிய இராணுவம்). நேதாஜி சுபாஷ் சந்திரபோஸ் தலைமையில் செயல்பட்டது." },
  { id: 50, section: "9.6", q: "Quit India இயக்கம் எவ்வாறு ஒடுக்கப்பட்டது?", opts: ["அரசியல் பேச்சு வார்த்தை மூலம்","வன்முறை மூலம் இரக்கமற்ற முறையில்","பட்டினி போராட்டம் மூலம்","வெளிநாட்டு அழுத்தம் மூலம்"], ans: 1, exp: "வெள்ளையனே வெளியேறு இயக்கம் இரக்கமற்ற முறையில் வன்முறை மூலம் ஒடுக்கப்பட்டது." },

  // Additional mixed questions
  { id: 51, section: "9.1", q: "MNA — சித்திரவதை ஆணையம் நிறுவப்படுவதற்கு வழிவகுத்த போராட்டம் எது?", opts: ["வரிவிலக்கு போராட்டம்","விவசாயிகள் சித்திரவதை எதிர்ப்பு போராட்டம்","குடிமைப்பணி தேர்வு போராட்டம்","கிறித்தவ மிஷனரி எதிர்ப்பு"], ans: 1, exp: "வருவாய்த்துறை அதிகாரிகளால் விவசாயிகள் சித்திரவதைப்படுத்தப்படுவதற்கு எதிராக MNA நடத்திய போராட்டம் சித்திரவதை ஆணையம் நிறுவிட வழிவகுத்தது." },
  { id: 52, section: "9.2", q: "திருநெல்வேலி கலகத்தில் காவல்நிலைய, நீதிமன்ற மற்றும் என்ன அலுவலகக் கட்டிடங்கள் தீக்கிரையாக்கப்பட்டன?", opts: ["மாவட்ட ஆட்சியர் அலுவலகம்","நகராட்சி அலுவலகம்","சட்டமன்றம்","தேர்தல் அலுவலகம்"], ans: 1, exp: "திருநெல்வேலி கலகத்தில் காவல்நிலைய, நீதிமன்ற, நகராட்சி அலுவலகக் கட்டிடங்கள் தீக்கிரையாக்கப்பட்டன." },
  { id: 53, section: "9.5", q: "வேதாரண்யம் மார்ச்சில் ராஜாஜி தலைமையில் எத்தனை தொண்டர்கள் உப்புச் சட்டத்தை மீறி உப்பை அள்ளினர்?", opts: ["6","12","24","30"], ans: 1, exp: "வேதாரண்யம் சென்றடைந்த பின்னர் ராஜாஜி தலைமையில் 12 தொண்டர்கள் உப்புச் சட்டத்தை மீறி உப்பை அள்ளினர்." },
  { id: 54, section: "9.3", q: "நீல் சிலை எங்கே இருந்தது?", opts: ["சென்னை மெரினா கடற்கரை","சென்னை மவுண்ட் ரோடு","சென்னை அண்ணா சாலை","சென்னை பூங்கா"], ans: 1, exp: "ஜேம்ஸ் நீல் சிலை சென்னை மவுண்ட் ரோட்டில் இருந்தது; 1937இல் அகற்றப்பட்டு சென்னை அருங்காட்சியகத்திற்கு கொண்டுசெல்லப்பட்டது." },
  { id: 55, section: "9.4", q: "ஜார்ஜ் ஜோசப் மதுரை மக்களால் எந்த பெயரில் அன்புடன் அழைக்கப்பட்டார்?", opts: ["வீர குமரன்","ரோசாப்பு துரை","காந்தி துரை","தேச பக்தர்"], ans: 1, exp: "ஜார்ஜ் ஜோசப் மதுரை மக்களால் 'ரோசாப்பு துரை' என்று அன்புடன் அழைக்கப்பட்டார்." },
  { id: 56, section: "9.2", q: "வ.உ.சி சிறையில் எந்த கொடூரமான நடவடிக்கைக்கு ஆளாக்கப்பட்டார்?", opts: ["வேர்வையிழுத்தல்","செக்கிழுத்தல்","கல்லடித்தல்","தண்ணீரில் முக்குதல்"], ans: 1, exp: "சிறையில் வ.உ.சி கடுமையாக நடத்தப்பட்டதோடு செக்கிழுக்க வைக்கப்பட்டார்." },
  { id: 57, section: "9.5", q: "1937 தேர்தலில் காங்கிரஸ் வெற்றிபெற்றது. நீதிக்கட்சி என்ன ஆனது?", opts: ["இரண்டாவது இடம் பெற்றது","படுதோல்வி அடைந்தது","கூட்டணி அரசாங்கம் அமைத்தது","தேர்தல் புறக்கணித்தது"], ans: 1, exp: "1937 தேர்தலில் காங்கிரஸ் வெற்றி பெற்றது; நீதிக்கட்சி படுதோல்வி அடைந்தது." },
  { id: 58, section: "9.5", q: "ஆரியா எங்கே தேசியக்கொடியை ஏற்றினார்?", opts: ["வேதாரண்யம்","திருப்பூர்","சென்னை மெரினா","புனித ஜார்ஜ் கோட்டை"], ans: 3, exp: "1932 ஜனவரி 26இல் ஆரியா புனித ஜார்ஜ் கோட்டையின் உச்சியில் தேசியக்கொடியை ஏற்றினார்." },
  { id: 59, section: "9.5", q: "இந்தி எதிர்ப்புப் போராட்டத்தில் எத்தனை போராட்டக்காரர்கள் கைது செய்யப்பட்டனர்?", opts: ["600","800","1000","1200"], ans: 3, exp: "இந்தி எதிர்ப்புப் போராட்டத்தில் பெரியார் உட்பட 1200 போராட்டக்காரர்கள் கைது செய்யப்பட்டனர்." },
  { id: 60, section: "9.2", q: "வாஞ்சிநாதன் இயக்கத்திலிருந்து தூண்டப்பட்டவர் யார்?", opts: ["அரவிந்தகோஷ்","நீலகண்ட பிரம்மச்சாரியின் பாரத மாதா சங்கம்","V.V. சுப்பிரமணியனார்","M.P.T. ஆச்சாரியா"], ans: 1, exp: "செங்கோட்டையைச் சேர்ந்த வாஞ்சிநாதன் பாரத மாதா சங்கத்தால் உள்ளுணர்வு தூண்டப்பட்டார்." },
];

// ============================================================
// DATA - PREVIOUS YEAR QUESTIONS (PYQ)
// ============================================================
const pyqData = [
  { id: 1, exam: "TNPSC", year: "2019", q: "திருநெல்வேலி மாவட்ட ஆட்சியர் ஆஷை மணியாச்சி ரயில் நிலையத்தில் சுட்டுக் கொன்றவர் யார்?", opts: ["நீலகண்ட பிரம்மச்சாரி","வாஞ்சிநாதன்","சுப்பிரமணிய சிவா","ஆரியா"], ans: 1, exp: "வாஞ்சிநாதன் (செங்கோட்டை) 1911 ஜூன் 17இல் திருநெல்வேலி மாவட்ட ஆட்சியர் ஆஷை மணியாச்சி ரயில் சந்திப்பில் சுட்டுக் கொன்றார்." },
  { id: 2, exam: "TNPSC", year: "2020", q: "சுதேசி நீராவிக் கப்பல் நிறுவனத்தை யார் தொடங்கினார்?", opts: ["சுப்பிரமணிய பாரதி","வ.உ. சிதம்பரனார்","ஈ.வெ.ரா","திரு.வி.க."], ans: 1, exp: "வ.உ. சிதம்பரனார் 1906இல் தூத்துக்குடியில் சுதேசி நீராவிக் கப்பல் நிறுவனம் தொடங்கினார்." },
  { id: 3, exam: "TNPSC", year: "2021", q: "INC மூன்றாவது மாநாட்டில் (1887, சென்னை) தலைமை வகித்தவர் யார்?", opts: ["தாதாபாய் நௌரோஜி","பத்ருதீன் தியாப்ஜி","கோகலே","W.C. பானர்ஜி"], ans: 1, exp: "1887இல் சென்னையில் (மக்கிஸ் தோட்டம்) நடந்த INC மூன்றாவது மாநாட்டில் பத்ருதீன் தியாப்ஜி தலைமை வகித்தார்." },
  { id: 4, exam: "TNPSC", year: "2022", q: "நீதிக்கட்சியின் முதல் முதலமைச்சர் யார்?", opts: ["பனகல் அரசர்","P. தியாகராயர்","A. சுப்பராயலு","C. நடேசனார்"], ans: 2, exp: "1920 தேர்தல் வெற்றிக்கு பிறகு A. சுப்பராயலு முதலாவது நீதிக்கட்சி முதலமைச்சரானார்." },
  { id: 5, exam: "TNPSC", year: "2018", q: "வேதாரண்யம் உப்பு சத்தியாகிரகத்திற்கு சிறப்புப் பாடல் இயற்றியவர் யார்?", opts: ["சுப்பிரமணிய பாரதி","பாரதிதாசன்","நாமக்கல் கவிஞர் இராமலிங்கனார்","திரு.வி.க."], ans: 2, exp: "நாமக்கல் கவிஞர் இராமலிங்கனார் வேதாரண்யம் மார்ச்சிற்கு 'கத்தியின்றி ரத்தமின்றி' என்ற பாடல் இயற்றினார்." },
  { id: 6, exam: "TNPSC", year: "2023", q: "தமிழ்நாட்டில் கிலாபத் இயக்கத்தின் முக்கிய மையம் எது?", opts: ["ஈரோடு","வேலூர்","வாணியம்பாடி","திருச்சி"], ans: 2, exp: "வாணியம்பாடி கிலாபத் எழுச்சி நடவடிக்கைகளின் முக்கிய மையமாக திகழ்ந்தது." },
  { id: 7, exam: "TNPSC", year: "2016", q: "'கொடிகாத்த குமரன்' என்று யார் அழைக்கப்படுகிறார்?", opts: ["ஆரியா","O.K.S.R. குமாரசாமி (திருப்பூர் குமரன்)","காமராஜர்","S. சத்தியமூர்த்தி"], ans: 1, exp: "1932 ஜனவரி 11இல் திருப்பூரில் தேசியக்கொடியை உயர்த்திப் பிடித்தவாறே இறந்த O.K.S.R. குமாரசாமி 'கொடிகாத்த குமரன்' என புகழப்படுகிறார்." },
  { id: 8, exam: "TNPSC", year: "2017", q: "Home Rule League எந்த ஆண்டு தொடங்கப்பட்டது? தொடங்கியவர் யார்?", opts: ["1914, திலகர்","1915, கோகலே","1916, அன்னிபெசன்ட்","1917, காந்தி"], ans: 2, exp: "அன்னிபெசன்ட் 1916இல் Home Rule League தொடங்கினார்." },
  { id: 9, exam: "TNPSC", year: "2015", q: "சென்னைவாசிகள் சங்கம் (MNA) எந்த ஆண்டு நிறுவப்பட்டது?", opts: ["1848","1852","1854","1857"], ans: 1, exp: "MNA 1852இல் கஜுலு லட்சுமிநரசு மற்றும் சீனிவாசனாரால் நிறுவப்பட்டது." },
  { id: 10, exam: "TNPSC", year: "2024", q: "ரௌலட் சட்டம் எந்த ஆண்டு இயற்றப்பட்டது?", opts: ["1917","1918","1919","1920"], ans: 2, exp: "ஆங்கில அரசு 1919இல் ரௌலட் சட்டம் (குழப்பவாத புரட்சிக் குற்றச்சட்டம்) இயற்றியது." },
  { id: 11, exam: "UPSC", year: "2018", q: "Which Tamil poet's patriotic songs played a crucial role in arousing nationalist feelings during the Swadeshi Movement?", opts: ["Thiruvalluvar","Subramania Bharati","Bharathidasan","Avvaiyar"], ans: 1, exp: "Subramania Bharati's patriotic songs (தேசபக்திப் பாடல்கள்) were very important in stirring patriotic emotions during the Swadeshi Movement in Tamil Nadu." },
  { id: 12, exam: "UPSC", year: "2019", q: "Who founded the Indian National Congress (INC) and in which year?", opts: ["Dadabhai Naoroji,1885","A.O. Hume,1885","W.C. Banerjee,1885","Surendranath Banerjee,1885"], ans: 1, exp: "A.O. Hume, a retired British civil servant, founded the Indian National Congress in 1885." },
  { id: 13, exam: "SSC", year: "2020", q: "The Rowlatt Act was passed in which year?", opts: ["1917","1918","1919","1920"], ans: 2, exp: "The Rowlatt Act (Anarchical and Revolutionary Crimes Act) was passed in 1919." },
  { id: 14, exam: "SSC", year: "2021", q: "Who gave the slogan 'Do or Die' during the Quit India Movement?", opts: ["Subhash Chandra Bose","Jawaharlal Nehru","Mahatma Gandhi","Sardar Patel"], ans: 2, exp: "Mahatma Gandhi gave the 'Do or Die' slogan during the Quit India Movement on August 8, 1942." },
  { id: 15, exam: "RRB", year: "2019", q: "The Quit India Movement was launched in which year?", opts: ["1940","1941","1942","1943"], ans: 2, exp: "The Quit India Movement (வெள்ளையனே வெளியேறு) was launched on August 8, 1942." },
  { id: 16, exam: "RRB", year: "2020", q: "Dandi March (Salt March) was undertaken by Gandhi in the year:", opts: ["1928","1929","1930","1931"], ans: 2, exp: "Gandhi's Dandi March began on March 12, 1930, and he broke the salt law at Dandi on April 6, 1930. Tamil Nadu had its own salt satyagraha at Vedaranyam led by Rajaji." },
  { id: 17, exam: "TNPSC", year: "2022", q: "சுதேசி இயக்கம் எந்த வருட நிகழ்வினால் தூண்டப்பட்டது?", opts: ["1905 வங்கப் பிரிவினை","1906 ஆஷ் கொலை","1908 திருநெல்வேலி எழுச்சி","1904 பாரத மாதா சங்கம் உருவாக்கம்"], ans: 0, exp: "1905இல் நடந்த வங்கப் பிரிவினை சுதேசி இயக்கத்திற்கு இட்டுச் சென்று விடுதலைப் போராட்டத்தின் போக்கை மாற்றியமைத்தது." },
  { id: 18, exam: "TNPSC", year: "2019", q: "பாரத மாதா சங்கம் என்ற ரகசிய அமைப்பு எந்த ஆண்டு நிறுவப்பட்டது?", opts: ["1902","1903","1904","1905"], ans: 2, exp: "1904இல் நீலகண்ட பிரம்மச்சாரி பாரத மாதா சங்கம் என்ற ரகசிய அமைப்பை உருவாக்கினார்." },
  { id: 19, exam: "BANK", year: "2021", q: "Who established the 'The Hindu' newspaper in 1878?", opts: ["Bal Gangadhar Tilak","G. Subramaniam and four friends","Annie Besant","V.O. Chidambaram Pillai"], ans: 1, exp: "G. Subramaniam, M. Veeragavachariar and their four friends established 'The Hindu' newspaper in 1878." },
  { id: 20, exam: "TNPSC", year: "2023", q: "ஒத்துழையாமை இயக்கத்தின் போது தஞ்சாவூரில் நடைபெற்ற முக்கிய இயக்கம் எது?", opts: ["கள்ளுக்கடை மறியல்","வரிகொடா இயக்கம்","உப்பு சத்தியாகிரகம்","கொள்ளை மறியல்"], ans: 1, exp: "ஒத்துழையாமை இயக்கத்தின் போது தஞ்சாவூரில் வரிகொடா இயக்கம் நடைபெற்றது." },
  { id: 21, exam: "SSC", year: "2022", q: "The first session of the Indian National Congress was held in:", opts: ["Calcutta","Bombay","Madras","Lahore"], ans: 1, exp: "The first session of INC was held in Bombay (Mumbai) in 1885. Tamil Nadu leaders played a significant role with 22 out of 72 delegates from Madras." },
  { id: 22, exam: "TNPSC", year: "2020", q: "உப்பு சட்டத்தை மீறி அபராதம் கட்டிய முதல் பெண் யார்?", opts: ["சரோஜினி நாயுடு","அன்னிபெசன்ட்","ருக்மணி லட்சுமிபதி","விஜயலட்சுமி பண்டிட்"], ans: 2, exp: "வேதாரண்யம் உப்பு சத்தியாகிரகத்தில் பங்கேற்ற திருமதி ருக்மணி லட்சுமிபதி உப்புச் சட்டங்களை மீறியதற்காக அபராதம் கட்டிய முதல் பெண்மணி ஆவார்." },
  { id: 23, exam: "RRB", year: "2021", q: "The Civil Disobedience Movement was started by Mahatma Gandhi by breaking the salt laws at:", opts: ["Vedaranyam","Dandi","Bardoli","Chauri Chaura"], ans: 1, exp: "Gandhi broke the salt laws at Dandi on April 6, 1930. Rajaji led the Tamil Nadu response at Vedaranyam." },
  { id: 24, exam: "TNPSC", year: "2017", q: "INC இரண்டாவது மாநாட்டில் (1886) தலைமை வகித்தவர் யார்?", opts: ["W.C. பானர்ஜி","தாதாபாய் நௌரோஜி","பத்ருதீன் தியாப்ஜி","கோகலே"], ans: 1, exp: "INC இரண்டாவது மாநாடு 1886இல் கொல்கத்தாவில் தாதாபாய் நௌரோஜியின் தலைமையில் நடைபெற்றது." },
  { id: 25, exam: "TNPSC", year: "2024", q: "திருப்பூர் குமரன் (O.K.S.R. குமாரசாமி) எந்த ஆண்டு தியாகி ஆனார்?", opts: ["1930 ஜனவரி 26","1932 ஜனவரி 11","1931 மார்ச் 15","1932 ஏப்ரல் 6"], ans: 1, exp: "1932 ஜனவரி 11இல் திருப்பூரில் கொடிகளை ஏந்திய ஊர்வலத்தில் திருப்பூர் குமரன் தேசியக் கொடியை உயர்த்திப் பிடித்தவாறே விழுந்து இறந்தார்." },
];

// ============================================================
// QUIZ COMPONENT
// ============================================================
function QuizSection({ questions, title, showExamFilter }) {
  const [filter, setFilter] = useState("all");
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState({});
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const [shuffled, setShuffled] = useState([]);

  useEffect(() => {
    let q = [...questions];
    if (showExamFilter && filter !== "all") {
      q = q.filter(x => x.exam === filter);
    }
    setShuffled(q);
    setCurrent(0);
    setAnswered({});
    setSelected(null);
    setFinished(false);
  }, [filter, questions]);

  const q = shuffled[current];
  if (!q) return <div className="empty-state"><div className="big">📭</div>இந்த வகையில் கேள்விகள் இல்லை.</div>;

  const score = Object.values(answered).filter(Boolean).length;
  const total = shuffled.length;
  const progress = ((current) / total) * 100;

  const handleSelect = (i) => {
    if (selected !== null) return;
    setSelected(i);
    const correct = i === q.ans;
    setAnswered(prev => ({ ...prev, [current]: correct }));
  };

  const handleNext = () => {
    if (current + 1 >= total) { setFinished(true); return; }
    setCurrent(c => c + 1);
    setSelected(null);
  };

  const handleRestart = () => {
    setCurrent(0);
    setAnswered({});
    setSelected(null);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / total) * 100);
    const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "👍" : pct >= 40 ? "📚" : "💪";
    return (
      <div className="result-page">
        <div className="result-emoji">{emoji}</div>
        <div className="result-score">{pct}%</div>
        <div className="result-label">{pct >= 80 ? "சிறப்பான முடிவு!" : pct >= 60 ? "நல்ல முயற்சி!" : "மேலும் படிக்கவும்"}</div>
        <div className="result-stats">
          <div className="result-stat">
            <div className="result-stat-value">{total}</div>
            <div className="result-stat-label">மொத்தம்</div>
          </div>
          <div className="result-stat">
            <div className="result-stat-value green">{score}</div>
            <div className="result-stat-label">சரி</div>
          </div>
          <div className="result-stat">
            <div className="result-stat-value red">{total - score}</div>
            <div className="result-stat-label">தவறு</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={handleRestart}>மீண்டும் முயற்சி</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {showExamFilter && (
        <div className="pyq-filters">
          {["all","TNPSC","UPSC","SSC","RRB","BANK"].map(f => (
            <button key={f} className={`pyq-filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
              {f === "all" ? "அனைத்தும்" : f}
            </button>
          ))}
        </div>
      )}

      <div className="quiz-header">
        <div className="quiz-info">
          <div className="quiz-badge">கேள்வி <strong>{current + 1}</strong> / {total}</div>
          <div className="quiz-badge">மதிப்பெண் <strong>{score}</strong></div>
        </div>
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="question-card">
        {q.exam && (
          <div style={{ marginBottom: 8 }}>
            <span className={`pyq-badge ${q.exam?.toLowerCase()}`}>{q.exam}</span>
            {q.year && <span className="pyq-year">{q.year}</span>}
          </div>
        )}
        <div className="question-num">கேள்வி {current + 1}</div>
        <div className="question-text">{q.q}</div>
        <div className="options-grid">
          {q.opts.map((opt, i) => {
            let cls = "option-btn";
            if (selected !== null) {
              if (i === q.ans) cls += " correct";
              else if (i === selected) cls += " selected-wrong";
            }
            return (
              <button key={i} className={cls} onClick={() => handleSelect(i)} disabled={selected !== null}>
                <span style={{ color: "var(--gold)", fontWeight: 700, marginRight: 8 }}>
                  {["அ","ஆ","இ","ஈ"][i]})
                </span>
                {opt}
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <div className="explanation-box">
            <strong style={{ color: selected === q.ans ? "var(--green)" : "var(--red)" }}>
              {selected === q.ans ? "✅ சரியான விடை!" : "❌ தவறான விடை"}
            </strong>
            <br />{q.exp}
          </div>
        )}
      </div>

      {selected !== null && (
        <div style={{ textAlign: "right" }}>
          <button className="btn btn-primary" onClick={handleNext}>
            {current + 1 >= total ? "முடிவு காண்க →" : "அடுத்து →"}
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function Chapter9() {
  const [mainTab, setMainTab] = useState("notes");
  const [subTab, setSubTab] = useState("intro");

  const mainTabs = [
    { id: "notes", label: "📖 குறிப்புகள்" },
    { id: "quiz", label: "✏️ பயிற்சி வினாக்கள்" },
    { id: "pyq", label: "🏛 முன்னைய வினாக்கள்" },
  ];

  const noteData = notesData[subTab];

  return (
    <>
      <style>{styles}</style>
      <div className="app-container">
        {/* HERO */}
        <div className="hero">
          <div className="hero-badge">10th Social Science · History</div>
          <div className="hero-title">தமிழ்நாட்டில் விடுதலைப் போராட்டம்</div>
          <div className="hero-subtitle">Freedom Struggle in Tamil Nadu</div>
          <div className="hero-meta">
            <div className="hero-meta-item">அலகு <span>9</span></div>
            <div className="hero-meta-item">வினாக்கள் <span>{quizQuestions.length}+</span></div>
            <div className="hero-meta-item">முன்னைய வினாக்கள் <span>{pyqData.length}</span></div>
          </div>
        </div>

        {/* MAIN TABS */}
        <div className="main-tabs">
          {mainTabs.map(t => (
            <button key={t.id} className={`main-tab-btn ${mainTab === t.id ? "active" : ""}`} onClick={() => setMainTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* SUB TABS for Notes */}
        {mainTab === "notes" && (
          <div className="sub-tabs-wrap">
            <div className="sub-tabs">
              {subChapters.map(s => (
                <button key={s.id} className={`sub-tab-btn ${subTab === s.id ? "active" : ""}`} onClick={() => setSubTab(s.id)}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CONTENT */}
        <div className="content">
          {mainTab === "notes" && noteData && (
            <div>
              <div className="section-title">
                <div className="icon">📜</div>
                {noteData.title}
              </div>
              {noteData.content()}
            </div>
          )}

          {mainTab === "quiz" && (
            <div>
              <div className="section-title">
                <div className="icon">✏️</div>
                பயிற்சி வினாக்கள் ({quizQuestions.length} கேள்விகள்)
              </div>
              <QuizSection questions={quizQuestions} />
            </div>
          )}

          {mainTab === "pyq" && (
            <div>
              <div className="section-title">
                <div className="icon">🏛</div>
                முன்னைய தேர்வு வினாக்கள் (TNPSC / UPSC / SSC / RRB / BANK)
              </div>
              <div style={{ marginBottom: 12, padding: "10px 14px", background: "rgba(91,141,238,0.08)", border: "1px solid rgba(91,141,238,0.2)", borderRadius: 10, fontSize: 12, color: "var(--blue)" }}>
                ℹ️ இந்த வினாக்கள் TNPSC, UPSC, SSC, RRB மற்றும் வங்கி தேர்வுகளில் கேட்கப்பட்டவை மற்றும் இத்தலைப்பு தொடர்பான வினாக்கள் ஆகும்.
              </div>
              <QuizSection questions={pyqData} showExamFilter={true} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
