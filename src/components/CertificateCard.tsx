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
          border: "1.5px solid rgba(201,168,76,0.45)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
          flexShrink: 0,
          boxSizing: "border-box",
        }}
      >
        {/* Corner bracket accents */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2 }}
          viewBox="0 0 856 540"
        >
          <path d="M26,4 L4,4 L4,26"           fill="none" stroke="#C9A84C" strokeWidth="4" strokeLinecap="round" />
          <path d="M830,4 L852,4 L852,26"       fill="none" stroke="#C9A84C" strokeWidth="4" strokeLinecap="round" />
          <path d="M4,514 L4,536 L26,536"       fill="none" stroke="#C9A84C" strokeWidth="4" strokeLinecap="round" />
          <path d="M852,514 L852,536 L830,536"  fill="none" stroke="#C9A84C" strokeWidth="4" strokeLinecap="round" />
          <rect x="14" y="14" width="828" height="512" rx="12" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.25" />
        </svg>

        {/* Subtle grid watermark */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.04, zIndex: 1 }}
          viewBox="0 0 856 540"
        >
          <defs>
            <pattern id="gcp" width="22" height="22" patternUnits="userSpaceOnUse">
              <path d="M22 0L0 0 0 22" fill="none" stroke="#8B6914" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="856" height="540" fill="url(#gcp)" />
          <circle cx="428" cy="270" r="210" fill="none" stroke="#8B6914" strokeWidth="1.2" />
          <circle cx="428" cy="270" r="155" fill="none" stroke="#8B6914" strokeWidth="0.6" />
        </svg>

        <div style={{ position: "relative", zIndex: 3, height: "100%", width: "100%" }}>
          {side === "front" ? <FrontSide /> : <BackSide cert={cert} verifyUrl={verifyUrl} />}
        </div>
      </div>
    );
  }
);

// ─── FRONT: ONLY logo centred + URL at bottom ────────────────────────────────
function FrontSide() {
  return (
    <div style={{
      height: "100%", width: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative",
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <img
          src={logo}
          alt="JewelReport"
          crossOrigin="anonymous"
          style={{ height: 130, width: 130, objectFit: "contain" }}
        />
        <div style={{
          fontFamily: "Playfair Display, Georgia, serif",
          fontSize: 44, lineHeight: 1,
          color: "#1a1a2e", letterSpacing: "0.02em",
        }}>
          Jewel<span style={{ color: "#C9A84C" }}>Report</span>
        </div>
        <div style={{ fontSize: 11.5, letterSpacing: "0.55em", textTransform: "uppercase", color: "#9CA3AF" }}>
          Certification Lab
        </div>
        <div style={{ width: 140, height: 1.5, background: "linear-gradient(90deg,transparent,#C9A84C,transparent)" }} />
      </div>

      {/* URL at bottom */}
      <div style={{ position: "absolute", bottom: 28, left: 0, right: 0, textAlign: "center" }}>
        <span style={{ fontSize: 9.5, letterSpacing: "0.45em", textTransform: "uppercase", color: "#C9A84C" }}>
          JEWELREPORT.COM
        </span>
      </div>
    </div>
  );
}

// ─── BACK: ALL details — logo top-right, QR bottom-right ─────────────────────
function BackSide({ cert, verifyUrl }: { cert: Certificate; verifyUrl: string }) {
  const specs: [string, string][] = ([
    ["Report No.",   cert.reportNo],
    ["Type",         cert.type],
    ["Item",         cert.itemName],
    ["Issue Date",   cert.issueDate],
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
    cert.metal        ? ["Metal",        cert.metal]        : null,
    cert.totalWeight  ? ["Total Weight", cert.totalWeight]  : null,
    cert.clientName   ? ["Client",       cert.clientName]   : null,
  ] as ([string, string | undefined] | null)[]).filter(
    (r): r is [string, string] => r !== null && !!r[1]
  );

  return (
    <div style={{
      height: "100%", width: "100%",
      display: "flex", flexDirection: "column",
      padding: "18px 26px 16px",
      position: "relative",
      boxSizing: "border-box",
    }}>

      {/* ── Top bar: title left · logo+name top-right ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
        <div>
          <div style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 19, color: "#1a1a2e", letterSpacing: "0.04em" }}>
            Certificate Details
          </div>
          <div style={{ height: 2, width: 90, background: "linear-gradient(90deg,#C9A84C,transparent)", marginTop: 6 }} />
        </div>

        {/* Logo + brand — top-right */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src={logo} alt="" crossOrigin="anonymous" style={{ height: 32, width: 32, objectFit: "contain" }} />
          <div style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 14, color: "#1a1a2e", lineHeight: 1 }}>
            Jewel<span style={{ color: "#C9A84C" }}>Report</span>
            <div style={{ fontSize: 7.5, letterSpacing: "0.3em", textTransform: "uppercase", color: "#9CA3AF", marginTop: 3 }}>
              Certification Lab
            </div>
          </div>
        </div>
      </div>

      {/* ── Image + specs ── */}
      <div style={{ display: "flex", gap: 18, flex: 1, minHeight: 0 }}>

        {/* Square image */}
        {cert.imageDataUrl ? (
          <div style={{
            width: 114, height: 114,
            flexShrink: 0, borderRadius: 10, overflow: "hidden",
            border: "1px solid rgba(201,168,76,0.4)",
          }}>
            <img
              src={cert.imageDataUrl}
              alt=""
              crossOrigin="anonymous"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        ) : (
          /* Placeholder box so layout doesn't collapse when no image */
          <div style={{
            width: 114, height: 114, flexShrink: 0, borderRadius: 10,
            border: "1px dashed rgba(201,168,76,0.3)",
            background: "linear-gradient(135deg,#FEF9EE,#FAF0D7)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <img src={logo} alt="" crossOrigin="anonymous" style={{ height: 48, width: 48, objectFit: "contain", opacity: 0.3 }} />
          </div>
        )}

        {/* Specs 2-col grid */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px 20px", alignContent: "start" }}>
          {specs.map(([label, value]) => (
            <div key={label} style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", paddingBottom: 4 }}>
              <div style={{ fontSize: 7.5, letterSpacing: "0.26em", textTransform: "uppercase", color: "#9CA3AF" }}>
                {label}
              </div>
              <div style={{ fontSize: 11, color: "#111827", fontWeight: 600, marginTop: 2 }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Remarks */}
      {cert.remarks && (
        <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
          <div style={{ fontSize: 7.5, letterSpacing: "0.26em", textTransform: "uppercase", color: "#9CA3AF" }}>Remarks</div>
          <p style={{ fontSize: 9.5, color: "#374151", marginTop: 2, lineHeight: 1.45 }}>{cert.remarks}</p>
        </div>
      )}

      {/* ── Footer: scan text left · QR bottom-right ── */}
      <div style={{
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        marginTop: 8, paddingTop: 8,
        borderTop: "1px solid rgba(201,168,76,0.3)",
      }}>
        <div>
          <div style={{ fontSize: 7.5, color: "#9CA3AF", letterSpacing: "0.1em", marginBottom: 2 }}>
            Property of JewelReport Certification Lab
          </div>
          <div style={{ fontSize: 8, color: "#C9A84C", letterSpacing: "0.35em", textTransform: "uppercase" }}>
            JEWELREPORT.COM
          </div>
        </div>

        {/* QR code — bottom-right */}
        <div style={{ padding: 4, background: "#fff", border: "1px solid rgba(201,168,76,0.5)", borderRadius: 7 }}>
          <QRCodeSVG value={verifyUrl} size={62} level="M" />
        </div>
      </div>
    </div>
  );
}
