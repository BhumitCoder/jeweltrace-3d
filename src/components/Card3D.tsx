import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { getCertificates, type Certificate } from "@/lib/store";
import logo from "@/assets/logo.png";

// 3D rotating PVC/PAN-size certificate card (CR80 ratio 1.586:1)
// Shows the most recent real certificate from localStorage, or a clean
// "Sample" card if no certificates have been issued yet.
export function Card3D({ width = 420 }: { width?: number }) {
  const w = width;
  const h = Math.round(w / 1.586);
  const [cert, setCert] = useState<Certificate | null>(null);

  useEffect(() => {
    const all = getCertificates();
    if (all.length > 0) setCert(all[0]);
  }, []);

  return (
    <div
      className="relative mx-auto"
      style={{ width: w, height: h, perspective: 1600 }}
      aria-hidden
    >
      {/* glow halo */}
      <div
        className="absolute -inset-16 rounded-full blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.14 80 / 0.35), transparent 70%)",
        }}
      />
      {/* shadow under card */}
      <div
        className="absolute left-1/2 -bottom-8 -translate-x-1/2 rounded-[50%] blur-2xl"
        style={{
          width: w * 0.85,
          height: 24,
          background: "rgba(0,0,0,0.55)",
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

function CardFace({
  side,
  w,
  h,
  cert,
}: {
  side: "front" | "back";
  w: number;
  h: number;
  cert: Certificate | null;
}) {
  const isBack = side === "back";
  return (
    <div
      className="absolute inset-0 overflow-hidden text-white"
      style={{
        borderRadius: 22,
        backfaceVisibility: "hidden",
        transform: isBack ? "rotateY(180deg)" : "rotateY(0deg)",
        background:
          "linear-gradient(135deg, oklch(0.20 0.06 265) 0%, oklch(0.10 0.04 265) 60%, oklch(0.22 0.07 265) 100%)",
        boxShadow:
          "0 30px 70px -20px rgba(0,0,0,0.7), inset 0 0 0 1.5px rgba(212,175,55,0.55)",
      }}
    >
      {/* holographic foil sweep */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none animate-holo bg-holo"
        style={{ mixBlendMode: "screen" }}
      />
      {/* guilloché */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.10] pointer-events-none"
        viewBox="0 0 856 540"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id={`g3d-${side}`} width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="856" height="540" fill={`url(#g3d-${side})`} />
        <circle cx="428" cy="270" r="220" fill="none" stroke="#D4AF37" strokeWidth="0.7" />
      </svg>
      {/* inner gold frame */}
      <div
        className="absolute inset-2 pointer-events-none"
        style={{
          borderRadius: 18,
          border: "1px solid",
          borderImage:
            "linear-gradient(135deg, #f5d97a, #b8862e, #f5d97a) 1",
        }}
      />

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
        ["Type", cert.type],
        ["Shape", cert.shape || "—"],
        ["Carat", cert.caratWeight || "—"],
        ["Color", cert.color || "—"],
        ["Clarity", cert.clarity || "—"],
        ["Cut", cert.cut || "—"],
      ]
    : [
        ["Type", "Lab Grown Diamond"],
        ["Shape", "Round Brilliant"],
        ["Carat", "1.52 ct"],
        ["Color", "E"],
        ["Clarity", "VS1"],
        ["Cut", "Excellent"],
      ];

  return (
    <div
      className="relative h-full w-full flex flex-col"
      style={{ padding: pad }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt=""
            style={{ width: h * 0.13, height: h * 0.13 }}
            className="object-contain"
          />
          <div>
            <div
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: w * 0.048,
                lineHeight: 1,
              }}
            >
              <span className="text-white">Jewel</span>
              <span style={{ color: "#E8C56A" }}>Report</span>
            </div>
            <div
              style={{ fontSize: w * 0.016, letterSpacing: "0.28em" }}
              className="uppercase text-white/60 mt-0.5"
            >
              Certification Lab
            </div>
          </div>
        </div>
        <div className="text-right">
          <div
            style={{ fontSize: w * 0.016, letterSpacing: "0.25em" }}
            className="uppercase text-white/60"
          >
            Report No.
          </div>
          <div
            className="font-mono"
            style={{ fontSize: w * 0.032, color: "#E8C56A", letterSpacing: "0.06em" }}
          >
            {cert ? cert.reportNo : "SAMPLE"}
          </div>
          {!cert && (
            <div style={{ fontSize: w * 0.014, color: "#E8C56A66" }}>
              Issue a cert to see live data
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 mt-2 flex gap-3 min-h-0">
        {/* Image / Diamond visual */}
        <div
          className="rounded-lg overflow-hidden flex items-center justify-center shrink-0"
          style={{
            width: imgSize,
            height: imgSize,
            background:
              "linear-gradient(135deg, rgba(212,175,55,0.18), rgba(255,255,255,0.05))",
            border: "1px solid rgba(212,175,55,0.45)",
          }}
        >
          {cert?.imageDataUrl ? (
            <img
              src={cert.imageDataUrl}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <svg viewBox="0 0 100 100" style={{ width: "75%", height: "75%" }}>
              <defs>
                <linearGradient id="dg3d" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#E8F4FF" />
                  <stop offset="100%" stopColor="#5B7FB6" />
                </linearGradient>
              </defs>
              <polygon
                points="20,40 50,15 80,40 50,90"
                fill="url(#dg3d)"
                stroke="#E8C56A"
                strokeWidth="0.6"
              />
              <polygon points="20,40 35,40 50,15" fill="#fff" opacity="0.35" />
              <line x1="20" y1="40" x2="80" y2="40" stroke="#E8C56A" strokeWidth="0.4" opacity="0.6" />
            </svg>
          )}
        </div>

        {/* Specs */}
        <div
          className="flex-1 grid grid-cols-2 gap-x-3 gap-y-1 content-start"
          style={{ fontSize: w * 0.024 }}
        >
          {specs.map(([l, v]) => (
            <div key={l} className="border-b border-white/10 pb-0.5">
              <div
                className="uppercase text-white/55"
                style={{ fontSize: w * 0.015, letterSpacing: "0.18em" }}
              >
                {l}
              </div>
              <div className="text-white truncate" style={{ fontSize: w * 0.024 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-2 flex items-end justify-between">
        <div>
          <div
            className="uppercase text-white/60"
            style={{ fontSize: w * 0.016, letterSpacing: "0.22em" }}
          >
            Issue Date
          </div>
          <div style={{ color: "#E8C56A", fontSize: w * 0.026 }}>
            {cert ? cert.issueDate : "13 May 2026"}
          </div>
          <div
            className="text-white/50 mt-0.5"
            style={{ fontSize: w * 0.014, letterSpacing: "0.22em" }}
          >
            SCAN TO VERIFY
          </div>
        </div>
        <div className="bg-white p-1 rounded">
          <QRCodeSVG
            value={cert ? verifyUrl : (typeof window !== "undefined" ? window.location.origin : "https://jewelreport.com")}
            size={qrSize}
            level="M"
          />
        </div>
      </div>
    </div>
  );
}

function BackContent({ w, cert }: { w: number; h?: number; cert: Certificate | null }) {
  const pad = w * 0.05;

  const specs = cert
    ? [
        ["Measurements", cert.measurements || "—"],
        ["Polish", cert.polish || "—"],
        ["Symmetry", cert.symmetry || "—"],
        ["Fluorescence", cert.fluorescence || "—"],
        ["Origin", cert.origin || "—"],
        ["Issued", cert.issueDate || "—"],
      ]
    : [
        ["Measurements", "7.31 × 7.34 × 4.52 mm"],
        ["Polish", "Excellent"],
        ["Symmetry", "Excellent"],
        ["Fluorescence", "None"],
        ["Origin", "Laboratory Grown"],
        ["Issued", "13 May 2026"],
      ];

  return (
    <div className="relative h-full w-full flex flex-col" style={{ padding: pad }}>
      <div className="text-center">
        <div
          style={{
            fontFamily: "Playfair Display, serif",
            color: "#E8C56A",
            fontSize: w * 0.05,
          }}
        >
          {cert ? cert.itemName || "Certificate Details" : "Round Brilliant Diamond"}
        </div>
        <div
          className="h-px mx-auto mt-1.5"
          style={{
            width: w * 0.18,
            background:
              "linear-gradient(90deg, transparent, #E8C56A, transparent)",
          }}
        />
      </div>

      <div
        className="flex-1 mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5"
        style={{ fontSize: w * 0.026 }}
      >
        {specs.map(([l, v]) => (
          <div key={l} className="border-b border-white/10 pb-0.5">
            <div
              className="uppercase text-white/55"
              style={{ fontSize: w * 0.017, letterSpacing: "0.2em" }}
            >
              {l}
            </div>
            <div className="text-white truncate">{v}</div>
          </div>
        ))}
      </div>

      <div
        className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-white/55"
        style={{ fontSize: w * 0.017 }}
      >
        <span>Property of JewelReport Lab.</span>
        <span style={{ color: "#E8C56A", letterSpacing: "0.2em" }}>JEWELREPORT.COM</span>
      </div>
    </div>
  );
}
