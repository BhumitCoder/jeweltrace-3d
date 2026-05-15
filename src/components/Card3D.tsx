import { QRCodeSVG } from "qrcode.react";
import logo from "@/assets/logo.png";
import type { Certificate } from "@/lib/store";

const DUMMY = {
  reportNo: "LGD-26-004821",
  type: "Lab Grown Diamond",
  itemName: "Round Brilliant Diamond",
  shape: "Round Brilliant",
  caratWeight: "1.52 ct",
  color: "E",
  clarity: "VS1",
  cut: "Excellent",
  polish: "Excellent",
  symmetry: "Excellent",
  fluorescence: "None",
  origin: "Lab Grown (CVD)",
  measurements: "7.41 × 7.43 × 4.61 mm",
  issueDate: "13 May 2026",
  imageDataUrl: undefined as string | undefined,
};

export function Card3D({ width = 420 }: { width?: number }) {
  const w = width;
  const h = Math.round(w / 1.586);
  const cert = DUMMY as unknown as Certificate;

  return (
    <div
      className="relative mx-auto"
      style={{ width: w, height: h, perspective: 1600 }}
      aria-hidden
    >
      {/* ambient gold glow */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          inset: -w * 0.15,
          background:
            "radial-gradient(circle, oklch(0.78 0.14 80 / 0.20) 0%, oklch(0.65 0.12 80 / 0.07) 50%, transparent 75%)",
        }}
      />
      {/* drop shadow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
        style={{
          bottom: -(h * 0.10),
          width: w * 0.80,
          height: h * 0.09,
          background: "rgba(0,0,0,0.30)",
          filter: "blur(28px)",
        }}
      />

      <div
        className="relative w-full h-full animate-card-spin"
        style={{ transformStyle: "preserve-3d" }}
      >
        <CardFace side="front" w={w} h={h} cert={cert} />
        <CardFace side="back" w={w} h={h} cert={cert} />
      </div>
    </div>
  );
}

function CardFace({ side, w, h, cert }: { side: "front" | "back"; w: number; h: number; cert: Certificate | null }) {
  const isBack = side === "back";
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        borderRadius: 22,
        backfaceVisibility: "hidden",
        transform: isBack ? "rotateY(180deg)" : "rotateY(0deg)",
        background: "#F8F5EF",
        boxShadow: "0 20px 60px -15px rgba(0,0,0,0.25), 0 0 0 1.5px rgba(184,146,42,0.5), inset 0 0 0 1px rgba(255,255,255,0.9)",
      }}
    >
      {/* Subtle guilloché watermark */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 856 540"
        preserveAspectRatio="none"
        style={{ opacity: 0.04 }}
      >
        <defs>
          <pattern id={`g3d-${side}`} width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#B8922A" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="856" height="540" fill={`url(#g3d-${side})`} />
        <circle cx="428" cy="270" r="220" fill="none" stroke="#B8922A" strokeWidth="0.8" />
      </svg>

      {isBack ? (
        <BackContent w={w} h={h} cert={cert} />
      ) : (
        <FrontContent w={w} h={h} cert={cert} />
      )}
    </div>
  );
}

function FrontContent({ w, h, cert }: { w: number; h: number; cert: Certificate | null }) {
  const pad = Math.round(w * 0.042);
  const imgSize = Math.round(h * 0.36);
  const qrSize = Math.round(h * 0.28);
  const verifyUrl = `/verify?id=${encodeURIComponent(cert?.reportNo ?? "")}`;

  const specs = cert
    ? [
        ["Type",    cert.type],
        ["Shape",   cert.shape || "—"],
        ["Carat",   cert.caratWeight || "—"],
        ["Color",   cert.color || "—"],
        ["Clarity", cert.clarity || "—"],
        ["Cut",     cert.cut || "—"],
      ]
    : [
        ["Type",    "Lab Grown Diamond"],
        ["Shape",   "Round Brilliant"],
        ["Carat",   "1.52 ct"],
        ["Color",   "E"],
        ["Clarity", "VS1"],
        ["Cut",     "Excellent"],
      ];

  return (
    <div className="relative h-full w-full flex flex-col" style={{ padding: pad }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="" style={{ width: h * 0.13, height: h * 0.13 }} className="object-contain" />
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: w * 0.048, lineHeight: 1, fontWeight: 400 }}>
              <span style={{ color: "#111111" }}>Jewels</span>
              <span style={{ color: "#B8922A" }}>Report</span>
            </div>
            <div style={{ fontSize: w * 0.022, letterSpacing: "0.22em", color: "#111111", fontWeight: 900 }} className="uppercase mt-0.5">
              Certification Lab
            </div>
          </div>
        </div>
        <div className="text-right">
          <div style={{ fontSize: w * 0.016, letterSpacing: "0.25em", color: "#888888", fontWeight: 600 }} className="uppercase">
            Report No.
          </div>
          <div className="font-mono" style={{ fontSize: w * 0.030, color: "#111111", letterSpacing: "0.06em", fontWeight: 800 }}>
            {cert ? cert.reportNo : "SAMPLE"}
          </div>
        </div>
      </div>

      {/* Gold separator */}
      <div style={{ height: 2, background: "linear-gradient(90deg,#B8922A,#D4A843,#B8922A)", margin: `${Math.round(w*0.018)}px 0`, borderRadius: 2 }} />

      {/* Body */}
      <div className="flex-1 flex gap-3 min-h-0">
        {/* Diamond visual */}
        <div
          className="rounded-xl overflow-hidden flex items-center justify-center shrink-0"
          style={{
            width: imgSize, height: imgSize,
            background: "#EDE8DF",
            border: "1.5px solid rgba(184,146,42,0.4)",
          }}
        >
          {cert?.imageDataUrl ? (
            <img src={cert.imageDataUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <svg viewBox="0 0 100 100" style={{ width: "72%", height: "72%" }}>
              <defs>
                <linearGradient id="dg3d" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#E8F4FF" />
                  <stop offset="100%" stopColor="#7BA8D4" />
                </linearGradient>
              </defs>
              <polygon points="20,40 50,15 80,40 50,90" fill="url(#dg3d)" stroke="#B8922A" strokeWidth="0.8" />
              <polygon points="20,40 35,40 50,15" fill="#fff" opacity="0.40" />
              <line x1="20" y1="40" x2="80" y2="40" stroke="#B8922A" strokeWidth="0.5" opacity="0.7" />
            </svg>
          )}
        </div>

        {/* Specs grid */}
        <div className="flex-1 grid grid-cols-2 gap-x-3 gap-y-1 content-start" style={{ fontSize: w * 0.024 }}>
          {specs.map(([l, v]) => (
            <div key={l} style={{ borderBottom: "1px solid rgba(184,146,42,0.2)", paddingBottom: 3 }}>
              <div style={{ fontSize: w * 0.015, letterSpacing: "0.18em", color: "#888888", fontWeight: 600 }} className="uppercase">{l}</div>
              <div style={{ color: "#111111", fontWeight: 700, fontSize: w * 0.024 }} className="truncate">{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-2 flex items-end justify-between">
        <div>
          <div style={{ fontSize: w * 0.016, letterSpacing: "0.22em", color: "#888888", fontWeight: 600 }} className="uppercase">Issue Date</div>
          <div style={{ color: "#B8922A", fontSize: w * 0.026, fontWeight: 700 }}>
            {cert ? cert.issueDate : "13 May 2026"}
          </div>
          <div style={{ fontSize: w * 0.014, letterSpacing: "0.22em", color: "#AAAAAA", fontWeight: 600 }} className="uppercase mt-0.5">Scan to Verify</div>
        </div>
        <div style={{ background: "#fff", padding: 5, borderRadius: 8, border: "1.5px solid rgba(184,146,42,0.4)" }}>
          <QRCodeSVG
            value={cert ? verifyUrl : (typeof window !== "undefined" ? window.location.origin : "https://jewelsreport.com")}
            size={qrSize}
            level="M"
          />
        </div>
      </div>
    </div>
  );
}

function BackContent({ w, h, cert }: { w: number; h: number; cert: Certificate | null }) {
  const pad = w * 0.05;

  const specs = cert
    ? [
        ["Measurements", cert.measurements || "—"],
        ["Polish",       cert.polish || "—"],
        ["Symmetry",     cert.symmetry || "—"],
        ["Fluorescence", cert.fluorescence || "—"],
        ["Origin",       cert.origin || "—"],
        ["Issued",       cert.issueDate || "—"],
      ]
    : [
        ["Measurements", "7.41 × 7.43 × 4.61 mm"],
        ["Polish",       "Excellent"],
        ["Symmetry",     "Excellent"],
        ["Fluorescence", "None"],
        ["Origin",       "Laboratory Grown"],
        ["Issued",       "13 May 2026"],
      ];

  return (
    <div className="relative h-full w-full flex flex-col" style={{ padding: pad }}>
      {/* Header */}
      <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
        <img src={logo} alt="" style={{ width: h * 0.12, height: h * 0.12, objectFit: "contain" }} />
        <div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: w * 0.042, lineHeight: 1, fontWeight: 400 }}>
            <span style={{ color: "#111111" }}>Jewels</span>
            <span style={{ color: "#B8922A" }}>Report</span>
          </div>
          <div style={{ fontSize: w * 0.020, letterSpacing: "0.22em", color: "#111111", fontWeight: 900 }} className="uppercase">
            Certification Lab
          </div>
        </div>
      </div>

      {/* Gold line */}
      <div style={{ height: 2, background: "linear-gradient(90deg,#B8922A,#D4A843,#B8922A)", marginBottom: 10, borderRadius: 2 }} />

      {/* Item name */}
      <div style={{ fontFamily: "Georgia, serif", color: "#111111", fontSize: w * 0.042, fontWeight: 700, marginBottom: 8 }}>
        {cert ? cert.itemName || "Certificate Details" : "Round Brilliant Diamond"}
      </div>

      {/* Specs */}
      <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-1.5" style={{ fontSize: w * 0.024 }}>
        {specs.map(([l, v]) => (
          <div key={l} style={{ borderBottom: "1px solid rgba(184,146,42,0.2)", paddingBottom: 3 }}>
            <div style={{ fontSize: w * 0.016, letterSpacing: "0.2em", color: "#888888", fontWeight: 600 }} className="uppercase">{l}</div>
            <div style={{ color: "#111111", fontWeight: 800, textTransform: "uppercase", fontSize: w * 0.024 }} className="truncate">{v}</div>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1.5px solid rgba(184,146,42,0.35)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: w * 0.016, color: "#888888", fontWeight: 600 }}>JewelsReport Certification Lab</span>
        <span style={{ color: "#B8922A", letterSpacing: "0.2em", fontWeight: 800, fontSize: w * 0.016 }}>JEWELSREPORT.COM</span>
      </div>
    </div>
  );
}
