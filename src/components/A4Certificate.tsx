import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { Certificate } from "@/lib/store";
import { REPORT_TYPE_LABELS } from "@/lib/store";
import logo from "@/assets/logo.png";

/* ── Landscape A4 at 96 dpi (1 CSS px = 0.2646 mm) ─────────────── */
export const A4_W = 1122; // 297 mm
export const A4_H = 794;  // 210 mm

/* Panel widths */
const P1 = 310;  // Brand / Grading
const P2 = 440;  // Image panel (wider — luxury showcase)
const P3 = 372;  // Details / Seal

/* Brand palette */
const NAVY   = "#0D1B2A";
const NAVY2  = "#162537";
const GOLD   = "#C9A84C";
const GOLD2  = "#A07C20";
const GOLD3  = "#7D5C0A";
const CREAM  = "#FAF6ED";
const CREAM2 = "#F2EAD3";
const TXT    = "#1C0F00";
const TXT2   = "#4A3818";
const TXT3   = "#8A6F3C";

const BAR = `linear-gradient(90deg,${NAVY} 0%,${NAVY2} 100%)`;

/* ── Dotted-leader field row ─────────────────────────────────────── */
function FR({ label, value, size = 10.5, bold = true }: {
  label: string; value: string; size?: number; bold?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", marginBottom: 4.5 }}>
      <span style={{ fontSize: size, color: TXT2, whiteSpace: "nowrap", lineHeight: 1.35, flexShrink: 0 }}>
        {label}
      </span>
      <span style={{
        flex: 1, margin: `0 5px ${size * 0.18}px`, minWidth: 8,
        borderBottom: `1.5px dotted rgba(201,168,76,0.5)`,
      }} />
      <span style={{
        fontSize: size, fontWeight: bold ? 800 : 600, color: TXT,
        lineHeight: 1.35, textTransform: "uppercase",
        letterSpacing: "0.03em", whiteSpace: "nowrap",
      }}>
        {value}
      </span>
    </div>
  );
}

/* ── Dark navy section header bar ───────────────────────────────── */
function SectionBar({ label, py = 5 }: { label: string; py?: number }) {
  return (
    <div style={{
      background: BAR,
      padding: `${py}px 16px`,
      flexShrink: 0,
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <div style={{ width: 2, height: 11, background: GOLD, flexShrink: 0 }} />
      <span style={{
        fontSize: 7, fontWeight: 800, letterSpacing: "0.28em",
        textTransform: "uppercase", color: GOLD,
      }}>
        {label}
      </span>
    </div>
  );
}

/* ── Gold sub-section header ─────────────────────────────────────── */
function SubHdr({ label }: { label: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 6,
      margin: "9px 0 5px",
    }}>
      <div style={{ width: 18, height: 1.5, background: GOLD, flexShrink: 0 }} />
      <span style={{
        fontSize: 6.5, fontWeight: 800, letterSpacing: "0.25em",
        textTransform: "uppercase", color: GOLD2,
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1.5, background: `linear-gradient(90deg,${GOLD},transparent)`, flexShrink: 0 }} />
    </div>
  );
}

/* ── Thin ornamental divider ─────────────────────────────────────── */
function GoldLine({ opacity = 0.4 }: { opacity?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "6px 0" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,rgba(201,168,76,${opacity}))` }} />
      <div style={{ width: 4, height: 4, background: `rgba(201,168,76,${opacity})`, transform: "rotate(45deg)", flexShrink: 0 }} />
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,rgba(201,168,76,${opacity}),transparent)` }} />
    </div>
  );
}

/* ── Corner ornament ─────────────────────────────────────────────── */
function Corner({ flip }: { flip?: boolean }) {
  const s: React.CSSProperties = {
    position: "absolute", width: 20, height: 20,
    borderTop: `1.5px solid rgba(201,168,76,0.55)`,
    borderLeft: `1.5px solid rgba(201,168,76,0.55)`,
    ...(flip ? { transform: "scaleX(-1)", right: 10, top: 10 } : { left: 10, top: 10 }),
  };
  return <div style={s} />;
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
      try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }); }
      catch { return d; }
    };

    const panelHdr = isG
      ? "Gemstone Grading Report"
      : isJ ? "Jewellery Grading Report"
      : `${cert.type.replace("Natural ", "").replace("Lab Grown ", "")} Grading Report`;

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

    return (
      <div ref={ref} style={{
        width: A4_W, height: A4_H,
        background: CREAM,
        fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        position: "relative",
      }}>

        {/* Global watermark */}
        <img src={logo} alt="" aria-hidden style={{
          position: "absolute", width: 600, height: 600,
          objectFit: "contain", opacity: 0.018,
          left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* ═══════════════════════════════════════════════════════
            PANEL 1 — Brand + Grading Fields
        ═══════════════════════════════════════════════════════ */}
        <div style={{
          width: P1, height: A4_H, flexShrink: 0,
          display: "flex", flexDirection: "column",
          position: "relative", zIndex: 1,
          background: CREAM,
          borderRight: `0.5px solid rgba(201,168,76,0.3)`,
        }}>

          {/* ── Brand header block (navy) ── */}
          <div style={{
            background: NAVY,
            padding: "20px 18px 16px",
            flexShrink: 0,
            display: "flex", flexDirection: "column", alignItems: "center",
            position: "relative",
          }}>
            {/* Top gold rule */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${GOLD},transparent)` }} />

            {/* Seal ring */}
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              border: `2px solid ${GOLD}`,
              boxShadow: `0 0 0 4px rgba(201,168,76,0.12), 0 0 0 7px rgba(201,168,76,0.05)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: `radial-gradient(circle,#1E2E40 0%,${NAVY} 100%)`,
              marginBottom: 9, flexShrink: 0,
            }}>
              <img src={logo} alt="JewelsReport" style={{ height: 46, width: 46, objectFit: "contain" }} />
            </div>

            <div style={{
              fontFamily: "Georgia,'Times New Roman',serif",
              fontSize: 19, fontWeight: 700, letterSpacing: "0.1em",
              color: "#FFFFFF", lineHeight: 1, textTransform: "uppercase",
            }}>
              JewelsReport
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 5, margin: "6px 0 4px", width: "100%" }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${GOLD})` }} />
              <div style={{ width: 4, height: 4, background: GOLD, transform: "rotate(45deg)" }} />
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${GOLD},transparent)` }} />
            </div>

            <div style={{ fontSize: 6.5, letterSpacing: "0.38em", textTransform: "uppercase", color: GOLD, fontWeight: 600 }}>
              Gemological Certification Lab
            </div>
          </div>

          {/* ── Section header ── */}
          <SectionBar label={panelHdr} py={6} />

          {/* ── Fields ── */}
          <div style={{ flex: 1, padding: "12px 16px 0", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {identityFields.map(([l, v]) => <FR key={l} label={l} value={v} />)}

            {gradingFields.length > 0 && (<>
              <SubHdr label="Grading Results" />
              {gradingFields.map(([l, v]) => <FR key={l} label={l} value={v} size={11} />)}
            </>)}

            {addlFields.length > 0 && (<>
              <SubHdr label="Additional Grading Information" />
              {addlFields.map(([l, v]) => <FR key={l} label={l} value={v} />)}
            </>)}

            {cert.remarks && (
              <div style={{ marginTop: 8, padding: "6px 9px", background: CREAM2, borderLeft: `2.5px solid ${GOLD}`, borderRadius: "0 3px 3px 0", flexShrink: 0 }}>
                <div style={{ fontSize: 6.5, fontWeight: 800, textTransform: "uppercase", color: GOLD2, letterSpacing: "0.15em", marginBottom: 2 }}>Comments</div>
                <div style={{ fontSize: 9.5, color: TXT, lineHeight: 1.6 }}>{cert.remarks}</div>
              </div>
            )}

            {/* Ornamental filler */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 0" }}>
              <GoldLine />
              <div style={{ textAlign: "center", padding: "12px 0", position: "relative" }}>
                <div style={{ fontSize: 28, color: `rgba(201,168,76,0.14)`, lineHeight: 1, letterSpacing: "0.08em" }}>✦</div>
                <div style={{ fontSize: 7, letterSpacing: "0.4em", textTransform: "uppercase", color: `rgba(201,168,76,0.3)`, marginTop: 6, fontWeight: 700 }}>
                  Certified Authentic
                </div>
                <div style={{ fontSize: 6, letterSpacing: "0.25em", color: `rgba(201,168,76,0.2)`, marginTop: 3, textTransform: "uppercase" }}>
                  JewelsReport · Surat, India
                </div>
              </div>
              <GoldLine />
            </div>

            {/* Signature block */}
            <div style={{ borderTop: `1px solid rgba(201,168,76,0.25)`, paddingTop: 7, marginBottom: 0, flexShrink: 0 }}>
              <div style={{ minHeight: 40, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4 }}>
                {cert.signatureDataUrl && (
                  <img src={cert.signatureDataUrl} alt="Signature" style={{ maxHeight: 40, maxWidth: "85%", objectFit: "contain" }} />
                )}
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ height: 1, background: `linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)`, marginBottom: 5 }} />
                <div style={{ fontSize: 7.5, color: TXT2, fontWeight: 700, letterSpacing: "0.1em" }}>Authorised Signatory</div>
                <div style={{ fontSize: 6.5, color: TXT3, letterSpacing: "0.06em", marginTop: 1 }}>JewelsReport Gemological Certification Lab</div>
              </div>
            </div>
          </div>

          {/* Panel 1 footer */}
          <div style={{
            borderTop: `1px solid rgba(201,168,76,0.2)`,
            background: NAVY,
            padding: "5px 14px",
            flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ fontSize: 6.5, color: `rgba(201,168,76,0.6)`, letterSpacing: "0.1em" }}>jewelsreport.com</div>
            <div style={{ fontSize: 6.5, color: `rgba(201,168,76,0.4)`, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {REPORT_TYPE_LABELS[cert.type] ?? cert.type}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            PANEL 2 — Report Header + Item Photos (WIDER)
        ═══════════════════════════════════════════════════════ */}
        <div style={{
          width: P2, height: A4_H, flexShrink: 0,
          display: "flex", flexDirection: "column",
          position: "relative", zIndex: 1,
          background: CREAM,
          borderRight: `0.5px solid rgba(201,168,76,0.3)`,
        }}>

          {/* Report number header */}
          <div style={{
            padding: "14px 20px 11px",
            borderBottom: `0.5px solid rgba(201,168,76,0.25)`,
            flexShrink: 0, textAlign: "center",
            background: NAVY,
            position: "relative",
          }}>
            {/* Top gold rule */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${GOLD},transparent)` }} />
            <div style={{ fontSize: 7, letterSpacing: "0.28em", textTransform: "uppercase", color: GOLD, marginBottom: 4, fontWeight: 600 }}>
              GRL Report Number
            </div>
            <div style={{
              fontFamily: "Georgia,'Times New Roman',serif",
              fontSize: 22, fontWeight: 700, letterSpacing: "0.05em", color: "#FFFFFF",
            }}>
              {cert.reportNo}
            </div>
            <div style={{ fontSize: 7.5, color: `rgba(201,168,76,0.65)`, marginTop: 4, letterSpacing: "0.06em" }}>
              Verify this report at jewelsreport.com/verify
            </div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 10.5, fontWeight: 600, color: `rgba(201,168,76,0.8)`, marginTop: 4 }}>
              {fmtDate(cert.issueDate)}
            </div>
          </div>

          <SectionBar label="Item(s) Overall Description" py={6} />

          {/* Photo area — fills remaining space */}
          <div style={{ flex: 1, padding: "12px 16px 10px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {cert.description && (
              <p style={{
                fontSize: 10.5, color: TXT2, lineHeight: 1.75,
                marginBottom: 10, flexShrink: 0,
                fontStyle: "italic",
                borderLeft: `2px solid rgba(201,168,76,0.35)`,
                paddingLeft: 8,
              }}>
                {cert.description}
              </p>
            )}

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: has2Img ? 10 : 0, minHeight: 0 }}>
              {cert.imageDataUrl && (
                <div style={{
                  flex: 1, minHeight: 0,
                  border: `1px solid rgba(201,168,76,0.4)`,
                  borderRadius: 3, overflow: "hidden",
                  background: CREAM2,
                  boxShadow: `0 2px 12px rgba(13,27,42,0.08)`,
                  position: "relative",
                }}>
                  <img src={cert.imageDataUrl} alt="Item" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </div>
              )}
              {cert.imageDataUrl2 && (
                <div style={{
                  flex: 1, minHeight: 0,
                  border: `1px solid rgba(201,168,76,0.4)`,
                  borderRadius: 3, overflow: "hidden",
                  background: CREAM2,
                  boxShadow: `0 2px 12px rgba(13,27,42,0.08)`,
                }}>
                  <img src={cert.imageDataUrl2} alt="Item" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </div>
              )}
              {!hasImg && (
                <div style={{
                  flex: 1, minHeight: 0,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  background: CREAM2,
                  border: `1px solid rgba(201,168,76,0.35)`,
                  borderRadius: 3,
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `repeating-linear-gradient(45deg,rgba(201,168,76,0.035) 0px,rgba(201,168,76,0.035) 1px,transparent 1px,transparent 12px),repeating-linear-gradient(-45deg,rgba(201,168,76,0.035) 0px,rgba(201,168,76,0.035) 1px,transparent 1px,transparent 12px)`,
                  }} />
                  <img src={logo} alt="" style={{ height: 72, opacity: 0.11, marginBottom: 12, position: "relative" }} />
                  <div style={{ fontSize: 8.5, color: "rgba(201,168,76,0.38)", letterSpacing: "0.28em", textTransform: "uppercase", position: "relative" }}>
                    No Image Provided
                  </div>
                </div>
              )}
            </div>

            {hasImg && (
              <p style={{ fontSize: 8, color: TXT3, textAlign: "center", marginTop: 6, fontStyle: "italic", flexShrink: 0 }}>
                Image is approximate
              </p>
            )}
          </div>

          {/* Panel 2 footer */}
          <div style={{
            background: NAVY,
            padding: "5px 16px",
            flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ fontSize: 6.5, color: `rgba(201,168,76,0.45)`, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Gemological Certification Lab · Surat, Gujarat, India
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            PANEL 3 — Grading Details + Seal + QR
        ═══════════════════════════════════════════════════════ */}
        <div style={{
          width: P3, height: A4_H, flexShrink: 0,
          display: "flex", flexDirection: "column",
          position: "relative", zIndex: 1,
          background: CREAM,
        }}>

          {/* Top navy bar matching other panels */}
          <div style={{
            background: NAVY, padding: "14px 16px 11px", flexShrink: 0,
            position: "relative",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${GOLD},transparent)` }} />
            <div style={{ fontSize: 7, letterSpacing: "0.28em", textTransform: "uppercase", color: GOLD, fontWeight: 600, textAlign: "center" }}>
              Official Certification Record
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6 }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,rgba(201,168,76,0.3))` }} />
              <div style={{ width: 3, height: 3, background: `rgba(201,168,76,0.5)`, transform: "rotate(45deg)" }} />
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,rgba(201,168,76,0.3),transparent)` }} />
            </div>
          </div>

          <SectionBar label="Grading Details" py={6} />

          <div style={{ flex: 1, padding: "12px 14px 10px", display: "flex", flexDirection: "column", overflow: "hidden" }}>

            {p3Fields.map(([l, v]) => <FR key={l} label={l} value={v} />)}

            {gemP3.length > 0 && (<>
              <SubHdr label="Gemstone Details" />
              {gemP3.map(([l, v]) => <FR key={l} label={l} value={v} />)}
            </>)}

            {isJ && cert.metalDescription && (
              <div style={{ marginTop: 8, marginBottom: 6, flexShrink: 0 }}>
                <div style={{ fontSize: 9.5, color: TXT, lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 700 }}>*Marking(s):</span> {cert.metalDescription}
                </div>
                <div style={{ fontSize: 7.5, color: TXT3, marginTop: 2, lineHeight: 1.4, fontStyle: "italic" }}>
                  *Marking(s) represent what is present and may not have been assessed by JewelsReport.
                </div>
              </div>
            )}

            {cert.remarks && (
              <div style={{ marginTop: 6, marginBottom: 6, flexShrink: 0 }}>
                <div style={{ fontSize: 9.5, color: TXT, lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 700 }}>Comments:</span> {cert.remarks}
                </div>
              </div>
            )}

            {/* Disclaimer fills gap */}
            <div style={{ flex: 1, marginTop: 10, minHeight: 0, overflow: "hidden" }}>
              <GoldLine />
              <p style={{ fontSize: 7.5, color: TXT3, lineHeight: 1.85, marginTop: 8 }}>
                The results documented in this report refer only to the article described,
                and were obtained using the techniques and equipment used by JewelsReport
                at the time of examination. This report is not a guarantee or valuation.
                For additional information and important limitations please see
                jewelsreport.com/terms or contact the JewelsReport Gemological
                Certification Lab directly. ©{new Date().getFullYear()} JewelsReport
                Gemological Certification Lab. All rights reserved.
              </p>
            </div>

            {/* Seal + QR block */}
            <div style={{ flexShrink: 0 }}>
              <GoldLine opacity={0.25} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "8px 0" }}>
                {/* Seal */}
                <div style={{
                  width: 74, height: 74, flexShrink: 0, borderRadius: "50%",
                  border: `2px solid ${GOLD}`,
                  boxShadow: `0 0 0 3px rgba(201,168,76,0.12), 0 0 0 6px rgba(201,168,76,0.05), inset 0 0 0 2px rgba(201,168,76,0.1)`,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  background: `radial-gradient(circle,#1E2E40 0%,${NAVY} 100%)`,
                }}>
                  <img src={logo} alt="" style={{ height: 38, width: 38, objectFit: "contain" }} />
                  <div style={{ fontSize: 5, fontWeight: 900, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, marginTop: 3 }}>
                    CERTIFIED
                  </div>
                </div>

                {/* QR */}
                <div style={{
                  padding: 5, background: "#FFFFFF",
                  border: `1px solid rgba(201,168,76,0.4)`,
                  borderRadius: 3, flexShrink: 0,
                  boxShadow: `0 1px 6px rgba(13,27,42,0.08)`,
                }}>
                  <QRCodeSVG value={verifyUrl} size={68} level="M" />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 7, color: GOLD2, fontWeight: 700, lineHeight: 1.55, wordBreak: "break-all" }}>
                    reportcheck.jewelsreport.com
                  </div>
                  <div style={{ fontSize: 7, color: TXT3, marginTop: 3, wordBreak: "break-all" }}>{cert.reportNo}</div>
                </div>
              </div>

              {/* Security features box */}
              <div style={{
                border: `1px solid rgba(201,168,76,0.35)`,
                borderRadius: 3, padding: "5px 9px",
                background: NAVY,
              }}>
                <div style={{ fontSize: 6, fontWeight: 700, color: GOLD, lineHeight: 1.8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Security Features: Holographic Foil · Guilloché Pattern · Embossed Seal · UV Reactive Ink
                </div>
                <div style={{ fontSize: 6, color: `rgba(201,168,76,0.5)`, marginTop: 2, lineHeight: 1.6 }}>
                  This document is protected. Unauthorised reproduction or alteration is prohibited.
                  Verify authenticity at jewelsreport.com/verify
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
);
