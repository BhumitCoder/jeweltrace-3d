import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { Certificate } from "@/lib/store";
import { REPORT_TYPE_LABELS } from "@/lib/store";
import logo from "@/assets/logo.png";

export const A4_W = 1122;
export const A4_H = 794;

const P1 = 314;
const P2 = 446;
const P3 = 362;
const HDR_H = 164;

/* ── Simple luxury: white · navy · gold accent ── */
const WHITE  = "#FFFFFF";
const NAVY   = "#1A2744";
const GOLD   = "#C9963A";
const GOLD_L = "#E8C870";
const GOLD_D = "#9B7018";
const GRD    = `linear-gradient(90deg,${GOLD_L},${GOLD},${GOLD_D})`;
const RULE   = "rgba(201,150,58,0.18)";
const MUTED  = "#64748B";
const LIGHT  = "#F8FAFC";

function FR({ label, value, sz = 10.5 }: { label: string; value: string; sz?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", marginBottom: 5 }}>
      <span style={{ fontSize: sz, color: MUTED, lineHeight: 1.35, flexShrink: 0, whiteSpace: "nowrap" }}>{label}</span>
      <span style={{ flex: 1, minWidth: 8, margin: `0 5px ${sz * 0.17}px`, borderBottom: `1px dotted rgba(201,150,58,0.22)` }} />
      <span style={{ fontSize: sz, fontWeight: 700, color: NAVY, lineHeight: 1.35, whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: "0.03em" }}>{value}</span>
    </div>
  );
}

function Hdr({ label }: { label: string }) {
  return (
    <div style={{ padding: "4px 15px", flexShrink: 0, borderBottom: `1px solid ${RULE}`, background: LIGHT }}>
      <span style={{ fontSize: 6.5, fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD }}>{label}</span>
    </div>
  );
}

function Sub({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "8px 0 4px" }}>
      <div style={{ width: 10, height: 1, background: GOLD, flexShrink: 0 }} />
      <span style={{ fontSize: 6.5, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD_D }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${GOLD_D}20,transparent)` }} />
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

    let groupA: [string, string][] = [];
    let groupB: [string, string][] = [];
    let groupBLabel = "Grading Results";
    let groupC: [string, string][] = [];
    let groupCLabel = "Additional Information";

    if (isG) {
      groupA = ([["GRL Report Number", cert.reportNo],["Variety", cert.gemstoneStone],["Shape & Cutting Style", cert.gemstoneShape],["Measurements", cert.gemstoneMeasurements],["Pieces (PCS)", cert.gemstonePcs],["Origin", cert.gemstoneOrigin]] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupB = ([["Carat Weight", cert.gemstoneCaratWeight],["Color & Transparency", cert.gemstoneColorTransparency],["Characteristics", cert.gemstoneCharacteristics]] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupBLabel = "Gemological Results";
    } else if (isJ) {
      groupA = ([["GRL Report Number", cert.reportNo],["Item Description", cert.itemName],["Shape", cert.shape],["Metal Tested As", cert.metal],["Gross Weight", cert.grossWeight ? `${cert.grossWeight} GRM` : undefined],["Net Weight", cert.netWeight ? `${cert.netWeight} GRM` : undefined],["Origin", cert.origin]] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupB = ([["Diamond Shape", cert.diamondShape],["Diamond Weight", cert.diamondWeight ? `${cert.diamondWeight} CT` : undefined],["Diamond Total PCS", cert.diamondTotalPcs],["Diamond Color", cert.diamondColor],["Diamond Clarity", cert.diamondClarity]] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupBLabel = "Diamond Details";
      groupC = ([["Gemstone", cert.gemstoneStone],["Gemstone Origin", cert.gemstoneOrigin],["Gemstone Weight", cert.gemstoneCaratWeight],["Gemstone PCS", cert.gemstonePcs]] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupCLabel = "Gemstone Details";
    } else {
      groupA = ([["GRL Report Number", cert.reportNo],["Shape & Cutting Style", cert.shape],["Measurements", cert.measurements]] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupB = ([["Carat Weight", cert.caratWeight ? `${cert.caratWeight} carat` : undefined],["Color Grade", cert.color],["Clarity Grade", cert.clarity],["Cut Grade", cert.cut]] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupC = ([["Polish Grade", cert.polish],["Symmetry Grade", cert.symmetry],["Fluorescence", cert.fluorescence],["Origin", cert.origin]] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupCLabel = "Additional Grading Information";
    }

    const hasImg  = !!(cert.imageDataUrl || cert.imageDataUrl2);
    const has2Img = !!(cert.imageDataUrl && cert.imageDataUrl2);

    return (
      <div ref={ref} style={{
        width: A4_W, height: A4_H,
        background: WHITE,
        fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif",
        boxSizing: "border-box", overflow: "hidden",
        display: "flex", flexDirection: "column",
        position: "relative",
        border: `1px solid ${RULE}`,
      }}>

        {/* ── TOP GOLD STRIPE ── */}
        <div style={{ height: 5, background: GRD, flexShrink: 0, zIndex: 2 }} />

        {/* ── MAIN CONTENT ROW ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "row", minHeight: 0 }}>

          {/* PANEL 1 — Brand + Grading */}
          <div style={{
            width: P1, flexShrink: 0, display: "flex", flexDirection: "column",
            borderRight: `1px solid ${RULE}`, background: WHITE,
          }}>
            {/* Brand top */}
            <div style={{
              height: HDR_H - 5, boxSizing: "border-box",
              padding: "14px 16px 10px", flexShrink: 0,
              display: "flex", flexDirection: "column", alignItems: "center",
              borderBottom: `1px solid ${RULE}`,
            }}>
              <div style={{
                width: 62, height: 62, borderRadius: "50%",
                border: `1.5px solid ${GOLD}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: WHITE, marginBottom: 8, flexShrink: 0,
                boxShadow: `0 2px 12px rgba(201,150,58,0.15)`,
              }}>
                <img src={logo} alt="JewelsReport" style={{ height: 40, width: 40, objectFit: "contain" }} />
              </div>
              <div style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 16, fontWeight: 400, letterSpacing: "0.16em", color: NAVY, lineHeight: 1, textTransform: "uppercase" }}>
                JewelsReport
              </div>
              <div style={{ width: 40, height: 1, background: GRD, margin: "7px 0 5px" }} />
              <div style={{ fontSize: 6, letterSpacing: "0.35em", textTransform: "uppercase", color: MUTED }}>
                Gemological Certification Lab
              </div>
            </div>

            <Hdr label={panelHdr} />

            <div style={{ flex: 1, padding: "11px 14px 0", display: "flex", flexDirection: "column", overflow: "hidden" }}>
              {groupA.map(([l, v]) => <FR key={l} label={l} value={v} />)}
              {groupB.length > 0 && (<><Sub label={groupBLabel} />{groupB.map(([l, v]) => <FR key={l} label={l} value={v} sz={11} />)}</>)}
              {groupC.length > 0 && (<><Sub label={groupCLabel} />{groupC.map(([l, v]) => <FR key={l} label={l} value={v} />)}</>)}

              {isJ && cert.metalDescription && (
                <div style={{ marginTop: 7, padding: "5px 9px", background: LIGHT, borderLeft: `2px solid ${GOLD}`, flexShrink: 0 }}>
                  <div style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", color: GOLD_D, letterSpacing: "0.16em", marginBottom: 2 }}>Marking(s)</div>
                  <div style={{ fontSize: 9, color: NAVY, lineHeight: 1.6 }}>{cert.metalDescription}</div>
                </div>
              )}
              {cert.remarks && (
                <div style={{ marginTop: 7, padding: "5px 9px", background: LIGHT, borderLeft: `2px solid ${GOLD}`, flexShrink: 0 }}>
                  <div style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", color: GOLD_D, letterSpacing: "0.16em", marginBottom: 2 }}>Comments</div>
                  <div style={{ fontSize: 9.5, color: NAVY, lineHeight: 1.65 }}>{cert.remarks}</div>
                </div>
              )}

              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 7, fontFamily: "Georgia,serif", fontStyle: "italic", letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, opacity: 0.7 }}>
                  ✦ Certified Authentic ✦
                </div>
              </div>

              {/* Signature */}
              <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: 7, flexShrink: 0 }}>
                <div style={{ minHeight: 36, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 3 }}>
                  {cert.signatureDataUrl
                    ? <img src={cert.signatureDataUrl} alt="Signature" style={{ maxHeight: 36, maxWidth: "85%", objectFit: "contain" }} />
                    : <div style={{ width: "60%", height: 1, background: RULE }} />
                  }
                </div>
                <div style={{ textAlign: "center", paddingBottom: 3 }}>
                  <div style={{ fontSize: 7.5, color: NAVY, fontWeight: 600, letterSpacing: "0.1em" }}>Authorised Signatory</div>
                  <div style={{ fontSize: 6, color: MUTED, letterSpacing: "0.05em", marginTop: 1 }}>JewelsReport Gemological Certification Lab</div>
                </div>
              </div>
            </div>

            {/* P1 footer */}
            <div style={{ borderTop: `1px solid ${RULE}`, padding: "4px 14px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", background: LIGHT }}>
              <span style={{ fontSize: 6, color: MUTED }}>jewelsreport.com</span>
              <span style={{ fontSize: 6, color: MUTED, textTransform: "uppercase" }}>{reportTypeLabel}</span>
            </div>
          </div>

          {/* PANEL 2 — Report No + Images */}
          <div style={{
            width: P2, flexShrink: 0, display: "flex", flexDirection: "column",
            borderRight: `1px solid ${RULE}`, background: WHITE,
          }}>
            {/* Report number header */}
            <div style={{
              height: HDR_H - 5, boxSizing: "border-box",
              padding: "0 22px", flexShrink: 0, textAlign: "center",
              borderBottom: `1px solid ${RULE}`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ fontSize: 6.5, letterSpacing: "0.36em", textTransform: "uppercase", color: MUTED, marginBottom: 6 }}>GRL Report Number</div>
              <div style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 28, fontWeight: 400, letterSpacing: "0.06em", color: NAVY }}>
                {cert.reportNo}
              </div>
              <div style={{ width: 60, height: 1.5, background: GRD, margin: "8px 0 6px" }} />
              <div style={{ fontSize: 7, color: MUTED, letterSpacing: "0.07em" }}>Verify at jewelsreport.com/verify</div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 11, color: GOLD, marginTop: 5, letterSpacing: "0.04em" }}>{fmtDate(cert.issueDate)}</div>
            </div>

            <Hdr label="Item(s) Overall Description" />

            <div style={{ flex: 1, padding: "10px 16px 8px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
              {cert.description && (
                <p style={{ fontFamily: "Georgia,serif", fontSize: 10, color: MUTED, lineHeight: 1.75, marginBottom: 9, flexShrink: 0, fontStyle: "italic" }}>
                  {cert.description}
                </p>
              )}
              <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "center", gap: has2Img ? 8 : 0 }}>
                {cert.imageDataUrl && (
                  <div style={{ width: "100%", height: has2Img ? 210 : 390, flexShrink: 0, borderRadius: 10, overflow: "hidden" }}>
                    <img src={cert.imageDataUrl} alt="Item" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                )}
                {cert.imageDataUrl2 && (
                  <div style={{ width: "100%", height: 210, flexShrink: 0, borderRadius: 10, overflow: "hidden" }}>
                    <img src={cert.imageDataUrl2} alt="Item" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                )}
                {!hasImg && (
                  <div style={{ width: "100%", height: 390, flexShrink: 0, borderRadius: 10, background: LIGHT, border: `1px solid ${RULE}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <img src={logo} alt="" style={{ height: 48, opacity: 0.1, marginBottom: 10 }} />
                    <div style={{ fontSize: 8, color: MUTED, letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.6 }}>No Image Provided</div>
                  </div>
                )}
              </div>
              {hasImg && <p style={{ fontSize: 7, color: MUTED, textAlign: "center", marginTop: 5, fontStyle: "italic", flexShrink: 0 }}>Image is approximate</p>}
            </div>

            <div style={{ borderTop: `1px solid ${RULE}`, padding: "4px 16px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: LIGHT }}>
              <span style={{ fontSize: 6, color: MUTED, letterSpacing: "0.12em", textTransform: "uppercase" }}>Gemological Certification Lab · Surat, Gujarat, India</span>
            </div>
          </div>

          {/* PANEL 3 — Authentication */}
          <div style={{
            width: P3, flexShrink: 0, display: "flex", flexDirection: "column",
            background: WHITE,
          }}>
            {/* P3 header */}
            <div style={{
              height: HDR_H - 5, boxSizing: "border-box",
              padding: "0 16px", flexShrink: 0, textAlign: "center",
              borderBottom: `1px solid ${RULE}`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ fontSize: 6.5, letterSpacing: "0.36em", textTransform: "uppercase", color: MUTED }}>Official Certification Record</div>
              <div style={{ width: 40, height: 1.5, background: GRD, margin: "8px 0" }} />
              <div style={{ fontSize: 7.5, color: NAVY, letterSpacing: "0.07em" }}>Gemological Certification Lab</div>
              <div style={{ fontSize: 6.5, color: MUTED, marginTop: 4, fontStyle: "italic", fontFamily: "Georgia,serif" }}>jewelsreport.com</div>
            </div>

            <Hdr label="Certification & Authentication" />

            <div style={{ flex: 1, padding: "13px 14px 10px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <div style={{ padding: "9px 11px", background: LIGHT, borderLeft: `2.5px solid ${GOLD}`, marginBottom: 10, flexShrink: 0 }}>
                <div style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", color: GOLD_D, letterSpacing: "0.18em", marginBottom: 4 }}>Certification Statement</div>
                <div style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 9, color: NAVY, lineHeight: 1.75 }}>
                  This is to certify that the article described herein has been examined by JewelsReport Gemological Certification Lab and the results documented are based on standard gemological testing methods.
                </div>
              </div>

              <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
                <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 7.5, color: MUTED, lineHeight: 1.9, marginTop: 4 }}>
                  The results documented in this report refer only to the article described, and were obtained using the techniques and equipment used by JewelsReport at the time of examination. This report is not a guarantee or valuation. For additional information and important limitations please see jewelsreport.com/terms or contact the JewelsReport Gemological Certification Lab directly. ©{new Date().getFullYear()} JewelsReport Gemological Certification Lab. All rights reserved.
                </p>
              </div>

              <div style={{ flexShrink: 0 }}>
                <div style={{ height: 1, background: RULE, margin: "8px 0" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 72, height: 72, flexShrink: 0, borderRadius: "50%",
                    border: `1.5px solid ${GOLD}`,
                    boxShadow: `0 2px 12px rgba(201,150,58,0.2)`,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    background: WHITE,
                  }}>
                    <img src={logo} alt="" style={{ height: 36, width: 36, objectFit: "contain" }} />
                    <div style={{ fontSize: 5.5, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginTop: 3 }}>CERTIFIED</div>
                  </div>
                  <div style={{ padding: 4, background: WHITE, border: `1px solid ${RULE}`, flexShrink: 0 }}>
                    <QRCodeSVG value={verifyUrl} size={64} level="M" fgColor={NAVY} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 7, color: GOLD, fontWeight: 600, lineHeight: 1.6, wordBreak: "break-all" }}>reportcheck.jewelsreport.com</div>
                    <div style={{ fontSize: 7, color: MUTED, marginTop: 3, wordBreak: "break-all" }}>{cert.reportNo}</div>
                  </div>
                </div>
                <div style={{ border: `1px solid ${RULE}`, borderLeft: `2px solid ${NAVY}`, padding: "5px 9px", background: LIGHT }}>
                  <div style={{ fontSize: 6, fontWeight: 700, color: NAVY, lineHeight: 1.85, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Security Features: Holographic Foil · Guilloché Pattern · Embossed Seal · UV Reactive Ink
                  </div>
                  <div style={{ fontSize: 6, color: MUTED, marginTop: 2, lineHeight: 1.55 }}>
                    This document is protected. Verify authenticity at jewelsreport.com/verify
                  </div>
                </div>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${RULE}`, padding: "4px 14px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", background: LIGHT }}>
              <span style={{ fontSize: 6, color: MUTED }}>jewelsreport.com/verify</span>
              <span style={{ fontSize: 6, color: MUTED }}>{cert.reportNo}</span>
            </div>
          </div>
        </div>

        {/* ── BOTTOM GOLD STRIPE ── */}
        <div style={{ height: 4, background: GRD, flexShrink: 0 }} />

      </div>
    );
  }
);
