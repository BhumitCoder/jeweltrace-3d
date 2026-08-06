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
  return (
    <svg width="196" height="104" viewBox="0 0 196 104" style={{ display: "block" }}>
      {/* Side profile of round brilliant */}
      {/* Crown (trapezoid) */}
      <polygon points="58,52 138,52 128,28 68,28" fill="none" stroke={TEXT} strokeWidth="1" />
      {/* Table line */}
      <line x1="68" y1="28" x2="128" y2="28" stroke={TEXT} strokeWidth="1.2" />
      {/* Girdle */}
      <rect x="56" y="52" width="84" height="3" fill={TEXT} opacity="0.12" stroke={TEXT} strokeWidth="0.5" />
      {/* Pavilion (inverted triangle) */}
      <polygon points="56,55 140,55 98,95" fill="none" stroke={TEXT} strokeWidth="1" />

      {/* 62% arrow at top */}
      <line x1="68" y1="22" x2="128" y2="22" stroke={TEXT} strokeWidth="0.6" markerEnd="url(#arr)" />
      <line x1="68" y1="19" x2="68" y2="25" stroke={TEXT} strokeWidth="0.6" />
      <line x1="128" y1="19" x2="128" y2="25" stroke={TEXT} strokeWidth="0.6" />
      <text x="98" y="20" textAnchor="middle" fontSize="8" fill={TEXT} fontWeight="600">62%</text>

      {/* 14.0% height label (crown) */}
      <line x1="48" y1="28" x2="48" y2="52" stroke={TEXT} strokeWidth="0.5" strokeDasharray="2,1" />
      <text x="46" y="41" textAnchor="end" fontSize="7.5" fill={TEXT}>14.0%</text>

      {/* 43.0% height label (pavilion) */}
      <line x1="42" y1="55" x2="42" y2="95" stroke={TEXT} strokeWidth="0.5" strokeDasharray="2,1" />
      <text x="40" y="76" textAnchor="end" fontSize="7.5" fill={TEXT}>43.0%</text>

      {/* 80% total depth */}
      <line x1="148" y1="28" x2="148" y2="95" stroke={TEXT} strokeWidth="0.5" strokeDasharray="2,1" />
      <text x="150" y="64" textAnchor="start" fontSize="7.5" fill={TEXT}>80%</text>

      {/* 33.5° crown angle */}
      <text x="130" y="38" fontSize="7.5" fill={TEXT}>33.5°</text>
      {/* 41.0° pavilion angle */}
      <text x="130" y="66" fontSize="7.5" fill={TEXT}>41.0°</text>
      {/* 61.5° pavilion */}
      <text x="130" y="80" fontSize="7.5" fill={TEXT}>61.5°</text>

      {/* "Profile to actual proportions" label */}
      <text x="98" y="103" textAnchor="middle" fontSize="7" fill={MUTED} fontStyle="italic">Profile to actual proportions</text>

      {/* Top-view facet diagram (right side) */}
      {/* Outer circle */}
      <circle cx="163" cy="60" r="32" fill="none" stroke={TEXT} strokeWidth="1" />
      {/* Table octagon */}
      <polygon points="163,36 175,44 175,76 163,84 151,76 151,44" fill="none" stroke={TEXT} strokeWidth="0.7" />
      {/* Star facets */}
      {[0,45,90,135,180,225,270,315].map(a => {
        const r1 = 20, r2 = 32;
        const x1 = 163 + r1*Math.cos(a*Math.PI/180);
        const y1 = 60 + r1*Math.sin(a*Math.PI/180);
        const x2 = 163 + r2*Math.cos(a*Math.PI/180);
        const y2 = 60 + r2*Math.sin(a*Math.PI/180);
        return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={TEXT} strokeWidth="0.6" />;
      })}
      {/* Center point */}
      <circle cx="163" cy="60" r="1.5" fill={TEXT} opacity="0.4" />
    </svg>
  );
}

/* ─── Circular Seal SVG ───────────────────────── */
function CircularSeal({ logoSrc }: { logoSrc: string }) {
  const R = 60, CX = 65, CY = 65;
  const textR = 55;
  const topText = "JEWELSREPORT";
  const btmText = "GEMOLOGICAL CERTIFICATION LAB";
  return (
    <svg width="130" height="130" viewBox="0 0 130 130" style={{ display: "block" }}>
      {/* Outer ring */}
      <circle cx={CX} cy={CY} r={R} fill={WHITE} stroke={GOLD} strokeWidth="1.5" />
      <circle cx={CX} cy={CY} r={R - 4} fill="none" stroke={GOLD} strokeWidth="0.5" />

      {/* Dashed pattern ring */}
      <circle cx={CX} cy={CY} r={R - 7} fill="none" stroke={GOLD} strokeWidth="0.4" strokeDasharray="2,2" />

      {/* Top curved text: JEWELSREPORT */}
      <defs>
        <path id="topArc" d={`M ${CX - textR},${CY} A ${textR},${textR} 0 0,1 ${CX + textR},${CY}`} />
        <path id="btmArc" d={`M ${CX - textR + 6},${CY + 4} A ${textR - 6},${textR - 6} 0 0,0 ${CX + textR - 6},${CY + 4}`} />
      </defs>
      <text fontSize="7.5" fontWeight="800" letterSpacing="3" fill={NAVY} textAnchor="middle">
        <textPath href="#topArc" startOffset="50%">{topText}</textPath>
      </text>
      <text fontSize="5.5" fontWeight="600" letterSpacing="1.5" fill={NAVY} textAnchor="middle">
        <textPath href="#btmArc" startOffset="50%">{btmText}</textPath>
      </text>

      {/* Stars at left and right */}
      <text x={CX - textR + 2} y={CY + 2} fontSize="7" fill={GOLD} textAnchor="middle">★</text>
      <text x={CX + textR - 2} y={CY + 2} fontSize="7" fill={GOLD} textAnchor="middle">★</text>

      {/* Logo image */}
      <image href={logoSrc} x={CX - 22} y={CY - 30} width="44" height="44" />

      {/* CERTIFIED text */}
      <text x={CX} y={CY + 22} textAnchor="middle" fontSize="6" fontWeight="800" letterSpacing="2" fill={GOLD}>CERTIFIED</text>
      {/* Thin divider */}
      <line x1={CX - 18} y1={CY + 26} x2={CX + 18} y2={CY + 26} stroke={GOLD} strokeWidth="0.5" opacity="0.6" />
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

            {/* Circular seal — centered */}
            <div style={{ flexShrink:0, display:"flex", justifyContent:"center" }}>
              <CircularSeal logoSrc={logo} />
            </div>

            {/* QR + contact */}
            <div style={{ flexShrink:0, display:"flex", gap:10, alignItems:"flex-start" }}>
              <div style={{ padding:4, background:WHITE, border:`1px solid ${RULE}`, flexShrink:0 }}>
                <QRCodeSVG value={verifyUrl} size={64} level="M" fgColor={NAVY} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:8, color:TEXT, fontWeight:600, lineHeight:1.7 }}>jewelsreport.com/verify</div>
                <div style={{ fontSize:8, color:GOLD, lineHeight:1.7 }}>reportcheck@jewelsreport.com</div>
                <div style={{ fontSize:8, color:GOLD, lineHeight:1.7 }}>+91 98765 43210</div>
              </div>
            </div>

            {/* Security features box */}
            <div style={{ flexShrink:0, border:`1px solid ${RULE}`, background:WHITE, padding:"7px 10px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                {/* lock icon */}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="2" y="6" width="10" height="7" rx="1.5" stroke={NAVY} strokeWidth="1.2" />
                  <path d="M4.5 6V4a2.5 2.5 0 0 1 5 0v2" stroke={NAVY} strokeWidth="1.2" />
                  <circle cx="7" cy="9.5" r="1" fill={NAVY} />
                </svg>
                <span style={{ fontSize:7.5, fontWeight:800, letterSpacing:"0.18em", textTransform:"uppercase", color:NAVY }}>Security Features</span>
              </div>
              <div style={{ fontSize:7.5, fontWeight:700, color:TEXT, letterSpacing:"0.04em", lineHeight:1.8 }}>
                HOLOGRAPHIC FOIL • GUILLOCHE PATTERN<br />EMBOSSED SEAL • UV REACTIVE INK
              </div>
              <div style={{ fontSize:7, color:MUTED, marginTop:3, lineHeight:1.6 }}>
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
