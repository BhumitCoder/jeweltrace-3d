import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { Certificate } from "@/lib/store";
import { REPORT_TYPE_LABELS } from "@/lib/store";
import logo from "@/assets/logo.png";

export const A4_W = 1122;
export const A4_H = 794;

/* ─── Palette ─────────────────────────────────── */
const NAVY   = "#1B2A4A";
const NAVY2  = "#0E1A2E";
const GOLD   = "#C9963A";
const GOLD_L = "#E8C870";
const GOLD_D = "#9B7018";
const GRD    = `linear-gradient(90deg,${GOLD_L},${GOLD},${GOLD_D})`;
const CREAM  = "#FDFAF4";
const WHITE  = "#FFFFFF";
const MUTED  = "#6B7A8D";
const RULE   = "rgba(201,150,58,0.22)";
const TEXT   = "#1B2A4A";

/* ─── Left-panel field row (label … dotted … VALUE) ── */
function FR({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div style={{ display: "flex", alignItems: "flex-end", padding: "3px 14px" }}>
      <span style={{ fontSize: 9, color: TEXT, lineHeight: 1.5, whiteSpace: "nowrap", flexShrink: 0 }}>{label}</span>
      <span style={{ flex: 1, borderBottom: "1px dotted rgba(27,42,74,0.25)", margin: "0 6px 2px", minWidth: 8 }} />
      <span style={{ fontSize: 9.5, fontWeight: 700, color: TEXT, lineHeight: 1.5, whiteSpace: "nowrap", textAlign: "right", textTransform: "uppercase" }}>{value}</span>
    </div>
  );
}

/* ─── Gold section label ──────────────────────── */
function SL({ label }: { label: string }) {
  return (
    <div style={{ padding: "6px 14px 3px" }}>
      <span style={{ fontSize: 7, fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase", color: GOLD }}>{label}</span>
    </div>
  );
}

/* ─── Proportion diagram SVG ──────────────────── */
function ProportionDiagram() {
  // Diamond cross-section centered at x=108, spans from y=14 to y=106
  // Girdle: x=60..156, y=50..53  Table: x=74..142, y=14
  const cx = 108, tL = 74, tR = 142, gL = 60, gR = 156, culet = 106;
  const gT = 50, gB = 53;

  // Top-view circle center
  const vc = 218, vy = 60, vr = 38;

  return (
    <svg width="270" height="116" viewBox="0 0 270 116" style={{ display:"block" }}>

      {/* ── Crown (trapezoid) ── */}
      <polygon points={`${tL},14 ${tR},14 ${gR},${gT} ${gL},${gT}`}
        fill="none" stroke={TEXT} strokeWidth="1.1" />
      {/* Table (bold top line) */}
      <line x1={tL} y1="14" x2={tR} y2="14" stroke={TEXT} strokeWidth="1.4" />
      {/* Girdle (thin filled band) */}
      <rect x={gL} y={gT} width={gR-gL} height={gB-gT}
        fill={TEXT} opacity="0.15" stroke={TEXT} strokeWidth="0.5" />
      {/* Pavilion */}
      <polygon points={`${gL},${gB} ${gR},${gB} ${cx},${culet}`}
        fill="none" stroke={TEXT} strokeWidth="1.1" />

      {/* ── 62% table width arrow ── */}
      <line x1={tL} y1="8" x2={tR} y2="8" stroke={TEXT} strokeWidth="0.7" />
      <line x1={tL} y1="5" x2={tL} y2="11" stroke={TEXT} strokeWidth="0.7" />
      <line x1={tR} y1="5" x2={tR} y2="11" stroke={TEXT} strokeWidth="0.7" />
      <text x={cx} y="7" textAnchor="middle" fontSize="8" fill={TEXT} fontWeight="700">62%</text>

      {/* ── Left labels ── */}
      {/* 14.0% crown height */}
      <line x1={gL-4} y1="14" x2={gL-4} y2={gT} stroke={TEXT} strokeWidth="0.5" strokeDasharray="2,1.5" />
      <line x1={gL-8} y1="14" x2={gL-1} y2="14" stroke={TEXT} strokeWidth="0.5" />
      <line x1={gL-8} y1={gT} x2={gL-1} y2={gT} stroke={TEXT} strokeWidth="0.5" />
      <text x={gL-6} y="33" textAnchor="end" fontSize="8" fill={TEXT}>14.0%</text>

      {/* 43.0% pavilion depth */}
      <line x1={gL-4} y1={gB} x2={gL-4} y2={culet} stroke={TEXT} strokeWidth="0.5" strokeDasharray="2,1.5" />
      <line x1={gL-8} y1={gB} x2={gL-1} y2={gB} stroke={TEXT} strokeWidth="0.5" />
      <line x1={gL-8} y1={culet} x2={gL-1} y2={culet} stroke={TEXT} strokeWidth="0.5" />
      <text x={gL-6} y="82" textAnchor="end" fontSize="8" fill={TEXT}>43.0%</text>

      {/* ── Right labels ── */}
      {/* 80% total depth */}
      <line x1={gR+10} y1="14" x2={gR+10} y2={culet} stroke={TEXT} strokeWidth="0.5" strokeDasharray="2,1.5" />
      <line x1={gR+6} y1="14" x2={gR+14} y2="14" stroke={TEXT} strokeWidth="0.5" />
      <line x1={gR+6} y1={culet} x2={gR+14} y2={culet} stroke={TEXT} strokeWidth="0.5" />
      <text x={gR+16} y="62" textAnchor="start" fontSize="8" fill={TEXT} fontWeight="700">80%</text>

      {/* 33.5° crown angle */}
      <text x={gR+2} y="32" textAnchor="start" fontSize="7.5" fill={TEXT}>33.5°</text>
      {/* 41.0° pavilion upper */}
      <text x={gR+2} y="70" textAnchor="start" fontSize="7.5" fill={TEXT}>41.0°</text>
      {/* 61.5° pavilion lower */}
      <text x={gR+2} y="84" textAnchor="start" fontSize="7.5" fill={TEXT}>61.5°</text>

      {/* "Profile to actual proportions" */}
      <text x={cx} y="114" textAnchor="middle" fontSize="7" fill={MUTED} fontStyle="italic">Profile to actual proportions</text>

      {/* ── Top-view facet diagram ── */}
      {/* Outer circle */}
      <circle cx={vc} cy={vy} r={vr} fill="none" stroke={TEXT} strokeWidth="1" />
      {/* Table octagon */}
      {(() => {
        const pts = Array.from({length:8},(_,i)=>{
          const a=(i*45-22.5)*Math.PI/180;
          return `${vc+24*Math.cos(a)},${vy+24*Math.sin(a)}`;
        }).join(" ");
        return <polygon points={pts} fill="none" stroke={TEXT} strokeWidth="0.8" />;
      })()}
      {/* 8 kite facets crown */}
      {[0,45,90,135,180,225,270,315].map(deg=>{
        const a=deg*Math.PI/180, a2=(deg+22.5)*Math.PI/180, a3=(deg-22.5)*Math.PI/180;
        const x1=vc+24*Math.cos(a), y1=vy+24*Math.sin(a);
        const x2=vc+vr*Math.cos(a2), y2=vy+vr*Math.sin(a2);
        const x3=vc+vr*Math.cos(a3), y3=vy+vr*Math.sin(a3);
        return <polyline key={deg} points={`${x2},${y2} ${x1},${y1} ${x3},${y3}`}
          fill="none" stroke={TEXT} strokeWidth="0.6" />;
      })}
      {/* 8 star facets to center */}
      {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map(deg=>{
        const a=deg*Math.PI/180;
        return <line key={deg}
          x1={vc+24*Math.cos(a)} y1={vy+24*Math.sin(a)}
          x2={vc} y2={vy} stroke={TEXT} strokeWidth="0.5" strokeDasharray="1,1" />;
      })}
      <circle cx={vc} cy={vy} r="2" fill={TEXT} opacity="0.3" />
    </svg>
  );
}

/* ─── Circular Seal SVG ───────────────────────── */
function CircularSeal({ logoSrc }: { logoSrc: string }) {
  // 160×160 viewBox, center (80,80), outer radius 74
  const CX = 80, CY = 80, OR = 74, TR = 66;
  // Top arc path for "JEWELSREPORT" — left to right along top half
  const topPath = `M ${CX - TR},${CY} A ${TR},${TR} 0 0,1 ${CX + TR},${CY}`;
  // Bottom arc path for "GEMOLOGICAL CERTIFICATION LAB"
  // Goes right→left along bottom so text reads correctly
  const btmPath = `M ${CX + TR},${CY} A ${TR},${TR} 0 0,1 ${CX - TR},${CY}`;

  return (
    <svg width="160" height="160" viewBox="0 0 160 160" style={{ display:"block" }}>
      <defs>
        <path id="sealTop" d={topPath} />
        <path id="sealBtm" d={btmPath} />
      </defs>

      {/* Outer gold ring */}
      <circle cx={CX} cy={CY} r={OR}   fill={WHITE} stroke={GOLD} strokeWidth="1.8" />
      <circle cx={CX} cy={CY} r={OR-4} fill="none"  stroke={GOLD} strokeWidth="0.6" />
      {/* Dashed decorative ring */}
      <circle cx={CX} cy={CY} r={OR-8} fill="none"  stroke={GOLD} strokeWidth="0.5" strokeDasharray="2.5,2" />

      {/* Top curved text: JEWELSREPORT */}
      <text fontSize="8.5" fontWeight="800" letterSpacing="3.5" fill={NAVY} textAnchor="middle">
        <textPath href="#sealTop" startOffset="50%">JEWELSREPORT</textPath>
      </text>

      {/* Bottom curved text: GEMOLOGICAL CERTIFICATION LAB */}
      <text fontSize="6" fontWeight="700" letterSpacing="1.8" fill={NAVY} textAnchor="middle" dy="-3">
        <textPath href="#sealBtm" startOffset="50%">GEMOLOGICAL CERTIFICATION LAB</textPath>
      </text>

      {/* Star separators at 9 o'clock and 3 o'clock */}
      <text x={CX - TR + 2} y={CY + 3.5} textAnchor="middle" fontSize="8" fill={GOLD}>★</text>
      <text x={CX + TR - 2} y={CY + 3.5} textAnchor="middle" fontSize="8" fill={GOLD}>★</text>

      {/* Logo */}
      <image href={logoSrc} x={CX - 26} y={CY - 32} width="52" height="52" />

      {/* CERTIFIED label */}
      <text x={CX} y={CY + 28} textAnchor="middle" fontSize="7" fontWeight="800" letterSpacing="2.5" fill={GOLD}>CERTIFIED</text>
      <line x1={CX-20} y1={CY+32} x2={CX+20} y2={CY+32} stroke={GOLD} strokeWidth="0.6" opacity="0.7" />
    </svg>
  );
}

interface Props { cert: Certificate }

export const A4Certificate = forwardRef<HTMLDivElement, Props>(
  function A4Certificate({ cert }, ref) {
    const verifyUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/verify?id=${encodeURIComponent(cert.reportNo)}`
        : `https://www.jewelsreport.com/verify?id=${cert.reportNo}`;

    const isJ = cert.type === "Lab Grown Jewellery" || cert.type === "Natural Jewellery";
    const isG = cert.type === "Gemstone";
    const isDiamond = !isJ && !isG;

    const fmtDate = (d: string) => {
      try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }).toUpperCase(); }
      catch { return d; }
    };

    const reportTypeLabel = REPORT_TYPE_LABELS[cert.type] ?? cert.type;

    const certTitle = isG ? "GEMSTONE GRADING REPORT"
      : isJ ? "JEWELLERY GRADING REPORT"
      : `${cert.type.replace("Natural ", "").replace("Lab Grown ", "").toUpperCase()} GRADING REPORT`;

    const hasImg  = !!(cert.imageDataUrl || cert.imageDataUrl2);
    const has2Img = !!(cert.imageDataUrl && cert.imageDataUrl2);

    return (
      <div ref={ref} style={{
        width: A4_W, height: A4_H,
        fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif",
        boxSizing: "border-box", overflow: "hidden",
        display: "flex", flexDirection: "row",
        background: WHITE,
        border: `2px solid ${GOLD}`,
        position: "relative",
      }}>
        {/* Inner pinstripe */}
        <div style={{ position:"absolute", inset:5, border:`0.5px solid rgba(201,150,58,0.30)`, pointerEvents:"none", zIndex:10 }} />

        {/* ════════════════════════════════════
            LEFT PANEL — 318px
        ════════════════════════════════════ */}
        <div style={{
          width: 318, flexShrink:0,
          display:"flex", flexDirection:"column",
          borderRight:`1.5px solid ${GOLD}`,
          background: WHITE,
          overflow:"hidden",
        }}>
          {/* Brand header */}
          <div style={{
            padding:"14px 14px 12px",
            display:"flex", alignItems:"center", gap:12,
            borderBottom:`1px solid ${RULE}`,
            flexShrink:0,
          }}>
            <div style={{
              width:62, height:62, flexShrink:0, borderRadius:"50%",
              border:`1.5px solid ${GOLD}`,
              boxShadow:`0 0 0 4px rgba(201,150,58,0.09)`,
              background: WHITE,
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              <img src={logo} alt="" style={{ height:40, width:40, objectFit:"contain" }} />
            </div>
            <div>
              <div style={{ fontFamily:"Georgia,'Times New Roman',serif", fontSize:18, fontWeight:700, color:NAVY, letterSpacing:"0.12em", textTransform:"uppercase", lineHeight:1 }}>JewelsReport</div>
              <div style={{ fontSize:7, letterSpacing:"0.20em", textTransform:"uppercase", color:MUTED, marginTop:4, lineHeight:1 }}>Gemological Certification Lab</div>
            </div>
          </div>

          {/* Section title bar */}
          <div style={{ background:NAVY2, padding:"6px 14px", flexShrink:0, textAlign:"center" }}>
            <span style={{ fontSize:8, fontWeight:800, letterSpacing:"0.28em", textTransform:"uppercase", color:GOLD_L }}>{certTitle}</span>
          </div>

          {/* Grading fields */}
          <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", paddingTop:4 }}>
            {/* Identification */}
            {isG && (<>
              <FR label="GRL Report Number"      value={cert.reportNo} />
              <FR label="Variety"                value={cert.gemstoneStone} />
              <FR label="Shape & Cutting Style"  value={cert.gemstoneShape} />
              <FR label="Measurements"           value={cert.gemstoneMeasurements} />
              <FR label="Pieces (PCS)"           value={cert.gemstonePcs} />
              <FR label="Origin"                 value={cert.gemstoneOrigin} />
              <SL label="Gemological Results" />
              <FR label="Carat Weight"           value={cert.gemstoneCaratWeight} />
              <FR label="Color & Transparency"   value={cert.gemstoneColorTransparency} />
              <FR label="Characteristics"        value={cert.gemstoneCharacteristics} />
            </>)}

            {isJ && (<>
              <FR label="GRL Report Number"    value={cert.reportNo} />
              <FR label="Item Description"     value={cert.itemName} />
              <FR label="Shape"                value={cert.shape} />
              <FR label="Metal Tested As"      value={cert.metal} />
              <FR label="Gross Weight"         value={cert.grossWeight ? `${cert.grossWeight} GRM` : undefined} />
              <FR label="Net Weight"           value={cert.netWeight ? `${cert.netWeight} GRM` : undefined} />
              <FR label="Origin"               value={cert.origin} />
              {cert.metalDescription && <FR label="Marking(s)"    value={cert.metalDescription} />}
              {(cert.diamondShape || cert.diamondWeight || cert.diamondColor || cert.diamondClarity) && (<>
                <SL label="Diamond Details" />
                <FR label="Diamond Shape"      value={cert.diamondShape} />
                <FR label="Diamond Weight"     value={cert.diamondWeight ? `${cert.diamondWeight} CT` : undefined} />
                <FR label="Total PCS"          value={cert.diamondTotalPcs} />
                <FR label="Color"              value={cert.diamondColor} />
                <FR label="Clarity"            value={cert.diamondClarity} />
              </>)}
              {(cert.gemstoneStone || cert.gemstoneOrigin) && (<>
                <SL label="Gemstone Details" />
                <FR label="Gemstone"           value={cert.gemstoneStone} />
                <FR label="Origin"             value={cert.gemstoneOrigin} />
                <FR label="Weight"             value={cert.gemstoneCaratWeight} />
                <FR label="PCS"                value={cert.gemstonePcs} />
              </>)}
            </>)}

            {isDiamond && (<>
              <FR label="GRL Report Number"      value={cert.reportNo} />
              <FR label="Shape & Cutting Style"  value={cert.shape} />
              <FR label="Measurements"           value={cert.measurements} />
              <SL label="Grading Results" />
              <FR label="Carat Weight"           value={cert.caratWeight ? `${cert.caratWeight} CARAT` : undefined} />
              <FR label="Color Grade"            value={cert.color} />
              <FR label="Clarity Grade"          value={cert.clarity} />
              <FR label="Cut Grade"              value={cert.cut} />
              <SL label="Additional Grading Information" />
              <FR label="Polish Grade"           value={cert.polish} />
              <FR label="Symmetry Grade"         value={cert.symmetry} />
              <FR label="Fluorescence"           value={cert.fluorescence} />
              <FR label="Origin"                 value={cert.origin} />
            </>)}

            {cert.remarks && (<>
              <SL label="Comments" />
              <div style={{ padding:"2px 14px 6px" }}>
                <span style={{ fontSize:9.5, color:TEXT, lineHeight:1.6 }}>{cert.remarks}</span>
              </div>
            </>)}

            {/* Spacer + certified authentic */}
            <div style={{ flex:1 }} />
            <div style={{ textAlign:"center", padding:"6px 0", flexShrink:0 }}>
              <span style={{ fontSize:7, letterSpacing:"0.28em", color:GOLD, textTransform:"uppercase" }}>• Certified Authentic •</span>
            </div>

            {/* Signature */}
            <div style={{ borderTop:`1px solid ${RULE}`, padding:"8px 14px 10px", flexShrink:0, textAlign:"center" }}>
              <div style={{ height:36, display:"flex", alignItems:"flex-end", justifyContent:"center", marginBottom:4 }}>
                {cert.signatureDataUrl
                  ? <img src={cert.signatureDataUrl} alt="Signature" style={{ maxHeight:36, maxWidth:"80%", objectFit:"contain" }} />
                  : <div style={{ width:"60%", borderBottom:`1px solid rgba(27,42,74,0.3)` }} />
                }
              </div>
              <div style={{ fontSize:8.5, fontWeight:600, color:TEXT }}>Authorised Signatory</div>
              <div style={{ fontSize:7.5, color:MUTED, marginTop:1 }}>JewelsReport Gemological Certification Lab</div>
            </div>
          </div>

          {/* Left footer */}
          <div style={{ background:GRD, padding:"4px 14px", flexShrink:0, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:6.5, fontWeight:700, color:NAVY2, letterSpacing:"0.06em" }}>jewelsreport.com</span>
            <span style={{ fontSize:6.5, fontWeight:700, color:NAVY2, letterSpacing:"0.05em", textTransform:"uppercase" }}>
              {cert.reportNo.split("-")[0]}-GEM {certTitle}
            </span>
          </div>
        </div>

        {/* ════════════════════════════════════
            CENTER PANEL — 448px
        ════════════════════════════════════ */}
        <div style={{
          width:448, flexShrink:0,
          display:"flex", flexDirection:"column",
          borderRight:`1.5px solid ${GOLD}`,
          background: WHITE,
          overflow:"hidden",
        }}>
          {/* Report number hero */}
          <div style={{ flexShrink:0, textAlign:"center", padding:"12px 16px 10px", borderBottom:`1.5px solid ${GOLD}` }}>
            <div style={{ fontSize:7, letterSpacing:"0.38em", textTransform:"uppercase", color:MUTED, marginBottom:4 }}>GRL Report Number</div>
            <div style={{ fontFamily:"Georgia,'Times New Roman',serif", fontSize:38, fontWeight:700, color:NAVY, letterSpacing:"0.04em", lineHeight:1 }}>
              {cert.reportNo}
            </div>
            <div style={{ fontSize:8, color:MUTED, marginTop:5 }}>Verify at jewelsreport.com/verify</div>
            <div style={{ fontFamily:"Georgia,serif", fontSize:12, fontWeight:600, color:GOLD, marginTop:4, letterSpacing:"0.06em" }}>
              {fmtDate(cert.issueDate)}
            </div>
          </div>

          {/* Description */}
          <div style={{ flexShrink:0, borderBottom:`1px solid ${RULE}` }}>
            <div style={{ padding:"5px 14px 0" }}>
              <span style={{ fontSize:7, fontWeight:800, letterSpacing:"0.24em", textTransform:"uppercase", color:GOLD }}>Item(s) Overall Description</span>
            </div>
            {cert.description && (
              <div style={{ padding:"3px 14px 6px" }}>
                <span style={{ fontSize:9, color:TEXT, lineHeight:1.6 }}>{cert.description}</span>
              </div>
            )}
          </div>

          {/* Images */}
          <div style={{ flex:1, minHeight:0, padding:"8px 14px", display:"flex", flexDirection:"column", gap:6, overflow:"hidden" }}>
            {cert.imageDataUrl && (
              <div style={{ width:"100%", flex: has2Img ? "1 1 0" : "1 1 0", minHeight:0, maxHeight: has2Img ? 195 : 370, borderRadius:6, overflow:"hidden", border:`1px solid ${RULE}` }}>
                <img src={cert.imageDataUrl} alt="Item" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
              </div>
            )}
            {cert.imageDataUrl2 && (
              <div style={{ width:"100%", flex:"1 1 0", minHeight:0, maxHeight:195, borderRadius:6, overflow:"hidden", border:`1px solid ${RULE}` }}>
                <img src={cert.imageDataUrl2} alt="Item" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
              </div>
            )}
            {!hasImg && (
              <div style={{ width:"100%", flex:"1 1 0", minHeight:0, borderRadius:6, border:`1px dashed rgba(201,150,58,0.25)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:8, color:MUTED, letterSpacing:"0.28em", textTransform:"uppercase", opacity:0.5 }}>No Image Provided</span>
              </div>
            )}
          </div>

          {/* Proportion Diagram — only for diamond reports */}
          {isDiamond && (
            <div style={{ flexShrink:0, borderTop:`1px solid ${RULE}`, padding:"6px 14px 4px" }}>
              <div style={{ marginBottom:3 }}>
                <span style={{ fontSize:7, fontWeight:800, letterSpacing:"0.24em", textTransform:"uppercase", color:GOLD }}>Proportion Diagram</span>
              </div>
              <ProportionDiagram />
            </div>
          )}

          {/* Important Limitations */}
          <div style={{ flexShrink:0, borderTop:`1px solid ${RULE}`, padding:"5px 14px 6px" }}>
            <div style={{ marginBottom:2 }}>
              <span style={{ fontSize:7, fontWeight:800, letterSpacing:"0.22em", textTransform:"uppercase", color:GOLD }}>Important Limitations</span>
            </div>
            <p style={{ fontSize:7.5, color:MUTED, lineHeight:1.65, margin:0 }}>
              This report is generated using advanced gemological instruments and procedures. The results reflect the characteristics of the diamond at the time of examination. This report is not a guarantee or valuation. For additional information and important limitations please see jewelsreport.com/terms or contact the JewelsReport Gemological Certification Lab directly.
            </p>
          </div>

          {/* Center footer */}
          <div style={{ background:GRD, padding:"4px 14px", flexShrink:0, textAlign:"center" }}>
            <span style={{ fontSize:6.5, fontWeight:700, color:NAVY2, letterSpacing:"0.10em", textTransform:"uppercase" }}>Gemological Certification Lab · Surat, Gujarat, India</span>
          </div>
        </div>

        {/* ════════════════════════════════════
            RIGHT PANEL — 356px
        ════════════════════════════════════ */}
        <div style={{
          flex:1,
          display:"flex", flexDirection:"column",
          background: CREAM,
          overflow:"hidden",
        }}>
          {/* Official record header */}
          <div style={{ flexShrink:0, textAlign:"center", padding:"14px 16px 12px", borderBottom:`1.5px solid ${GOLD}` }}>
            <div style={{ fontSize:7, letterSpacing:"0.34em", textTransform:"uppercase", color:MUTED, marginBottom:6 }}>Official Certification Record</div>
            <div style={{ fontFamily:"Georgia,serif", fontSize:14, fontWeight:700, color:NAVY, letterSpacing:"0.06em" }}>Gemological Certification Lab</div>
            <div style={{ fontSize:8.5, color:GOLD, marginTop:3, letterSpacing:"0.06em" }}>jewelsreport.com</div>
          </div>

          {/* Section label */}
          <div style={{ flexShrink:0, padding:"7px 16px 2px", borderBottom:`1px solid ${RULE}` }}>
            <span style={{ fontSize:7, fontWeight:800, letterSpacing:"0.24em", textTransform:"uppercase", color:GOLD }}>Certification &amp; Authentication</span>
          </div>

          <div style={{ flex:1, padding:"10px 14px", display:"flex", flexDirection:"column", gap:9, overflow:"hidden" }}>
            {/* Certification Statement */}
            <div style={{ flexShrink:0, border:`1px solid rgba(201,150,58,0.35)`, borderLeft:`2.5px solid ${GOLD}`, background:WHITE, padding:"8px 10px" }}>
              <div style={{ fontSize:7, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:NAVY, marginBottom:5 }}>Certification Statement</div>
              <p style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:9, color:TEXT, lineHeight:1.75, margin:0 }}>
                This is to certify that the article described herein has been examined by JewelsReport Gemological Certification Lab and the results documented are based on standard gemological testing methods.
              </p>
            </div>

            {/* Disclaimer italic */}
            <div style={{ flexShrink:0, flex:"0 1 auto", overflow:"hidden" }}>
              <p style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:7.5, color:MUTED, lineHeight:1.8, margin:0 }}>
                The results documented in this report apply only to the article described, and were obtained using the techniques and equipment used by JewelsReport at the time of examination. This report is not a guarantee or valuation. For additional information and important limitations please see jewelsreport.com/terms or contact the JewelsReport Gemological Certification Lab directly.<br /><br />
                ©{new Date().getFullYear()} JewelsReport Gemological Certification Lab. All rights reserved.
              </p>
            </div>

            {/* Circular seal — centered, large */}
            <div style={{ flexShrink:0, display:"flex", justifyContent:"center", margin:"2px 0" }}>
              <CircularSeal logoSrc={logo} />
            </div>

            {/* QR + contact */}
            <div style={{ flexShrink:0, display:"flex", gap:10, alignItems:"center", border:`1px solid ${RULE}`, background:WHITE, padding:"6px 8px" }}>
              <div style={{ padding:3, background:WHITE, border:`1px solid ${RULE}`, flexShrink:0 }}>
                <QRCodeSVG value={verifyUrl} size={58} level="M" fgColor={NAVY} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:8, color:TEXT, fontWeight:600, lineHeight:1.8 }}>jewelsreport.com/verify</div>
                <div style={{ fontSize:8, color:GOLD, fontWeight:500, lineHeight:1.8 }}>reportcheck@jewelsreport.com</div>
                <div style={{ fontSize:8, color:GOLD, fontWeight:500, lineHeight:1.8 }}>+91 98765 43210</div>
              </div>
            </div>

            {/* Security features box */}
            <div style={{ flexShrink:0, border:`1px solid ${RULE}`, background:WHITE, padding:"6px 10px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <rect x="2" y="6" width="10" height="7" rx="1.5" stroke={NAVY} strokeWidth="1.2" />
                  <path d="M4.5 6V4a2.5 2.5 0 0 1 5 0v2" stroke={NAVY} strokeWidth="1.2" />
                  <circle cx="7" cy="9.5" r="1" fill={NAVY} />
                </svg>
                <span style={{ fontSize:7.5, fontWeight:800, letterSpacing:"0.18em", textTransform:"uppercase", color:NAVY }}>Security Features</span>
              </div>
              <div style={{ fontSize:7.5, fontWeight:700, color:TEXT, letterSpacing:"0.04em", lineHeight:1.85 }}>
                HOLOGRAPHIC FOIL • GUILLOCHE PATTERN<br />EMBOSSED SEAL • UV REACTIVE INK
              </div>
              <div style={{ fontSize:7, color:MUTED, marginTop:2, lineHeight:1.6 }}>
                This document is protected. Verify authenticity at jewelsreport.com/verify
              </div>
            </div>
          </div>

          {/* Right footer */}
          <div style={{ background:GRD, padding:"4px 14px", flexShrink:0, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:6.5, fontWeight:700, color:NAVY2, letterSpacing:"0.06em" }}>jewelsreport.com/verify</span>
            <span style={{ fontSize:6.5, fontWeight:700, color:NAVY2, letterSpacing:"0.05em" }}>{cert.reportNo}</span>
          </div>
        </div>

      </div>
    );
  }
);
