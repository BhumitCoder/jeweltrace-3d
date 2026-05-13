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
          background: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
          flexShrink: 0,
          boxSizing: "border-box",
        }}
      >
        {side === "front" ? <FrontSide /> : <BackSide cert={cert} verifyUrl={verifyUrl} />}
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
      background: "#fff",
      position: "relative",
    }}>
      {/* Corner brackets */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 856 540">
        <path d="M28,4 L4,4 L4,28"           fill="none" stroke="#C9A84C" strokeWidth="4" strokeLinecap="round" />
        <path d="M828,4 L852,4 L852,28"       fill="none" stroke="#C9A84C" strokeWidth="4" strokeLinecap="round" />
        <path d="M4,512 L4,536 L28,536"       fill="none" stroke="#C9A84C" strokeWidth="4" strokeLinecap="round" />
        <path d="M852,512 L852,536 L828,536"  fill="none" stroke="#C9A84C" strokeWidth="4" strokeLinecap="round" />
      </svg>

      {/* Centre block */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, position: "relative", zIndex: 1 }}>
        <img src={logo} alt="JewelReport" crossOrigin="anonymous"
          style={{ height: 130, width: 130, objectFit: "contain" }} />
        <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 46, lineHeight: 1, color: "#1a1a2e", letterSpacing: "0.02em" }}>
          Jewel<span style={{ color: "#C9A84C" }}>Report</span>
        </div>
        <div style={{ fontSize: 12, letterSpacing: "0.55em", textTransform: "uppercase", color: "#9CA3AF" }}>
          Certification Lab
        </div>
        <div style={{ width: 150, height: 1.5, background: "linear-gradient(90deg,transparent,#C9A84C,transparent)" }} />
      </div>

      {/* URL at very bottom */}
      <div style={{ position: "absolute", bottom: 28, left: 0, right: 0, textAlign: "center", zIndex: 1 }}>
        <span style={{ fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "#C9A84C" }}>
          JEWELREPORT.COM
        </span>
      </div>
    </div>
  );
}

// ─── BACK: full layout — logo top-right, QR bottom-right ─────────────────────
function BackSide({ cert, verifyUrl }: { cert: Certificate; verifyUrl: string }) {
  const leftSpecs: [string, string][] = ([
    ["Report No.",   cert.reportNo],
    ["Type",         cert.type],
    ["Item",         cert.itemName],
    ["Issue Date",   cert.issueDate],
    ["Shape",        cert.shape],
    ["Carat Weight", cert.caratWeight],
    ["Measurements", cert.measurements],
    ["Origin",       cert.origin],
  ] as [string, string | undefined][]).filter(([, v]) => !!v) as [string, string][];

  const rightSpecs: [string, string][] = ([
    ["Color",        cert.color],
    ["Clarity",      cert.clarity],
    ["Cut Grade",    cert.cut],
    ["Polish",       cert.polish],
    ["Symmetry",     cert.symmetry],
    ["Fluorescence", cert.fluorescence],
    cert.metal        ? ["Metal",        cert.metal]        : null,
    cert.totalWeight  ? ["Total Weight", cert.totalWeight]  : null,
    cert.clientName   ? ["Client",       cert.clientName]   : null,
  ] as ([string, string] | null)[]).filter((r): r is [string, string] => r !== null && !!r[1]);

  return (
    <div style={{ height: "100%", width: "100%", display: "flex", background: "#fff" }}>

      {/* ── Left image column ── */}
      <div style={{
        width: 170, flexShrink: 0,
        display: "flex", flexDirection: "column",
        borderRight: "1.5px solid #F0E4C0",
        background: "linear-gradient(180deg, #FFFDF5 0%, #FEF6E4 100%)",
      }}>
        {/* Image */}
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          {cert.imageDataUrl ? (
            <img src={cert.imageDataUrl} alt="" crossOrigin="anonymous"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : (
            <div style={{
              width: "100%", height: "100%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg,#FEF9EE,#FAF0D7)",
            }}>
              <img src={logo} alt="" crossOrigin="anonymous"
                style={{ height: 64, width: 64, objectFit: "contain", opacity: 0.2 }} />
            </div>
          )}
        </div>
        {/* Gold accent bar below image */}
        <div style={{ height: 6, background: "linear-gradient(90deg,#C9A84C,#E8C96B,#C9A84C)" }} />
        {/* Report no vertically */}
        <div style={{
          padding: "14px 0", display: "flex", alignItems: "center", justifyContent: "center",
          background: "#1a1a2e",
        }}>
          <span style={{
            fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase",
            color: "#C9A84C", fontWeight: 600,
            writingMode: "horizontal-tb",
            textAlign: "center",
          }}>
            {cert.reportNo || "JEWELREPORT.COM"}
          </span>
        </div>
      </div>

      {/* ── Right content area ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "18px 22px 16px", minWidth: 0 }}>

        {/* Top row: title + logo */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 4 }}>
              Gemological Certificate
            </div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: "#1a1a2e", lineHeight: 1 }}>
              Certificate Details
            </div>
            <div style={{ height: 2, width: 100, background: "linear-gradient(90deg,#C9A84C,transparent)", marginTop: 7 }} />
          </div>
          {/* Logo — top right */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
            <img src={logo} alt="" crossOrigin="anonymous" style={{ height: 34, width: 34, objectFit: "contain" }} />
            <div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 15, color: "#1a1a2e", lineHeight: 1 }}>
                Jewel<span style={{ color: "#C9A84C" }}>Report</span>
              </div>
              <div style={{ fontSize: 7.5, letterSpacing: "0.3em", textTransform: "uppercase", color: "#9CA3AF", marginTop: 3 }}>
                Certification Lab
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#F0E4C0", marginBottom: 14 }} />

        {/* Two-column spec grid */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 28px", alignContent: "start" }}>
          {/* Left specs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {leftSpecs.map(([label, value]) => (
              <div key={label} style={{ borderBottom: "1px solid #F3F4F6", paddingBottom: 6 }}>
                <div style={{ fontSize: 7.5, letterSpacing: "0.28em", textTransform: "uppercase", color: "#9CA3AF" }}>{label}</div>
                <div style={{ fontSize: 11.5, color: "#111827", fontWeight: 600, marginTop: 2 }}>{value}</div>
              </div>
            ))}
          </div>
          {/* Right specs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {rightSpecs.map(([label, value]) => (
              <div key={label} style={{ borderBottom: "1px solid #F3F4F6", paddingBottom: 6 }}>
                <div style={{ fontSize: 7.5, letterSpacing: "0.28em", textTransform: "uppercase", color: "#9CA3AF" }}>{label}</div>
                <div style={{ fontSize: 11.5, color: "#111827", fontWeight: 600, marginTop: 2 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Remarks */}
        {cert.remarks && (
          <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px solid #F0E4C0" }}>
            <div style={{ fontSize: 7.5, letterSpacing: "0.28em", textTransform: "uppercase", color: "#9CA3AF" }}>Remarks</div>
            <p style={{ fontSize: 10, color: "#374151", marginTop: 2, lineHeight: 1.45 }}>{cert.remarks}</p>
          </div>
        )}

        {/* Footer: text left · QR bottom-right */}
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          marginTop: 12, paddingTop: 10, borderTop: "1.5px solid #F0E4C0",
        }}>
          <div>
            <div style={{ fontSize: 7.5, color: "#9CA3AF", letterSpacing: "0.1em", marginBottom: 3 }}>
              Property of JewelReport Certification Lab
            </div>
            <div style={{ fontSize: 8.5, color: "#C9A84C", letterSpacing: "0.35em", textTransform: "uppercase" }}>
              JEWELREPORT.COM
            </div>
            <div style={{ fontSize: 7.5, color: "#9CA3AF", marginTop: 3 }}>
              Scan QR code to verify authenticity
            </div>
          </div>
          {/* QR — bottom right */}
          <div style={{ padding: 5, background: "#fff", border: "1.5px solid rgba(201,168,76,0.5)", borderRadius: 8, flexShrink: 0 }}>
            <QRCodeSVG value={verifyUrl} size={64} level="M" />
          </div>
        </div>
      </div>
    </div>
  );
}
