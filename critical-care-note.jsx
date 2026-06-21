import { useState } from "react";

const INITIAL = {
  patientName: "", mrn: "", date: "",
  admissionReason: "", hpi1: "", hpi2: "",
  pmhx: { htn: false, dm: false, cad: false, chf: false, copd: false, ckd: false, stroke: false, liver: false, malignancy: false },
  pmhxOther: "",
  // Neuro
  gcs: "", pupils: "",
  sedation: { midaz: false, propofol: false, fentanyl: false, morphine: false, dex: false },
  targetRASS: "", currentRASS: "",
  limbMobility: "all", limbWeakness: "",
  brainImaging: { ct: false, mri: false }, brainFindings: "",
  eeg: "", cnsDrugs: "",
  // CVS
  hr: "", map: "", hemOther: "",
  lactate: "", bnp: "", troponin: "",
  vasopressors: { norepi: false, epi: false, vaso: false, dopa: false, phenyl: false, milrinone: false, dobu: false },
  vasoDoses: { norepi: "", epi: "", vaso: "", dopa: "", phenyl: "", milrinone: "", dobu: "" },
  ecg: "", echo: "", cardiacDrugs: "",
  vaEcmo: false, vaFlow: "", vaFio2: "", vaSweep: "",
  cvsOther: "",
  // Resp
  chestExam: "",
  airway: "roomair", o2Rate: "",
  hfncFio2: "", hfncFlow: "",
  nivMode: "cpap", nivPSV: "", nivPEEP: "",
  ettSize: "", trach: false,
  mvDay: "", mvMode: "", mvVt: "", mvRR: "", mvPEEP: "", mvFio2: "",
  abgPH: "", abgPCO2: "", abgPO2: "", abgHCO3: "",
  pfRatio: "", roxIndex: "", hacor: "",
  cxr: "",
  respMeds: { bronch: false, ino: false, other: false }, respMedsOther: "",
  vvEcmo: false, vvFlow: "", vvFio2: "", vvSweep: "",
  respOther: "",
  // ID
  maxTemp: "", wbc: "",
  pct: "", crp: "",
  cultures: "",
  mdro: false, mdroSpec: "",
  antimicrobials: "", drugLevels: "",
  // GI
  feeding: "enteral", npoReason: "", enteralFormula: "", tpnCal: "",
  bowelMotion: "", abdExam: { soft: false, distended: false, tender: false, rigidity: false },
  ast: "", alt: "", tbil: "", dbil: "", albumin: "",
  amylase: "", lipase: "",
  abdImaging: "",
  // Renal
  edema: false,
  uop: "", fluidIn: "", fluidOut: "",
  cr: "", bun: "", na: "", k: "",
  diuretics: "",
  crrtMode: "", uf: "",
  // Heme
  hb: "", plt: "", inr: "", ptt: "",
  bleedingTendency: "none",
  anticoag: { heparin: false, lmwh: false, doac: false, warfarin: false }, anticoagDose: "",
  antiplatelet: { aspirin: false, clopi: false, other: false }, antiplateletOther: "",
  // Endo
  glucose: "",
  insulin: false, insulinRegimen: "",
  steroids: false, steroidDose: "",
  thyroid: false, thyroidDose: "",
  // Extremities
  pulses: "palpable", capRefill: "<2",
  // Prophylaxis
  dvt: { lmwh: false, hepSC: false, scd: false, none: false },
  pud: { ppi: false, h2: false, enteral: false, none: false },
  // Assessment
  problems: ["", "", "", ""],
  planNeuro: "", planCVS: "", planResp: "", planID: "", planGIRenal: "", planOther: "",
};

const CB = ({ label, checked, onChange }) => (
  <label style={{ display: "inline-flex", alignItems: "center", gap: 5, marginRight: 10, cursor: "pointer", fontSize: 13 }}>
    <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
      style={{ width: 14, height: 14, accentColor: "#0ea5e9" }} />
    {label}
  </label>
);

const Field = ({ label, value, onChange, placeholder = "", width = "100%", type = "text" }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 3, width }}>
    {label && <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>}
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ border: "1px solid #cbd5e1", borderRadius: 6, padding: "5px 8px", fontSize: 13, width: "100%", background: "#fff", color: "#0f172a", outline: "none" }} />
  </div>
);

const TextArea = ({ label, value, onChange, rows = 2 }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
    {label && <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>}
    <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows}
      style={{ border: "1px solid #cbd5e1", borderRadius: 6, padding: "5px 8px", fontSize: 13, width: "100%", resize: "vertical", background: "#fff", color: "#0f172a", outline: "none" }} />
  </div>
);

const Row = ({ children, gap = 12 }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap }}>{children}</div>
);

const Section = ({ title, num, children }) => (
  <div style={{ marginBottom: 20, background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", overflow: "hidden" }}>
    <div style={{ background: "#0f172a", color: "#fff", padding: "8px 16px", display: "flex", alignItems: "center", gap: 10 }}>
      {num && <span style={{ background: "#0ea5e9", borderRadius: 20, width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{num}</span>}
      <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: "0.03em" }}>{title}</span>
    </div>
    <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12 }}>{children}</div>
  </div>
);

const SubSection = ({ title, children }) => (
  <div style={{ borderLeft: "3px solid #0ea5e9", paddingLeft: 12 }}>
    <div style={{ fontSize: 12, fontWeight: 700, color: "#0ea5e9", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{title}</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{children}</div>
  </div>
);

const Radio = ({ name, options, value, onChange }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
    {options.map(o => (
      <label key={o.val} style={{ display: "inline-flex", alignItems: "center", gap: 5, cursor: "pointer", fontSize: 13 }}>
        <input type="radio" name={name} value={o.val} checked={value === o.val} onChange={() => onChange(o.val)}
          style={{ accentColor: "#0ea5e9" }} />
        {o.label}
      </label>
    ))}
  </div>
);

export default function App() {
  const [d, setD] = useState(INITIAL);
  const set = (key, val) => setD(p => ({ ...p, [key]: val }));
  const setNest = (key, sub, val) => setD(p => ({ ...p, [key]: { ...p[key], [sub]: val } }));
  const [printed, setPrinted] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (window.confirm("Reset all fields?")) setD(INITIAL);
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#f1f5f9", minHeight: "100vh", padding: "20px 16px" }}>
      <style>{`
        @media print { .no-print { display: none !important; } body { background: white; } }
        input:focus, textarea:focus { border-color: #0ea5e9 !important; box-shadow: 0 0 0 2px #bae6fd; }
        * { box-sizing: border-box; }
      `}</style>

      {/* Header */}
      <div style={{ maxWidth: 860, margin: "0 auto 20px" }}>
        <div style={{ background: "#0f172a", borderRadius: 12, padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "#0ea5e9", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>KAMC — Critical Care</div>
            <div style={{ color: "#fff", fontSize: 20, fontWeight: 800, marginTop: 2 }}>Admission & Re-Assessment Note</div>
          </div>
          <div className="no-print" style={{ display: "flex", gap: 8 }}>
            <button onClick={handleReset} style={{ background: "#334155", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13 }}>Reset</button>
            <button onClick={handlePrint} style={{ background: "#0ea5e9", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Print / Export</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Patient Info */}
        <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", padding: "14px 16px" }}>
          <Row>
            <div style={{ flex: 2, minWidth: 160 }}><Field label="Patient Name" value={d.patientName} onChange={v => set("patientName", v)} /></div>
            <div style={{ flex: 1, minWidth: 100 }}><Field label="MRN" value={d.mrn} onChange={v => set("mrn", v)} /></div>
            <div style={{ flex: 1, minWidth: 120 }}><Field label="Date" type="date" value={d.date} onChange={v => set("date", v)} /></div>
          </Row>
        </div>

        {/* I. Clinical Overview */}
        <Section title="I. CLINICAL OVERVIEW">
          <TextArea label="Reason for ICU Admission" value={d.admissionReason} onChange={v => set("admissionReason", v)} rows={2} />
          <div>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>History of Present Illness</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
              <input value={d.hpi1} onChange={e => set("hpi1", e.target.value)} placeholder="• " style={{ border: "1px solid #cbd5e1", borderRadius: 6, padding: "5px 8px", fontSize: 13 }} />
              <input value={d.hpi2} onChange={e => set("hpi2", e.target.value)} placeholder="• " style={{ border: "1px solid #cbd5e1", borderRadius: 6, padding: "5px 8px", fontSize: 13 }} />
            </div>
          </div>
          <div>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Background / Comorbidities</span>
            <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 4 }}>
              {[["htn","HTN"],["dm","DM"],["cad","CAD/MI"],["chf","CHF"],["copd","COPD/Asthma"],["ckd","CKD/ESRD"],["stroke","Stroke/TIA"],["liver","Liver Disease"],["malignancy","Malignancy"]].map(([k,l]) =>
                <CB key={k} label={l} checked={d.pmhx[k]} onChange={v => setNest("pmhx", k, v)} />
              )}
            </div>
            <div style={{ marginTop: 6 }}><Field label="Other" value={d.pmhxOther} onChange={v => set("pmhxOther", v)} /></div>
          </div>
        </Section>

        {/* II. Systemic Review */}
        <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", overflow: "hidden" }}>
          <div style={{ background: "#0f172a", color: "#fff", padding: "8px 16px", fontWeight: 700, fontSize: 14, letterSpacing: "0.03em" }}>II. SYSTEMIC REVIEW</div>
          <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 18 }}>

            {/* 1. Neuro */}
            <SubSection title="1. Neurological">
              <Row>
                <div style={{ flex: 1, minWidth: 100 }}><Field label="GCS (/15)" value={d.gcs} onChange={v => set("gcs", v)} /></div>
                <div style={{ flex: 2, minWidth: 160 }}><Field label="Pupils" value={d.pupils} onChange={v => set("pupils", v)} /></div>
              </Row>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Sedation</span>
                <div style={{ marginTop: 4 }}>
                  {[["midaz","Midazolam"],["propofol","Propofol"],["fentanyl","Fentanyl"],["morphine","Morphine"],["dex","Dexmedetomidine"]].map(([k,l]) =>
                    <CB key={k} label={l} checked={d.sedation[k]} onChange={v => setNest("sedation", k, v)} />
                  )}
                </div>
              </div>
              <Row>
                <div style={{ flex: 1 }}><Field label="Target RASS" value={d.targetRASS} onChange={v => set("targetRASS", v)} /></div>
                <div style={{ flex: 1 }}><Field label="Current RASS" value={d.currentRASS} onChange={v => set("currentRASS", v)} /></div>
              </Row>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Limb Mobility</span>
                <div style={{ marginTop: 4 }}>
                  <Radio name="limb" value={d.limbMobility} onChange={v => set("limbMobility", v)}
                    options={[{ val: "all", label: "Moving all extremities" }, { val: "weakness", label: "Weakness" }]} />
                </div>
                {d.limbMobility === "weakness" && <div style={{ marginTop: 6 }}><Field label="Specify weakness" value={d.limbWeakness} onChange={v => set("limbWeakness", v)} /></div>}
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Brain Imaging</span>
                <div style={{ marginTop: 4 }}>
                  <CB label="CT" checked={d.brainImaging.ct} onChange={v => setNest("brainImaging", "ct", v)} />
                  <CB label="MRI" checked={d.brainImaging.mri} onChange={v => setNest("brainImaging", "mri", v)} />
                </div>
                <div style={{ marginTop: 6 }}><Field label="Findings" value={d.brainFindings} onChange={v => set("brainFindings", v)} /></div>
              </div>
              <Field label="EEG" value={d.eeg} onChange={v => set("eeg", v)} />
              <Field label="CNS Drugs" value={d.cnsDrugs} onChange={v => set("cnsDrugs", v)} />
            </SubSection>

            {/* 2. CVS */}
            <SubSection title="2. Cardiovascular">
              <Row>
                <div style={{ flex: 1 }}><Field label="HR (bpm)" value={d.hr} onChange={v => set("hr", v)} /></div>
                <div style={{ flex: 1 }}><Field label="MAP (mmHg)" value={d.map} onChange={v => set("map", v)} /></div>
                <div style={{ flex: 2 }}><Field label="Other (PPV/POCUS/PLR)" value={d.hemOther} onChange={v => set("hemOther", v)} /></div>
              </Row>
              <Row>
                <div style={{ flex: 1 }}><Field label="Lactate" value={d.lactate} onChange={v => set("lactate", v)} /></div>
                <div style={{ flex: 1 }}><Field label="BNP" value={d.bnp} onChange={v => set("bnp", v)} /></div>
                <div style={{ flex: 1 }}><Field label="Troponin" value={d.troponin} onChange={v => set("troponin", v)} /></div>
              </Row>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Vasopressors / Inotropes</span>
                <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 6 }}>
                  {[["norepi","Norepinephrine"],["epi","Epinephrine"],["vaso","Vasopressin"],["dopa","Dopamine"],["phenyl","Phenylephrine"],["milrinone","Milrinone"],["dobu","Dobutamine"]].map(([k,l]) => (
                    <div key={k} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <CB label={l} checked={d.vasopressors[k]} onChange={v => setNest("vasopressors", k, v)} />
                      {d.vasopressors[k] && (
                        <input value={d.vasoDoses[k]} onChange={e => setNest("vasoDoses", k, e.target.value)}
                          placeholder="dose" style={{ border: "1px solid #cbd5e1", borderRadius: 6, padding: "4px 8px", fontSize: 12, width: 120 }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <Field label="ECG Findings" value={d.ecg} onChange={v => set("ecg", v)} />
              <Field label="ECHO Findings" value={d.echo} onChange={v => set("echo", v)} />
              <Field label="Cardiac Drugs" value={d.cardiacDrugs} onChange={v => set("cardiacDrugs", v)} />
              <div>
                <CB label="VA ECMO" checked={d.vaEcmo} onChange={v => set("vaEcmo", v)} />
                {d.vaEcmo && (
                  <Row style={{ marginTop: 6 }}>
                    <div style={{ flex: 1 }}><Field label="Flow" value={d.vaFlow} onChange={v => set("vaFlow", v)} /></div>
                    <div style={{ flex: 1 }}><Field label="FiO2" value={d.vaFio2} onChange={v => set("vaFio2", v)} /></div>
                    <div style={{ flex: 1 }}><Field label="Sweep Gas" value={d.vaSweep} onChange={v => set("vaSweep", v)} /></div>
                  </Row>
                )}
              </div>
              <Field label="Other" value={d.cvsOther} onChange={v => set("cvsOther", v)} />
            </SubSection>

            {/* 3. Respiratory */}
            <SubSection title="3. Respiratory">
              <Field label="Chest Examination" value={d.chestExam} onChange={v => set("chestExam", v)} />
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Airway & Support</span>
                <div style={{ marginTop: 4 }}>
                  <Radio name="airway" value={d.airway} onChange={v => set("airway", v)} options={[
                    { val: "roomair", label: "Room Air" },
                    { val: "o2", label: "Nasal Cannula / Mask" },
                    { val: "hfnc", label: "HFNC" },
                    { val: "niv", label: "NIV" },
                    { val: "intubated", label: "Intubated" },
                  ]} />
                </div>
                {d.airway === "o2" && <div style={{ marginTop: 6 }}><Field label="L/min" value={d.o2Rate} onChange={v => set("o2Rate", v)} width="120px" /></div>}
                {d.airway === "hfnc" && <Row style={{ marginTop: 6 }}>
                  <div style={{ flex: 1 }}><Field label="FiO2" value={d.hfncFio2} onChange={v => set("hfncFio2", v)} /></div>
                  <div style={{ flex: 1 }}><Field label="Flow (L/min)" value={d.hfncFlow} onChange={v => set("hfncFlow", v)} /></div>
                </Row>}
                {d.airway === "niv" && <div style={{ marginTop: 6 }}>
                  <Radio name="niv" value={d.nivMode} onChange={v => set("nivMode", v)} options={[{ val: "cpap", label: "CPAP" }, { val: "bipap", label: "BiPAP" }]} />
                  <Row style={{ marginTop: 6 }}>
                    <div style={{ flex: 1 }}><Field label="PSV" value={d.nivPSV} onChange={v => set("nivPSV", v)} /></div>
                    <div style={{ flex: 1 }}><Field label="PEEP" value={d.nivPEEP} onChange={v => set("nivPEEP", v)} /></div>
                  </Row>
                </div>}
                {d.airway === "intubated" && <Row style={{ marginTop: 6 }}>
                  <div style={{ flex: 2 }}><Field label="ETT size/mark" value={d.ettSize} onChange={v => set("ettSize", v)} /></div>
                  <div style={{ flex: 1, display: "flex", alignItems: "flex-end" }}><CB label="Tracheostomy" checked={d.trach} onChange={v => set("trach", v)} /></div>
                </Row>}
              </div>
              {(d.airway === "intubated" || d.airway === "niv") && (
                <div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Mechanical Ventilation</span>
                  <Row style={{ marginTop: 6 }}>
                    <div style={{ flex: 1 }}><Field label="Day #" value={d.mvDay} onChange={v => set("mvDay", v)} /></div>
                    <div style={{ flex: 1 }}><Field label="Mode" value={d.mvMode} onChange={v => set("mvMode", v)} /></div>
                    <div style={{ flex: 1 }}><Field label="Vt (mL)" value={d.mvVt} onChange={v => set("mvVt", v)} /></div>
                    <div style={{ flex: 1 }}><Field label="RR" value={d.mvRR} onChange={v => set("mvRR", v)} /></div>
                    <div style={{ flex: 1 }}><Field label="PEEP" value={d.mvPEEP} onChange={v => set("mvPEEP", v)} /></div>
                    <div style={{ flex: 1 }}><Field label="FiO2" value={d.mvFio2} onChange={v => set("mvFio2", v)} /></div>
                  </Row>
                </div>
              )}
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>ABG</span>
                <Row style={{ marginTop: 6 }}>
                  <div style={{ flex: 1 }}><Field label="pH" value={d.abgPH} onChange={v => set("abgPH", v)} /></div>
                  <div style={{ flex: 1 }}><Field label="pCO2" value={d.abgPCO2} onChange={v => set("abgPCO2", v)} /></div>
                  <div style={{ flex: 1 }}><Field label="pO2" value={d.abgPO2} onChange={v => set("abgPO2", v)} /></div>
                  <div style={{ flex: 1 }}><Field label="HCO3" value={d.abgHCO3} onChange={v => set("abgHCO3", v)} /></div>
                </Row>
                <Row style={{ marginTop: 6 }}>
                  <div style={{ flex: 1 }}><Field label="P/F Ratio" value={d.pfRatio} onChange={v => set("pfRatio", v)} /></div>
                  <div style={{ flex: 1 }}><Field label="ROX Index" value={d.roxIndex} onChange={v => set("roxIndex", v)} /></div>
                  <div style={{ flex: 1 }}><Field label="HACOR (NIV)" value={d.hacor} onChange={v => set("hacor", v)} /></div>
                </Row>
              </div>
              <Field label="CXR Findings" value={d.cxr} onChange={v => set("cxr", v)} />
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Respiratory Meds</span>
                <div style={{ marginTop: 4 }}>
                  <CB label="Bronchodilators" checked={d.respMeds.bronch} onChange={v => setNest("respMeds", "bronch", v)} />
                  <CB label="Inhaled Nitric Oxide (iNO)" checked={d.respMeds.ino} onChange={v => setNest("respMeds", "ino", v)} />
                  <CB label="Other" checked={d.respMeds.other} onChange={v => setNest("respMeds", "other", v)} />
                </div>
                {d.respMeds.other && <div style={{ marginTop: 6 }}><Field label="Specify" value={d.respMedsOther} onChange={v => set("respMedsOther", v)} /></div>}
              </div>
              <div>
                <CB label="VV ECMO" checked={d.vvEcmo} onChange={v => set("vvEcmo", v)} />
                {d.vvEcmo && <Row style={{ marginTop: 6 }}>
                  <div style={{ flex: 1 }}><Field label="Flow" value={d.vvFlow} onChange={v => set("vvFlow", v)} /></div>
                  <div style={{ flex: 1 }}><Field label="FiO2" value={d.vvFio2} onChange={v => set("vvFio2", v)} /></div>
                  <div style={{ flex: 1 }}><Field label="Sweep Gas" value={d.vvSweep} onChange={v => set("vvSweep", v)} /></div>
                </Row>}
              </div>
              <Field label="Other (e.g. chest tube/drain)" value={d.respOther} onChange={v => set("respOther", v)} />
            </SubSection>

            {/* 4. ID */}
            <SubSection title="4. Infectious Disease">
              <Row>
                <div style={{ flex: 1 }}><Field label="Max Temp (last 24h) °C" value={d.maxTemp} onChange={v => set("maxTemp", v)} /></div>
                <div style={{ flex: 1 }}><Field label="WBC (×10⁹/L)" value={d.wbc} onChange={v => set("wbc", v)} /></div>
              </Row>
              <Row>
                <div style={{ flex: 1 }}><Field label="Procalcitonin" value={d.pct} onChange={v => set("pct", v)} /></div>
                <div style={{ flex: 1 }}><Field label="CRP" value={d.crp} onChange={v => set("crp", v)} /></div>
              </Row>
              <Field label="Cultures (+) Positive" value={d.cultures} onChange={v => set("cultures", v)} />
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>MDRO</span>
                <div style={{ marginTop: 4 }}>
                  <Radio name="mdro" value={d.mdro ? "yes" : "no"} onChange={v => set("mdro", v === "yes")}
                    options={[{ val: "no", label: "No" }, { val: "yes", label: "Yes" }]} />
                </div>
                {d.mdro && <div style={{ marginTop: 6 }}><Field label="Specify MDRO" value={d.mdroSpec} onChange={v => set("mdroSpec", v)} /></div>}
              </div>
              <Field label="Antimicrobials" value={d.antimicrobials} onChange={v => set("antimicrobials", v)} />
              <Field label="Drug Levels" value={d.drugLevels} onChange={v => set("drugLevels", v)} />
            </SubSection>

            {/* 5. GI */}
            <SubSection title="5. Gastrointestinal & Nutrition">
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Feeding Status</span>
                <div style={{ marginTop: 4 }}>
                  <Radio name="feeding" value={d.feeding} onChange={v => set("feeding", v)} options={[
                    { val: "npo", label: "NPO" }, { val: "enteral", label: "Enteral" }, { val: "tpn", label: "TPN" }
                  ]} />
                </div>
                {d.feeding === "npo" && <div style={{ marginTop: 6 }}><Field label="Reason" value={d.npoReason} onChange={v => set("npoReason", v)} /></div>}
                {d.feeding === "enteral" && <div style={{ marginTop: 6 }}><Field label="Formula / Rate" value={d.enteralFormula} onChange={v => set("enteralFormula", v)} /></div>}
                {d.feeding === "tpn" && <div style={{ marginTop: 6 }}><Field label="Calories/24hrs" value={d.tpnCal} onChange={v => set("tpnCal", v)} /></div>}
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Bowel Motion (last 24h)</span>
                <div style={{ marginTop: 4 }}>
                  <Radio name="bowel" value={d.bowelMotion} onChange={v => set("bowelMotion", v)}
                    options={[{ val: "yes", label: "Yes" }, { val: "no", label: "No" }]} />
                </div>
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Abdominal Exam</span>
                <div style={{ marginTop: 4 }}>
                  {[["soft","Soft/Non-Tender"],["distended","Distended"],["tender","Tender"],["rigidity","Rigidity/Guarding"]].map(([k,l]) =>
                    <CB key={k} label={l} checked={d.abdExam[k]} onChange={v => setNest("abdExam", k, v)} />
                  )}
                </div>
              </div>
              <Row>
                <div style={{ flex: 1 }}><Field label="AST" value={d.ast} onChange={v => set("ast", v)} /></div>
                <div style={{ flex: 1 }}><Field label="ALT" value={d.alt} onChange={v => set("alt", v)} /></div>
                <div style={{ flex: 1 }}><Field label="T.Bil" value={d.tbil} onChange={v => set("tbil", v)} /></div>
                <div style={{ flex: 1 }}><Field label="D.Bil" value={d.dbil} onChange={v => set("dbil", v)} /></div>
                <div style={{ flex: 1 }}><Field label="Albumin" value={d.albumin} onChange={v => set("albumin", v)} /></div>
              </Row>
              <Row>
                <div style={{ flex: 1 }}><Field label="Amylase" value={d.amylase} onChange={v => set("amylase", v)} /></div>
                <div style={{ flex: 1 }}><Field label="Lipase" value={d.lipase} onChange={v => set("lipase", v)} /></div>
              </Row>
              <Field label="Abdominal Imaging" value={d.abdImaging} onChange={v => set("abdImaging", v)} />
            </SubSection>

            {/* 6. Renal */}
            <SubSection title="6. Renal">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Edema:</span>
                <CB label="Yes" checked={d.edema} onChange={v => set("edema", v)} />
              </div>
              <Row>
                <div style={{ flex: 1 }}><Field label="UOP (mL/hr)" value={d.uop} onChange={v => set("uop", v)} /></div>
                <div style={{ flex: 1 }}><Field label="Fluid In (mL)" value={d.fluidIn} onChange={v => set("fluidIn", v)} /></div>
                <div style={{ flex: 1 }}><Field label="Fluid Out (mL)" value={d.fluidOut} onChange={v => set("fluidOut", v)} /></div>
              </Row>
              <Row>
                <div style={{ flex: 1 }}><Field label="Cr" value={d.cr} onChange={v => set("cr", v)} /></div>
                <div style={{ flex: 1 }}><Field label="BUN" value={d.bun} onChange={v => set("bun", v)} /></div>
                <div style={{ flex: 1 }}><Field label="Na" value={d.na} onChange={v => set("na", v)} /></div>
                <div style={{ flex: 1 }}><Field label="K" value={d.k} onChange={v => set("k", v)} /></div>
              </Row>
              <Field label="Diuretics" value={d.diuretics} onChange={v => set("diuretics", v)} />
              <Row>
                <div style={{ flex: 1 }}><Field label="CRRT/HD Mode" value={d.crrtMode} onChange={v => set("crrtMode", v)} /></div>
                <div style={{ flex: 1 }}><Field label="UF Rate" value={d.uf} onChange={v => set("uf", v)} /></div>
              </Row>
            </SubSection>

            {/* 7. Heme */}
            <SubSection title="7. Hematology">
              <Row>
                <div style={{ flex: 1 }}><Field label="Hb (g/dL)" value={d.hb} onChange={v => set("hb", v)} /></div>
                <div style={{ flex: 1 }}><Field label="Plt (×10⁹/L)" value={d.plt} onChange={v => set("plt", v)} /></div>
                <div style={{ flex: 1 }}><Field label="INR" value={d.inr} onChange={v => set("inr", v)} /></div>
                <div style={{ flex: 1 }}><Field label="PTT (sec)" value={d.ptt} onChange={v => set("ptt", v)} /></div>
              </Row>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Bleeding Tendency</span>
                <div style={{ marginTop: 4 }}>
                  <Radio name="bleed" value={d.bleedingTendency} onChange={v => set("bleedingTendency", v)} options={[
                    { val: "none", label: "None" }, { val: "active", label: "Active Bleeding" }, { val: "high", label: "High Risk" }
                  ]} />
                </div>
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Anticoagulation</span>
                <div style={{ marginTop: 4 }}>
                  {[["heparin","Heparin"],["lmwh","LMWH"],["doac","DOAC"],["warfarin","Warfarin"]].map(([k,l]) =>
                    <CB key={k} label={l} checked={d.anticoag[k]} onChange={v => setNest("anticoag", k, v)} />
                  )}
                </div>
                <div style={{ marginTop: 6 }}><Field label="Dose" value={d.anticoagDose} onChange={v => set("anticoagDose", v)} /></div>
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Antiplatelet</span>
                <div style={{ marginTop: 4 }}>
                  <CB label="Aspirin" checked={d.antiplatelet.aspirin} onChange={v => setNest("antiplatelet", "aspirin", v)} />
                  <CB label="Clopidogrel" checked={d.antiplatelet.clopi} onChange={v => setNest("antiplatelet", "clopi", v)} />
                  <CB label="Other" checked={d.antiplatelet.other} onChange={v => setNest("antiplatelet", "other", v)} />
                </div>
                {d.antiplatelet.other && <div style={{ marginTop: 6 }}><Field label="Specify" value={d.antiplateletOther} onChange={v => set("antiplateletOther", v)} /></div>}
              </div>
            </SubSection>

            {/* 8. Endo */}
            <SubSection title="8. Endocrine">
              <Row>
                <div style={{ flex: 1 }}><Field label="Blood Glucose (mmol/L or mg/dL)" value={d.glucose} onChange={v => set("glucose", v)} /></div>
              </Row>
              <div>
                <CB label="Insulin" checked={d.insulin} onChange={v => set("insulin", v)} />
                {d.insulin && <div style={{ marginTop: 6 }}><Field label="Regimen / Drip" value={d.insulinRegimen} onChange={v => set("insulinRegimen", v)} /></div>}
              </div>
              <div>
                <CB label="Steroids" checked={d.steroids} onChange={v => set("steroids", v)} />
                {d.steroids && <div style={{ marginTop: 6 }}><Field label="Dose" value={d.steroidDose} onChange={v => set("steroidDose", v)} /></div>}
              </div>
              <div>
                <CB label="L-Thyroxine" checked={d.thyroid} onChange={v => set("thyroid", v)} />
                {d.thyroid && <div style={{ marginTop: 6 }}><Field label="Dose" value={d.thyroidDose} onChange={v => set("thyroidDose", v)} /></div>}
              </div>
            </SubSection>

            {/* 9. Extremities */}
            <SubSection title="9. Extremities & Perfusion">
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Peripheral Pulses</span>
                <div style={{ marginTop: 4 }}>
                  <Radio name="pulses" value={d.pulses} onChange={v => set("pulses", v)} options={[
                    { val: "palpable", label: "Palpable" }, { val: "diminished", label: "Diminished" }, { val: "absent", label: "Absent (Doppler)" }
                  ]} />
                </div>
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Capillary Refill</span>
                <div style={{ marginTop: 4 }}>
                  <Radio name="caprefill" value={d.capRefill} onChange={v => set("capRefill", v)} options={[
                    { val: "<2", label: "< 2 seconds" }, { val: ">2", label: "> 2 seconds" }
                  ]} />
                </div>
              </div>
            </SubSection>

            {/* 10. Prophylaxis */}
            <SubSection title="10. Prophylaxis">
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>DVT Prophylaxis</span>
                <div style={{ marginTop: 4 }}>
                  {[["lmwh","LMWH"],["hepSC","Heparin SC"],["scd","SCDs/Mechanical"],["none","None (Contraindicated)"]].map(([k,l]) =>
                    <CB key={k} label={l} checked={d.dvt[k]} onChange={v => setNest("dvt", k, v)} />
                  )}
                </div>
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>PUD Prophylaxis</span>
                <div style={{ marginTop: 4 }}>
                  {[["ppi","PPI"],["h2","H2 Blocker"],["enteral","Enteral Feeding"],["none","None"]].map(([k,l]) =>
                    <CB key={k} label={l} checked={d.pud[k]} onChange={v => setNest("pud", k, v)} />
                  )}
                </div>
              </div>
            </SubSection>
          </div>
        </div>

        {/* V. Assessment & Plan */}
        <Section title="V. ASSESSMENT & PLAN">
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Problem List (Including abnormal clinical & physiological parameters)</span>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
              {d.problems.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ background: "#0ea5e9", color: "#fff", borderRadius: 20, width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                  <input value={p} onChange={e => {
                    const probs = [...d.problems];
                    probs[i] = e.target.value;
                    set("problems", probs);
                  }} style={{ flex: 1, border: "1px solid #cbd5e1", borderRadius: 6, padding: "6px 8px", fontSize: 13 }} />
                </div>
              ))}
              <button onClick={() => set("problems", [...d.problems, ""])} className="no-print"
                style={{ alignSelf: "flex-start", background: "#f1f5f9", border: "1px dashed #94a3b8", borderRadius: 6, padding: "5px 12px", fontSize: 12, cursor: "pointer", color: "#64748b" }}>
                + Add Problem
              </button>
            </div>
          </div>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Daily Plan</span>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
              {[["planNeuro","Neuro"],["planCVS","CVS"],["planResp","Resp"],["planID","ID"],["planGIRenal","GI/Renal"],["planOther","Other"]].map(([k,l]) => (
                <div key={k} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#0f172a", background: "#e2e8f0", borderRadius: 4, padding: "3px 8px", minWidth: 64, textAlign: "center", marginTop: 2 }}>{l}</span>
                  <div style={{ flex: 1 }}><Field label="" value={d[k]} onChange={v => set(k, v)} /></div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Footer */}
        <div style={{ textAlign: "center", color: "#94a3b8", fontSize: 11, paddingBottom: 24 }}>
          ICU O.Dakka · KAMC · Critical Care Admission & Re-Assessment Note
        </div>
      </div>
    </div>
  );
}
