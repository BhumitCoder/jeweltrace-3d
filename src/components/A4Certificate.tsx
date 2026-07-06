import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { Certificate } from "@/lib/store";
import { REPORT_TYPE_LABELS } from "@/lib/store";
import logo from "@/assets/logo.png";

export const A4_W = 794;
export const A4_H = 1123;

const G     = "#B8922A";
const SH_L  = "#B8922A";
const SH_M  = "#8B6E1A";
const SH_R  = "#5F4A10";
const SEC   = "#1A0D00";

/* column widths must total 794 */
const CL = 238;
const CM = 278;
const CR = 256;
const CS = 22;

const HDR_H = 160;
const SHD_H = 24;
const FTR_H = 44;

/* ── GIA-style dotted field row ──────────────────── */
function FR({ label, value, size = 11 }: { label: string; value: string; size?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", marginBottom: 5 }}>
      <span style={{ fontSize: size, color: "#555", whiteSpace: "nowrap", lineHeight: 1.3, fontWeight: 400, flexShrink: 0 }}>
        {label}
      </span>
      <span style={{ flex: 1, borderBottom: "1.5px dotted #BBBBBB", margin: `0 4px ${size * 0.22}px`, minWidth: 6 }} />
      <span style={{ fontSize: size, fontWeight: 800, color: "#111", whiteSpace: "nowrap", lineHeight: 1.3, textTransform: "uppercase", letterSpacing: "0.02em" }}>
        {value}
      </span>
    </div>
  );
}

/* ── Amber sub-section bar ───────────────────────── */
function SubHdr({ label }: { label: string }) {
  return (
    <div style={{ background: SH_M, padding: "3px 8px", marginTop: 10, marginBottom: 6, borderRadius: 2 }}>
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

    /* ── Left-column fields ── */
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

    /* ── Extra left-column sub-sections ── */
    const hasDiamond = isJ && (cert.diamondShape || cert.diamondWeight || cert.diamondColor || cert.diamondClarity);
    const diamondFields: [string, string][] = hasDiamond ? ([
      ["Shape and Cut",       cert.diamondShape],
      ["Total Est. Weight",   cert.diamondWeight ? `${cert.diamondWeight} CT` : undefined],
      ["Total PCS",           cert.diamondTotalPcs],
      ["Color",               cert.diamondColor],
      ["Clarity",             cert.diamondClarity],
    ].filter(([, v]) => v) as [string, string][]) : [];

    /* ── Right-column fields ── */
    const rightFields: [string, string][] = (
      isJ ? [
        ["Total Stones",           cert.diamondTotalPcs],
        ["Est. Total Carat Wt.",  cert.diamondWeight ? `${cert.diamondWeight} CT` : undefined],
        ["Metal Tested As",        cert.metal],
        ["Item(s) Weight",         cert.grossWeight ? `${cert.grossWeight} GRM` : undefined],
      ] :
      isG ? [
        ["Stone",        cert.gemstoneStone],
        ["Origin",       cert.gemstoneOrigin],
        ["Carat Weight", cert.gemstoneCaratWeight],
      ] : [
        ["Carat Weight",  cert.caratWeight ? `${cert.caratWeight} carat` : undefined],
        ["Color Grade",   cert.color],
        ["Clarity Grade", cert.clarity],
        ["Cut Grade",     cert.cut],
      ]
    ).filter(([, v]) => v) as [string, string][];

    const gemRightFields: [string, string][] = isJ && cert.gemstoneStone ? ([
      ["Stone",   cert.gemstoneStone],
      ["Origin",  cert.gemstoneOrigin],
      ["Weight",  cert.gemstoneCaratWeight],
      ["PCS",     cert.gemstonePcs],
    ].filter(([, v]) => v) as [string, string][]) : [];

    const leftHdr = isG
      ? "GEMSTONE GRADING REPORT"
      : isJ
      ? "JEWELLERY GRADING REPORT"
      : `${cert.type.replace("Natural ", "").replace("Lab Grown ", "").toUpperCase()} GRADING REPORT`;

    const hasImg  = !!(cert.imageDataUrl || cert.imageDataUrl2);
    const has2Img = !!(cert.imageDataUrl && cert.imageDataUrl2);
    const bodyH = A4_H - HDR_H - SHD_H - FTR_H;

    return (
      <div ref={ref} style={{
        width: A4_W, height: A4_H,
        background: "#FFFFFF",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}>

        {/* ═══ Full-page watermark (fills empty space beautifully) ═══ */}
        <img src={logo} alt="" aria-hidden style={{
          position: "absolute",
          width: 480, height: 480,
          objectFit: "contain",
          opacity: 0.028,
          left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
          zIndex: 0,
        }} />

        {/* ═══ HEADER ═══ */}
        <div style={{
          height: HDR_H, flexShrink: 0,
          background: "#FFFFFF",
          borderBottom: `3px solid ${G}`,
          position: "relative", zIndex: 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "0 24px",
        }}>
          {/* Logo – top left, like GIA badge */}
          <img src={logo} alt="JewelsReport" style={{
            position: "absolute", left: 22, top: "50%",
            transform: "translateY(-50%)",
            height: 100, width: 100, objectFit: "contain",
          }} />

          {/* Centred title block */}
          <div style={{ textAlign: "center", zIndex: 1 }}>
            <div style={{
              fontFamily: "Georgia,'Times New Roman',serif",
              fontSize: 29, fontWeight: 700, letterSpacing: "0.06em",
              color: "#111", lineHeight: 1, textTransform: "uppercase",
            }}>
              JewelsReport
            </div>
            <div style={{
              fontSize: 9, letterSpacing: "0.44em", textTransform: "uppercase",
              color: "#666", marginTop: 3, fontWeight: 600,
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
              textTransform: "uppercase", color: G,
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
              textDecoration: "underline", fontWeight: 600,
              letterSpacing: "0.04em",
            }}>
              Verify this report at jewelsreport.com/verify
            </div>
            <div style={{
              fontFamily: "Georgia,'Times New Roman',serif",
              fontSize: 19, fontWeight: 700, color: "#111",
              marginTop: 6,
            }}>
              {fmtDate(cert.issueDate)}
            </div>
          </div>
        </div>

        {/* ═══ SECTION HEADER BAR ═══ */}
        <div style={{ display: "flex", flexShrink: 0, zIndex: 1, position: "relative" }}>
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
          <div style={{ width: CS, background: SEC }} />
        </div>

        {/* ═══ 3-COLUMN BODY — fixed pixel height, no overflow ═══ */}
        <div style={{
          display: "flex",
          height: bodyH,
          flexShrink: 0,
          position: "relative", zIndex: 1,
        }}>

          {/* ── LEFT COLUMN ── */}
          <div style={{
            width: CL, flexShrink: 0,
            borderRight: "1px solid #D8D0C0",
            padding: "10px 10px 10px 12px",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
          }}>
            {/* "Certified by JewelsReport" badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: 7,
              background: "#F5F0E8", border: "1px solid #D8C9A0",
              borderRadius: 3, padding: "5px 8px", marginBottom: 10,
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

            {mainFields.map(([label, value]) => (
              <FR key={label} label={label} value={value as string} />
            ))}

            {diamondFields.length > 0 && (
              <>
                <SubHdr label="Additional Diamond Details" />
                {cert.diamondTotalPcs && (
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: "#111", marginBottom: 5 }}>
                    Section A: {cert.diamondTotalPcs} Diamond(s)
                  </div>
                )}
                {diamondFields.map(([label, value]) => (
                  <FR key={label} label={label} value={value} />
                ))}
              </>
            )}

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

            {cert.remarks && (
              <div style={{ marginTop: 10, padding: "6px 8px", background: "rgba(184,146,42,0.07)", borderLeft: `2.5px solid ${G}`, borderRadius: "0 3px 3px 0" }}>
                <div style={{ fontSize: 8, fontWeight: 800, textTransform: "uppercase", color: G, marginBottom: 2, letterSpacing: "0.15em" }}>Remarks</div>
                <div style={{ fontSize: 10, color: "#333", lineHeight: 1.55 }}>{cert.remarks}</div>
              </div>
            )}

            {/* Decorative filler — grows to fill remaining left-column space */}
            <div style={{
              flex: 1, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", padding: "12px 0",
            }}>
              <div style={{
                width: 60, height: 60, borderRadius: "50%",
                border: `1.5px solid rgba(184,146,42,0.25)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(184,146,42,0.04)",
                marginBottom: 8,
              }}>
                <img src={logo} alt="" style={{ height: 32, width: 32, objectFit: "contain", opacity: 0.35 }} />
              </div>
              <div style={{ fontSize: 7.5, color: "rgba(184,146,42,0.45)", letterSpacing: "0.22em", textTransform: "uppercase", textAlign: "center", lineHeight: 1.6 }}>
                Gemological<br />Certification Lab
              </div>
            </div>

            {/* Signature — always pinned to bottom */}
            <div style={{ paddingTop: 8, flexShrink: 0 }}>
              <div style={{ minHeight: 44, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4 }}>
                {cert.signatureDataUrl && (
                  <img src={cert.signatureDataUrl} alt="Signature"
                    style={{ maxHeight: 44, maxWidth: "90%", objectFit: "contain" }} />
                )}
              </div>
              <div style={{ borderTop: "1px solid #888", paddingTop: 4, textAlign: "center" }}>
                <div style={{ fontSize: 8.5, color: "#333", fontWeight: 600, letterSpacing: "0.08em" }}>Authorised Signatory</div>
                <div style={{ fontSize: 7.5, color: "#999", letterSpacing: "0.05em", marginTop: 1 }}>JewelsReport Certification Lab</div>
              </div>
            </div>
          </div>

          {/* ── MIDDLE COLUMN — images stretch to fill full height ── */}
          <div style={{
            width: CM, flexShrink: 0,
            borderRight: "1px solid #D8D0C0",
            padding: cert.description ? "12px 12px" : "10px 10px",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
          }}>
            {cert.description && (
              <p style={{ fontSize: 11, color: "#333", lineHeight: 1.72, marginBottom: 10, flexShrink: 0 }}>
                {cert.description}
              </p>
            )}

            {/* Image area — fills ALL remaining space */}
            <div style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
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

              {/* No image: show a large branded placeholder that fills the space */}
              {!hasImg && (
                <div style={{
                  flex: 1, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(160deg,#F5F0E8 0%,#FAF7F2 100%)",
                  border: "1.5px dashed rgba(184,146,42,0.3)",
                  borderRadius: 4,
                }}>
                  <img src={logo} alt="" style={{ height: 72, opacity: 0.18, marginBottom: 12 }} />
                  <div style={{ fontSize: 9.5, color: "#CCC", letterSpacing: "0.25em", textTransform: "uppercase" }}>No Image Provided</div>
                </div>
              )}
            </div>

            {hasImg && (
              <p style={{ fontSize: 9, color: "#999", textAlign: "center", marginTop: 6, fontStyle: "italic", flexShrink: 0 }}>
                Image is approximate
              </p>
            )}
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div style={{
            width: CR, flexShrink: 0,
            padding: "12px 12px",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
          }}>
            {/* Item detail fields */}
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

            {isJ && cert.metalDescription && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: "#444", lineHeight: 1.55 }}>
                  <span style={{ fontWeight: 700 }}>*Marking(s):</span> {cert.metalDescription}
                </div>
                <div style={{ fontSize: 8.5, color: "#888", marginTop: 3, lineHeight: 1.4, fontStyle: "italic" }}>
                  *Marking(s) represent what is present and may not have been assessed by JewelsReport.
                </div>
              </div>
            )}

            {cert.remarks && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: "#444", lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 700 }}>Comments:</span> {cert.remarks}
                </div>
              </div>
            )}

            {/* Disclaimer fills all remaining space — no dead gap */}
            <p style={{ flex: 1, fontSize: 7.5, color: "#777", lineHeight: 1.72, marginBottom: 10, overflow: "hidden" }}>
              The results documented in this report refer only to the article described, and were obtained using the techniques and equipment used by JewelsReport at the time of examination. This report is not a guarantee or valuation. For additional information and important limitations and disclaimers, please see jewelsreport.com/terms or contact the JewelsReport Gemological Certification Lab directly. ©{new Date().getFullYear()} JewelsReport Gemological Certification Lab. All rights reserved.
            </p>

            {/* Seal + QR — pinned to bottom */}
            <div style={{ flexShrink: 0 }}>

              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 8 }}>
                {/* Circular certification seal */}
                <div style={{
                  width: 70, height: 70, flexShrink: 0,
                  borderRadius: "50%",
                  border: `2.5px solid ${G}`,
                  boxShadow: `0 0 0 1.5px rgba(184,146,42,0.2), inset 0 0 0 3px rgba(184,146,42,0.06)`,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  background: "#FAF6EE",
                }}>
                  <img src={logo} alt="" style={{ height: 35, width: 35, objectFit: "contain" }} />
                  <div style={{ fontSize: 5.5, fontWeight: 900, letterSpacing: "0.18em", textTransform: "uppercase", color: G, marginTop: 2 }}>CERTIFIED</div>
                </div>

                {/* QR code */}
                <div style={{
                  padding: 5, background: "#fff",
                  border: "1.5px solid rgba(184,146,42,0.35)",
                  borderRadius: 3, flexShrink: 0,
                }}>
                  <QRCodeSVG value={verifyUrl} size={70} level="M" />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 7.5, color: G, fontWeight: 700, lineHeight: 1.5, wordBreak: "break-all" }}>
                    reportcheck.jewelsreport.com
                  </div>
                  <div style={{ fontSize: 7.5, color: "#888", marginTop: 3 }}>
                    {cert.reportNo}
                  </div>
                </div>
              </div>

              {/* Security features box */}
              <div style={{ border: "1px solid #999", borderRadius: 2, padding: "4px 6px", background: "#F0EBE0" }}>
                <div style={{ fontSize: 6.5, fontWeight: 700, color: "#444", lineHeight: 1.55, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  The security features in this document include the hologram, QR code and microprint lines in addition to those not listed. These features exceed standard document security industry guidelines. Verify at jewelsreport.com/verify
                </div>
              </div>
            </div>
          </div>

          {/* ── SECURITY STRIP ── */}
          <div style={{
            width: CS, flexShrink: 0,
            background: SEC,
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

        {/* ═══ FOOTER ═══ */}
        <div style={{
          height: FTR_H, flexShrink: 0,
          borderTop: `3px solid ${G}`,
          background: "#F0EBE0",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px 0 14px",
          position: "relative", zIndex: 1,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <img src={logo} alt="" style={{ height: 20, width: 20, objectFit: "contain", opacity: 0.65 }} />
            <span style={{
              fontFamily: "Georgia,'Times New Roman',serif",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: G,
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
