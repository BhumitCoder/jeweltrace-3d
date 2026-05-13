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
          borderRadius: 20,
          background: "#FFFFFF",
          boxShadow: "0 8px 40px -8px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.07)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
          flexShrink: 0,
        }}
      >
        {/* Corner bracket accents */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2 }} viewBox="0 0 856 540">
          <path d="M26,3 L3,3 L3,26"         fill="none" stroke="#C9A84C" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M830,3 L853,3 L853,26"     fill="none" stroke="#C9A84C" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M3,514 L3,537 L26,537"     fill="none" stroke="#C9A84C" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M853,514 L853,537 L830,537" fill="none" stroke="#C9A84C" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="12" y="12" width="832" height="516" rx="14" fill="none" stroke="#C9A84C" strokeWidth="0.7" opacity="0.3" />
        </svg>

        {/* Subtle grid watermark */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.03, zIndex: 1 }} viewBox="0 0 856 540">
          <defs>
            <pattern id="gc" width="22" height="22" patternUnits="userSpaceOnUse">
              <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#8B6914" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="856" height="540" fill="url(#gc)" />
          <circle cx="428" cy="270" r="200" fill="none" stroke="#8B6914" strokeWidth="1" />
          <circle cx="428" cy="270" r="150" fill="none" stroke="#8B6914" strokeWidth="0.5" />
        </svg>

        <div style={{ position: "relative", zIndex: 3, height: "100%", width: "100%" }}>
          {side === "front" ? <FrontSide /> : <BackSide cert={cert} verifyUrl={verifyUrl} />}
        </div>
      </div>
    );
  }
);

// ─── FRONT: ONLY logo centred + URL at bottom ─────────────────────────────────
function FrontSide() {
  return (
    <div style={{
      height: "100%", width: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "36px 48px",
      position: "relative",
    }}>
      {/* Centre block */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <img
          src={logo}
          alt="JewelReport"
          crossOrigin="anonymous"
          style={{ height: 120, width: 120, objectFit: "contain" }}
        />
        <div style={{
          fontFamily: "Playfair Display, Georgia, serif",
          fontSize: 42, lineHeight: 1,
          color: "#1a1a2e", letterSpacing: "0.02em",
        }}>
          Jewel<span style={{ color: "#C9A84C" }}>Report</span>
        </div>
        <div style={{ fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: "#9CA3AF" }}>
          Certification Lab
        </div>
        <div style={{ width: 130, height: 1.5, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", marginTop: 2 }} />
      </div>

      {/* URL pinned at bottom */}
      <div style={{ position: "absolute", bottom: 26, left: 0, right: 0, textAlign: "center" }}>
        <span style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "#C9A84C" }}>
          JEWELREPORT.COM
        </span>
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
    ...(cert.metal        ? [["Metal",        cert.metal]        as [string, string]] : []),
    ...(cert.totalWeight  ? [["Total Weight", cert.totalWeight]  as [string, string]] : []),
    ["Issue Date",   cert.issueDate],
    ...(cert.clientName   ? [["Client",       cert.clientName]   as [string, string]] : []),
  ].filter(([, v]) => v) as [string, string][];

  return (
    <div style={{
      height: "100%", width: "100%",
      display: "flex", flexDirection: "column",
      padding: "20px 28px 16px",
      position: "relative",
    }}>

      {/* ── Top bar: title left · QR right ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <div style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 18, color: "#1a1a2e", letterSpacing: "0.04em" }}>
            Certificate Details
          </div>
          <div style={{ height: 1.5, width: 80, background: "linear-gradient(90deg, #C9A84C, transparent)", marginTop: 6 }} />
        </div>
        {/* QR */}
        <div style={{ padding: 5, background: "#fff", border: "1px solid rgba(201,168,76,0.5)", borderRadius: 8 }}>
          <QRCodeSVG value={verifyUrl} size={70} level="M" />
        </div>
      </div>

      {/* ── Image + specs ── */}
      <div style={{ display: "flex", gap: 18, flex: 1, minHeight: 0 }}>

        {/* Square image */}
        {cert.imageDataUrl && (
          <div style={{
            width: 108, height: 108,
            flexShrink: 0,
            borderRadius: 10, overflow: "hidden",
            border: "1px solid rgba(201,168,76,0.35)",
            background: "linear-gradient(135deg,#FEF9EE,#FAF0D7)",
          }}>
            <img
              src={cert.imageDataUrl}
              alt=""
              crossOrigin="anonymous"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        )}

        {/* Specs 2-col grid */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 24px", alignContent: "start" }}>
          {specs.map(([label, value]) => (
            <div key={label} style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", paddingBottom: 4 }}>
              <div style={{ fontSize: 7, letterSpacing: "0.28em", textTransform: "uppercase", color: "#9CA3AF" }}>{label}</div>
              <div style={{ fontSize: 10.5, color: "#1F2937", fontWeight: 500, marginTop: 1.5 }}>{value || "—"}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Remarks */}
      {cert.remarks && (
        <div style={{ marginTop: 7, paddingTop: 6, borderTop: "1px solid rgba(0,0,0,0.07)" }}>
          <div style={{ fontSize: 7, letterSpacing: "0.28em", textTransform: "uppercase", color: "#9CA3AF" }}>Remarks</div>
          <p style={{ fontSize: 9.5, color: "#374151", marginTop: 2, lineHeight: 1.4 }}>{cert.remarks}</p>
        </div>
      )}

      {/* ── Footer: scan note left · logo bottom-right ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginTop: 8, paddingTop: 7,
        borderTop: "1px solid rgba(201,168,76,0.3)",
      }}>
        <span style={{ fontSize: 7, color: "#9CA3AF", letterSpacing: "0.1em" }}>
          Property of JewelReport Certification Lab. Scan QR to verify.
        </span>

        {/* Logo + brand bottom-right */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <img src={logo} alt="" crossOrigin="anonymous" style={{ height: 22, width: 22, objectFit: "contain" }} />
          <span style={{ fontSize: 10, fontFamily: "Playfair Display, Georgia, serif", color: "#1a1a2e", letterSpacing: "0.02em" }}>
            Jewel<span style={{ color: "#C9A84C" }}>Report</span>
          </span>
        </div>
      </div>
    </div>
  );
}
