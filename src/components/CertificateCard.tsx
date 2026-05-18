import { QRCodeSVG } from "qrcode.react";
import { forwardRef } from "react";
import type { Certificate } from "@/lib/store";
import { REPORT_TYPE_LABELS } from "@/lib/store";
import logo from "@/assets/logo.png";

// PAN card / CR80: 85.6 × 53.98 mm → rendered at 856 × 540 px (10 px/mm)
export const CARD_W = 856;
export const CARD_H = 540;

interface Props { cert: Certificate; side: "front" | "back"; showDescription?: boolean }

export const CertificateCard = forwardRef<HTMLDivElement, Props>(
  function CertificateCard({ cert, side }, ref) {
    const verifyUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/verify?id=${encodeURIComponent(cert.reportNo)}`
        : `/verify?id=${cert.reportNo}`;

    const isJewellery = cert.type === "Lab Grown Jewellery" || cert.type === "Natural Jewellery";
    const hasDiamondDetails = isJewellery && !!(cert.diamondShape || cert.diamondWeight || cert.diamondTotalPcs || cert.diamondColor || cert.diamondClarity);
    const hasGemstoneDetails = isJewellery && !!(cert.gemstoneStone || cert.gemstoneOrigin || cert.gemstoneShape || cert.gemstoneCaratWeight || cert.gemstonePcs || cert.gemstoneMeasurements || cert.gemstoneColorTransparency || cert.gemstoneCharacteristics);
    const allThreeSections = isJewellery && hasDiamondDetails && hasGemstoneDetails;

    return (
      <div ref={ref} style={{
        width: CARD_W, height: CARD_H,
        background: "#F8F5EF",
        overflow: "hidden",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        display: "flex",
        boxSizing: "border-box",
        position: "relative",
      }}>
        {side === "front"
          ? <FrontSide cert={cert} showDescription={allThreeSections} />
          : <BackSide cert={cert} verifyUrl={verifyUrl} hideDisclaimer={allThreeSections} />}
      </div>
    );
  }
);

/* ─── FRONT ──────────────────────────────────────────────────────────────────── */
function FrontSide({ cert, showDescription }: { cert: Certificate; showDescription: boolean }) {
  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#F8F5EF", position: "relative",
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, position: "relative", zIndex: 1 }}>
        <img src={logo} alt="JewelsReport" crossOrigin="anonymous"
          style={{ height: 160, width: 160, objectFit: "contain", marginBottom: 28 }} />
        <div style={{ width: 220, height: 2, background: "linear-gradient(90deg,transparent,#B8922A,transparent)", marginBottom: 20 }} />
        <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 56, lineHeight: 1, color: "#111111", letterSpacing: "-0.01em", textAlign: "center", fontWeight: 400 }}>
          Jewels<span style={{ color: "#B8922A" }}>Report</span>
        </div>
        <div style={{ fontSize: 13, letterSpacing: "0.45em", textTransform: "uppercase", color: "#111111", textAlign: "center", marginTop: 14, fontWeight: 900 }}>
          Certification Lab
        </div>
        <div style={{ width: 220, height: 2, background: "linear-gradient(90deg,transparent,#B8922A,transparent)", marginTop: 20 }} />
      </div>

      {/* Bottom area */}
      <div style={{ position: "absolute", bottom: 26, left: 24, right: 24, textAlign: "center", zIndex: 1 }}>
        {showDescription ? (
          <>
            <div style={{ height: 1.5, background: "linear-gradient(90deg,transparent,#B8922A,transparent)", marginBottom: 10 }} />
            <p style={{ fontSize: 10, color: "#555555", lineHeight: 1.6, margin: 0, letterSpacing: "0.02em" }}>
              {cert.description || "Issued by JewelsReport Certification Lab. Results refer only to the article described. Not a guarantee or valuation. Verify at JEWELSREPORT.COM."}
            </p>
          </>
        ) : (
          <span style={{ fontSize: 11, letterSpacing: "0.45em", textTransform: "uppercase", color: "#B8922A", fontWeight: 700 }}>JEWELSREPORT.COM</span>
        )}
      </div>
    </div>
  );
}

/* ─── BACK — GIA-style layout ────────────────────────────────────────────────── */
function withGrm(val: string | undefined) {
  if (!val) return val;
  const t = val.trim().toUpperCase();
  if (t.endsWith("GRM") || t.endsWith("GM") || t.endsWith("G")) return val;
  return `${val} GRM`;
}

function BackSide({ cert, verifyUrl, hideDisclaimer }: { cert: Certificate; verifyUrl: string; hideDisclaimer: boolean }) {
  const isJewellery = cert.type === "Lab Grown Jewellery" || cert.type === "Natural Jewellery";
  const isGemstone = cert.type === "Gemstone";

  const fields: [string, string | undefined][] = isJewellery
    ? [
        ["Item",                    cert.itemName],
        ["Metal Tested",            cert.metal],
        ["Metal Description",       cert.metalDescription],
        ["Gross Weight",            withGrm(cert.grossWeight)],
        ["Net Weight",              withGrm(cert.netWeight)],
        ["Origin",                  cert.origin],
        ["Client",                  cert.clientName],
      ].filter(([, v]) => v) as [string, string][]
    : isGemstone
    ? [
        ["Item",                   cert.itemName],
        ["Stone",                  cert.gemstoneStone],
        ["Origin",                 cert.gemstoneOrigin],
        ["Shape and Cutting Style",cert.gemstoneShape],
        ["Carat Weight",           cert.gemstoneCaratWeight],
        ["PCS",                    cert.gemstonePcs],
        ["Measurements",           cert.gemstoneMeasurements],
        ["Color and Transparency", cert.gemstoneColorTransparency],
        ["Characteristics",        cert.gemstoneCharacteristics],
        ["Client",                 cert.clientName],
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
      {/* ── Left panel (main content) ── */}
      <div style={{
        width: 576, flexShrink: 0,
        display: "flex", flexDirection: "column",
        padding: "24px 30px 0 30px",
        position: "relative", zIndex: 1,
        boxSizing: "border-box",
      }}>
        {/* Watermark */}
        <img src={logo} alt="" crossOrigin="anonymous" style={{
          position: "absolute", width: 260, height: 260, objectFit: "contain",
          opacity: 0.045, pointerEvents: "none",
          left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: 0,
        }} />

        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, position: "relative", zIndex: 1 }}>
          <img src={logo} alt="JewelsReport" crossOrigin="anonymous" style={{ height: 58, width: 58, objectFit: "contain" }} />
          <div>
            <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 28, color: "#111111", lineHeight: 1, letterSpacing: "-0.01em", fontWeight: 400 }}>
              Jewels<span style={{ color: "#B8922A" }}>Report</span>
            </div>
            <div style={{ fontSize: 10, letterSpacing: "0.30em", textTransform: "uppercase", color: "#111111", marginTop: 4, fontWeight: 900 }}>
              Certification Lab
            </div>
          </div>
        </div>

        {/* Report type label + report number + gold line */}
        <div style={{ marginBottom: 8, position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
            <div style={{
              fontSize: 14, fontWeight: 900, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "#B8922A",
              lineHeight: 1.2,
            }}>
              {REPORT_TYPE_LABELS[cert.type] ?? cert.type}
            </div>
            {cert.reportNo && (
              <div style={{
                fontSize: 13, fontWeight: 800, color: "#111111",
                letterSpacing: "0.04em", whiteSpace: "nowrap", marginLeft: 10,
              }}>
                {cert.reportNo}
              </div>
            )}
          </div>
          <div style={{ height: 3, background: "linear-gradient(90deg,#B8922A,#D4A843,#B8922A)", borderRadius: 2 }} />
        </div>

        {/* Fields */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3, position: "relative", zIndex: 1 }}>
          {fields.map(([label, value]) => (
            <div key={label} style={{ display: "flex", alignItems: "flex-end", gap: 0 }}>
              <span style={{
                fontSize: 13, color: "#444444", whiteSpace: "nowrap",
                lineHeight: 1.5, letterSpacing: "0.01em", fontWeight: 500,
              }}>
                {label}
              </span>
              <span style={{
                flex: 1,
                borderBottom: "1.5px dotted #BBBBBB",
                margin: "0 6px 3px",
                minWidth: 20,
              }} />
              <span style={{
                fontSize: 13, fontWeight: 800, color: "#000000",
                whiteSpace: "nowrap", lineHeight: 1.5,
                letterSpacing: "0.03em", textTransform: "uppercase",
              }}>
                {value}
              </span>
            </div>
          ))}

          {/* Diamond Details block — jewellery only */}
          {isJewellery && (cert.diamondShape || cert.diamondWeight || cert.diamondColor || cert.diamondClarity) && (
            <div style={{ marginTop: 4 }}>
              <div style={{
                fontSize: 10, fontWeight: 800, letterSpacing: "0.25em",
                textTransform: "uppercase", color: "#B8922A",
                borderBottom: "1.5px solid #D4C9A8", paddingBottom: 2, marginBottom: 3,
              }}>
                Diamond Details
              </div>
              {[
                ["Shape and Cut",     cert.diamondShape],
                ["Total Est. Weight", cert.diamondWeight ? `${cert.diamondWeight} CT` : undefined],
                ["Total PCS",         cert.diamondTotalPcs],
                ["Color",             cert.diamondColor],
                ["Clarity",           cert.diamondClarity],
              ].filter(([, v]) => v).map(([label, value]) => (
                <div key={label} style={{ display: "flex", alignItems: "flex-end", gap: 0 }}>
                  <span style={{ fontSize: 13, color: "#444444", whiteSpace: "nowrap", lineHeight: 1.5, fontWeight: 500 }}>{label}</span>
                  <span style={{ flex: 1, borderBottom: "1.5px dotted #BBBBBB", margin: "0 6px 3px", minWidth: 20 }} />
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#000000", whiteSpace: "nowrap", lineHeight: 1.5, letterSpacing: "0.03em", textTransform: "uppercase" }}>{value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Gemstone Details block — jewellery only */}
          {isJewellery && (cert.gemstoneStone || cert.gemstoneOrigin || cert.gemstoneShape || cert.gemstoneCaratWeight || cert.gemstonePcs || cert.gemstoneMeasurements || cert.gemstoneColorTransparency || cert.gemstoneCharacteristics) && (
            <div style={{ marginTop: 4 }}>
              <div style={{
                fontSize: 10, fontWeight: 800, letterSpacing: "0.25em",
                textTransform: "uppercase", color: "#B8922A",
                borderBottom: "1.5px solid #D4C9A8", paddingBottom: 2, marginBottom: 3,
              }}>
                Gemstone Details
              </div>
              {[
                ["Stone",                    cert.gemstoneStone],
                ["Origin",                   cert.gemstoneOrigin],
                ["Shape and Cutting Style",  cert.gemstoneShape],
                ["Carat Weight",             cert.gemstoneCaratWeight],
                ["PCS",                      cert.gemstonePcs],
                ["Measurements",             cert.gemstoneMeasurements],
                ["Color and Transparency",   cert.gemstoneColorTransparency],
                ["Characteristics",          cert.gemstoneCharacteristics],
              ].filter(([, v]) => v).map(([label, value]) => (
                <div key={label} style={{ display: "flex", alignItems: "flex-end", gap: 0 }}>
                  <span style={{ fontSize: 13, color: "#444444", whiteSpace: "nowrap", lineHeight: 1.5, fontWeight: 500 }}>{label}</span>
                  <span style={{ flex: 1, borderBottom: "1.5px dotted #BBBBBB", margin: "0 6px 3px", minWidth: 20 }} />
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#000000", whiteSpace: "nowrap", lineHeight: 1.5, letterSpacing: "0.03em", textTransform: "uppercase" }}>{value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Remarks */}
          {cert.remarks && (
            <div style={{ marginTop: 4 }}>
              <span style={{ fontSize: 13, color: "#444444", fontWeight: 500 }}>Remarks: </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#111111" }}>{cert.remarks}</span>
            </div>
          )}
        </div>

        {/* Separator + disclaimer — hidden when all 3 sections fill the back */}
        {!hideDisclaimer && (
          <div style={{ marginTop: 8, position: "relative", zIndex: 1 }}>
            <div style={{ height: 2, background: "linear-gradient(90deg,#B8922A,#D4A843,#B8922A)", marginBottom: 7 }} />
            <p style={{ fontSize: 8.5, color: "#777777", lineHeight: 1.5, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Issued by JewelsReport Certification Lab. Results refer only to the article described. Not a guarantee or valuation. Verify at JEWELSREPORT.COM.
            </p>
            <div style={{ height: 18 }} />
          </div>
        )}
      </div>

      {/* ── Right panel ── */}
      <div style={{
        flex: 1,
        display: "flex", flexDirection: "column",
        borderLeft: "2px solid #D4C9A8",
        position: "relative", zIndex: 1,
        background: "#EDE8DF",
      }}>
        {/* Item image */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 16px 8px" }}>
          <div style={{
            width: "100%", aspectRatio: "1 / 1",
            borderRadius: 18,
            border: "2px solid rgba(184,146,42,0.5)",
            background: "#F5F1E9",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.7)",
            overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {cert.imageDataUrl ? (
              <img src={cert.imageDataUrl} alt="" crossOrigin="anonymous"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <img src={logo} alt="" crossOrigin="anonymous" style={{ height: 56, width: 56, objectFit: "contain", opacity: 0.18 }} />
                <div style={{ fontSize: 8.5, color: "#AAAAAA", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>No image</div>
              </div>
            )}
          </div>
        </div>

        <div style={{
          padding: "6px 14px 16px",
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 6, flexShrink: 0,
        }}>
          <div style={{ fontSize: 11, color: "#B8922A", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 800 }}>
            JEWELSREPORT.COM
          </div>
          <div style={{ padding: 7, background: "#fff", border: "2px solid rgba(184,146,42,0.5)", borderRadius: 8 }}>
            <QRCodeSVG value={verifyUrl} size={100} level="M" />
          </div>
          <div style={{ fontSize: 10, color: "#666666", textAlign: "center", letterSpacing: "0.08em", fontWeight: 600, textTransform: "uppercase" }}>
            Scan to verify online
          </div>
        </div>
      </div>
    </>
  );
}
