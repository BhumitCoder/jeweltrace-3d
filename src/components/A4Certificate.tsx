import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { Certificate } from "@/lib/store";
import { REPORT_TYPE_LABELS } from "@/lib/store";
import logo from "@/assets/logo.png";

/* ── Landscape A4 at 96 CSS dpi: 1122 × 794 px ─────────────────── */
export const A4_W = 1122;
export const A4_H = 794;

const P1 = 306;   // Left panel  — Brand + Fields
const P2 = 448;   // Centre panel — Photo showcase (widest)
const P3 = 368;   // Right panel  — Details + Seal

/* ─── Palette ────────────────────────────────────────────────────── */
const W      = "#FFFFFF";
const PARCH  = "#FDFAF3";   // very light warm parchment
const PARCH2 = "#F9F5E8";   // slightly deeper parchment
const G      = "#B8922A";   // gold
const G2     = "#96741C";   // deep gold
const G3     = "#D4AF60";   // light gold
const G4     = "rgba(184,146,42,0.18)"; // ghost gold
const INK    = "#1A1100";   // near-black warm
const INK2   = "#3D2B08";   // warm brown
const INK3   = "#8A6D3C";   // mid brown
const RULE   = `rgba(184,146,42,0.22)`;

/* ─── Field Row — GIA dotted leader ─────────────────────────────── */
function FR({ label, value, sz = 10.5 }: { label: string; value: string; sz?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", marginBottom: 5.5 }}>
      <span style={{ fontSize: sz, color: INK2, lineHeight: 1.35, flexShrink: 0, whiteSpace: "nowrap" }}>
        {label}
      </span>
      <span style={{
        flex: 1, minWidth: 8,
        margin: `0 5px ${sz * 0.17}px`,
        borderBottom: `1.5px dotted rgba(184,146,42,0.4)`,
      }} />
      <span style={{
        fontSize: sz, fontWeight: 800, color: INK,
        lineHeight: 1.35, whiteSpace: "nowrap",
        textTransform: "uppercase", letterSpacing: "0.03em",
      }}>
        {value}
      </span>
    </div>
  );
}

/* ─── Thin gold horizontal rule with centre diamond ─────────────── */
function HR({ my = 8, opacity = 1 }: { my?: number; opacity?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, margin: `${my}px 0`, opacity }}>
      <div style={{ flex: 1, height: 0.75, background: `linear-gradient(90deg,transparent,${G3})` }} />
      <div style={{ width: 4, height: 4, background: G3, transform: "rotate(45deg)", flexShrink: 0 }} />
      <div style={{ flex: 1, height: 0.75, background: `linear-gradient(90deg,${G3},transparent)` }} />
    </div>
  );
}

/* ─── Section header — gold top-border + warm fill, elegant ─────── */
function Hdr({ label }: { label: string }) {
  return (
    <div style={{
      borderTop: `1.5px solid ${G}`,
      borderBottom: `0.5px solid ${RULE}`,
      background: PARCH2,
      padding: "4.5px 16px",
      flexShrink: 0,
    }}>
      <span style={{
        fontSize: 7, fontWeight: 700, letterSpacing: "0.32em",
        textTransform: "uppercase", color: G2,
      }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Sub-section label ──────────────────────────────────────────── */
function Sub({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, margin: "9px 0 5px" }}>
      <div style={{ width: 14, height: 1, background: G, flexShrink: 0 }} />
      <span style={{
        fontSize: 6.5, fontWeight: 700, letterSpacing: "0.24em",
        textTransform: "uppercase", color: G2,
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${G},transparent)` }} />
    </div>
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

    const fmtDate = (d: string) => {
      try {
        return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
      } catch { return d; }
    };

    const panelHdr = isG ? "Gemstone Grading Report"
      : isJ ? "Jewellery Grading Report"
      : `${cert.type.replace("Natural ", "").replace("Lab Grown ", "")} Grading Report`;

    /* ── Field sets ──────────────────────────────────────────────── */
    let identityFields: [string, string][] = [];
    let gradingFields:  [string, string][] = [];
    let addlFields:     [string, string][] = [];

    if (isG) {
      identityFields = ([["GRL Report Number", cert.reportNo], ["Variety", cert.gemstoneStone], ["Origin", cert.gemstoneOrigin]] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      gradingFields  = ([["Shape and Cutting Style", cert.gemstoneShape], ["Carat Weight", cert.gemstoneCaratWeight], ["PCS", cert.gemstonePcs], ["Measurements", cert.gemstoneMeasurements]] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      addlFields     = ([["Color and Transparency", cert.gemstoneColorTransparency], ["Characteristics", cert.gemstoneCharacteristics]] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
    } else if (isJ) {
      identityFields = ([["GRL Report Number", cert.reportNo], ["Item", cert.itemName], ["Shape", cert.shape]] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      gradingFields  = ([["Metal Tested As", cert.metal], ["Gross Weight", cert.grossWeight ? `${cert.grossWeight} GRM` : undefined], ["Net Weight", cert.netWeight ? `${cert.netWeight} GRM` : undefined], ["Origin", cert.origin]] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      addlFields     = ([["Diamond Shape", cert.diamondShape], ["Diamond Weight", cert.diamondWeight ? `${cert.diamondWeight} CT` : undefined], ["Diamond Total PCS", cert.diamondTotalPcs], ["Diamond Color", cert.diamondColor], ["Diamond Clarity", cert.diamondClarity]] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
    } else {
      identityFields = ([["GRL Report Number", cert.reportNo], ["Shape(s) and Cutting Style(s)", cert.shape], ["Measurements", cert.measurements]] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      gradingFields  = ([["Carat Weight", cert.caratWeight ? `${cert.caratWeight} carat` : undefined], ["Color Grade", cert.color], ["Clarity Grade", cert.clarity], ["Cut Grade", cert.cut]] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      addlFields     = ([["Polish Grade", cert.polish], ["Symmetry Grade", cert.symmetry], ["Fluorescence", cert.fluorescence], ["Origin", cert.origin]] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
    }

    const p3Fields: [string, string][] = (
      isJ ? ([["Total Stones", cert.diamondTotalPcs], ["Est. Total Carat Wt.", cert.diamondWeight ? `${cert.diamondWeight} CT` : undefined], ["Metal Tested As", cert.metal], ["Item Weight", cert.grossWeight ? `${cert.grossWeight} GRM` : undefined]] as [string, string | undefined][]) :
      isG ? ([["Stone", cert.gemstoneStone], ["Origin", cert.gemstoneOrigin], ["Carat Weight", cert.gemstoneCaratWeight], ["Shape", cert.gemstoneShape]] as [string, string | undefined][]) :
            ([["Carat Weight", cert.caratWeight ? `${cert.caratWeight} carat` : undefined], ["Color Grade", cert.color], ["Clarity Grade", cert.clarity], ["Cut Grade", cert.cut], ["Polish Grade", cert.polish], ["Symmetry", cert.symmetry]] as [string, string | undefined][])
    ).filter(([, v]) => v) as [string, string][];

    const gemP3: [string, string][] = isJ && cert.gemstoneStone
      ? ([["Gemstone", cert.gemstoneStone], ["Origin", cert.gemstoneOrigin], ["Weight", cert.gemstoneCaratWeight], ["PCS", cert.gemstonePcs]] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][]
      : [];

    const hasImg  = !!(cert.imageDataUrl || cert.imageDataUrl2);
    const has2Img = !!(cert.imageDataUrl && cert.imageDataUrl2);

    /* ── Shared outer border style ───────────────────────────────── */
    const PANEL_OUTER: React.CSSProperties = {
      position: "absolute", inset: 6,
      border: `1px solid rgba(184,146,42,0.35)`,
      pointerEvents: "none", zIndex: 10,
    };

    return (
      <div ref={ref} style={{
        width: A4_W, height: A4_H,
        background: PARCH,
        fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        position: "relative",
        /* Outer double frame */
        border: `3px solid ${G}`,
        outline: `1px solid ${G4}`,
        outlineOffset: "-8px",
      }}>

        {/* ── Faint watermark ── */}
        <img src={logo} alt="" aria-hidden style={{
          position: "absolute", width: 520, height: 520,
          objectFit: "contain", opacity: 0.028,
          left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* ── Subtle guilloché corner ornaments ── */}
        {[
          { top: 10, left: 10 },
          { top: 10, right: 10 },
          { bottom: 10, left: 10 },
          { bottom: 10, right: 10 },
        ].map((pos, i) => (
          <div key={i} style={{
            position: "absolute", width: 28, height: 28, zIndex: 2,
            ...pos,
          }}>
            <div style={{
              position: "absolute", inset: 0,
              border: `1px solid ${G3}`,
              borderRadius: 0,
              opacity: 0.6,
            }} />
            <div style={{
              position: "absolute", inset: 5,
              border: `1px solid ${G3}`,
              opacity: 0.4,
            }} />
          </div>
        ))}

        {/* ══════════════════════════════════════════════════════
            PANEL 1 — Brand Identity + Grading Fields
        ══════════════════════════════════════════════════════ */}
        <div style={{
          width: P1, height: A4_H, flexShrink: 0,
          display: "flex", flexDirection: "column",
          position: "relative", zIndex: 1,
          background: PARCH,
          borderRight: `1px solid ${RULE}`,
        }}>

          {/* Brand header — generous vertical space */}
          <div style={{
            padding: "22px 18px 16px",
            borderBottom: `1px solid ${RULE}`,
            flexShrink: 0,
            display: "flex", flexDirection: "column", alignItems: "center",
            background: W,
          }}>
            {/* Concentric ring seal */}
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              border: `1.5px solid ${G}`,
              boxShadow: `0 0 0 4px rgba(184,146,42,0.08), 0 0 0 8px rgba(184,146,42,0.04), 0 0 0 13px rgba(184,146,42,0.02)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: `radial-gradient(circle at 38% 38%,#FFFEF0 0%,#FDF6DC 60%,#F9EDBD 100%)`,
              marginBottom: 12, flexShrink: 0,
            }}>
              <img src={logo} alt="JewelsReport" style={{ height: 52, width: 52, objectFit: "contain" }} />
            </div>

            <div style={{
              fontFamily: "Georgia,'Times New Roman',serif",
              fontSize: 20, fontWeight: 400, letterSpacing: "0.18em",
              color: INK, lineHeight: 1, textTransform: "uppercase",
            }}>
              JewelsReport
            </div>

            <HR my={8} />

            <div style={{
              fontSize: 6.5, letterSpacing: "0.42em",
              textTransform: "uppercase", color: INK3, fontWeight: 400,
            }}>
              Gemological Certification Lab
            </div>
          </div>

          {/* Section header */}
          <Hdr label={panelHdr} />

          {/* Grading fields */}
          <div style={{ flex: 1, padding: "13px 16px 0", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {identityFields.map(([l, v]) => <FR key={l} label={l} value={v} />)}

            {gradingFields.length > 0 && (<>
              <Sub label="Grading Results" />
              {gradingFields.map(([l, v]) => <FR key={l} label={l} value={v} sz={11} />)}
            </>)}

            {addlFields.length > 0 && (<>
              <Sub label="Additional Grading Information" />
              {addlFields.map(([l, v]) => <FR key={l} label={l} value={v} />)}
            </>)}

            {cert.remarks && (
              <div style={{ marginTop: 9, padding: "6px 10px", background: W, border: `0.5px solid ${RULE}`, borderLeft: `2px solid ${G}`, flexShrink: 0 }}>
                <div style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", color: G2, letterSpacing: "0.18em", marginBottom: 3 }}>Comments</div>
                <div style={{ fontSize: 9.5, color: INK, lineHeight: 1.65 }}>{cert.remarks}</div>
              </div>
            )}

            {/* Ornamental filler */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <HR opacity={0.5} />
              <div style={{ padding: "14px 0", textAlign: "center" }}>
                {/* Ornamental diamond cluster */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, marginBottom: 10 }}>
                  <div style={{ width: 3, height: 3, background: G4, transform: "rotate(45deg)" }} />
                  <div style={{ width: 6, height: 6, background: `rgba(184,146,42,0.22)`, transform: "rotate(45deg)" }} />
                  <div style={{ width: 3, height: 3, background: G4, transform: "rotate(45deg)" }} />
                </div>
                <div style={{
                  fontFamily: "Georgia,'Times New Roman',serif",
                  fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase",
                  color: `rgba(184,146,42,0.28)`, fontWeight: 400, fontStyle: "italic",
                }}>
                  Certified Authentic
                </div>
                <div style={{ fontSize: 6, letterSpacing: "0.22em", color: `rgba(184,146,42,0.18)`, marginTop: 4, textTransform: "uppercase" }}>
                  Jewels Report · Surat, India
                </div>
              </div>
              <HR opacity={0.5} />
            </div>

            {/* Signature */}
            <div style={{ borderTop: `0.75px solid ${RULE}`, paddingTop: 8, flexShrink: 0 }}>
              <div style={{ minHeight: 44, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4 }}>
                {cert.signatureDataUrl
                  ? <img src={cert.signatureDataUrl} alt="Signature" style={{ maxHeight: 44, maxWidth: "85%", objectFit: "contain" }} />
                  : <div style={{ width: "70%", height: 1, background: RULE }} />
                }
              </div>
              <div style={{ textAlign: "center", paddingBottom: 4 }}>
                <div style={{ fontSize: 7.5, color: INK2, fontWeight: 600, letterSpacing: "0.1em" }}>Authorised Signatory</div>
                <div style={{ fontSize: 6.5, color: INK3, letterSpacing: "0.06em", marginTop: 1.5 }}>JewelsReport Gemological Certification Lab</div>
              </div>
            </div>
          </div>

          {/* P1 footer */}
          <div style={{
            borderTop: `1px solid ${RULE}`,
            padding: "5px 14px",
            flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: W,
          }}>
            <span style={{ fontSize: 6.5, color: INK3, letterSpacing: "0.1em" }}>jewelsreport.com</span>
            <span style={{ fontSize: 6.5, color: INK3, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {REPORT_TYPE_LABELS[cert.type] ?? cert.type}
            </span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            PANEL 2 — Report Number + Photo Showcase
        ══════════════════════════════════════════════════════ */}
        <div style={{
          width: P2, height: A4_H, flexShrink: 0,
          display: "flex", flexDirection: "column",
          position: "relative", zIndex: 1,
          background: W,
          borderRight: `1px solid ${RULE}`,
        }}>

          {/* Report number header — centred, airy */}
          <div style={{
            padding: "22px 22px 16px",
            borderBottom: `1px solid ${RULE}`,
            flexShrink: 0, textAlign: "center",
            background: W,
          }}>
            <div style={{ fontSize: 6.5, letterSpacing: "0.38em", textTransform: "uppercase", color: INK3, marginBottom: 5, fontWeight: 400 }}>
              GRL Report Number
            </div>
            <div style={{
              fontFamily: "Georgia,'Times New Roman',serif",
              fontSize: 24, fontWeight: 400, letterSpacing: "0.06em", color: INK,
            }}>
              {cert.reportNo}
            </div>
            <HR my={7} />
            <div style={{ fontSize: 7.5, color: G2, marginTop: 2, letterSpacing: "0.08em" }}>
              Verify this report at jewelsreport.com/verify
            </div>
            <div style={{
              fontFamily: "Georgia,serif",
              fontSize: 11, fontWeight: 400, color: INK2, marginTop: 5, letterSpacing: "0.04em",
            }}>
              {fmtDate(cert.issueDate)}
            </div>
          </div>

          <Hdr label="Item(s) Overall Description" />

          {/* Photo area */}
          <div style={{ flex: 1, padding: "14px 18px 12px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {cert.description && (
              <p style={{
                fontFamily: "Georgia,serif",
                fontSize: 10.5, color: INK2, lineHeight: 1.8,
                marginBottom: 12, flexShrink: 0, fontStyle: "italic",
              }}>
                {cert.description}
              </p>
            )}

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: has2Img ? 10 : 0, minHeight: 0 }}>
              {cert.imageDataUrl && (
                <div style={{
                  flex: 1, minHeight: 0,
                  border: `1px solid rgba(184,146,42,0.25)`,
                  background: PARCH,
                  boxShadow: `inset 0 0 0 4px rgba(184,146,42,0.06), 0 2px 14px rgba(0,0,0,0.06)`,
                  overflow: "hidden",
                }}>
                  <img src={cert.imageDataUrl} alt="Item" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </div>
              )}
              {cert.imageDataUrl2 && (
                <div style={{
                  flex: 1, minHeight: 0,
                  border: `1px solid rgba(184,146,42,0.25)`,
                  background: PARCH,
                  boxShadow: `inset 0 0 0 4px rgba(184,146,42,0.06), 0 2px 14px rgba(0,0,0,0.06)`,
                  overflow: "hidden",
                }}>
                  <img src={cert.imageDataUrl2} alt="Item" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </div>
              )}
              {!hasImg && (
                <div style={{
                  flex: 1, minHeight: 0,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  background: PARCH2,
                  border: `1px solid rgba(184,146,42,0.22)`,
                  boxShadow: `inset 0 0 0 4px rgba(184,146,42,0.05)`,
                  position: "relative", overflow: "hidden",
                }}>
                  {/* Subtle diagonal pattern */}
                  <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `repeating-linear-gradient(45deg,rgba(184,146,42,0.035) 0,rgba(184,146,42,0.035) 1px,transparent 1px,transparent 14px),repeating-linear-gradient(-45deg,rgba(184,146,42,0.035) 0,rgba(184,146,42,0.035) 1px,transparent 1px,transparent 14px)`,
                  }} />
                  <img src={logo} alt="" style={{ height: 68, opacity: 0.1, marginBottom: 14, position: "relative" }} />
                  <div style={{ fontSize: 8, color: `rgba(184,146,42,0.32)`, letterSpacing: "0.32em", textTransform: "uppercase", position: "relative" }}>
                    No Image Provided
                  </div>
                </div>
              )}
            </div>

            {hasImg && (
              <p style={{ fontSize: 7.5, color: INK3, textAlign: "center", marginTop: 7, fontStyle: "italic", flexShrink: 0 }}>
                Image is approximate
              </p>
            )}
          </div>

          {/* P2 footer */}
          <div style={{
            borderTop: `1px solid ${RULE}`,
            padding: "5px 16px",
            flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: W,
          }}>
            <span style={{ fontSize: 6.5, color: INK3, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Gemological Certification Lab · Surat, Gujarat, India
            </span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            PANEL 3 — Grading Details + Seal
        ══════════════════════════════════════════════════════ */}
        <div style={{
          width: P3, height: A4_H, flexShrink: 0,
          display: "flex", flexDirection: "column",
          position: "relative", zIndex: 1,
          background: PARCH,
        }}>

          {/* P3 header — mirrors Panel 2 style */}
          <div style={{
            padding: "22px 16px 16px",
            borderBottom: `1px solid ${RULE}`,
            flexShrink: 0, textAlign: "center",
            background: W,
          }}>
            <div style={{ fontSize: 6.5, letterSpacing: "0.38em", textTransform: "uppercase", color: INK3, marginBottom: 5 }}>
              Official Certification Record
            </div>
            <HR my={0} />
          </div>

          <Hdr label="Grading Details" />

          <div style={{ flex: 1, padding: "13px 14px 10px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {p3Fields.map(([l, v]) => <FR key={l} label={l} value={v} />)}

            {gemP3.length > 0 && (<>
              <Sub label="Gemstone Details" />
              {gemP3.map(([l, v]) => <FR key={l} label={l} value={v} />)}
            </>)}

            {isJ && cert.metalDescription && (
              <div style={{ marginTop: 8, marginBottom: 6, flexShrink: 0 }}>
                <div style={{ fontSize: 9.5, color: INK, lineHeight: 1.65 }}>
                  <span style={{ fontWeight: 700 }}>*Marking(s):</span> {cert.metalDescription}
                </div>
                <div style={{ fontSize: 7.5, color: INK3, marginTop: 2, lineHeight: 1.45, fontStyle: "italic" }}>
                  *Marking(s) represent what is present and may not have been assessed by JewelsReport.
                </div>
              </div>
            )}

            {cert.remarks && (
              <div style={{ marginTop: 6, marginBottom: 6, flexShrink: 0 }}>
                <div style={{ fontSize: 9.5, color: INK, lineHeight: 1.65 }}>
                  <span style={{ fontWeight: 700 }}>Comments:</span> {cert.remarks}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div style={{ flex: 1, marginTop: 10, minHeight: 0, overflow: "hidden" }}>
              <HR />
              <p style={{ fontSize: 7.5, color: INK3, lineHeight: 1.9, marginTop: 9, fontFamily: "Georgia,serif", fontStyle: "italic" }}>
                The results documented in this report refer only to the article described,
                and were obtained using the techniques and equipment used by JewelsReport
                at the time of examination. This report is not a guarantee or valuation.
                For additional information and important limitations please see
                jewelsreport.com/terms. ©{new Date().getFullYear()} JewelsReport
                Gemological Certification Lab. All rights reserved.
              </p>
            </div>

            {/* ── Seal + QR ── */}
            <div style={{ flexShrink: 0 }}>
              <HR my={6} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                {/* Luxury seal */}
                <div style={{
                  width: 76, height: 76, flexShrink: 0, borderRadius: "50%",
                  border: `1.5px solid ${G}`,
                  boxShadow: `0 0 0 3px rgba(184,146,42,0.1), 0 0 0 7px rgba(184,146,42,0.04)`,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  background: `radial-gradient(circle at 38% 38%,#FFFEF0 0%,#FDF6DC 60%,#F9EDBD 100%)`,
                }}>
                  <img src={logo} alt="" style={{ height: 42, width: 42, objectFit: "contain" }} />
                  <div style={{ fontSize: 5.5, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: G2, marginTop: 3 }}>
                    CERTIFIED
                  </div>
                </div>

                {/* QR */}
                <div style={{
                  padding: 5, background: W,
                  border: `1px solid rgba(184,146,42,0.28)`,
                  flexShrink: 0,
                }}>
                  <QRCodeSVG value={verifyUrl} size={68} level="M" fgColor={INK} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 7, color: G2, fontWeight: 600, lineHeight: 1.6, wordBreak: "break-all" }}>
                    reportcheck.jewelsreport.com
                  </div>
                  <div style={{ fontSize: 7, color: INK3, marginTop: 3, wordBreak: "break-all" }}>{cert.reportNo}</div>
                </div>
              </div>

              {/* Security features */}
              <div style={{
                border: `0.75px solid rgba(184,146,42,0.28)`,
                padding: "5px 9px",
                background: W,
              }}>
                <div style={{ fontSize: 6, fontWeight: 700, color: INK2, lineHeight: 1.85, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Security Features: Holographic Foil · Guilloché Pattern · Embossed Seal · UV Reactive Ink
                </div>
                <div style={{ fontSize: 6, color: INK3, marginTop: 2, lineHeight: 1.55 }}>
                  This document is protected. Unauthorised reproduction or alteration is prohibited.
                  Verify authenticity at jewelsreport.com/verify
                </div>
              </div>
            </div>
          </div>

          {/* P3 footer */}
          <div style={{
            borderTop: `1px solid ${RULE}`,
            padding: "5px 14px",
            flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: W,
          }}>
            <span style={{ fontSize: 6.5, color: INK3, letterSpacing: "0.1em" }}>jewelsreport.com/verify</span>
            <span style={{ fontSize: 6.5, color: INK3, letterSpacing: "0.06em" }}>{cert.reportNo}</span>
          </div>
        </div>

      </div>
    );
  }
);
