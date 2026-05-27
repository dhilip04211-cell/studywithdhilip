import { useState, useEffect, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════ */
const CLIENT_ID = "879226759032-983f068npvn7t0npk72nbq8lp402q98a.apps.googleusercontent.com";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

const SID = {
  fir:     "1sKmU8eXXz5iPG7qNvu-exKQOW_qxu3BbPQngqzVvF0k",
  pending: "1PWTUdw85POCan-aaqvZq8Z-ewq3pIuAGosSo-xiCC9I",
  disposal:"1OWoLwzLVANiAk8T2AthO_wy9hEhyLuFLcXVgJsCyhHY",
  nonval:  "1tUDCMzd_q3TbmiboJl7yYI9S7hFcrMb3K4vhIaP6dVk",
  casenum: "1eeQA75iuqNcsNwXygcx3JLJRamxuRI_1UrpetByr5nA",
};

const SMAP = [
  { sh:"JKM",     lb:"Jayankondam",      al:["jayankondam","jkm","jayankondam police station"] },
  { sh:"VKM",     lb:"Vikkiramangalam",  al:["vikkiramangalam","vikramangalam","vkm","venganam"] },
  { sh:"T.PALUR", lb:"T.Palur",          al:["t.palur","tpalur","palur","t palur","t. palur","t.palur police"] },
  { sh:"PEW",     lb:"PEW Ariyalur",     al:["pew","pew ariyalur","nb cid","nb cid trichy"] },
  { sh:"AWPS",    lb:"AWPS Jayankondam", al:["awps","awps jayankondam","all women"] },
  { sh:"DCB",     lb:"DCB Ariyalur",     al:["dcb","dcb ariyalur","ariyalur dcb"] },
];

/* ═══════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════ */
function parseFIR(raw) {
  if (!raw && raw !== 0) return { num: "", yr: "" };
  const s = String(raw).trim();
  const parts = s.split(/\s*\/\s*/);
  const num = String(parseInt(parts[0], 10) || 0);
  const yr = parts[1] ? parts[1].trim() : "";
  return { num, yr };
}

function firMatch(raw, searchNum, searchYr) {
  if (!raw) return false;
  const p = parseFIR(raw);
  if (p.num !== searchNum) return false;
  if (!searchYr) return true;
  if (!p.yr) return true;
  return p.yr === searchYr;
}

function stMatch(name, obj) {
  if (!name || !obj) return false;
  const n = name.toLowerCase().trim();
  if (!n) return false;
  if (obj.sh.toLowerCase() === n) return true;
  if (obj.lb.toLowerCase() === n) return true;
  for (const a of obj.al) {
    if (n === a) return true;
    if (n.includes(a)) return true;
  }
  return false;
}

/* ═══════════════════════════════════════════════
   SHEETS API UTILS
═══════════════════════════════════════════════ */
async function sheetsGet(tok, sid, range) {
  const r = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sid}/values/${encodeURIComponent(range)}`,
    { headers: { Authorization: `Bearer ${tok}` } }
  );
  if (!r.ok) return [];
  const d = await r.json();
  return d.values || [];
}

async function sheetsAppend(tok, sid, range, vals) {
  const r = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sid}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${tok}`, "Content-Type": "application/json" },
      body: JSON.stringify({ values: vals }),
    }
  );
  return r.ok;
}

async function sheetsDeleteRow(tok, sid, tabName, oneBasedRow) {
  const m = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sid}?fields=sheets.properties`,
    { headers: { Authorization: `Bearer ${tok}` } }
  );
  if (!m.ok) return false;
  const meta = await m.json();
  const sh = (meta.sheets || []).find(s => s.properties.title === tabName);
  if (!sh) { console.warn("Tab not found:", tabName); return false; }
  const r = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sid}:batchUpdate`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${tok}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: [{ deleteDimension: { range: {
          sheetId: sh.properties.sheetId,
          dimension: "ROWS",
          startIndex: oneBasedRow - 1,
          endIndex: oneBasedRow,
        }}}],
      }),
    }
  );
  return r.ok;
}

/* ═══════════════════════════════════════════════
   LOAD DATA
═══════════════════════════════════════════════ */
async function loadFIRSheet(tok, tabName) {
  const rows = await sheetsGet(tok, SID.fir, `${tabName}!A:D`);
  const data = [];
  let yg = "";
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const a = (r[0] || "").toString().trim();
    const b = (r[1] || "").toString().trim();
    const c = (r[2] || "").toString().trim();
    const d = (r[3] || "").toString().trim();

    if (a.toLowerCase().includes("sl") || c.toLowerCase().includes("section of law")) continue;
    if (b.toLowerCase().includes("cr.no")) continue;
    if (c.toLowerCase().includes("police station")) continue;

    const isYearRow =
      (!a && !b && /^\d{4}$/.test(c) && !d) ||
      (!a && /^\d{4}$/.test(b) && !c && !d) ||
      (/^\d{4}$/.test(a) && !b && !c && !d);

    if (isYearRow) {
      yg = /^\d{4}$/.test(a) ? a : /^\d{4}$/.test(b) ? b : c;
      continue;
    }

    const slNum = parseInt(a, 10);
    if (!isNaN(slNum) && b && c) {
      const crYr = parseFIR(b).yr || yg;
      data.push({ sl: a, cr: b, sec: c, dr: d, yr: crYr, ri: i + 1 });
    }
  }
  return data;
}

async function loadAllData(tok) {
  const fir = {};
  for (const s of SMAP) {
    fir[s.sh] = await loadFIRSheet(tok, s.sh);
  }

  const pr = await sheetsGet(tok, SID.pending, "Sheet1!A:L");
  const pend = pr.slice(1)
    .map((r, i) => ({
      sl:r[0]||"",cn:r[1]||"",pt:r[2]||"",adv:r[3]||"",
      dreg:r[4]||"",nxt:r[5]||"",pur:r[6]||"",sec:r[7]||"",
      sta:r[8]||"",fn:r[9]||"",nat:r[10]||"",des:r[11]||"",
      ri:i+2,
    }))
    .filter(r => r.fn || r.cn);

  const dr2 = await sheetsGet(tok, SID.disposal, "Sheet1!A:L");
  const disp = dr2.slice(1)
    .map((r, i) => ({
      sl:r[0]||"",cn:r[1]||"",pt:r[2]||"",adv:r[3]||"",
      dreg:r[4]||"",ddec:r[5]||"",dnat:r[6]||"",sec:r[7]||"",
      sta:r[8]||"",fn:r[9]||"",nat:r[10]||"",des:r[11]||"",
      ri:i+2,
    }))
    .filter(r => r.fn || r.cn);

  const nr = await sheetsGet(tok, SID.nonval, "Sheet1!A:G");
  const nv = nr.slice(1)
    .map((r, i) => ({
      sno:r[0]||"",cn:r[1]||"",fn:r[2]||"",rp:r[3]||"",
      sta:r[4]||"",desc:r[5]||"",rem:r[6]||"",
      ri:i+2,
    }))
    .filter(r => r.fn || r.cn);

  const cnr = await sheetsGet(tok, SID.casenum, "Sheet1!A:M");
  const cnum = cnr.slice(1)
    .map((r, i) => ({
      fn:r[0]||"",sta:r[1]||"",sec:r[2]||"",dr:r[3]||"",
      cn:r[4]||"",pt:r[5]||"",adv:r[6]||"",dreg:r[7]||"",
      nxt:r[8]||"",type:r[9]||"",sec2:r[10]||"",nat:r[11]||"",des:r[12]||"",
      ri:i+2,
    }))
    .filter(r => r.fn || r.cn);

  return { fir, pend, disp, nv, cnum };
}

/* ═══════════════════════════════════════════════
   CSS — fixed: removed CSS var references from
   inline style objects, added mobile breakpoints
═══════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Crimson+Pro:wght@400;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --gold:#C9A84C;--gold-l:#F0D07A;--gold-d:#8B6914;
  --bg:#0d1117;--bg2:#161b22;--bg3:#21262d;
  --bdr:#30363d;--txt:#e6edf3;--txt2:#8b949e;--txt3:#6e7681;
  --grn:#3fb950;--red:#f85149;--blu:#58a6ff;--pur:#bc8cff;
  --r:8px;--rl:12px;
}
html{-webkit-text-size-adjust:100%}
body{background:var(--bg);color:var(--txt);font-family:'Crimson Pro',Georgia,serif;font-size:14px;min-height:100vh}
.mono{font-family:'JetBrains Mono',monospace}

/* layout */
.app{display:flex;flex-direction:column;min-height:100vh}
.hdr{background:var(--bg2);border-bottom:2px solid var(--gold-d);padding:10px 16px;display:flex;align-items:center;gap:10px;position:sticky;top:0;z-index:200}
.hdr-logo{font-size:15px;font-weight:700;color:var(--gold);letter-spacing:.5px;font-family:'Crimson Pro',serif;white-space:nowrap}
.hdr-sub{font-size:9px;color:var(--txt3);margin-top:1px;font-family:'JetBrains Mono',monospace;white-space:nowrap}
.auth-area{margin-left:auto;display:flex;align-items:center;gap:6px;flex-shrink:0}

/* tabs */
.tabs{display:flex;background:var(--bg2);border-bottom:1px solid var(--bdr);padding:0 8px;overflow-x:auto;gap:2px;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.tabs::-webkit-scrollbar{display:none}
.tab{padding:9px 12px;font-size:11px;cursor:pointer;border-bottom:2px solid transparent;color:var(--txt2);white-space:nowrap;transition:color .15s;font-family:'JetBrains Mono',monospace;flex-shrink:0}
.tab:hover{color:var(--txt)}
.tab.act{color:var(--gold);border-bottom-color:var(--gold)}
.pane{padding:12px;max-width:1200px;margin:0 auto;width:100%}

/* card */
.card{background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--rl);padding:14px;margin-bottom:12px}
.ctitle{font-size:10px;font-weight:700;color:var(--gold);margin-bottom:12px;display:flex;align-items:center;gap:6px;text-transform:uppercase;letter-spacing:.7px;font-family:'JetBrains Mono',monospace;flex-wrap:wrap}

/* form */
.fg{display:flex;flex-direction:column;gap:3px;min-width:0}
.lbl{font-size:10px;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px;font-family:'JetBrains Mono',monospace}
.inp{background:var(--bg3);border:1px solid var(--bdr);border-radius:6px;color:var(--txt);padding:7px 10px;font-size:13px;outline:none;width:100%;transition:border-color .15s;font-family:'Crimson Pro',serif;-webkit-appearance:none;appearance:none}
.inp:focus{border-color:var(--gold)}
select.inp{cursor:pointer}
.frow{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:10px}

/* buttons */
.btn{padding:8px 16px;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer;border:none;transition:all .15s;font-family:'JetBrains Mono',monospace;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
.btn-g{background:var(--gold);color:#000}.btn-g:hover{background:var(--gold-l)}
.btn-g:disabled{opacity:.4;cursor:not-allowed}
.btn-o{background:transparent;border:1px solid var(--bdr);color:var(--txt2)}.btn-o:hover{border-color:var(--gold);color:var(--gold)}
.btn-r{background:transparent;border:1px solid var(--red);color:var(--red)}.btn-r:hover{background:var(--red);color:#fff}
.btn-sm{padding:5px 10px;font-size:11px}

/* yr ctrl */
.yr-ctrl{display:inline-flex;align-items:center;gap:6px;background:var(--bg3);border:1px solid var(--gold-d);border-radius:6px;padding:6px 10px}
.yr-val{font-size:13px;font-weight:700;color:var(--gold);min-width:36px;text-align:center;font-family:'JetBrains Mono',monospace}
.rst{font-size:10px;color:var(--txt3);cursor:pointer;text-decoration:underline;margin-left:4px}

/* messages */
.msg-ok{background:rgba(63,185,80,.1);border:1px solid var(--grn);color:var(--grn);padding:8px 10px;border-radius:6px;font-size:12px;margin-top:8px}
.msg-err{background:rgba(248,81,73,.1);border:1px solid var(--red);color:var(--red);padding:8px 10px;border-radius:6px;font-size:12px;margin-top:8px}
.msg-info{background:rgba(88,166,255,.1);border:1px solid var(--blu);color:var(--blu);padding:8px 10px;border-radius:6px;font-size:12px;margin-top:8px}
.spin-wrap{display:flex;align-items:center;gap:8px;color:var(--txt2);font-size:12px;padding:20px 0;justify-content:center}
@keyframes sp{to{transform:rotate(360deg)}}
.spin{width:16px;height:16px;border:2px solid var(--bdr);border-top-color:var(--gold);border-radius:50%;animation:sp .7s linear infinite;flex-shrink:0}

/* tables */
.tbl-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
table{width:100%;border-collapse:collapse;font-size:12px}
th{background:var(--bg3);color:var(--gold);padding:7px 8px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.4px;border-bottom:1px solid var(--bdr);white-space:nowrap;font-family:'JetBrains Mono',monospace}
td{padding:6px 8px;border-bottom:1px solid rgba(48,54,61,.5);color:var(--txt);vertical-align:top}
tr:hover td{background:rgba(201,168,76,.04)}

/* badges */
.bdg{padding:2px 7px;border-radius:10px;font-size:10px;font-weight:700;white-space:nowrap;display:inline-block;font-family:'JetBrains Mono',monospace}
.bdg-g{background:rgba(63,185,80,.15);color:var(--grn)}
.bdg-a{background:rgba(201,168,76,.15);color:var(--gold)}
.bdg-b{background:rgba(88,166,255,.15);color:var(--blu)}
.bdg-r{background:rgba(248,81,73,.15);color:var(--red)}
.bdg-p{background:rgba(188,140,255,.15);color:var(--pur)}

/* dot */
.dot{width:7px;height:7px;border-radius:50%;background:var(--red);flex-shrink:0}
.dot.on{background:var(--grn)}

/* stat grid */
.stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;margin-bottom:12px}
.stat{background:var(--bg3);border:1px solid var(--bdr);border-radius:var(--r);padding:12px;cursor:pointer;transition:border-color .15s}
.stat:hover{border-color:var(--gold-d)}
.stat.active-st{border-color:var(--gold)}
.stat-lbl{font-size:9px;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px;font-family:'JetBrains Mono',monospace}
.stat-val{font-size:20px;font-weight:700;color:var(--gold);font-family:'JetBrains Mono',monospace}
.stat-sub{font-size:10px;color:var(--txt3);margin-top:2px}

/* viewer */
.v-search-box{background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--rl);padding:14px;margin-bottom:12px}
.v-inputs{display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap}
.v-station-pills{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}
.st-pill{display:inline-flex;align-items:center;gap:7px;padding:6px 12px;border-radius:20px;font-size:11px;font-weight:700;cursor:pointer;border:1.5px solid var(--bdr);background:var(--bg3);color:var(--txt2);transition:all .18s;user-select:none;font-family:'JetBrains Mono',monospace;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
.st-pill:hover{border-color:var(--gold-d);color:var(--txt)}
.st-pill.active{border-color:var(--gold);background:rgba(201,168,76,.1);color:var(--gold)}
.st-count{background:rgba(201,168,76,.25);color:var(--gold);border-radius:8px;padding:1px 7px;font-size:10px;font-weight:700}
.st-pill.active .st-count{background:var(--gold);color:#000}
.v-panel{background:var(--bg3);border:1px solid var(--gold-d);border-radius:var(--rl);padding:12px;margin-bottom:10px}
.v-sheet-sec{margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--bdr)}
.v-sheet-sec:last-child{margin-bottom:0;padding-bottom:0;border-bottom:none}
.v-fir-row{background:rgba(248,81,73,.06);border:1px solid rgba(248,81,73,.25);border-radius:6px;padding:10px;margin-bottom:6px}
.cn-pill{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;border:1.5px solid var(--bdr);background:var(--bg2);color:var(--txt2);transition:all .15s;user-select:none;font-family:'JetBrains Mono',monospace;touch-action:manipulation}
.cn-pill:hover{border-color:var(--blu);color:var(--blu)}
.cn-pill.active{border-color:var(--gold);background:rgba(201,168,76,.08);color:var(--gold)}
.v-det{background:var(--bg);border:1px solid var(--gold-d);border-radius:var(--r);padding:12px;margin-top:10px}
.det-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px}
.df-lbl{font-size:9px;color:var(--txt3);margin-bottom:2px;text-transform:uppercase;letter-spacing:.4px;font-family:'JetBrains Mono',monospace}
.df-val{font-size:13px;color:var(--txt);word-break:break-word}
.df-val.hi{color:var(--gold);font-weight:700}

/* numpad */
.numpad{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;width:100%;max-width:180px}
.np{background:var(--bg3);border:1px solid var(--bdr);border-radius:6px;padding:12px 8px;font-size:15px;cursor:pointer;text-align:center;color:var(--txt);transition:all .15s;font-family:'JetBrains Mono',monospace;touch-action:manipulation;-webkit-tap-highlight-color:transparent;user-select:none}
.np:hover,.np:active{border-color:var(--gold);color:var(--gold)}
.np.w2{grid-column:span 2}
.numpad-row{display:flex;gap:20px;flex-wrap:wrap}

/* ftc steps */
.step-row{display:flex;align-items:center;gap:4px;margin-bottom:14px}
.step-dot{width:24px;height:24px;border-radius:50%;border:2px solid var(--bdr);display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--txt3);flex-shrink:0;font-family:'JetBrains Mono',monospace}
.step-dot.act{border-color:var(--gold);color:var(--gold)}
.step-dot.done{background:var(--gold);border-color:var(--gold);color:#000;font-weight:700}
.step-line{flex:1;height:1px;background:var(--bdr)}
.case-sel{background:var(--bg3);border:1px solid var(--bdr);border-radius:6px;padding:10px 12px;cursor:pointer;display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:6px;transition:all .15s;touch-action:manipulation}
.case-sel:hover,.case-sel.sel{border-color:var(--gold);background:rgba(201,168,76,.07)}
.warn-box{background:rgba(248,81,73,.07);border:1px solid rgba(248,81,73,.3);border-radius:6px;padding:10px;font-size:12px;color:var(--red);margin-bottom:10px}

/* confirm box in FTCTab step 3 — uses class instead of inline var() */
.confirm-box{background:var(--bg3);border:1px solid var(--bdr);border-radius:var(--r);padding:14px;margin-bottom:10px}

/* abstract */
.abs-tbl{width:100%;border-collapse:collapse;font-size:12px}
.abs-tbl th{background:var(--bg3);color:var(--gold);padding:7px 8px;text-align:left;font-size:10px;border:1px solid var(--bdr);font-family:'JetBrains Mono',monospace}
.abs-tbl td{padding:7px 8px;border:1px solid var(--bdr);color:var(--txt)}
.abs-tbl tr:nth-child(even) td{background:rgba(255,255,255,.02)}
.tot-row td{background:rgba(201,168,76,.09)!important;color:var(--gold);font-weight:700}
.no-data{text-align:center;padding:28px;color:var(--txt3);font-size:13px}
.yr-badge{display:inline-block;background:rgba(201,168,76,.15);color:var(--gold);padding:1px 6px;border-radius:4px;font-size:10px;font-family:'JetBrains Mono',monospace;margin-left:4px}
.abs-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}

/* ── Mobile breakpoints ── */
@media(max-width:600px){
  .hdr{padding:8px 10px;gap:8px}
  .hdr-logo{font-size:13px}
  .hdr-sub{display:none}
  .pane{padding:8px}
  .card{padding:10px;margin-bottom:10px}
  .frow{grid-template-columns:1fr 1fr;gap:8px}
  .v-inputs{flex-direction:column;align-items:stretch}
  .v-inputs .btn{width:100%}
  .det-grid{grid-template-columns:1fr 1fr}
  .stat-grid{grid-template-columns:repeat(2,1fr)}
  .abs-grid{grid-template-columns:1fr}
  .numpad-row{flex-direction:column;gap:12px}
  .numpad{max-width:100%}
  .np{padding:14px 8px;font-size:16px}
  .btn{padding:10px 14px;font-size:12px}
  table{font-size:11px}
  th,td{padding:5px 6px}
}
@media(max-width:380px){
  .frow{grid-template-columns:1fr}
  .det-grid{grid-template-columns:1fr}
  .stat-grid{grid-template-columns:1fr 1fr}
}
`;

/* ═══════════════════════════════════════════════
   MAIN APP COMPONENT
═══════════════════════════════════════════════ */
export default function App() {
  const [tok, setTok] = useState(() => {
    try { return localStorage.getItem("goog_tok") || null; } catch { return null; }
  });
  const [tokExpiry, setTokExpiry] = useState(() => {
    try { return Number(localStorage.getItem("goog_tok_exp")) || 0; } catch { return 0; }
  });
  const [db, setDb] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("entry");

  /* inject CSS once */
  useEffect(() => {
    if (!document.getElementById("fir-css")) {
      const s = document.createElement("style");
      s.id = "fir-css"; s.textContent = CSS;
      document.head.appendChild(s);
    }
    // Ensure viewport meta exists
    if (!document.querySelector('meta[name="viewport"]')) {
      const m = document.createElement("meta");
      m.name = "viewport";
      m.content = "width=device-width, initial-scale=1, maximum-scale=1";
      document.head.appendChild(m);
    }
  }, []);

  useEffect(() => {
    if (tok && !db && !loading) fetchAll(tok);
  }, [tok]);

  useEffect(() => {
    if (!tokExpiry) return;
    const msLeft = tokExpiry - Date.now() - 5 * 60 * 1000;
    if (msLeft <= 0) { refreshToken(); return; }
    const t = setTimeout(refreshToken, msLeft);
    return () => clearTimeout(t);
  }, [tokExpiry]);

  function refreshToken() {
    if (!window.google) return;
    window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID, scope: SCOPE,
      callback: (r) => {
        if (r.access_token) {
          const exp = Date.now() + (r.expires_in || 3600) * 1000;
          try {
            localStorage.setItem("goog_tok", r.access_token);
            localStorage.setItem("goog_tok_exp", String(exp));
          } catch {}
          setTok(r.access_token); setTokExpiry(exp);
        }
      },
      prompt: "",
    }).requestAccessToken();
  }

  function signIn() {
    const load = () => {
      window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID, scope: SCOPE,
        callback: (r) => {
          if (r.access_token) {
            const exp = Date.now() + (r.expires_in || 3600) * 1000;
            try {
              localStorage.setItem("goog_tok", r.access_token);
              localStorage.setItem("goog_tok_exp", String(exp));
            } catch {}
            setTok(r.access_token); setTokExpiry(exp);
          }
        },
      }).requestAccessToken();
    };
    if (!window.google) {
      const sc = document.createElement("script");
      sc.src = "https://accounts.google.com/gsi/client";
      sc.onload = load;
      document.head.appendChild(sc);
    } else load();
  }

  function signOut() {
    try {
      localStorage.removeItem("goog_tok");
      localStorage.removeItem("goog_tok_exp");
    } catch {}
    setTok(null); setTokExpiry(0); setDb(null);
  }

  async function fetchAll(token) {
    setLoading(true);
    try {
      const data = await loadAllData(token);
      setDb(data);
    } catch (e) {
      console.error("Load error:", e);
    }
    setLoading(false);
  }

  const tabs = [
    { id:"entry",    label:"📝 FIR Entry" },
    { id:"viewer",   label:"🔍 Viewer" },
    { id:"ftc",      label:"📁 FIR→Case" },
    { id:"abstract", label:"📊 Abstract" },
  ];

  return (
    <div className="app">
      {/* Header */}
      <div className="hdr">
        <div>
          <div className="hdr-logo">⚖ FIR Management</div>
          <div className="hdr-sub">Jayankondam Sub-Division · Police Records</div>
        </div>
        <div className="auth-area">
          <div className={`dot ${tok ? "on" : ""}`}/>
          <span style={{fontSize:10,color:"var(--txt3)"}}>
            {tok ? "Connected" : "Offline"}
          </span>
          {tok
            ? <button className="btn btn-o btn-sm" onClick={signOut}>Sign Out</button>
            : <button className="btn btn-g btn-sm" onClick={signIn}>Sign In</button>
          }
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map(t => (
          <div key={t.id} className={`tab ${activeTab===t.id?"act":""}`}
               onClick={() => setActiveTab(t.id)}>{t.label}</div>
        ))}
      </div>

      {/* Content */}
      <div className="pane">
        {!tok ? (
          <AuthPrompt onSignIn={signIn}/>
        ) : loading ? (
          <div className="spin-wrap"><div className="spin"/><span>Loading data from Google Sheets…</span></div>
        ) : !db ? (
          <div className="msg-err">Failed to load data. Check network / permissions.</div>
        ) : (
          <>
            {activeTab==="entry"    && <EntryTab    db={db} setDb={setDb} tok={tok}/>}
            {activeTab==="viewer"   && <ViewerTab   db={db}/>}
            {activeTab==="ftc"      && <FTCTab      db={db} setDb={setDb} tok={tok}/>}
            {activeTab==="abstract" && <AbstractTab db={db}/>}
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   AUTH PROMPT
═══════════════════════════════════════════════ */
function AuthPrompt({ onSignIn }) {
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14,padding:"50px 20px",textAlign:"center"}}>
      <div style={{fontSize:32}}>🔐</div>
      <div style={{fontSize:16,fontWeight:700,color:"var(--gold)"}}>Authentication Required</div>
      <div style={{fontSize:13,color:"var(--txt2)",maxWidth:360}}>
        Sign in with Google to access FIR records. Your session will be remembered across refreshes.
      </div>
      <button className="btn btn-g" onClick={onSignIn}>Sign in with Google</button>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   FIR ENTRY TAB
═══════════════════════════════════════════════ */
function EntryTab({ db, setDb, tok }) {
  const curYr = String(new Date().getFullYear());
  const [fn, setFn] = useState("");
  const [yr, setYr] = useState(curYr);
  const [st, setSt] = useState("JKM");
  const [uns, setUns] = useState("");
  const [dt, setDt] = useState("");
  const [msg, setMsg] = useState(null);

  const stObj = SMAP.find(s => s.sh === st);
  const recent = (db.fir[st] || []).slice(-3).reverse();

  async function save() {
    if (!fn || !uns || !dt) {
      setMsg({ type:"err", text:"FIR Number, Section U/s, and Date are required." });
      return;
    }
    const cr = `${fn}/${yr}`;
    const rows = db.fir[st] || [];
    const nextSl = rows.length ? Math.max(...rows.map(r => parseInt(r.sl, 10) || 0)) + 1 : 1;
    setMsg({ type:"loading", text:"Saving…" });
    const ok = await sheetsAppend(tok, SID.fir, `${st}!A:D`, [[nextSl, cr, uns, dt]]);
    if (ok) {
      const newRow = { sl: String(nextSl), cr, sec: uns, dr: dt, yr, ri: 999999 };
      setDb(prev => ({ ...prev, fir: { ...prev.fir, [st]: [...(prev.fir[st]||[]), newRow] } }));
      setMsg({ type:"ok", text:`✓ FIR ${cr} saved to ${stObj?.lb}.` });
      setFn(""); setUns(""); setDt("");
    } else {
      setMsg({ type:"err", text:"Save failed. Check permissions." });
    }
  }

  return (
    <div>
      <div className="card">
        <div className="ctitle">📝 New FIR Entry</div>
        <div className="frow">
          <div className="fg">
            <label className="lbl">FIR Number</label>
            <input className="inp mono" type="tel" inputMode="numeric"
              value={fn} onChange={e=>setFn(e.target.value)} placeholder="e.g. 123"/>
          </div>
          <div className="fg">
            <label className="lbl">Year</label>
            <div className="yr-ctrl">
              <button className="btn btn-o btn-sm" onClick={()=>setYr(y=>String(parseInt(y)-1))}>◀</button>
              <span className="yr-val">{yr}</span>
              <button className="btn btn-o btn-sm" onClick={()=>setYr(y=>String(parseInt(y)+1))}>▶</button>
              {yr!==curYr && <span className="rst" onClick={()=>setYr(curYr)}>reset</span>}
            </div>
          </div>
          <div className="fg">
            <label className="lbl">Police Station</label>
            <select className="inp" value={st} onChange={e=>setSt(e.target.value)}>
              {SMAP.map(s=><option key={s.sh} value={s.sh}>{s.lb}</option>)}
            </select>
          </div>
        </div>
        <div className="frow">
          <div className="fg" style={{gridColumn:"1/-1"}}>
            <label className="lbl">Section U/s</label>
            <input className="inp" type="text" value={uns} onChange={e=>setUns(e.target.value)}
              placeholder="e.g. 323, 307 IPC"/>
          </div>
        </div>
        <div className="frow">
          <div className="fg">
            <label className="lbl">Date Received (DD.MM.YYYY)</label>
            <input className="inp mono" type="tel" inputMode="numeric" value={dt}
              onChange={e=>setDt(e.target.value)} placeholder="27.05.2026"/>
          </div>
        </div>
        <div style={{display:"flex",gap:8,marginTop:6,flexWrap:"wrap"}}>
          <button className="btn btn-g" onClick={save}>💾 Save FIR Entry</button>
          <button className="btn btn-o" onClick={()=>{setFn("");setUns("");setDt("");setMsg(null);}}>Clear</button>
        </div>
        {msg && (
          <div className={msg.type==="ok"?"msg-ok":msg.type==="err"?"msg-err":"msg-info"} style={{marginTop:8}}>
            {msg.type==="loading" && <span className="spin" style={{display:"inline-block",marginRight:6}}/>}
            {msg.text}
          </div>
        )}
      </div>

      {/* Numpads */}
      <div className="card">
        <div className="ctitle">🔢 Numeric Input Pads</div>
        <div className="numpad-row">
          <NumPad label="FIR Number" value={fn} onChange={setFn} maxLen={6}/>
          <NumPad label="Date (DD.MM.YYYY)" value={dt} onChange={setDt} maxLen={10} withDot/>
        </div>
      </div>

      {/* Recent */}
      {recent.length > 0 && (
        <div className="card">
          <div className="ctitle">🕐 Recent FIRs — {stObj?.lb}</div>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>Sl</th><th>CR No.</th><th>Section U/s</th><th>Date Received</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r,i)=>(
                  <tr key={i}>
                    <td className="mono">{r.sl}</td>
                    <td className="mono" style={{color:"var(--gold)"}}>{r.cr}</td>
                    <td>{r.sec}</td>
                    <td className="mono">{r.dr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function NumPad({ label, value, onChange, maxLen=6, withDot=false }) {
  function tap(ch) {
    if (value.length >= maxLen) return;
    onChange(value + ch);
  }
  function bs() { onChange(value.slice(0,-1)); }
  function dot() {
    if (value.endsWith(".") || !value.length) return;
    onChange(value + ".");
  }
  const nums = [1,2,3,4,5,6,7,8,9];
  return (
    <div style={{flex:"1 1 140px",minWidth:0}}>
      <div className="lbl" style={{marginBottom:6}}>{label}</div>
      <div style={{
        background:"var(--bg3)",border:"1px solid var(--bdr)",borderRadius:6,
        padding:"6px 8px",marginBottom:6,fontFamily:"JetBrains Mono,monospace",
        fontSize:14,color:"var(--gold)",minHeight:32,letterSpacing:1
      }}>
        {value || <span style={{color:"var(--txt3)"}}>—</span>}
      </div>
      <div className="numpad">
        {nums.map(n=><div key={n} className="np" onClick={()=>tap(String(n))}>{n}</div>)}
        <div className="np" onClick={()=>tap("0")}>0</div>
        {withDot
          ? <><div className="np" onClick={dot}>.</div><div className="np" onClick={bs}>⌫</div></>
          : <div className="np w2" onClick={bs}>⌫</div>
        }
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   FIR VIEWER TAB
═══════════════════════════════════════════════ */
function ViewerTab({ db }) {
  const [fn, setFn] = useState("");
  const [yr, setYr] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [activeStation, setActiveStation] = useState(null);
  const [activeCaseId, setActiveCaseId] = useState(null);
  const [debugLog, setDebugLog] = useState([]);
  const [showDebug, setShowDebug] = useState(false);

  function search() {
    if (!fn.trim()) return;
    const searchNum = String(parseInt(fn.trim(), 10) || fn.trim());
    const searchYr = yr.trim();
    const log = [`Search: num="${searchNum}" yr="${searchYr}"`];
    const res = [];

    for (const s of SMAP) {
      const firRows = (db.fir[s.sh]||[]).filter(r => {
        const m = firMatch(r.cr, searchNum, searchYr);
        if (m) log.push(`FIR HIT [${s.sh}] cr="${r.cr}"`);
        return m;
      });
      const pendRows = db.pend.filter(r => {
        const fm = firMatch(r.fn, searchNum, searchYr);
        const sm = stMatch(r.sta, s);
        if (fm) log.push(`PEND fn="${r.fn}" sta="${r.sta}" stMatch=${sm}`);
        return fm && sm;
      });
      const dispRows = db.disp.filter(r => {
        const fm = firMatch(r.fn, searchNum, searchYr);
        const sm = stMatch(r.sta, s);
        if (fm) log.push(`DISP fn="${r.fn}" sta="${r.sta}" stMatch=${sm}`);
        return fm && sm;
      });
      const nvRows = db.nv.filter(r => {
        const fm = firMatch(r.fn, searchNum, searchYr);
        const sm = stMatch(r.sta, s);
        if (fm) log.push(`NV fn="${r.fn}" sta="${r.sta}" stMatch=${sm}`);
        return fm && sm;
      });
      const cnRows = db.cnum.filter(r => {
        const fm = firMatch(r.fn, searchNum, searchYr);
        const sm = stMatch(r.sta, s);
        if (fm) log.push(`CNUM fn="${r.fn}" sta="${r.sta}" stMatch=${sm}`);
        return fm && sm;
      });
      const total = firRows.length+pendRows.length+dispRows.length+nvRows.length+cnRows.length;
      if (total) res.push({s,firRows,pendRows,dispRows,nvRows,cnRows,total});
    }

    log.push(`Stations with hits: ${res.length}`);
    setDebugLog(log);
    setResults(res);
    setSearched(true);
    setActiveStation(res.length === 1 ? 0 : null);
    setActiveCaseId(null);
  }

  const displayFIR = yr ? `${fn}/${yr}` : fn;

  return (
    <div>
      <div className="v-search-box">
        <div className="ctitle">🔍 FIR Search</div>
        <div className="v-inputs">
          <div className="fg" style={{flex:"1 1 100px"}}>
            <label className="lbl">FIR Number</label>
            <input className="inp mono" type="tel" inputMode="numeric"
              value={fn} onChange={e=>setFn(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&search()}
              placeholder="e.g. 12"/>
          </div>
          <div className="fg" style={{flex:"1 1 80px"}}>
            <label className="lbl">Year (optional)</label>
            <input className="inp mono" type="tel" inputMode="numeric"
              value={yr} onChange={e=>setYr(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&search()}
              placeholder="2026"/>
          </div>
          <div style={{display:"flex",gap:6,flexShrink:0}}>
            <button className="btn btn-g" style={{height:36}} onClick={search}>Search</button>
            <button className="btn btn-o btn-sm" style={{height:36}}
              onClick={()=>{setFn("");setYr("");setResults([]);setSearched(false);}}>✕</button>
          </div>
        </div>
        {fn && (
          <div style={{fontSize:11,color:"var(--txt3)",marginTop:8}}>
            Searching: <b style={{color:"var(--gold)"}}>{yr?`${fn}/${yr}`:fn}</b>
            {!yr && <span> (all years)</span>}
          </div>
        )}
      </div>

      {searched && results.length===0 && (
        <div style={{textAlign:"center",padding:"28px 20px"}}>
          <div style={{fontSize:22,marginBottom:8}}>🔍</div>
          <div style={{fontSize:13,fontWeight:600,color:"var(--txt2)",marginBottom:4}}>
            No records found for <span style={{color:"var(--gold)"}}>{displayFIR}</span>
          </div>
          <div style={{fontSize:11,color:"var(--txt3)",marginBottom:12}}>
            Searched across all 6 stations and 4 registers
          </div>
          <button className="btn btn-o btn-sm" onClick={()=>setShowDebug(d=>!d)}>
            🔧 {showDebug?"Hide":"Show"} debug log
          </button>
          {showDebug && (
            <pre style={{marginTop:10,fontSize:10,color:"var(--txt3)",textAlign:"left",
              background:"var(--bg3)",padding:10,borderRadius:6,overflowX:"auto"}}>
              {debugLog.join("\n")}
            </pre>
          )}
        </div>
      )}

      {results.length > 0 && (
        <>
          <div style={{marginBottom:12}}>
            <div className="lbl" style={{marginBottom:8}}>
              Found in {results.length} station{results.length>1?"s":""} — tap to view
            </div>
            <div className="v-station-pills">
              {results.map((sr,i)=>(
                <div key={i} className={`st-pill ${activeStation===i?"active":""}`}
                     onClick={()=>{setActiveStation(activeStation===i?null:i);setActiveCaseId(null);}}>
                  {sr.s.lb}
                  <span className="st-count">{sr.total}</span>
                </div>
              ))}
            </div>
          </div>

          {activeStation!==null && results[activeStation] && (
            <StationPanel
              sr={results[activeStation]}
              displayFIR={displayFIR}
              activeCaseId={activeCaseId}
              setActiveCaseId={setActiveCaseId}
            />
          )}
        </>
      )}
    </div>
  );
}

function StationPanel({ sr, displayFIR, activeCaseId, setActiveCaseId }) {
  const {s,firRows,pendRows,dispRows,nvRows,cnRows}=sr;
  return (
    <div className="v-panel">
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,flexWrap:"wrap"}}>
        <span style={{fontSize:14,fontWeight:700,color:"var(--gold)"}}>{s.lb}</span>
        <span style={{fontSize:11,color:"var(--txt3)"}}>·</span>
        <span style={{fontSize:12,color:"var(--txt2)"}}>
          FIR <b style={{color:"var(--gold)"}}>{displayFIR}</b>
        </span>
        {firRows.length>0 && <span className="bdg bdg-r">📋 FIR Pending</span>}
        {pendRows.length>0 && <span className="bdg bdg-b">⚖ {pendRows.length} Pending</span>}
        {dispRows.length>0 && <span className="bdg bdg-g">✓ {dispRows.length} Disposed</span>}
        {nvRows.length>0   && <span className="bdg bdg-a">🏷 NV Property</span>}
        {cnRows.length>0   && <span className="bdg bdg-p">📁 Case Numbered</span>}
      </div>

      {firRows.length>0 && (
        <div className="v-sheet-sec">
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
            <span className="lbl">📋 FIR Pending Register</span>
            <span className="bdg bdg-r">{firRows.length}</span>
          </div>
          {firRows.map((r,i)=>(
            <div key={i} className="v-fir-row">
              <div className="det-grid">
                <div><div className="df-lbl">CR Number</div><div className="df-val hi mono">{r.cr}</div></div>
                <div><div className="df-lbl">Section U/s</div><div className="df-val">{r.sec}</div></div>
                <div><div className="df-lbl">Date Received</div><div className="df-val mono">{r.dr||"—"}</div></div>
                <div><div className="df-lbl">Year</div><div className="df-val mono">{r.yr||"—"}</div></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {pendRows.length>0 && (
        <CaseSection rows={pendRows} prefix="pend" title="⚖ Case Pending" bdg="bdg-b"
          activeCaseId={activeCaseId} setActiveCaseId={setActiveCaseId}/>
      )}
      {dispRows.length>0 && (
        <CaseSection rows={dispRows} prefix="disp" title="✅ Disposed Cases" bdg="bdg-g"
          activeCaseId={activeCaseId} setActiveCaseId={setActiveCaseId}/>
      )}
      {nvRows.length>0 && (
        <CaseSection rows={nvRows} prefix="nv" title="🏷 Non-Valuable Property" bdg="bdg-a"
          activeCaseId={activeCaseId} setActiveCaseId={setActiveCaseId}/>
      )}
      {cnRows.length>0 && (
        <CaseSection rows={cnRows} prefix="cnum" title="📁 Case Numbered" bdg="bdg-p"
          activeCaseId={activeCaseId} setActiveCaseId={setActiveCaseId}/>
      )}
    </div>
  );
}

function CaseSection({ rows, prefix, title, bdg, activeCaseId, setActiveCaseId }) {
  const makeId = (r,i) => `${prefix}::${r.ri}::${i}`;
  const ids = rows.map((r,i)=>makeId(r,i));
  const dispName = r => {
    if (r.cn&&r.cn.trim()) return r.cn.trim();
    if (r.rp&&r.rp.trim()) return "RP:"+r.rp.trim();
    return "#"+(r.sl||r.sno||r.ri);
  };
  const srcLabel = prefix==="pend"?"P":prefix==="disp"?"D":prefix==="nv"?"NV":"CN";
  const activeIdx = ids.indexOf(activeCaseId);
  const activeRow = activeIdx>=0 ? rows[activeIdx] : null;

  return (
    <div className="v-sheet-sec">
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
        <span className="lbl">{title}</span>
        <span className={`bdg ${bdg}`}>{rows.length}</span>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:6}}>
        {rows.map((r,i)=>{
          const id=ids[i];
          return (
            <div key={id} className={`cn-pill ${activeCaseId===id?"active":""}`}
                 onClick={()=>setActiveCaseId(activeCaseId===id?null:id)}>
              {dispName(r)}
              <span className={`bdg ${bdg}`} style={{fontSize:9,padding:"1px 4px"}}>{srcLabel}</span>
            </div>
          );
        })}
      </div>
      {activeRow && <CaseDetail r={activeRow} srcKey={prefix}/>}
    </div>
  );
}

function CaseDetail({ r, srcKey }) {
  const fields = {
    pend: [
      ["Case Number",r.cn,"hi mono"],["FIR Number",r.fn,"mono"],
      ["Parties",r.pt],["Advocate",r.adv],
      ["Date of Registration",r.dreg,"mono"],["Next Hearing",r.nxt,"mono"],
      ["Purpose",r.pur],["Section U/s",r.sec],
      ["Police Station",r.sta],["Nature",r.nat],["Designation",r.des],
    ],
    disp: [
      ["Case Number",r.cn,"hi mono"],["FIR Number",r.fn,"mono"],
      ["Parties",r.pt],["Advocate",r.adv],
      ["Date of Registration",r.dreg,"mono"],["Date of Decision",r.ddec,"mono"],
      ["Disposal Nature",r.dnat],["Section U/s",r.sec],
      ["Police Station",r.sta],["Nature",r.nat],
    ],
    nv: [
      ["RP Number",r.rp,"hi mono"],["Case Number",r.cn,"mono"],
      ["FIR Number",r.fn,"mono"],["Police Station",r.sta],
      ["Description",r.desc,null,true],["Remarks",r.rem,null,true],
    ],
    cnum: [
      ["Case Number",r.cn,"hi mono"],["FIR Number",r.fn,"mono"],
      ["Parties",r.pt],["Police Station",r.sta],
      ["Advocate",r.adv],["Date of Registration",r.dreg,"mono"],
      ["Next Date",r.nxt,"mono"],["Case Type",r.type],
      ["Section U/s (FIR)",r.sec],["Section (Case)",r.sec2],
      ["Nature",r.nat],["Designation",r.des],
    ],
  }[srcKey]||[];

  const bdgMap={pend:"bdg-b",disp:"bdg-g",nv:"bdg-a",cnum:"bdg-p"};
  const lbMap={pend:"Case Pending",disp:"Disposed",nv:"Non-Valuable Property",cnum:"Case Numbered"};

  return (
    <div className="v-det">
      <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:12}}>
        <span style={{fontSize:15,fontWeight:700,color:"var(--gold)",fontFamily:"JetBrains Mono,monospace"}}>
          {r.cn||r.rp||"—"}
        </span>
        <span className={`bdg ${bdgMap[srcKey]}`}>{lbMap[srcKey]}</span>
      </div>
      <div className="det-grid">
        {fields.map(([lbl,val,cls,full],i)=>(
          <div key={i} style={full?{gridColumn:"1/-1"}:{}}>
            <div className="df-lbl">{lbl}</div>
            <div className={`df-val ${cls||""}`}>{val||"—"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   FIR → CASE NUMBERED TAB
   FIX: replaced inline style `border-radius:var(--r)`
        with className="confirm-box" (defined in CSS)
═══════════════════════════════════════════════ */
function FTCTab({ db, setDb, tok }) {
  const curYr = String(new Date().getFullYear());
  const [step, setStep] = useState(1);
  const [fn, setFn] = useState("");
  const [yr, setYr] = useState(curYr);
  const [st, setSt] = useState("JKM");
  const [firRow, setFirRow] = useState(null);
  const [selCase, setSelCase] = useState(null);
  const [msg, setMsg] = useState(null);

  function reset() {
    setStep(1);setFn("");setYr(curYr);setSt("JKM");
    setFirRow(null);setSelCase(null);setMsg(null);
  }

  function search() {
    if (!fn) { setMsg({type:"err",text:"Enter FIR Number."}); return; }
    const searchNum = String(parseInt(fn,10)||fn);
    const rows = (db.fir[st]||[]).filter(r=>firMatch(r.cr,searchNum,yr));
    if (!rows.length) {
      setMsg({type:"err",text:`FIR ${fn}/${yr} not found in ${SMAP.find(s=>s.sh===st)?.lb}.`});
      return;
    }
    setFirRow(rows[0]); setStep(2); setMsg(null);
  }

  function buildCases() {
    const stObj = SMAP.find(x=>x.sh===st);
    const searchNum = String(parseInt(fn,10)||fn);
    return [
      ...db.pend.filter(c=>firMatch(c.fn,searchNum,yr)&&stMatch(c.sta,stObj)).map(c=>({...c,type:"pending"})),
      ...db.disp.filter(c=>firMatch(c.fn,searchNum,yr)&&stMatch(c.sta,stObj)).map(c=>({...c,type:"disposal"})),
    ];
  }

  async function execute() {
    setMsg({type:"loading",text:"Processing…"});
    const sc = selCase;
    const stLb = SMAP.find(x=>x.sh===st)?.lb||st;
    const row = [
      `${fn}/${yr}`,stLb,firRow?.sec||"",firRow?.dr||"",
      sc.cn||"",sc.pt||"",sc.adv||"",sc.dreg||"",
      sc.nxt||sc.ddec||"",sc.type||"",sc.sec||"",sc.nat||"",sc.des||""
    ];
    const saved = await sheetsAppend(tok,SID.casenum,"Sheet1!A:M",[row]);
    if (!saved) { setMsg({type:"err",text:"Failed to save to Case Numbered sheet."}); return; }
    if (firRow?.ri && firRow.ri!==999999) {
      await sheetsDeleteRow(tok,SID.fir,st,firRow.ri);
    }
    const idx=(db.fir[st]||[]).findIndex(r=>r.cr===firRow?.cr);
    if (idx>=0) {
      const newFir=[...(db.fir[st]||[])];
      newFir.splice(idx,1);
      setDb(prev=>({
        ...prev,
        fir:{...prev.fir,[st]:newFir},
        cnum:[...prev.cnum,{fn:`${fn}/${yr}`,sta:stLb,...sc}]
      }));
    }
    setMsg({type:"ok",text:`✓ FIR ${fn}/${yr} moved to Case Numbered.`});
    setTimeout(reset,1600);
  }

  const allCases = step>=2 ? buildCases() : [];
  const stLb = SMAP.find(x=>x.sh===st)?.lb||st;

  return (
    <div className="card">
      <div className="ctitle">📁 FIR → Case Numbered</div>
      {/* Steps indicator */}
      <div className="step-row">
        {[1,2,3].map((n,i)=>(
          <div key={n} style={{display:"flex",alignItems:"center",flex:i<2?"1":"initial",gap:4}}>
            <div className={`step-dot ${step>n?"done":step===n?"act":""}`}>{step>n?"✓":n}</div>
            {i<2 && <div className="step-line"/>}
          </div>
        ))}
      </div>

      {step===1 && (
        <div>
          <div style={{fontSize:11,color:"var(--txt3)",marginBottom:12}}>Step 1 — Enter FIR details</div>
          <div className="frow">
            <div className="fg">
              <label className="lbl">FIR Number</label>
              <input className="inp mono" type="tel" inputMode="numeric" value={fn}
                onChange={e=>setFn(e.target.value)} placeholder="e.g. 561"/>
            </div>
            <div className="fg">
              <label className="lbl">Year</label>
              <input className="inp mono" type="tel" inputMode="numeric" value={yr}
                onChange={e=>setYr(e.target.value)} placeholder={curYr}/>
            </div>
            <div className="fg">
              <label className="lbl">Police Station</label>
              <select className="inp" value={st} onChange={e=>setSt(e.target.value)}>
                {SMAP.map(s=><option key={s.sh} value={s.sh}>{s.lb}</option>)}
              </select>
            </div>
          </div>
          <button className="btn btn-g" onClick={search}>🔍 Search FIR</button>
        </div>
      )}

      {step===2 && (
        <div>
          <div style={{fontSize:11,color:"var(--txt3)",marginBottom:12}}>Step 2 — Select linked case</div>
          {firRow && (
            <div className="msg-info" style={{marginBottom:10}}>
              ✓ FIR {firRow.cr} — {firRow.sec} | Received: {firRow.dr}
            </div>
          )}
          <div style={{fontSize:11,color:"var(--txt2)",marginBottom:6}}>
            Matched cases ({allCases.length})
          </div>
          {allCases.length===0
            ? <div className="no-data">No pending/disposal cases found for this FIR.</div>
            : allCases.map((c,i)=>(
              <div key={i} className={`case-sel ${selCase?.cn===c.cn?"sel":""}`}
                   onClick={()=>setSelCase(c)}>
                <div>
                  <div style={{fontWeight:700,fontSize:13,fontFamily:"JetBrains Mono,monospace"}}>{c.cn}</div>
                  <div style={{color:"var(--txt2)",fontSize:12,marginTop:2}}>{c.pt}</div>
                  <div style={{color:"var(--txt3)",fontSize:11}}>{c.dreg||""}</div>
                </div>
                <span className={`bdg ${c.type==="pending"?"bdg-b":"bdg-g"}`}>
                  {c.type==="pending"?"Pending":"Disposed"}
                </span>
              </div>
            ))
          }
          <div style={{display:"flex",gap:8,marginTop:10}}>
            <button className="btn btn-o" onClick={()=>{setStep(1);setSelCase(null);}}>← Back</button>
            <button className="btn btn-g" disabled={!selCase} onClick={()=>setStep(3)}>Next →</button>
          </div>
        </div>
      )}

      {step===3 && (
        <div>
          <div style={{fontSize:11,color:"var(--txt3)",marginBottom:12}}>Step 3 — Confirm &amp; Execute</div>
          {/* FIX: was using border-radius:var(--r) inside inline style={{}}, now uses className */}
          <div className="confirm-box">
            <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:10}}>
              <span style={{fontSize:14,fontWeight:700,color:"var(--gold)",fontFamily:"JetBrains Mono,monospace"}}>
                FIR: {fn}/{yr}
              </span>
              <span className="bdg bdg-a">{stLb}</span>
              <span style={{color:"var(--txt2)"}}>→</span>
              <span className="bdg bdg-p">{selCase?.cn||"N/A"}</span>
            </div>
            <div className="det-grid">
              <div><div className="df-lbl">Section U/s</div><div className="df-val">{firRow?.sec||"—"}</div></div>
              <div><div className="df-lbl">Date Received</div><div className="df-val mono">{firRow?.dr||"—"}</div></div>
              <div><div className="df-lbl">Case Number</div>
                <div className="df-val mono" style={{color:"var(--pur)"}}>{selCase?.cn||"—"}</div>
              </div>
              <div><div className="df-lbl">Parties</div><div className="df-val">{selCase?.pt||"—"}</div></div>
              <div><div className="df-lbl">Advocate</div><div className="df-val">{selCase?.adv||"—"}</div></div>
              <div><div className="df-lbl">Date of Reg</div><div className="df-val mono">{selCase?.dreg||"—"}</div></div>
            </div>
          </div>
          <div className="warn-box">
            ⚠ This will delete FIR {fn}/{yr} from the "{st}" FIR sheet tab and save to Case Numbered sheet.
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <button className="btn btn-o" onClick={()=>setStep(2)}>← Back</button>
            <button className="btn btn-r" onClick={execute}>🗂 Move to Case Numbered</button>
          </div>
        </div>
      )}

      {msg && (
        <div className={msg.type==="ok"?"msg-ok":msg.type==="err"?"msg-err":"msg-info"} style={{marginTop:10}}>
          {msg.type==="loading"&&<span className="spin" style={{display:"inline-block",marginRight:6}}/>}
          {msg.text}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   ABSTRACT TAB
   FIX: removed border:var(--bdr) / borderRadius:var(--r)
        from inline style objects — moved to className
═══════════════════════════════════════════════ */
function AbstractTab({ db }) {
  const [filterSt, setFilterSt] = useState("ALL");
  const [filterYr, setFilterYr] = useState("ALL");

  const allFirs = [];
  for (const s of SMAP) {
    for (const r of (db.fir[s.sh]||[])) {
      allFirs.push({ ...r, stSh: s.sh, stLb: s.lb });
    }
  }

  const allYears = [...new Set(allFirs.map(r=>r.yr||parseFIR(r.cr).yr||"?"))].sort();

  const filtered = allFirs.filter(r=>{
    const rYr = r.yr||parseFIR(r.cr).yr||"?";
    const stOk = filterSt==="ALL" || r.stSh===filterSt;
    const yrOk = filterYr==="ALL" || rYr===filterYr;
    return stOk && yrOk;
  });

  const stTot = SMAP.map(s=>({
    sh:s.sh, lb:s.lb,
    cnt: filtered.filter(r=>r.stSh===s.sh).length
  }));
  const grand = filtered.length;

  const byYr={};
  for (const r of filtered) {
    const k=r.yr||parseFIR(r.cr).yr||"?";
    byYr[k]=(byYr[k]||0)+1;
  }
  const yrSort=Object.entries(byYr).sort((a,b)=>a[0].localeCompare(b[0]));

  const byMon={};
  for (const r of filtered) {
    if(r.dr){
      const pts=r.dr.split(".");
      if(pts.length>=3){const k=`${pts[2]}-${pts[1].padStart(2,"0")}`;byMon[k]=(byMon[k]||0)+1;}
    }
  }
  const monNames=["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monSort=Object.entries(byMon).sort((a,b)=>a[0].localeCompare(b[0]));

  const bySec={};
  for (const r of filtered) {const k=r.sec||"Unknown";bySec[k]=(bySec[k]||0)+1;}
  const secSort=Object.entries(bySec).sort((a,b)=>b[1]-a[1]);

  const byDay={};
  for(const r of filtered){if(r.dr){const k=r.dr;byDay[k]=(byDay[k]||0)+1;}}
  const daySort=Object.entries(byDay).sort((a,b)=>a[0].localeCompare(b[0])).slice(-20).reverse();

  return (
    <div>
      {/* Filters */}
      <div className="card" style={{marginBottom:12}}>
        <div className="ctitle">🔦 Filter Abstract Data</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <div className="fg" style={{flex:"1 1 140px"}}>
            <label className="lbl">Station</label>
            <select className="inp" value={filterSt} onChange={e=>setFilterSt(e.target.value)}>
              <option value="ALL">All Stations</option>
              {SMAP.map(s=><option key={s.sh} value={s.sh}>{s.lb}</option>)}
            </select>
          </div>
          <div className="fg" style={{flex:"1 1 90px"}}>
            <label className="lbl">Year</label>
            <select className="inp" value={filterYr} onChange={e=>setFilterYr(e.target.value)}>
              <option value="ALL">All Years</option>
              {allYears.map(y=><option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div style={{alignSelf:"flex-end"}}>
            <button className="btn btn-o btn-sm"
              onClick={()=>{setFilterSt("ALL");setFilterYr("ALL");}}>
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="stat-grid">
        <div className="stat">
          <div className="stat-lbl">Total Pending FIRs</div>
          <div className="stat-val">{grand}</div>
          <div className="stat-sub">
            {filterSt!=="ALL"||filterYr!=="ALL" ? "Filtered" : "All stations · All years"}
          </div>
        </div>
        {/* FIX: replaced inline border with borderColor JS property instead of CSS var string */}
        {stTot.filter(s=>s.cnt>0).map(s=>(
          <div key={s.sh}
               className={`stat ${filterSt===s.sh?"active-st":""}`}
               onClick={()=>setFilterSt(filterSt===s.sh?"ALL":s.sh)}>
            <div className="stat-lbl">{s.lb}</div>
            <div className="stat-val">{s.cnt}</div>
            <div className="stat-sub">pending FIRs</div>
          </div>
        ))}
      </div>

      <div className="abs-grid">
        {/* Station-wise table */}
        <div className="card">
          <div className="ctitle">📍 Station-wise Pending FIRs</div>
          <table className="abs-tbl">
            <thead><tr><th>Station</th><th>FIRs</th><th>%</th></tr></thead>
            <tbody>
              {stTot.map(s=>(
                <tr key={s.sh}>
                  <td>{s.lb}</td>
                  <td><b className="mono">{s.cnt}</b></td>
                  <td className="mono">{grand?((s.cnt/grand)*100).toFixed(1):0}%</td>
                </tr>
              ))}
              <tr className="tot-row">
                <td>Total</td><td><b className="mono">{grand}</b></td><td>100%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Year-wise */}
        <div className="card">
          <div className="ctitle">📅 Year-wise Pending FIRs</div>
          <div className="tbl-wrap">
            <table className="abs-tbl">
              <thead><tr><th>Year</th><th>Count</th><th>%</th></tr></thead>
              <tbody>
                {yrSort.map(([k,v])=>(
                  <tr key={k} style={{cursor:"pointer"}}
                      onClick={()=>setFilterYr(filterYr===k?"ALL":k)}>
                    <td><span className="yr-badge">{k}</span></td>
                    <td className="mono"><b>{v}</b></td>
                    <td className="mono">{grand?((v/grand)*100).toFixed(1):0}%</td>
                  </tr>
                ))}
                <tr className="tot-row">
                  <td>Total</td><td className="mono"><b>{grand}</b></td><td>100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Month-wise */}
        <div className="card">
          <div className="ctitle">📆 Month-wise (Date Received)</div>
          <div className="tbl-wrap">
            <table className="abs-tbl">
              <thead><tr><th>Month</th><th>Count</th></tr></thead>
              <tbody>
                {monSort.map(([k,v])=>{
                  const [my,mn]=k.split("-");
                  return(
                    <tr key={k}>
                      <td>{monNames[parseInt(mn)]||mn} {my}</td>
                      <td className="mono"><b>{v}</b></td>
                    </tr>
                  );
                })}
                <tr className="tot-row">
                  <td>Total</td>
                  <td className="mono"><b>{monSort.reduce((a,b)=>a+b[1],0)}</b></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section-wise */}
        <div className="card">
          <div className="ctitle">⚖ Section U/s — Top {Math.min(secSort.length,30)}</div>
          <div className="tbl-wrap">
            <table className="abs-tbl">
              <thead><tr><th>#</th><th>Section</th><th>Count</th></tr></thead>
              <tbody>
                {secSort.slice(0,30).map(([k,v],i)=>(
                  <tr key={k}>
                    <td className="mono" style={{color:"var(--txt3)"}}>{i+1}</td>
                    <td>{k}</td>
                    <td className="mono"><b>{v}</b></td>
                  </tr>
                ))}
                <tr className="tot-row">
                  <td colSpan={2}>Total</td>
                  <td className="mono"><b>{grand}</b></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent by date */}
        <div className="card">
          <div className="ctitle">📋 Date-wise (Recent 20 dates)</div>
          <div className="tbl-wrap">
            <table className="abs-tbl">
              <thead><tr><th>Date</th><th>Count</th></tr></thead>
              <tbody>
                {daySort.map(([k,v])=>(
                  <tr key={k}>
                    <td className="mono">{k}</td>
                    <td className="mono"><b>{v}</b></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Full FIR list */}
        <div className="card" style={{gridColumn:"1/-1"}}>
          <div className="ctitle">
            📋 FIR Pending List
            {filterSt!=="ALL" && (
              <span className="bdg bdg-a" style={{marginLeft:6}}>
                {SMAP.find(s=>s.sh===filterSt)?.lb}
              </span>
            )}
            {filterYr!=="ALL" && <span className="yr-badge">{filterYr}</span>}
            <span style={{marginLeft:"auto",fontWeight:400,color:"var(--txt3)",fontSize:10}}>
              {grand} records
            </span>
          </div>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>CR No.</th>
                  <th>Year</th>
                  <th>Station</th>
                  <th>Section U/s</th>
                  <th>Date Received</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r,i)=>(
                  <tr key={i}>
                    <td className="mono" style={{color:"var(--txt3)"}}>{r.sl}</td>
                    <td className="mono" style={{color:"var(--gold)",fontWeight:700}}>{r.cr}</td>
                    <td><span className="yr-badge">{r.yr||"?"}</span></td>
                    <td style={{color:"var(--txt2)"}}>{r.stLb}</td>
                    <td>{r.sec}</td>
                    <td className="mono">{r.dr||"—"}</td>
                  </tr>
                ))}
                {filtered.length===0 && (
                  <tr><td colSpan={6} className="no-data">No FIRs match the current filter.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
