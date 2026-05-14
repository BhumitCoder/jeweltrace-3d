import { QRCodeSVG } from "qrcode.react";
import { forwardRef } from "react";
import type { Certificate } from "@/lib/store";
import { REPORT_TYPE_LABELS } from "@/lib/store";
import logo from "@/assets/logo.png";

// PAN card / CR80: 85.6 × 53.98 mm → rendered at 856 × 540 px (10 px/mm)
export const CARD_W = 856;
export const CARD_H = 540;

interface Props { cert: Certificate; side: "front" | "back" }

export const CertificateCard = forwardRef<HTMLDivElement, Props>(
  function CertificateCard({ cert, side }, ref) {
    const verifyUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/verify?id=${encodeURIComponent(cert.reportNo)}`
        : `/verify?id=${cert.reportNo}`;

    return (
      <div ref={ref} style={{
        width: CARD_W, height: CARD_H,
        background: "#F4F2EE",
        overflow: "hidden",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        display: "flex",
        boxSizing: "border-box",
        position: "relative",
      }}>
        {side === "front" ? <FrontSide /> : <BackSide cert={cert} verifyUrl={verifyUrl} />}
      </div>
    );
  }
);

/* ─── FRONT ──────────────────────────────────────────────────────────────────── */
function FrontSide() {
  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#F4F2EE", position: "relative",
    }}>
      {/* Watermark */}
      <img src={logo} alt="" crossOrigin="anonymous" style={{
        position: "absolute", width: 300, height: 300, objectFit: "contain",
        opacity: 0.05, pointerEvents: "none", left: "50%", top: "50%",
        transform: "translate(-50%,-50%)",
      }} />

      {/* Centre content */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22, position: "relative", zIndex: 1 }}>
        <img src={logo} alt="JewelReport" crossOrigin="anonymous" style={{ height: 120, width: 120, objectFit: "contain" }} />
        <div>
          <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 52, lineHeight: 1, color: "#111", letterSpacing: "-0.01em", textAlign: "center" }}>
            Jewel<span style={{ color: "#B8922A" }}>Report</span>
          </div>
          <div style={{ fontSize: 11, letterSpacing: "0.55em", textTransform: "uppercase", color: "#888", textAlign: "center", marginTop: 10 }}>
            Certification Lab
          </div>
        </div>
        <div style={{ width: 160, height: 1.5, background: "linear-gradient(90deg,transparent,#B8922A,transparent)" }} />
      </div>

      {/* Bottom URL */}
      <div style={{ position: "absolute", bottom: 26, left: 0, right: 0, textAlign: "center", zIndex: 1 }}>
        <span style={{ fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "#B8922A" }}>JEWELREPORT.COM</span>
      </div>
    </div>
  );
}

/* ─── BACK — GIA-style layout ────────────────────────────────────────────────── */
function BackSide({ cert, verifyUrl }: { cert: Certificate; verifyUrl: string }) {
  const isJewellery = cert.type === "Lab Grown Jewellery" || cert.type === "Natural Jewellery";

  const fields: [string, string | undefined][] = isJewellery
    ? [
        ["Jewellery Report Number", cert.reportNo],
        ["Item",                    cert.itemName],
        ["Metal Tested",            cert.metal],
        ["Metal Description",       cert.metalDescription],
        ["Total Weight",            cert.totalWeight],
        ["Origin",                  cert.origin],
        ["Client",                  cert.clientName],
      ].filter(([, v]) => v) as [string, string][]
    : [
        ["Jewelry Report Number", cert.reportNo],
        ["Item",                  cert.itemName],
        ["Shape",                 cert.shape],
        ["Total Carat Weight",    cert.caratWeight ? `${cert.caratWeight} carat` : undefined],
        ["Measurements",          cert.measurements],
        ["Color",                 cert.color],
        ["Clarity",               cert.clarity],
        ["Cut Grade",             cert.cut],
        ["Polish",                cert.polish],
        ["Symmetry",              cert.symmetry],
        ["Fluorescence",          cert.fluorescence],
        ["Origin",                cert.origin],
        ["Client",                cert.clientName],
      ].filter(([, v]) => v) as [string, string][];

  return (
    <>
      {/* ── Watermark centred behind everything ── */}
      <img src={logo} alt="" crossOrigin="anonymous" style={{
        position: "absolute", width: 320, height: 320, objectFit: "contain",
        opacity: 0.055, pointerEvents: "none",
        left: "50%", top: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: 0,
      }} />

      {/* ── Left panel (main content) ── */}
      <div style={{
        width: 576, flexShrink: 0,
        display: "flex", flexDirection: "column",
        padding: "28px 32px 0 32px",
        position: "relative", zIndex: 1,
        boxSizing: "border-box",
      }}>

        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
          <img src={logo} alt="JewelReport" crossOrigin="anonymous" style={{ height: 52, width: 52, objectFit: "contain" }} />
          <div>
            <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 28, color: "#111", lineHeight: 1, letterSpacing: "-0.01em" }}>
              Jewel<span style={{ color: "#B8922A" }}>Report</span>
              <span style={{ fontSize: 13, color: "#888", fontStyle: "italic", marginLeft: 4 }}>®</span>
            </div>
            <div style={{ fontSize: 8.5, letterSpacing: "0.35em", textTransform: "uppercase", color: "#888", marginTop: 4 }}>
              Certification Lab
            </div>
          </div>
        </div>

        {/* Green line + Report type label */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ height: 3, background: "#2E7D32", borderRadius: 2, marginBottom: 6 }} />
          <div style={{
            fontSize: 13, fontWeight: 800, letterSpacing: "0.06em",
            textTransform: "uppercase", color: "#1B5E20",
            lineHeight: 1.2,
          }}>
            {REPORT_TYPE_LABELS[cert.type] ?? cert.type}
          </div>
        </div>

        {/* Fields with dotted leaders */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
          {fields.map(([label, value]) => (
            <div key={label} style={{ display: "flex", alignItems: "flex-end", gap: 0 }}>
              <span style={{
                fontSize: 11.5, color: "#222", whiteSpace: "nowrap",
                lineHeight: 1.4, letterSpacing: "0.01em",
              }}>
                {label}
              </span>
              {/* Dotted leader */}
              <span style={{
                flex: 1,
                borderBottom: "1.5px dotted #999",
                margin: "0 5px 3px",
                minWidth: 20,
              }} />
              <span style={{
                fontSize: 11.5, fontWeight: 700, color: "#111",
                whiteSpace: "nowrap", lineHeight: 1.4,
                letterSpacing: "0.01em",
              }}>
                {value}
              </span>
            </div>
          ))}

          {/* Diamond Details block — jewellery only */}
          {isJewellery && (cert.diamondShape || cert.diamondWeight || cert.diamondColor || cert.diamondClarity) && (
            <div style={{ marginTop: 6 }}>
              {/* Section header */}
              <div style={{
                fontSize: 9, fontWeight: 700, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "#B8922A",
                borderBottom: "1px solid #D4C9A8", paddingBottom: 3, marginBottom: 4,
              }}>
                Diamond Details
              </div>
              {[
                ["Shape and Cut",       cert.diamondShape],
                ["Total Est. Weight",   cert.diamondWeight ? `${cert.diamondWeight} CT` : undefined],
                ["Color",               cert.diamondColor],
                ["Clarity",             cert.diamondClarity],
              ].filter(([, v]) => v).map(([label, value]) => (
                <div key={label} style={{ display: "flex", alignItems: "flex-end", gap: 0 }}>
                  <span style={{ fontSize: 11.5, color: "#222", whiteSpace: "nowrap", lineHeight: 1.4 }}>{label}</span>
                  <span style={{ flex: 1, borderBottom: "1.5px dotted #999", margin: "0 5px 3px", minWidth: 20 }} />
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: "#111", whiteSpace: "nowrap", lineHeight: 1.4 }}>{value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Remarks inline if present */}
          {cert.remarks && (
            <div style={{ marginTop: 4 }}>
              <span style={{ fontSize: 11.5, color: "#222" }}>Remarks: </span>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: "#111" }}>{cert.remarks}</span>
            </div>
          )}
        </div>

        {/* Separator + disclaimer */}
        <div style={{ marginTop: 10 }}>
          <div style={{ height: 1.5, background: "linear-gradient(90deg,#B8922A,#D4A843,#B8922A)", marginBottom: 8 }} />
          <p style={{ fontSize: 8, color: "#666", lineHeight: 1.5 }}>
            This report is issued by JewelReport Certification Lab and is based on the examination of the described article. Scan QR to verify online at JEWELREPORT.COM. The results documented refer only to the article described and were obtained using the techniques and equipment used by JewelReport at the time of examination. This report is not a guarantee or valuation.
          </p>
          <div style={{ height: 22 }} />
        </div>
      </div>

      {/* ── Right panel ── */}
      <div style={{
        flex: 1,
        display: "flex", flexDirection: "column",
        borderLeft: "1.5px solid #D4C9A8",
        position: "relative", zIndex: 1,
        background: "#EFECE5",
      }}>
        {/* Item image — top portion */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "18px 18px 10px" }}>
          <div style={{
            width: "100%", aspectRatio: "1 / 1",
            borderRadius: 22,
            border: "1.5px solid rgba(184,146,42,0.45)",
            background: "#F2EFE7",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(255,255,255,0.6)",
            overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {cert.imageDataUrl ? (
              <img src={cert.imageDataUrl} alt="" crossOrigin="anonymous"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <img src={logo} alt="" crossOrigin="anonymous" style={{ height: 56, width: 56, objectFit: "contain", opacity: 0.18 }} />
                <div style={{ fontSize: 8.5, color: "#AAA", letterSpacing: "0.2em", textTransform: "uppercase" }}>No image</div>
              </div>
            )}
          </div>
        </div>

        <div style={{
          padding: "6px 16px 18px",
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 8, flexShrink: 0,
        }}>
          <div style={{ fontSize: 9, color: "#B8922A", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 600 }}>
            JEWELREPORT.COM
          </div>
          <div style={{ padding: 7, background: "#fff", border: "1.5px solid rgba(184,146,42,0.5)", borderRadius: 8 }}>
            <QRCodeSVG value={verifyUrl} size={108} level="M" />
          </div>
          <div style={{ fontSize: 8, color: "#888", textAlign: "center", letterSpacing: "0.05em" }}>
            Scan to verify online
          </div>
        </div>
      </div>
    </>
  );
}
