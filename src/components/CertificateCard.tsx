import { QRCodeSVG } from "qrcode.react";
import { forwardRef } from "react";
import type { Certificate } from "@/lib/store";
import logo from "@/assets/logo.png";

// PAN card / CR80: 85.6 × 53.98 mm → rendered at 856 × 540 px (10 px/mm)
export const CARD_W = 856;
export const CARD_H = 540;

const GOLD   = "#C9A84C";
const NAVY   = "#0F1A35";
const NAVY2  = "#162040";
const WHITE  = "#FFFFFF";
const GREY   = "#6B7280";
const LIGHT  = "#F8F5EE";
const BORDER = "#E8DFC8";

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
        background: WHITE,
        overflow: "hidden",
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
        display: "flex", flexDirection: "column",
        boxSizing: "border-box",
      }}>
        {side === "front" ? <FrontSide /> : <BackSide cert={cert} verifyUrl={verifyUrl} />}
      </div>
    );
  }
);

/* ─── FRONT ──────────────────────────────────────────────────────────────────── */
function FrontSide() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", background: WHITE }}>
      {/* Corner brackets */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 856 540">
        <path d="M30,4 L4,4 L4,30"         fill="none" stroke={GOLD} strokeWidth="4.5" strokeLinecap="round" />
        <path d="M826,4 L852,4 L852,30"     fill="none" stroke={GOLD} strokeWidth="4.5" strokeLinecap="round" />
        <path d="M4,510 L4,536 L30,536"     fill="none" stroke={GOLD} strokeWidth="4.5" strokeLinecap="round" />
        <path d="M852,510 L852,536 L826,536" fill="none" stroke={GOLD} strokeWidth="4.5" strokeLinecap="round" />
        <rect x="16" y="16" width="824" height="508" rx="10" fill="none" stroke={GOLD} strokeWidth="0.7" opacity="0.3" />
      </svg>

      {/* Centre */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22, position: "relative", zIndex: 1 }}>
        <img src={logo} alt="JewelReport" crossOrigin="anonymous" style={{ height: 130, width: 130, objectFit: "contain" }} />
        <div>
          <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 50, lineHeight: 1, color: NAVY, letterSpacing: "0.01em", textAlign: "center" }}>
            Jewel<span style={{ color: GOLD }}>Report</span>
          </div>
          <div style={{ fontSize: 11, letterSpacing: "0.6em", textTransform: "uppercase", color: GREY, textAlign: "center", marginTop: 10 }}>
            Certification Lab
          </div>
        </div>
        <div style={{ width: 160, height: 1.5, background: `linear-gradient(90deg,transparent,${GOLD},transparent)` }} />
      </div>

      {/* Bottom URL */}
      <div style={{ paddingBottom: 28, textAlign: "center", position: "relative", zIndex: 1 }}>
        <span style={{ fontSize: 10, letterSpacing: "0.48em", textTransform: "uppercase", color: GOLD }}>JEWELREPORT.COM</span>
      </div>
    </div>
  );
}

/* ─── BACK ───────────────────────────────────────────────────────────────────── */
function BackSide({ cert, verifyUrl }: { cert: Certificate; verifyUrl: string }) {
  /* Split grading specs into left col and right col */
  const leftSpecs: [string, string | undefined][] = [
    ["Shape",        cert.shape],
    ["Carat Weight", cert.caratWeight],
    ["Measurements", cert.measurements],
    ["Origin",       cert.origin],
    ["Metal",        cert.metal],
    ["Total Weight", cert.totalWeight],
    ["Issue Date",   cert.issueDate],
    ["Client",       cert.clientName],
  ];

  const rightSpecs: [string, string | undefined][] = [
    ["Color",        cert.color],
    ["Clarity",      cert.clarity],
    ["Cut Grade",    cert.cut],
    ["Polish",       cert.polish],
    ["Symmetry",     cert.symmetry],
    ["Fluorescence", cert.fluorescence],
    ["Report Type",  cert.type],
    ["Item",         cert.itemName],
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

      {/* ── HEADER BAR ── */}
      <div style={{
        background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY2} 100%)`,
        height: 58, flexShrink: 0,
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        borderBottom: `2.5px solid ${GOLD}`,
      }}>
        {/* Logo + brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={logo} alt="" crossOrigin="anonymous" style={{ height: 32, width: 32, objectFit: "contain" }} />
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 16, color: WHITE, lineHeight: 1 }}>
              Jewel<span style={{ color: GOLD }}>Report</span>
            </div>
            <div style={{ fontSize: 7.5, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: 3 }}>
              Certification Lab
            </div>
          </div>
        </div>

        {/* Centre tag */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 8, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
            Gemological Certificate
          </div>
          <div style={{ fontSize: 9.5, letterSpacing: "0.25em", color: GOLD, fontWeight: 700, marginTop: 3 }}>
            {cert.reportNo || "—"}
          </div>
        </div>

        {/* Right: "Certificate of Authenticity" badge */}
        <div style={{
          padding: "5px 14px", borderRadius: 4,
          border: `1px solid rgba(201,168,76,0.4)`,
          background: "rgba(201,168,76,0.08)",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 7.5, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD }}>
            Certificate of
          </div>
          <div style={{ fontSize: 8.5, letterSpacing: "0.25em", textTransform: "uppercase", color: WHITE, fontWeight: 600, marginTop: 2 }}>
            Authenticity
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ flex: 1, display: "flex", minHeight: 0, background: WHITE }}>

        {/* Left: image + item info */}
        <div style={{
          width: 186, flexShrink: 0,
          borderRight: `1.5px solid ${BORDER}`,
          display: "flex", flexDirection: "column",
          background: LIGHT,
        }}>
          {/* Image — square */}
          <div style={{ width: 186, height: 186, flexShrink: 0, overflow: "hidden" }}>
            {cert.imageDataUrl ? (
              <img src={cert.imageDataUrl} alt="" crossOrigin="anonymous"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            ) : (
              <div style={{
                width: "100%", height: "100%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `linear-gradient(135deg, #F5EDD8, #EDE0C0)`,
              }}>
                <img src={logo} alt="" crossOrigin="anonymous" style={{ height: 68, width: 68, objectFit: "contain", opacity: 0.18 }} />
              </div>
            )}
          </div>

          {/* Gold separator */}
          <div style={{ height: 3, background: `linear-gradient(90deg,${GOLD},#E8C96B,${GOLD})`, flexShrink: 0 }} />

          {/* Item + type info below image */}
          <div style={{ flex: 1, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8, overflow: "hidden" }}>
            <SpecRow label="Item" value={cert.itemName} />
            <SpecRow label="Type" value={cert.type} />
            <SpecRow label="Client" value={cert.clientName} />
          </div>

          {/* Report no band */}
          <div style={{
            background: NAVY, padding: "8px 0",
            textAlign: "center", flexShrink: 0,
          }}>
            <div style={{ fontSize: 7.5, color: GOLD, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700 }}>
              {cert.reportNo || "JEWELREPORT"}
            </div>
          </div>
        </div>

        {/* Right: two-col grading grid */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 0", minWidth: 0 }}>

          {/* Grade columns header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 28px" }}>
            <ColHeader>Grading Data</ColHeader>
            <ColHeader>Additional Data</ColHeader>
          </div>
          <div style={{ height: 1, background: BORDER, margin: "8px 0 10px" }} />

          {/* Spec rows */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 28px", flex: 1 }}>
            {/* Left column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {leftSpecs.map(([l, v]) => <SpecRow key={l} label={l} value={v} />)}
            </div>
            {/* Right column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {rightSpecs.map(([l, v]) => <SpecRow key={l} label={l} value={v} />)}
            </div>
          </div>

          {/* Remarks */}
          {cert.remarks && (
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: 7.5, letterSpacing: "0.28em", textTransform: "uppercase", color: GREY }}>Remarks</div>
              <p style={{ fontSize: 10, color: "#374151", marginTop: 2, lineHeight: 1.4 }}>{cert.remarks}</p>
            </div>
          )}
        </div>
      </div>

      {/* ── FOOTER BAR ── */}
      <div style={{
        height: 52, flexShrink: 0,
        background: LIGHT,
        borderTop: `1.5px solid ${BORDER}`,
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px 0 14px",
      }}>
        <div>
          <div style={{ fontSize: 7.5, color: GREY, letterSpacing: "0.12em" }}>
            Property of JewelReport Certification Lab
          </div>
          <div style={{ fontSize: 9, color: GOLD, letterSpacing: "0.38em", textTransform: "uppercase", marginTop: 3, fontWeight: 600 }}>
            JEWELREPORT.COM
          </div>
          <div style={{ fontSize: 7.5, color: GREY, marginTop: 2 }}>
            Scan QR code to verify authenticity online
          </div>
        </div>

        {/* QR code */}
        <div style={{ padding: 5, background: WHITE, border: `1.5px solid rgba(201,168,76,0.55)`, borderRadius: 8 }}>
          <QRCodeSVG value={verifyUrl} size={60} level="M" />
        </div>
      </div>
    </div>
  );
}

/* ─── Helpers ─────────────────────────────────────────────────────────────────── */
function ColHeader({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 8, letterSpacing: "0.35em", textTransform: "uppercase", color: GOLD, fontWeight: 700 }}>
      {children}
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value?: string }) {
  return (
    <div style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: 5 }}>
      <div style={{ fontSize: 7.5, letterSpacing: "0.25em", textTransform: "uppercase", color: GREY }}>
        {label}
      </div>
      <div style={{ fontSize: 11.5, color: "#0F1A35", fontWeight: 600, marginTop: 2 }}>
        {value || <span style={{ color: "#D1D5DB", fontWeight: 400, fontStyle: "italic" }}>—</span>}
      </div>
    </div>
  );
}
