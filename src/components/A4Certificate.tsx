import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { Certificate } from "@/lib/store";
import { REPORT_TYPE_LABELS } from "@/lib/store";
import logo from "@/assets/logo.png";

/* ── Landscape A4 trifold ──────────────────────────────────────── */
export const A4_W = 1122;
export const A4_H = 794;

const PW  = 374;
const G   = "#B8922A";
const G2  = "#9A7010";
const G3  = "#7D5C0A";

/* colours */
const IVORY   = "#FAF7EF";
const P1_BG   = "linear-gradient(175deg,#F2E8CC 0%,#FAF7EF 55%,#F2E8CC 100%)";
const P3_BG   = "linear-gradient(175deg,#FAF7EF 0%,#F2E8CC 45%,#FAF7EF 100%)";
const HDR_BG  = "linear-gradient(180deg,#EDE0B4 0%,#F5EDD0 100%)";
const BAR_BG  = `linear-gradient(90deg,${G} 0%,${G2} 60%,${G3} 100%)`;

/* ── GIA dotted leader row — warm gold dots ────────────────────── */
function FR({ label, value, size = 11 }: { label: string; value: string; size?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", marginBottom: 5 }}>
      <span style={{ fontSize: size, color: "#4A3A18", whiteSpace: "nowrap", lineHeight: 1.3, flexShrink: 0 }}>
        {label}
      </span>
      <span style={{
        flex: 1, margin: `0 4px ${size * 0.22}px`, minWidth: 6,
        borderBottom: "1.5px dotted rgba(184,146,42,0.55)",
      }} />
      <span style={{ fontSize: size, fontWeight: 800, color: "#1A0E00", lineHeight: 1.3, textTransform: "uppercase", letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
        {value}
      </span>
    </div>
  );
}

/* ── Amber section header bar with gradient ────────────────────── */
function SectionBar({ label }: { label: string }) {
  return (
    <div style={{ background: BAR_BG, padding: "4px 14px", flexShrink: 0 }}>
      <span style={{ fontSize: 7.5, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: "#FFF8E4" }}>
        {label}
      </span>
    </div>
  );
}

/* ── Sub-section header with gold left accent ──────────────────── */
function SubHdr({ label }: { label: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center",
      margin: "9px 0 5px",
      background: "rgba(184,146,42,0.10)",
      borderLeft: `3px solid ${G}`,
      borderRadius: "0 2px 2px 0",
      padding: "2.5px 8px",
    }}>
      <span style={{ fontSize: 7, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: G2 }}>
        {label}
      </span>
    </div>
  );
}

/* ── Thin ornamental gold divider ──────────────────────────────── */
function GoldLine() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "7px 0" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${G},transparent)` }} />
      <div style={{ width: 5, height: 5, background: G, transform: "rotate(45deg)", flexShrink: 0 }} />
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
      try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }); }
      catch { return d; }
    };

    const panelHdr = isG
      ? "Gemstone Grading Report"
      : isJ ? "Jewellery Grading Report"
      : `${cert.type.replace("Natural ", "").replace("Lab Grown ", "")} Grading Report`;

    /* Panel 1 field groups */
    let identityFields: [string, string][] = [];
    let gradingFields:  [string, string][] = [];
    let addlFields:     [string, string][] = [];

    if (isG) {
      identityFields = ([["GRL Report Number",cert.reportNo],["Variety",cert.gemstoneStone],["Origin",cert.gemstoneOrigin]] as [string,string|undefined][]).filter(([,v])=>v) as [string,string][];
      gradingFields  = ([["Shape and Cutting Style",cert.gemstoneShape],["Carat Weight",cert.gemstoneCaratWeight],["PCS",cert.gemstonePcs],["Measurements",cert.gemstoneMeasurements]] as [string,string|undefined][]).filter(([,v])=>v) as [string,string][];
      addlFields     = ([["Color and Transparency",cert.gemstoneColorTransparency],["Characteristics",cert.gemstoneCharacteristics]] as [string,string|undefined][]).filter(([,v])=>v) as [string,string][];
    } else if (isJ) {
      identityFields = ([["GRL Report Number",cert.reportNo],["Item",cert.itemName],["Shape",cert.shape]] as [string,string|undefined][]).filter(([,v])=>v) as [string,string][];
      gradingFields  = ([["Metal Tested As",cert.metal],["Gross Weight",cert.grossWeight?`${cert.grossWeight} GRM`:undefined],["Net Weight",cert.netWeight?`${cert.netWeight} GRM`:undefined],["Origin",cert.origin]] as [string,string|undefined][]).filter(([,v])=>v) as [string,string][];
      addlFields     = ([["Diamond Shape",cert.diamondShape],["Diamond Weight",cert.diamondWeight?`${cert.diamondWeight} CT`:undefined],["Diamond Total PCS",cert.diamondTotalPcs],["Diamond Color",cert.diamondColor],["Diamond Clarity",cert.diamondClarity]] as [string,string|undefined][]).filter(([,v])=>v) as [string,string][];
    } else {
      identityFields = ([["GRL Report Number",cert.reportNo],["Shape(s) and Cutting Style(s)",cert.shape],["Measurements",cert.measurements]] as [string,string|undefined][]).filter(([,v])=>v) as [string,string][];
      gradingFields  = ([["Carat Weight",cert.caratWeight?`${cert.caratWeight} carat`:undefined],["Color Grade",cert.color],["Clarity Grade",cert.clarity],["Cut Grade",cert.cut]] as [string,string|undefined][]).filter(([,v])=>v) as [string,string][];
      addlFields     = ([["Polish Grade",cert.polish],["Symmetry Grade",cert.symmetry],["Fluorescence",cert.fluorescence],["Origin",cert.origin]] as [string,string|undefined][]).filter(([,v])=>v) as [string,string][];
    }

    /* Panel 3 summary */
    const p3Fields: [string, string][] = (
      isJ ? ([["Total Stones",cert.diamondTotalPcs],["Est. Total Carat Wt.",cert.diamondWeight?`${cert.diamondWeight} CT`:undefined],["Metal Tested As",cert.metal],["Item Weight",cert.grossWeight?`${cert.grossWeight} GRM`:undefined]] as [string,string|undefined][]) :
      isG ? ([["Stone",cert.gemstoneStone],["Origin",cert.gemstoneOrigin],["Carat Weight",cert.gemstoneCaratWeight],["Shape",cert.gemstoneShape]] as [string,string|undefined][]) :
            ([["Carat Weight",cert.caratWeight?`${cert.caratWeight} carat`:undefined],["Color Grade",cert.color],["Clarity Grade",cert.clarity],["Cut Grade",cert.cut],["Polish Grade",cert.polish],["Symmetry",cert.symmetry]] as [string,string|undefined][])
    ).filter(([,v])=>v) as [string,string][];

    const gemP3: [string,string][] = isJ && cert.gemstoneStone
      ? ([["Gemstone",cert.gemstoneStone],["Origin",cert.gemstoneOrigin],["Weight",cert.gemstoneCaratWeight],["PCS",cert.gemstonePcs]] as [string,string|undefined][]).filter(([,v])=>v) as [string,string][]
      : [];

    const hasImg  = !!(cert.imageDataUrl || cert.imageDataUrl2);
    const has2Img = !!(cert.imageDataUrl && cert.imageDataUrl2);

    return (
      <div ref={ref} style={{
        width: A4_W, height: A4_H,
        background: IVORY,
        fontFamily: "'Segoe UI', Arial, sans-serif",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        position: "relative",
        border: `2px solid ${G}`,
        boxShadow: `inset 0 0 0 1px rgba(184,146,42,0.2)`,
      }}>

        {/* Global faint watermark */}
        <img src={logo} alt="" aria-hidden style={{
          position: "absolute", width: 560, height: 560,
          objectFit: "contain", opacity: 0.022,
          left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* ═══════════════════════════════════════════════════════
            PANEL 1 — Brand + Grading fields
        ═══════════════════════════════════════════════════════ */}
        <div style={{
          width: PW, height: A4_H, flexShrink: 0,
          borderRight: `1.5px solid ${G}`,
          display: "flex", flexDirection: "column",
          position: "relative", zIndex: 1,
          background: P1_BG,
        }}>

          {/* Brand header */}
          <div style={{
            padding: "14px 16px 10px",
            borderBottom: `2px solid ${G}`,
            flexShrink: 0,
            display: "flex", flexDirection: "column", alignItems: "center",
            background: HDR_BG,
          }}>
            {/* Outer double-ring seal */}
            <div style={{
              width: 78, height: 78, borderRadius: "50%",
              border: `2.5px solid ${G}`,
              boxShadow: `0 0 0 3px rgba(184,146,42,0.15), 0 0 0 5px rgba(184,146,42,0.06)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg,#FDF6E3 0%,#F5E8B0 50%,#FDF6E3 100%)",
              marginBottom: 8, flexShrink: 0,
            }}>
              <img src={logo} alt="JewelsReport" style={{ height: 52, width: 52, objectFit: "contain" }} />
            </div>
            <div style={{
              fontFamily: "Georgia,'Times New Roman',serif",
              fontSize: 21, fontWeight: 700, letterSpacing: "0.08em",
              color: "#1A0E00", lineHeight: 1, textTransform: "uppercase",
            }}>
              JewelsReport
            </div>
            {/* Gold separator line with diamond */}
            <div style={{ display: "flex", alignItems: "center", gap: 5, margin: "5px 0 3px" }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${G})` }} />
              <div style={{ width: 4, height: 4, background: G, transform: "rotate(45deg)" }} />
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${G},transparent)` }} />
            </div>
            <div style={{ fontSize: 7.5, letterSpacing: "0.32em", textTransform: "uppercase", color: "#7A6020", fontWeight: 600 }}>
              Gemological Certification Lab
            </div>
          </div>

          <SectionBar label={panelHdr} />

          <div style={{ flex: 1, padding: "10px 14px 0", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {identityFields.map(([l, v]) => <FR key={l} label={l} value={v} />)}

            {gradingFields.length > 0 && (<>
              <SubHdr label="Grading Results" />
              {gradingFields.map(([l, v]) => <FR key={l} label={l} value={v} size={12} />)}
            </>)}

            {addlFields.length > 0 && (<>
              <SubHdr label="Additional Grading Information" />
              {addlFields.map(([l, v]) => <FR key={l} label={l} value={v} />)}
            </>)}

            {cert.remarks && (
              <div style={{ marginTop: 8, padding: "5px 8px", background: "rgba(184,146,42,0.10)", borderLeft: `2.5px solid ${G}`, borderRadius: "0 3px 3px 0", flexShrink: 0 }}>
                <div style={{ fontSize: 7, fontWeight: 800, textTransform: "uppercase", color: G2, letterSpacing: "0.15em", marginBottom: 2 }}>Comments</div>
                <div style={{ fontSize: 10, color: "#3A2A08", lineHeight: 1.55 }}>{cert.remarks}</div>
              </div>
            )}

            {/* Ornamental filler */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 0" }}>
              <GoldLine />
              <div style={{ textAlign: "center", padding: "10px 0" }}>
                <div style={{ fontSize: 32, color: `rgba(184,146,42,0.18)`, lineHeight: 1, letterSpacing: "0.1em" }}>✦</div>
                <div style={{
                  fontSize: 7.5, letterSpacing: "0.35em", textTransform: "uppercase",
                  color: `rgba(184,146,42,0.35)`, marginTop: 5, fontWeight: 700,
                }}>
                  Certified Authentic
                </div>
                <div style={{ fontSize: 6.5, letterSpacing: "0.28em", color: `rgba(184,146,42,0.25)`, marginTop: 2, textTransform: "uppercase" }}>
                  Jewels Report · {new Date().getFullYear()}
                </div>
              </div>
              <GoldLine />
            </div>

            {/* Signature */}
            <div style={{ borderTop: `1px solid rgba(184,146,42,0.35)`, paddingTop: 6, marginBottom: 8, flexShrink: 0 }}>
              <div style={{ minHeight: 42, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4 }}>
                {cert.signatureDataUrl && (
                  <img src={cert.signatureDataUrl} alt="Signature" style={{ maxHeight: 42, maxWidth: "90%", objectFit: "contain" }} />
                )}
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 8, color: "#4A3A18", fontWeight: 600, letterSpacing: "0.08em" }}>Authorised Signatory</div>
                <div style={{ fontSize: 7, color: "rgba(184,146,42,0.55)", letterSpacing: "0.05em", marginTop: 1 }}>JewelsReport Certification Lab</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            borderTop: `1px solid rgba(184,146,42,0.3)`,
            padding: "5px 14px",
            flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "rgba(184,146,42,0.06)",
          }}>
            <div style={{ fontSize: 7, color: "rgba(184,146,42,0.55)", letterSpacing: "0.1em" }}>jewelsreport.com</div>
            <div style={{ fontSize: 7, color: "rgba(184,146,42,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {REPORT_TYPE_LABELS[cert.type] ?? cert.type}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            PANEL 2 — Report info + Photos
        ═══════════════════════════════════════════════════════ */}
        <div style={{
          width: PW, height: A4_H, flexShrink: 0,
          borderRight: `1.5px solid ${G}`,
          display: "flex", flexDirection: "column",
          position: "relative", zIndex: 1,
          background: IVORY,
        }}>

          {/* Report number header */}
          <div style={{
            padding: "10px 16px 8px",
            borderBottom: `1.5px solid rgba(184,146,42,0.35)`,
            flexShrink: 0, textAlign: "center",
            background: HDR_BG,
          }}>
            <div style={{ fontSize: 7.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "#7A6020", marginBottom: 2 }}>
              GRL Report Number
            </div>
            <div style={{ fontFamily: "'Courier New','Lucida Console',monospace", fontSize: 16, fontWeight: 900, letterSpacing: "0.06em", color: "#1A0E00" }}>
              {cert.reportNo}
            </div>
            <div style={{ fontSize: 8, color: G2, marginTop: 3, letterSpacing: "0.05em" }}>
              Verify this report at jewelsreport.com/verify
            </div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 11, fontWeight: 700, color: "#3A2800", marginTop: 3 }}>
              {fmtDate(cert.issueDate)}
            </div>
          </div>

          <SectionBar label="Item(s) Overall Description" />

          <div style={{ flex: 1, padding: "10px 14px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {cert.description && (
              <p style={{ fontSize: 11, color: "#3A2A08", lineHeight: 1.72, marginBottom: 10, flexShrink: 0, fontStyle: "italic" }}>
                {cert.description}
              </p>
            )}

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: has2Img ? 8 : 0, minHeight: 0 }}>
              {cert.imageDataUrl && (
                <div style={{ flex: 1, minHeight: 0, border: `1.5px solid rgba(184,146,42,0.4)`, borderRadius: 4, overflow: "hidden", background: "#F8F4EC" }}>
                  <img src={cert.imageDataUrl} alt="Item" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </div>
              )}
              {cert.imageDataUrl2 && (
                <div style={{ flex: 1, minHeight: 0, border: `1.5px solid rgba(184,146,42,0.4)`, borderRadius: 4, overflow: "hidden", background: "#F8F4EC" }}>
                  <img src={cert.imageDataUrl2} alt="Item" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </div>
              )}
              {!hasImg && (
                <div style={{
                  flex: 1,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(160deg,#EDE4C8 0%,#FAF6EE 50%,#EDE4C8 100%)",
                  border: `1.5px solid rgba(184,146,42,0.4)`,
                  borderRadius: 4,
                  position: "relative", overflow: "hidden",
                }}>
                  {/* Subtle cross-hatch bg */}
                  <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `repeating-linear-gradient(45deg,rgba(184,146,42,0.04) 0px,rgba(184,146,42,0.04) 1px,transparent 1px,transparent 10px),repeating-linear-gradient(-45deg,rgba(184,146,42,0.04) 0px,rgba(184,146,42,0.04) 1px,transparent 1px,transparent 10px)`,
                  }} />
                  <img src={logo} alt="" style={{ height: 80, opacity: 0.14, marginBottom: 14, position: "relative" }} />
                  <div style={{ fontSize: 9, color: "rgba(184,146,42,0.45)", letterSpacing: "0.25em", textTransform: "uppercase", position: "relative" }}>
                    No Image Provided
                  </div>
                </div>
              )}
            </div>

            {hasImg && (
              <p style={{ fontSize: 8.5, color: "rgba(184,146,42,0.55)", textAlign: "center", marginTop: 6, fontStyle: "italic", flexShrink: 0 }}>
                Image is approximate
              </p>
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            PANEL 3 — Details + Seal + QR
        ═══════════════════════════════════════════════════════ */}
        <div style={{
          width: PW, height: A4_H, flexShrink: 0,
          display: "flex", flexDirection: "column",
          position: "relative", zIndex: 1,
          background: P3_BG,
        }}>

          <SectionBar label="Grading Details" />

          <div style={{ flex: 1, padding: "10px 14px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {p3Fields.map(([l, v]) => <FR key={l} label={l} value={v} />)}

            {gemP3.length > 0 && (<>
              <SubHdr label="Gemstone Details" />
              {gemP3.map(([l, v]) => <FR key={l} label={l} value={v} />)}
            </>)}

            {isJ && cert.metalDescription && (
              <div style={{ marginTop: 8, marginBottom: 6, flexShrink: 0 }}>
                <div style={{ fontSize: 10, color: "#3A2A08", lineHeight: 1.55 }}>
                  <span style={{ fontWeight: 700 }}>*Marking(s):</span> {cert.metalDescription}
                </div>
                <div style={{ fontSize: 8, color: "#8A7040", marginTop: 2, lineHeight: 1.4, fontStyle: "italic" }}>
                  *Marking(s) represent what is present and may not have been assessed by JewelsReport.
                </div>
              </div>
            )}

            {cert.remarks && (
              <div style={{ marginTop: 6, marginBottom: 6, flexShrink: 0 }}>
                <div style={{ fontSize: 10, color: "#3A2A08", lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 700 }}>Comments:</span> {cert.remarks}
                </div>
              </div>
            )}

            {/* Disclaimer fills gap */}
            <div style={{ flex: 1, marginTop: 10, overflow: "hidden" }}>
              <GoldLine />
              <p style={{ fontSize: 7.5, color: "#7A6830", lineHeight: 1.75, marginTop: 8 }}>
                The results documented in this report refer only to the article described,
                and were obtained using the techniques and equipment used by JewelsReport
                at the time of examination. This report is not a guarantee or valuation.
                For additional information and important limitations please see
                jewelsreport.com/terms or contact the JewelsReport Gemological
                Certification Lab directly.
                &nbsp;©{new Date().getFullYear()} JewelsReport Gemological Certification Lab.
                All rights reserved.
              </p>
            </div>

            {/* Seal + QR */}
            <div style={{ flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginBottom: 8 }}>
                {/* Luxury circular seal */}
                <div style={{
                  width: 76, height: 76, flexShrink: 0,
                  borderRadius: "50%",
                  border: `2.5px solid ${G}`,
                  boxShadow: `0 0 0 3px rgba(184,146,42,0.15), 0 0 0 5px rgba(184,146,42,0.06), inset 0 0 0 2px rgba(184,146,42,0.12)`,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(135deg,#FDF6E3 0%,#F5E8B0 50%,#FDF6E3 100%)",
                }}>
                  <img src={logo} alt="" style={{ height: 40, width: 40, objectFit: "contain" }} />
                  <div style={{ fontSize: 5, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", color: G2, marginTop: 2 }}>
                    CERTIFIED
                  </div>
                </div>

                {/* QR */}
                <div style={{
                  padding: 4, background: IVORY,
                  border: `1.5px solid rgba(184,146,42,0.45)`,
                  borderRadius: 3, flexShrink: 0,
                }}>
                  <QRCodeSVG value={verifyUrl} size={72} level="M" />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 7.5, color: G2, fontWeight: 700, lineHeight: 1.5, wordBreak: "break-all" }}>
                    reportcheck.jewelsreport.com
                  </div>
                  <div style={{ fontSize: 7.5, color: "#8A7040", marginTop: 3 }}>{cert.reportNo}</div>
                </div>
              </div>

              {/* Security box */}
              <div style={{
                border: `1px solid rgba(184,146,42,0.45)`,
                borderRadius: 2, padding: "4px 8px",
                background: "rgba(184,146,42,0.07)",
              }}>
                <div style={{ fontSize: 6.5, fontWeight: 700, color: "#5A4010", lineHeight: 1.7, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Security Features: Holographic Foil · Guilloché Pattern · Embossed Seal · UV Reactive Ink
                </div>
                <div style={{ fontSize: 6, color: "#8A7040", marginTop: 2, lineHeight: 1.5 }}>
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
