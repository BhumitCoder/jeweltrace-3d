import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { Certificate } from "@/lib/store";
import { REPORT_TYPE_LABELS } from "@/lib/store";
import logo from "@/assets/logo.png";

export const A4_W = 794;
export const A4_H = 1123;

/* ── Palette ─────────────────────────────────────── */
const G        = "#B8922A";  // brand gold
const SH_L     = "#B8922A";  // left section header bg
const SH_M     = "#8B6E1A";  // middle section header bg
const SH_R     = "#5F4A10";  // right section header bg
const SH_SEC   = "#1A0D00";  // security strip bg

/* ── Column widths (must sum to 794) ─────────────── */
const CL = 238; // left
const CM = 278; // middle
const CR = 256; // right
const CS = 22;  // security strip
// 238+278+256+22 = 794 ✓

/* ── Vertical areas ──────────────────────────────── */
const HDR_H = 168; // header (incl. 3px gold border at bottom)
const SHD_H = 24;  // section header bar
const FTR_H = 44;  // footer
// body = 1123 - 168 - 24 - 44 = 887px

/* ── Dotted-leader field row (GIA style) ─────────── */
function FR({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", marginBottom: 4.5, minWidth: 0 }}>
      <span style={{ fontSize: 11, color: "#555", whiteSpace: "nowrap", lineHeight: 1.35, fontWeight: 400, flexShrink: 0 }}>
        {label}
      </span>
      <span style={{ flex: 1, borderBottom: "1.5px dotted #BBBBBB", margin: "0 4px 2.5px", minWidth: 6 }} />
      <span style={{ fontSize: 11, fontWeight: 800, color: "#111", whiteSpace: "nowrap", lineHeight: 1.35, textTransform: "uppercase", letterSpacing: "0.02em" }}>
        {value}
      </span>
    </div>
  );
}

/* ── Sub-section header bar ──────────────────────── */
function SubHdr({ label }: { label: string }) {
  return (
    <div style={{
      background: SH_M, padding: "3px 7px",
      marginTop: 8, marginBottom: 5, borderRadius: 2,
    }}>
      <span style={{ fontSize: 7.5, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff" }}>
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
        return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
      } catch { return d; }
    };

    /* ── Left column: main grading fields ─────────── */
    let mainFields: [string, string | undefined][] = [];
    if (isG) {
      mainFields = [
        ["GRL Report Number",         cert.reportNo],
        ["Stone",                     cert.gemstoneStone],
        ["Origin",                    cert.gemstoneOrigin],
        ["Shape and Cutting Style",   cert.gemstoneShape],
        ["Carat Weight",              cert.gemstoneCaratWeight],
        ["PCS",                       cert.gemstonePcs],
        ["Measurements",              cert.gemstoneMeasurements],
        ["Color and Transparency",    cert.gemstoneColorTransparency],
        ["Characteristics",           cert.gemstoneCharacteristics],
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

    /* ── Additional diamond details ───────────────── */
    const hasDiamond = isJ && (cert.diamondShape || cert.diamondWeight || cert.diamondColor || cert.diamondClarity);
    const diamondFields: [string, string][] = hasDiamond ? ([
      ["Shape and Cut",       cert.diamondShape],
      ["Total Est. Weight",   cert.diamondWeight ? `${cert.diamondWeight} CT` : undefined],
      ["Total PCS",           cert.diamondTotalPcs],
      ["Color",               cert.diamondColor],
      ["Clarity",             cert.diamondClarity],
    ].filter(([, v]) => v) as [string, string][]) : [];

    /* ── Right column: item details ───────────────── */
    const rightFields: [string, string][] = (
      isJ ? [
        ["Total Stones",          cert.diamondTotalPcs],
        ["Est. Total Carat Wt.", cert.diamondWeight ? `${cert.diamondWeight} CT` : undefined],
        ["Metal Tested As",       cert.metal],
        ["Item(s) Weight",        cert.grossWeight ? `${cert.grossWeight} GRM` : undefined],
      ] :
      isG ? [
        ["Stone",        cert.gemstoneStone],
        ["Origin",       cert.gemstoneOrigin],
        ["Carat Weight", cert.gemstoneCaratWeight],
      ] :
      [
        ["Carat Weight",  cert.caratWeight ? `${cert.caratWeight} carat` : undefined],
        ["Color Grade",   cert.color],
        ["Clarity Grade", cert.clarity],
        ["Cut Grade",     cert.cut],
      ]
    ).filter(([, v]) => v) as [string, string][];

    /* ── Gemstone right details (jewellery) ───────── */
    const gemRightFields: [string, string][] = isJ && cert.gemstoneStone ? ([
      ["Stone",   cert.gemstoneStone],
      ["Origin",  cert.gemstoneOrigin],
      ["Weight",  cert.gemstoneCaratWeight],
      ["PCS",     cert.gemstonePcs],
    ].filter(([, v]) => v) as [string, string][]) : [];

    /* ── Section header label (left col) ──────────── */
    const leftHdr = isG
      ? "GEMSTONE GRADING REPORT"
      : isJ
      ? "JEWELLERY GRADING REPORT"
      : `${cert.type.replace("Natural ","").replace("Lab Grown ","").toUpperCase()} GRADING REPORT`;

    const hasImg  = !!(cert.imageDataUrl || cert.imageDataUrl2);
    const has2Img = !!(cert.imageDataUrl && cert.imageDataUrl2);
    const imgMaxH = has2Img ? 315 : 570;

    return (
      <div ref={ref} style={{
        width: A4_W, height: A4_H,
        background: "#FFFFFF",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        boxSizing: "border-box", overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}>

        {/* ══════ HEADER ══════ */}
        <div style={{
          height: HDR_H, flexShrink: 0,
          background: "#FFFFFF",
          borderBottom: `3px solid ${G}`,
          position: "relative",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "0 24px",
        }}>
          {/* Logo — top left (like GIA badge) */}
          <img src={logo} alt="JewelsReport" style={{
            position: "absolute", left: 24, top: "50%",
            transform: "translateY(-50%)",
            height: 98, width: 98, objectFit: "contain",
          }} />

          {/* Centered title block */}
          <div style={{ textAlign: "center", zIndex: 1 }}>
            <div style={{
              fontFamily: "Georgia,'Times New Roman',serif",
              fontSize: 28, fontWeight: 700,
              letterSpacing: "0.06em", color: "#111",
              lineHeight: 1, textTransform: "uppercase",
            }}>
              JewelsReport
            </div>
            <div style={{
              fontSize: 9, letterSpacing: "0.45em",
              textTransform: "uppercase", color: "#666",
              marginTop: 3, fontWeight: 600,
            }}>
              Gemological Certification Lab
            </div>
            <div style={{
              width: 200, height: 1.5,
              background: `linear-gradient(90deg,transparent,${G},transparent)`,
              margin: "9px auto 8px",
            }} />
            <div style={{
              fontSize: 16, fontWeight: 900, letterSpacing: "0.1em",
              textTransform: "uppercase", color: G, lineHeight: 1.2,
            }}>
              {REPORT_TYPE_LABELS[cert.type] ?? cert.type}
            </div>
            <div style={{
              fontSize: 18, fontWeight: 900, letterSpacing: "0.06em",
              color: "#111", marginTop: 6,
              fontFamily: "'Courier New','Lucida Console',monospace",
            }}>
              {cert.reportNo}
            </div>
            <div style={{
              fontSize: 9.5, color: G, marginTop: 5,
              letterSpacing: "0.04em", textDecoration: "underline", fontWeight: 600,
            }}>
              Verify this report at jewelsreport.com/verify
            </div>
            <div style={{
              fontFamily: "Georgia,'Times New Roman',serif",
              fontSize: 19, fontWeight: 700, color: "#111",
              marginTop: 6, letterSpacing: "0.02em",
            }}>
              {fmtDate(cert.issueDate)}
            </div>
          </div>
        </div>

        {/* ══════ SECTION HEADER BAR ══════ */}
        <div style={{ display: "flex", flexShrink: 0 }}>
          <div style={{ width: CL, background: SH_L, padding: "5px 10px 5px 12px", display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 7.5, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", lineHeight: 1 }}>
              {leftHdr}
            </span>
          </div>
          <div style={{ width: CM, background: SH_M, padding: "5px 10px", display: "flex", alignItems: "center", borderLeft: "1px solid rgba(255,255,255,0.2)" }}>
            <span style={{ fontSize: 7.5, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", lineHeight: 1 }}>
              Item(s) Overall Description
            </span>
          </div>
          <div style={{ width: CR, background: SH_R, padding: "5px 10px", display: "flex", alignItems: "center", borderLeft: "1px solid rgba(255,255,255,0.15)" }}>
            <span style={{ fontSize: 7.5, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", lineHeight: 1 }}>
              Item Details
            </span>
          </div>
          <div style={{ width: CS, background: SH_SEC }} />
        </div>

        {/* ══════ 3-COLUMN BODY ══════ */}
        <div style={{ display: "flex", flex: 1, minHeight: 0 }}>

          {/* ── LEFT COLUMN ── */}
          <div style={{
            width: CL, flexShrink: 0,
            borderRight: "1px solid #D8D0C0",
            padding: "10px 10px 10px 12px",
            display: "flex", flexDirection: "column",
            overflowY: "hidden",
          }}>
            {/* "Item Certified by JewelsReport" badge — like GIA's "Diamonds Graded by GIA" */}
            <div style={{
              display: "flex", alignItems: "center", gap: 7,
              background: "#F5F0E8", border: "1px solid #D8C9A0",
              borderRadius: 3, padding: "5px 8px", marginBottom: 9,
            }}>
              <img src={logo} alt="" style={{ height: 26, width: 26, objectFit: "contain", flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 8, color: "#777", lineHeight: 1.2 }}>Item Certified by</div>
                <div style={{
                  fontFamily: "Georgia,'Times New Roman',serif",
                  fontSize: 11.5, fontWeight: 700, color: "#111", lineHeight: 1, marginTop: 2,
                }}>
                  Jewels<span style={{ color: G }}>Report</span>
                </div>
              </div>
            </div>

            {/* Main grading fields */}
            {mainFields.map(([label, value]) => (
              <FR key={label} label={label} value={value as string} />
            ))}

            {/* Additional Diamond Details sub-section */}
            {diamondFields.length > 0 && (
              <>
                <SubHdr label="Additional Diamond Details" />
                {cert.diamondTotalPcs && (
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: "#111", marginBottom: 4 }}>
                    Section A: {cert.diamondTotalPcs} Diamond(s)
                  </div>
                )}
                {diamondFields.map(([label, value]) => (
                  <FR key={label} label={label} value={value} />
                ))}
              </>
            )}

            {/* Gemstone sub-section (jewellery) */}
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
                  .map(([l, v]) => <FR key={l} label={l} value={v as string} />)
                }
              </>
            )}

            {/* Remarks */}
            {cert.remarks && (
              <div style={{ marginTop: 8, padding: "5px 7px", background: "rgba(184,146,42,0.07)", borderLeft: `2.5px solid ${G}`, borderRadius: "0 3px 3px 0" }}>
                <div style={{ fontSize: 8, fontWeight: 800, textTransform: "uppercase", color: G, marginBottom: 2, letterSpacing: "0.15em" }}>Remarks</div>
                <div style={{ fontSize: 10, color: "#333", lineHeight: 1.5 }}>{cert.remarks}</div>
              </div>
            )}

            {/* ── Signature block (bottom of left column) ── */}
            <div style={{ marginTop: "auto", paddingTop: 10 }}>
              <div style={{ minHeight: 44, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4 }}>
                {cert.signatureDataUrl && (
                  <img
                    src={cert.signatureDataUrl}
                    alt="Signature"
                    style={{ maxHeight: 44, maxWidth: "92%", objectFit: "contain" }}
                  />
                )}
              </div>
              <div style={{ borderTop: "1px solid #888", paddingTop: 4, textAlign: "center" }}>
                <div style={{ fontSize: 8.5, color: "#333", fontWeight: 600, letterSpacing: "0.08em" }}>
                  Authorised Signatory
                </div>
                <div style={{ fontSize: 7.5, color: "#999", letterSpacing: "0.05em", marginTop: 1 }}>
                  JewelsReport Certification Lab
                </div>
              </div>
            </div>
          </div>

          {/* ── MIDDLE COLUMN ── */}
          <div style={{
            width: CM, flexShrink: 0,
            borderRight: "1px solid #D8D0C0",
            padding: "12px 12px",
            display: "flex", flexDirection: "column",
            overflowY: "hidden",
          }}>
            {cert.description && (
              <p style={{ fontSize: 11, color: "#333", lineHeight: 1.72, marginBottom: 12 }}>
                {cert.description}
              </p>
            )}

            {hasImg ? (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, alignItems: "center", justifyContent: "center" }}>
                {cert.imageDataUrl && (
                  <div style={{
                    width: "100%", maxHeight: imgMaxH,
                    border: "1.5px solid rgba(184,146,42,0.35)",
                    borderRadius: 3, overflow: "hidden", background: "#F8F5EF",
                    flexShrink: 0,
                  }}>
                    <img src={cert.imageDataUrl} alt="Item"
                      style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                  </div>
                )}
                {cert.imageDataUrl2 && (
                  <div style={{
                    width: "100%", maxHeight: imgMaxH,
                    border: "1.5px solid rgba(184,146,42,0.35)",
                    borderRadius: 3, overflow: "hidden", background: "#F8F5EF",
                    flexShrink: 0,
                  }}>
                    <img src={cert.imageDataUrl2} alt="Item"
                      style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                  </div>
                )}
              </div>
            ) : (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <img src={logo} alt="" style={{ height: 48, opacity: 0.12, marginBottom: 8 }} />
                <div style={{ fontSize: 9, color: "#CCC", letterSpacing: "0.2em", textTransform: "uppercase" }}>No Image Provided</div>
              </div>
            )}

            {hasImg && (
              <p style={{ fontSize: 9, color: "#999", textAlign: "center", marginTop: 6, fontStyle: "italic" }}>
                Image is approximate
              </p>
            )}
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div style={{
            width: CR, flexShrink: 0,
            padding: "12px 12px",
            display: "flex", flexDirection: "column",
            overflowY: "hidden",
          }}>
            {rightFields.length > 0 && (
              <div style={{ marginBottom: 8 }}>
                {rightFields.map(([label, value]) => (
                  <FR key={label} label={label} value={value} />
                ))}
              </div>
            )}

            {gemRightFields.length > 0 && (
              <div style={{ marginBottom: 8 }}>
                <SubHdr label="Gemstone Details" />
                {gemRightFields.map(([label, value]) => (
                  <FR key={label} label={label} value={value} />
                ))}
              </div>
            )}

            {/* Marking(s) note — jewellery */}
            {isJ && cert.metalDescription && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: "#444", lineHeight: 1.55 }}>
                  <span style={{ fontWeight: 700 }}>*Marking(s):</span> {cert.metalDescription}
                </div>
                <div style={{ fontSize: 8.5, color: "#888", marginTop: 3, lineHeight: 1.5, fontStyle: "italic" }}>
                  *Marking(s) represent what is present and may not have been assessed by JewelsReport.
                </div>
              </div>
            )}

            {/* Comments */}
            {cert.remarks && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: "#444", lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 700 }}>Comments:</span> {cert.remarks}
                </div>
              </div>
            )}

            {/* ── Security / QR / Seal — pushed to bottom ── */}
            <div style={{ marginTop: "auto" }}>
              {/* Disclaimer (like GIA's small text) */}
              <p style={{ fontSize: 7.5, color: "#777", lineHeight: 1.6, marginBottom: 10 }}>
                The results documented in this report refer only to the article described, and were obtained using the techniques and equipment used by JewelsReport at the time of examination.
                This report is not a guarantee or valuation. For additional information please see jewelsreport.com/terms
              </p>

              {/* Seal + QR row */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 8 }}>
                {/* Circular certification seal */}
                <div style={{
                  width: 68, height: 68, flexShrink: 0,
                  borderRadius: "50%",
                  border: `2.5px solid ${G}`,
                  boxShadow: `0 0 0 1.5px rgba(184,146,42,0.2), inset 0 0 0 3px rgba(184,146,42,0.07)`,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  background: "#FAF6EE",
                }}>
                  <img src={logo} alt="" style={{ height: 34, width: 34, objectFit: "contain" }} />
                  <div style={{ fontSize: 5.5, fontWeight: 900, letterSpacing: "0.18em", textTransform: "uppercase", color: G, marginTop: 2 }}>CERTIFIED</div>
                </div>

                {/* QR code */}
                <div style={{
                  padding: 5, background: "#fff",
                  border: "1.5px solid rgba(184,146,42,0.35)",
                  borderRadius: 3, flexShrink: 0,
                }}>
                  <QRCodeSVG value={verifyUrl} size={68} level="M" />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 8, color: G, fontWeight: 700, lineHeight: 1.4, wordBreak: "break-all" }}>
                    reportcheck.jewelsreport.com
                  </div>
                  <div style={{ fontSize: 7.5, color: "#888", marginTop: 3 }}>
                    {cert.reportNo}
                  </div>
                </div>
              </div>

              {/* Security features box (like GIA's bottom box) */}
              <div style={{
                border: "1px solid #999",
                borderRadius: 2, padding: "4px 6px",
                background: "#F0EBE0",
              }}>
                <div style={{ fontSize: 6.5, fontWeight: 700, color: "#444", lineHeight: 1.55, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  The security features in this document include the hologram, QR code, and microprint lines in addition to those not listed. These features exceed standard document security industry guidelines. Verify at jewelsreport.com/verify
                </div>
              </div>
            </div>
          </div>

          {/* ── SECURITY STRIP (far right, like GIA's "FACSIMILE" strip) ── */}
          <div style={{
            width: CS, flexShrink: 0,
            background: SH_SEC,
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}>
            <div style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              fontSize: 6.5, fontWeight: 800,
              letterSpacing: "0.38em", textTransform: "uppercase",
              color: "rgba(184,146,42,0.75)",
              whiteSpace: "nowrap",
            }}>
              JEWELSREPORT · CERTIFIED · AUTHENTIC
            </div>
          </div>
        </div>

        {/* ══════ FOOTER ══════ */}
        <div style={{
          height: FTR_H, flexShrink: 0,
          borderTop: `3px solid ${G}`,
          background: "#F0EBE0",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px 0 14px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <img src={logo} alt="" style={{ height: 20, width: 20, objectFit: "contain", opacity: 0.65 }} />
            <span style={{
              fontFamily: "Georgia,'Times New Roman',serif",
              fontSize: 11, fontWeight: 700,
              letterSpacing: "0.1em", color: G,
            }}>
              jewelsreport.com
            </span>
          </div>
          <div style={{ fontSize: 8, color: "#888", letterSpacing: "0.05em" }}>
            Gemological Certification Lab · Surat, Gujarat, India
          </div>
        </div>

      </div>
    );
  }
);
