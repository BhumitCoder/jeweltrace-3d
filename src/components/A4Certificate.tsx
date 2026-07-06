import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { Certificate } from "@/lib/store";
import { REPORT_TYPE_LABELS } from "@/lib/store";
import logo from "@/assets/logo.png";

/* ── Landscape A4 (297 × 210 mm @ 96 dpi) ─────────────────────────────────── */
export const A4_W = 1122;
export const A4_H = 794;
const PANEL = 374; // 1122 / 3

/* ── Palette (GIA-inspired: muted olive-gold + clean white) ────────────────── */
const G       = "#B8922A";   // brand gold (accents, highlights)
const BAR     = "#7D6A14";   // section header bar – olive-gold
const BAR_TXT = "#FFFFFF";
const RULE    = "#CCBFA0";   // horizontal rule / light dividers
const FG1     = "#111111";   // primary text
const FG2     = "#555555";   // label text
const FG3     = "#888888";   // caption / tertiary

/* ── GIA-style dotted-leader row ──────────────────────────────────────────── */
function FR({
  label, value, large, indent,
}: { label: string; value: string; large?: boolean; indent?: boolean }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-end",
      marginBottom: large ? 7 : 4.5, minWidth: 0,
      paddingLeft: indent ? 8 : 0,
    }}>
      <span style={{
        fontSize: large ? 11.5 : 10, color: FG2,
        lineHeight: 1.3, fontWeight: 400, flexShrink: 0, whiteSpace: "nowrap",
      }}>
        {label}
      </span>
      <span style={{
        flex: 1, borderBottom: `1.5px dotted ${RULE}`,
        margin: "0 5px 2px", minWidth: 8,
      }} />
      <span style={{
        fontSize: large ? 11.5 : 10, fontWeight: 800,
        color: FG1, lineHeight: 1.3,
        textTransform: "uppercase", letterSpacing: "0.03em",
        textAlign: "right", wordBreak: "break-word", maxWidth: "58%",
      }}>
        {value}
      </span>
    </div>
  );
}

/* ── Section header bar (GIA olive-gold style) ─────────────────────────────── */
function Bar({ label }: { label: string }) {
  return (
    <div style={{
      background: BAR,
      padding: "4px 10px", marginBottom: 8, marginTop: 10,
    }}>
      <span style={{
        fontSize: 7, fontWeight: 800, letterSpacing: "0.22em",
        textTransform: "uppercase", color: BAR_TXT,
      }}>
        {label}
      </span>
    </div>
  );
}

/* ── Thin horizontal rule ─────────────────────────────────────────────────── */
function Rule() {
  return <div style={{ borderTop: `1px solid ${RULE}`, margin: "7px 0" }} />;
}

/* ── Grade scale cell ─────────────────────────────────────────────────────── */
function ScaleCell({
  grade, label, active, first, last,
}: { grade: string; label?: string; active?: boolean; first?: boolean; last?: boolean }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 5,
      paddingLeft: 6, paddingRight: 6,
      borderTop: first ? `1px solid ${active ? G : "#CCC"}` : "none",
      borderBottom: `1px solid ${active ? G : "#CCC"}`,
      borderLeft: `1px solid ${active ? G : "#CCC"}`,
      borderRight: `1px solid ${active ? G : "#CCC"}`,
      background: active ? G : "#FAFAF8",
      flex: 1,
    }}>
      <span style={{
        fontSize: 7.5, fontWeight: active ? 900 : 500,
        color: active ? "#fff" : FG2,
        letterSpacing: "0.04em", lineHeight: 1.1,
        minWidth: 22, textAlign: "left",
      }}>
        {grade}
      </span>
      {label && (
        <span style={{
          fontSize: 6.5, fontWeight: active ? 700 : 400,
          color: active ? "rgba(255,255,255,0.9)" : "#AAA",
          textTransform: "uppercase", letterSpacing: "0.06em",
        }}>
          {label}
        </span>
      )}
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
    const isDiamond = !isJ && !isG;

    const fmtDate = (d: string) => {
      try {
        return new Date(d).toLocaleDateString("en-IN", {
          day: "2-digit", month: "long", year: "numeric",
        });
      } catch { return d; }
    };

    /* ── Grading scale data ──────────────────────────────────────────────────── */
    const colorGrades = ["D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    const colorLabels: Record<string,string> = {
      D:"Colorless",E:"",F:"",
      G:"Near Colorless",H:"",I:"",J:"",
      K:"Faint",L:"",M:"",
      N:"Very Light",O:"",P:"",Q:"",R:"",
      S:"Light",T:"",U:"",V:"",W:"",X:"",Y:"",Z:"",
    };
    const clarityGrades = ["FL","IF","VVS1","VVS2","VS1","VS2","SI1","SI2","I1","I2","I3"];
    const clarityLabels: Record<string,string> = {
      FL:"Flawless",IF:"Internally Flawless",
      VVS1:"Very Very Slightly Included",VVS2:"",
      VS1:"Very Slightly Included",VS2:"",
      SI1:"Slightly Included",SI2:"",
      I1:"Included",I2:"",I3:"",
    };
    const cutGrades = ["Excellent","Very Good","Good","Fair","Poor"];

    const activeColor   = (cert.color   || "").toUpperCase().trim();
    const activeClarity = (cert.clarity || "").toUpperCase().trim();
    const activeCut     = (cert.cut     || "").replace(/\s+/g,"_").toUpperCase();

    const hasImg  = !!(cert.imageDataUrl || cert.imageDataUrl2);
    const has2Img = !!(cert.imageDataUrl && cert.imageDataUrl2);

    /* ── Left panel main fields ─────────────────────────────────────────────── */
    let identFields: [string, string][] = [];
    let gradingFields: [string, string][] = [];
    let additionalFields: [string, string][] = [];

    if (isG) {
      identFields = ([
        ["GRL Report Number",         cert.reportNo],
        ["Stone",                     cert.gemstoneStone],
        ["Shape and Cutting Style",   cert.gemstoneShape],
        ["Measurements",              cert.gemstoneMeasurements],
        ["Issue Date",                fmtDate(cert.issueDate)],
      ] as [string,string|undefined][]).filter(([,v])=>v) as [string,string][];
      gradingFields = ([
        ["Carat Weight",           cert.gemstoneCaratWeight],
        ["PCS",                    cert.gemstonePcs],
        ["Color and Transparency", cert.gemstoneColorTransparency],
        ["Origin",                 cert.gemstoneOrigin],
        ["Characteristics",        cert.gemstoneCharacteristics],
      ] as [string,string|undefined][]).filter(([,v])=>v) as [string,string][];
    } else if (isJ) {
      identFields = ([
        ["GRL Report Number", cert.reportNo],
        ["Item",              cert.itemName],
        ["Shape",             cert.shape],
        ["Metal Tested As",   cert.metal],
        ["Issue Date",        fmtDate(cert.issueDate)],
      ] as [string,string|undefined][]).filter(([,v])=>v) as [string,string][];
      gradingFields = ([
        ["Gross Weight",           cert.grossWeight ? `${cert.grossWeight} GRM` : undefined],
        ["Net Weight",             cert.netWeight   ? `${cert.netWeight} GRM`   : undefined],
        ["Diamond Total PCS",      cert.diamondTotalPcs],
        ["Diamond Est. Weight",    cert.diamondWeight ? `${cert.diamondWeight} CT` : undefined],
        ["Diamond Color",          cert.diamondColor],
        ["Diamond Clarity",        cert.diamondClarity],
        ["Origin",                 cert.origin],
      ] as [string,string|undefined][]).filter(([,v])=>v) as [string,string][];
      additionalFields = ([
        ["Metal Description", cert.metalDescription],
        ["Gemstone",          cert.gemstoneStone],
        ["Gemstone Origin",   cert.gemstoneOrigin],
        ["Gemstone Weight",   cert.gemstoneCaratWeight],
      ] as [string,string|undefined][]).filter(([,v])=>v) as [string,string][];
    } else {
      identFields = ([
        ["GRL Report Number",              cert.reportNo],
        ["Shape(s) and Cutting Style(s)",  cert.shape],
        ["Measurements",                   cert.measurements],
        ["Issue Date",                     fmtDate(cert.issueDate)],
      ] as [string,string|undefined][]).filter(([,v])=>v) as [string,string][];
      gradingFields = ([
        ["Carat Weight",  cert.caratWeight ? `${cert.caratWeight} carat` : undefined],
        ["Color Grade",   cert.color],
        ["Clarity Grade", cert.clarity],
        ["Cut Grade",     cert.cut],
      ] as [string,string|undefined][]).filter(([,v])=>v) as [string,string][];
      additionalFields = ([
        ["Polish Grade",    cert.polish],
        ["Symmetry Grade",  cert.symmetry],
        ["Fluorescence",    cert.fluorescence],
        ["Origin",          cert.origin],
      ] as [string,string|undefined][]).filter(([,v])=>v) as [string,string][];
    }

    const reportTypeLabel = REPORT_TYPE_LABELS[cert.type] ?? cert.type;
    const leftHdr = isG
      ? "GEMSTONE GRADING REPORT"
      : isJ
      ? "JEWELLERY GRADING REPORT"
      : `${cert.type.replace("Natural ","").replace("Lab Grown ","").toUpperCase()} GRADING REPORT`;

    /* ────────────────────────────────────────────────────────────────────────── */
    return (
      <div ref={ref} style={{
        width: A4_W, height: A4_H,
        background: "#FFFFFF",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        border: `1px solid ${RULE}`,
      }}>

        {/* ════════════════════════════════════════════════════════════════════
            PANEL 1 — MAIN GRADING REPORT
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{
          width: PANEL, height: A4_H, flexShrink: 0,
          borderRight: `1px solid ${RULE}`,
          display: "flex", flexDirection: "column",
        }}>

          {/* ── Top identity strip ── */}
          <div style={{
            display: "flex", alignItems: "center",
            padding: "10px 12px 8px 12px",
            borderBottom: `1px solid ${RULE}`,
            gap: 10,
          }}>
            <img src={logo} alt="JewelsReport" style={{ height: 46, width: 46, objectFit: "contain", flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: "Georgia,'Times New Roman',serif",
                fontSize: 17, fontWeight: 700,
                color: FG1, letterSpacing: "0.05em",
                lineHeight: 1,
              }}>
                Jewels<span style={{ color: G }}>Report</span>
              </div>
              <div style={{ fontSize: 6.5, color: FG3, letterSpacing: "0.4em", textTransform: "uppercase", marginTop: 2 }}>
                Gemological Certification Lab
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 7, color: FG3, letterSpacing: "0.1em", textTransform: "uppercase" }}>GRL Report Number</div>
              <div style={{
                fontFamily: "'Courier New',monospace",
                fontSize: 10.5, fontWeight: 800, color: FG1, letterSpacing: "0.06em",
              }}>
                {cert.reportNo}
              </div>
              <div style={{ fontSize: 6.5, color: G, marginTop: 1, letterSpacing: "0.04em" }}>
                jewelsreport.com/verify
              </div>
            </div>
          </div>

          {/* ── Body ── */}
          <div style={{ flex: 1, padding: "0 12px 10px 12px", display: "flex", flexDirection: "column", overflowY: "hidden" }}>

            {/* Identification */}
            <div style={{ paddingTop: 2 }}>
              <Bar label={`JewelsReport ${leftHdr}`} />
              {identFields.map(([l,v]) => <FR key={l} label={l} value={v} />)}
            </div>

            <Rule />

            {/* Grading Results */}
            <div>
              <Bar label="Grading Results" />
              {gradingFields.map(([l,v]) => <FR key={l} label={l} value={v} large={isDiamond} />)}
            </div>

            {(additionalFields.length > 0 || cert.polish || cert.symmetry || cert.fluorescence) && (
              <>
                <Rule />
                <div>
                  <Bar label="Additional Grading Information" />
                  {additionalFields.map(([l,v]) => <FR key={l} label={l} value={v} />)}
                </div>
              </>
            )}

            {cert.remarks && (
              <>
                <Rule />
                <div>
                  <div style={{ fontSize: 7.5, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: FG2, marginBottom: 3 }}>
                    Remarks
                  </div>
                  <div style={{ fontSize: 9.5, color: FG2, lineHeight: 1.6 }}>{cert.remarks}</div>
                </div>
              </>
            )}

            {cert.description && (
              <>
                <Rule />
                <div>
                  <div style={{ fontSize: 7.5, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: FG2, marginBottom: 3 }}>
                    Comments
                  </div>
                  <div style={{ fontSize: 9.5, color: FG2, lineHeight: 1.6 }}>{cert.description}</div>
                </div>
              </>
            )}

            {/* ── Signature ── */}
            <div style={{ marginTop: "auto", borderTop: `1px solid ${RULE}`, paddingTop: 8 }}>
              <div style={{ minHeight: 38, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 3 }}>
                {cert.signatureDataUrl && (
                  <img src={cert.signatureDataUrl} alt="Signature"
                    style={{ maxHeight: 38, maxWidth: "88%", objectFit: "contain" }} />
                )}
              </div>
              <div style={{ borderTop: `1px solid #CCC`, paddingTop: 3, textAlign: "center" }}>
                <div style={{ fontSize: 8, color: FG2, fontWeight: 700, letterSpacing: "0.08em" }}>Authorised Signatory</div>
                <div style={{ fontSize: 7, color: FG3, letterSpacing: "0.06em", marginTop: 1 }}>JewelsReport Certification Lab</div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div style={{
            borderTop: `2px solid ${G}`,
            padding: "5px 12px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: 8, color: G, fontWeight: 700, letterSpacing: "0.12em", textTransform: "lowercase" }}>
              jewelsreport.com
            </span>
            <span style={{ fontSize: 7, color: FG3, letterSpacing: "0.04em" }}>
              Gemological Certification Lab · Surat, Gujarat, India
            </span>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            PANEL 2 — PROPORTIONS / ITEM IMAGE
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{
          width: PANEL, height: A4_H, flexShrink: 0,
          borderRight: `1px solid ${RULE}`,
          display: "flex", flexDirection: "column",
          background: "#FDFCFA",
        }}>
          {/* Top: Report number reference (GIA style) */}
          <div style={{
            padding: "8px 12px 6px",
            borderBottom: `1px solid ${RULE}`,
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          }}>
            <div style={{ fontSize: 7, color: FG3, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {reportTypeLabel}
            </div>
            <div style={{
              fontFamily: "'Courier New',monospace",
              fontSize: 9.5, fontWeight: 800, color: FG1, letterSpacing: "0.05em",
            }}>
              {cert.reportNo}
            </div>
          </div>

          {/* Image / Proportions section */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 0 0 0", overflowY: "hidden" }}>

            {hasImg ? (
              <>
                <div style={{ padding: "0 12px" }}>
                  <Bar label={has2Img ? "Item Images" : "Item Image"} />
                </div>
                <div style={{
                  flex: 1,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  gap: has2Img ? 8 : 0,
                  padding: "4px 16px",
                }}>
                  {cert.imageDataUrl && (
                    <div style={{
                      width: "100%",
                      flex: has2Img ? "1" : undefined,
                      maxHeight: has2Img ? 280 : 540,
                      border: `1px solid rgba(184,146,42,0.3)`,
                      borderRadius: 3,
                      overflow: "hidden",
                      background: "#F0EBE0",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <img src={cert.imageDataUrl} alt="Item"
                        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                    </div>
                  )}
                  {cert.imageDataUrl2 && (
                    <div style={{
                      width: "100%",
                      flex: "1",
                      maxHeight: 280,
                      border: `1px solid rgba(184,146,42,0.3)`,
                      borderRadius: 3, overflow: "hidden",
                      background: "#F0EBE0",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <img src={cert.imageDataUrl2} alt="Item"
                        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "center", padding: "6px 12px 8px" }}>
                  <div style={{ fontSize: 8.5, color: FG3, fontStyle: "italic" }}>Image is approximate</div>
                </div>
              </>
            ) : (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <img src={logo} alt="" style={{ height: 52, opacity: 0.1, marginBottom: 12 }} />
                <div style={{ fontSize: 8.5, color: "#CCC", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  No Image Provided
                </div>
              </div>
            )}

            {/* Key to symbols / item details */}
            {(isJ && (cert.metal || cert.metalDescription)) && (
              <div style={{ padding: "0 12px 10px" }}>
                <Bar label="Metal & Stone Details" />
                {cert.metal && <FR label="Metal Tested As" value={cert.metal} />}
                {cert.metalDescription && (
                  <div style={{ fontSize: 8.5, color: FG2, lineHeight: 1.6, marginTop: 4, fontStyle: "italic" }}>
                    *{cert.metalDescription}
                  </div>
                )}
                {cert.gemstoneStone && <FR label="Gemstone" value={cert.gemstoneStone} />}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            borderTop: `2px solid ${G}`,
            padding: "5px 12px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: 8, color: G, fontWeight: 700, letterSpacing: "0.12em" }}>Verify this report</span>
            <span style={{ fontSize: 7, color: FG3 }}>jewelsreport.com/verify</span>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            PANEL 3 — GRADING SCALES + SECURITY
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{
          width: PANEL, height: A4_H, flexShrink: 0,
          display: "flex", flexDirection: "column",
          background: "#FDFCFA",
        }}>
          {/* Top reference */}
          <div style={{
            padding: "8px 12px 6px",
            borderBottom: `1px solid ${RULE}`,
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          }}>
            <div style={{ fontSize: 7, color: FG3, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              GRL Scales
            </div>
            <div style={{ fontSize: 7, color: FG3, letterSpacing: "0.04em" }}>
              Verify full report at gia.edu
            </div>
          </div>

          {/* Grading Scales */}
          <div style={{ padding: "0 12px" }}>
            <Bar label="Grading Scales" />
          </div>

          {isDiamond ? (
            /* ── Diamond: Color / Clarity / Cut columns ── */
            <div style={{
              display: "flex", gap: 6, padding: "0 10px", flex: 1, overflowY: "hidden",
              maxHeight: 420,
            }}>
              {/* Color Scale */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
                <div style={{
                  fontSize: 6.5, fontWeight: 800, letterSpacing: "0.15em",
                  textTransform: "uppercase", color: FG2,
                  textAlign: "center", marginBottom: 4,
                  borderBottom: `1px solid ${RULE}`, paddingBottom: 3,
                }}>
                  GIA Color Scale
                </div>
                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  {colorGrades.map((g, i) => {
                    const isActive = g === activeColor;
                    const lbl = colorLabels[g];
                    return (
                      <div key={g} style={{
                        display: "flex", alignItems: "center",
                        flex: 1,
                        borderLeft: `1px solid ${isActive ? G : "#D8D0C0"}`,
                        borderRight: `1px solid ${isActive ? G : "#D8D0C0"}`,
                        borderTop: i === 0 ? `1px solid ${isActive ? G : "#D8D0C0"}` : "none",
                        borderBottom: `1px solid ${isActive ? G : "#D8D0C0"}`,
                        background: isActive ? G : (i % 2 === 0 ? "#F8F5F0" : "#FFFFFF"),
                        padding: "1.5px 5px",
                      }}>
                        <span style={{
                          fontSize: 7.5, fontWeight: isActive ? 900 : 500,
                          color: isActive ? "#fff" : FG2,
                          letterSpacing: "0.05em", minWidth: 16,
                        }}>
                          {g}
                        </span>
                        {lbl && (
                          <span style={{
                            fontSize: 5.5, color: isActive ? "rgba(255,255,255,0.85)" : "#BBB",
                            textTransform: "uppercase", letterSpacing: "0.04em",
                            whiteSpace: "nowrap", overflow: "hidden",
                            textOverflow: "ellipsis", flex: 1,
                          }}>
                            {lbl}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Clarity Scale */}
              <div style={{ flex: 1.1, display: "flex", flexDirection: "column", minWidth: 0 }}>
                <div style={{
                  fontSize: 6.5, fontWeight: 800, letterSpacing: "0.15em",
                  textTransform: "uppercase", color: FG2,
                  textAlign: "center", marginBottom: 4,
                  borderBottom: `1px solid ${RULE}`, paddingBottom: 3,
                }}>
                  GIA Clarity Scale
                </div>
                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  {clarityGrades.map((g, i) => {
                    const isActive = g === activeClarity;
                    const lbl = clarityLabels[g];
                    return (
                      <div key={g} style={{
                        display: "flex", flexDirection: "column", justifyContent: "center",
                        flex: 1,
                        borderLeft: `1px solid ${isActive ? G : "#D8D0C0"}`,
                        borderRight: `1px solid ${isActive ? G : "#D8D0C0"}`,
                        borderTop: i === 0 ? `1px solid ${isActive ? G : "#D8D0C0"}` : "none",
                        borderBottom: `1px solid ${isActive ? G : "#D8D0C0"}`,
                        background: isActive ? G : (i % 2 === 0 ? "#F8F5F0" : "#FFFFFF"),
                        padding: "2px 5px",
                      }}>
                        <span style={{
                          fontSize: 8, fontWeight: isActive ? 900 : 600,
                          color: isActive ? "#fff" : FG1,
                          letterSpacing: "0.04em",
                        }}>
                          {g}
                        </span>
                        {lbl && (
                          <span style={{
                            fontSize: 5.5, color: isActive ? "rgba(255,255,255,0.8)" : FG3,
                            textTransform: "uppercase", letterSpacing: "0.04em",
                            lineHeight: 1.2,
                          }}>
                            {lbl}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cut Scale */}
              <div style={{ flex: 1.2, display: "flex", flexDirection: "column", minWidth: 0 }}>
                <div style={{
                  fontSize: 6.5, fontWeight: 800, letterSpacing: "0.15em",
                  textTransform: "uppercase", color: FG2,
                  textAlign: "center", marginBottom: 4,
                  borderBottom: `1px solid ${RULE}`, paddingBottom: 3,
                }}>
                  GIA Cut Scale
                </div>
                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  {cutGrades.map((g, i) => {
                    const isActive = g.toUpperCase() === (cert.cut || "").toUpperCase();
                    return (
                      <div key={g} style={{
                        display: "flex", flexDirection: "column", justifyContent: "center",
                        flex: 1,
                        borderLeft: `1px solid ${isActive ? G : "#D8D0C0"}`,
                        borderRight: `1px solid ${isActive ? G : "#D8D0C0"}`,
                        borderTop: i === 0 ? `1px solid ${isActive ? G : "#D8D0C0"}` : "none",
                        borderBottom: `1px solid ${isActive ? G : "#D8D0C0"}`,
                        background: isActive ? G : (i % 2 === 0 ? "#F8F5F0" : "#FFFFFF"),
                        padding: "2px 8px",
                      }}>
                        <span style={{
                          fontSize: 8.5, fontWeight: isActive ? 900 : 500,
                          color: isActive ? "#fff" : FG1,
                        }}>
                          {g}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* ── Non-diamond: item details summary ── */
            <div style={{ padding: "0 12px", flex: 1 }}>
              {isG && ([
                ["Stone",            cert.gemstoneStone],
                ["Origin",           cert.gemstoneOrigin],
                ["Carat Weight",     cert.gemstoneCaratWeight],
                ["Color",            cert.gemstoneColorTransparency],
                ["Characteristics",  cert.gemstoneCharacteristics],
              ] as [string,string|undefined][]).filter(([,v])=>v).map(([l,v]) => (
                <FR key={l} label={l} value={v as string} large />
              ))}
              {isJ && ([
                ["Item",            cert.itemName],
                ["Metal",           cert.metal],
                ["Gross Weight",    cert.grossWeight ? `${cert.grossWeight} GRM` : undefined],
                ["Diamond Color",   cert.diamondColor],
                ["Diamond Clarity", cert.diamondClarity],
              ] as [string,string|undefined][]).filter(([,v])=>v).map(([l,v]) => (
                <FR key={l} label={l} value={v as string} large />
              ))}
            </div>
          )}

          {/* ── Security / QR / Seal block ── */}
          <div style={{
            borderTop: `1px solid ${RULE}`,
            padding: "10px 14px 0 14px",
            display: "flex", flexDirection: "column",
          }}>
            {/* Seal + QR row */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
              {/* Certified Seal */}
              <div style={{
                width: 66, height: 66, flexShrink: 0,
                borderRadius: "50%",
                border: `2px solid ${G}`,
                boxShadow: `0 0 0 1px rgba(184,146,42,0.18)`,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                background: "#FAF6EE",
              }}>
                <img src={logo} alt="" style={{ height: 30, width: 30, objectFit: "contain" }} />
                <div style={{
                  fontSize: 5, fontWeight: 900, letterSpacing: "0.2em",
                  textTransform: "uppercase", color: G, marginTop: 2,
                }}>
                  CERTIFIED
                </div>
              </div>

              {/* QR Code */}
              <div style={{
                padding: 4, background: "#fff",
                border: `1px solid rgba(184,146,42,0.35)`,
                borderRadius: 3, flexShrink: 0,
              }}>
                <QRCodeSVG value={verifyUrl} size={58} level="M" />
              </div>

              {/* Report ID + verify link */}
              <div style={{ flex: 1, minWidth: 0, paddingTop: 4 }}>
                <div style={{ fontSize: 7.5, color: G, fontWeight: 700, lineHeight: 1.5 }}>
                  reportcheck.jewelsreport.com
                </div>
                <div style={{
                  fontFamily: "'Courier New',monospace",
                  fontSize: 8, color: FG2, marginTop: 2, letterSpacing: "0.04em",
                }}>
                  {cert.reportNo}
                </div>
                <div style={{ fontSize: 7, color: FG3, marginTop: 3, lineHeight: 1.5 }}>
                  Scan QR to verify or visit jewelsreport.com/verify
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p style={{
              fontSize: 7, color: FG3, lineHeight: 1.65,
              marginBottom: 8,
            }}>
              The results documented in this report refer only to the article described, and were obtained using the techniques and equipment used by JewelsReport at the time of examination. This report is not a guarantee or valuation. For additional information please see jewelsreport.com/terms
            </p>

            {/* Security features box */}
            <div style={{
              border: `1px solid #C0B090`,
              borderRadius: 2, padding: "4px 7px",
              background: "#F5F0E4",
              marginBottom: 10,
            }}>
              <div style={{
                fontSize: 6, fontWeight: 700, color: "#666",
                lineHeight: 1.65, textTransform: "uppercase", letterSpacing: "0.04em",
              }}>
                The security features in this document include the hologram, QR code, and microprint lines in addition to those not listed. These features exceed standard document security industry guidelines. Verify at jewelsreport.com/verify
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            borderTop: `2px solid ${G}`,
            padding: "5px 12px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginTop: "auto",
          }}>
            <span style={{ fontSize: 8, color: G, fontWeight: 700, letterSpacing: "0.12em" }}>jewelsreport.com</span>
            <span style={{ fontSize: 7, color: FG3 }}>Gemological Certification Lab · Surat, Gujarat, India</span>
          </div>
        </div>

      </div>
    );
  },
);
