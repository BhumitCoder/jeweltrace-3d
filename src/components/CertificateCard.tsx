import { QRCodeSVG } from "qrcode.react";
import { forwardRef } from "react";
import type { Certificate } from "@/lib/store";
import logo from "@/assets/logo.png";

// CR80 / PAN card aspect: 85.6 × 53.98 mm  ≈ 1.586:1
// At print scale we render 856 × 540 px (10x mm) for crisp PDF export.
export const CARD_W = 856;
export const CARD_H = 540;

interface Props {
  cert: Certificate;
  side: "front" | "back";
}

export const CertificateCard = forwardRef<HTMLDivElement, Props>(function CertificateCard(
  { cert, side },
  ref
) {
  const verifyUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/verify?id=${encodeURIComponent(cert.reportNo)}`
      : `/verify?id=${cert.reportNo}`;

  return (
    <div
      ref={ref}
      className="relative overflow-hidden text-white"
      style={{
        width: CARD_W,
        height: CARD_H,
        borderRadius: 28,
        background:
          "linear-gradient(135deg, oklch(0.18 0.05 265) 0%, oklch(0.10 0.04 265) 60%, oklch(0.20 0.06 265) 100%)",
        boxShadow: "0 25px 60px -20px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(212,175,55,0.4)",
      }}
    >
      {/* Holographic foil sweep */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none animate-holo bg-holo"
        style={{ mixBlendMode: "screen" }}
      />
      {/* Guilloché pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none"
        viewBox="0 0 856 540"
      >
        <defs>
          <pattern id="grid" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#D4AF37" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="856" height="540" fill="url(#grid)" />
        <circle cx="428" cy="270" r="220" fill="none" stroke="#D4AF37" strokeWidth="0.6" />
        <circle cx="428" cy="270" r="180" fill="none" stroke="#D4AF37" strokeWidth="0.4" />
      </svg>

      {/* Gold border frame */}
      <div
        className="absolute inset-3 rounded-[22px] pointer-events-none"
        style={{ border: "1.5px solid", borderImage: "linear-gradient(135deg, #f5d97a, #b8862e, #f5d97a) 1" }}
      />

      {side === "front" ? (
        <FrontSide cert={cert} verifyUrl={verifyUrl} />
      ) : (
        <BackSide cert={cert} />
      )}
    </div>
  );
});

function FrontSide({ cert, verifyUrl }: { cert: Certificate; verifyUrl: string }) {
  return (
    <div className="relative h-full w-full p-8 flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="h-14 w-14 object-contain" crossOrigin="anonymous" />
          <div>
            <div style={{ fontFamily: "Playfair Display, serif" }} className="text-2xl leading-none">
              <span className="text-white">Jewel</span>
              <span style={{ color: "#E8C56A" }}>Report</span>
            </div>
            <div className="text-[9px] tracking-[0.35em] uppercase text-white/60 mt-1">
              Certification Lab
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[9px] uppercase tracking-[0.25em] text-white/60">Report No.</div>
          <div className="text-base font-mono tracking-wider" style={{ color: "#E8C56A" }}>
            {cert.reportNo}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-5 flex-1 flex gap-6">
        {/* Image / Diamond visual */}
        <div className="w-44 h-44 rounded-xl overflow-hidden flex items-center justify-center"
             style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(255,255,255,0.05))",
                      border: "1px solid rgba(212,175,55,0.4)" }}>
          {cert.imageDataUrl ? (
            <img src={cert.imageDataUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
          ) : (
            <svg viewBox="0 0 100 100" className="w-28 h-28">
              <defs>
                <linearGradient id="dg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#E8F4FF" />
                  <stop offset="100%" stopColor="#5B7FB6" />
                </linearGradient>
              </defs>
              <polygon points="20,40 50,15 80,40 50,90" fill="url(#dg)" stroke="#E8C56A" strokeWidth="0.5" />
              <polygon points="20,40 35,40 50,15" fill="#fff" opacity="0.3" />
              <line x1="20" y1="40" x2="80" y2="40" stroke="#E8C56A" strokeWidth="0.4" opacity="0.6" />
            </svg>
          )}
        </div>

        {/* Specs */}
        <div className="flex-1 grid grid-cols-2 gap-x-5 gap-y-2 text-[12px]">
          <Spec label="Type" value={cert.type} />
          <Spec label="Item" value={cert.itemName} />
          <Spec label="Shape" value={cert.shape} />
          <Spec label="Carat" value={cert.caratWeight} />
          <Spec label="Color" value={cert.color} />
          <Spec label="Clarity" value={cert.clarity} />
          <Spec label="Cut" value={cert.cut} />
          <Spec label="Origin" value={cert.origin} />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="text-[9px] uppercase tracking-[0.25em] text-white/60">Issue Date</div>
          <div className="text-sm" style={{ color: "#E8C56A" }}>{cert.issueDate}</div>
          <div className="mt-2 text-[9px] tracking-[0.25em] text-white/50">SCAN TO VERIFY AUTHENTICITY</div>
        </div>
        <div className="bg-white p-2 rounded-md">
          <QRCodeSVG value={verifyUrl} size={86} level="M" />
        </div>
      </div>
    </div>
  );
}

function BackSide({ cert }: { cert: Certificate }) {
  return (
    <div className="relative h-full w-full p-8 flex flex-col">
      <div className="text-center">
        <div style={{ fontFamily: "Playfair Display, serif", color: "#E8C56A" }} className="text-2xl">
          Certificate Details
        </div>
        <div className="h-px w-24 mx-auto mt-2"
             style={{ background: "linear-gradient(90deg, transparent, #E8C56A, transparent)" }} />
      </div>

      <div className="mt-5 flex-1 grid grid-cols-2 gap-x-6 gap-y-2 text-[12px]">
        <Spec label="Measurements" value={cert.measurements} />
        <Spec label="Polish" value={cert.polish} />
        <Spec label="Symmetry" value={cert.symmetry} />
        <Spec label="Fluorescence" value={cert.fluorescence} />
        {cert.metal && <Spec label="Metal" value={cert.metal} />}
        {cert.totalWeight && <Spec label="Total Weight" value={cert.totalWeight} />}
        <Spec label="Report No." value={cert.reportNo} />
        <Spec label="Issued" value={cert.issueDate} />
      </div>

      {cert.remarks && (
        <div className="mt-3">
          <div className="text-[9px] uppercase tracking-[0.25em] text-white/60">Remarks</div>
          <p className="text-[11px] text-white/85 leading-snug">{cert.remarks}</p>
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[9px] text-white/55">
        <span>This card is the property of JewelReport Certification Lab.</span>
        <span className="tracking-widest" style={{ color: "#E8C56A" }}>JEWELREPORT.COM</span>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value?: string }) {
  return (
    <div className="border-b border-white/10 pb-1">
      <div className="text-[8.5px] uppercase tracking-[0.2em] text-white/55">{label}</div>
      <div className="text-[12px] text-white">{value || "—"}</div>
    </div>
  );
}
