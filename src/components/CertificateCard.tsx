import { QRCodeSVG } from "qrcode.react";
import { forwardRef } from "react";
import type { Certificate } from "@/lib/store";
import logo from "@/assets/logo.png";

// PAN card / CR80 size: 85.6 × 53.98 mm  ≈  1.586 : 1
// Rendered at 856 × 540 px (10 px per mm) for crisp PDF export.
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
        className="relative overflow-hidden"
        style={{
          width: CARD_W,
          height: CARD_H,
          borderRadius: 24,
          background: "#FFFFFF",
          boxShadow: "0 8px 40px -8px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)",
        }}
      >
        {/* Subtle gold corner accents */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 856 540">
          {/* top-left corner */}
          <path d="M24,2 L2,2 L2,24" fill="none" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round" />
          {/* top-right corner */}
          <path d="M832,2 L854,2 L854,24" fill="none" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round" />
          {/* bottom-left corner */}
          <path d="M2,516 L2,538 L24,538" fill="none" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round" />
          {/* bottom-right corner */}
          <path d="M854,516 L854,538 L832,538" fill="none" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round" />
          {/* thin gold border */}
          <rect x="10" y="10" width="836" height="520" rx="18" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.35" />
        </svg>

        {/* Subtle guilloche watermark */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" viewBox="0 0 856 540">
          <defs>
            <pattern id="grid-w" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#8B6914" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="856" height="540" fill="url(#grid-w)" />
          <circle cx="428" cy="270" r="190" fill="none" stroke="#8B6914" strokeWidth="0.8" />
          <circle cx="428" cy="270" r="150" fill="none" stroke="#8B6914" strokeWidth="0.5" />
        </svg>

        {side === "front" ? (
          <FrontSide cert={cert} verifyUrl={verifyUrl} />
        ) : (
          <BackSide cert={cert} />
        )}
      </div>
    );
  }
);

// ─── FRONT ────────────────────────────────────────────────────────────────────
function FrontSide({ cert, verifyUrl }: { cert: Certificate; verifyUrl: string }) {
  return (
    <div className="relative h-full w-full flex flex-col" style={{ padding: "28px 32px 22px" }}>

      {/* TOP: Logo centred + report number top-right */}
      <div className="flex items-start justify-between">
        {/* Logo block — centred vertically in its column */}
        <div className="flex flex-col items-center gap-1.5 flex-1">
          <img
            src={logo}
            alt="JewelReport"
            className="object-contain"
            style={{ height: 64, width: 64 }}
            crossOrigin="anonymous"
          />
          <div style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 22, lineHeight: 1, color: "#1a1a2e" }}>
            Jewel<span style={{ color: "#C9A84C" }}>Report</span>
          </div>
          <div style={{ fontSize: 7.5, letterSpacing: "0.35em", textTransform: "uppercase", color: "#6B7280" }}>
            Certification Lab
          </div>
        </div>

        {/* Report No */}
        <div className="text-right" style={{ minWidth: 140 }}>
          <div style={{ fontSize: 7.5, letterSpacing: "0.3em", textTransform: "uppercase", color: "#9CA3AF" }}>Report No.</div>
          <div style={{ fontFamily: "monospace", fontSize: 13, letterSpacing: "0.08em", color: "#C9A84C", fontWeight: 600, marginTop: 3 }}>
            {cert.reportNo}
          </div>
          <div style={{ fontSize: 7.5, letterSpacing: "0.25em", textTransform: "uppercase", color: "#9CA3AF", marginTop: 6 }}>
            Issue Date
          </div>
          <div style={{ fontSize: 11, color: "#374151", marginTop: 2 }}>{cert.issueDate}</div>
        </div>
      </div>

      {/* Gold divider */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)", margin: "12px 0", opacity: 0.5 }} />

      {/* BODY: item image left + specs right */}
      <div className="flex gap-5 flex-1 min-h-0">
        {/* Item image */}
        <div
          className="shrink-0 rounded-xl overflow-hidden flex items-center justify-center"
          style={{
            width: 148,
            height: 148,
            background: "linear-gradient(135deg, #FEF9EE 0%, #FAF0D7 100%)",
            border: "1px solid rgba(201,168,76,0.35)",
          }}
        >
          {cert.imageDataUrl ? (
            <img src={cert.imageDataUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
          ) : (
            <svg viewBox="0 0 100 100" style={{ width: 80, height: 80 }}>
              <defs>
                <linearGradient id="dg2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#DBEAFE" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
              <polygon points="20,42 50,12 80,42 50,92" fill="url(#dg2)" stroke="#C9A84C" strokeWidth="1" />
              <polygon points="20,42 35,42 50,12" fill="#fff" opacity="0.45" />
              <line x1="20" y1="42" x2="80" y2="42" stroke="#C9A84C" strokeWidth="0.7" opacity="0.8" />
            </svg>
          )}
        </div>

        {/* Specs grid */}
        <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-1.5" style={{ fontSize: 11, alignContent: "start" }}>
          <Spec label="Type"    value={cert.type} />
          <Spec label="Item"    value={cert.itemName} />
          <Spec label="Shape"   value={cert.shape} />
          <Spec label="Carat"   value={cert.caratWeight} />
          <Spec label="Color"   value={cert.color} />
          <Spec label="Clarity" value={cert.clarity} />
          <Spec label="Cut"     value={cert.cut} />
          <Spec label="Origin"  value={cert.origin} />
          {cert.clientName && <Spec label="Client" value={cert.clientName} />}
        </div>
      </div>

      {/* FOOTER: scan label + QR */}
      <div className="flex items-end justify-between mt-3">
        <div>
          <div style={{ fontSize: 7.5, letterSpacing: "0.25em", textTransform: "uppercase", color: "#9CA3AF" }}>
            Scan to verify authenticity
          </div>
          <div style={{ fontSize: 7.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginTop: 3 }}>
            JEWELREPORT.COM
          </div>
        </div>
        <div style={{ padding: 6, background: "#fff", border: "1px solid rgba(201,168,76,0.4)", borderRadius: 8 }}>
          <QRCodeSVG value={verifyUrl} size={78} level="M" />
        </div>
      </div>
    </div>
  );
}

// ─── BACK ─────────────────────────────────────────────────────────────────────
function BackSide({ cert }: { cert: Certificate }) {
  const allSpecs: [string, string | undefined][] = [
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
  ];

  return (
    <div className="relative h-full w-full flex flex-col" style={{ padding: "24px 32px 20px" }}>

      {/* Header */}
      <div className="text-center mb-3">
        <div style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 18, color: "#1a1a2e", letterSpacing: "0.05em" }}>
          Certificate Details
        </div>
        <div style={{ height: 1.5, width: 80, margin: "6px auto 0", background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />
      </div>

      {/* Specs grid */}
      <div
        className="flex-1 grid gap-x-8 gap-y-1"
        style={{ gridTemplateColumns: "1fr 1fr", fontSize: 10.5, alignContent: "start" }}
      >
        {allSpecs.map(([label, value]) => (
          <div key={label} style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", paddingBottom: 4 }}>
            <div style={{ fontSize: 7.5, letterSpacing: "0.25em", textTransform: "uppercase", color: "#9CA3AF" }}>
              {label}
            </div>
            <div style={{ color: "#1F2937", marginTop: 1, fontWeight: 500 }}>{value || "—"}</div>
          </div>
        ))}
      </div>

      {/* Remarks */}
      {cert.remarks && (
        <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px solid rgba(0,0,0,0.07)" }}>
          <div style={{ fontSize: 7.5, letterSpacing: "0.25em", textTransform: "uppercase", color: "#9CA3AF" }}>Remarks</div>
          <p style={{ fontSize: 10, color: "#374151", marginTop: 2, lineHeight: 1.5 }}>{cert.remarks}</p>
        </div>
      )}

      {/* Footer */}
      <div
        className="flex items-center justify-between"
        style={{ marginTop: 10, paddingTop: 8, borderTop: "1px solid rgba(201,168,76,0.3)", fontSize: 7.5 }}
      >
        <span style={{ color: "#9CA3AF", letterSpacing: "0.1em" }}>
          This card is the property of JewelReport Certification Lab.
        </span>
        <span style={{ color: "#C9A84C", letterSpacing: "0.25em", textTransform: "uppercase" }}>
          JEWELREPORT.COM
        </span>
      </div>
    </div>
  );
}

// ─── helpers ──────────────────────────────────────────────────────────────────
function Spec({ label, value }: { label: string; value?: string }) {
  return (
    <div style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", paddingBottom: 4 }}>
      <div style={{ fontSize: 7.5, letterSpacing: "0.25em", textTransform: "uppercase", color: "#9CA3AF" }}>
        {label}
      </div>
      <div style={{ fontSize: 11, color: "#1F2937", marginTop: 1, fontWeight: 500 }}>{value || "—"}</div>
    </div>
  );
}
