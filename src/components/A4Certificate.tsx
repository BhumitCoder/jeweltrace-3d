import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { Certificate } from "@/lib/store";
import { REPORT_TYPE_LABELS } from "@/lib/store";
import logo from "@/assets/logo.png";

/* ── Landscape A4 trifold: 3 equal vertical panels ─────────────── */
export const A4_W = 1122;
export const A4_H = 794;

const PW  = 374;        /* panel width  =  1122 / 3 */
const G   = "#B8922A";  /* brand gold */
const G2  = "#7D6420";  /* mid gold */
const G3  = "#5F4A10";  /* deep gold */

/* ── GIA-style dotted leader field row ──────────────────────────── */
function FR({ label, value, size = 11 }: { label: string; value: string; size?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", marginBottom: 5 }}>
      <span style={{
        fontSize: size, color: "#555", whiteSpace: "nowrap",
        lineHeight: 1.3, flexShrink: 0,
      }}>
        {label}
      </span>
      <span style={{
        flex: 1, borderBottom: "1.5px dotted #BBBBBB",
        margin: `0 4px ${size * 0.22}px`, minWidth: 6,
      }} />
      <span style={{
        fontSize: size, fontWeight: 800, color: "#111", lineHeight: 1.3,
        textTransform: "uppercase", letterSpacing: "0.02em", whiteSpace: "nowrap",
      }}>
        {value}
      </span>
    </div>
  );
}

/* ── Full-width amber section bar ───────────────────────────────── */
function SectionBar({ label, shade = 0 }: { label: string; shade?: 0 | 1 | 2 }) {
  const bg = [G, G2, G3][shade];
  return (
    <div style={{
      background: bg, padding: "4px 14px", flexShrink: 0,
      borderBottom: "1px solid rgba(0,0,0,0.08)",
    }}>
      <span style={{
        fontSize: 7.5, fontWeight: 800, letterSpacing: "0.22em",
        textTransform: "uppercase", color: "#fff",
      }}>
        {label}
      </span>
    </div>
  );
}

/* ── Sub-section amber band (within content area) ───────────────── */
function SubHdr({ label }: { label: string }) {
  return (
    <div style={{
      background: G2, padding: "2.5px 6px",
      margin: "9px 0 5px", borderRadius: 2,
    }}>
      <span style={{
        fontSize: 7, fontWeight: 800, letterSpacing: "0.2em",
        textTransform: "uppercase", color: "#fff",
      }}>
        {label}
      </span>
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
        return new Date(d).toLocaleDateString("en-IN", {
          day: "numeric", month: "long", year: "numeric",
        });
      } catch { return d; }
    };

    /* ── Panel 1 section header title ─────────────────────────────── */
    const panelHdr = isG
      ? "Gemstone Grading Report"
      : isJ
      ? "Jewellery Grading Report"
      : `${cert.type.replace("Natural ", "").replace("Lab Grown ", "")} Grading Report`;

    /* ── Panel 1 fields — split into identity / grading / addl ────── */
    let identityFields: [string, string][] = [];
    let gradingFields:  [string, string][] = [];
    let addlFields:     [string, string][] = [];

    if (isG) {
      identityFields = ([
        ["GRL Report Number", cert.reportNo],
        ["Variety",           cert.gemstoneStone],
        ["Origin",            cert.gemstoneOrigin],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];

      gradingFields = ([
        ["Shape and Cutting Style", cert.gemstoneShape],
        ["Carat Weight",            cert.gemstoneCaratWeight],
        ["PCS",                     cert.gemstonePcs],
        ["Measurements",            cert.gemstoneMeasurements],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];

      addlFields = ([
        ["Color and Transparency", cert.gemstoneColorTransparency],
        ["Characteristics",        cert.gemstoneCharacteristics],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];

    } else if (isJ) {
      identityFields = ([
        ["GRL Report Number", cert.reportNo],
        ["Item",              cert.itemName],
        ["Shape",             cert.shape],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];

      gradingFields = ([
        ["Metal Tested As",  cert.metal],
        ["Gross Weight",     cert.grossWeight ? `${cert.grossWeight} GRM` : undefined],
        ["Net Weight",       cert.netWeight   ? `${cert.netWeight} GRM`   : undefined],
        ["Origin",           cert.origin],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];

      addlFields = ([
        ["Diamond Shape",     cert.diamondShape],
        ["Diamond Weight",    cert.diamondWeight ? `${cert.diamondWeight} CT` : undefined],
        ["Diamond Total PCS", cert.diamondTotalPcs],
        ["Diamond Color",     cert.diamondColor],
        ["Diamond Clarity",   cert.diamondClarity],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];

    } else {
      identityFields = ([
        ["GRL Report Number",             cert.reportNo],
        ["Shape(s) and Cutting Style(s)", cert.shape],
        ["Measurements",                  cert.measurements],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];

      gradingFields = ([
        ["Carat Weight",  cert.caratWeight ? `${cert.caratWeight} carat` : undefined],
        ["Color Grade",   cert.color],
        ["Clarity Grade", cert.clarity],
        ["Cut Grade",     cert.cut],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];

      addlFields = ([
        ["Polish Grade",   cert.polish],
        ["Symmetry Grade", cert.symmetry],
        ["Fluorescence",   cert.fluorescence],
        ["Origin",         cert.origin],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
    }

    /* ── Panel 3 summary fields ────────────────────────────────────── */
    const p3Fields: [string, string][] = (
      isJ ? ([
        ["Total Stones",          cert.diamondTotalPcs],
        ["Est. Total Carat Wt.",  cert.diamondWeight ? `${cert.diamondWeight} CT` : undefined],
        ["Metal Tested As",       cert.metal],
        ["Item Weight",           cert.grossWeight ? `${cert.grossWeight} GRM` : undefined],
      ] as [string, string | undefined][]) :
      isG ? ([
        ["Stone",        cert.gemstoneStone],
        ["Origin",       cert.gemstoneOrigin],
        ["Carat Weight", cert.gemstoneCaratWeight],
        ["Shape",        cert.gemstoneShape],
      ] as [string, string | undefined][]) : ([
        ["Carat Weight",  cert.caratWeight ? `${cert.caratWeight} carat` : undefined],
        ["Color Grade",   cert.color],
        ["Clarity Grade", cert.clarity],
        ["Cut Grade",     cert.cut],
        ["Polish Grade",  cert.polish],
        ["Symmetry",      cert.symmetry],
      ] as [string, string | undefined][])
    ).filter(([, v]) => v) as [string, string][];

    const gemP3Fields: [string, string][] = isJ && cert.gemstoneStone
      ? ([
          ["Gemstone",   cert.gemstoneStone],
          ["Origin",     cert.gemstoneOrigin],
          ["Weight",     cert.gemstoneCaratWeight],
          ["PCS",        cert.gemstonePcs],
        ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][]
      : [];

    const hasImg  = !!(cert.imageDataUrl || cert.imageDataUrl2);
    const has2Img = !!(cert.imageDataUrl && cert.imageDataUrl2);

    return (
      <div ref={ref} style={{
        width: A4_W, height: A4_H,
        background: "#FFFFFF",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        position: "relative",
      }}>

        {/* ── Full-page watermark ─────────────────────────────────── */}
        <img src={logo} alt="" aria-hidden style={{
          position: "absolute",
          width: 520, height: 520,
          objectFit: "contain",
          opacity: 0.024,
          left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
          zIndex: 0,
        }} />

        {/* ═══════════════════════════════════════════════════════════
            PANEL 1 — Brand identity + Grading fields
            The "front cover" when the trifold is closed.
        ═══════════════════════════════════════════════════════════ */}
        <div style={{
          width: PW, height: A4_H, flexShrink: 0,
          borderRight: "1.5px solid #D0C8B8",
          display: "flex", flexDirection: "column",
          position: "relative", zIndex: 1,
        }}>

          {/* Brand header ────────────────────────────────────────── */}
          <div style={{
            padding: "14px 16px 10px",
            borderBottom: `2px solid ${G}`,
            flexShrink: 0,
            display: "flex", flexDirection: "column", alignItems: "center",
          }}>
            <div style={{
              width: 76, height: 76,
              borderRadius: "50%",
              border: `2.5px solid ${G}`,
              boxShadow: `0 0 0 1.5px rgba(184,146,42,0.18)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "#FAF8F2",
              marginBottom: 8, flexShrink: 0,
            }}>
              <img src={logo} alt="JewelsReport"
                style={{ height: 52, width: 52, objectFit: "contain" }} />
            </div>
            <div style={{
              fontFamily: "Georgia,'Times New Roman',serif",
              fontSize: 21, fontWeight: 700, letterSpacing: "0.08em",
              color: "#111", lineHeight: 1, textTransform: "uppercase",
            }}>
              JewelsReport
            </div>
            <div style={{
              fontSize: 7.5, letterSpacing: "0.32em", textTransform: "uppercase",
              color: "#888", marginTop: 3, fontWeight: 600,
            }}>
              Gemological Certification Lab
            </div>
          </div>

          {/* Section header bar */}
          <SectionBar label={panelHdr} shade={0} />

          {/* Grading content ─────────────────────────────────────── */}
          <div style={{
            flex: 1, padding: "10px 14px 0",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
          }}>
            {identityFields.map(([l, v]) => <FR key={l} label={l} value={v} />)}

            {gradingFields.length > 0 && (
              <>
                <SubHdr label="Grading Results" />
                {gradingFields.map(([l, v]) => (
                  <FR key={l} label={l} value={v} size={12} />
                ))}
              </>
            )}

            {addlFields.length > 0 && (
              <>
                <SubHdr label="Additional Grading Information" />
                {addlFields.map(([l, v]) => <FR key={l} label={l} value={v} />)}
              </>
            )}

            {cert.remarks && (
              <div style={{
                marginTop: 8, padding: "5px 8px",
                background: "rgba(184,146,42,0.07)",
                borderLeft: `2.5px solid ${G}`,
                borderRadius: "0 3px 3px 0",
                flexShrink: 0,
              }}>
                <div style={{
                  fontSize: 7, fontWeight: 800, textTransform: "uppercase",
                  color: G, letterSpacing: "0.15em", marginBottom: 2,
                }}>
                  Comments
                </div>
                <div style={{ fontSize: 10, color: "#333", lineHeight: 1.55 }}>
                  {cert.remarks}
                </div>
              </div>
            )}

            {/* Push signature to bottom */}
            <div style={{ flex: 1 }} />

            {/* Signature ───────────────────────────────────────── */}
            <div style={{ borderTop: "1px solid #CCC", paddingTop: 6, marginBottom: 8, flexShrink: 0 }}>
              <div style={{
                minHeight: 42, display: "flex",
                alignItems: "flex-end", justifyContent: "center", paddingBottom: 4,
              }}>
                {cert.signatureDataUrl && (
                  <img src={cert.signatureDataUrl} alt="Signature"
                    style={{ maxHeight: 42, maxWidth: "90%", objectFit: "contain" }} />
                )}
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 8, color: "#444", fontWeight: 600, letterSpacing: "0.08em" }}>
                  Authorised Signatory
                </div>
                <div style={{ fontSize: 7, color: "#AAA", letterSpacing: "0.05em", marginTop: 1 }}>
                  JewelsReport Certification Lab
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            borderTop: "1px solid #E8E0D0",
            padding: "5px 14px",
            flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "#FAF8F2",
          }}>
            <div style={{ fontSize: 7, color: "#AAA", letterSpacing: "0.08em" }}>
              jewelsreport.com
            </div>
            <div style={{
              fontSize: 7, color: "rgba(184,146,42,0.45)",
              letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              {REPORT_TYPE_LABELS[cert.type] ?? cert.type}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            PANEL 2 — Report info + Item overview + Photos
            The "inside left" page when the trifold is opened.
        ═══════════════════════════════════════════════════════════ */}
        <div style={{
          width: PW, height: A4_H, flexShrink: 0,
          borderRight: "1.5px solid #D0C8B8",
          display: "flex", flexDirection: "column",
          position: "relative", zIndex: 1,
        }}>

          {/* Report identity header (like GIA's report number strip) */}
          <div style={{
            padding: "10px 16px 8px",
            borderBottom: `1.5px solid rgba(184,146,42,0.25)`,
            flexShrink: 0, textAlign: "center",
            background: "#FDFBF7",
          }}>
            <div style={{
              fontSize: 7.5, letterSpacing: "0.22em",
              textTransform: "uppercase", color: "#AAA", marginBottom: 2,
            }}>
              GRL Report Number
            </div>
            <div style={{
              fontFamily: "'Courier New','Lucida Console',monospace",
              fontSize: 16, fontWeight: 900, letterSpacing: "0.06em", color: "#111",
            }}>
              {cert.reportNo}
            </div>
            <div style={{
              fontSize: 8, color: G, marginTop: 3,
              letterSpacing: "0.05em", textDecoration: "underline",
            }}>
              Verify this report at jewelsreport.com/verify
            </div>
            <div style={{
              fontFamily: "Georgia,serif",
              fontSize: 11, fontWeight: 700, color: "#333", marginTop: 3,
            }}>
              {fmtDate(cert.issueDate)}
            </div>
          </div>

          {/* Section bar */}
          <SectionBar label="Item(s) Overall Description" shade={1} />

          {/* Content: description + photos */}
          <div style={{
            flex: 1, padding: "10px 14px",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
          }}>
            {cert.description && (
              <p style={{
                fontSize: 11, color: "#333", lineHeight: 1.72,
                marginBottom: 10, flexShrink: 0, fontStyle: "italic",
              }}>
                {cert.description}
              </p>
            )}

            {/* Image(s) — fill all remaining space */}
            <div style={{
              flex: 1,
              display: "flex", flexDirection: "column",
              gap: has2Img ? 8 : 0,
              minHeight: 0,
            }}>
              {cert.imageDataUrl && (
                <div style={{
                  flex: 1, minHeight: 0,
                  border: "1.5px solid rgba(184,146,42,0.3)",
                  borderRadius: 4, overflow: "hidden",
                  background: "#F8F5EF",
                }}>
                  <img src={cert.imageDataUrl} alt="Item"
                    style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </div>
              )}
              {cert.imageDataUrl2 && (
                <div style={{
                  flex: 1, minHeight: 0,
                  border: "1.5px solid rgba(184,146,42,0.3)",
                  borderRadius: 4, overflow: "hidden",
                  background: "#F8F5EF",
                }}>
                  <img src={cert.imageDataUrl2} alt="Item"
                    style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </div>
              )}
              {!hasImg && (
                <div style={{
                  flex: 1,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(160deg,#F5F0E8 0%,#FAF7F2 100%)",
                  border: "1.5px dashed rgba(184,146,42,0.3)",
                  borderRadius: 4,
                }}>
                  <img src={logo} alt="" style={{ height: 80, opacity: 0.15, marginBottom: 14 }} />
                  <div style={{
                    fontSize: 9, color: "#CCC",
                    letterSpacing: "0.25em", textTransform: "uppercase",
                  }}>
                    No Image Provided
                  </div>
                </div>
              )}
            </div>

            {hasImg && (
              <p style={{
                fontSize: 8.5, color: "#AAA", textAlign: "center",
                marginTop: 6, fontStyle: "italic", flexShrink: 0,
              }}>
                Image is approximate
              </p>
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            PANEL 3 — Grading details + Disclaimer + Seal + QR
            The "inside right" page when the trifold is opened.
        ═══════════════════════════════════════════════════════════ */}
        <div style={{
          width: PW, height: A4_H, flexShrink: 0,
          display: "flex", flexDirection: "column",
          position: "relative", zIndex: 1,
        }}>

          {/* Section bar */}
          <SectionBar label="Grading Details" shade={2} />

          {/* Content */}
          <div style={{
            flex: 1, padding: "10px 14px",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
          }}>
            {p3Fields.map(([l, v]) => <FR key={l} label={l} value={v} />)}

            {gemP3Fields.length > 0 && (
              <>
                <SubHdr label="Gemstone Details" />
                {gemP3Fields.map(([l, v]) => <FR key={l} label={l} value={v} />)}
              </>
            )}

            {isJ && cert.metalDescription && (
              <div style={{ marginTop: 8, marginBottom: 6, flexShrink: 0 }}>
                <div style={{ fontSize: 10, color: "#444", lineHeight: 1.55 }}>
                  <span style={{ fontWeight: 700 }}>*Marking(s):</span> {cert.metalDescription}
                </div>
                <div style={{ fontSize: 8, color: "#999", marginTop: 2, lineHeight: 1.4, fontStyle: "italic" }}>
                  *Marking(s) represent what is present and may not have been assessed by JewelsReport.
                </div>
              </div>
            )}

            {cert.remarks && (
              <div style={{ marginTop: 6, marginBottom: 6, flexShrink: 0 }}>
                <div style={{ fontSize: 10, color: "#444", lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 700 }}>Comments:</span> {cert.remarks}
                </div>
              </div>
            )}

            {/* Disclaimer — fills the middle gap */}
            <p style={{
              flex: 1, fontSize: 7.5, color: "#888",
              lineHeight: 1.75, marginBottom: 12, overflow: "hidden",
              marginTop: 10,
            }}>
              The results documented in this report refer only to the article described,
              and were obtained using the techniques and equipment used by JewelsReport
              at the time of examination. This report is not a guarantee or valuation.
              For additional information and important limitations please see
              jewelsreport.com/terms or contact the JewelsReport Gemological
              Certification Lab directly.
              &nbsp;©{new Date().getFullYear()} JewelsReport Gemological Certification Lab.
              All rights reserved.
            </p>

            {/* Seal + QR ─────────────────────────────────────────── */}
            <div style={{ flexShrink: 0 }}>
              <div style={{
                display: "flex", alignItems: "flex-end",
                gap: 10, marginBottom: 8,
              }}>
                {/* Circular certification seal */}
                <div style={{
                  width: 72, height: 72, flexShrink: 0,
                  borderRadius: "50%",
                  border: `2.5px solid ${G}`,
                  boxShadow: `0 0 0 1.5px rgba(184,146,42,0.2), inset 0 0 0 3px rgba(184,146,42,0.06)`,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  background: "#FAF6EE",
                }}>
                  <img src={logo} alt="" style={{ height: 38, width: 38, objectFit: "contain" }} />
                  <div style={{
                    fontSize: 5, fontWeight: 900, letterSpacing: "0.2em",
                    textTransform: "uppercase", color: G, marginTop: 2,
                  }}>
                    CERTIFIED
                  </div>
                </div>

                {/* QR code */}
                <div style={{
                  padding: 5, background: "#fff",
                  border: "1.5px solid rgba(184,146,42,0.35)",
                  borderRadius: 3, flexShrink: 0,
                }}>
                  <QRCodeSVG value={verifyUrl} size={72} level="M" />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 7.5, color: G, fontWeight: 700,
                    lineHeight: 1.5, wordBreak: "break-all",
                  }}>
                    reportcheck.jewelsreport.com
                  </div>
                  <div style={{ fontSize: 7.5, color: "#AAA", marginTop: 3 }}>
                    {cert.reportNo}
                  </div>
                </div>
              </div>

              {/* Security features box */}
              <div style={{
                border: "1px solid #CCC", borderRadius: 2,
                padding: "4px 8px", background: "#F5F0E8",
              }}>
                <div style={{
                  fontSize: 6.5, fontWeight: 700, color: "#555",
                  lineHeight: 1.7, textTransform: "uppercase", letterSpacing: "0.04em",
                }}>
                  Security Features: Holographic Foil · Guilloché Pattern · Embossed Seal · UV Reactive Ink
                </div>
                <div style={{ fontSize: 6, color: "#AAA", marginTop: 2, lineHeight: 1.5 }}>
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
