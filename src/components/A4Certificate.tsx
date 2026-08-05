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
const P3 = 362;   // Right  — Authentication only
const HDR_H = 164; // Fixed height shared by all three panel top headers

/* ─── Luxury palette: deep navy · crisp white · true gold ─────── */
const BG      = "#FFFFFF";          // pure white body
const PANEL   = "#F5F4F1";          // very light warm white for panel bg
const NAVY    = "#1A2744";          // deep navy — headers, accents
const NAVY2   = "#0F1A30";          // darker navy for key moments
const GOLD    = "#B8960C";          // true 18k gold
const GOLD2   = "#9A7C08";          // deeper gold for text
const GOLD3   = "#D4AF37";          // brighter gold for ornaments
const GOLD4   = "rgba(184,150,12,0.10)";
const TXT     = "#111827";          // near-black for primary text
const TXT2    = "#374151";          // dark charcoal for secondary text
const TXT3    = "#6B7280";          // medium gray for tertiary/captions
const RULE    = "rgba(184,150,12,0.22)";

/* ─── Field row ─────────────────────────────────────────────────── */
function FR({ label, value, sz = 10.5 }: { label: string; value: string; sz?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", marginBottom: 5 }}>
      <span style={{ fontSize: sz, color: TXT2, lineHeight: 1.35, flexShrink: 0, whiteSpace: "nowrap" }}>{label}</span>
      <span style={{ flex: 1, minWidth: 8, margin: `0 5px ${sz * 0.17}px`, borderBottom: `1px dotted rgba(184,150,12,0.32)` }} />
      <span style={{ fontSize: sz, fontWeight: 700, color: TXT, lineHeight: 1.35, whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: "0.03em" }}>{value}</span>
    </div>
  );
}

/* ─── Section header — navy bar with white text ──────────────────── */
function Hdr({ label }: { label: string }) {
  return (
    <div style={{
      background: NAVY,
      padding: "5px 15px",
      flexShrink: 0,
      borderTop: `1px solid ${NAVY2}`,
      borderBottom: `2px solid ${GOLD}`,
    }}>
      <span style={{ fontSize: 6.5, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: GOLD3 }}>{label}</span>
    </div>
  );
}

/* ─── Sub-section label ──────────────────────────────────────────── */
function Sub({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "8px 0 4px" }}>
      <div style={{ width: 12, height: 1, background: GOLD3, flexShrink: 0 }} />
      <span style={{ fontSize: 6.5, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD2 }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${GOLD3},transparent)` }} />
    </div>
  );
}

/* ─── Ornamental rule ────────────────────────────────────────────── */
function HR({ my = 7, op = 0.55 }: { my?: number; op?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, margin: `${my}px 0`, opacity: op }}>
      <div style={{ flex: 1, height: 0.5, background: `linear-gradient(90deg,transparent,${GOLD3})` }} />
      <div style={{ width: 3.5, height: 3.5, background: GOLD3, transform: "rotate(45deg)", flexShrink: 0 }} />
      <div style={{ flex: 1, height: 0.5, background: `linear-gradient(90deg,${GOLD3},transparent)` }} />
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

    /* ─── Field groups ─────────────────────────────────────────── */
    let groupA: [string, string][] = [];
    let groupB: [string, string][] = [];
    let groupBLabel = "Grading Results";
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
        border: `1px solid ${NAVY}`,
      }}>

        {/* ── Outer gold pinstripe frame inside border ── */}
        <div style={{
          position: "absolute", inset: 4, pointerEvents: "none", zIndex: 2,
          border: `0.5px solid rgba(184,150,12,0.4)`,
        }} />

        {/* Watermark */}
        <img src={logo} alt="" aria-hidden style={{
          position: "absolute", width: 440, height: 440,
          objectFit: "contain", opacity: 0.025,
          left: "50%", top: "50%", transform: "translate(-50%,-50%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* ══════════════════════════════════════════════════════
            PANEL 1 — Brand Identity + ALL Grading Fields
        ══════════════════════════════════════════════════════ */}
        <div style={{
          width: P1, height: A4_H, flexShrink: 0,
          display: "flex", flexDirection: "column",
          zIndex: 1, background: PANEL,
          borderRight: `1px solid rgba(26,39,68,0.18)`,
          position: "relative",
        }}>

          {/* Brand header — navy top bar with gold rule */}
          <div style={{
            height: HDR_H, boxSizing: "border-box",
            padding: "0 16px", flexShrink: 0,
            background: NAVY,
            borderBottom: `2px solid ${GOLD}`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            {/* Top gold accent line */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2.5, background: `linear-gradient(90deg,transparent,${GOLD},transparent)` }} />
            {/* Logo circle */}
            <div style={{
              width: 68, height: 68, borderRadius: "50%",
              border: `1.5px solid ${GOLD}`,
              boxShadow: `0 0 0 4px ${GOLD4}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: BG,
              marginBottom: 9, flexShrink: 0, marginTop: 2,
            }}>
              <img src={logo} alt="JewelsReport" style={{ height: 44, width: 44, objectFit: "contain" }} />
            </div>
            <div style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 18, fontWeight: 400, letterSpacing: "0.18em", color: BG, lineHeight: 1, textTransform: "uppercase" }}>
              JewelsReport
            </div>
            <HR my={5} op={0.6} />
            <div style={{ fontSize: 6, letterSpacing: "0.4em", textTransform: "uppercase", color: GOLD3 }}>
              Gemological Certification Lab
            </div>
          </div>

          <Hdr label={panelHdr} />

          {/* ── ALL grading fields ── */}
          <div style={{ flex: 1, padding: "11px 14px 0", display: "flex", flexDirection: "column", overflow: "hidden" }}>

            {groupA.map(([l, v]) => <FR key={l} label={l} value={v} />)}

            {groupB.length > 0 && (<>
              <Sub label={groupBLabel} />
              {groupB.map(([l, v]) => <FR key={l} label={l} value={v} sz={11} />)}
            </>)}

            {groupC.length > 0 && (<>
              <Sub label={groupCLabel} />
              {groupC.map(([l, v]) => <FR key={l} label={l} value={v} />)}
            </>)}

            {isJ && cert.metalDescription && (
              <div style={{ marginTop: 7, padding: "4px 8px", background: BG, borderLeft: `2px solid ${GOLD}`, flexShrink: 0 }}>
                <div style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", color: NAVY, letterSpacing: "0.16em", marginBottom: 2 }}>Marking(s)</div>
                <div style={{ fontSize: 9, color: TXT, lineHeight: 1.6 }}>{cert.metalDescription}</div>
                <div style={{ fontSize: 6.5, color: TXT3, marginTop: 1, fontStyle: "italic" }}>Marking(s) may not have been assessed by JewelsReport.</div>
              </div>
            )}

            {cert.remarks && (
              <div style={{ marginTop: 7, padding: "4px 8px", background: BG, borderLeft: `2px solid ${GOLD}`, flexShrink: 0 }}>
                <div style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", color: NAVY, letterSpacing: "0.16em", marginBottom: 2 }}>Comments</div>
                <div style={{ fontSize: 9.5, color: TXT, lineHeight: 1.65 }}>{cert.remarks}</div>
              </div>
            )}

            {/* Ornamental filler */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <HR op={0.3} />
              <div style={{ padding: "8px 0", textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, marginBottom: 6 }}>
                  <div style={{ width: 2, height: 2, background: GOLD3, transform: "rotate(45deg)" }} />
                  <div style={{ width: 4, height: 4, background: GOLD4, border: `0.5px solid ${GOLD3}`, transform: "rotate(45deg)" }} />
                  <div style={{ width: 2, height: 2, background: GOLD3, transform: "rotate(45deg)" }} />
                </div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 7, letterSpacing: "0.28em", textTransform: "uppercase", color: GOLD2, fontStyle: "italic" }}>
                  Certified Authentic
                </div>
              </div>
              <HR op={0.3} />
            </div>

            {/* Signature */}
            <div style={{ borderTop: `1px solid rgba(184,150,12,0.2)`, paddingTop: 7, flexShrink: 0 }}>
              <div style={{ minHeight: 38, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 3 }}>
                {cert.signatureDataUrl
                  ? <img src={cert.signatureDataUrl} alt="Signature" style={{ maxHeight: 38, maxWidth: "85%", objectFit: "contain" }} />
                  : <div style={{ width: "62%", height: 1, background: RULE }} />
                }
              </div>
              <div style={{ textAlign: "center", paddingBottom: 3 }}>
                <div style={{ height: 1, background: `linear-gradient(90deg,transparent,${RULE},transparent)`, marginBottom: 4 }} />
                <div style={{ fontSize: 7.5, color: NAVY, fontWeight: 700, letterSpacing: "0.1em" }}>Authorised Signatory</div>
                <div style={{ fontSize: 6, color: TXT3, letterSpacing: "0.06em", marginTop: 1 }}>JewelsReport Gemological Certification Lab</div>
              </div>
            </div>
          </div>

          {/* P1 footer */}
          <div style={{ borderTop: `1px solid rgba(26,39,68,0.12)`, padding: "4px 14px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", background: NAVY }}>
            <span style={{ fontSize: 6, color: GOLD3, letterSpacing: "0.1em" }}>jewelsreport.com</span>
            <span style={{ fontSize: 6, color: GOLD3, letterSpacing: "0.07em", textTransform: "uppercase" }}>{reportTypeLabel}</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            PANEL 2 — Report Number Header + Item Photos
        ══════════════════════════════════════════════════════ */}
        <div style={{
          width: P2, height: A4_H, flexShrink: 0,
          display: "flex", flexDirection: "column",
          zIndex: 1, background: BG,
          borderRight: `1px solid rgba(26,39,68,0.15)`,
          position: "relative",
        }}>

          {/* Report number header — navy */}
          <div style={{
            height: HDR_H, boxSizing: "border-box",
            padding: "0 22px",
            flexShrink: 0, textAlign: "center",
            background: NAVY,
            borderBottom: `2px solid ${GOLD}`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
            position: "relative",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2.5, background: `linear-gradient(90deg,transparent,${GOLD},transparent)` }} />
            <div style={{ fontSize: 6.5, letterSpacing: "0.36em", textTransform: "uppercase", color: GOLD3, marginBottom: 6 }}>GRL Report Number</div>
            <div style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 26, fontWeight: 400, letterSpacing: "0.06em", color: BG, lineHeight: 1 }}>
              {cert.reportNo}
            </div>
            <HR my={7} op={0.5} />
            <div style={{ fontSize: 7, color: "rgba(255,255,255,0.65)", letterSpacing: "0.07em" }}>Verify this report at jewelsreport.com/verify</div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 10.5, fontWeight: 400, color: GOLD3, marginTop: 5, letterSpacing: "0.04em" }}>{fmtDate(cert.issueDate)}</div>
          </div>

          <Hdr label="Item(s) Overall Description" />

          {/* Photos */}
          <div style={{ flex: 1, padding: "10px 16px 8px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {cert.description && (
              <p style={{ fontFamily: "Georgia,serif", fontSize: 10, color: TXT2, lineHeight: 1.75, marginBottom: 9, flexShrink: 0, fontStyle: "italic" }}>
                {cert.description}
              </p>
            )}
            {/* Image area — full-width, stacked, professional */}
            <div style={{
              flex: 1, minHeight: 0,
              display: "flex", flexDirection: "column",
              alignItems: "stretch",
              justifyContent: "center",
              gap: has2Img ? 8 : 0,
            }}>
              {cert.imageDataUrl && (
                <div style={{
                  width: "100%",
                  height: has2Img ? 210 : 390,
                  flexShrink: 0,
                  borderRadius: 10,
                  border: `0.5px solid rgba(184,150,12,0.2)`,
                  background: "transparent",
                  overflow: "hidden",
                }}>
                  <img src={cert.imageDataUrl} alt="Item" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", borderRadius: 10 }} />
                </div>
              )}
              {cert.imageDataUrl2 && (
                <div style={{
                  width: "100%",
                  height: 210,
                  flexShrink: 0,
                  borderRadius: 10,
                  border: `0.5px solid rgba(184,150,12,0.2)`,
                  background: "transparent",
                  overflow: "hidden",
                }}>
                  <img src={cert.imageDataUrl2} alt="Item" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", borderRadius: 10 }} />
                </div>
              )}
              {!hasImg && (
                <div style={{
                  width: "100%", height: 390, flexShrink: 0,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  background: PANEL, border: `0.5px solid rgba(184,150,12,0.15)`,
                  borderRadius: 6,
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(45deg,rgba(184,150,12,0.04) 0,rgba(184,150,12,0.04) 1px,transparent 1px,transparent 14px),repeating-linear-gradient(-45deg,rgba(184,150,12,0.04) 0,rgba(184,150,12,0.04) 1px,transparent 1px,transparent 14px)` }} />
                  <img src={logo} alt="" style={{ height: 56, opacity: 0.1, marginBottom: 10, position: "relative" }} />
                  <div style={{ fontSize: 8, color: TXT3, letterSpacing: "0.3em", textTransform: "uppercase", position: "relative", opacity: 0.6 }}>No Image Provided</div>
                </div>
              )}
            </div>
            {hasImg && (
              <p style={{ fontSize: 7, color: TXT3, textAlign: "center", marginTop: 5, fontStyle: "italic", flexShrink: 0 }}>Image is approximate</p>
            )}
          </div>

          {/* P2 footer */}
          <div style={{ borderTop: `1px solid rgba(26,39,68,0.12)`, padding: "4px 16px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: NAVY }}>
            <span style={{ fontSize: 6, color: GOLD3, letterSpacing: "0.13em", textTransform: "uppercase" }}>Gemological Certification Lab · Surat, Gujarat, India</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            PANEL 3 — Authentication Only
        ══════════════════════════════════════════════════════ */}
        <div style={{
          width: P3, height: A4_H, flexShrink: 0,
          display: "flex", flexDirection: "column",
          zIndex: 1, background: PANEL,
          position: "relative",
        }}>

          {/* P3 header — navy */}
          <div style={{
            height: HDR_H, boxSizing: "border-box",
            padding: "0 16px",
            flexShrink: 0, textAlign: "center",
            background: NAVY,
            borderBottom: `2px solid ${GOLD}`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2.5, background: `linear-gradient(90deg,transparent,${GOLD},transparent)` }} />
            <div style={{ fontSize: 6.5, letterSpacing: "0.36em", textTransform: "uppercase", color: GOLD3 }}>Official Certification Record</div>
            <HR my={8} op={0.4} />
            <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.75)", letterSpacing: "0.07em" }}>Gemological Certification Lab</div>
            <div style={{ fontSize: 6.5, color: GOLD3, marginTop: 4, letterSpacing: "0.05em", fontStyle: "italic", fontFamily: "Georgia,serif" }}>
              jewelsreport.com
            </div>
          </div>

          <Hdr label="Certification & Authentication" />

          <div style={{ flex: 1, padding: "13px 14px 10px", display: "flex", flexDirection: "column", overflow: "hidden" }}>

            {/* Official statement box */}
            <div style={{ padding: "9px 11px", background: BG, border: `1px solid rgba(184,150,12,0.25)`, borderLeft: `2.5px solid ${GOLD}`, marginBottom: 10, flexShrink: 0 }}>
              <div style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", color: NAVY, letterSpacing: "0.18em", marginBottom: 4 }}>Certification Statement</div>
              <div style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 9, color: TXT2, lineHeight: 1.75 }}>
                This is to certify that the article described herein has been examined
                by JewelsReport Gemological Certification Lab and the results documented
                are based on standard gemological testing methods.
              </div>
            </div>

            <HR />

            {/* Disclaimer */}
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
                  width: 74, height: 74, flexShrink: 0, borderRadius: "50%",
                  border: `1.5px solid ${GOLD}`,
                  boxShadow: `0 0 0 3px ${GOLD4}`,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  background: NAVY,
                }}>
                  <img src={logo} alt="" style={{ height: 36, width: 36, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                  <div style={{ fontSize: 5.5, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD3, marginTop: 4 }}>CERTIFIED</div>
                </div>

                {/* QR code */}
                <div style={{ padding: 4, background: BG, border: `0.75px solid rgba(184,150,12,0.3)`, flexShrink: 0 }}>
                  <QRCodeSVG value={verifyUrl} size={66} level="M" fgColor={NAVY} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 7, color: NAVY, fontWeight: 600, lineHeight: 1.6, wordBreak: "break-all" }}>reportcheck.jewelsreport.com</div>
                  <div style={{ fontSize: 7, color: TXT3, marginTop: 3, wordBreak: "break-all" }}>{cert.reportNo}</div>
                </div>
              </div>

              {/* Security features */}
              <div style={{ border: `1px solid rgba(184,150,12,0.22)`, borderLeft: `2px solid ${NAVY}`, padding: "5px 9px", background: BG }}>
                <div style={{ fontSize: 6, fontWeight: 700, color: NAVY, lineHeight: 1.85, textTransform: "uppercase", letterSpacing: "0.06em" }}>
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
          <div style={{ borderTop: `1px solid rgba(26,39,68,0.12)`, padding: "4px 14px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", background: NAVY }}>
            <span style={{ fontSize: 6, color: GOLD3, letterSpacing: "0.1em" }}>jewelsreport.com/verify</span>
            <span style={{ fontSize: 6, color: GOLD3, letterSpacing: "0.06em" }}>{cert.reportNo}</span>
          </div>
        </div>

      </div>
    );
  }
);
