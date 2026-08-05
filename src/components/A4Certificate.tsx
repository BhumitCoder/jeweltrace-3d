import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { Certificate } from "@/lib/store";
import { REPORT_TYPE_LABELS } from "@/lib/store";
import logo from "@/assets/logo.png";

/* ── Landscape A4 at 96 dpi ─────────────────────────────────────── */
export const A4_W = 1122; // 297 mm
export const A4_H = 794;  // 210 mm

/* Panel widths */
const P1 = 308;
const P2 = 446;
const P3 = 368;

/* ── Palette — light luxury ─────────────────────────────────────── */
const WHITE  = "#FFFFFF";
const IVORY  = "#FEFCF6";
const WARM   = "#FBF6E9";
const GOLD   = "#B8922A";
const GOLD2  = "#9A7418";
const GOLD3  = "#7D5C0A";
const GOLD_L = "#E8D49A";   // light gold for backgrounds
const TXT    = "#1A0E00";
const TXT2   = "#3D2B08";
const TXT3   = "#8A6D3C";
const RULE   = "rgba(184,146,42,0.28)";
const BAR_BG = `linear-gradient(90deg,#C9A84C 0%,#B8922A 50%,#9A7418 100%)`;

/* ── GIA-style dotted-leader field row ──────────────────────────── */
function FR({ label, value, size = 10.5 }: { label: string; value: string; size?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", marginBottom: 5 }}>
      <span style={{ fontSize: size, color: TXT2, whiteSpace: "nowrap", lineHeight: 1.35, flexShrink: 0 }}>
        {label}
      </span>
      <span style={{
        flex: 1, margin: `0 5px ${size * 0.18}px`, minWidth: 8,
        borderBottom: `1.5px dotted rgba(184,146,42,0.45)`,
      }} />
      <span style={{
        fontSize: size, fontWeight: 800, color: TXT,
        lineHeight: 1.35, textTransform: "uppercase",
        letterSpacing: "0.025em", whiteSpace: "nowrap",
      }}>
        {value}
      </span>
    </div>
  );
}

/* ── Gold gradient section header bar ───────────────────────────── */
function SectionBar({ label }: { label: string }) {
  return (
    <div style={{
      background: BAR_BG,
      padding: "5px 16px",
      flexShrink: 0,
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <span style={{
        fontSize: 7, fontWeight: 800, letterSpacing: "0.3em",
        textTransform: "uppercase", color: "#FFFFFF",
      }}>
        {label}
      </span>
    </div>
  );
}

/* ── Sub-section label ───────────────────────────────────────────── */
function SubHdr({ label }: { label: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 0,
      margin: "9px 0 5px",
      background: WARM,
      borderLeft: `3px solid ${GOLD}`,
      padding: "3px 8px",
      borderRadius: "0 2px 2px 0",
    }}>
      <span style={{
        fontSize: 6.5, fontWeight: 800, letterSpacing: "0.22em",
        textTransform: "uppercase", color: GOLD2,
      }}>
        {label}
      </span>
    </div>
  );
}

/* ── Thin ornamental divider ─────────────────────────────────────── */
function GoldLine({ my = 7 }: { my?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, margin: `${my}px 0` }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${GOLD_L})` }} />
      <div style={{ width: 5, height: 5, background: GOLD_L, transform: "rotate(45deg)", flexShrink: 0 }} />
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${GOLD_L},transparent)` }} />
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
        background: WHITE,
        fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        position: "relative",
        /* Outer gold frame */
        outline: `1.5px solid ${GOLD}`,
        outlineOffset: "-1px",
      }}>

        {/* Faint logo watermark centre */}
        <img src={logo} alt="" aria-hidden style={{
          position: "absolute", width: 540, height: 540,
          objectFit: "contain", opacity: 0.025,
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
          background: IVORY,
          borderRight: `1px solid ${RULE}`,
        }}>

          {/* ── Brand header ── */}
          <div style={{
            padding: "18px 16px 14px",
            borderBottom: `1px solid ${RULE}`,
            flexShrink: 0,
            display: "flex", flexDirection: "column", alignItems: "center",
            background: WHITE,
          }}>
            {/* Top gold double rule */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4,
              background: `linear-gradient(90deg,${GOLD3},${GOLD},${GOLD3})` }} />

            {/* Logo seal */}
            <div style={{
              width: 74, height: 74, borderRadius: "50%",
              border: `2px solid ${GOLD}`,
              boxShadow: `0 0 0 4px rgba(184,146,42,0.1), 0 0 0 7px rgba(184,146,42,0.04)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: `radial-gradient(circle,#FFFDE8 0%,#FBF4D8 100%)`,
              marginBottom: 9, flexShrink: 0, marginTop: 4,
            }}>
              <img src={logo} alt="JewelsReport" style={{ height: 50, width: 50, objectFit: "contain" }} />
            </div>

            <div style={{
              fontFamily: "Georgia,'Times New Roman',serif",
              fontSize: 20, fontWeight: 700, letterSpacing: "0.09em",
              color: TXT, lineHeight: 1, textTransform: "uppercase",
            }}>
              JewelsReport
            </div>

            {/* Diamond rule */}
            <div style={{ display: "flex", alignItems: "center", gap: 5, margin: "6px 0 4px", width: "100%" }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${GOLD})` }} />
              <div style={{ width: 4, height: 4, background: GOLD, transform: "rotate(45deg)" }} />
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${GOLD},transparent)` }} />
            </div>

            <div style={{ fontSize: 6.5, letterSpacing: "0.36em", textTransform: "uppercase", color: TXT3, fontWeight: 600 }}>
              Gemological Certification Lab
            </div>
          </div>

          <SectionBar label={panelHdr} />

          {/* Fields */}
          <div style={{ flex: 1, padding: "11px 14px 0", display: "flex", flexDirection: "column", overflow: "hidden" }}>
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
              <div style={{ marginTop: 8, padding: "5px 9px", background: WARM, borderLeft: `2.5px solid ${GOLD}`, borderRadius: "0 3px 3px 0", flexShrink: 0 }}>
                <div style={{ fontSize: 6.5, fontWeight: 800, textTransform: "uppercase", color: GOLD2, letterSpacing: "0.15em", marginBottom: 2 }}>Comments</div>
                <div style={{ fontSize: 9.5, color: TXT, lineHeight: 1.6 }}>{cert.remarks}</div>
              </div>
            )}

            {/* Ornamental filler */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 0" }}>
              <GoldLine />
              <div style={{ textAlign: "center", padding: "10px 0" }}>
                <div style={{ fontSize: 30, color: `rgba(184,146,42,0.18)`, lineHeight: 1 }}>✦</div>
                <div style={{ fontSize: 7, letterSpacing: "0.4em", textTransform: "uppercase", color: `rgba(184,146,42,0.32)`, marginTop: 6, fontWeight: 700 }}>
                  Certified Authentic
                </div>
                <div style={{ fontSize: 6, letterSpacing: "0.24em", color: `rgba(184,146,42,0.22)`, marginTop: 3, textTransform: "uppercase" }}>
                  JewelsReport · Surat, India
                </div>
              </div>
              <GoldLine />
            </div>

            {/* Signature */}
            <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: 7, marginBottom: 0, flexShrink: 0 }}>
              <div style={{ minHeight: 40, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4 }}>
                {cert.signatureDataUrl && (
                  <img src={cert.signatureDataUrl} alt="Signature" style={{ maxHeight: 40, maxWidth: "85%", objectFit: "contain" }} />
                )}
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ height: 1, background: `linear-gradient(90deg,transparent,${RULE},transparent)`, marginBottom: 5 }} />
                <div style={{ fontSize: 7.5, color: TXT2, fontWeight: 700, letterSpacing: "0.1em" }}>Authorised Signatory</div>
                <div style={{ fontSize: 6.5, color: TXT3, letterSpacing: "0.06em", marginTop: 1 }}>JewelsReport Gemological Certification Lab</div>
              </div>
            </div>
          </div>

          {/* P1 footer strip */}
          <div style={{
            borderTop: `1px solid ${RULE}`,
            background: `linear-gradient(90deg,${GOLD3},${GOLD},${GOLD3})`,
            padding: "5px 14px",
            flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ fontSize: 6.5, color: "rgba(255,255,255,0.85)", letterSpacing: "0.1em" }}>jewelsreport.com</div>
            <div style={{ fontSize: 6.5, color: "rgba(255,255,255,0.65)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {REPORT_TYPE_LABELS[cert.type] ?? cert.type}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            PANEL 2 — Report Info + Item Photos
        ═══════════════════════════════════════════════════════ */}
        <div style={{
          width: P2, height: A4_H, flexShrink: 0,
          display: "flex", flexDirection: "column",
          position: "relative", zIndex: 1,
          background: WHITE,
          borderRight: `1px solid ${RULE}`,
        }}>

          {/* Report number header */}
          <div style={{
            padding: "14px 20px 12px",
            borderBottom: `1px solid ${RULE}`,
            flexShrink: 0, textAlign: "center",
            background: WHITE,
            position: "relative",
          }}>
            {/* Top gradient rule */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4,
              background: `linear-gradient(90deg,${GOLD3},${GOLD},${GOLD3})` }} />

            <div style={{ fontSize: 7, letterSpacing: "0.28em", textTransform: "uppercase", color: TXT3, marginBottom: 4, fontWeight: 600, marginTop: 4 }}>
              GRL Report Number
            </div>
            <div style={{
              fontFamily: "Georgia,'Times New Roman',serif",
              fontSize: 22, fontWeight: 700, letterSpacing: "0.05em", color: TXT,
            }}>
              {cert.reportNo}
            </div>

            {/* Thin gold rule */}
            <div style={{ display: "flex", alignItems: "center", gap: 5, margin: "6px 0 4px" }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${GOLD_L})` }} />
              <div style={{ width: 4, height: 4, background: GOLD_L, transform: "rotate(45deg)" }} />
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${GOLD_L},transparent)` }} />
            </div>

            <div style={{ fontSize: 7.5, color: GOLD2, marginTop: 2, letterSpacing: "0.06em" }}>
              Verify this report at jewelsreport.com/verify
            </div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 11, fontWeight: 600, color: TXT2, marginTop: 4 }}>
              {fmtDate(cert.issueDate)}
            </div>
          </div>

          <SectionBar label="Item(s) Overall Description" />

          {/* Photo area */}
          <div style={{ flex: 1, padding: "12px 16px 10px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {cert.description && (
              <p style={{
                fontSize: 10.5, color: TXT2, lineHeight: 1.75,
                marginBottom: 10, flexShrink: 0, fontStyle: "italic",
                borderLeft: `2px solid rgba(184,146,42,0.35)`, paddingLeft: 8,
              }}>
                {cert.description}
              </p>
            )}

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: has2Img ? 10 : 0, minHeight: 0 }}>
              {cert.imageDataUrl && (
                <div style={{
                  flex: 1, minHeight: 0,
                  border: `1px solid rgba(184,146,42,0.3)`,
                  borderRadius: 3, overflow: "hidden", background: IVORY,
                  boxShadow: `0 2px 10px rgba(0,0,0,0.06)`,
                }}>
                  <img src={cert.imageDataUrl} alt="Item" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </div>
              )}
              {cert.imageDataUrl2 && (
                <div style={{
                  flex: 1, minHeight: 0,
                  border: `1px solid rgba(184,146,42,0.3)`,
                  borderRadius: 3, overflow: "hidden", background: IVORY,
                  boxShadow: `0 2px 10px rgba(0,0,0,0.06)`,
                }}>
                  <img src={cert.imageDataUrl2} alt="Item" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </div>
              )}
              {!hasImg && (
                <div style={{
                  flex: 1, minHeight: 0,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  background: WARM,
                  border: `1px solid rgba(184,146,42,0.25)`,
                  borderRadius: 3, position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `repeating-linear-gradient(45deg,rgba(184,146,42,0.04) 0px,rgba(184,146,42,0.04) 1px,transparent 1px,transparent 12px),repeating-linear-gradient(-45deg,rgba(184,146,42,0.04) 0px,rgba(184,146,42,0.04) 1px,transparent 1px,transparent 12px)`,
                  }} />
                  <img src={logo} alt="" style={{ height: 72, opacity: 0.12, marginBottom: 12, position: "relative" }} />
                  <div style={{ fontSize: 8.5, color: "rgba(184,146,42,0.35)", letterSpacing: "0.28em", textTransform: "uppercase", position: "relative" }}>
                    No Image Provided
                  </div>
                </div>
              )}
            </div>

            {hasImg && (
              <p style={{ fontSize: 7.5, color: TXT3, textAlign: "center", marginTop: 6, fontStyle: "italic", flexShrink: 0 }}>
                Image is approximate
              </p>
            )}
          </div>

          {/* P2 footer */}
          <div style={{
            background: `linear-gradient(90deg,${GOLD3},${GOLD},${GOLD3})`,
            padding: "5px 16px",
            flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ fontSize: 6.5, color: "rgba(255,255,255,0.75)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
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
          background: IVORY,
        }}>

          {/* P3 header — matches report number header style */}
          <div style={{
            padding: "14px 16px 12px",
            borderBottom: `1px solid ${RULE}`,
            flexShrink: 0, textAlign: "center",
            background: WHITE,
            position: "relative",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4,
              background: `linear-gradient(90deg,${GOLD3},${GOLD},${GOLD3})` }} />
            <div style={{ fontSize: 7, letterSpacing: "0.28em", textTransform: "uppercase", color: TXT3, fontWeight: 600, marginTop: 4 }}>
              Official Certification Record
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, margin: "6px 0 0" }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${GOLD_L})` }} />
              <div style={{ width: 4, height: 4, background: GOLD_L, transform: "rotate(45deg)" }} />
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${GOLD_L},transparent)` }} />
            </div>
          </div>

          <SectionBar label="Grading Details" />

          <div style={{ flex: 1, padding: "11px 14px 10px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
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
            <div style={{ flex: 1, marginTop: 8, minHeight: 0, overflow: "hidden" }}>
              <GoldLine my={6} />
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

            {/* Seal + QR */}
            <div style={{ flexShrink: 0 }}>
              <GoldLine my={5} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "8px 0" }}>
                {/* Seal */}
                <div style={{
                  width: 74, height: 74, flexShrink: 0, borderRadius: "50%",
                  border: `2px solid ${GOLD}`,
                  boxShadow: `0 0 0 3px rgba(184,146,42,0.12), 0 0 0 6px rgba(184,146,42,0.05)`,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  background: `radial-gradient(circle,#FFFDE8 0%,#FBF4D8 100%)`,
                }}>
                  <img src={logo} alt="" style={{ height: 40, width: 40, objectFit: "contain" }} />
                  <div style={{ fontSize: 5.5, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD2, marginTop: 3 }}>
                    CERTIFIED
                  </div>
                </div>

                {/* QR */}
                <div style={{
                  padding: 5, background: WHITE,
                  border: `1px solid rgba(184,146,42,0.3)`,
                  borderRadius: 3, flexShrink: 0,
                  boxShadow: `0 1px 5px rgba(0,0,0,0.06)`,
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

              {/* Security features */}
              <div style={{
                border: `1px solid rgba(184,146,42,0.3)`,
                borderRadius: 2, padding: "5px 9px",
                background: WARM,
              }}>
                <div style={{ fontSize: 6, fontWeight: 700, color: TXT2, lineHeight: 1.8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Security Features: Holographic Foil · Guilloché Pattern · Embossed Seal · UV Reactive Ink
                </div>
                <div style={{ fontSize: 6, color: TXT3, marginTop: 2, lineHeight: 1.5 }}>
                  This document is protected. Unauthorised reproduction or alteration is prohibited.
                  Verify authenticity at jewelsreport.com/verify
                </div>
              </div>
            </div>
          </div>

          {/* P3 footer */}
          <div style={{
            background: `linear-gradient(90deg,${GOLD3},${GOLD},${GOLD3})`,
            padding: "5px 14px",
            flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ fontSize: 6.5, color: "rgba(255,255,255,0.75)", letterSpacing: "0.1em" }}>jewelsreport.com/verify</div>
            <div style={{ fontSize: 6.5, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em" }}>
              {cert.reportNo}
            </div>
          </div>
        </div>

      </div>
    );
  }
);
