import { useState, useEffect } from "react";

const styles7 = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  .ch7-app {
    min-height: 100vh;
    background: #0a1628;
    font-family: 'Sora', sans-serif;
    color: #dce8ff;
    position: relative;
    overflow-x: hidden;
  }
  
  .ch7-bg {
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse at 15% 30%, rgba(30,100,220,0.12) 0%, transparent 50%),
      radial-gradient(ellipse at 85% 70%, rgba(220,60,60,0.1) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 10%, rgba(255,180,0,0.06) 0%, transparent 40%);
    pointer-events: none;
    z-index: 0;
  }
  
  .ch7-header {
    position: relative;
    z-index: 10;
    padding: 30px 20px 18px;
    text-align: center;
    border-bottom: 1px solid rgba(60,130,255,0.2);
  }
  
  .ch7-badge {
    display: inline-block;
    background: linear-gradient(135deg, rgba(60,130,255,0.2), rgba(220,60,60,0.15));
    border: 1px solid rgba(60,130,255,0.35);
    border-radius: 50px;
    padding: 4px 16px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #7eb5ff;
    margin-bottom: 10px;
  }
  
  .ch7-title {
    font-family: 'Sora', sans-serif;
    font-size: clamp(18px, 4.5vw, 32px);
    font-weight: 800;
    background: linear-gradient(135deg, #7eb5ff, #ffd060, #ff7060);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.25;
  }
  
  .ch7-subtitle {
    font-size: 12px;
    color: rgba(120,170,255,0.55);
    margin-top: 5px;
    letter-spacing: 1px;
  }
  
  .ch7-tabs {
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 14px 16px;
    position: relative;
    z-index: 10;
    flex-wrap: wrap;
  }
  
  .ch7-tab {
    padding: 9px 18px;
    border-radius: 50px;
    border: 1px solid rgba(60,130,255,0.25);
    background: rgba(60,130,255,0.04);
    color: rgba(150,190,255,0.65);
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    font-family: 'Sora', sans-serif;
    transition: all 0.3s;
  }
  
  .ch7-tab:hover { border-color: rgba(60,130,255,0.5); color: #dce8ff; background: rgba(60,130,255,0.1); }
  
  .ch7-tab.active {
    background: linear-gradient(135deg, rgba(60,130,255,0.3), rgba(220,60,60,0.2));
    border-color: rgba(60,130,255,0.6);
    color: #fff;
    box-shadow: 0 0 18px rgba(60,130,255,0.3);
  }
  
  .ch7-content {
    position: relative;
    z-index: 10;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 14px 40px;
  }
  
  .ch7-section {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(60,130,255,0.15);
    border-radius: 14px;
    padding: 18px;
    margin-bottom: 18px;
    transition: border-color 0.3s;
  }
  
  .ch7-section:hover { border-color: rgba(60,130,255,0.3); }
  
  .ch7-section-title {
    font-size: 17px;
    font-weight: 700;
    color: #7eb5ff;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(60,130,255,0.2);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .ch7-sub-title {
    font-size: 13px;
    font-weight: 700;
    color: #ffd060;
    margin: 12px 0 7px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .ch7-sub-title::before {
    content: '';
    width: 3px;
    height: 13px;
    background: #ffd060;
    border-radius: 2px;
    flex-shrink: 0;
  }
  
  .ch7-para {
    font-size: 13px;
    line-height: 1.8;
    color: rgba(200,220,255,0.82);
    margin-bottom: 9px;
  }
  
  .ch7-table-wrap { overflow-x: auto; margin: 10px 0; }
  
  .ch7-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }
  
  .ch7-table th {
    background: linear-gradient(135deg, rgba(60,130,255,0.22), rgba(220,60,60,0.12));
    color: #b8d4ff;
    padding: 9px 11px;
    text-align: left;
    font-weight: 700;
    font-size: 11px;
    letter-spacing: 0.5px;
    border-bottom: 2px solid rgba(60,130,255,0.25);
  }
  
  .ch7-table td {
    padding: 8px 11px;
    border-bottom: 1px solid rgba(60,130,255,0.09);
    color: rgba(200,220,255,0.82);
    vertical-align: top;
    line-height: 1.5;
  }
  
  .ch7-table tr:hover td { background: rgba(60,130,255,0.05); }
  
  .ch7-highlight {
    background: rgba(255,180,0,0.07);
    border-left: 3px solid #ffd060;
    border-radius: 0 8px 8px 0;
    padding: 10px 14px;
    margin: 9px 0;
    font-size: 13px;
    color: rgba(255,220,150,0.9);
    line-height: 1.7;
  }
  
  .ch7-list { list-style: none; padding: 0; }
  .ch7-list li {
    padding: 4px 0 4px 16px;
    position: relative;
    font-size: 13px;
    color: rgba(200,220,255,0.82);
    line-height: 1.6;
  }
  .ch7-list li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: #7eb5ff;
    font-size: 10px;
    top: 6px;
  }
  
  /* Quiz Styles */
  .ch7-quiz-container { padding: 4px 0; }
  
  .ch7-quiz-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
    flex-wrap: wrap;
    gap: 6px;
  }
  
  .ch7-quiz-progress {
    font-size: 12px;
    color: rgba(120,180,255,0.8);
    font-weight: 600;
  }
  
  .ch7-progress-bar {
    height: 4px;
    background: rgba(60,130,255,0.12);
    border-radius: 4px;
    margin-bottom: 16px;
    overflow: hidden;
  }
  
  .ch7-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #3d8aff, #ffd060);
    border-radius: 4px;
    transition: width 0.4s ease;
  }
  
  .ch7-question-card {
    background: rgba(255,255,255,0.035);
    border: 1px solid rgba(60,130,255,0.18);
    border-radius: 14px;
    padding: 18px;
    margin-bottom: 14px;
  }
  
  .ch7-question-num {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(60,130,255,0.6);
    margin-bottom: 7px;
  }
  
  .ch7-question-text {
    font-size: 14px;
    font-weight: 600;
    color: #dce8ff;
    line-height: 1.6;
    margin-bottom: 14px;
  }
  
  .ch7-options { display: flex; flex-direction: column; gap: 8px; }
  
  .ch7-option {
    padding: 10px 15px;
    border-radius: 10px;
    border: 1px solid rgba(60,130,255,0.18);
    background: rgba(255,255,255,0.025);
    color: rgba(200,220,255,0.8);
    cursor: pointer;
    font-size: 13px;
    font-family: 'Sora', sans-serif;
    text-align: left;
    transition: all 0.2s;
    line-height: 1.4;
  }
  
  .ch7-option:hover:not(:disabled) { border-color: rgba(60,130,255,0.45); background: rgba(60,130,255,0.07); color: #dce8ff; }
  .ch7-option.correct { border-color: #4ade80; background: rgba(74,222,128,0.1); color: #86efac; }
  .ch7-option.wrong { border-color: #f87171; background: rgba(248,113,113,0.1); color: #fca5a5; }
  
  .ch7-explanation {
    margin-top: 12px;
    padding: 11px 13px;
    background: rgba(60,130,255,0.07);
    border: 1px solid rgba(60,130,255,0.2);
    border-radius: 10px;
    font-size: 12px;
    color: rgba(180,210,255,0.9);
    line-height: 1.6;
  }
  
  .ch7-explanation strong { color: #7eb5ff; font-weight: 600; }
  
  .ch7-btn {
    width: 100%;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid rgba(60,130,255,0.4);
    background: linear-gradient(135deg, rgba(60,130,255,0.4), rgba(220,60,60,0.25));
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    font-family: 'Sora', sans-serif;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 10px;
  }
  
  .ch7-btn:hover {
    background: linear-gradient(135deg, rgba(60,130,255,0.6), rgba(220,60,60,0.4));
    box-shadow: 0 4px 18px rgba(60,130,255,0.3);
    transform: translateY(-1px);
  }
  
  /* Game */
  .ch7-game-score-board {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }
  
  .ch7-score-item {
    background: rgba(255,255,255,0.035);
    border: 1px solid rgba(60,130,255,0.18);
    border-radius: 10px;
    padding: 10px 16px;
    text-align: center;
    min-width: 85px;
  }
  
  .ch7-score-label { font-size: 9px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: rgba(60,130,255,0.6); margin-bottom: 3px; }
  .ch7-score-value { font-size: 22px; font-weight: 800; color: #7eb5ff; }
  
  .ch7-timer-ring { width: 76px; height: 76px; margin: 0 auto 16px; position: relative; }
  .ch7-timer-svg { transform: rotate(-90deg); }
  .ch7-timer-text { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 800; color: #7eb5ff; }
  
  .ch7-game-options { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; margin-bottom: 14px; }
  
  .ch7-game-option {
    padding: 11px 10px;
    border-radius: 10px;
    border: 1px solid rgba(60,130,255,0.22);
    background: rgba(255,255,255,0.03);
    color: rgba(200,220,255,0.82);
    cursor: pointer;
    font-size: 12px;
    font-family: 'Sora', sans-serif;
    transition: all 0.2s;
    line-height: 1.4;
  }
  
  .ch7-game-option:hover:not(:disabled) { border-color: rgba(60,130,255,0.5); background: rgba(60,130,255,0.1); transform: translateY(-2px); }
  .ch7-game-option.correct { border-color: #4ade80; background: rgba(74,222,128,0.12); color: #86efac; }
  .ch7-game-option.wrong { border-color: #f87171; background: rgba(248,113,113,0.1); color: #fca5a5; }
  
  .ch7-result-container { text-align: center; padding: 16px 0; }
  .ch7-result-score { font-size: 60px; font-weight: 800; background: linear-gradient(135deg, #7eb5ff, #ffd060); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 10px 0; }
  .ch7-result-title { font-size: 20px; font-weight: 700; color: #dce8ff; margin-bottom: 6px; }
  .ch7-result-sub { font-size: 13px; color: rgba(150,190,255,0.6); margin-bottom: 20px; }
  
  .ch7-result-table { width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 11px; text-align: left; }
  .ch7-result-table th { background: rgba(60,130,255,0.18); color: #7eb5ff; padding: 7px 9px; font-weight: 700; border-bottom: 1px solid rgba(60,130,255,0.25); }
  .ch7-result-table td { padding: 7px 9px; border-bottom: 1px solid rgba(60,130,255,0.07); color: rgba(200,220,255,0.8); vertical-align: top; }
  
  .ch7-correct-badge { color: #4ade80; font-weight: 700; }
  .ch7-wrong-badge { color: #f87171; font-weight: 700; }

  @media (max-width: 500px) {
    .ch7-game-options { grid-template-columns: 1fr; }
  }
`;

const notes7 = [
  {
    id: "intro7",
    icon: "⚔️",
    title: "அறிமுகம் – பிளாசிப் போர் 1757",
    content: (
      <>
        <p className="ch7-para">
          1757 ஜூன் 23இல் நடைபெற்ற பிளாசிப் போரில் வங்காள நவாபான சிராஜ்-உத்-தௌலா ஆங்கிலேய கிழக்கிந்திய கம்பெனியால் தோற்கடிக்கப்பட்டார். ராபர்ட் கிளைவ் மீர் ஜாபரின் இரகசிய ஆதரவைப் பெற்று இப்போரை வெற்றிகொண்டார்.
        </p>
        <div className="ch7-table-wrap">
          <table className="ch7-table">
            <thead><tr><th>நிகழ்வு</th><th>விவரம்</th></tr></thead>
            <tbody>
              <tr><td>பிளாசிப் போர்</td><td>1757 ஜூன் 23 – சிராஜ்-உத்-தௌலா தோல்வி</td></tr>
              <tr><td>கிழக்கிந்திய கம்பெனி பெற்றது</td><td>2 கோடியே 25 லட்சம் ரூபாய் (1757-1760 இடையே)</td></tr>
              <tr><td>அந்தப் பணத்தின் பயன்</td><td>பிரிட்டனின் தொழில் புரட்சிக்கு முதலீடு</td></tr>
              <tr><td>விளைவு</td><td>இந்தியாவில் தொழில்கள் முடங்கல்; பிரிட்டிஷ் பொருட்களுக்கு சந்தை</td></tr>
              <tr><td>காலனி ஆட்சி தொடர்வு</td><td>மேலும் 190 ஆண்டுகள்</td></tr>
            </tbody>
          </table>
        </div>
        <div className="ch7-highlight">
          <strong>கற்றலின் நோக்கங்கள்:</strong> விவசாயிகள் மற்றும் பழங்குடியினரின் போராட்டங்கள்; 1857 பெரும்கலகம்; இந்திய தேசிய காங்கிரஸ் உருவாக்கம்; 1905 வங்கப்பிரிவினை; சுதேசி இயக்கம்; தன்னாட்சி இயக்கம்.
        </div>
      </>
    )
  },
  {
    id: "farmers",
    icon: "🌾",
    title: "7.1 விவசாயிகள் மற்றும் பழங்குடியினரின் எதிர்ப்பு",
    content: (
      <>
        <p className="ch7-para">ஆங்கிலேய ஆட்சியில் கிட்டத்தட்ட ஒரு நூறுக்கும் குறையாத எண்ணிக்கையில் விவசாயிகளின் கிளர்ச்சிகள் நடந்தன.</p>
        <div className="ch7-table-wrap">
          <table className="ch7-table">
            <thead><tr><th>கிளர்ச்சி வகை</th><th>விளக்கம்</th></tr></thead>
            <tbody>
              <tr><td>மறுசீரமைத்தலுக்கான கிளர்ச்சிகள்</td><td>பழைய முறைமைகள், பழைய சமூக உறவுகளை நிலைநிறுத்தும் முயற்சி</td></tr>
              <tr><td>சமய இயக்கங்கள்</td><td>சமயத் தலைவர்கள் சமூகத்தை சீரமைப்பதன் மூலம் விடுதலைக்கு போராட்டம்</td></tr>
              <tr><td>சமூகக் கொள்ளை</td><td>தலைவர்கள் குற்றவாளிகளாக கருதப்பட்டாலும், சமூகம் நாயகர்களாக கண்டது</td></tr>
              <tr><td>மக்களின் கிளர்ச்சி</td><td>தலைவர்கள் இல்லாமல் திடீரெனவும் எழுந்த புரட்சி இயக்கங்கள்</td></tr>
            </tbody>
          </table>
        </div>
        
        <p className="ch7-sub-title">விவசாயிகளின் கிளர்ச்சிகள்</p>
        <div className="ch7-table-wrap">
          <table className="ch7-table">
            <thead><tr><th>இயக்கம்</th><th>ஆண்டு</th><th>தலைவர்கள்</th><th>சிறப்பம்சம்</th></tr></thead>
            <tbody>
              <tr><td><strong>ஃபராசி இயக்கம்</strong></td><td>1818</td><td>ஹாஜி ஷரியத்துல்லா; பின்னர் டுடு மியான்</td><td>'நிலம் கடவுளுக்குச் சொந்தம்'; வரி மறுப்பு; 1862 டுடு மியான் மறைவு; 1870 நோவா மியான் மீண்டும்</td></tr>
              <tr><td><strong>வஹாபி கிளர்ச்சி</strong></td><td>1827</td><td>டிடு மீர்</td><td>வங்காள பரசத் பகுதி; ஆங்கிலேய ஆட்சி, நிலப்பிரபுக்களுக்கு எதிர்</td></tr>
            </tbody>
          </table>
        </div>

        <p className="ch7-sub-title">பழங்குடியினர் கிளர்ச்சிகள்</p>
        <div className="ch7-table-wrap">
          <table className="ch7-table">
            <thead><tr><th>கிளர்ச்சி</th><th>இடம்</th><th>ஆண்டு</th><th>தலைவர்கள்</th><th>விளைவு</th></tr></thead>
            <tbody>
              <tr><td><strong>கோல் கிளர்ச்சி</strong></td><td>சோட்டா நாக்பூர், சிங்பும் (ஜார்க்கண்ட், ஒடிஷா)</td><td>1831-32</td><td>பிந்தரராய், சிங்ரராய்</td><td>அதிக வட்டிக்கு கடன், பழங்குடியினர் வெளியேற்றம் எதிர்ப்பு; ஆங்கிலேய வன்முறையால் அடக்கல்</td></tr>
              <tr><td><strong>சாந்தலர் கிளர்ச்சி</strong></td><td>ராஜ்மஹால் மலை (வங்காளம்)</td><td>1855</td><td>சித்து, கணு (சகோதரர்கள்)</td><td>1855 சாந்தல் பர்கானா சட்டம்; பழங்குடியினரல்லாதோர் நுழைவு தடை</td></tr>
              <tr><td><strong>முண்டா கிளர்ச்சி</strong></td><td>ராஞ்சி</td><td>1889</td><td>பிர்சா முண்டா</td><td>1900 பிர்சா கைது; 1908 சோட்டா நாக்பூர் குத்தகைச் சட்டம்</td></tr>
            </tbody>
          </table>
        </div>
        <div className="ch7-highlight">
          <strong>முண்டா இன சிறப்பு:</strong> குண்டக்கட்டி (கூட்டுச்சொத்து) விவசாய முறை; பிர்சா முண்டா தம்மை கடவுளின் தூதர் என அறிவித்தார்; கட்டிடங்கள் தீக்கிரை; 1900 பிர்சா சிறையில் உயிர்நீத்தார்; நாட்டுப்புறப் பாடல்களில் போற்றப்படுகிறார்.
        </div>
      </>
    )
  },
  {
    id: "revolt1857",
    icon: "🏹",
    title: "7.2 1857ஆம் ஆண்டின் பெருங்கிளர்ச்சி (முதல் இந்திய சுதந்திரப் போர்)",
    content: (
      <>
        <p className="ch7-sub-title">முக்கியத்துவங்கள்</p>
        <ul className="ch7-list">
          <li>இராணுவ வீரர்களுடன் ஆயுதமேந்திய படைகளும் இணைந்து நடந்த முதல் மாபெரும் புரட்சி</li>
          <li>இருதரப்பிலும் தூண்டப்பட்ட அதிக அளவு வன்முறை</li>
          <li>கிழக்கிந்திய கம்பெனி ஆட்சி முடிவுக்கு வந்து ஆங்கில மகாராணியின் நேரடி ஆட்சி</li>
        </ul>
        
        <p className="ch7-sub-title">கிளர்ச்சிக்கான காரணங்கள்</p>
        <div className="ch7-table-wrap">
          <table className="ch7-table">
            <thead><tr><th>காரணம்</th><th>விவரம்</th></tr></thead>
            <tbody>
              <tr><td>மேலாதிக்கக் கொள்கை</td><td>உள்நாட்டு ஆட்சியாளர்கள் திறனற்றவர்கள் என்ற அடிப்படையில் புதிய நிலப்பகுதிகள் இணைப்பு</td></tr>
              <tr><td>வாரிசு இழப்புக் கொள்கை</td><td>நேரடி ஆண்வாரிசு இல்லையெனில் ஆங்கிலேய ஆட்சியில் இணைப்பு – சதாரா, சம்பல்பூர், ஜான்சி, நாக்பூர்</td></tr>
              <tr><td>ஆடைக் கட்டுப்பாடு</td><td>1806 வேலூரில் – சமயக்குறியீடுகள் நெற்றியில் அணிய தடை, தொப்பி அணிய கட்டாயம்</td></tr>
              <tr><td>கடல் தடுப்பு</td><td>1824 பாரக்பூர் – சிப்பாய்கள் கடல் கடந்து பர்மா செல்ல மறுப்பு</td></tr>
              <tr><td>என்ஃபீல்டு துப்பாக்கி</td><td>பசு/பன்றிக் கொழுப்பு பசை பூசப்பட்ட காட்ரிட்ஜ் வதந்தி</td></tr>
              <tr><td>ஊதியப் பாரபட்சம்</td><td>ஐரோப்பிய சிப்பாய்களுடன் ஒப்பிட்டு இந்திய சிப்பாய்களுக்கு குறைந்த ஊதியம்</td></tr>
            </tbody>
          </table>
        </div>

        <p className="ch7-sub-title">முக்கிய நிகழ்வுகள்</p>
        <div className="ch7-table-wrap">
          <table className="ch7-table">
            <thead><tr><th>தேதி</th><th>நிகழ்வு</th></tr></thead>
            <tbody>
              <tr><td>மார்ச் 29, 1857</td><td>மங்கள் பாண்டே தனது ஐரோப்பிய அதிகாரியைத் தாக்கினார்; தூக்கிலிடப்பட்டார்</td></tr>
              <tr><td>மே 11, 1857</td><td>மீரட்டில் இருந்து தில்லி செங்கோட்டைக்கு சிப்பாய்கள் அணிவகுப்பு</td></tr>
              <tr><td>மே 1857</td><td>இரண்டாம் பகதூர் ஷா இந்துஸ்தானின் மாமன்னராக பதவியேற்பு</td></tr>
              <tr><td>1858 நவம்பர்</td><td>இந்திய அரசு சட்டம் – நாடாளுமன்றத்தால் நேரடி ஆட்சி</td></tr>
            </tbody>
          </table>
        </div>

        <p className="ch7-sub-title">முக்கிய போராட்ட வீரர்கள்</p>
        <div className="ch7-table-wrap">
          <table className="ch7-table">
            <thead><tr><th>தலைவர்</th><th>பகுதி</th><th>சிறப்பம்சம்</th></tr></thead>
            <tbody>
              <tr><td>நானா சாகிப்</td><td>கான்பூர்</td><td>கடைசி பேஷ்வா மன்னர் இரண்டாவது பாஜிராவின் தத்துப்பிள்ளை; ஓய்வூதியம் மறுக்கப்பட்டது</td></tr>
              <tr><td>பேகம் ஹஸ்ரத் மகால்</td><td>லக்னோ</td><td>–</td></tr>
              <tr><td>கான் பகதூர்</td><td>பரெய்லி</td><td>–</td></tr>
              <tr><td>ராணி லட்சுமிபாய்</td><td>ஜான்சி</td><td>டல்ஹௌசி வாரிசு இழப்புக் கொள்கையால் அரசு இணைப்பு; இறும் வரை போராட்டம்</td></tr>
              <tr><td>இரண்டாம் பகதூர் ஷா</td><td>தில்லி</td><td>சிறைபிடிக்கப்பட்டு பர்மா அனுப்பப்பட்டார்</td></tr>
            </tbody>
          </table>
        </div>

        <p className="ch7-sub-title">தோல்விக்கான காரணங்கள்</p>
        <ul className="ch7-list">
          <li>மத்திய தலைமை இல்லாமை – ஒருங்கிணைப்பு இல்லாத கிளர்ச்சி</li>
          <li>பொதுவான செயல்திட்டம் இல்லாமை</li>
          <li>இந்திய அரசர்களின் பொதுவான ஆதரவு குறைபாடு</li>
          <li>ஆயுதங்கள் கிடைக்கப்பெறாமை</li>
          <li>ஆங்கில அறிவு பெற்ற நடுத்தர வகுப்பு ஆதரவற்ற நிலை</li>
          <li>உதவியாளர்களால் காட்டிக்கொடுக்கப்பட்டது</li>
        </ul>

        <p className="ch7-sub-title">1857க்குப் பிறகு ஆட்சி மாற்றங்கள்</p>
        <div className="ch7-table-wrap">
          <table className="ch7-table">
            <thead><tr><th>மாற்றம்</th><th>விவரம்</th></tr></thead>
            <tbody>
              <tr><td>இந்தியர்கள் எண்ணிக்கை</td><td>இராணுவத்தில் வெகுவாகக் குறைப்பு; முக்கிய பதவிகளிலிருந்து விலக்கு</td></tr>
              <tr><td>ஆட்டெடுப்பு மாற்றம்</td><td>ராஜபுத்திரர், பிராமணர் விலக்கு; கூர்க்காக்கள், சீக்கியர், பதான்களுக்கு முக்கியத்துவம்</td></tr>
              <tr><td>பிரித்தாளும் கொள்கை</td><td>சாதி, மதம், மொழி, மண்டலம் வேறுபாடுகளை சாதகமாக பயன்பாடு</td></tr>
            </tbody>
          </table>
        </div>
      </>
    )
  },
  {
    id: "indigo",
    icon: "🌿",
    title: "7.3 பிரிட்டிஷ் ஆட்சியின் கீழ் விவசாயிகள் கிளர்ச்சிகள்",
    content: (
      <>
        <p className="ch7-sub-title">அ) கருநீலச்சாய (இண்டிகோ) கிளர்ச்சி (1859-1860)</p>
        <div className="ch7-table-wrap">
          <table className="ch7-table">
            <thead><tr><th>விவரம்</th><th>தகவல்</th></tr></thead>
            <tbody>
              <tr><td>தொடக்கம்</td><td>1859 – வங்காளம், நடியா மாவட்டம்</td></tr>
              <tr><td>வடிவம்</td><td>வேலைநிறுத்தம் → வன்முறை கிளர்ச்சி</td></tr>
              <tr><td>பங்கேற்றோர்</td><td>இந்து, முஸ்லிம் விவசாயிகள்; பெண்களும் பங்கேற்பு</td></tr>
              <tr><td>நாடகம்</td><td>நீல் தர்பன் – தீனபந்து மித்ரா எழுதியது; இண்டிகோ வேதனை உலகிற்கு அறிவிப்பு</td></tr>
              <tr><td>சிக்கல்</td><td>முன்பணம் வட்டியுடன் செலுத்த முடியாமல் கடன்; தந்தை கடன் மகன் மீது</td></tr>
            </tbody>
          </table>
        </div>

        <p className="ch7-sub-title">ஆ) தக்காண கலவரங்கள் (1875)</p>
        <div className="ch7-table-wrap">
          <table className="ch7-table">
            <thead><tr><th>விவரம்</th><th>தகவல்</th></tr></thead>
            <tbody>
              <tr><td>முதல் வெடிப்பு</td><td>1875 மே – பூனா அருகே சூபா கிராமம்</td></tr>
              <tr><td>பரவல்</td><td>பூனா, அகமதுநகர் – 30 கிராமங்கள்</td></tr>
              <tr><td>குறிவைத்தது</td><td>வட்டிக்குப் பணம் வழங்குவோர்</td></tr>
              <tr><td>காரணம்</td><td>அதிக வரி; புதிய சட்டம் – நிலம் எடுத்து ஏலம்; நிலம் உழாத வர்க்கத்திடம் கைமாற்றம்</td></tr>
            </tbody>
          </table>
        </div>
      </>
    )
  },
  {
    id: "inc",
    icon: "🏛️",
    title: "7.4 இந்திய தேசிய காங்கிரஸ் நிறுவல் (1870-1885)",
    content: (
      <>
        <p className="ch7-sub-title">தேசியத்தின் எழுச்சி</p>
        <div className="ch7-table-wrap">
          <table className="ch7-table">
            <thead><tr><th>அமைப்பு</th><th>ஆண்டு</th></tr></thead>
            <tbody>
              <tr><td>சென்னைவாசிகள் சங்கம்</td><td>1852</td></tr>
              <tr><td>கிழக்கிந்திய அமைப்பு</td><td>1866</td></tr>
              <tr><td>சென்னை மகாஜன சபை</td><td>1884</td></tr>
              <tr><td>பூனா சர்வஜனிக் சபா</td><td>1870</td></tr>
              <tr><td>பம்பாய் மாகாண சங்கம்</td><td>1885</td></tr>
            </tbody>
          </table>
        </div>
        
        <p className="ch7-sub-title">முக்கிய பொருளாதார விமர்சகர்கள்</p>
        <div className="ch7-table-wrap">
          <table className="ch7-table">
            <thead><tr><th>பெயர்</th><th>பங்களிப்பு</th></tr></thead>
            <tbody>
              <tr><td>தாதாபாய் நௌரோஜி</td><td>காலனி ஆட்சியின் பொருளாதார விமர்சனம்</td></tr>
              <tr><td>நீதிபதி ரானடே</td><td>காலனி பொருளாதார பகுப்பாய்வு</td></tr>
              <tr><td>ரொமேஷ் சந்திர தத்</td><td>இந்தியா பொருளாதார சுரண்டல் ஆய்வு</td></tr>
            </tbody>
          </table>
        </div>
        
        <div className="ch7-highlight">
          <strong>INC முதல் கூட்டம்:</strong> 1885 டிசம்பர் 28 | முதல் தலைவர்: உமேஷ் சந்திர பானர்ஜி | INC உருவாக்கத்திற்கு உதவியவர்: A.O. ஹியூம்
        </div>
        
        <p className="ch7-sub-title">முக்கிய கோரிக்கைகள்</p>
        <ul className="ch7-list">
          <li>மாகாண மற்றும் மத்திய அளவில் சட்டமேலவைகள் உருவாக்கம்</li>
          <li>சட்டமேலவைகளுக்கு தேர்ந்தெடுக்கப்படும் உறுப்பினர் எண்ணிக்கை அதிகரிப்பு</li>
          <li>நிருவாகத்துறையிலிருந்து நீதித்துறை பிரிப்பு</li>
          <li>இராணுவச் செலவுகள் குறைப்பு</li>
          <li>ஒரே நேரத்தில் இந்தியா-இங்கிலாந்தில் ஆட்சிப்பணித் தேர்வு</li>
          <li>வனச்சட்டம் மறுபரிசீலனை</li>
        </ul>

        <p className="ch7-sub-title">தீவிர தேசியவாதிகள் – லால்-பால்-பால்</p>
        <div className="ch7-table-wrap">
          <table className="ch7-table">
            <thead><tr><th>பெயர்</th><th>இடம்</th><th>சிறப்பம்சம்</th></tr></thead>
            <tbody>
              <tr><td>லாலா லஜபதி ராய் (லால்)</td><td>பஞ்சாப்</td><td>–</td></tr>
              <tr><td>பால கங்காதர திலகர் (பால்)</td><td>மகாராஷ்டிரா</td><td>சுயராஜ்ஜியம் = முழு தன்னாட்சி + விடுதலை</td></tr>
              <tr><td>பிபின் சந்திர பால் (பால்)</td><td>வங்காளம்</td><td>–</td></tr>
              <tr><td>வ.உ. சிதம்பரனார்</td><td>தூத்துக்குடி</td><td>சுதேசி கப்பல் நிறுவனம்</td></tr>
            </tbody>
          </table>
        </div>
      </>
    )
  },
  {
    id: "bangal",
    icon: "✂️",
    title: "7.5 வங்கப் பிரிவினை (1905)",
    content: (
      <>
        <div className="ch7-table-wrap">
          <table className="ch7-table">
            <thead><tr><th>விவரம்</th><th>தகவல்</th></tr></thead>
            <tbody>
              <tr><td>அதிகாரபூர்வ பிரிவினை</td><td>1905 அக்டோபர் 16</td></tr>
              <tr><td>கர்சன் பிரபு நோக்கம்</td><td>வங்காளிகளின் ஆதிக்கம் கட்டுப்படுத்தி தேசியவாத இயக்கத்தை வலுவிழக்கச் செய்வது</td></tr>
              <tr><td>முஸ்லிம்களுக்கு உறுதி</td><td>கிழக்கு வங்காளத்தில் முஸ்லிம்கள் ஒற்றுமை அனுபவிப்பார்கள் என்று உறுதி</td></tr>
              <tr><td>துக்கநாள்</td><td>அக்டோபர் 16 – கங்கை நதியில் புனித நீராட்டல்; வந்தே மாதரம் பாடல்</td></tr>
            </tbody>
          </table>
        </div>

        <p className="ch7-sub-title">சுதேசி இயக்கத்தின் போக்குகள்</p>
        <div className="ch7-table-wrap">
          <table className="ch7-table">
            <thead><tr><th>போக்கு</th><th>விளக்கம்</th></tr></thead>
            <tbody>
              <tr><td>மிதவாதப் போக்கு</td><td>மேல்முறையீடுகள், மனுக்கள்</td></tr>
              <tr><td>ஆக்கபூர்வ சுதேசி</td><td>சுய உதவி; ஆங்கிலேய ஆட்சியின் கட்டுப்பாட்டில் சிக்காமல் செயல்படல்; சுதேசி கடைகள்</td></tr>
              <tr><td>மறைமுக எதிர்ப்பு (1906)</td><td>அந்நியப் பொருட்கள், அரசுப் பள்ளிகள், நீதிமன்றங்கள், பட்டங்கள் புறக்கணிப்பு; ஆயுத போராட்டம்</td></tr>
              <tr><td>தீவிர தேசியவாதம்</td><td>சுயராஜ்ஜியம் முழு குறிக்கோள்</td></tr>
              <tr><td>புரட்சிகர தேசியவாதம்</td><td>ஆயுதமேந்திய போராட்டத்திற்கு ஆயத்தம்</td></tr>
            </tbody>
          </table>
        </div>
      </>
    )
  },
  {
    id: "homerul",
    icon: "🏠",
    title: "7.6 தன்னாட்சி (ஹோம் ரூல்) இயக்கம் (1916-18)",
    content: (
      <>
        <div className="ch7-table-wrap">
          <table className="ch7-table">
            <thead><tr><th>விவரம்</th><th>தகவல்</th></tr></thead>
            <tbody>
              <tr><td>தலைவர்கள்</td><td>லோகமான்ய பாலகங்காதர திலகர், அன்னிபெசன்ட் அம்மையார்</td></tr>
              <tr><td>காலம்</td><td>1916-1918</td></tr>
              <tr><td>பின்னணி</td><td>முதல் உலகப் போர்; இந்தியா பங்கேற்பு; பிரிட்டிஷ் ஏமாற்றம்</td></tr>
            </tbody>
          </table>
        </div>
        
        <p className="ch7-sub-title">குறிக்கோள்கள்</p>
        <ul className="ch7-list">
          <li>பிரிட்டிஷ் பேரரசிற்குள் தன்னாட்சி அடைவது</li>
          <li>தன்னாட்சிப் பகுதி (டொமினியன்) தகுதி – ஆஸ்திரேலியா, கனடா போல்</li>
          <li>வன்முறையல்லாத அரசியல்சாசன வழிமுறைகள்</li>
        </ul>
        
        <p className="ch7-sub-title">லக்னோ ஒப்பந்தம் (1916)</p>
        <div className="ch7-table-wrap">
          <table className="ch7-table">
            <thead><tr><th>விவரம்</th><th>தகவல்</th></tr></thead>
            <tbody>
              <tr><td>பங்கேற்றோர்</td><td>காங்கிரஸ் கட்சி + முஸ்லிம் லீக்</td></tr>
              <tr><td>ஒப்புக்கொண்டது</td><td>இந்தியாவில் விரைவில் தன்னாட்சி வேண்டும்</td></tr>
              <tr><td>காங்கிரஸ் ஏற்றது</td><td>முஸ்லிம்களுக்கு தனித் தொகுதிகள்</td></tr>
            </tbody>
          </table>
        </div>
        
        <div className="ch7-highlight">
          <strong>பிரிட்டிஷாரின் பதில்:</strong> 1919 – மாண்டேகு-செம்ஸ்ஃபோர்ட் சீர்திருத்தங்கள் (படிப்படியாக தன்னாட்சி உறுதி – ஆனால் ஏமாற்றம்); ரௌலட் சட்டம் – தன்னிச்சையான கைது, கடும் தண்டனை.
        </div>
      </>
    )
  }
];

const questions7 = [
  { q: "1818ஆம் ஆண்டு கிழக்கு வங்காளத்தில் ஹாஜி ஷரியத்துல்லா தொடங்கியது?", opts: ["வஹாபி கிளர்ச்சி","ஃபராசி இயக்கம்","கோல் கிளர்ச்சி","முண்டா கிளர்ச்சி"], ans: 1, exp: "ஹாஜி ஷரியத்துல்லா என்பவரால் 1818ஆம் ஆண்டு ஃபராசி இயக்கம் தொடங்கப்பட்டது. 1839இல் ஷரியத்துல்லா மறைந்த பிறகு மகன் டுடு மியான் தலைமையேற்றார்." },
  { q: "'நிலம் கடவுளுக்குச் சொந்தம்' என்று அறிவித்தவர்?", opts: ["டிடு மீர்","சித்து","டுடு மியான்","ஷரியத்துல்லா"], ans: 2, exp: "டுடு மியான் 'நிலம் கடவுளுக்குச் சொந்தமானது' என்று அறிவித்தார். எனவே வாடகை வசூலிப்பது அல்லது வரி விதிப்பது இறைச்சட்டத்திற்கு எதிரானது என்றார்." },
  { q: "1831-32இல் சோட்டா நாக்பூரில் நடந்த பழங்குடியின கிளர்ச்சி?", opts: ["சாந்தலர் கிளர்ச்சி","கோல் கிளர்ச்சி","முண்டா கிளர்ச்சி","வஹாபி கிளர்ச்சி"], ans: 1, exp: "ஜார்க்கண்ட் மற்றும் ஒடிஷாவிலுள்ள சோட்டா நாக்பூர் மற்றும் சிங்பும் ஆகிய இடங்களில் 1831-32இல் நடந்த கோல் கிளர்ச்சி மிகப்பெரிய பழங்குடியின கிளர்ச்சியாகும்." },
  { q: "சாந்தலர் கிளர்ச்சிக்கு தலைமை ஏற்ற சகோதரர்கள்?", opts: ["பிந்தரராய்-சிங்ரராய்","சித்து-கணு","டிடு மீர்-டுடு மியான்","பிர்சா-கணு"], ans: 1, exp: "1855இல் சித்து மற்றும் கணு ஆகிய இரண்டு சாந்தலர் சகோதரர்கள் கிளர்ச்சியை தலைமையேற்று நடத்தினார்கள்." },
  { q: "4. கீழ்க்காண்போரில் தீவிர தேசியவாதி யார்?", opts: ["தாதாபாய் நௌரோஜி","நீதிபதி கோவிந்த் ரானடே","பிபின் சந்திர பால்","ரொமேஷ் சந்திரா"], ans: 2, exp: "பிபின் சந்திர பால் தீவிர தேசியவாதி. அவர் வங்காளத்தைச் சேர்ந்தவர். லாலா லஜபதி ராய், பாலகங்காதர திலகருடன் லால்-பால்-பால் மூவர் குழுவில் இருந்தார்." },
  { q: "வங்கப்பிரிவினை எந்த நாளில் நடைமுறைக்கு வந்தது?", opts: ["1905 ஜூன் 19","1906 ஜூலை 18","1907 ஆகஸ்ட் 19","1905 அக்டோபர் 16"], ans: 3, exp: "1905 அக்டோபர் 16இல் வங்காளம் அதிகாரபூர்வமாகப் பிரிவினையானது. அந்த நாள் துக்கநாளாக அறிவிக்கப்பட்டது." },
  { q: "சோட்டா நாக்பூர் குத்தகைச் சட்டம் எந்தப் பின்னணியில் நிறைவேற்றப்பட்டது?", opts: ["கோல் கிளர்ச்சி","இண்டிகோ கிளர்ச்சி","முண்டா கிளர்ச்சி","தக்காண கலவரங்கள்"], ans: 2, exp: "1908இல் சோட்டா நாக்பூர் குத்தகைச் சட்டம் நிறைவேற்றப்பட்டது. இது முண்டா கிளர்ச்சியை அடுத்து ஆங்கிலேய அரசு பழங்குடினி நிலம் பற்றிய கொள்கை வகுக்க முயன்றதில் இருந்து வந்தது." },
  { q: "1916ஆம் ஆண்டு ஏப்ரலில் தன்னாட்சி இயக்கத்தை முதலில் தொடங்கியவர் யார்?", opts: ["அன்னிபெசன்ட்","பிபின் சந்திர பால்","லாலா லஜபதி ராய்","திலகர்"], ans: 3, exp: "பால கங்காதர திலகர் 1916 ஏப்ரலில் தன்னாட்சி இயக்கத்தை முதலில் தொடங்கினார். பின்னர் அன்னிபெசன்ட் 1916 செப்டம்பரில் தொடங்கினார்." },
  { q: "நீல் தர்பன் நாடகம் மூலமாக இண்டிகோ விவசாயிகளின் இன்னல்கள் தெரிவித்தவர்?", opts: ["தீன பந்து மித்ரா","ரொமேஷ் சந்திர தத்","தாதாபாய் நௌரோஜி","பிர்சா முண்டா"], ans: 0, exp: "தீனபந்து மித்ரா 'நீல் தர்பன்' (இண்டிகோவின் கண்ணாடி) என்ற நாடகம் எழுதினார். இது இந்தியாவிலும் ஐரோப்பாவிலும் இண்டிகோ விவசாயிகளின் பிரச்சனைகளை கவனத்திற்கு கொண்டுவந்தது." },
  { q: "1857 கிளர்ச்சியில் கான்பூர் பகுதியில் தலைமை வகித்தவர்?", opts: ["பேகம் ஹஸ்ரத் மகால்","நானா சாகிப்","கான் பகதூர்","ராணி லட்சுமிபாய்"], ans: 1, exp: "கடைசி பேஷ்வா மன்னரான இரண்டாவது பாஜிராவின் தத்துப்பிள்ளையான நானா சாகிப் கான்பூர் பகுதியில் கிளர்ச்சிக்குத் தலைமை தாங்கினார். கம்பெனி அவருக்கு ஓய்வூதியம் தர மறுத்தது." },
  { q: "இந்திய தேசிய காங்கிரசின் முதல் கூட்டம் நடந்த தேதி?", opts: ["1885 டிசம்பர் 25","1885 டிசம்பர் 28","1886 ஜனவரி 1","1886 ஜனவரி 15"], ans: 1, exp: "1885 டிசம்பர் 28இல் இந்திய தேசிய காங்கிரசின் முதல் அமர்வு (கூட்டம்) நடைபெற்றது. A.O. ஹியூம் அமைப்பை உருவாக்க சேவைகள் வழங்கினார்." },
  { q: "இந்திய தேசிய காங்கிரசின் முதல் தலைவர்?", opts: ["தாதாபாய் நௌரோஜி","A.O. ஹியூம்","உமேஷ் சந்திர பானர்ஜி","பால கங்காதர திலகர்"], ans: 2, exp: "இந்திய தேசிய காங்கிரசின் முதல் (1885) தலைவராக உமேஷ் சந்திர பானர்ஜி இருந்தார்." },
  { q: "வாரிசு இழப்புக் கொள்கையின் அடிப்படையில் ஆங்கிலேய ஆட்சியில் இணைக்கப்படாத பகுதி?", opts: ["சதாரா","சம்பல்பூர்","ஜான்சி","மைசூர்"], ans: 3, exp: "சதாரா, சம்பல்பூர், பஞ்சாபின் சில பகுதிகள், ஜான்சி மற்றும் நாக்பூர் ஆகியன வாரிசு இழப்புக் கொள்கையின் அடிப்படையில் இணைக்கப்பட்டன. மைசூர் அல்ல." },
  { q: "பிளாசிப் போரில் கிழக்கிந்திய கம்பெனி பெற்ற தொகை?", opts: ["1 கோடி ரூபாய்","2 கோடியே 25 லட்சம் ரூபாய்","3 கோடி ரூபாய்","5 கோடி ரூபாய்"], ans: 1, exp: "வங்காளத்தின் புதிய நவாபாக நியமிக்கப்பட்ட மீர் ஜாபரிடம் இருந்து கிழக்கிந்திய கம்பெனி 2 கோடியே 25 லட்சம் ரூபாயை 1757 மற்றும் 1760க்கு இடைப்பட்ட காலகட்டத்தில் பெற்றது." },
  { q: "மங்கள் பாண்டே தனது ஐரோப்பிய அதிகாரியைத் தாக்கிய தேதி?", opts: ["மார்ச் 27, 1857","மார்ச் 29, 1857","மே 10, 1857","மே 11, 1857"], ans: 1, exp: "மார்ச் 29ஆம் தேதி மங்கள் பாண்டே என்ற சிப்பாய் தனது ஐரோப்பிய அதிகாரியைத் தாக்கினார். கைது செய்ய உத்தரவிட்டும் சக சிப்பாய்கள் மறுத்தனர்; பின்னர் தூக்கிலிடப்பட்டார்." },
  { q: "1857 கிளர்ச்சி தோல்விக்கான முக்கிய காரணம்?", opts: ["ஆயுதங்கள் இல்லாமை","மத்திய தலைமை இல்லாமை","நிதி பற்றாக்குறை","ஆங்கிலேய அதிக படைவலிமை"], ans: 1, exp: "மத்திய தலைமை இல்லாததும் கிளர்ச்சி தோல்வியடைய முக்கிய காரணமாக அமைந்தது. தனிநபர்கள், இந்திய அரசர்கள் மற்றும் ஆங்கிலேய அரசுக்கு எதிரான பல்வேறு சக்திகளை ஒன்றிணைக்கப் பொதுவான செயல்திட்டம் இல்லாமல் போனது." },
  { q: "தக்காண கலவரங்கள் எந்த ஆண்டு வெடித்தன?", opts: ["1870","1873","1875","1879"], ans: 2, exp: "1875ஆம் ஆண்டு மே மாதத்தில் தக்காணத்தில் வட்டிக்குப் பணம் வழங்குவோருக்கு எதிரான கலவரங்கள் பூனா அருகே உள்ள சூபா என்ற கிராமத்தில் முதன்முதலாக வெடித்தது." },
  { q: "பிர்சா முண்டா எந்த ஆண்டு கைது செய்யப்பட்டார்?", opts: ["1898","1899","1900","1901"], ans: 2, exp: "1900ஆம் ஆண்டு பிப்ரவரி மாதம் கைது செய்யப்பட்ட பிர்சா முண்டா பின்னர் சிறையில் உயிர்நீத்தார். அவர் பழங்குடியினரின் தலைவராக இன்றளவும் நாட்டுப்புறப் பாடல்களில் போற்றப்படுகிறார்." },
  { q: "லக்னோ ஒப்பந்தம் எந்த ஆண்டு?", opts: ["1914","1915","1916","1917"], ans: 2, exp: "லக்னோ ஒப்பந்தம் 1916இல் நடந்தது. காங்கிரஸ் கட்சியும் முஸ்லிம் லீக்கும் இந்தியாவில் விரைவில் தன்னாட்சி வேண்டும் என்பதை ஏற்றுக்கொண்டன." },
  { q: "இண்டிகோ கிளர்ச்சி எந்த மாவட்டத்தில் தொடங்கியது?", opts: ["கல்கத்தா","நடியா","முர்சிதாபாத்","தினாஜ்பூர்"], ans: 1, exp: "இண்டிகோ கிளர்ச்சி 1859ஆம் ஆண்டு தொடங்கியது. வங்காளத்தின் நடியா மாவட்டத்தின் ஒரு கிராமத்தைச் சேர்ந்த விவசாயிகள் இனி இண்டிகோ பயிரிடப்போவதில்லை என மறுத்து வேலைநிறுத்தத்தில் ஈடுபட்டனர்." },
  { q: "1905 வங்கப்பிரிவினையை நடத்திய வைஸ்ராய்?", opts: ["மிண்டோ","கர்சன்","செல்ம்ஸ்ஃபோர்ட்","மாண்டேகு"], ans: 1, exp: "வங்காளத்தின் தலைமை ஆளுநரான கர்சன் பிரபு வங்கப்பிரிவினை நடத்தினார். வங்காளிகளின் ஆதிக்கத்தை கட்டுப்படுத்தி தேசியவாத இயக்கத்தை வலுவிழக்கச் செய்வதே நோக்கம்." },
  { q: "வ.உ. சிதம்பரனார் சுதேசி கப்பல் நிறுவனம் தொடங்கிய இடம்?", opts: ["சென்னை","தூத்துக்குடி","நாகப்பட்டினம்","ராமேஸ்வரம்"], ans: 1, exp: "தென்னிந்தியாவில் வ.உ. சிதம்பரனார் சுதேசி கப்பல் நிறுவனத்தை தொடங்கியதை அடுத்து தூத்துக்குடி சுதேசி இயக்கத்தின் மிக முக்கியத் தளமாக விளங்கியது." },
  { q: "1855 சாந்தலர் கிளர்ச்சி இடம்?", opts: ["ராஜ்மஹால் மலை","சோட்டா நாக்பூர்","ராஞ்சி","பாகல்பூர்"], ans: 0, exp: "சாந்தலர்கள் நிரந்தர குடியிருப்புகளின் கீழ் ஜமீன்கள் உருவாக்கவும் தங்கள் பூர்வீக இடத்தை விட்டு இடம்பெயரவேண்டி நிர்ப்பந்திக்கப்பட்டதால் ராஜ்மஹால் மலையைச் சுற்றிலும் இருந்த வனப்பகுதியை விட்டு வெளியேற்றப்பட்டனர்." },
  { q: "1858 இந்திய அரசு சட்டம் எந்த மாதம் நிறைவேற்றப்பட்டது?", opts: ["ஆகஸ்ட்","செப்டம்பர்","அக்டோபர்","நவம்பர்"], ans: 3, exp: "1858ஆம் ஆண்டு நவம்பர் மாதம் இந்திய அரசு சட்டம் பிரிட்டிஷ் நாடாளுமன்றம் ஏற்றுக்கொள்ளப்பட்டு, நாடாளுமன்றத்தால் நேரடியாக ஆட்சி அதிகாரம் செலுத்தப்படும் ஆங்கிலேய அரசின் காலனி அறிவிக்கப்பட்டது." },
  { q: "1806 வேலூர் கிளர்ச்சி எதனால் வெடித்தது?", opts: ["திருமண வரி","ஆடைக் கட்டுப்பாடுகள்","நிலவரி","ஊதியக் குறைப்பு"], ans: 1, exp: "1806ஆம் ஆண்டில் வேலூரில் சிப்பாய்கள் சமயக்குறியீடுகளை நெற்றியில் அணிவதற்கும் தாடி வைத்துக்கொள்வதற்கும் தடைவிதிக்கப்பட்டதோடு தலைப்பாகைகளுக்கு பதிலான வட்ட வடிவிலான தொப்பிகளை அணியுமாறும் பணிக்கப்பட்டனர். இதை எதிர்த்து கிளர்ச்சி." },
  { q: "மாண்டேகு-செம்ஸ்ஃபோர்ட் சீர்திருத்தங்கள் எந்த ஆண்டு?", opts: ["1917","1918","1919","1920"], ans: 2, exp: "1919இல் மாண்டேகு-செம்ஸ்ஃபோர்ட் சீர்திருத்தங்களை ஆங்கிலேய அரசு அறிவித்தது. இதன் மூலம் இந்தியா தன்னாட்சி நோக்கி படிப்படியாக முன்னேற உறுதி கூறப்பட்டது." },
  { q: "ஃபராசி இயக்கத்தில் டுடு மியானுக்குப் பிறகு யார் தலைமை ஏற்றார்?", opts: ["நோவா மியான்","பீர் சிங்","சித்து","கணு"], ans: 0, exp: "1862இல் டுடு மியான் மறைந்தபிறகு 1870களில் நோவா மியான் என்பவரால் இந்த இயக்கம் மீண்டும் உயிர்பெற்றது." },
  { q: "ஆங்கிலேய ஆட்சியில் நிலுவைத் தொகை செலுத்த இயலாமல் விவசாயிகள் என்ன செய்ய வேண்டி இருந்தனர்?", opts: ["நகரம் சேர்ந்தனர்","பயிரிடுதலை கைவிட்டனர்","வேறு நாட்டிற்கு சென்றனர்","படை சேர்ந்தனர்"], ans: 1, exp: "தக்காண கலவரங்களில் கடன் என்னும் மாய வலையில் சிக்கிய விவசாயிகள் நிலுவைத் தொகையைச் செலுத்த இயலாமல் பயிரிடுதலையும் விவசாயத்தையும் கைவிட வேண்டிய அவல நிலைக்குத் தள்ளப்பட்டனர்." },
  { q: "1857 கிளர்ச்சியில் ஜான்சி ராணி லட்சுமிபாய் ஏன் போர் தொடங்கினார்?", opts: ["வரி விதிப்பு காரணம்","வாரிசு இழப்புக் கொள்கையால் அரசு இணைப்பு","ஆங்கிலேயர் மத மாற்றம் முயற்சி","சிப்பாய் அவமான நடத்தை"], ans: 1, exp: "ஜான்சியின் ராணி லட்சுமிபாயின் விஷயத்தில் டல்ஹௌசி பிரபு, அவரது கணவர் மறைந்தபிறகு ஒரு ஆண்பிள்ளையை தத்து எடுத்துக்கொள்ள அனுமதி தர மறுத்தார். வாரிசு இழப்புக் கொள்கையின் அடிப்படையில் அவரது அரசு ஆங்கிலேய அரசுடன் இணைக்கப்பட்டது." },
  { q: "சுதேசி இயக்கத்தின் ஆக்கபூர்வ சுதேசி என்ன வலியுறுத்தியது?", opts: ["வன்முறை","சுய உதவி","மனுக்கள்","சட்டமூலங்கள்"], ans: 1, exp: "ஆக்கபூர்வ திட்டங்கள் அனைத்தும் பெரும்பாலும் சுய உதவியையே வலியுறுத்தின. ஆங்கிலேய ஆட்சியின் கட்டுப்பாட்டில் சிக்காமல் சுதந்திரமாகச் செயல்படக்கூடிய உள்ளாட்சி அமைப்புகளை மாற்றாக உருவாக்குவது குறித்து அது கவனம் செலுத்தியது." }
];

const GAME_TIME7 = 15;

export default function Chapter7() {
  const [tab, setTab] = useState("notes");
  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState([]);

  const [gameIdx, setGameIdx] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [gameTimer, setGameTimer] = useState(GAME_TIME7);
  const [gameSelected, setGameSelected] = useState(null);
  const [gameDone, setGameDone] = useState(false);
  const [gameAnswers, setGameAnswers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [streak, setStreak] = useState(0);

  const allQ = questions7;
  const gameQ = questions7.slice(0, 20);

  useEffect(() => {
    if (tab !== "game" || !gameStarted || gameDone || gameSelected !== null) return;
    if (gameTimer <= 0) { handleGameSelect(-1); return; }
    const t = setTimeout(() => setGameTimer(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [tab, gameStarted, gameDone, gameSelected, gameTimer, gameIdx]);

  const handleQuizSelect = (i) => {
    if (selected !== null) return;
    setSelected(i);
    setShowExp(true);
    const correct = i === allQ[quizIdx].ans;
    if (correct) setQuizScore(s => s + 1);
    setQuizAnswers(prev => [...prev, { q: allQ[quizIdx].q, correct, userAns: allQ[quizIdx].opts[i], correctAns: allQ[quizIdx].opts[allQ[quizIdx].ans] }]);
  };

  const nextQuiz = () => {
    if (quizIdx + 1 >= allQ.length) { setQuizDone(true); return; }
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
      setGameTimer(GAME_TIME7);
    }, 1200);
  };

  const resetGame = () => { setGameIdx(0); setGameScore(0); setGameTimer(GAME_TIME7); setGameSelected(null); setGameDone(false); setGameAnswers([]); setGameStarted(false); setStreak(0); };

  const timerPct = gameTimer / GAME_TIME7;
  const r = 30;
  const circ = 2 * Math.PI * r;

  return (
    <>
      <style>{styles7}</style>
      <div className="ch7-app">
        <div className="ch7-bg" />
        <div className="ch7-header">
          <div className="ch7-badge">TNPSC · Class 10 · History</div>
          <h1 className="ch7-title">அலகு 7 – காலனியத்துக்கு எதிரான இயக்கங்களும் தேசியத்தின் தோற்றமும்</h1>
          <p className="ch7-subtitle">Unit 7 · Anti-Colonial Movements & Rise of Nationalism</p>
        </div>
        <div className="ch7-tabs">
          {["notes","quiz","game"].map(t => (
            <button key={t} className={`ch7-tab ${tab===t?"active":""}`} onClick={() => setTab(t)}>
              {t==="notes"?"📖 Notes":t==="quiz"?"✏️ Quiz":"🎮 Quiz Game"}
            </button>
          ))}
        </div>
        <div className="ch7-content">

          {tab === "notes" && (
            <div>
              {notes7.map(sec => (
                <div key={sec.id} className="ch7-section">
                  <div className="ch7-section-title">
                    <span>{sec.icon}</span>
                    {sec.title}
                  </div>
                  {sec.content}
                </div>
              ))}
            </div>
          )}

          {tab === "quiz" && !quizDone && (
            <div className="ch7-quiz-container">
              <div className="ch7-quiz-header">
                <span className="ch7-quiz-progress">கேள்வி {quizIdx + 1} / {allQ.length}</span>
                <span className="ch7-quiz-progress">மதிப்பெண்: {quizScore}</span>
              </div>
              <div className="ch7-progress-bar">
                <div className="ch7-progress-fill" style={{ width: `${(quizIdx/allQ.length)*100}%` }} />
              </div>
              <div className="ch7-question-card">
                <div className="ch7-question-num">Question {quizIdx + 1}</div>
                <div className="ch7-question-text">{allQ[quizIdx].q}</div>
                <div className="ch7-options">
                  {allQ[quizIdx].opts.map((opt, i) => (
                    <button key={i} className={`ch7-option ${selected !== null ? (i === allQ[quizIdx].ans ? "correct" : i === selected ? "wrong" : "") : ""}`} onClick={() => handleQuizSelect(i)} disabled={selected !== null}>
                      <span style={{ marginRight: 8, fontWeight: 700, opacity: 0.5 }}>{String.fromCharCode(65+i)}.</span>{opt}
                    </button>
                  ))}
                </div>
                {showExp && (
                  <div className="ch7-explanation">
                    <strong>{selected === allQ[quizIdx].ans ? "✅ சரி!" : "❌ தவறு!"}</strong><br />
                    {allQ[quizIdx].exp}
                  </div>
                )}
              </div>
              {selected !== null && (
                <button className="ch7-btn" onClick={nextQuiz}>
                  {quizIdx + 1 < allQ.length ? "அடுத்த கேள்வி →" : "முடிவுகள் →"}
                </button>
              )}
            </div>
          )}

          {tab === "quiz" && quizDone && (
            <div className="ch7-result-container">
              <div className="ch7-result-title">Quiz முடிந்தது! 🎉</div>
              <div className="ch7-result-score">{quizScore}/{allQ.length}</div>
              <div className="ch7-result-sub">
                {quizScore >= allQ.length * 0.8 ? "மிகச் சிறப்பாக செய்தீர்கள்! 🌟" : quizScore >= allQ.length * 0.5 ? "நல்ல முயற்சி! 👍" : "மீண்டும் முயற்சி செய்யுங்கள்! 💪"}
              </div>
              <table className="ch7-result-table">
                <thead><tr><th>#</th><th>கேள்வி</th><th>உங்கள் பதில்</th><th>சரியான பதில்</th><th>நிலை</th></tr></thead>
                <tbody>
                  {quizAnswers.map((a, i) => (
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td style={{ maxWidth: 180, fontSize: 10 }}>{a.q}</td>
                      <td style={{ fontSize: 10 }}>{a.userAns}</td>
                      <td style={{ fontSize: 10 }}>{a.correctAns}</td>
                      <td>{a.correct ? <span className="ch7-correct-badge">✅</span> : <span className="ch7-wrong-badge">❌</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="ch7-btn" onClick={resetQuiz}>மீண்டும் தொடங்கு 🔄</button>
            </div>
          )}

          {tab === "game" && !gameStarted && (
            <div style={{ textAlign: "center" }}>
              <div className="ch7-question-card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>⚔️</div>
                <div className="ch7-result-title">Quiz Game – அலகு 7</div>
                <div className="ch7-result-sub" style={{ marginBottom: 20 }}>
                  20 கேள்விகள் · {GAME_TIME7} வினாடி நேர வரம்பு · விரைவான பதிலுக்கு அதிக மதிப்பெண்
                </div>
                <button className="ch7-btn" onClick={() => setGameStarted(true)}>விளையாட்டு தொடங்கு 🚀</button>
              </div>
            </div>
          )}

          {tab === "game" && gameStarted && !gameDone && (
            <div>
              <div className="ch7-game-score-board">
                <div className="ch7-score-item"><div className="ch7-score-label">மதிப்பெண்</div><div className="ch7-score-value">{gameScore}</div></div>
                <div className="ch7-score-item"><div className="ch7-score-label">கேள்வி</div><div className="ch7-score-value">{gameIdx+1}/{gameQ.length}</div></div>
                <div className="ch7-score-item"><div className="ch7-score-label">தொடர்</div><div className="ch7-score-value">{streak}🔥</div></div>
              </div>
              <div className="ch7-timer-ring">
                <svg className="ch7-timer-svg" width="76" height="76">
                  <circle cx="38" cy="38" r={r} fill="none" stroke="rgba(60,130,255,0.12)" strokeWidth="6"/>
                  <circle cx="38" cy="38" r={r} fill="none" stroke={gameTimer <= 5 ? "#f87171" : "#3d8aff"} strokeWidth="6" strokeDasharray={circ} strokeDashoffset={circ * (1 - timerPct)} strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s linear" }}/>
                </svg>
                <div className="ch7-timer-text" style={{ color: gameTimer <= 5 ? "#f87171" : "#7eb5ff" }}>{gameTimer}</div>
              </div>
              <div className="ch7-question-card">
                <div className="ch7-question-num">Question {gameIdx + 1}</div>
                <div className="ch7-question-text">{gameQ[gameIdx].q}</div>
                <div className="ch7-game-options">
                  {gameQ[gameIdx].opts.map((opt, i) => (
                    <button key={i} className={`ch7-game-option ${gameSelected !== null ? (i === gameQ[gameIdx].ans ? "correct" : i === gameSelected ? "wrong" : "") : ""}`} onClick={() => handleGameSelect(i)} disabled={gameSelected !== null}>
                      <span style={{ fontWeight: 700, opacity: 0.5, marginRight: 4 }}>{String.fromCharCode(65+i)}.</span>{opt}
                    </button>
                  ))}
                </div>
                {gameSelected !== null && (
                  <div className="ch7-explanation">{gameSelected === gameQ[gameIdx].ans ? "✅ சரி!" : "❌"} {gameQ[gameIdx].exp}</div>
                )}
              </div>
            </div>
          )}

          {tab === "game" && gameDone && (
            <div className="ch7-result-container">
              <div className="ch7-result-title">விளையாட்டு முடிந்தது! 🏆</div>
              <div className="ch7-result-score">{gameScore}</div>
              <div className="ch7-result-sub">மொத்த மதிப்பெண்கள் · {gameAnswers.filter(a=>a.correct).length}/{gameQ.length} சரியான பதில்கள்</div>
              <table className="ch7-result-table">
                <thead><tr><th>#</th><th>கேள்வி</th><th>நிலை</th><th>சரியான பதில்</th></tr></thead>
                <tbody>
                  {gameAnswers.map((a, i) => (
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td style={{ maxWidth: 200, fontSize: 10 }}>{a.q}</td>
                      <td>{a.correct ? <span className="ch7-correct-badge">✅</span> : <span className="ch7-wrong-badge">❌</span>}</td>
                      <td style={{ fontSize: 10 }}>{a.correctAns}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="ch7-btn" onClick={resetGame}>மீண்டும் விளையாடு 🔄</button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
