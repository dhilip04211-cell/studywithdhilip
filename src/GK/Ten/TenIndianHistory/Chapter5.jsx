import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  .ch5-app {
    min-height: 100vh;
    background: #0f0a1e;
    font-family: 'DM Sans', sans-serif;
    color: #e8e0f0;
    position: relative;
    overflow-x: hidden;
  }
  
  .ch5-bg {
    position: fixed;
    inset: 0;
    background: 
      radial-gradient(ellipse at 20% 20%, rgba(120,60,200,0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(200,100,60,0.1) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(60,100,200,0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
  
  .ch5-header {
    position: relative;
    z-index: 10;
    padding: 32px 24px 0;
    text-align: center;
    border-bottom: 1px solid rgba(180,120,255,0.2);
    padding-bottom: 20px;
  }
  
  .ch5-badge {
    display: inline-block;
    background: linear-gradient(135deg, rgba(180,120,255,0.2), rgba(255,150,80,0.2));
    border: 1px solid rgba(180,120,255,0.4);
    border-radius: 50px;
    padding: 4px 16px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #c89fff;
    margin-bottom: 10px;
  }
  
  .ch5-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(22px, 5vw, 36px);
    font-weight: 900;
    background: linear-gradient(135deg, #e8d5ff, #ffb380, #c89fff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.2;
  }
  
  .ch5-subtitle {
    font-size: 13px;
    color: rgba(200,180,255,0.6);
    margin-top: 6px;
    letter-spacing: 1px;
  }
  
  .ch5-tabs {
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 16px 16px;
    position: relative;
    z-index: 10;
    flex-wrap: wrap;
  }
  
  .ch5-tab {
    padding: 10px 20px;
    border-radius: 50px;
    border: 1px solid rgba(180,120,255,0.3);
    background: rgba(180,120,255,0.05);
    color: rgba(200,180,255,0.7);
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.3s;
  }
  
  .ch5-tab:hover {
    border-color: rgba(180,120,255,0.6);
    color: #e8d5ff;
    background: rgba(180,120,255,0.1);
  }
  
  .ch5-tab.active {
    background: linear-gradient(135deg, rgba(180,120,255,0.3), rgba(255,150,80,0.2));
    border-color: rgba(180,120,255,0.7);
    color: #fff;
    box-shadow: 0 0 20px rgba(180,120,255,0.3);
  }
  
  .ch5-content {
    position: relative;
    z-index: 10;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 16px 40px;
  }
  
  /* NOTES STYLES */
  .ch5-section {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(180,120,255,0.15);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 20px;
    transition: border-color 0.3s;
  }
  
  .ch5-section:hover { border-color: rgba(180,120,255,0.3); }
  
  .ch5-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    color: #c89fff;
    margin-bottom: 14px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(180,120,255,0.2);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .ch5-section-icon { font-size: 20px; }
  
  .ch5-sub-title {
    font-size: 14px;
    font-weight: 600;
    color: #ffb380;
    margin: 14px 0 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .ch5-sub-title::before {
    content: '';
    width: 3px;
    height: 14px;
    background: #ffb380;
    border-radius: 2px;
    flex-shrink: 0;
  }
  
  .ch5-para {
    font-size: 13px;
    line-height: 1.8;
    color: rgba(220,210,240,0.85);
    margin-bottom: 10px;
  }
  
  .ch5-table-wrap { overflow-x: auto; margin: 12px 0; }
  
  .ch5-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }
  
  .ch5-table th {
    background: linear-gradient(135deg, rgba(180,120,255,0.25), rgba(255,150,80,0.15));
    color: #e8d5ff;
    padding: 10px 12px;
    text-align: left;
    font-weight: 600;
    font-size: 11px;
    letter-spacing: 0.5px;
    border-bottom: 2px solid rgba(180,120,255,0.3);
  }
  
  .ch5-table td {
    padding: 9px 12px;
    border-bottom: 1px solid rgba(180,120,255,0.1);
    color: rgba(220,210,240,0.85);
    vertical-align: top;
    line-height: 1.5;
  }
  
  .ch5-table tr:hover td { background: rgba(180,120,255,0.05); }
  
  .ch5-tag {
    display: inline-block;
    background: rgba(180,120,255,0.15);
    border: 1px solid rgba(180,120,255,0.3);
    border-radius: 4px;
    padding: 1px 7px;
    font-size: 10px;
    font-weight: 600;
    color: #c89fff;
    margin: 2px;
  }
  
  .ch5-highlight {
    background: rgba(255,150,80,0.1);
    border-left: 3px solid #ffb380;
    border-radius: 0 8px 8px 0;
    padding: 10px 14px;
    margin: 10px 0;
    font-size: 13px;
    color: rgba(255,200,150,0.9);
    line-height: 1.7;
  }
  
  /* QUIZ STYLES */
  .ch5-quiz-container { padding: 8px 0; }
  
  .ch5-quiz-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .ch5-quiz-progress {
    font-size: 12px;
    color: rgba(180,120,255,0.8);
    font-weight: 600;
  }
  
  .ch5-progress-bar {
    height: 4px;
    background: rgba(180,120,255,0.15);
    border-radius: 4px;
    margin-bottom: 20px;
    overflow: hidden;
  }
  
  .ch5-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #c89fff, #ffb380);
    border-radius: 4px;
    transition: width 0.4s ease;
  }
  
  .ch5-question-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(180,120,255,0.2);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 16px;
  }
  
  .ch5-question-num {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(180,120,255,0.6);
    margin-bottom: 8px;
  }
  
  .ch5-question-text {
    font-size: 14px;
    font-weight: 500;
    color: #e8d5ff;
    line-height: 1.6;
    margin-bottom: 16px;
  }
  
  .ch5-options { display: flex; flex-direction: column; gap: 8px; }
  
  .ch5-option {
    padding: 11px 16px;
    border-radius: 10px;
    border: 1px solid rgba(180,120,255,0.2);
    background: rgba(255,255,255,0.03);
    color: rgba(220,210,240,0.8);
    cursor: pointer;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    text-align: left;
    transition: all 0.2s;
    line-height: 1.5;
  }
  
  .ch5-option:hover:not(:disabled) {
    border-color: rgba(180,120,255,0.5);
    background: rgba(180,120,255,0.08);
    color: #e8d5ff;
  }
  
  .ch5-option.correct {
    border-color: #4ade80;
    background: rgba(74,222,128,0.1);
    color: #86efac;
  }
  
  .ch5-option.wrong {
    border-color: #f87171;
    background: rgba(248,113,113,0.1);
    color: #fca5a5;
  }
  
  .ch5-option.selected-correct {
    border-color: #4ade80;
    background: rgba(74,222,128,0.15);
    color: #86efac;
    font-weight: 600;
  }
  
  .ch5-explanation {
    margin-top: 14px;
    padding: 12px 14px;
    background: rgba(180,120,255,0.08);
    border: 1px solid rgba(180,120,255,0.2);
    border-radius: 10px;
    font-size: 12px;
    color: rgba(200,180,255,0.9);
    line-height: 1.6;
  }
  
  .ch5-explanation strong {
    color: #c89fff;
    font-weight: 600;
  }
  
  .ch5-btn {
    width: 100%;
    padding: 13px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, rgba(180,120,255,0.4), rgba(255,150,80,0.3));
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid rgba(180,120,255,0.4);
    margin-top: 12px;
  }
  
  .ch5-btn:hover {
    background: linear-gradient(135deg, rgba(180,120,255,0.6), rgba(255,150,80,0.4));
    box-shadow: 0 4px 20px rgba(180,120,255,0.3);
    transform: translateY(-1px);
  }
  
  /* GAME STYLES */
  .ch5-game-container { text-align: center; }
  
  .ch5-game-score-board {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .ch5-score-item {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(180,120,255,0.2);
    border-radius: 12px;
    padding: 12px 20px;
    text-align: center;
    min-width: 90px;
  }
  
  .ch5-score-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: rgba(180,120,255,0.6);
    margin-bottom: 4px;
  }
  
  .ch5-score-value {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 700;
    color: #c89fff;
  }
  
  .ch5-timer-ring {
    width: 80px;
    height: 80px;
    margin: 0 auto 20px;
    position: relative;
  }
  
  .ch5-timer-svg { transform: rotate(-90deg); }
  
  .ch5-timer-text {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: #c89fff;
  }
  
  .ch5-game-q {
    font-size: 15px;
    font-weight: 500;
    color: #e8d5ff;
    line-height: 1.6;
    margin-bottom: 18px;
    text-align: left;
  }
  
  .ch5-game-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 16px;
  }
  
  .ch5-game-option {
    padding: 12px;
    border-radius: 12px;
    border: 1px solid rgba(180,120,255,0.25);
    background: rgba(255,255,255,0.04);
    color: rgba(220,210,240,0.85);
    cursor: pointer;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
    line-height: 1.4;
  }
  
  .ch5-game-option:hover:not(:disabled) {
    border-color: rgba(180,120,255,0.5);
    background: rgba(180,120,255,0.1);
    transform: translateY(-2px);
  }
  
  .ch5-game-option.correct { border-color: #4ade80; background: rgba(74,222,128,0.15); color: #86efac; }
  .ch5-game-option.wrong { border-color: #f87171; background: rgba(248,113,113,0.1); color: #fca5a5; }
  
  .ch5-result-container { text-align: center; padding: 20px 0; }
  
  .ch5-result-score {
    font-family: 'Playfair Display', serif;
    font-size: 64px;
    font-weight: 900;
    background: linear-gradient(135deg, #c89fff, #ffb380);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 12px 0;
  }
  
  .ch5-result-title {
    font-size: 22px;
    font-weight: 700;
    color: #e8d5ff;
    margin-bottom: 8px;
  }
  
  .ch5-result-sub {
    font-size: 14px;
    color: rgba(200,180,255,0.6);
    margin-bottom: 24px;
  }
  
  .ch5-result-table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 12px;
    text-align: left;
  }
  
  .ch5-result-table th {
    background: rgba(180,120,255,0.2);
    color: #c89fff;
    padding: 8px 10px;
    font-weight: 600;
    border-bottom: 1px solid rgba(180,120,255,0.3);
  }
  
  .ch5-result-table td {
    padding: 8px 10px;
    border-bottom: 1px solid rgba(180,120,255,0.08);
    color: rgba(220,210,240,0.8);
    vertical-align: top;
  }
  
  .ch5-correct-badge { color: #4ade80; font-weight: 600; }
  .ch5-wrong-badge { color: #f87171; font-weight: 600; }
  
  .ch5-list { list-style: none; padding: 0; }
  .ch5-list li {
    padding: 5px 0 5px 16px;
    position: relative;
    font-size: 13px;
    color: rgba(220,210,240,0.85);
    line-height: 1.6;
  }
  .ch5-list li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: #c89fff;
    font-size: 11px;
    top: 6px;
  }
  
  .ch5-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin: 10px 0;
  }
  
  @media (max-width: 500px) {
    .ch5-grid-2 { grid-template-columns: 1fr; }
    .ch5-game-options { grid-template-columns: 1fr; }
  }
`;

const notesData = {
  sections: [
    {
      id: "intro",
      icon: "📜",
      title: "அறிமுகம் - Introduction",
      content: (
        <>
          <p className="ch5-para">
            ஆங்கிலக் கல்வி ஒரு புதிய நடுத்தர வர்க்கத்தை உருவாக்கியது. இவ்வர்க்கம் மேற்கத்திய கருத்துக்களின் தாக்கங்களுக்குள்ளானது. 19ஆம் நூற்றாண்டின் சமயம் சார்ந்த சீர்திருத்த இயக்கங்கள் இரண்டாக வகைப்படுத்தலாம்:
          </p>
          <div className="ch5-table-wrap">
            <table className="ch5-table">
              <thead>
                <tr>
                  <th>வகை</th>
                  <th>இயக்கங்கள்</th>
                  <th>தன்மை</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>சீர்திருத்த இயக்கங்கள்</td>
                  <td>பிரம்ம சமாஜம், பிரார்த்தனை சமாஜம், அலிகார் இயக்கம்</td>
                  <td>சீர்திருத்தம் சார்ந்தது</td>
                </tr>
                <tr>
                  <td>புத்தெழுச்சி / மீட்டெடுப்பு</td>
                  <td>ஆரிய சமாஜம், இராமகிருஷ்ண மிஷன், தியோபந்த் இயக்கம்</td>
                  <td>மதம் சார்ந்த மீட்டெடுப்பு</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="ch5-highlight">
            <strong>கற்றலின் நோக்கங்கள்:</strong> உடன்கட்டை ஏறுதல் (சதி), அடிமைமுறை, தீண்டாமை, குழந்தைத்திருமணம் போன்ற பழக்கங்களுக்கு எதிர்ப்பு; உருவவழிபாடு, சடங்குகள், மூடநம்பிக்கைகள் எதிர்ப்பு.
          </div>
        </>
      )
    },
    {
      id: "brahmo",
      icon: "🏛️",
      title: "5.1 வங்காளத்தில் தொடக்கக்கால சீர்திருத்த இயக்கங்கள்",
      content: (
        <>
          <p className="ch5-sub-title">அ) இராஜா ராம்மோகன் ராய் மற்றும் பிரம்ம சமாஜம்</p>
          <div className="ch5-table-wrap">
            <table className="ch5-table">
              <thead>
                <tr><th>விவரம்</th><th>தகவல்</th></tr>
              </thead>
              <tbody>
                <tr><td>காலம்</td><td>1772–1833</td></tr>
                <tr><td>பிரம்ம சமாஜம் நிறுவல்</td><td>1828 – கல்கத்தாவில்</td></tr>
                <tr><td>கோவில்</td><td>ஆகஸ்ட் 20 – திருவுருவச் சிலைகள் இல்லாத கோவில்</td></tr>
                <tr><td>சதி ஒழிப்பு</td><td>1829 – தலைமை ஆளுநர் வில்லியம் பெண்டிங்</td></tr>
                <tr><td>முக்கிய கொள்கை</td><td>ஒரு கடவுள் கோட்பாடு, உருவவழிபாடு எதிர்ப்பு</td></tr>
              </tbody>
            </table>
          </div>
          <ul className="ch5-list">
            <li>சமஸ்கிருதம், அரபி, பாரசீகம், ஆங்கிலம் மொழிகளில் புலமை</li>
            <li>விதவைகளுக்கு மறுமண உரிமை வலியுறுத்தல்</li>
            <li>பெண்களுக்கு கல்வி, பலதார மணத்திற்கு எதிர்ப்பு</li>
            <li>ஆங்கிலக் கல்வியும் மேலை நாட்டு அறிவியலும் ஆதரிப்பு</li>
          </ul>

          <p className="ch5-sub-title">ஆ) மகரிஷி தேவேந்திரநாத் தாகூர் (1817–1905)</p>
          <p className="ch5-para">கவிஞர் இரவீந்திரநாத் தாகூரின் தந்தையார். இரா.ராம்மோகன் ராய்க்குப் பிறகு பணி தொடர்ந்தார். நான்கு நம்பிக்கைக் கொள்கைகள் முன்வைத்தார்:</p>
          <div className="ch5-highlight">
            1. தொடக்கத்தில் எதுவுமில்லை, எல்லாம் வல்ல ஒரு கடவுள் மட்டுமே | 2. அவர் ஒரே உண்மையின் கடவுள் | 3. நம்முடைய வீடுபேறு அவரை நம்புவதை சார்ந்துள்ளது | 4. அவரை நேசிப்பதும் அவர் விருப்பத்தை செயல்படுத்துவதும் முக்கியம்
          </div>

          <p className="ch5-sub-title">இ) கேசவ் சந்திர சென் (1838–1884)</p>
          <div className="ch5-table-wrap">
            <table className="ch5-table">
              <thead>
                <tr><th>நிகழ்வு</th><th>ஆண்டு</th><th>விளைவு</th></tr>
              </thead>
              <tbody>
                <tr><td>பிரம்ம சமாஜத்தில் சேர்வு</td><td>1857</td><td>–</td></tr>
                <tr><td>பிளவு ஏற்பாடு</td><td>1866</td><td>'இந்திய பிரம்ம சமாஜம்' உருவாக்கம்</td></tr>
                <tr><td>தேவேந்திரநாத் அமைப்பு</td><td>1866</td><td>'ஆதி பிரம்ம சமாஜம்' என பெயர் மாற்றம்</td></tr>
                <tr><td>மேலும் பிளவு</td><td>–</td><td>'சாதாரண சமாஜ்' நிறுவல்</td></tr>
              </tbody>
            </table>
          </div>

          <p className="ch5-sub-title">ஈ) ஈஸ்வர் சந்திர வித்தியாசாகர் (1820–1891)</p>
          <ul className="ch5-list">
            <li>இந்து மறைநூல்களே முற்போக்கானவை என வாதிட்டார்</li>
            <li>1856 – விதவை மறுமண சீர்திருத்தச் சட்டம் இயற்றல்</li>
            <li>1860 – முதல் திருமண வயதுச் சட்டம் (வயது: 10)</li>
            <li>1891 – திருமண வயது 12 ஆக, 1925 – 13 ஆக உயர்வு</li>
            <li>நவீன வங்காள உரைநடையின் முன்னோடி</li>
          </ul>

          <p className="ch5-sub-title">உ) பிரார்த்தனை சமாஜம் (1867)</p>
          <div className="ch5-table-wrap">
            <table className="ch5-table">
              <thead>
                <tr><th>விவரம்</th><th>தகவல்</th></tr>
              </thead>
              <tbody>
                <tr><td>நிறுவிய இடம்</td><td>பம்பாய்</td></tr>
                <tr><td>நிறுவியவர்</td><td>ஆத்மராம் பாண்டுரங் (1825–1898)</td></tr>
                <tr><td>முக்கிய உறுப்பினர்கள்</td><td>R.C. பண்டர்கர், நீதிபதி மகாதேவ் கோவிந்த் ரானடே</td></tr>
                <tr><td>ரானடே நிறுவிய அமைப்புகள்</td><td>விதவை மறுமணச் சங்கம் (1861), புனே சர்வஜனிக் சபா (1870), தக்காணக் கல்விக்கழகம் (1884)</td></tr>
              </tbody>
            </table>
          </div>
        </>
      )
    },
    {
      id: "arya",
      icon: "🕉️",
      title: "5.2 இந்து புத்தெழுச்சி இயக்கம்",
      content: (
        <>
          <p className="ch5-sub-title">அ) ஆரிய சமாஜம் (1875)</p>
          <div className="ch5-table-wrap">
            <table className="ch5-table">
              <thead>
                <tr><th>விவரம்</th><th>தகவல்</th></tr>
              </thead>
              <tbody>
                <tr><td>நிறுவியவர்</td><td>சுவாமி தயானந்த சரஸ்வதி (1824–83)</td></tr>
                <tr><td>நிறுவிய இடம்</td><td>பஞ்சாப்</td></tr>
                <tr><td>முக்கிய நூல்</td><td>சத்யார்த்தபிரகாஷ்</td></tr>
                <tr><td>முழக்கம்</td><td>'வேதங்களுக்குத் திரும்புவோம்'</td></tr>
                <tr><td>சுத்தி சடங்கு</td><td>மதம் மாறியவர்களை மீண்டும் இந்துவாக்கும் சடங்கு</td></tr>
              </tbody>
            </table>
          </div>
          <ul className="ch5-list">
            <li>குழந்தைத் திருமணம், விதவை மறுமண மறுப்பு – மறைநூல்களால் ஏற்றுக்கொள்ளப்படவில்லை என அறிவிப்பு</li>
            <li>தயானந்தா ஆங்கில-வேதப் பள்ளிகள், கல்லூரிகள் உருவாக்கம்</li>
            <li>பிரிட்டிஷ் இந்தியாவில் மதமாற்ற நடவடிக்கைகளை நிறுத்தும் முயற்சி</li>
          </ul>

          <p className="ch5-sub-title">ஆ) இராமகிருஷ்ண பரமஹம்சர் (1836–1886)</p>
          <ul className="ch5-list">
            <li>கல்கத்தா அருகே தட்சிணேசுவரம் ஊரைச் சேர்ந்த எளிய அர்ச்சகர்</li>
            <li>அனைத்து மதங்களும் உலகளாவிய மூலக்கூறுகளைக் கொண்டுள்ளன</li>
            <li>'ஜீவன்' என்பதே 'சிவன்' – வாழும் அனைத்து உயிர்களும் இறைவன்</li>
            <li>மனிதர்களுக்குச் செய்யும் சேவையே கடவுளுக்குச் செய்யும் சேவை</li>
          </ul>

          <p className="ch5-sub-title">இராமகிருஷ்ண மிஷன் நடவடிக்கைகள்</p>
          <div className="ch5-table-wrap">
            <table className="ch5-table">
              <thead>
                <tr><th>பணி வகை</th><th>விவரம்</th></tr>
              </thead>
              <tbody>
                <tr><td>சமூகப் பணி</td><td>கல்வியறிவு, மருத்துவ உதவி, நிவாரணப் பணி</td></tr>
                <tr><td>சமயப் பணி</td><td>இராமகிருஷ்ணரின் போதனைகளை உலகில் பரப்புதல்</td></tr>
                <tr><td>நிறுவியவர்</td><td>சுவாமி விவேகானந்தர்</td></tr>
                <tr><td>முக்கிய மடம்</td><td>பேலூர் மடம்</td></tr>
              </tbody>
            </table>
          </div>

          <p className="ch5-sub-title">இ) சுவாமி விவேகானந்தர் (1863–1902)</p>
          <ul className="ch5-list">
            <li>இயற்பெயர்: நரேந்திரநாத் தத்தா</li>
            <li>1893 – சிக்காகோவில் உலக சமய மாநாட்டில் பேசினார்</li>
            <li>நடைமுறை வேதாந்தம் – மனிதகுலத்திற்குத் தொண்டுசெய்தல்</li>
            <li>பண்பாட்டுத் தேசியத்திற்கு முக்கியத்துவம்; இந்து சமூகத்திற்கு புத்துயிர்</li>
            <li>வங்கப்பிரிவினையின்போது சுதேசி இயக்க இளைஞர்களுக்கு ஊக்கம்</li>
          </ul>

          <p className="ch5-sub-title">ஈ) பிரம்மஞான சபை (Theosophical Society)</p>
          <div className="ch5-table-wrap">
            <table className="ch5-table">
              <thead>
                <tr><th>விவரம்</th><th>தகவல்</th></tr>
              </thead>
              <tbody>
                <tr><td>நிறுவியவர்கள்</td><td>மேடம் H.P. பிளாவட்ஸ்கி (1831–1891), கர்னல் H.S. ஆல்காட் (1832–1907)</td></tr>
                <tr><td>நிறுவிய இடம், ஆண்டு</td><td>அமெரிக்கா, 1875</td></tr>
                <tr><td>இந்தியாவில்</td><td>1886 – சென்னை அடையாறு</td></tr>
                <tr><td>அன்னிபெசன்ட்</td><td>1847–1933; தன்னாட்சி இயக்கச் சங்கம்; நியூ இந்தியா, காமன்வீல் பத்திரிகைகள்</td></tr>
              </tbody>
            </table>
          </div>
        </>
      )
    },
    {
      id: "caste",
      icon: "✊",
      title: "5.3 சாதி எதிர்ப்பு இயக்கங்கள்",
      content: (
        <>
          <div className="ch5-table-wrap">
            <table className="ch5-table">
              <thead>
                <tr><th>தலைவர்</th><th>காலம்</th><th>இடம்</th><th>முக்கிய பங்களிப்பு</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>ஜோதிபா புலே</strong></td>
                  <td>1827–</td>
                  <td>மகாராஷ்டிரா</td>
                  <td>1852 – ஒடுக்கப்பட்டோருக்கான முதல் பள்ளி; சத்தியசோதக் சமாஜ்; 'குலாம்கிரி' நூல்; பெற்றோரில்லா குழந்தைகளுக்கு விடுதி; விதவைகளுக்கு காப்பகம்</td>
                </tr>
                <tr>
                  <td><strong>சாவித்திரிபாய் புலே</strong></td>
                  <td>–</td>
                  <td>மகாராஷ்டிரா</td>
                  <td>ஜோதிபாவின் மனைவி; பெண்கள் மற்றும் ஒடுக்கப்பட்டோர் முன்னேற்றம்</td>
                </tr>
                <tr>
                  <td><strong>நாராயண குரு</strong></td>
                  <td>1854–1928</td>
                  <td>கேரளா</td>
                  <td>ஸ்ரீ நாராயண தர்ம பரிபாலன யோகம்; அருவிபுரம் கோவில் (அனைவருக்கும்); மலையாளம், சமஸ்கிருதம், தமிழ் அறிஞர்</td>
                </tr>
                <tr>
                  <td><strong>அய்யன்காளி</strong></td>
                  <td>1863–</td>
                  <td>திருவனந்தபுரம்</td>
                  <td>1907 – சாது ஜன பரிபாலன சங்கம்; பொது இடங்கள், கல்வி உரிமைகள் போராட்டம்</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )
    },
    {
      id: "islam",
      icon: "☪️",
      title: "5.4 இஸ்லாமிய சீர்திருத்தங்கள்",
      content: (
        <>
          <p className="ch5-sub-title">சர் சையத் அகமத்கான்</p>
          <ul className="ch5-list">
            <li>டெல்லியில் உயர்குடி முஸ்லிம் குடும்பத்தில் பிறந்தார்</li>
            <li>நவீன கல்வியறிவின்மையே இஸ்லாமியர்களுக்கு பெருந்தீங்கு என கருதினார்</li>
            <li>ஆங்கில நூல்களை உருது மொழியில் மொழியாக்கம்</li>
          </ul>
          
          <p className="ch5-sub-title">அலிகார் இயக்கம்</p>
          <div className="ch5-table-wrap">
            <table className="ch5-table">
              <thead>
                <tr><th>விவரம்</th><th>தகவல்</th></tr>
              </thead>
              <tbody>
                <tr><td>கல்லூரி நிறுவல்</td><td>1875 – அலிகார் முகமதிய ஆங்கிலோ-ஓரியண்டல் கல்லூரி</td></tr>
                <tr><td>பல்கலைக்கழகமாக</td><td>1920</td></tr>
                <tr><td>முக்கியத்துவம்</td><td>இந்திய முஸ்லிம்களின் கல்வி வரலாற்றில் மைல்கல்</td></tr>
              </tbody>
            </table>
          </div>
          
          <p className="ch5-sub-title">தியோபந்த் இயக்கம் (1866)</p>
          <ul className="ch5-list">
            <li>பழமைவாத முஸ்லிம் உலேமாக்களால் தொடங்கப்பட்டது</li>
            <li>முகமது குவாசிம் நானோதவி, ரஷித் அகமத் கங்கோத்ரி தலைமை</li>
            <li>சகரன்பூரில் (உ.பி.) பள்ளி நிறுவல் – ஆங்கிலக் கல்வி புறக்கணிப்பு</li>
            <li>இஸ்லாமிய சமூகத்தின் ஒழுக்கம், மதம் மீட்டெடுப்பு நோக்கம்</li>
          </ul>
        </>
      )
    },
    {
      id: "parsi",
      icon: "🔥",
      title: "5.5–5.6 பார்சி மற்றும் சீக்கியர் சீர்திருத்தங்கள்",
      content: (
        <>
          <p className="ch5-sub-title">பார்சி சீர்திருத்த இயக்கம் (1851)</p>
          <div className="ch5-table-wrap">
            <table className="ch5-table">
              <thead>
                <tr><th>விவரம்</th><th>தகவல்</th></tr>
              </thead>
              <tbody>
                <tr><td>நிறுவியவர்</td><td>பர்துன்ஜி நௌரோஜி</td></tr>
                <tr><td>அமைப்பு பெயர்</td><td>ரஹ்னுமாய் மஜ்தயாஸ்னன் சபா (பார்சிகளின் சீர்திருத்தச் சங்கம்)</td></tr>
                <tr><td>தாரக மந்திரம்</td><td>ராஸ்ட் கோப்தார் (உண்மை விளம்பி)</td></tr>
                <tr><td>முக்கிய தலைவர்கள்</td><td>பெரோசா மேத்தா, தீன்சா வாச்சா – தொடக்ககால காங்கிரஸ் முக்கிய பங்கு</td></tr>
              </tbody>
            </table>
          </div>

          <p className="ch5-sub-title">சீக்கியர் சீர்திருத்த இயக்கம்</p>
          <div className="ch5-table-wrap">
            <table className="ch5-table">
              <thead>
                <tr><th>இயக்கம்</th><th>நிறுவியவர்</th><th>முக்கிய கோட்பாடுகள்</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>நிரங்காரி இயக்கம்</td>
                  <td>பாபா தயாள்தாஸ்</td>
                  <td>நிரங்காரி (உருவமற்ற) இறைவன்; சிலைவழிபாடு மறுப்பு; குருநானக் மதிப்பு</td>
                </tr>
                <tr>
                  <td>நாம்தாரி இயக்கம்</td>
                  <td>பாபாராம் சிங்</td>
                  <td>ஆண்-பெண் சமம்; விதவை மறுமணம் ஆதரவு; வரதட்சணை, குழந்தைத் திருமணம் தடை</td>
                </tr>
                <tr>
                  <td>சிங்சபா</td>
                  <td>–</td>
                  <td>அமிர்தசரசில் நிறுவல்; சீக்கிய மதத்தின் புனிதம் மீட்டெடுப்பு; அகாலி இயக்கத்தின் முன்னோடி</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )
    },
    {
      id: "tamil",
      icon: "🌺",
      title: "5.7 தமிழ்நாட்டின் சமூக சீர்திருத்தவாதிகள்",
      content: (
        <>
          <div className="ch5-table-wrap">
            <table className="ch5-table">
              <thead>
                <tr><th>தலைவர்</th><th>காலம்</th><th>பிறப்பிடம்</th><th>முக்கிய பங்களிப்பு</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>இராமலிங்க சுவாமிகள்</strong> (வள்ளலார்)</td>
                  <td>1823–1874</td>
                  <td>சிதம்பரம் அருகே மருதூர்</td>
                  <td>ஜீவகாருண்யம்; 1865 – சமரச வேத சன்மார்க்க சங்கம்; 1867 – வடலூரில் இலவச உணவகம்; திருவருட்பா பாடல்கள்</td>
                </tr>
                <tr>
                  <td><strong>அயோத்தி தாசர்</strong></td>
                  <td>1845–1914</td>
                  <td>சென்னை</td>
                  <td>1882 – திராவிட கழகம்; 1885 – திராவிட பாண்டியன் இதழ்; 1891 – திராவிட மகாஜனசபை; 1898 – சாக்கிய பௌத்த சங்கம்; 1907 – 'ஒரு பைசாத் தமிழன்' பத்திரிகை</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="ch5-highlight">
            <strong>இராமலிங்க அடிகளின் சீர்திருத்தங்கள்:</strong> சாதி எல்லைகளை தாண்டி அனைத்து மக்களுக்கும் உணவு; ஜீவகாருண்யம் – அனைத்து உயிரினங்களிடமும் அன்பு; 1866 தென்னிந்திய பஞ்சத்தில் உணவகம் திறப்பு.
          </div>
          <div className="ch5-highlight">
            <strong>அயோத்தி தாசரின் சிறப்பு:</strong> தமிழ், ஆங்கிலம், சமஸ்கிருதம், பாலி மொழிகளில் புலமை; ஒடுக்கப்பட்டோருக்கான பல பள்ளிகள்; கோவில் நுழைவு ஆதரவு.
          </div>
        </>
      )
    }
  ]
};

const allQuestions = [
  { q: "இராஜா ராம்மோகன் ராய் பிரம்ம சமாஜத்தை நிறுவிய ஆண்டு?", opts: ["1826","1828","1830","1832"], ans: 1, exp: "இராஜா ராம்மோகன் ராய் 1828இல் பிரம்ம சமாஜத்தை நிறுவினார். ஆகஸ்ட் 20 அன்று கல்கத்தாவில் ஒரு கோவிலை நிறுவினார்." },
  { q: "சதி எனும் உடன்கட்டை ஏறும் பழக்கம் எந்த ஆண்டு ஒழிக்கப்பட்டது?", opts: ["1827","1829","1826","1927"], ans: 1, exp: "1829இல் தலைமை ஆளுநர் வில்லியம் பெண்டிங் 'சதி' எனும் உடன்கட்டையேறும் பழக்கத்தை ஒழித்துச் சட்டம் இயற்றினார். இராஜா ராம்மோகன் ராய் முக்கிய பங்கு வகித்தார்." },
  { q: "தயானந்த சரஸ்வதியால் நிறுவப்பெற்ற சமாஜத்தின் பெயர்?", opts: ["பிரம்ம சமாஜம்","ஆரிய சமாஜம்","பிரார்த்தனை சமாஜம்","ஆதி பிரம்ம சமாஜம்"], ans: 1, exp: "ஆரியசமாஜம் 1875இல் சுவாமி தயானந்த சரஸ்வதியால் பஞ்சாபில் நிறுவப்பட்டது. இதன் முழக்கம் 'வேதங்களுக்குத் திரும்புவோம்'." },
  { q: "யாருடைய பணியும் இயக்கமும் 1856ஆம் ஆண்டு விதவை மறுமண சீர்திருத்தச் சட்டம் இயற்றப்படுவதற்கு வழிகோலியது?", opts: ["ஈஸ்வர் சந்திர வித்தியாசாகர்","இராஜா ராம்மோகன் ராய்","அன்னிபெசன்ட்","ஜோதிபா புலே"], ans: 0, exp: "பண்டித ஈஸ்வர் சந்திர வித்தியாசாகர் தலைமையேற்ற இயக்கத்தின் விளைவாய் 1856இல் மறுமண சீர்திருத்தச் சட்டம் இயற்றப்பட்டது." },
  { q: "'ராஸ்ட் கோப்தார்' யாருடைய முழக்கம்?", opts: ["பார்சி இயக்கம்","அலிகார் இயக்கம்","இராமகிருஷ்ணர்","திராவிட மகாஜன சபை"], ans: 0, exp: "1851இல் பர்துன்ஜி நௌரோஜி 'ரஹ்னுமாய் மஜ்தயாஸ்னன் சபா' எனும் பார்சி சீர்திருத்தச் சங்கத்தை நிறுவினார். ராஸ்ட் கோப்தார் (உண்மை விளம்பி) என்பதே அதன் தாரக மந்திரம்." },
  { q: "நாம்தாரி இயக்கத்தை உருவாக்கியவர் யார்?", opts: ["பாபா தயாள் தாஸ்","பாபா ராம்சிங்","குருநானக்","ஜோதிபா புலே"], ans: 1, exp: "பாபாராம் சிங் என்பவரால் தொடங்கப்பெற்ற நாம்தாரி இயக்கம் சீக்கியரிடையே நடைபெற்ற மற்றுமொரு சமூக, சமயச் சீர்திருத்த இயக்கமாகும்." },
  { q: "விதவை மறுமணச் சங்கத்தை ஏற்படுத்தியவர் யார்?", opts: ["மகாதேவ் கோவிந்த் ரானடே","தேவேந்திரநாத் தாகூர்","ஜோதிபா புலே","அய்யன்காளி"], ans: 0, exp: "மகாதேவ் கோவிந்த் ரானடே (1842-1901) விதவை மறுமணச் சங்கம் (1861), புனே சர்வஜனிக் சபா (1870), தக்காணக் கல்விக்கழகம் (1884) நிறுவினார்." },
  { q: "'சத்யார்த்தபிரகாஷ்' எனும் நூலின் ஆசிரியர் யார்?", opts: ["தயானந்த சரஸ்வதி","அயோத்தி தாசர்","அன்னிபெசன்ட்","நாராயண குரு"], ans: 0, exp: "சுவாமி தயானந்த சரஸ்வதியின் நூலான 'சத்யார்த்தபிரகாஷ்' பெரும்பாலோரால் படிக்கப்பட்டது. அவர் ஆரிய சமாஜம் நிறுவியவர்." },
  { q: "பிரம்மஞான சபை 1875இல் எங்கு நிறுவப்பட்டது?", opts: ["இந்தியா","இங்கிலாந்து","அமெரிக்கா","ஆஸ்திரேலியா"], ans: 2, exp: "மேடம் H.P. பிளாவட்ஸ்கி மற்றும் கர்னல் H.S. ஆல்காட் ஆகியோரால் பிரம்மஞானசபை 1875இல் அமெரிக்காவில் நிறுவப்பட்டது. பின்னர் 1886இல் சென்னை அடையாறுக்கு மாற்றப்பட்டது." },
  { q: "கேசவ் சந்திர சென் பிரம்ம சமாஜத்தில் எந்த ஆண்டு இணைந்தார்?", opts: ["1855","1857","1860","1866"], ans: 1, exp: "கேசவ் சந்திர சென் 1857இல் பிரம்ம சமாஜத்தில் இணைந்தார். 1866இல் பிளவு ஏற்பட்டதால் 'இந்திய பிரம்ம சமாஜத்தை' உருவாக்கினார்." },
  { q: "ஜோதிபா புலே ஒடுக்கப்பட்டோருக்கான முதல் பள்ளியை எங்கு திறந்தார்?", opts: ["மும்பை","புனே","நாக்பூர்","தில்லி"], ans: 1, exp: "ஜோதிபா கோவிந்தராவ் புலே 1852ஆம் ஆண்டு ஒடுக்கப்பட்டோருக்கான முதல் பள்ளியை புனேயில் திறந்தார்." },
  { q: "சமரச வேத சன்மார்க்க சங்கத்தை நிறுவியவர்?", opts: ["அயோத்தி தாசர்","இராமலிங்க அடிகள்","நாராயண குரு","அய்யன்காளி"], ans: 1, exp: "இராமலிங்க சுவாமிகள் (வள்ளலார்) 1865இல் சமரச வேத சன்மார்க்க சங்கத்தை நிறுவினார். பின்னர் அது சமரசசுத்த சன்மார்க்க சத்ய சங்கம் எனப் பெயர் மாற்றம் செய்யப்பட்டது." },
  { q: "புனே சர்வஜனிக் சபாவை நிறுவியவர்?", opts: ["ஆத்மராம் பாண்டுரங்","மகாதேவ் கோவிந்த் ரானடே","கேசவ் சந்திர சென்","தயானந்த சரஸ்வதி"], ans: 1, exp: "மகாதேவ் கோவிந்த் ரானடே 1870இல் புனே சர்வஜனிக் சபாவை நிறுவினார். அவர் பிரார்த்தனை சமாஜத்தின் முக்கிய உறுப்பினர்." },
  { q: "குலாம்கிரி (அடிமைத்தனம்) நூலை எழுதியவர்?", opts: ["அயோத்தி தாசர்","நாராயண குரு","ஜோதிபா புலே","இராமலிங்க அடிகள்"], ans: 2, exp: "ஜோதிபா புலே எழுதிய நூலான 'குலாம்கிரி' (அடிமைத்தனம்) அவருடைய பெரும்பாலான தீவிரக் கருத்துக்களைச் சுருக்கிக் கூறுகிறது." },
  { q: "இராமகிருஷ்ண மிஷன் எந்த ஆண்டு இயற்கை எய்திய பிறகு உருவானது?", opts: ["1884","1886","1888","1890"], ans: 1, exp: "1886இல் இராமகிருஷ்ணர் இயற்கை எய்திய பின்னர் அவருடைய சீடர்கள் இராமகிருஷ்ண மிஷனை நிறுவினர். சுவாமி விவேகானந்தர் இம்மிஷனை நிறுவினார்." },
  { q: "நாராயண குருவின் காலம்?", opts: ["1824-1883","1836-1886","1854-1928","1863-1902"], ans: 2, exp: "கேரளாவில் ஏழைப்பெற்றோர்க்கு மகனாகப் பிறந்த நாராயண குரு (1854-1928) ஸ்ரீ நாராயண தர்ம பரிபாலன யோகம் உருவாக்கினார்." },
  { q: "அய்யன்காளி எந்த ஆண்டு சாது ஜன பரிபாலன சங்கம் நிறுவினார்?", opts: ["1903","1905","1907","1909"], ans: 2, exp: "ஸ்ரீ நாராயணகுருவால் ஊக்கம்பெற்ற அய்யன்காளி 1907இல் சாது ஜன பரிபாலன சங்கம் (ஏழை மக்கள் பாதுகாப்புச் சங்கம்) நிறுவினார்." },
  { q: "அலிகார் முகமதிய ஆங்கிலோ-ஓரியண்டல் கல்லூரி எந்த ஆண்டு நிறுவப்பட்டது?", opts: ["1870","1875","1880","1885"], ans: 1, exp: "சர் சையத் அகமத்கான் 1875ஆம் ஆண்டு அலிகார் நகரில் அலிகார் முகமதிய ஆங்கிலோ-ஓரியண்டல் கல்லூரியை நிறுவினார். 1920இல் பல்கலைக்கழகமானது." },
  { q: "தியோபந்த் இயக்கம் எந்த ஆண்டு தொடங்கப்பட்டது?", opts: ["1856","1862","1866","1870"], ans: 2, exp: "தியோபந்த் இயக்கம் 1866இல் உத்தரப்பிரதேசத்தில் சகரன்பூரில் ஒரு பள்ளியை நிறுவியதன் மூலம் தொடங்கப்பட்டது." },
  { q: "விவேகானந்தர் எந்த நகரில் நடந்த உலக சமய மாநாட்டில் பங்கேற்றார்?", opts: ["நியூயார்க்","வாஷிங்டன்","சிக்காகோ","லண்டன்"], ans: 2, exp: "1893இல் சிக்காகோவில் நடைபெற்ற உலக சமய மாநாட்டில் இந்து சமயம் பற்றியும் பக்திமார்க்க தத்துவம் குறித்தும் விவேகானந்தர் சொற்பொழிவாற்றினார்." },
  { q: "பிரார்த்தனை சமாஜம் எந்த ஆண்டு நிறுவப்பட்டது?", opts: ["1857","1860","1865","1867"], ans: 3, exp: "பிரம்ம சமாஜத்துக்கிணையாக பம்பாயில் 1867இல் நிறுவப்பட்ட அமைப்பே பிரார்த்தனை சமாஜம். நிறுவியவர் ஆத்மராம் பாண்டுரங்." },
  { q: "'ஒரு பைசாத் தமிழன்' பத்திரிகை தொடங்கியவர்?", opts: ["இராமலிங்க அடிகள்","நாராயண குரு","அயோத்தி தாசர்","அய்யன்காளி"], ans: 2, exp: "1907இல் பண்டிதர் அயோத்தி தாசர் 'ஒரு பைசாத் தமிழன்' என்ற பெயரில் ஒரு வாராந்திரப் பத்திரிகையைத் தொடங்கினார்." },
  { q: "அகாலி இயக்கத்தின் முன்னோடி அமைப்பு எது?", opts: ["நிரங்காரி","நாம்தாரி","சிங்சபா","கால்சா கல்லூரி"], ans: 2, exp: "சிங்சபாவே அகாலி இயக்கத்தின் முன்னோடி அமைப்பாகும். அமிர்தசரசில் நிறுவப்பட்ட இச்சபா சீக்கிய மதத்தின் புனிதம் மீட்டெடுப்பை குறிக்கோளாகக் கொண்டது." },
  { q: "இராமலிங்க அடிகள் வடலூரில் இலவச உணவகம் எந்த ஆண்டு நிறுவினார்?", opts: ["1865","1866","1867","1868"], ans: 2, exp: "1866இல் தென்னிந்தியாவில் ஏற்பட்ட கொடிய பஞ்சத்தைக் கணக்கில் கொண்டு 1867இல் சாதி எல்லைகளைத் தாண்டி அனைத்து மக்களுக்குமான இலவச உணவகத்தை வடலூரில் நிறுவினார்." },
  { q: "மகரிஷி தேவேந்திரநாத் தாகூர் முன்வைத்த நம்பிக்கையின் கூறுகள் எத்தனை?", opts: ["2","3","4","5"], ans: 2, exp: "தேவேந்திரநாத் தாகூர் நம்பிக்கை பற்றிய நான்கு கொள்கைக்கூறுகளை முன்வைத்தார்: 1. ஒரே கடவுள், 2. அவர் உண்மையின் கடவுள், 3. வீடுபேறு அவரை சார்ந்தது, 4. அவரை நேசிப்பதும் சேவை செய்வதும்." },
  { q: "1860இல் முதன்முறையாக இயற்றப்பட்ட திருமண வயதுச் சட்டம் எந்த வயதை நிர்ணயித்தது?", opts: ["8","10","12","14"], ans: 1, exp: "1860இல் முதன்முறையாக திருமண வயதுச் சட்டம் இயற்றப்பட்டது. திருமணத்திற்கான வயது பத்து என்று நிர்ணயம் செய்யப்பட்டது. அப்பெருமை ஈஸ்வர் சந்திர வித்தியாசாகரையே சாரும்." },
  { q: "அயோத்தி தாசர் 1898இல் எங்கு சென்று பௌத்தம் தழுவினார்?", opts: ["மியான்மர்","சீனா","இலங்கை","நேபாளம்"], ans: 2, exp: "கர்னல் H.S. ஆல்காட் ஏற்படுத்திய தாக்கத்தின் விளைவாக 1898இல் இலங்கை சென்ற அயோத்தி தாசர் அங்கே பௌத்தத்தை தழுவினார்." },
  { q: "சத்தியசோதக் சமாஜ் நிறுவியவர்?", opts: ["நாராயண குரு","அய்யன்காளி","ஜோதிபா புலே","அயோத்தி தாசர்"], ans: 2, exp: "ஜோதிபா புலே சத்தியசோதக் சமாஜ் (உண்மையை நாடுவோர் சங்கம் - Truth Seekers Society) என்னும் அமைப்பை நிறுவினார். பிராமணரல்லாத மக்கள் சுயமரியாதையோடு வாழ தூண்டுவதற்காக நிறுவினார்." },
  { q: "பிரம்ம சமாஜம் தோல்வியடைந்தது எதனால்?", opts: ["பண பற்றாக்குறை","கீழ்த்தட்டு மக்களை ஈர்க்கத் தோல்வி","அரசு தடை","தலைவர் இறப்பு"], ans: 1, exp: "சமூகத்தின் கீழ்த்தட்டு மக்களைத் தன்பால் ஈர்ப்பதில் சமாஜம் தோல்வியடைந்தாலும், நவீன வங்காளப் பண்பாட்டு மற்றும் நடுத்தர வர்க்கத்தின் மீதான தாக்கம் மிகவும் போற்றுதலுக்குரியது." }
];

const GAME_TIME = 15;

export default function Chapter5() {
  const [tab, setTab] = useState("notes");
  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState([]);

  const [gameIdx, setGameIdx] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [gameTimer, setGameTimer] = useState(GAME_TIME);
  const [gameSelected, setGameSelected] = useState(null);
  const [gameDone, setGameDone] = useState(false);
  const [gameAnswers, setGameAnswers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [streak, setStreak] = useState(0);

  const shuffled = allQuestions.slice(0, 30);
  const gameQ = allQuestions.slice(0, 20);

  useEffect(() => {
    if (tab !== "game" || !gameStarted || gameDone || gameSelected !== null) return;
    if (gameTimer <= 0) {
      handleGameSelect(-1);
      return;
    }
    const t = setTimeout(() => setGameTimer(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [tab, gameStarted, gameDone, gameSelected, gameTimer, gameIdx]);

  const handleQuizSelect = (i) => {
    if (selected !== null) return;
    setSelected(i);
    setShowExp(true);
    const correct = i === shuffled[quizIdx].ans;
    if (correct) setQuizScore(s => s + 1);
    setQuizAnswers(prev => [...prev, { q: shuffled[quizIdx].q, correct, userAns: shuffled[quizIdx].opts[i], correctAns: shuffled[quizIdx].opts[shuffled[quizIdx].ans] }]);
  };

  const nextQuiz = () => {
    if (quizIdx + 1 >= shuffled.length) { setQuizDone(true); return; }
    setQuizIdx(i => i + 1);
    setSelected(null);
    setShowExp(false);
  };

  const resetQuiz = () => { setQuizIdx(0); setSelected(null); setShowExp(false); setQuizScore(0); setQuizDone(false); setQuizAnswers([]); };

  const handleGameSelect = (i) => {
    if (gameSelected !== null) return;
    setGameSelected(i);
    const correct = i === gameQ[gameIdx].ans;
    if (correct) { setGameScore(s => s + 10 + Math.floor(gameTimer * 2)); setStreak(s => s + 1); }
    else setStreak(0);
    setGameAnswers(prev => [...prev, { q: gameQ[gameIdx].q, correct, userAns: i >= 0 ? gameQ[gameIdx].opts[i] : "⏰ Time Up", correctAns: gameQ[gameIdx].opts[gameQ[gameIdx].ans] }]);
    setTimeout(() => {
      if (gameIdx + 1 >= gameQ.length) { setGameDone(true); return; }
      setGameIdx(p => p + 1);
      setGameSelected(null);
      setGameTimer(GAME_TIME);
    }, 1200);
  };

  const resetGame = () => { setGameIdx(0); setGameScore(0); setGameTimer(GAME_TIME); setGameSelected(null); setGameDone(false); setGameAnswers([]); setGameStarted(false); setStreak(0); };

  const timerPct = gameTimer / GAME_TIME;
  const r = 32;
  const circ = 2 * Math.PI * r;

  return (
    <>
      <style>{styles}</style>
      <div className="ch5-app">
        <div className="ch5-bg" />
        <div className="ch5-header">
          <div className="ch5-badge">TNPSC · Class 10 · History</div>
          <h1 className="ch5-title">அலகு 5 – 19ஆம் நூற்றாண்டில் சமூக, சமய சீர்திருத்த இயக்கங்கள்</h1>
          <p className="ch5-subtitle">Unit 5 · Social & Religious Reform Movements</p>
        </div>
        <div className="ch5-tabs">
          {["notes","quiz","game"].map(t => (
            <button key={t} className={`ch5-tab ${tab===t?"active":""}`} onClick={() => setTab(t)}>
              {t==="notes"?"📖 Notes":t==="quiz"?"✏️ Quiz":"🎮 Quiz Game"}
            </button>
          ))}
        </div>
        <div className="ch5-content">

          {tab === "notes" && (
            <div>
              {notesData.sections.map(sec => (
                <div key={sec.id} className="ch5-section">
                  <div className="ch5-section-title">
                    <span className="ch5-section-icon">{sec.icon}</span>
                    {sec.title}
                  </div>
                  {sec.content}
                </div>
              ))}
            </div>
          )}

          {tab === "quiz" && !quizDone && (
            <div className="ch5-quiz-container">
              <div className="ch5-quiz-header">
                <span className="ch5-quiz-progress">கேள்வி {quizIdx + 1} / {shuffled.length}</span>
                <span className="ch5-quiz-progress">மதிப்பெண்: {quizScore}</span>
              </div>
              <div className="ch5-progress-bar">
                <div className="ch5-progress-fill" style={{ width: `${((quizIdx)/shuffled.length)*100}%` }} />
              </div>
              <div className="ch5-question-card">
                <div className="ch5-question-num">Question {quizIdx + 1}</div>
                <div className="ch5-question-text">{shuffled[quizIdx].q}</div>
                <div className="ch5-options">
                  {shuffled[quizIdx].opts.map((opt, i) => (
                    <button key={i} className={`ch5-option ${selected !== null ? (i === shuffled[quizIdx].ans ? "correct" : i === selected ? "wrong" : "") : ""}`} onClick={() => handleQuizSelect(i)} disabled={selected !== null}>
                      <span style={{ marginRight: 8, fontWeight: 700, opacity: 0.5 }}>{String.fromCharCode(65+i)}.</span>{opt}
                    </button>
                  ))}
                </div>
                {showExp && (
                  <div className="ch5-explanation">
                    <strong>{selected === shuffled[quizIdx].ans ? "✅ சரி!" : "❌ தவறு!"}</strong><br />
                    {shuffled[quizIdx].exp}
                  </div>
                )}
              </div>
              {selected !== null && (
                <button className="ch5-btn" onClick={nextQuiz}>
                  {quizIdx + 1 < shuffled.length ? "அடுத்த கேள்வி →" : "முடிவுகள் →"}
                </button>
              )}
            </div>
          )}

          {tab === "quiz" && quizDone && (
            <div className="ch5-result-container">
              <div className="ch5-result-title">Quiz முடிந்தது! 🎉</div>
              <div className="ch5-result-score">{quizScore}/{shuffled.length}</div>
              <div className="ch5-result-sub">
                {quizScore >= shuffled.length * 0.8 ? "மிகச் சிறப்பாக செய்தீர்கள்! 🌟" : quizScore >= shuffled.length * 0.5 ? "நல்ல முயற்சி! 👍" : "மீண்டும் முயற்சி செய்யுங்கள்! 💪"}
              </div>
              <table className="ch5-result-table">
                <thead><tr><th>#</th><th>கேள்வி</th><th>உங்கள் பதில்</th><th>சரியான பதில்</th><th>நிலை</th></tr></thead>
                <tbody>
                  {quizAnswers.map((a, i) => (
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td style={{ maxWidth: 200 }}>{a.q}</td>
                      <td>{a.userAns}</td>
                      <td>{a.correctAns}</td>
                      <td>{a.correct ? <span className="ch5-correct-badge">✅</span> : <span className="ch5-wrong-badge">❌</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="ch5-btn" onClick={resetQuiz}>மீண்டும் தொடங்கு 🔄</button>
            </div>
          )}

          {tab === "game" && !gameStarted && (
            <div className="ch5-game-container">
              <div className="ch5-question-card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🎮</div>
                <div className="ch5-result-title">Quiz Game</div>
                <div className="ch5-result-sub" style={{ marginBottom: 20 }}>
                  20 கேள்விகள் · {GAME_TIME} வினாடி நேர வரம்பு · விரைவான பதிலுக்கு அதிக மதிப்பெண்
                </div>
                <button className="ch5-btn" onClick={() => setGameStarted(true)}>விளையாட்டு தொடங்கு 🚀</button>
              </div>
            </div>
          )}

          {tab === "game" && gameStarted && !gameDone && (
            <div>
              <div className="ch5-game-score-board">
                <div className="ch5-score-item"><div className="ch5-score-label">மதிப்பெண்</div><div className="ch5-score-value">{gameScore}</div></div>
                <div className="ch5-score-item"><div className="ch5-score-label">கேள்வி</div><div className="ch5-score-value">{gameIdx+1}/{gameQ.length}</div></div>
                <div className="ch5-score-item"><div className="ch5-score-label">தொடர்</div><div className="ch5-score-value">{streak}🔥</div></div>
              </div>
              <div className="ch5-timer-ring">
                <svg className="ch5-timer-svg" width="80" height="80">
                  <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(180,120,255,0.15)" strokeWidth="6"/>
                  <circle cx="40" cy="40" r={r} fill="none" stroke={gameTimer <= 5 ? "#f87171" : "#c89fff"} strokeWidth="6" strokeDasharray={circ} strokeDashoffset={circ * (1 - timerPct)} strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s linear" }}/>
                </svg>
                <div className="ch5-timer-text" style={{ color: gameTimer <= 5 ? "#f87171" : "#c89fff" }}>{gameTimer}</div>
              </div>
              <div className="ch5-question-card">
                <div className="ch5-question-num">Question {gameIdx + 1}</div>
                <div className="ch5-game-q">{gameQ[gameIdx].q}</div>
                <div className="ch5-game-options">
                  {gameQ[gameIdx].opts.map((opt, i) => (
                    <button key={i} className={`ch5-game-option ${gameSelected !== null ? (i === gameQ[gameIdx].ans ? "correct" : i === gameSelected ? "wrong" : "") : ""}`} onClick={() => handleGameSelect(i)} disabled={gameSelected !== null}>
                      <span style={{ fontWeight: 700, opacity: 0.6, marginRight: 4 }}>{String.fromCharCode(65+i)}.</span>{opt}
                    </button>
                  ))}
                </div>
                {gameSelected !== null && (
                  <div className="ch5-explanation">{gameSelected === gameQ[gameIdx].ans ? "✅ சரி!" : "❌"} {gameQ[gameIdx].exp}</div>
                )}
              </div>
            </div>
          )}

          {tab === "game" && gameDone && (
            <div className="ch5-result-container">
              <div className="ch5-result-title">விளையாட்டு முடிந்தது! 🏆</div>
              <div className="ch5-result-score">{gameScore}</div>
              <div className="ch5-result-sub">மொத்த மதிப்பெண்கள் · {gameAnswers.filter(a=>a.correct).length}/{gameQ.length} சரியான பதில்கள்</div>
              <table className="ch5-result-table">
                <thead><tr><th>#</th><th>கேள்வி</th><th>நிலை</th><th>சரியான பதில்</th></tr></thead>
                <tbody>
                  {gameAnswers.map((a, i) => (
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td style={{ maxWidth: 220, fontSize: 11 }}>{a.q}</td>
                      <td>{a.correct ? <span className="ch5-correct-badge">✅</span> : <span className="ch5-wrong-badge">❌</span>}</td>
                      <td style={{ fontSize: 11 }}>{a.correctAns}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="ch5-btn" onClick={resetGame}>மீண்டும் விளையாடு 🔄</button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
