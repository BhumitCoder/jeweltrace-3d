import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { Certificate } from "@/lib/store";
import { REPORT_TYPE_LABELS } from "@/lib/store";
import logo from "@/assets/logo.png";

/* A4 PORTRAIT @ 96dpi — 210mm × 297mm */
export const A4R_W = 794;
export const A4R_H = 1123;

/* ─── Palette ─────────────────────────────────── */
const INK   = "#1A1A1A";   // body text
const NAVY  = "#0F2742";   // lab name / seal
const BLUE  = "#2C5AA0";   // underlined field labels
const TITLE = "#2E74B5";   // report title
const LINE  = "#2B2B2B";   // hairline rules
const SOFT  = "#8A8A8A";   // muted captions
const FINE  = "#4A4A4A";   // fine print
const WHITE = "#FFFFFF";

const SERIF = "Georgia,'Times New Roman','Liberation Serif',serif";

/* ─── Underlined blue label ───────────────────── */
function L({ children, w }: { children: string; w?: number }) {
  return (
    <span style={{
      fontFamily: SERIF, fontSize: 12.5, color: BLUE,
      borderBottom: `1px solid ${BLUE}`, paddingBottom: 0.5,
      display: "inline-block", width: w, whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

/* ─── Spec row: underlined label column + value column ── */
function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "146px 1fr", columnGap: 10, padding: "1.5px 0", alignItems: "baseline" }}>
      <div><L>{label}</L></div>
      <div style={{ fontFamily: SERIF, fontSize: 12.5, color: INK, lineHeight: 1.5 }}>{value}</div>
    </div>
  );
}

/* ─── Meta row (Date / Property of) ───────────── */
function Meta({ label, value, labelW }: { label: string; value: string; labelW: number }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, padding: "3px 0" }}>
      <L w={labelW}>{label}</L>
      <span style={{ fontFamily: SERIF, fontSize: 13, color: INK, whiteSpace: "nowrap" }}>{value}</span>
    </div>
  );
}

/* ─── Hairline rule ───────────────────────────── */
function Rule({ m = 0 }: { m?: number }) {
  return <div style={{ height: 1, background: LINE, opacity: 0.55, margin: `${m}px 0`, flexShrink: 0 }} />;
}

/* ─── Proportion diagram (diamond reports) ────── */
function ProportionDiagram() {
  const cx = 92, tL = 60, tR = 124, gL = 46, gR = 138, culet = 92;
  const gT = 44, gB = 47;
  const vc = 196, vy = 52, vr = 34;

  return (
    <svg width="238" height="104" viewBox="0 0 238 104" style={{ display: "block" }}>
      <polygon points={`${tL},12 ${tR},12 ${gR},${gT} ${gL},${gT}`} fill="none" stroke={INK} strokeWidth="1" />
      <line x1={tL} y1="12" x2={tR} y2="12" stroke={INK} strokeWidth="1.3" />
      <rect x={gL} y={gT} width={gR - gL} height={gB - gT} fill={INK} opacity="0.14" stroke={INK} strokeWidth="0.5" />
      <polygon points={`${gL},${gB} ${gR},${gB} ${cx},${culet}`} fill="none" stroke={INK} strokeWidth="1" />

      <line x1={tL} y1="6" x2={tR} y2="6" stroke={INK} strokeWidth="0.6" />
      <line x1={tL} y1="3" x2={tL} y2="9" stroke={INK} strokeWidth="0.6" />
      <line x1={tR} y1="3" x2={tR} y2="9" stroke={INK} strokeWidth="0.6" />
      <text x={cx} y="5" textAnchor="middle" fontSize="7.5" fill={INK} fontWeight="700">62%</text>

      <line x1={gL - 4} y1="12" x2={gL - 4} y2={gT} stroke={INK} strokeWidth="0.5" strokeDasharray="2,1.5" />
      <text x={gL - 7} y="30" textAnchor="end" fontSize="7.5" fill={INK}>14.0%</text>
      <line x1={gL - 4} y1={gB} x2={gL - 4} y2={culet} stroke={INK} strokeWidth="0.5" strokeDasharray="2,1.5" />
      <text x={gL - 7} y="72" textAnchor="end" fontSize="7.5" fill={INK}>43.0%</text>

      <line x1={gR + 10} y1="12" x2={gR + 10} y2={culet} stroke={INK} strokeWidth="0.5" strokeDasharray="2,1.5" />
      <text x={gR + 14} y="54" textAnchor="start" fontSize="7.5" fill={INK} fontWeight="700">80%</text>
      <text x={gR + 2} y="28" textAnchor="start" fontSize="7" fill={INK}>33.5°</text>
      <text x={gR + 2} y="66" textAnchor="start" fontSize="7" fill={INK}>41.0°</text>

      <circle cx={vc} cy={vy} r={vr} fill="none" stroke={INK} strokeWidth="0.9" />
      {(() => {
        const pts = Array.from({ length: 8 }, (_, i) => {
          const a = (i * 45 - 22.5) * Math.PI / 180;
          return `${vc + 21 * Math.cos(a)},${vy + 21 * Math.sin(a)}`;
        }).join(" ");
        return <polygon points={pts} fill="none" stroke={INK} strokeWidth="0.7" />;
      })()}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const a = deg * Math.PI / 180, a2 = (deg + 22.5) * Math.PI / 180, a3 = (deg - 22.5) * Math.PI / 180;
        return <polyline key={deg}
          points={`${vc + vr * Math.cos(a2)},${vy + vr * Math.sin(a2)} ${vc + 21 * Math.cos(a)},${vy + 21 * Math.sin(a)} ${vc + vr * Math.cos(a3)},${vy + vr * Math.sin(a3)}`}
          fill="none" stroke={INK} strokeWidth="0.55" />;
      })}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => {
        const a = deg * Math.PI / 180;
        return <line key={deg} x1={vc + 21 * Math.cos(a)} y1={vy + 21 * Math.sin(a)} x2={vc} y2={vy}
          stroke={INK} strokeWidth="0.45" strokeDasharray="1,1" />;
      })}
      <text x={cx} y="102" textAnchor="middle" fontSize="7.5" fill={SOFT} fontStyle="italic" fontFamily={SERIF}>Profile to actual proportions</text>
    </svg>
  );
}

/* ─── Circular lab seal ───────────────────────── */
function Seal({ size, logoSrc }: { size: number; logoSrc: string }) {
  const CX = 80, CY = 80, OR = 74, TR = 65;
  const topPath = `M ${CX - TR},${CY} A ${TR},${TR} 0 0,1 ${CX + TR},${CY}`;
  const btmPath = `M ${CX + TR},${CY} A ${TR},${TR} 0 0,1 ${CX - TR},${CY}`;

  return (
    <svg width={size} height={size} viewBox="0 0 160 160" style={{ display: "block" }}>
      <defs>
        <path id={`sealTop${size}`} d={topPath} />
        <path id={`sealBtm${size}`} d={btmPath} />
      </defs>
      <circle cx={CX} cy={CY} r={OR} fill={WHITE} stroke={NAVY} strokeWidth="2" />
      <circle cx={CX} cy={CY} r={OR - 5} fill="none" stroke={NAVY} strokeWidth="0.7" />
      <text fontSize="11" fontWeight="700" letterSpacing="2" fill={NAVY} textAnchor="middle" fontFamily={SERIF}>
        <textPath href={`#sealTop${size}`} startOffset="50%">JEWELSREPORT</textPath>
      </text>
      <text fontSize="9.5" fontWeight="600" letterSpacing="2.2" fill={NAVY} textAnchor="middle" dy="-4" fontFamily={SERIF}>
        <textPath href={`#sealBtm${size}`} startOffset="50%">REPORTS · APPRAISALS</textPath>
      </text>
      <text x={CX - TR + 3} y={CY + 4} textAnchor="middle" fontSize="9" fill={NAVY}>★</text>
      <text x={CX + TR - 3} y={CY + 4} textAnchor="middle" fontSize="9" fill={NAVY}>★</text>
      <image href={logoSrc} x={CX - 30} y={CY - 34} width="60" height="60" />
      <text x={CX} y={CY + 34} textAnchor="middle" fontSize="8" fontWeight="700" letterSpacing="2" fill={NAVY} fontFamily={SERIF}>CERTIFIED</text>
    </svg>
  );
}

interface Props { cert: Certificate }

export const A4ReportCertificate = forwardRef<HTMLDivElement, Props>(
  function A4ReportCertificate({ cert }, ref) {
    const verifyUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/verify?id=${encodeURIComponent(cert.reportNo)}`
        : `https://www.jewelsreport.com/verify?id=${cert.reportNo}`;

    const isJ = cert.type === "Lab Grown Jewellery" || cert.type === "Natural Jewellery";
    const isG = cert.type === "Gemstone";
    const isDiamond = !isJ && !isG;

    const fmtDate = (d: string) => {
      try { return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }); }
      catch { return d; }
    };

    const reportTypeLabel = REPORT_TYPE_LABELS[cert.type] ?? cert.type;

    const certTitle = isJ ? "JEWELLERY APPRAISAL" : reportTypeLabel;

    /* Headline description under "Description:" */
    const headDescription = isJ
      ? [cert.itemName, cert.metal].filter(Boolean).join(" — ") || cert.itemName
      : [cert.shape || cert.gemstoneShape, cert.itemName || cert.type].filter(Boolean).join(" ");

    const headWeight = isJ
      ? (cert.grossWeight ? `${cert.grossWeight} grams` : undefined)
      : isG
        ? (cert.gemstoneCaratWeight ? `${cert.gemstoneCaratWeight} carat` : undefined)
        : (cert.caratWeight ? `${cert.caratWeight} carat` : undefined);

    /* Bottom emphasised line */
    const emphLabel = isJ ? "TOTAL GROSS WEIGHT" : "TOTAL CARAT WEIGHT";
    const emphValue = headWeight ? headWeight.toUpperCase() : "CERTIFIED AUTHENTIC";

    /* ── Auto-fit ──────────────────────────────────────────────────────────
       Long reports (jewellery with both diamond and gemstone groups) would
       otherwise overflow the page. Measure the spec column, scale it down to
       fit, then allow one corrective pass back up so the page stays full.
       Every sequence ends on a shrink, so the content can never clip.       */
    const fitOuter = useRef<HTMLDivElement>(null);
    const fitInner = useRef<HTMLDivElement>(null);
    const fitState = useRef({ id: "", grew: false });
    const [fit, setFit] = useState(1);

    useLayoutEffect(() => {
      const st = fitState.current;
      if (st.id !== cert.id) {
        st.id = cert.id;
        st.grew = false;
        if (fit !== 1) { setFit(1); return; }   // reset, then measure unscaled
      }
      const outer = fitOuter.current, inner = fitInner.current;
      if (!outer || !inner) return;
      /* Both in layout px — getBoundingClientRect would be skewed by the
         `zoom` the preview wrappers apply. */
      const avail = outer.clientHeight;
      const rendered = inner.scrollHeight * fit;
      if (!avail || !rendered) return;

      if (rendered > avail) {
        const next = Math.max(0.6, fit * (avail / rendered) - 0.004);
        if (next < fit - 0.004) setFit(next);
        return;
      }
      /* Re-wrapping at the smaller size usually frees a little room — take it
         back once so the column does not end short of the page. */
      if (!st.grew && fit < 0.99 && rendered < avail * 0.97) {
        st.grew = true;
        const next = Math.min(1, fit * (avail / rendered) - 0.004);
        if (next > fit + 0.004) setFit(next);
      }
    }, [cert.id, fit]);

    const hasDiamondGroup = !!(cert.diamondShape || cert.diamondWeight || cert.diamondColor || cert.diamondClarity);
    const hasGemGroup = !!(cert.gemstoneStone || cert.gemstoneCaratWeight || cert.gemstoneOrigin);
    const images = [cert.imageDataUrl, cert.imageDataUrl2].filter(Boolean) as string[];

    return (
      <div ref={ref} style={{
        width: A4R_W, height: A4R_H,
        boxSizing: "border-box", overflow: "hidden",
        background: WHITE, fontFamily: SERIF, color: INK,
        padding: 20, position: "relative",
      }}>
        {/* Double frame */}
        <div style={{
          width: "100%", height: "100%", boxSizing: "border-box",
          border: `1.5px solid ${LINE}`, padding: 6,
          display: "flex", flexDirection: "column",
        }}>
          <div style={{
            flex: 1, minHeight: 0, boxSizing: "border-box",
            border: `0.75px solid ${LINE}`, padding: "26px 30px 22px",
            display: "flex", flexDirection: "column",
          }}>

            {/* ══ HEADER ══ */}
            <div style={{ position: "relative", flexShrink: 0, minHeight: 118 }}>
              <div style={{ position: "absolute", left: 0, top: 3 }}>
                <Seal size={112} logoSrc={logo} />
              </div>
              <div style={{ textAlign: "center", paddingTop: 4 }}>
                <div style={{
                  fontSize: 22, color: NAVY, letterSpacing: "0.01em", lineHeight: 1.2,
                  fontVariant: "small-caps", fontVariantCaps: "small-caps", whiteSpace: "nowrap",
                  borderBottom: `1px solid ${LINE}`, display: "inline-block", paddingBottom: 3,
                }}>
                  JewelsReport Gemological Laboratory
                </div>
                <div style={{ fontSize: 12.5, color: INK, marginTop: 5, lineHeight: 1.55 }}>
                  202, 2/F, Veer Ashish Building, Mahidharpura | Surat, Gujarat 395003
                </div>
                <div style={{ fontSize: 12.5, color: INK, lineHeight: 1.55 }}>www.JewelsReport.com</div>
                <div style={{ fontSize: 12.5, color: INK, lineHeight: 1.55 }}>+91 99673 81180</div>
              </div>
            </div>

            {/* ══ TITLE ══ */}
            <div style={{ textAlign: "center", padding: "18px 0 16px", flexShrink: 0 }}>
              <span style={{ fontSize: 21, fontWeight: 700, color: TITLE, letterSpacing: "0.06em" }}>
                {certTitle}
              </span>
            </div>

            <Rule />

            {/* ══ META ══ */}
            <div style={{ display: "flex", padding: "13px 0 11px", flexShrink: 0 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <Meta label="Date:" value={fmtDate(cert.issueDate)} labelW={92} />
                <div style={{ height: 8 }} />
                <Meta label="Property of:" value={cert.clientName || "—"} labelW={92} />
              </div>
              <div style={{ width: 310, flexShrink: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "3px 0", alignItems: "baseline" }}>
                  <L>Report Number:</L>
                  <span style={{ fontSize: 13, color: INK, whiteSpace: "nowrap" }}>{cert.reportNo}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "3px 0", alignItems: "baseline" }}>
                  <L>Report Type:</L>
                  <span style={{ fontSize: 13, color: INK, whiteSpace: "nowrap" }}>{cert.type}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "8px 0 0", alignItems: "center" }}>
                  <L>Verify Online:</L>
                  <QRCodeSVG value={verifyUrl} size={62} level="M" fgColor={NAVY} />
                </div>
              </div>
            </div>

            <Rule />

            {/* ══ BODY ══ */}
            <div style={{ flex: 1, minHeight: 0, display: "flex", gap: 22, paddingTop: 18, overflow: "hidden" }}>

              {/* Left — description + containing (auto-fitted) */}
              <div ref={fitOuter} style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
               <div ref={fitInner} style={{ transform: `scale(${fit})`, transformOrigin: "top left", width: `${100 / fit}%` }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <L w={82}>Description:</L>
                  <span style={{ fontSize: 12.5, color: INK, lineHeight: 1.55 }}>{headDescription}</span>
                </div>
                {headWeight && (
                  <div style={{ paddingLeft: 92, fontSize: 12.5, color: INK, lineHeight: 1.6 }}>Weight: {headWeight}</div>
                )}
                {cert.description && (
                  <div style={{ paddingLeft: 92, fontSize: 12, color: INK, lineHeight: 1.6, marginTop: 2 }}>{cert.description}</div>
                )}

                <div style={{ height: 20 }} />

                <div><L>Containing:</L></div>
                <div style={{ paddingTop: 6 }}>
                  {isDiamond && (<>
                    <div style={{ fontSize: 12.5, color: INK, lineHeight: 1.6, paddingBottom: 3 }}>
                      One {cert.shape || "Round Brilliant"} Cut {cert.type.replace(" Diamond", "")} Diamond.
                    </div>
                    <Row label="Measurements:" value={cert.measurements} />
                    <Row label="Weight:"       value={cert.caratWeight ? `${cert.caratWeight} carat` : undefined} />
                    <Row label="Color:"        value={cert.color} />
                    <Row label="Clarity:"      value={cert.clarity} />
                    <Row label="Cut:"          value={cert.cut} />
                    <Row label="Polish:"       value={cert.polish} />
                    <Row label="Symmetry:"     value={cert.symmetry} />
                    <Row label="Fluorescence:" value={cert.fluorescence} />
                    <Row label="Origin:"       value={cert.origin} />
                  </>)}

                  {isG && (<>
                    <div style={{ fontSize: 12.5, color: INK, lineHeight: 1.6, paddingBottom: 3 }}>
                      {cert.gemstonePcs ? `${cert.gemstonePcs} ` : "One "}{cert.gemstoneShape || "Round"} Cut {cert.gemstoneStone || "Natural Gemstone"}.
                    </div>
                    <Row label="Measurements:"    value={cert.gemstoneMeasurements} />
                    <Row label="Total Weight:"    value={cert.gemstoneCaratWeight} />
                    <Row label="Color:"           value={cert.gemstoneColorTransparency} />
                    <Row label="Characteristics:" value={cert.gemstoneCharacteristics} />
                    <Row label="Origin:"          value={cert.gemstoneOrigin} />
                  </>)}

                  {isJ && (<>
                    <Row label="Metal Tested As:" value={cert.metal} />
                    <Row label="Marking(s):"      value={cert.metalDescription} />
                    <Row label="Gross Weight:"    value={cert.grossWeight ? `${cert.grossWeight} grams` : undefined} />
                    <Row label="Net Weight:"      value={cert.netWeight ? `${cert.netWeight} grams` : undefined} />
                    <Row label="Origin:"          value={cert.origin} />

                    {hasDiamondGroup && (<>
                      <div style={{ fontSize: 12.5, color: INK, lineHeight: 1.6, padding: "12px 0 3px" }}>
                        {cert.diamondTotalPcs ? `${cert.diamondTotalPcs} ` : "One "}{cert.diamondShape || "Round Brilliant"} Cut Diamond.
                      </div>
                      <Row label="Total Weight:"  value={cert.diamondWeight ? `${cert.diamondWeight} carat` : undefined} />
                      <Row label="Color:"         value={cert.diamondColor} />
                      <Row label="Clarity:"       value={cert.diamondClarity} />
                      <Row label="Setting Style:" value="Prong" />
                    </>)}

                    {hasGemGroup && (<>
                      <div style={{ fontSize: 12.5, color: INK, lineHeight: 1.6, padding: "12px 0 3px" }}>
                        {cert.gemstonePcs ? `${cert.gemstonePcs} ` : "One "}{cert.gemstoneShape || "Round"} Cut {cert.gemstoneStone || "Gemstone"}.
                      </div>
                      <Row label="Total Weight:" value={cert.gemstoneCaratWeight} />
                      <Row label="Color:"        value={cert.gemstoneColorTransparency} />
                      <Row label="Origin:"       value={cert.gemstoneOrigin} />
                    </>)}
                  </>)}

                  {cert.remarks && (
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10, paddingTop: 14 }}>
                      <L>Comments:</L>
                      <span style={{ fontSize: 12, color: INK, lineHeight: 1.6 }}>{cert.remarks}</span>
                    </div>
                  )}
                </div>
               </div>
              </div>

              {/* Right — photographs + proportion diagram */}
              <div style={{ width: 252, flexShrink: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {images.length > 0 ? images.map((src, i) => (
                  <div key={i} style={{ width: "100%", height: images.length > 1 ? 168 : 250, overflow: "hidden", background: "#F7F7F7" }}>
                    <img src={src} alt="Item" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                  </div>
                )) : (
                  <div style={{ width: "100%", height: 250, border: `0.75px dashed ${SOFT}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 10, color: SOFT, letterSpacing: "0.22em" }}>NO PHOTOGRAPH</span>
                  </div>
                )}

                {isDiamond && (
                  <div style={{ paddingTop: 4 }}>
                    <ProportionDiagram />
                  </div>
                )}

                <div style={{ flex: 1 }} />
              </div>
            </div>

            {/* ══ EMPHASISED VALUE LINE ══ */}
            <div style={{ display: "flex", alignItems: "baseline", flexShrink: 0, paddingTop: 10 }}>
              <span style={{ fontSize: 14.5, fontWeight: 700, letterSpacing: "0.04em", color: INK, whiteSpace: "nowrap" }}>{emphLabel}</span>
              <span style={{ flex: 1, margin: "0 4px", color: INK, fontSize: 14.5, overflow: "hidden", whiteSpace: "nowrap" }}>
                {"-".repeat(140)}
              </span>
              <span style={{ fontSize: 14.5, fontWeight: 700, color: INK, whiteSpace: "nowrap" }}>{emphValue}</span>
            </div>

            {/* ══ FINE PRINT ══ */}
            <p style={{ fontSize: 9, color: FINE, lineHeight: 1.6, margin: "12px 0 0", textAlign: "justify", flexShrink: 0 }}>
              The results documented in this report apply only to the article described herein and were obtained using the techniques and
              equipment used by JewelsReport Gemological Laboratory at the time of examination. Estimates of mounted stones are based on
              measurements taken insofar as the mounting permits examination. This report is not a guarantee, valuation or appraisal of value
              and is not intended to be used as the basis for purchase or sale of the item(s) set forth herein. Photographs represent design
              only and are not an accurate guide to colour or size. For additional information and important limitations please see
              www.JewelsReport.com/terms-of-service. This report and its photographs are the copyright of JewelsReport Gemological Laboratory.
            </p>

            <Rule m={12} />

            {/* ══ FOOTER ══ */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexShrink: 0, paddingTop: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img src={logo} alt="" style={{ width: 38, height: 38, objectFit: "contain" }} />
                <div>
                  <div style={{ fontSize: 17, color: NAVY, letterSpacing: "0.04em", lineHeight: 1.1, fontVariant: "small-caps", fontVariantCaps: "small-caps" }}>
                    JewelsReport
                  </div>
                  <div style={{ fontSize: 8.5, color: SOFT, letterSpacing: "0.16em", marginTop: 2 }}>GEMOLOGICAL LABORATORY</div>
                </div>
              </div>

              <div style={{ textAlign: "right", minWidth: 250 }}>
                <div style={{ height: 34, display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
                  {cert.signatureDataUrl
                    ? <img src={cert.signatureDataUrl} alt="Signature" style={{ maxHeight: 34, maxWidth: 200, objectFit: "contain" }} />
                    : null}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "flex-end", gap: 10, marginTop: 2 }}>
                  <span style={{ fontSize: 10.5, color: SOFT }}>Authorised by</span>
                  <span style={{ fontSize: 13, color: INK }}>JewelsReport Gemological Laboratory</span>
                </div>
                <div style={{ fontSize: 10.5, color: SOFT, marginTop: 1 }}>Graduate Gemologist · Authorised Signatory</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
);
