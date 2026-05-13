import { QRCodeSVG } from "qrcode.react";
import { forwardRef } from "react";
import type { Certificate } from "@/lib/store";
import logo from "@/assets/logo.png";

// PAN card / CR80: 85.6 × 53.98 mm → rendered at 856 × 540 px (10 px/mm)
export const CARD_W = 856;
export const CARD_H = 540;

interface Props {
  cert: Certificate;
  side: "front" | "back";
}

export const CertificateCard = forwardRef<HTMLDivElement, Props>(
  function CertificateCard({ cert, side }, ref) {
    const verifyUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/verify?id=${encodeURIComponent(cert.reportNo)}`
        : `/verify?id=${cert.reportNo}`;

    return (
      <div
        ref={ref}
        style={{
          width: CARD_W,
          height: CARD_H,
          borderRadius: 24,
          background: "#FFFFFF",
          boxShadow: "0 8px 40px -8px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.07)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Corner accents */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 856 540">
          <path d="M26,3 L3,3 L3,26"   fill="none" stroke="#C9A84C" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M830,3 L853,3 L853,26" fill="none" stroke="#C9A84C" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M3,514 L3,537 L26,537"  fill="none" stroke="#C9A84C" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M853,514 L853,537 L830,537" fill="none" stroke="#C9A84C" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="12" y="12" width="832" height="516" rx="16" fill="none" stroke="#C9A84C" strokeWidth="0.7" opacity="0.3" />
        </svg>

        {/* Subtle guilloche watermark */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.035 }} viewBox="0 0 856 540">
          <defs>
            <pattern id="gc" width="22" height="22" patternUnits="userSpaceOnUse">
              <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#8B6914" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="856" height="540" fill="url(#gc)" />
          <circle cx="428" cy="270" r="200" fill="none" stroke="#8B6914" strokeWidth="1" />
          <circle cx="428" cy="270" r="155" fill="none" stroke="#8B6914" strokeWidth="0.6" />
          <circle cx="428" cy="270" r="110" fill="none" stroke="#8B6914" strokeWidth="0.4" />
        </svg>

        {side === "front" ? <FrontSide verifyUrl={verifyUrl} /> : <BackSide cert={cert} verifyUrl={verifyUrl} />}
      </div>
    );
  }
);

// ─── FRONT: logo centred + URL at bottom only ─────────────────────────────────
function FrontSide({ verifyUrl }: { verifyUrl: string }) {
  return (
    <div style={{ position: "relative", height: "100%", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "36px 48px" }}>

      {/* Centred logo block */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <img
          src={logo}
          alt="JewelReport"
          crossOrigin="anonymous"
          style={{ height: 110, width: 110, objectFit: "contain" }}
        />
        <div style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 38, lineHeight: 1, color: "#1a1a2e", letterSpacing: "0.02em" }}>
          Jewel<span style={{ color: "#C9A84C" }}>Report</span>
        </div>
        <div style={{ fontSize: 11, letterSpacing: "0.45em", textTransform: "uppercase", color: "#9CA3AF" }}>
          Certification Lab
        </div>
        {/* Gold rule */}
        <div style={{ width: 120, height: 1.5, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", marginTop: 4 }} />
      </div>

      {/* URL pinned to bottom */}
      <div style={{ position: "absolute", bottom: 28, left: 0, right: 0, textAlign: "center" }}>
        <div style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "#C9A84C" }}>
          JEWELREPORT.COM
        </div>
      </div>
    </div>
  );
}

// ─── BACK: ALL details ────────────────────────────────────────────────────────
function BackSide({ cert, verifyUrl }: { cert: Certificate; verifyUrl: string }) {
  const specs: [string, string | undefined][] = [
    ["Report No.",   cert.reportNo],
    ["Type",         cert.type],
    ["Item",         cert.itemName],
    ["Shape",        cert.shape],
    ["Carat Weight", cert.caratWeight],
    ["Measurements", cert.measurements],
    ["Color",        cert.color],
    ["Clarity",      cert.clarity],
    ["Cut Grade",    cert.cut],
    ["Polish",       cert.polish],
    ["Symmetry",     cert.symmetry],
    ["Fluorescence", cert.fluorescence],
    ["Origin",       cert.origin],
    ...(cert.metal       ? [["Metal",        cert.metal]       as [string, string]] : []),
    ...(cert.totalWeight ? [["Total Weight", cert.totalWeight] as [string, string]] : []),
    ["Issue Date",   cert.issueDate],
    ...(cert.clientName  ? [["Client",       cert.clientName]  as [string, string]] : []),
  ];

  return (
    <div style={{ position: "relative", height: "100%", width: "100%", display: "flex", flexDirection: "column", padding: "22px 30px 18px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <div style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 17, color: "#1a1a2e", letterSpacing: "0.04em" }}>
            Certificate Details
          </div>
          <div style={{ height: 1.5, width: 70, background: "linear-gradient(90deg, #C9A84C, transparent)", marginTop: 5 }} />
        </div>
        {/* QR code */}
        <div style={{ padding: 5, background: "#fff", border: "1px solid rgba(201,168,76,0.4)", borderRadius: 7 }}>
          <QRCodeSVG value={verifyUrl} size={68} level="M" />
        </div>
      </div>

      {/* Item image + specs */}
      <div style={{ display: "flex", gap: 18, flex: 1, minHeight: 0 }}>
        {/* image */}
        {cert.imageDataUrl && (
          <div style={{
            width: 100, flexShrink: 0, borderRadius: 10, overflow: "hidden",
            border: "1px solid rgba(201,168,76,0.3)",
            background: "linear-gradient(135deg,#FEF9EE,#FAF0D7)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <img src={cert.imageDataUrl} alt="" crossOrigin="anonymous" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}

        {/* specs grid */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px 24px", alignContent: "start" }}>
          {specs.map(([label, value]) => (
            <div key={label} style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", paddingBottom: 3 }}>
              <div style={{ fontSize: 7, letterSpacing: "0.28em", textTransform: "uppercase", color: "#9CA3AF" }}>{label}</div>
              <div style={{ fontSize: 10.5, color: "#1F2937", fontWeight: 500, marginTop: 1 }}>{value || "—"}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Remarks */}
      {cert.remarks && (
        <div style={{ marginTop: 6, paddingTop: 5, borderTop: "1px solid rgba(0,0,0,0.07)" }}>
          <div style={{ fontSize: 7, letterSpacing: "0.28em", textTransform: "uppercase", color: "#9CA3AF" }}>Remarks</div>
          <p style={{ fontSize: 9.5, color: "#374151", marginTop: 2, lineHeight: 1.4 }}>{cert.remarks}</p>
        </div>
      )}

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8, paddingTop: 7, borderTop: "1px solid rgba(201,168,76,0.3)", fontSize: 7 }}>
        <span style={{ color: "#9CA3AF", letterSpacing: "0.12em" }}>Property of JewelReport Certification Lab. Scan QR to verify.</span>
        <span style={{ color: "#C9A84C", letterSpacing: "0.3em", textTransform: "uppercase" }}>JEWELREPORT.COM</span>
      </div>
    </div>
  );
}
