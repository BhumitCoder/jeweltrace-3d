import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { Certificate } from "@/lib/store";
import { REPORT_TYPE_LABELS } from "@/lib/store";
import logo from "@/assets/logo.png";

export const A4_W = 794;
export const A4_H = 1123;

interface Props { cert: Certificate }

export const A4Certificate = forwardRef<HTMLDivElement, Props>(
  function A4Certificate({ cert }, ref) {
    const verifyUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/verify?id=${encodeURIComponent(cert.reportNo)}`
        : `https://www.jewelsreport.com/verify?id=${cert.reportNo}`;

    const isJewellery = cert.type === "Lab Grown Jewellery" || cert.type === "Natural Jewellery";
    const isGemstone  = cert.type === "Gemstone";

    const fmtDate = (d: string) => {
      try {
        return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
      } catch { return d; }
    };

    /* ── Left-column grading fields ─────────────────────────────── */
    let mainFields: [string, string | undefined][] = [];
    if (isGemstone) {
      mainFields = [
        ["Stone",                    cert.gemstoneStone],
        ["Origin",                   cert.gemstoneOrigin],
        ["Shape & Cutting Style",    cert.gemstoneShape],
        ["Carat Weight",             cert.gemstoneCaratWeight],
        ["PCS",                      cert.gemstonePcs],
        ["Measurements",             cert.gemstoneMeasurements],
        ["Color & Transparency",     cert.gemstoneColorTransparency],
        ["Characteristics",          cert.gemstoneCharacteristics],
      ];
    } else if (isJewellery) {
      mainFields = [
        ["Item",              cert.itemName],
        ["Shape",             cert.shape],
        ["Metal Tested",      cert.metal],
        ["Metal Description", cert.metalDescription],
        ["Gross Weight",      cert.grossWeight ? `${cert.grossWeight} GRM` : undefined],
        ["Net Weight",        cert.netWeight   ? `${cert.netWeight} GRM`   : undefined],
        ["Origin",            cert.origin],
      ];
    } else {
      mainFields = [
        ["Shape & Cutting Style", cert.shape],
        ["Measurements",         cert.measurements],
        ["Carat Weight",         cert.caratWeight ? `${cert.caratWeight} carat` : undefined],
        ["Color Grade",          cert.color],
        ["Clarity Grade",        cert.clarity],
        ["Cut Grade",            cert.cut],
        ["Polish Grade",         cert.polish],
        ["Symmetry Grade",       cert.symmetry],
        ["Fluorescence",         cert.fluorescence],
        ["Origin",               cert.origin],
      ];
    }
    mainFields = mainFields.filter(([, v]) => v) as [string, string][];

    /* ── Right-column detail fields (jewellery only) ─────────────── */
    const rightFields: [string, string | undefined][] = isJewellery ? [
      ...(cert.diamondShape || cert.diamondWeight ? [
        ["Diamond Shape",   cert.diamondShape] as [string, string | undefined],
        ["Diamond Weight",  cert.diamondWeight ? `${cert.diamondWeight} CT` : undefined] as [string, string | undefined],
        ["Diamond Total PCS", cert.diamondTotalPcs] as [string, string | undefined],
        ["Diamond Color",   cert.diamondColor] as [string, string | undefined],
        ["Diamond Clarity", cert.diamondClarity] as [string, string | undefined],
      ] : []),
      ...(cert.gemstoneStone ? [
        ["Stone",        cert.gemstoneStone] as [string, string | undefined],
        ["Stone Origin", cert.gemstoneOrigin] as [string, string | undefined],
        ["Stone Shape",  cert.gemstoneShape] as [string, string | undefined],
        ["Stone Weight", cert.gemstoneCaratWeight] as [string, string | undefined],
        ["Stone PCS",    cert.gemstonePcs] as [string, string | undefined],
      ] : []),
    ].filter(([, v]) => v) as [string, string][] : [];

    const hasImages = !!(cert.imageDataUrl || cert.imageDataUrl2);
    const imgMaxH   = cert.imageDataUrl && cert.imageDataUrl2 ? 360 : 660;

    /* ── Label / col header text ─────────────────────────────────── */
    const leftHeader  = isGemstone ? "Gemstone Grading" : isJewellery ? "Jewellery Report" : "Diamond Grading";
    const rightHeader = rightFields.length > 0 ? "Item Details" : "Verification";

    return (
      <div ref={ref} style={{
        width: A4_W, height: A4_H,
        background: "#FDFBF7",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        position: "relative", overflow: "hidden",
        boxSizing: "border-box",
        display: "flex", flexDirection: "column",
      }}>

        {/* ── Watermark ── */}
        <img src={logo} alt="" aria-hidden style={{
          position: "absolute", width: 380, height: 380, objectFit: "contain",
          opacity: 0.04, left: "50%", top: "40%",
          transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: 0,
        }} />

        {/* ── HEADER ── */}
        <div style={{
          padding: "18px 30px 12px",
          display: "flex", alignItems: "center", gap: 18,
          borderBottom: "3px solid #B8922A",
          position: "relative", zIndex: 1, flexShrink: 0,
        }}>
          <img src={logo} alt="JewelsReport" style={{ height: 62, width: 62, objectFit: "contain", flexShrink: 0 }} />

          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 22, color: "#111", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
              Jewels<span style={{ color: "#B8922A" }}>Report</span>
            </div>
            <div style={{ fontSize: 8.5, letterSpacing: "0.38em", textTransform: "uppercase", color: "#555", marginTop: 2, fontWeight: 800 }}>
              Gemological Certification Lab
            </div>
            <div style={{ width: 180, height: 1.5, background: "linear-gradient(90deg,transparent,#B8922A,transparent)", margin: "7px auto 6px" }} />
            <div style={{ fontSize: 13.5, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", color: "#B8922A" }}>
              {REPORT_TYPE_LABELS[cert.type] ?? cert.type}
            </div>
          </div>

          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", fontWeight: 600 }}>Report Number</div>
            <div style={{ fontSize: 14, fontWeight: 900, color: "#111", letterSpacing: "0.05em", marginTop: 1 }}>{cert.reportNo}</div>
            <div style={{ fontSize: 8, color: "#AAA", marginTop: 7 }}>Issue Date</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#333", marginTop: 1 }}>{fmtDate(cert.issueDate)}</div>
            <div style={{ fontSize: 8, color: "#B8922A", marginTop: 7, letterSpacing: "0.08em", fontWeight: 700 }}>
              jewelsreport.com/verify
            </div>
          </div>
        </div>

        {/* ── COLUMN HEADER BAR ── */}
        <div style={{ display: "flex", flexShrink: 0, borderBottom: "2px solid #B8922A" }}>
          <div style={{ width: 268, padding: "5px 14px", background: "#B8922A" }}>
            <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase", color: "#fff" }}>{leftHeader}</span>
          </div>
          <div style={{ flex: 1, padding: "5px 14px", background: "#7D6420", borderLeft: "1px solid rgba(255,255,255,0.15)" }}>
            <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase", color: "#fff" }}>Item Description</span>
          </div>
          <div style={{ width: 206, padding: "5px 14px", background: "#5A4715", borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
            <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase", color: "#fff" }}>{rightHeader}</span>
          </div>
        </div>

        {/* ── 3-COLUMN BODY ── */}
        <div style={{ display: "flex", flex: 1, minHeight: 0, position: "relative", zIndex: 1 }}>

          {/* LEFT — Grading fields */}
          <div style={{
            width: 268, flexShrink: 0, overflowY: "hidden",
            padding: "12px 14px 12px 16px",
            borderRight: "1.5px solid #D4C9A8",
          }}>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8922A", marginBottom: 9 }}>
              {isGemstone ? cert.gemstoneStone || "Gemstone" : cert.itemName || cert.type}
            </div>
            {mainFields.map(([label, value]) => (
              <div key={label} style={{ display: "flex", alignItems: "flex-end", marginBottom: 5.5 }}>
                <span style={{ fontSize: 12, color: "#555", whiteSpace: "nowrap", lineHeight: 1.4, fontWeight: 500 }}>{label}</span>
                <span style={{ flex: 1, borderBottom: "1.5px dotted #C8C8C8", margin: "0 5px 3px", minWidth: 8 }} />
                <span style={{ fontSize: 12, fontWeight: 800, color: "#111", whiteSpace: "nowrap", lineHeight: 1.4, textTransform: "uppercase", letterSpacing: "0.03em" }}>{value}</span>
              </div>
            ))}

            {cert.remarks && (
              <div style={{ marginTop: 14, padding: "8px 10px", background: "rgba(184,146,42,0.07)", borderLeft: "3px solid #B8922A", borderRadius: "0 4px 4px 0" }}>
                <div style={{ fontSize: 8, fontWeight: 800, textTransform: "uppercase", color: "#B8922A", letterSpacing: "0.2em", marginBottom: 3 }}>Remarks</div>
                <div style={{ fontSize: 11, color: "#333", lineHeight: 1.5 }}>{cert.remarks}</div>
              </div>
            )}
          </div>

          {/* MIDDLE — Description + images */}
          <div style={{
            flex: 1, overflowY: "hidden",
            padding: "12px 14px",
            borderRight: "1.5px solid #D4C9A8",
            display: "flex", flexDirection: "column", alignItems: "center",
          }}>
            {cert.description && (
              <p style={{ fontSize: 11, color: "#444", lineHeight: 1.65, marginBottom: 14, fontStyle: "italic", alignSelf: "stretch" }}>
                {cert.description}
              </p>
            )}

            {hasImages ? (
              <div style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", gap: 10, alignItems: "center", justifyContent: "center" }}>
                {cert.imageDataUrl && (
                  <div style={{
                    width: "100%", maxHeight: imgMaxH,
                    border: "2px solid rgba(184,146,42,0.4)", borderRadius: 8,
                    overflow: "hidden", background: "#F5F1E9", flexShrink: 0,
                  }}>
                    <img src={cert.imageDataUrl} alt="Item" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                  </div>
                )}
                {cert.imageDataUrl2 && (
                  <div style={{
                    width: "100%", maxHeight: imgMaxH,
                    border: "2px solid rgba(184,146,42,0.4)", borderRadius: 8,
                    overflow: "hidden", background: "#F5F1E9", flexShrink: 0,
                  }}>
                    <img src={cert.imageDataUrl2} alt="Item" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                  </div>
                )}
                <p style={{ fontSize: 8.5, color: "#AAA", textAlign: "center", marginTop: 2 }}>Image is approximate</p>
              </div>
            ) : (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#CCC" }}>
                <img src={logo} alt="" style={{ height: 54, opacity: 0.15, marginBottom: 8 }} />
                <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" }}>No Image Provided</div>
              </div>
            )}
          </div>

          {/* RIGHT — Details + QR */}
          <div style={{
            width: 206, flexShrink: 0, overflowY: "hidden",
            padding: "12px 12px",
            display: "flex", flexDirection: "column",
          }}>
            {rightFields.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8922A", borderBottom: "1.5px solid #D4C9A8", paddingBottom: 4, marginBottom: 8 }}>
                  Item Details
                </div>
                {rightFields.map(([label, value]) => (
                  <div key={label} style={{ marginBottom: 6 }}>
                    <div style={{ fontSize: 8.5, color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{label}</div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#111", textTransform: "uppercase", marginTop: 1, letterSpacing: "0.03em" }}>{value}</div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: "auto", textAlign: "center" }}>
              <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8922A", borderBottom: "1.5px solid #D4C9A8", paddingBottom: 4, marginBottom: 12 }}>
                Verify Online
              </div>
              <div style={{ display: "inline-block", padding: 8, background: "#fff", border: "2px solid rgba(184,146,42,0.5)", borderRadius: 8 }}>
                <QRCodeSVG value={verifyUrl} size={112} level="M" />
              </div>
              <div style={{ fontSize: 8, color: "#888", marginTop: 8, letterSpacing: "0.1em" }}>Scan QR or visit:</div>
              <div style={{ fontSize: 9, color: "#B8922A", fontWeight: 800, marginTop: 2, letterSpacing: "0.08em" }}>jewelsreport.com/verify</div>
              <div style={{ fontSize: 8, color: "#777", marginTop: 5, padding: "4px 8px", background: "#F0EBE0", borderRadius: 4, wordBreak: "break-all" }}>
                {cert.reportNo}
              </div>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div style={{
          flexShrink: 0,
          padding: "8px 30px",
          borderTop: "3px solid #B8922A",
          background: "#F0EBE0",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "relative", zIndex: 1,
        }}>
          <p style={{ fontSize: 7.5, color: "#888", lineHeight: 1.55, margin: 0, maxWidth: 520 }}>
            The results documented in this report refer only to the article described and were obtained using techniques and equipment available at the time of examination.
            This report is not a guarantee or valuation. Results are not reproducible without the same article and conditions.
            JewelsReport Gemological Certification Lab — Surat, Gujarat, India. Verify at jewelsreport.com/verify.
          </p>
          <div style={{ fontSize: 10, fontWeight: 900, color: "#B8922A", letterSpacing: "0.12em", textTransform: "uppercase", textAlign: "right", flexShrink: 0, marginLeft: 16 }}>
            Jewels<span style={{ color: "#7D6420" }}>Report</span>
            <br /><span style={{ fontSize: 7, fontWeight: 500, color: "#AAA", letterSpacing: "0.1em" }}>CERTIFICATION LAB</span>
          </div>
        </div>
      </div>
    );
  }
);
