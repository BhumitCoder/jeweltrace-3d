import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { Certificate } from "@/lib/store";
import { REPORT_TYPE_LABELS } from "@/lib/store";
import logo from "@/assets/logo.png";

/* ── Landscape A4 (297 × 210 mm @ 96 dpi) ───────────────────────── */
export const A4_W = 1122;   // 297 mm
export const A4_H = 794;    //  210 mm
const PANEL  = 374;         // A4_W / 3  — each tri-fold panel
const SEC_W  = 8;           // security-strip width (left edge of panel 1)

/* ── Palette ─────────────────────────────────────────────────────── */
const G        = "#B8922A";   // brand gold
const G_DARK   = "#8B6A14";   // deeper gold
const G_LIGHT  = "#D4AA4A";   // lighter gold
const COVER_BG = "#16100A";   // near-black warm brown (cover panel)
const COVER_FG = "#F5E6C0";   // warm cream text on dark
const IMG_BG   = "#F4EFE6";   // image panel background
const SEC_BG   = "#0D0800";   // security strip bg

/* ── Dotted-leader field row ─────────────────────────────────────── */
function FR({ label, value, small }: { label: string; value: string; small?: boolean }) {
  const fs = small ? 9.5 : 10.5;
  return (
    <div style={{ display: "flex", alignItems: "flex-end", marginBottom: small ? 3.5 : 4.5, minWidth: 0, flexWrap: "wrap", rowGap: 0 }}>
      <span style={{
        fontSize: fs, color: "#555", whiteSpace: "nowrap",
        lineHeight: 1.35, fontWeight: 400, flexShrink: 0,
      }}>
        {label}
      </span>
      <span style={{
        flex: 1, borderBottom: "1.5px dotted #CCBBAA",
        margin: "0 5px 2.5px", minWidth: 10,
      }} />
      <span style={{
        fontSize: fs, fontWeight: 800, color: "#111",
        whiteSpace: "normal", wordBreak: "break-word",
        lineHeight: 1.35, textTransform: "uppercase",
        letterSpacing: "0.02em", textAlign: "right",
        maxWidth: "55%",
      }}>
        {value}
      </span>
    </div>
  );
}

/* ── Sub-section bar ─────────────────────────────────────────────── */
function SubHdr({ label }: { label: string }) {
  return (
    <div style={{
      background: `linear-gradient(90deg,${G_DARK},${G})`,
      padding: "3.5px 8px", marginTop: 10, marginBottom: 6, borderRadius: 2,
    }}>
      <span style={{
        fontSize: 7, fontWeight: 800, letterSpacing: "0.22em",
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

    /* ── Main grading fields (center panel) ────────────────────────── */
    let mainFields: [string, string | undefined][] = [];
    if (isG) {
      mainFields = [
        ["GRL Report Number",          cert.reportNo],
        ["Stone",                      cert.gemstoneStone],
        ["Origin",                     cert.gemstoneOrigin],
        ["Shape and Cutting Style",    cert.gemstoneShape],
        ["Carat Weight",               cert.gemstoneCaratWeight],
        ["PCS",                        cert.gemstonePcs],
        ["Measurements",               cert.gemstoneMeasurements],
        ["Color and Transparency",     cert.gemstoneColorTransparency],
        ["Characteristics",            cert.gemstoneCharacteristics],
      ];
    } else if (isJ) {
      mainFields = [
        ["GRL Report Number",  cert.reportNo],
        ["Item",               cert.itemName],
        ["Shape",              cert.shape],
        ["Metal Tested As",    cert.metal],
        ["Metal Description",  cert.metalDescription],
        ["Gross Weight",       cert.grossWeight ? `${cert.grossWeight} GRM` : undefined],
        ["Net Weight",         cert.netWeight   ? `${cert.netWeight} GRM`   : undefined],
        ["Origin",             cert.origin],
      ];
    } else {
      mainFields = [
        ["GRL Report Number",              cert.reportNo],
        ["Shape(s) and Cutting Style(s)",  cert.shape],
        ["Measurements",                   cert.measurements],
        ["Carat Weight",                   cert.caratWeight ? `${cert.caratWeight} carat` : undefined],
        ["Color Grade",                    cert.color],
        ["Clarity Grade",                  cert.clarity],
        ["Cut Grade",                      cert.cut],
        ["Polish Grade",                   cert.polish],
        ["Symmetry Grade",                 cert.symmetry],
        ["Fluorescence",                   cert.fluorescence],
        ["Origin",                         cert.origin],
      ];
    }
    mainFields = mainFields.filter(([, v]) => v) as [string, string][];

    /* ── Additional diamond details (jewellery) ─────────────────────── */
    const hasDiamond = isJ && (cert.diamondShape || cert.diamondWeight || cert.diamondColor || cert.diamondClarity);
    const diamondFields: [string, string][] = hasDiamond ? ([
      ["Shape and Cut",     cert.diamondShape],
      ["Total Est. Weight", cert.diamondWeight ? `${cert.diamondWeight} CT` : undefined],
      ["Total PCS",         cert.diamondTotalPcs],
      ["Color",             cert.diamondColor],
      ["Clarity",           cert.diamondClarity],
    ].filter(([, v]) => v) as [string, string][]) : [];

    /* ── Section header label ───────────────────────────────────────── */
    const centerHdr = isG
      ? "GEMSTONE GRADING REPORT"
      : isJ
      ? "JEWELLERY GRADING REPORT"
      : `${cert.type.replace("Natural ", "").replace("Lab Grown ", "").toUpperCase()} GRADING REPORT`;

    const hasImg  = !!(cert.imageDataUrl || cert.imageDataUrl2);
    const has2Img = !!(cert.imageDataUrl && cert.imageDataUrl2);

    /* ── Usable inner heights (full height minus fold-guide top strip 4px) */
    const innerH = A4_H;          // panels are full height

    /* ── Gold ornament line ─────────────────────────────────────────── */
    const GoldLine = ({ w = 160, my = 0 }: { w?: number; my?: number }) => (
      <div style={{
        width: w, height: 1.5,
        background: `linear-gradient(90deg,transparent,${G},transparent)`,
        margin: `${my}px auto`,
      }} />
    );

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

        {/* ══════════════════════════════════════════════════════════════
            PANEL 1 — IMAGE / BACK COVER (leftmost, folds to become back)
        ══════════════════════════════════════════════════════════════ */}
        <div style={{
          width: PANEL, height: innerH, flexShrink: 0,
          display: "flex", flexDirection: "row",
          borderRight: `1px dashed rgba(184,146,42,0.35)`,
          background: IMG_BG,
          position: "relative",
        }}>

          {/* Security strip — far left edge */}
          <div style={{
            width: SEC_W, flexShrink: 0, height: "100%",
            background: SEC_BG,
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}>
            <div style={{
              writingMode: "vertical-rl", textOrientation: "mixed",
              transform: "rotate(180deg)",
              fontSize: 5.5, fontWeight: 800, letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: `rgba(184,146,42,0.7)`,
              whiteSpace: "nowrap",
            }}>
              JEWELSREPORT · CERTIFIED · AUTHENTIC
            </div>
          </div>

          {/* Image panel content */}
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            padding: "18px 14px 14px 12px",
          }}>
            {/* Top logo watermark */}
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div style={{
                fontSize: 7, fontWeight: 700, letterSpacing: "0.28em",
                textTransform: "uppercase", color: G, opacity: 0.6,
              }}>
                JEWELSREPORT · GEMOLOGICAL CERTIFICATION LAB
              </div>
            </div>

            {/* Description */}
            {cert.description && (
              <p style={{
                fontSize: 10, color: "#444", lineHeight: 1.7,
                marginBottom: 10, textAlign: "center", fontStyle: "italic",
              }}>
                {cert.description}
              </p>
            )}

            {/* Images */}
            {hasImg ? (
              <div style={{
                flex: 1, display: "flex", flexDirection: "column",
                gap: 8, alignItems: "center", justifyContent: "center",
              }}>
                {cert.imageDataUrl && (
                  <div style={{
                    width: "100%",
                    maxHeight: has2Img ? 270 : 520,
                    border: `1.5px solid rgba(184,146,42,0.4)`,
                    borderRadius: 4, overflow: "hidden",
                    background: "#EDE8DF", flexShrink: 0,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                  }}>
                    <img src={cert.imageDataUrl} alt="Item"
                      style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                  </div>
                )}
                {cert.imageDataUrl2 && (
                  <div style={{
                    width: "100%",
                    maxHeight: has2Img ? 270 : 520,
                    border: `1.5px solid rgba(184,146,42,0.4)`,
                    borderRadius: 4, overflow: "hidden",
                    background: "#EDE8DF", flexShrink: 0,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                  }}>
                    <img src={cert.imageDataUrl2} alt="Item"
                      style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                  </div>
                )}
              </div>
            ) : (
              <div style={{
                flex: 1, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
              }}>
                <img src={logo} alt="" style={{ height: 56, opacity: 0.1, marginBottom: 10 }} />
                <div style={{
                  fontSize: 8.5, color: "#CCC", letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}>
                  No Image Provided
                </div>
              </div>
            )}

            {/* Caption + footer */}
            <div style={{ textAlign: "center", marginTop: 8 }}>
              {hasImg && (
                <p style={{
                  fontSize: 8.5, color: "#AAA", fontStyle: "italic", marginBottom: 6,
                }}>
                  Image is approximate
                </p>
              )}
              <GoldLine w={100} />
              <div style={{
                fontSize: 7.5, color: G, letterSpacing: "0.1em",
                marginTop: 5, fontWeight: 600,
              }}>
                jewelsreport.com
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            PANEL 2 — GRADING DATA (center — interior when folded)
        ══════════════════════════════════════════════════════════════ */}
        <div style={{
          width: PANEL, height: innerH, flexShrink: 0,
          display: "flex", flexDirection: "column",
          borderRight: `1px dashed rgba(184,146,42,0.35)`,
          background: "#FFFFFF",
        }}>
          {/* Section header bar */}
          <div style={{
            background: `linear-gradient(90deg,${G_DARK},${G},${G_LIGHT})`,
            padding: "6px 14px",
            flexShrink: 0,
          }}>
            <span style={{
              fontSize: 7.5, fontWeight: 800, letterSpacing: "0.22em",
              textTransform: "uppercase", color: "#fff",
            }}>
              {centerHdr}
            </span>
          </div>

          {/* Body */}
          <div style={{
            flex: 1, padding: "12px 14px 10px 14px",
            display: "flex", flexDirection: "column",
            overflowY: "hidden",
          }}>
            {/* Badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: 7,
              background: "#F5F0E8", border: `1px solid #D8C9A0`,
              borderRadius: 3, padding: "5px 8px", marginBottom: 11,
            }}>
              <img src={logo} alt="" style={{ height: 24, width: 24, objectFit: "contain", flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 7.5, color: "#777", lineHeight: 1.2 }}>Item Certified by</div>
                <div style={{
                  fontFamily: "Georgia,'Times New Roman',serif",
                  fontSize: 11, fontWeight: 700, color: "#111",
                  lineHeight: 1, marginTop: 2,
                }}>
                  Jewels<span style={{ color: G }}>Report</span>
                </div>
              </div>
            </div>

            {/* Main fields */}
            {mainFields.map(([label, value]) => (
              <FR key={label} label={label} value={value as string} />
            ))}

            {/* Additional diamond details */}
            {diamondFields.length > 0 && (
              <>
                <SubHdr label="Additional Diamond Details" />
                {cert.diamondTotalPcs && (
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: "#111", marginBottom: 3 }}>
                    Section A: {cert.diamondTotalPcs} Diamond(s)
                  </div>
                )}
                {diamondFields.map(([label, value]) => (
                  <FR key={label} label={label} value={value} small />
                ))}
              </>
            )}

            {/* Gemstone details (jewellery) */}
            {isJ && cert.gemstoneStone && (
              <>
                <SubHdr label="Gemstone Details" />
                {([
                  ["Stone",        cert.gemstoneStone],
                  ["Origin",       cert.gemstoneOrigin],
                  ["Shape",        cert.gemstoneShape],
                  ["Carat Weight", cert.gemstoneCaratWeight],
                  ["PCS",          cert.gemstonePcs],
                ] as [string, string | undefined][])
                  .filter(([, v]) => v)
                  .map(([l, v]) => <FR key={l} label={l} value={v as string} small />)}
              </>
            )}

            {/* Jewellery markings */}
            {isJ && cert.metalDescription && (
              <div style={{
                marginTop: 8, padding: "5px 7px",
                background: "rgba(184,146,42,0.06)",
                borderLeft: `2.5px solid ${G}`,
                borderRadius: "0 3px 3px 0",
              }}>
                <div style={{ fontSize: 7.5, fontWeight: 800, textTransform: "uppercase", color: G, marginBottom: 2, letterSpacing: "0.15em" }}>
                  Markings
                </div>
                <div style={{ fontSize: 9.5, color: "#444", lineHeight: 1.5 }}>{cert.metalDescription}</div>
                <div style={{ fontSize: 7.5, color: "#999", marginTop: 3, fontStyle: "italic", lineHeight: 1.4 }}>
                  Markings may not have been independently assessed by JewelsReport.
                </div>
              </div>
            )}

            {/* Remarks */}
            {cert.remarks && (
              <div style={{
                marginTop: 8, padding: "5px 7px",
                background: "rgba(184,146,42,0.06)",
                borderLeft: `2.5px solid ${G}`,
                borderRadius: "0 3px 3px 0",
              }}>
                <div style={{ fontSize: 7.5, fontWeight: 800, textTransform: "uppercase", color: G, marginBottom: 2, letterSpacing: "0.15em" }}>
                  Remarks
                </div>
                <div style={{ fontSize: 9.5, color: "#333", lineHeight: 1.5 }}>{cert.remarks}</div>
              </div>
            )}

            {/* ── Signature — anchored near bottom ── */}
            <div style={{ marginTop: 10, paddingTop: 6 }}>
              <GoldLine w={120} my={0} />
              <div style={{ marginTop: 6, minHeight: 42, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4 }}>
                {cert.signatureDataUrl && (
                  <img src={cert.signatureDataUrl} alt="Signature"
                    style={{ maxHeight: 42, maxWidth: "88%", objectFit: "contain" }} />
                )}
              </div>
              <div style={{ borderTop: "1px solid #CCC", paddingTop: 4, textAlign: "center" }}>
                <div style={{ fontSize: 8.5, color: "#333", fontWeight: 700, letterSpacing: "0.08em" }}>
                  Authorised Signatory
                </div>
                <div style={{ fontSize: 7.5, color: "#AAA", letterSpacing: "0.05em", marginTop: 1 }}>
                  JewelsReport Certification Lab
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            PANEL 3 — COVER / FRONT (rightmost, folds to be face-up)
        ══════════════════════════════════════════════════════════════ */}
        <div style={{
          width: PANEL, height: innerH, flexShrink: 0,
          display: "flex", flexDirection: "column",
          background: COVER_BG,
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Gold top border */}
          <div style={{ height: 5, background: `linear-gradient(90deg,${G_DARK},${G_LIGHT},${G_DARK})`, flexShrink: 0 }} />

          {/* Subtle radial glow */}
          <div style={{
            position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
            background: "radial-gradient(ellipse 280px 220px at 50% 30%, rgba(184,146,42,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Cover content */}
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "20px 28px",
            position: "relative", zIndex: 1,
          }}>

            {/* Logo */}
            <img src={logo} alt="JewelsReport" style={{
              height: 88, width: 88, objectFit: "contain",
              filter: "brightness(1.2) drop-shadow(0 0 8px rgba(184,146,42,0.45))",
              marginBottom: 14,
            }} />

            {/* Brand name */}
            <div style={{
              fontFamily: "Georgia,'Times New Roman',serif",
              fontSize: 26, fontWeight: 700,
              letterSpacing: "0.09em",
              color: COVER_FG, lineHeight: 1,
              textTransform: "uppercase",
              textAlign: "center",
            }}>
              JewelsReport
            </div>

            {/* Subtitle */}
            <div style={{
              fontSize: 7.5, letterSpacing: "0.5em",
              textTransform: "uppercase", color: G,
              marginTop: 5, fontWeight: 600,
              textAlign: "center",
            }}>
              Gemological Certification Lab
            </div>

            <GoldLine w={140} my={14} />

            {/* Report type */}
            <div style={{
              fontSize: 12.5, fontWeight: 900, letterSpacing: "0.12em",
              textTransform: "uppercase", color: G,
              textAlign: "center", lineHeight: 1.4,
            }}>
              {REPORT_TYPE_LABELS[cert.type] ?? cert.type}
            </div>

            {/* Report number */}
            <div style={{
              fontFamily: "'Courier New','Lucida Console',monospace",
              fontSize: 17, fontWeight: 900, letterSpacing: "0.06em",
              color: COVER_FG,
              marginTop: 10, textAlign: "center",
            }}>
              {cert.reportNo}
            </div>

            {/* Date */}
            <div style={{
              fontFamily: "Georgia,'Times New Roman',serif",
              fontSize: 13, fontWeight: 600,
              color: `rgba(245,230,192,0.75)`,
              marginTop: 7, textAlign: "center",
            }}>
              {fmtDate(cert.issueDate)}
            </div>

            <GoldLine w={100} my={14} />

            {/* Verify URL */}
            <div style={{
              fontSize: 8.5, color: G, letterSpacing: "0.06em",
              textDecoration: "underline", fontWeight: 600,
              textAlign: "center", marginBottom: 2,
            }}>
              jewelsreport.com/verify
            </div>
            <div style={{
              fontSize: 7.5, color: `rgba(245,230,192,0.45)`,
              letterSpacing: "0.04em", textAlign: "center",
            }}>
              Scan QR to verify this certificate
            </div>

            {/* QR + Seal row */}
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              marginTop: 18,
            }}>
              {/* Certification seal */}
              <div style={{
                width: 64, height: 64, flexShrink: 0,
                borderRadius: "50%",
                border: `2px solid ${G}`,
                boxShadow: `0 0 0 1px rgba(184,146,42,0.2), 0 0 14px rgba(184,146,42,0.2)`,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                background: "rgba(184,146,42,0.1)",
              }}>
                <img src={logo} alt="" style={{ height: 30, width: 30, objectFit: "contain", filter: "brightness(1.3)" }} />
                <div style={{
                  fontSize: 5, fontWeight: 900, letterSpacing: "0.18em",
                  textTransform: "uppercase", color: G, marginTop: 3,
                }}>
                  CERTIFIED
                </div>
              </div>

              {/* QR code */}
              <div style={{
                padding: 5, background: "#fff",
                border: `1.5px solid ${G}`,
                borderRadius: 4, flexShrink: 0,
                boxShadow: `0 0 8px rgba(184,146,42,0.25)`,
              }}>
                <QRCodeSVG value={verifyUrl} size={64} level="M" />
              </div>
            </div>

            {/* Report number under QR */}
            <div style={{
              fontSize: 7, color: `rgba(184,146,42,0.55)`,
              letterSpacing: "0.08em", marginTop: 7, textAlign: "center",
            }}>
              {cert.reportNo}
            </div>
          </div>

          {/* Security features box */}
          <div style={{
            flexShrink: 0,
            margin: "0 16px 0 16px",
            padding: "5px 8px",
            border: `1px solid rgba(184,146,42,0.25)`,
            borderRadius: 3,
            background: "rgba(184,146,42,0.06)",
          }}>
            <div style={{
              fontSize: 6, fontWeight: 700, color: `rgba(184,146,42,0.7)`,
              lineHeight: 1.6, textTransform: "uppercase", letterSpacing: "0.04em",
              textAlign: "center",
            }}>
              The security features in this document include the hologram, QR code,
              and microprint lines in addition to those not listed. These features exceed
              standard document security industry guidelines. Verify at jewelsreport.com/verify
            </div>
          </div>

          {/* Disclaimer */}
          <div style={{
            flexShrink: 0,
            margin: "8px 16px 10px",
            fontSize: 6.5, color: `rgba(245,230,192,0.35)`,
            lineHeight: 1.6, textAlign: "center",
          }}>
            The results documented in this report refer only to the article described and were obtained
            using techniques and equipment used by JewelsReport at the time of examination.
            This report is not a guarantee or valuation.
          </div>

          {/* Gold bottom border */}
          <div style={{ height: 5, background: `linear-gradient(90deg,${G_DARK},${G_LIGHT},${G_DARK})`, flexShrink: 0 }} />
        </div>

      </div>
    );
  }
);
