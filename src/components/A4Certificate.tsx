import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { Certificate } from "@/lib/store";
import { REPORT_TYPE_LABELS } from "@/lib/store";
import logo from "@/assets/logo.png";

/* A4 LANDSCAPE @ 96dpi — 297mm × 210mm */
export const A4_W = 1122;
export const A4_H = 794;

/* ─── Palette ─────────────────────────────────────────────────────────────
   Dark ink + white + a single gold accent. No frames, no filled bars —
   structure comes from whitespace, hairlines and one soft surface tone.  */
const INK    = "#0B1220";
const INK_2  = "#475467";
const MICRO  = "#98A2B3";
const LINE   = "#E7EAEF";
const SURF   = "#F8F9FB";
const GOLD   = "#B08D3F";
const GOLD_L = "#E3C87F";
const WHITE  = "#FFFFFF";

const SANS = "'Inter','Segoe UI',system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif";

/* ─── Section heading: micro label followed by a hairline ─────────────── */
function Head({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9 }}>
      <span style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: "0.26em", color: MICRO, whiteSpace: "nowrap" }}>
        {label}
      </span>
      <span style={{ flex: 1, height: 1, background: LINE }} />
    </div>
  );
}

/* ─── Headline stat tile ──────────────────────────────────────────────── */
function Tile({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  const n = value.length;
  const size = n > 12 ? 12 : n > 8 ? 14.5 : n > 5 ? 17 : 21;
  return (
    <div style={{ background: SURF, border: `1px solid ${LINE}`, borderRadius: 12, padding: "9px 12px 11px" }}>
      <div style={{ fontSize: 6.8, fontWeight: 700, letterSpacing: "0.24em", color: MICRO }}>{label}</div>
      <div style={{ fontSize: size, fontWeight: 700, color: INK, lineHeight: 1.15, marginTop: 5, letterSpacing: "-0.01em", fontVariantNumeric: "tabular-nums" }}>
        {value}
      </div>
    </div>
  );
}

/* ─── Spec row ────────────────────────────────────────────────────────── */
function Row({ label, value, last }: { label: string; value?: string; last?: boolean }) {
  if (!value) return null;
  return (
    <div style={{
      display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 14,
      padding: "6px 0", borderBottom: last ? "none" : `1px solid ${LINE}`,
    }}>
      <span style={{ fontSize: 8.5, color: INK_2, whiteSpace: "nowrap" }}>{label}</span>
      <span style={{ fontSize: 9.5, fontWeight: 600, color: INK, textAlign: "right", letterSpacing: "0.01em" }}>{value}</span>
    </div>
  );
}

/* ─── Security pill ───────────────────────────────────────────────────── */
function Pill({ children }: { children: string }) {
  return (
    <span style={{
      background: SURF, border: `1px solid ${LINE}`, borderRadius: 999,
      padding: "3.5px 9px", fontSize: 6.6, fontWeight: 700, letterSpacing: "0.16em", color: INK_2,
      whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

/* ─── Proportion diagram ──────────────────────────────────────────────── */
function ProportionDiagram() {
  const cx = 86, tL = 56, tR = 116, gL = 42, gR = 130, culet = 88;
  const gT = 42, gB = 45;
  const vc = 196, vy = 50, vr = 33;

  return (
    <svg width="248" height="100" viewBox="0 0 248 100" style={{ display: "block", margin: "0 auto" }}>
      <polygon points={`${tL},12 ${tR},12 ${gR},${gT} ${gL},${gT}`} fill="none" stroke={INK_2} strokeWidth="1" />
      <line x1={tL} y1="12" x2={tR} y2="12" stroke={INK} strokeWidth="1.4" />
      <rect x={gL} y={gT} width={gR - gL} height={gB - gT} fill={GOLD} opacity="0.35" />
      <polygon points={`${gL},${gB} ${gR},${gB} ${cx},${culet}`} fill="none" stroke={INK_2} strokeWidth="1" />

      <line x1={tL} y1="6" x2={tR} y2="6" stroke={MICRO} strokeWidth="0.6" />
      <text x={cx} y="4.5" textAnchor="middle" fontSize="7" fill={INK_2} fontWeight="700" fontFamily={SANS}>62%</text>

      <text x={gL - 6} y="30" textAnchor="end" fontSize="7" fill={MICRO} fontFamily={SANS}>14.0%</text>
      <text x={gL - 6} y="70" textAnchor="end" fontSize="7" fill={MICRO} fontFamily={SANS}>43.0%</text>
      <line x1={gR + 9} y1="12" x2={gR + 9} y2={culet} stroke={LINE} strokeWidth="1" />
      <text x={gR + 13} y="52" textAnchor="start" fontSize="7" fill={INK_2} fontWeight="700" fontFamily={SANS}>80%</text>
      <text x={gR + 2} y="28" textAnchor="start" fontSize="6.5" fill={MICRO} fontFamily={SANS}>33.5°</text>
      <text x={gR + 2} y="66" textAnchor="start" fontSize="6.5" fill={MICRO} fontFamily={SANS}>41.0°</text>

      <circle cx={vc} cy={vy} r={vr} fill="none" stroke={INK_2} strokeWidth="0.9" />
      {(() => {
        const pts = Array.from({ length: 8 }, (_, i) => {
          const a = (i * 45 - 22.5) * Math.PI / 180;
          return `${vc + 20 * Math.cos(a)},${vy + 20 * Math.sin(a)}`;
        }).join(" ");
        return <polygon points={pts} fill="none" stroke={INK_2} strokeWidth="0.7" />;
      })()}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const a = deg * Math.PI / 180, a2 = (deg + 22.5) * Math.PI / 180, a3 = (deg - 22.5) * Math.PI / 180;
        return <polyline key={deg}
          points={`${vc + vr * Math.cos(a2)},${vy + vr * Math.sin(a2)} ${vc + 20 * Math.cos(a)},${vy + 20 * Math.sin(a)} ${vc + vr * Math.cos(a3)},${vy + vr * Math.sin(a3)}`}
          fill="none" stroke={MICRO} strokeWidth="0.55" />;
      })}
      {[22.5, 112.5, 202.5, 292.5].map((deg) => {
        const a = deg * Math.PI / 180;
        return <line key={deg} x1={vc + 20 * Math.cos(a)} y1={vy + 20 * Math.sin(a)} x2={vc} y2={vy}
          stroke={MICRO} strokeWidth="0.45" />;
      })}
    </svg>
  );
}

/* ─── Certification seal ──────────────────────────────────────────────── */
function Seal({ size, logoSrc }: { size: number; logoSrc: string }) {
  const CX = 80, CY = 80, OR = 76, TR = 66;
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" style={{ display: "block" }}>
      <defs>
        <path id="sealArcTop" d={`M ${CX - TR},${CY} A ${TR},${TR} 0 0,1 ${CX + TR},${CY}`} />
        <path id="sealArcBtm" d={`M ${CX - TR},${CY} A ${TR},${TR} 0 0,0 ${CX + TR},${CY}`} />
      </defs>
      <circle cx={CX} cy={CY} r={OR} fill={WHITE} stroke={GOLD} strokeWidth="1.2" />
      <circle cx={CX} cy={CY} r={OR - 7} fill="none" stroke={GOLD_L} strokeWidth="0.7" strokeDasharray="1.5,3" />
      <text fontSize="9" fontWeight="700" letterSpacing="3" fill={INK} textAnchor="middle" fontFamily={SANS}>
        <textPath href="#sealArcTop" startOffset="50%">JEWELSREPORT</textPath>
      </text>
      <text fontSize="6.4" fontWeight="700" letterSpacing="2" fill={MICRO} textAnchor="middle" dy="8" fontFamily={SANS}>
        <textPath href="#sealArcBtm" startOffset="50%">GEMOLOGICAL CERTIFICATION LAB</textPath>
      </text>
      <image href={logoSrc} x={CX - 27} y={CY - 32} width="54" height="54" />
      <text x={CX} y={CY + 30} textAnchor="middle" fontSize="6.8" fontWeight="700" letterSpacing="2.6" fill={GOLD} fontFamily={SANS}>CERTIFIED</text>
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
      try { return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase(); }
      catch { return d; }
    };

    const images = [cert.imageDataUrl, cert.imageDataUrl2].filter(Boolean) as string[];

    return (
      <div ref={ref} style={{
        width: A4_W, height: A4_H,
        boxSizing: "border-box", overflow: "hidden", position: "relative",
        background: WHITE, color: INK, fontFamily: SANS,
        display: "flex", flexDirection: "column",
        padding: "34px 36px 22px",
      }}>
        {/* Top accent edge */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, display: "flex" }}>
          <div style={{ width: 232, background: `linear-gradient(90deg,${GOLD},${GOLD_L})` }} />
          <div style={{ flex: 1, background: INK }} />
        </div>

        {/* ═══ HEADER ═══ */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, paddingBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
            <div style={{
              width: 50, height: 50, borderRadius: 13, border: `1px solid ${LINE}`, background: WHITE,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <img src={logo} alt="" style={{ width: 32, height: 32, objectFit: "contain" }} />
            </div>
            <div>
              <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: "0.16em", color: INK, lineHeight: 1 }}>JEWELSREPORT</div>
              <div style={{ fontSize: 7, fontWeight: 600, letterSpacing: "0.3em", color: MICRO, marginTop: 5 }}>
                GEMOLOGICAL CERTIFICATION LAB
              </div>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.3em", color: MICRO }}>REPORT NUMBER</div>
            <div style={{ fontSize: 25, fontWeight: 700, letterSpacing: "-0.015em", color: INK, lineHeight: 1.15, marginTop: 3, fontVariantNumeric: "tabular-nums" }}>
              {cert.reportNo}
            </div>
            <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: "0.14em", color: MICRO, marginTop: 3 }}>
              ISSUED {fmtDate(cert.issueDate)}
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: LINE, flexShrink: 0 }} />

        {/* ═══ TITLE STRIP ═══ */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, padding: "13px 0 16px" }}>
          <span style={{
            background: INK, color: WHITE, borderRadius: 999, padding: "6px 14px",
            fontSize: 8, fontWeight: 700, letterSpacing: "0.26em",
          }}>
            {REPORT_TYPE_LABELS[cert.type] ?? cert.type}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 8.5, color: INK_2, letterSpacing: "0.04em" }}>jewelsreport.com/verify</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: GOLD, display: "inline-block" }} />
              <span style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: "0.22em", color: GOLD }}>CERTIFIED AUTHENTIC</span>
            </span>
          </div>
        </div>

        {/* ═══ MAIN ═══ */}
        <div style={{ flex: 1, minHeight: 0, display: "flex", gap: 22, overflow: "hidden" }}>

          {/* ── Column A — grading ── */}
          <div style={{ width: 336, flexShrink: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <Head label={isJ ? "ITEM SUMMARY" : "GRADING RESULTS"} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {isDiamond && (<>
                <Tile label="CARAT WEIGHT" value={cert.caratWeight ? `${cert.caratWeight} ct` : undefined} />
                <Tile label="COLOUR GRADE" value={cert.color} />
                <Tile label="CLARITY GRADE" value={cert.clarity} />
                <Tile label="CUT GRADE"     value={cert.cut} />
              </>)}
              {isG && (<>
                <Tile label="CARAT WEIGHT" value={cert.gemstoneCaratWeight} />
                <Tile label="VARIETY"      value={cert.gemstoneStone} />
                <Tile label="COLOUR"       value={cert.gemstoneColorTransparency} />
                <Tile label="ORIGIN"       value={cert.gemstoneOrigin} />
              </>)}
              {isJ && (<>
                <Tile label="GROSS WEIGHT"   value={cert.grossWeight ? `${cert.grossWeight} g` : undefined} />
                <Tile label="METAL"          value={cert.metal} />
                <Tile label="DIAMOND WEIGHT" value={cert.diamondWeight ? `${cert.diamondWeight} ct` : undefined} />
                <Tile label="DIAMOND GRADE"  value={[cert.diamondColor, cert.diamondClarity].filter(Boolean).join(" / ") || undefined} />
              </>)}
            </div>

            <div style={{ height: 16 }} />
            <Head label="IDENTIFICATION" />

            {isDiamond && (<>
              <Row label="Shape & Cutting Style" value={cert.shape} />
              <Row label="Measurements"          value={cert.measurements} />
              <Row label="Polish"                value={cert.polish} />
              <Row label="Symmetry"              value={cert.symmetry} />
              <Row label="Fluorescence"          value={cert.fluorescence} />
              <Row label="Origin"                value={cert.origin} last />
            </>)}

            {isG && (<>
              <Row label="Shape & Cutting Style" value={cert.gemstoneShape} />
              <Row label="Measurements"          value={cert.gemstoneMeasurements} />
              <Row label="Pieces"                value={cert.gemstonePcs} />
              <Row label="Transparency"          value={cert.gemstoneColorTransparency} />
              <Row label="Characteristics"       value={cert.gemstoneCharacteristics} last />
            </>)}

            {isJ && (<>
              <Row label="Item"           value={cert.itemName} />
              <Row label="Shape"          value={cert.shape} />
              <Row label="Net Weight"     value={cert.netWeight ? `${cert.netWeight} g` : undefined} />
              <Row label="Marking(s)"     value={cert.metalDescription} />
              <Row label="Diamond Shape"  value={cert.diamondShape} />
              <Row label="Total Pieces"   value={cert.diamondTotalPcs} />
              <Row label="Gemstone"       value={cert.gemstoneStone} />
              <Row label="Origin"         value={cert.origin} last />
            </>)}

            {cert.remarks && (
              <div style={{ marginTop: 14 }}>
                <Head label="COMMENTS" />
                <p style={{ fontSize: 8.5, color: INK_2, lineHeight: 1.65, margin: 0 }}>{cert.remarks}</p>
              </div>
            )}

            <div style={{ flex: 1, minHeight: 10 }} />

            {isDiamond && (
              <div style={{ background: SURF, border: `1px solid ${LINE}`, borderRadius: 14, padding: "9px 12px 7px" }}>
                <div style={{ fontSize: 6.8, fontWeight: 700, letterSpacing: "0.24em", color: MICRO }}>PROPORTIONS</div>
                <ProportionDiagram />
                <div style={{ fontSize: 6.8, color: MICRO, textAlign: "center", marginTop: -3 }}>
                  Profile drawn to actual proportions
                </div>
              </div>
            )}
          </div>

          {/* ── Column B — imagery ── */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <Head label="ITEM PHOTOGRAPHY" />

            <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: images.length > 1 ? "column" : "row", gap: 10 }}>
              {images.length > 0 ? images.map((src, i) => (
                <div key={i} style={{
                  flex: 1, minWidth: 0, borderRadius: 14, overflow: "hidden",
                  border: `1px solid ${LINE}`, background: SURF,
                  boxShadow: "0 1px 2px rgba(11,18,32,0.04), 0 8px 24px -12px rgba(11,18,32,0.18)",
                }}>
                  <img src={src} alt="Item" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </div>
              )) : (
                <div style={{
                  flex: 1, borderRadius: 14, border: `1px dashed ${LINE}`, background: SURF,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: "0.28em", color: MICRO }}>NO PHOTOGRAPH</span>
                </div>
              )}
            </div>

            {cert.description && (
              <p style={{ fontSize: 8.5, color: INK_2, lineHeight: 1.65, margin: "12px 0 0" }}>{cert.description}</p>
            )}

          </div>

          {/* ── Column C — verification ── */}
          <div style={{ width: 288, flexShrink: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <Head label="VERIFICATION" />

            <div style={{ border: `1px solid ${LINE}`, borderRadius: 14, padding: 12, display: "flex", gap: 12, alignItems: "center" }}>
              <QRCodeSVG value={verifyUrl} size={78} level="M" fgColor={INK} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 6.8, fontWeight: 700, letterSpacing: "0.24em", color: MICRO }}>SCAN TO VERIFY</div>
                <div style={{ fontSize: 9, fontWeight: 600, color: INK, marginTop: 5 }}>jewelsreport.com/verify</div>
                <div style={{ fontSize: 8, color: INK_2, marginTop: 4, lineHeight: 1.6 }}>
                  reportcheck@jewelsreport.com<br />+91 99673 81180
                </div>
              </div>
            </div>

            <div style={{ marginTop: 10, border: `1px solid ${LINE}`, borderLeft: `2.5px solid ${GOLD}`, borderRadius: 14, padding: "10px 13px" }}>
              <div style={{ fontSize: 6.8, fontWeight: 700, letterSpacing: "0.24em", color: MICRO }}>CERTIFICATION STATEMENT</div>
              <p style={{ fontSize: 8.2, color: INK_2, lineHeight: 1.75, margin: "6px 0 0" }}>
                The article described herein has been examined by JewelsReport Gemological Certification Lab. The results documented
                are based on standard gemological testing methods and apply only to the article at the time of examination.
              </p>
            </div>

            <div style={{ flex: 1, minHeight: 8 }} />

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Seal size={132} logoSrc={logo} />
            </div>

            <div style={{ flex: 1, minHeight: 8 }} />

            {/* Signature */}
            <div style={{ textAlign: "center" }}>
              <div style={{ height: 34, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                {cert.signatureDataUrl && (
                  <img src={cert.signatureDataUrl} alt="Signature" style={{ maxHeight: 34, maxWidth: "70%", objectFit: "contain" }} />
                )}
              </div>
              <div style={{ height: 1, background: LINE, margin: "6px 34px 7px" }} />
              <div style={{ fontSize: 9, fontWeight: 600, color: INK }}>Authorised Signatory</div>
              <div style={{ fontSize: 7.5, color: MICRO, marginTop: 2 }}>JewelsReport Gemological Certification Lab</div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "center", marginTop: 11 }}>
              <Pill>HOLOGRAM</Pill>
              <Pill>GUILLOCHÉ</Pill>
              <Pill>EMBOSSED SEAL</Pill>
              <Pill>UV INK</Pill>
            </div>
          </div>
        </div>

        {/* ═══ FINE PRINT + FOOTER ═══ */}
        <p style={{ fontSize: 7, color: "#6B7684", lineHeight: 1.6, margin: "14px 0 10px", flexShrink: 0 }}>
          This report documents the characteristics of the article described at the time of examination, obtained using the techniques and
          equipment of JewelsReport Gemological Certification Lab. It is not a guarantee, valuation or appraisal of value. For additional
          information and important limitations see jewelsreport.com/terms-of-service, or contact the laboratory directly.
        </p>

        <div style={{ height: 1, background: LINE, flexShrink: 0 }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, paddingTop: 9 }}>
          <span style={{ fontSize: 7, color: MICRO, letterSpacing: "0.08em" }}>
            © {new Date().getFullYear()} JewelsReport Gemological Certification Lab · Surat, Gujarat, India
          </span>
          <span style={{ fontSize: 7, fontWeight: 700, color: INK_2, letterSpacing: "0.14em" }}>{cert.reportNo}</span>
        </div>
      </div>
    );
  }
);
