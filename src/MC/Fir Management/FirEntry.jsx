import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════
   CONSTANTS (shared — import from a shared file
   in production, or duplicate as needed)
═══════════════════════════════════════════════ */
export const SMAP = [
  { sh:"JKM",     lb:"Jayankondam",      al:["jayankondam","jkm","jayankondam police station"] },
  { sh:"VKM",     lb:"Vikkiramangalam",  al:["vikkiramangalam","vikramangalam","vkm","venganam"] },
  { sh:"Sheet7",  lb:"VKM (Extra)",      al:["sheet7","vkm extra","vkm ps record"] },
  { sh:"T.PALUR", lb:"T.Palur",          al:["t.palur","tpalur","palur","t palur","t. palur","t.palur police"] },
  { sh:"PEW",     lb:"PEW Ariyalur",     al:["pew","pew ariyalur","nb cid","nb cid trichy"] },
  { sh:"AWPS",    lb:"AWPS Jayankondam", al:["awps","awps jayankondam","all women"] },
  { sh:"DCB",     lb:"DCB Ariyalur",     al:["dcb","dcb ariyalur","ariyalur dcb"] },
];

export const ACTS = [
  { id:"IPC",    label:"IPC",             short:"IPC" },
  { id:"BNS",    label:"BNS",             short:"BNS" },
  { id:"MMD",    label:"M&M(D&R) Act",    short:"M&M Act" },
  { id:"COTPA",  label:"COTPA Act",       short:"COTPA" },
  { id:"NDPS",   label:"NDPS Act",        short:"NDPS" },
  { id:"TNPHW",  label:"TNPHW Act",       short:"TNPHW" },
  { id:"MVA",    label:"MV Act",          short:"MVA" },
  { id:"PC",     label:"PC Act",          short:"PC Act" },
];

/* ═══════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════ */
export function isValidFIRCell(raw) {
  if (!raw && raw !== 0) return false;
  return /^\d+\/\d{4}$/.test(String(raw).trim());
}

export function parseFIR(raw) {
  if (!raw && raw !== 0) return { num: "", yr: "" };
  const s = String(raw).trim();
  const parts = s.split(/\s*\/\s*/);
  const num = String(parseInt(parts[0], 10) || 0);
  const yr = parts[1] ? parts[1].trim() : "";
  return { num, yr };
}

export function firMatch(raw, searchNum, searchYr) {
  if (!raw) return false;
  if (!isValidFIRCell(raw)) return false;
  const p = parseFIR(raw);
  if (p.num !== searchNum) return false;
  if (!searchYr) return true;
  if (!p.yr) return true;
  return p.yr === searchYr;
}

export function firSortKey(cr) {
  const p = parseFIR(cr);
  return parseInt(p.yr || "0", 10) * 1000000 + parseInt(p.num || "0", 10);
}

export function autoFormatDate(raw) {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return digits.slice(0,2) + "." + digits.slice(2);
  return digits.slice(0,2) + "." + digits.slice(2,4) + "." + digits.slice(4);
}

export function buildSectionString(groups) {
  if (!groups.length) return "";
  return groups.map((g, i) => {
    const secStr = g.sections.map(s => s.sub ? `${s.main}(${s.sub})` : s.main).join(", ");
    const actName = ACTS.find(a => a.id === g.actId)?.label || g.actId;
    const prefix = i === 0 ? "" : " r/w ";
    return `${prefix}${secStr} ${actName}`;
  }).join("");
}

/* ═══════════════════════════════════════════════
   SHEETS API UTILS (entry-specific)
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

async function sheetsUpdate(tok, sid, range, vals) {
  const r = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sid}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`,
    {
      method: "PUT",
      headers: { Authorization: `Bearer ${tok}`, "Content-Type": "application/json" },
      body: JSON.stringify({ values: vals }),
    }
  );
  return r.ok;
}

async function getSheetIdByName(tok, sid, tabName) {
  const m = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sid}?fields=sheets.properties`,
    { headers: { Authorization: `Bearer ${tok}` } }
  );
  if (!m.ok) return null;
  const meta = await m.json();
  const sh = (meta.sheets || []).find(s => s.properties.title === tabName);
  return sh ? sh.properties.sheetId : null;
}

async function sheetsDeleteRow(tok, sid, tabName, oneBasedRow) {
  const sheetId = await getSheetIdByName(tok, sid, tabName);
  if (sheetId === null) return false;
  const r = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sid}:batchUpdate`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${tok}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: [{ deleteDimension: { range: {
          sheetId,
          dimension: "ROWS",
          startIndex: oneBasedRow - 1,
          endIndex: oneBasedRow,
        }}}],
      }),
    }
  );
  return r.ok;
}

async function sheetsInsertRow(tok, sid, tabName, oneBasedRow) {
  const sheetId = await getSheetIdByName(tok, sid, tabName);
  if (sheetId === null) return false;
  const r = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sid}:batchUpdate`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${tok}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: [{ insertDimension: { range: {
          sheetId,
          dimension: "ROWS",
          startIndex: oneBasedRow - 1,
          endIndex: oneBasedRow,
        }, inheritFromBefore: false }}],
      }),
    }
  );
  return r.ok;
}

async function sheetsWriteRow(tok, sid, tabName, oneBasedRow, vals) {
  const range = `${tabName}!A${oneBasedRow}:D${oneBasedRow}`;
  return sheetsUpdate(tok, sid, range, [vals]);
}

/* ═══════════════════════════════════════════════
   SORTED INSERT + RENUMBER
═══════════════════════════════════════════════ */
export async function insertFIRSorted(tok, SID_fir, tabName, newCr, newSec, newDr, existingRows) {
  const allRows = [...existingRows, { cr: newCr, sec: newSec, dr: newDr, _new: true }];
  allRows.sort((a, b) => firSortKey(a.cr) - firSortKey(b.cr));

  const newIdx = allRows.findIndex(r => r._new);
  const rawRows = await sheetsGet(tok, SID_fir, `${tabName}!A:D`);

  let firstDataRow = 1;
  for (let i = 0; i < rawRows.length; i++) {
    const b = (rawRows[i][1] || "").toString().trim();
    if (isValidFIRCell(b)) { firstDataRow = i + 1; break; }
  }

  const insertSheetRow = firstDataRow + newIdx;
  const inserted = await sheetsInsertRow(tok, SID_fir, tabName, insertSheetRow);
  if (!inserted) return { ok: false, ri: -1 };

  await sheetsWriteRow(tok, SID_fir, tabName, insertSheetRow, [newIdx + 1, newCr, newSec, newDr]);

  const rawAfter = await sheetsGet(tok, SID_fir, `${tabName}!A:D`);
  let slCounter = 1;
  for (let i = 0; i < rawAfter.length; i++) {
    const b = (rawAfter[i][1] || "").toString().trim();
    if (isValidFIRCell(b)) {
      await sheetsUpdate(tok, SID_fir, `${tabName}!A${i + 1}`, [[slCounter++]]);
    }
  }

  return { ok: true, ri: insertSheetRow, sl: newIdx + 1 };
}

export async function updateFIRRow(tok, SID_fir, tabName, ri, sec, dr) {
  return sheetsUpdate(tok, SID_fir, `${tabName}!C${ri}:D${ri}`, [[sec, dr]]);
}

/* ═══════════════════════════════════════════════
   SECTION BUILDER
═══════════════════════════════════════════════ */
export function SectionBuilder({ value, onChange }) {
  const [groups, setGroups] = useState([]);
  const [activeAct, setActiveAct] = useState(null);
  const [mainSec, setMainSec] = useState("");
  const [subSec, setSubSec] = useState("");
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("fir_sec_history") || "[]"); } catch { return []; }
  });

  useEffect(() => {
    const str = buildSectionString(groups);
    onChange(str);
  }, [groups]);

  function addSection() {
    if (!activeAct || !mainSec) return;
    const entry = { main: mainSec, sub: subSec };
    setGroups(prev => {
      const existing = prev.findIndex(g => g.actId === activeAct);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { ...updated[existing], sections: [...updated[existing].sections, entry] };
        return updated;
      } else {
        return [...prev, { actId: activeAct, sections: [entry] }];
      }
    });
    setMainSec(""); setSubSec("");
  }

  function removeSection(actId, secIdx) {
    setGroups(prev =>
      prev.map(g => {
        if (g.actId !== actId) return g;
        const secs = g.sections.filter((_, i) => i !== secIdx);
        return secs.length ? { ...g, sections: secs } : null;
      }).filter(Boolean)
    );
  }

  function removeGroup(actId) {
    setGroups(prev => prev.filter(g => g.actId !== actId));
  }

  function saveToHistory() {
    const str = buildSectionString(groups);
    if (!str) return;
    const newHist = [str, ...history.filter(h => h !== str)].slice(0, 10);
    setHistory(newHist);
    try { localStorage.setItem("fir_sec_history", JSON.stringify(newHist)); } catch {}
  }

  function loadFromHistory(str) {
    setGroups([]);
    onChange(str);
  }

  function clearAll() {
    setGroups([]); setMainSec(""); setSubSec(""); setActiveAct(null);
  }

  const preview = buildSectionString(groups);

  return (
    <div className="sec-builder">
      <div className="lbl" style={{marginBottom:6}}>Section U/s Builder</div>

      {history.length > 0 && (
        <div style={{marginBottom:10}}>
          <div className="lbl" style={{marginBottom:4,fontSize:9}}>Recent Sections (tap to reuse)</div>
          <div className="hist-row">
            {history.map((h,i) => (
              <div key={i} className="hist-chip" onClick={() => loadFromHistory(h)} title={h}>
                {h.length > 30 ? h.slice(0,30)+"…" : h}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{marginBottom:8}}>
        <div className="lbl" style={{marginBottom:4}}>Concatenated Output</div>
        <div className="sec-preview">
          {preview
            ? preview.split(/ r\/w /).map((part, i) => (
                <span key={i}>{i > 0 && <em> r/w </em>}{part}</span>
              ))
            : <span style={{color:"var(--txt3)"}}>Select Act → enter section → Add</span>
          }
        </div>
      </div>

      {groups.map(g => {
        const actLabel = ACTS.find(a => a.id === g.actId)?.label || g.actId;
        return (
          <div key={g.actId} className="sec-group">
            <span className="sec-group-act">{actLabel}</span>
            <div className="sec-chips">
              {g.sections.map((s, si) => (
                <span key={si} className="sec-chip">
                  {s.sub ? `${s.main}(${s.sub})` : s.main}
                  <span className="sec-chip-del" onClick={() => removeSection(g.actId, si)}>✕</span>
                </span>
              ))}
            </div>
            <button className="btn btn-r btn-sm" style={{padding:"2px 8px",fontSize:10}} onClick={() => removeGroup(g.actId)}>✕ Act</button>
          </div>
        );
      })}

      <div className="sec-divider">Select Act</div>

      <div className="pill-row" style={{marginBottom:10}}>
        {ACTS.map(a => (
          <div key={a.id}
            className={`pill ${activeAct===a.id?"active-act":""}`}
            onClick={() => setActiveAct(activeAct===a.id ? null : a.id)}>
            {a.short}
          </div>
        ))}
      </div>

      {activeAct && (
        <>
          <div className="sec-divider">
            Enter Section for {ACTS.find(a=>a.id===activeAct)?.label}
          </div>
          <div className="sec-numpad-wrap">
            <NumPad2 label="Main Section" value={mainSec} onChange={setMainSec} maxLen={8}/>
            <NumPad2 label="Sub-Section (optional)" value={subSec} onChange={setSubSec} maxLen={6} withBrackets/>
          </div>
          <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
            <button className="btn btn-g btn-sm" disabled={!mainSec} onClick={addSection}>
              ＋ Add Section
            </button>
            <button className="btn btn-o btn-sm" onClick={() => { setMainSec(""); setSubSec(""); }}>
              Clear
            </button>
          </div>
        </>
      )}

      {preview && (
        <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
          <button className="btn btn-o btn-sm" onClick={saveToHistory}>💾 Save to History</button>
          <button className="btn btn-r btn-sm" onClick={clearAll}>✕ Clear All</button>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   NUMPADS
═══════════════════════════════════════════════ */
export function NumPad2({ label, value, onChange, maxLen=8, withBrackets=false }) {
  function tap(ch) { if (value.replace(/\D/g,"").length >= maxLen) return; onChange(value + ch); }
  function bs() { onChange(value.slice(0,-1)); }
  const nums = [1,2,3,4,5,6,7,8,9];
  return (
    <div style={{flex:"1 1 130px",minWidth:0}}>
      <div className="lbl" style={{marginBottom:4}}>{label}</div>
      <div className="val-display">{value || <span style={{color:"var(--txt3)"}}>—</span>}</div>
      <div className="numpad">
        {nums.map(n=><div key={n} className="np" onClick={()=>tap(String(n))}>{n}</div>)}
        <div className="np" onClick={()=>tap("0")}>0</div>
        {withBrackets
          ? <><div className="np accent" onClick={()=>tap("(")}>( )</div><div className="np" onClick={bs}>⌫</div></>
          : <div className="np w2" onClick={bs}>⌫</div>
        }
      </div>
    </div>
  );
}

export function DateNumPad({ value, onChange }) {
  function tapDigit(d) {
    const digits = value.replace(/\D/g,"");
    if (digits.length >= 8) return;
    const next = autoFormatDate(digits + d);
    onChange(next);
  }
  function bs() {
    const digits = value.replace(/\D/g,"");
    const next = autoFormatDate(digits.slice(0,-1));
    onChange(next);
  }
  const nums = [1,2,3,4,5,6,7,8,9];
  return (
    <div style={{flex:"1 1 130px",minWidth:0}}>
      <div className="lbl" style={{marginBottom:4}}>Date Received (DD.MM.YYYY)</div>
      <div className="val-display mono">{value || <span style={{color:"var(--txt3)"}}>—</span>}</div>
      <div className="numpad">
        {nums.map(n=><div key={n} className="np" onClick={()=>tapDigit(String(n))}>{n}</div>)}
        <div className="np" onClick={()=>tapDigit("0")}>0</div>
        <div className="np w2" onClick={bs}>⌫</div>
      </div>
    </div>
  );
}

export function FIRNumPad({ value, onChange }) {
  function tap(d) { if (value.length >= 6) return; onChange(value + d); }
  function bs() { onChange(value.slice(0,-1)); }
  const nums = [1,2,3,4,5,6,7,8,9];
  return (
    <div style={{flex:"1 1 130px",minWidth:0}}>
      <div className="lbl" style={{marginBottom:4}}>FIR Number</div>
      <div className="val-display mono">{value || <span style={{color:"var(--txt3)"}}>—</span>}</div>
      <div className="numpad">
        {nums.map(n=><div key={n} className="np" onClick={()=>tap(String(n))}>{n}</div>)}
        <div className="np" onClick={()=>tap("0")}>0</div>
        <div className="np w2" onClick={bs}>⌫</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   FIR ENTRY TAB
═══════════════════════════════════════════════ */
export function EntryTab({ db, setDb, tok, SID }) {
  const curYr = String(new Date().getFullYear());
  const [fn,  setFn]  = useState(() => { try { return localStorage.getItem("fir_draft_fn")||""; } catch { return ""; } });
  const [yr,  setYr]  = useState(() => { try { return localStorage.getItem("fir_draft_yr")||curYr; } catch { return curYr; } });
  const [st,  setSt]  = useState(() => { try { return localStorage.getItem("fir_draft_st")||""; } catch { return ""; } });
  const [uns, setUns] = useState(() => { try { return localStorage.getItem("fir_draft_uns")||""; } catch { return ""; } });
  const [dt,  setDt]  = useState(() => { try { return localStorage.getItem("fir_draft_dt")||""; } catch { return ""; } });
  const [msg, setMsg] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [existingRow, setExistingRow] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Auto-save draft
  useEffect(() => {
    try {
      localStorage.setItem("fir_draft_fn", fn);
      localStorage.setItem("fir_draft_yr", yr);
      localStorage.setItem("fir_draft_st", st);
      localStorage.setItem("fir_draft_uns", uns);
      localStorage.setItem("fir_draft_dt", dt);
    } catch {}
  }, [fn, yr, st, uns, dt]);

  // Check duplicate / existing
  useEffect(() => {
    if (!fn || !yr || !st) { setEditMode(false); setExistingRow(null); return; }
    const sNum = String(parseInt(fn, 10) || fn);
    const rows = (db.fir[st] || []).filter(r => firMatch(r.cr, sNum, yr));
    if (rows.length) {
      setExistingRow(rows[0]);
      setEditMode(true);
    } else {
      setExistingRow(null);
      setEditMode(false);
    }
  }, [fn, yr, st]);

  function loadExisting() {
    if (!existingRow) return;
    setUns(existingRow.sec || "");
    setDt(existingRow.dr || "");
    setMsg({ type:"info", text:`Loaded FIR ${existingRow.cr} for editing.` });
  }

  function clearDraft() {
    setFn(""); setUns(""); setDt(""); setMsg(null); setEditMode(false); setExistingRow(null);
    setYr(curYr); setSt("");
    try {
      ["fir_draft_fn","fir_draft_yr","fir_draft_st","fir_draft_uns","fir_draft_dt"]
        .forEach(k => localStorage.removeItem(k));
    } catch {}
  }

  async function save() {
    if (!fn || !yr || !st) { setMsg({type:"err",text:"Enter FIR Number, Year, and select a Station."}); return; }
    if (!uns) { setMsg({type:"err",text:"Section U/s is required."}); return; }
    if (!dt || dt.length < 10) { setMsg({type:"err",text:"Enter a valid date (DD.MM.YYYY)."}); return; }
    const cr = `${parseInt(fn,10)}/${yr}`;

    if (editMode && existingRow) {
      setMsg({type:"loading",text:"Updating…"});
      const ok = await updateFIRRow(tok, SID.fir, st, existingRow.ri, uns, dt);
      if (ok) {
        setDb(prev => ({
          ...prev,
          fir: {
            ...prev.fir,
            [st]: prev.fir[st].map(r => r.ri === existingRow.ri ? {...r, sec:uns, dr:dt} : r)
          }
        }));
        setMsg({type:"ok",text:`✓ FIR ${cr} updated in ${SMAP.find(s=>s.sh===st)?.lb}.`});
      } else {
        setMsg({type:"err",text:"Update failed."});
      }
      return;
    }

    setMsg({type:"loading",text:"Saving with sorted insert…"});
    const existingRows = db.fir[st] || [];
    const result = await insertFIRSorted(tok, SID.fir, st, cr, uns, dt, existingRows);
    if (result.ok) {
      const newRow = { sl: String(result.sl), cr, sec: uns, dr: dt, yr, ri: result.ri };
      const updated = [...existingRows, newRow]
        .sort((a,b) => firSortKey(a.cr) - firSortKey(b.cr))
        .map((r,i) => ({...r, sl:String(i+1)}));
      setDb(prev => ({...prev, fir:{...prev.fir, [st]: updated}}));
      setMsg({type:"ok",text:`✓ FIR ${cr} saved (Sl ${result.sl}) to ${SMAP.find(s=>s.sh===st)?.lb}.`});
      setFn(""); setUns(""); setDt(""); setEditMode(false); setExistingRow(null);
      try {
        ["fir_draft_fn","fir_draft_uns","fir_draft_dt"].forEach(k => localStorage.removeItem(k));
      } catch {}
    } else {
      setMsg({type:"err",text:"Save failed. Check permissions."});
    }
  }

  async function deleteFIR() {
    if (!existingRow) return;
    setShowDeleteConfirm(false);
    setMsg({type:"loading",text:"Deleting…"});
    const ok = await sheetsDeleteRow(tok, SID.fir, st, existingRow.ri);
    if (ok) {
      setDb(prev => ({
        ...prev,
        fir: {...prev.fir, [st]: prev.fir[st].filter(r => r.ri !== existingRow.ri)}
      }));
      setMsg({type:"ok",text:`✓ FIR ${existingRow.cr} deleted.`});
      clearDraft();
    } else {
      setMsg({type:"err",text:"Delete failed."});
    }
  }

  const stObj = SMAP.find(s => s.sh === st);
  const recent = st ? (db.fir[st] || []).slice(-3).reverse() : [];
  const firReady = fn && yr;

  return (
    <div>
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-title">⚠ Confirm Delete</div>
            <div className="modal-body">
              Delete FIR <strong style={{color:"var(--red)"}}>{fn}/{yr}</strong> from{" "}
              <strong>{stObj?.lb}</strong>? This cannot be undone.
            </div>
            <div className="modal-actions">
              <button className="btn btn-o btn-sm" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button className="btn btn-r btn-sm" onClick={deleteFIR}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="ctitle">
          {editMode ? "✏️ Edit FIR" : "📝 New FIR Entry"}
          {editMode && <span className="bdg bdg-b" style={{marginLeft:4}}>Edit Mode</span>}
        </div>

        {/* STEP 1: FIR Number + Year */}
        <div className="sec-divider">Step 1 — FIR Number & Year</div>
        <div className="numpad-row" style={{marginBottom:12}}>
          <FIRNumPad value={fn} onChange={setFn}/>
          <div style={{flex:"1 1 130px",minWidth:0}}>
            <div className="lbl" style={{marginBottom:4}}>Year</div>
            <div className="val-display mono" style={{marginBottom:6}}>{yr}</div>
            <div className="yr-ctrl" style={{marginBottom:6}}>
              <button className="btn btn-o btn-sm" onClick={()=>setYr(y=>String(parseInt(y)-1))}>◀</button>
              <span className="yr-val">{yr}</span>
              <button className="btn btn-o btn-sm" onClick={()=>setYr(y=>String(parseInt(y)+1))}>▶</button>
              {yr!==curYr && <span className="rst" onClick={()=>setYr(curYr)}>reset</span>}
            </div>
            {fn && yr && (
              <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4}}>
                <span style={{fontSize:13,fontWeight:700,color:"var(--gold)",fontFamily:"JetBrains Mono,monospace"}}>
                  {parseInt(fn,10)}/{yr}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* STEP 2: Police Station */}
        {firReady && (
          <>
            <div className="sec-divider">Step 2 — Select Police Station</div>
            <div className="pill-row" style={{marginBottom:8}}>
              {SMAP.map(s => {
                const sNum = String(parseInt(fn,10)||fn);
                const exists = (db.fir[s.sh]||[]).some(r => firMatch(r.cr, sNum, yr));
                return (
                  <div key={s.sh}
                    className={`pill ${st===s.sh?"active":""} ${exists && st!==s.sh?"warn":""}`}
                    onClick={() => setSt(st===s.sh?"":s.sh)}>
                    {s.lb}
                    {exists && <span style={{fontSize:9,marginLeft:2}}>{st===s.sh?"✏":"⚠"}</span>}
                  </div>
                );
              })}
            </div>
            {st && existingRow && !editMode && (
              <div className="msg-err" style={{marginBottom:8}}>
                ⚠ FIR {fn}/{yr} already exists in {stObj?.lb}.
                <button className="btn btn-edit btn-sm" style={{marginLeft:8}} onClick={loadExisting}>✏ Edit it</button>
              </div>
            )}
            {st && editMode && (
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,flexWrap:"wrap"}}>
                <span className="st-badge gold">✏ Editing {fn}/{yr} in {stObj?.lb}</span>
                {!uns && <button className="btn btn-edit btn-sm" onClick={loadExisting}>Load Data</button>}
              </div>
            )}
          </>
        )}

        {/* STEP 3: Section Builder */}
        {firReady && st && (
          <>
            <div className="sec-divider">Step 3 — Section U/s</div>
            <SectionBuilder value={uns} onChange={setUns}/>
            {uns && (
              <div style={{fontSize:11,color:"var(--txt2)",marginBottom:8,padding:"6px 10px",
                background:"var(--bg3)",borderRadius:6,border:"1px solid var(--gold-d)",
                fontFamily:"Crimson Pro,serif",lineHeight:1.6}}>
                <span style={{color:"var(--txt3)",fontSize:9,display:"block",marginBottom:2}}>FINAL OUTPUT:</span>
                {uns}
              </div>
            )}
          </>
        )}

        {/* STEP 4: Date */}
        {firReady && st && (
          <>
            <div className="sec-divider">Step 4 — Date Received</div>
            <div style={{marginBottom:12}}>
              <DateNumPad value={dt} onChange={setDt}/>
            </div>
          </>
        )}

        {/* Actions */}
        {firReady && st && (
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <button className="btn btn-g" onClick={save}
              disabled={!uns || !dt || dt.length < 10}>
              {editMode ? "💾 Update FIR" : "💾 Save FIR"}
            </button>
            {editMode && (
              <button className="btn btn-r" onClick={() => setShowDeleteConfirm(true)}>🗑 Delete</button>
            )}
            <button className="btn btn-o" onClick={clearDraft}>✕ Clear</button>
          </div>
        )}

        {msg && (
          <div className={msg.type==="ok"?"msg-ok":msg.type==="err"?"msg-err":"msg-info"} style={{marginTop:8}}>
            {msg.type==="loading" && <span className="spin" style={{display:"inline-block",marginRight:6}}/>}
            {msg.text}
          </div>
        )}
      </div>

      {/* Recent FIRs */}
      {recent.length > 0 && (
        <div className="card">
          <div className="ctitle">🕐 Recent FIRs — {stObj?.lb}</div>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr><th>Sl</th><th>CR No.</th><th>Section U/s</th><th>Date Received</th></tr>
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