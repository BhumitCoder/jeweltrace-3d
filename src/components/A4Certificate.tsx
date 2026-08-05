import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { Certificate } from "@/lib/store";
import { REPORT_TYPE_LABELS } from "@/lib/store";
import logo from "@/assets/logo.png";

/* ── Landscape A4 at 96 CSS dpi ─────────────────────────────────── */
export const A4_W = 1122;
export const A4_H = 794;

const P1 = 314;   // Left  — Brand + ALL grading fields
const P2 = 446;   // Centre — Report header + Photos
const P3 = 362;   // Right  — Authentication only (no duplicate fields)

/* ─── All-light luxury palette ──────────────────────────────────── */
const BG     = "#FFFEF9";
const PANEL  = "#FDFAF0";
const HDR    = "#FBF7E8";
const GOLD   = "#C9A84C";
const GOLD2  = "#A07828";
const GOLD3  = "#D4B870";
const GOLD4  = "rgba(201,168,76,0.14)";
const TXT    = "#5C4822";
const TXT2   = "#8A6830";
const TXT3   = "#B8963C";
const RULE   = "rgba(201,168,76,0.2)";

/* ─── Field row ─────────────────────────────────────────────────── */
function FR({ label, value, sz = 10.5 }: { label: string; value: string; sz?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", marginBottom: 5 }}>
      <span style={{ fontSize: sz, color: TXT2, lineHeight: 1.35, flexShrink: 0, whiteSpace: "nowrap" }}>{label}</span>
      <span style={{ flex: 1, minWidth: 8, margin: `0 5px ${sz * 0.17}px`, borderBottom: `1.5px dotted rgba(201,168,76,0.35)` }} />
      <span style={{ fontSize: sz, fontWeight: 700, color: TXT, lineHeight: 1.35, whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: "0.03em" }}>{value}</span>
    </div>
  );
}

/* ─── Section header ─────────────────────────────────────────────── */
function Hdr({ label }: { label: string }) {
  return (
    <div style={{ borderTop: `1.5px solid ${GOLD}`, borderBottom: `1px solid ${RULE}`, background: HDR, padding: "4px 15px", flexShrink: 0 }}>
      <span style={{ fontSize: 6.5, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: GOLD2 }}>{label}</span>
    </div>
  );
}

/* ─── Sub-section label ──────────────────────────────────────────── */
function Sub({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "8px 0 4px" }}>
      <div style={{ width: 12, height: 1, background: GOLD3, flexShrink: 0 }} />
      <span style={{ fontSize: 6.5, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: TXT3 }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${GOLD3},transparent)` }} />
    </div>
  );
}

/* ─── Ornamental rule ────────────────────────────────────────────── */
function HR({ my = 7, op = 0.55 }: { my?: number; op?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, margin: `${my}px 0`, opacity: op }}>
      <div style={{ flex: 1, height: 0.75, background: `linear-gradient(90deg,transparent,${GOLD3})` }} />
      <div style={{ width: 4, height: 4, background: GOLD3, transform: "rotate(45deg)", flexShrink: 0 }} />
      <div style={{ flex: 1, height: 0.75, background: `linear-gradient(90deg,${GOLD3},transparent)` }} />
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

    const reportTypeLabel = REPORT_TYPE_LABELS[cert.type] ?? cert.type;
    const panelHdr = isG ? "Gemstone Grading Report"
      : isJ ? "Jewellery Grading Report"
      : `${cert.type.replace("Natural ", "").replace("Lab Grown ", "")} Grading Report`;

    /* ─────────────────────────────────────────────────────────────
       PANEL 1 FIELDS
       All grading data lives here — NOTHING is repeated in Panel 3.
    ───────────────────────────────────────────────────────────── */

    // Group A — Identity (report no, shape/item basics)
    let groupA: [string, string][] = [];
    // Group B — Core grading results
    let groupB: [string, string][] = [];
    // Group B label
    let groupBLabel = "Grading Results";
    // Group C — Additional / gemstone / diamond details
    let groupC: [string, string][] = [];
    let groupCLabel = "Additional Information";

    if (isG) {
      groupA = ([
        ["GRL Report Number", cert.reportNo],
        ["Variety", cert.gemstoneStone],
        ["Shape & Cutting Style", cert.gemstoneShape],
        ["Measurements", cert.gemstoneMeasurements],
        ["Pieces (PCS)", cert.gemstonePcs],
        ["Origin", cert.gemstoneOrigin],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupB = ([
        ["Carat Weight", cert.gemstoneCaratWeight],
        ["Color & Transparency", cert.gemstoneColorTransparency],
        ["Characteristics", cert.gemstoneCharacteristics],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupBLabel = "Gemological Results";

    } else if (isJ) {
      groupA = ([
        ["GRL Report Number", cert.reportNo],
        ["Item Description", cert.itemName],
        ["Shape", cert.shape],
        ["Metal Tested As", cert.metal],
        ["Gross Weight", cert.grossWeight ? `${cert.grossWeight} GRM` : undefined],
        ["Net Weight", cert.netWeight ? `${cert.netWeight} GRM` : undefined],
        ["Origin", cert.origin],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupB = ([
        ["Diamond Shape", cert.diamondShape],
        ["Diamond Weight", cert.diamondWeight ? `${cert.diamondWeight} CT` : undefined],
        ["Diamond Total PCS", cert.diamondTotalPcs],
        ["Diamond Color", cert.diamondColor],
        ["Diamond Clarity", cert.diamondClarity],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupBLabel = "Diamond Details";
      groupC = ([
        ["Gemstone", cert.gemstoneStone],
        ["Gemstone Origin", cert.gemstoneOrigin],
        ["Gemstone Weight", cert.gemstoneCaratWeight],
        ["Gemstone PCS", cert.gemstonePcs],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupCLabel = "Gemstone Details";

    } else {
      // Diamond / Lab Grown Diamond
      groupA = ([
        ["GRL Report Number", cert.reportNo],
        ["Shape & Cutting Style", cert.shape],
        ["Measurements", cert.measurements],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupB = ([
        ["Carat Weight", cert.caratWeight ? `${cert.caratWeight} carat` : undefined],
        ["Color Grade", cert.color],
        ["Clarity Grade", cert.clarity],
        ["Cut Grade", cert.cut],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupC = ([
        ["Polish Grade", cert.polish],
        ["Symmetry Grade", cert.symmetry],
        ["Fluorescence", cert.fluorescence],
        ["Origin", cert.origin],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupCLabel = "Additional Grading Information";
    }

    const hasImg  = !!(cert.imageDataUrl || cert.imageDataUrl2);
    const has2Img = !!(cert.imageDataUrl && cert.imageDataUrl2);

    return (
      <div ref={ref} style={{
        width: A4_W, height: A4_H,
        background: BG,
        fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex", flexDirection: "row",
        position: "relative",
        border: `1.5px solid ${GOLD}`,
      }}>

        {/* Watermark */}
        <img src={logo} alt="" aria-hidden style={{
          position: "absolute", width: 480, height: 480,
          objectFit: "contain", opacity: 0.03,
          left: "50%", top: "50%", transform: "translate(-50%,-50%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* ══════════════════════════════════════════════════════
            PANEL 1 — Brand Identity + ALL Grading Fields
            (no data from this panel is repeated elsewhere)
        ══════════════════════════════════════════════════════ */}
        <div style={{
          width: P1, height: A4_H, flexShrink: 0,
          display: "flex", flexDirection: "column",
          zIndex: 1, background: PANEL,
          borderRight: `1px solid ${RULE}`,
          position: "relative",
        }}>

          {/* Brand header */}
          <div style={{
            padding: "18px 16px 13px", borderBottom: `1px solid ${RULE}`,
            flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center",
            background: BG, position: "relative",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${GOLD},transparent)` }} />
            <div style={{
              width: 74, height: 74, borderRadius: "50%",
              border: `1.5px solid ${GOLD}`,
              boxShadow: `0 0 0 5px ${GOLD4}, 0 0 0 9px rgba(201,168,76,0.05)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: `radial-gradient(circle,#FFFEF5 0%,#FDF8E1 70%,#F9EDBC 100%)`,
              marginBottom: 10, flexShrink: 0, marginTop: 5,
            }}>
              <img src={logo} alt="JewelsReport" style={{ height: 48, width: 48, objectFit: "contain" }} />
            </div>
            <div style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 19, fontWeight: 400, letterSpacing: "0.16em", color: TXT, lineHeight: 1, textTransform: "uppercase" }}>
              JewelsReport
            </div>
            <HR my={6} />
            <div style={{ fontSize: 6.5, letterSpacing: "0.4em", textTransform: "uppercase", color: TXT3 }}>
              Gemological Certification Lab
            </div>
          </div>

          <Hdr label={panelHdr} />

          {/* ── ALL grading fields — no duplication anywhere ── */}
          <div style={{ flex: 1, padding: "11px 14px 0", display: "flex", flexDirection: "column", overflow: "hidden" }}>

            {/* Group A — Identity */}
            {groupA.map(([l, v]) => <FR key={l} label={l} value={v} />)}

            {/* Group B — Core results */}
            {groupB.length > 0 && (<>
              <Sub label={groupBLabel} />
              {groupB.map(([l, v]) => <FR key={l} label={l} value={v} sz={11} />)}
            </>)}

            {/* Group C — Additional */}
            {groupC.length > 0 && (<>
              <Sub label={groupCLabel} />
              {groupC.map(([l, v]) => <FR key={l} label={l} value={v} />)}
            </>)}

            {/* Jewellery — metal markings */}
            {isJ && cert.metalDescription && (
              <div style={{ marginTop: 7, padding: "4px 8px", background: BG, borderLeft: `2px solid ${GOLD3}`, flexShrink: 0 }}>
                <div style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", color: TXT3, letterSpacing: "0.16em", marginBottom: 2 }}>Marking(s)</div>
                <div style={{ fontSize: 9, color: TXT, lineHeight: 1.6 }}>{cert.metalDescription}</div>
                <div style={{ fontSize: 6.5, color: TXT3, marginTop: 1, fontStyle: "italic" }}>Marking(s) may not have been assessed by JewelsReport.</div>
              </div>
            )}

            {/* Comments */}
            {cert.remarks && (
              <div style={{ marginTop: 7, padding: "4px 8px", background: BG, borderLeft: `2px solid ${GOLD3}`, flexShrink: 0 }}>
                <div style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", color: TXT3, letterSpacing: "0.16em", marginBottom: 2 }}>Comments</div>
                <div style={{ fontSize: 9.5, color: TXT, lineHeight: 1.65 }}>{cert.remarks}</div>
              </div>
            )}

            {/* Ornamental filler */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <HR op={0.35} />
              <div style={{ padding: "10px 0", textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, marginBottom: 7 }}>
                  <div style={{ width: 2, height: 2, background: GOLD3, transform: "rotate(45deg)" }} />
                  <div style={{ width: 5, height: 5, background: `rgba(201,168,76,0.28)`, transform: "rotate(45deg)" }} />
                  <div style={{ width: 2, height: 2, background: GOLD3, transform: "rotate(45deg)" }} />
                </div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 7, letterSpacing: "0.28em", textTransform: "uppercase", color: TXT3, fontStyle: "italic" }}>
                  Certified Authentic
                </div>
              </div>
              <HR op={0.35} />
            </div>

            {/* Signature */}
            <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: 7, flexShrink: 0 }}>
              <div style={{ minHeight: 40, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 3 }}>
                {cert.signatureDataUrl
                  ? <img src={cert.signatureDataUrl} alt="Signature" style={{ maxHeight: 40, maxWidth: "85%", objectFit: "contain" }} />
                  : <div style={{ width: "62%", height: 1, background: RULE }} />
                }
              </div>
              <div style={{ textAlign: "center", paddingBottom: 3 }}>
                <div style={{ height: 1, background: `linear-gradient(90deg,transparent,${RULE},transparent)`, marginBottom: 4 }} />
                <div style={{ fontSize: 7.5, color: TXT2, fontWeight: 600, letterSpacing: "0.1em" }}>Authorised Signatory</div>
                <div style={{ fontSize: 6.5, color: TXT3, letterSpacing: "0.06em", marginTop: 1 }}>JewelsReport Gemological Certification Lab</div>
              </div>
            </div>
          </div>

          {/* P1 footer */}
          <div style={{ borderTop: `1px solid ${RULE}`, padding: "4px 14px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", background: BG }}>
            <span style={{ fontSize: 6.5, color: TXT3, letterSpacing: "0.1em" }}>jewelsreport.com</span>
            <span style={{ fontSize: 6.5, color: TXT3, letterSpacing: "0.07em", textTransform: "uppercase" }}>{reportTypeLabel}</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            PANEL 2 — Report Number Header + Item Photos
        ══════════════════════════════════════════════════════ */}
        <div style={{
          width: P2, height: A4_H, flexShrink: 0,
          display: "flex", flexDirection: "column",
          zIndex: 1, background: BG,
          borderRight: `1px solid ${RULE}`,
          position: "relative",
        }}>

          {/* Report number header */}
          <div style={{
            padding: "18px 22px 13px", borderBottom: `1px solid ${RULE}`,
            flexShrink: 0, textAlign: "center",
            background: BG, position: "relative",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${GOLD},transparent)` }} />
            <div style={{ fontSize: 6.5, letterSpacing: "0.36em", textTransform: "uppercase", color: TXT3, marginBottom: 4, marginTop: 4 }}>GRL Report Number</div>
            <div style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 23, fontWeight: 400, letterSpacing: "0.06em", color: TXT }}>
              {cert.reportNo}
            </div>
            <HR my={6} />
            <div style={{ fontSize: 7.5, color: TXT3, letterSpacing: "0.07em" }}>Verify this report at jewelsreport.com/verify</div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 11, fontWeight: 400, color: TXT2, marginTop: 4, letterSpacing: "0.04em" }}>{fmtDate(cert.issueDate)}</div>
          </div>

          <Hdr label="Item(s) Overall Description" />

          {/* Photos */}
          <div style={{ flex: 1, padding: "12px 18px 10px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {cert.description && (
              <p style={{ fontFamily: "Georgia,serif", fontSize: 10.5, color: TXT2, lineHeight: 1.8, marginBottom: 11, flexShrink: 0, fontStyle: "italic" }}>
                {cert.description}
              </p>
            )}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: has2Img ? 9 : 0, minHeight: 0 }}>
              {cert.imageDataUrl && (
                <div style={{ flex: 1, minHeight: 0, border: `1px solid rgba(201,168,76,0.2)`, background: PANEL, boxShadow: `inset 0 0 0 4px rgba(201,168,76,0.04)`, overflow: "hidden" }}>
                  <img src={cert.imageDataUrl} alt="Item" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </div>
              )}
              {cert.imageDataUrl2 && (
                <div style={{ flex: 1, minHeight: 0, border: `1px solid rgba(201,168,76,0.2)`, background: PANEL, boxShadow: `inset 0 0 0 4px rgba(201,168,76,0.04)`, overflow: "hidden" }}>
                  <img src={cert.imageDataUrl2} alt="Item" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </div>
              )}
              {!hasImg && (
                <div style={{
                  flex: 1, minHeight: 0,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  background: PANEL, border: `1px solid rgba(201,168,76,0.18)`,
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(45deg,rgba(201,168,76,0.04) 0,rgba(201,168,76,0.04) 1px,transparent 1px,transparent 14px),repeating-linear-gradient(-45deg,rgba(201,168,76,0.04) 0,rgba(201,168,76,0.04) 1px,transparent 1px,transparent 14px)` }} />
                  <img src={logo} alt="" style={{ height: 64, opacity: 0.1, marginBottom: 11, position: "relative" }} />
                  <div style={{ fontSize: 8, color: TXT3, letterSpacing: "0.3em", textTransform: "uppercase", position: "relative", opacity: 0.6 }}>No Image Provided</div>
                </div>
              )}
            </div>
            {hasImg && (
              <p style={{ fontSize: 7.5, color: TXT3, textAlign: "center", marginTop: 5, fontStyle: "italic", flexShrink: 0 }}>Image is approximate</p>
            )}
          </div>

          {/* P2 footer */}
          <div style={{ borderTop: `1px solid ${RULE}`, padding: "4px 16px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: BG }}>
            <span style={{ fontSize: 6.5, color: TXT3, letterSpacing: "0.13em", textTransform: "uppercase" }}>Gemological Certification Lab · Surat, Gujarat, India</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            PANEL 3 — Authentication Only
            NO grading fields — those are all in Panel 1.
            This panel = official seal, QR, legal disclaimer.
        ══════════════════════════════════════════════════════ */}
        <div style={{
          width: P3, height: A4_H, flexShrink: 0,
          display: "flex", flexDirection: "column",
          zIndex: 1, background: PANEL,
          position: "relative",
        }}>

          {/* P3 header */}
          <div style={{
            padding: "18px 16px 13px", borderBottom: `1px solid ${RULE}`,
            flexShrink: 0, textAlign: "center",
            background: BG, position: "relative",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${GOLD},transparent)` }} />
            <div style={{ fontSize: 6.5, letterSpacing: "0.36em", textTransform: "uppercase", color: TXT3, marginTop: 4 }}>Official Certification Record</div>
            <HR my={6} op={0.4} />
            <div style={{ fontSize: 7.5, color: TXT3, letterSpacing: "0.07em" }}>Gemological Certification Lab</div>
          </div>

          <Hdr label="Certification & Authentication" />

          <div style={{ flex: 1, padding: "13px 14px 10px", display: "flex", flexDirection: "column", overflow: "hidden" }}>

            {/* Official statement box */}
            <div style={{ padding: "9px 11px", background: BG, border: `1px solid ${RULE}`, borderLeft: `2px solid ${GOLD}`, marginBottom: 12, flexShrink: 0 }}>
              <div style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", color: GOLD2, letterSpacing: "0.18em", marginBottom: 4 }}>Certification Statement</div>
              <div style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 9, color: TXT2, lineHeight: 1.75 }}>
                This is to certify that the article described herein has been examined
                by JewelsReport Gemological Certification Lab and the results documented
                are based on standard gemological testing methods.
              </div>
            </div>

            <HR />

            {/* Disclaimer fills remaining space */}
            <div style={{ flex: 1, minHeight: 0, overflow: "hidden", marginTop: 2 }}>
              <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 7.5, color: TXT3, lineHeight: 1.9, marginTop: 4 }}>
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
              <HR my={6} op={0.45} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                {/* Certification seal */}
                <div style={{
                  width: 76, height: 76, flexShrink: 0, borderRadius: "50%",
                  border: `1.5px solid ${GOLD}`,
                  boxShadow: `0 0 0 4px ${GOLD4}, 0 0 0 8px rgba(201,168,76,0.04)`,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  background: `radial-gradient(circle,#FFFEF5 0%,#FDF8E1 70%,#F9EDBC 100%)`,
                }}>
                  <img src={logo} alt="" style={{ height: 40, width: 40, objectFit: "contain" }} />
                  <div style={{ fontSize: 5.5, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD2, marginTop: 3 }}>CERTIFIED</div>
                </div>

                {/* QR code */}
                <div style={{ padding: 5, background: BG, border: `1px solid rgba(201,168,76,0.25)`, flexShrink: 0 }}>
                  <QRCodeSVG value={verifyUrl} size={68} level="M" fgColor={TXT} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 7, color: GOLD2, fontWeight: 600, lineHeight: 1.6, wordBreak: "break-all" }}>reportcheck.jewelsreport.com</div>
                  <div style={{ fontSize: 7, color: TXT3, marginTop: 3, wordBreak: "break-all" }}>{cert.reportNo}</div>
                </div>
              </div>

              {/* Security features */}
              <div style={{ border: `1px solid rgba(201,168,76,0.22)`, padding: "5px 9px", background: BG }}>
                <div style={{ fontSize: 6, fontWeight: 700, color: TXT2, lineHeight: 1.85, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Security Features: Holographic Foil · Guilloché Pattern · Embossed Seal · UV Reactive Ink
                </div>
                <div style={{ fontSize: 6, color: TXT3, marginTop: 2, lineHeight: 1.55 }}>
                  This document is protected. Unauthorised reproduction or alteration is prohibited.
                  Verify authenticity at jewelsreport.com/verify
                </div>
              </div>
            </div>
          </div>

          {/* P3 footer */}
          <div style={{ borderTop: `1px solid ${RULE}`, padding: "4px 14px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", background: BG }}>
            <span style={{ fontSize: 6.5, color: TXT3, letterSpacing: "0.1em" }}>jewelsreport.com/verify</span>
            <span style={{ fontSize: 6.5, color: TXT3, letterSpacing: "0.06em" }}>{cert.reportNo}</span>
          </div>
        </div>

      </div>
    );
  }
);
