import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { Certificate } from "@/lib/store";
import { REPORT_TYPE_LABELS } from "@/lib/store";
import logo from "@/assets/logo.png";

/* ── Landscape A4 at 96 CSS dpi ─────────────────────────────────── */
export const A4_W = 1122;
export const A4_H = 794;

const P1 = 314;
const P2 = 446;
const P3 = 362;
const HDR_H = 164;

/* ─── Palette: midnight navy panels · white centre · gold ───────── */
const DARK   = "#0B1829";          // midnight navy — side panel backgrounds
const DARK2  = "#0F2040";          // slightly lighter navy
const WHITE  = "#FFFFFF";          // centre panel — pure white
const IVORY  = "#FAF6EE";          // warm ivory — labels on dark bg
const GOLD   = "#C9963A";          // brand 18k gold
const GOLD2  = "#9B7018";          // deep amber
const GOLD3  = "#E8C870";          // bright gold
const GOLD4  = "rgba(232,200,112,0.15)";
const GRD    = "linear-gradient(135deg,#E8C870 0%,#C9963A 50%,#9B7018 100%)";
const TXT_D  = "#F5EDD8";          // body text on dark panels (ivory)
const TXT_D2 = "#C9B07A";          // secondary text on dark panels (muted gold)
const TXT_W  = "#0B1829";          // body text on white panel (dark navy)
const TXT_W2 = "#2D4270";          // secondary text on white panel
const TXT_W3 = "#7A6A45";          // captions on white panel

/* ─── Field row — DARK panel version ────────────────────────────── */
function FRD({ label, value, sz = 10.5 }: { label: string; value: string; sz?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", marginBottom: 5 }}>
      <span style={{ fontSize: sz, color: TXT_D2, lineHeight: 1.35, flexShrink: 0, whiteSpace: "nowrap" }}>{label}</span>
      <span style={{ flex: 1, minWidth: 8, margin: `0 5px ${sz * 0.17}px`, borderBottom: `1px dotted rgba(232,200,112,0.25)` }} />
      <span style={{ fontSize: sz, fontWeight: 700, color: GOLD3, lineHeight: 1.35, whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: "0.03em" }}>{value}</span>
    </div>
  );
}

/* ─── Section header — gold gradient bar ────────────────────────── */
function Hdr({ label }: { label: string }) {
  return (
    <div style={{ background: GRD, padding: "5px 15px", flexShrink: 0 }}>
      <span style={{ fontSize: 6.5, fontWeight: 800, letterSpacing: "0.32em", textTransform: "uppercase", color: "#0B1829" }}>{label}</span>
    </div>
  );
}

/* ─── Sub-section label — on DARK panel ─────────────────────────── */
function SubD({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "8px 0 4px" }}>
      <div style={{ width: 10, height: 1, background: GOLD3, flexShrink: 0 }} />
      <span style={{ fontSize: 6.5, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD3 }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${GOLD3},transparent)` }} />
    </div>
  );
}

/* ─── Ornamental rule ────────────────────────────────────────────── */
function HR({ my = 7, op = 0.55, dark = false }: { my?: number; op?: number; dark?: boolean }) {
  const c = dark ? GOLD3 : GOLD;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, margin: `${my}px 0`, opacity: op }}>
      <div style={{ flex: 1, height: 0.5, background: `linear-gradient(90deg,transparent,${c})` }} />
      <div style={{ width: 3, height: 3, background: c, transform: "rotate(45deg)", flexShrink: 0 }} />
      <div style={{ flex: 1, height: 0.5, background: `linear-gradient(90deg,${c},transparent)` }} />
    </div>
  );
}

interface Props { cert: Certificate }

export const A4Certificate = forwardRef<HTMLDivElement, Props>(
  function A4Certificate({ cert }, ref) {

    const verifyUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/verify?id=${encodeURIComponent(cert.reportNo)}`
        : `https://www.jewelsreport.com/verify?id=${cert.reportNo}`;

    const isJ = cert.type === "Lab Grown Jewellery" || cert.type === "Natural Jewellery";
    const isG = cert.type === "Gemstone";

    const fmtDate = (d: string) => {
      try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }); }
      catch { return d; }
    };

    const reportTypeLabel = REPORT_TYPE_LABELS[cert.type] ?? cert.type;
    const panelHdr = isG ? "Gemstone Grading Report"
      : isJ ? "Jewellery Grading Report"
      : `${cert.type.replace("Natural ", "").replace("Lab Grown ", "")} Grading Report`;

    let groupA: [string, string][] = [];
    let groupB: [string, string][] = [];
    let groupBLabel = "Grading Results";
    let groupC: [string, string][] = [];
    let groupCLabel = "Additional Information";

    if (isG) {
      groupA = ([
        ["GRL Report Number", cert.reportNo],
        ["Variety", cert.gemstoneStone],
        ["Shape & Cutting Style", cert.gemstoneShape],
        ["Measurements", cert.gemstoneMeasurements],
        ["Pieces (PCS)", cert.gemstonePcs],
        ["Origin", cert.gemstoneOrigin],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupB = ([
        ["Carat Weight", cert.gemstoneCaratWeight],
        ["Color & Transparency", cert.gemstoneColorTransparency],
        ["Characteristics", cert.gemstoneCharacteristics],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupBLabel = "Gemological Results";
    } else if (isJ) {
      groupA = ([
        ["GRL Report Number", cert.reportNo],
        ["Item Description", cert.itemName],
        ["Shape", cert.shape],
        ["Metal Tested As", cert.metal],
        ["Gross Weight", cert.grossWeight ? `${cert.grossWeight} GRM` : undefined],
        ["Net Weight", cert.netWeight ? `${cert.netWeight} GRM` : undefined],
        ["Origin", cert.origin],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupB = ([
        ["Diamond Shape", cert.diamondShape],
        ["Diamond Weight", cert.diamondWeight ? `${cert.diamondWeight} CT` : undefined],
        ["Diamond Total PCS", cert.diamondTotalPcs],
        ["Diamond Color", cert.diamondColor],
        ["Diamond Clarity", cert.diamondClarity],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupBLabel = "Diamond Details";
      groupC = ([
        ["Gemstone", cert.gemstoneStone],
        ["Gemstone Origin", cert.gemstoneOrigin],
        ["Gemstone Weight", cert.gemstoneCaratWeight],
        ["Gemstone PCS", cert.gemstonePcs],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupCLabel = "Gemstone Details";
    } else {
      groupA = ([
        ["GRL Report Number", cert.reportNo],
        ["Shape & Cutting Style", cert.shape],
        ["Measurements", cert.measurements],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupB = ([
        ["Carat Weight", cert.caratWeight ? `${cert.caratWeight} carat` : undefined],
        ["Color Grade", cert.color],
        ["Clarity Grade", cert.clarity],
        ["Cut Grade", cert.cut],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupC = ([
        ["Polish Grade", cert.polish],
        ["Symmetry Grade", cert.symmetry],
        ["Fluorescence", cert.fluorescence],
        ["Origin", cert.origin],
      ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
      groupCLabel = "Additional Grading Information";
    }

    const hasImg  = !!(cert.imageDataUrl || cert.imageDataUrl2);
    const has2Img = !!(cert.imageDataUrl && cert.imageDataUrl2);

    return (
      <div ref={ref} style={{
        width: A4_W, height: A4_H,
        background: DARK,
        fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex", flexDirection: "row",
        position: "relative",
        border: `1.5px solid ${GOLD}`,
      }}>

        {/* Inner gold pinstripe frame */}
        <div style={{ position: "absolute", inset: 5, border: `0.5px solid rgba(232,200,112,0.3)`, pointerEvents: "none", zIndex: 3 }} />

        {/* Watermark on dark bg */}
        <img src={logo} alt="" aria-hidden style={{
          position: "absolute", width: 460, height: 460,
          objectFit: "contain", opacity: 0.04,
          left: "50%", top: "50%", transform: "translate(-50%,-50%)",
          pointerEvents: "none", zIndex: 0, filter: "invert(1)",
        }} />

        {/* ══════════════════════════════════════════════════════
            PANEL 1 — Dark Navy · Brand + All Grading Fields
        ══════════════════════════════════════════════════════ */}
        <div style={{
          width: P1, height: A4_H, flexShrink: 0, zIndex: 1,
          display: "flex", flexDirection: "column",
          background: DARK,
          borderRight: `1px solid rgba(232,200,112,0.2)`,
          position: "relative",
        }}>

          {/* Brand header — dark with gold gradient top stripe */}
          <div style={{
            height: HDR_H, boxSizing: "border-box",
            padding: "0 16px", flexShrink: 0,
            background: DARK2,
            borderBottom: `2px solid ${GOLD}`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            {/* Gold top stripe */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: GRD }} />
            {/* Logo circle */}
            <div style={{
              width: 70, height: 70, borderRadius: "50%",
              border: `1.5px solid ${GOLD}`,
              boxShadow: `0 0 0 4px ${GOLD4}, 0 4px 20px rgba(0,0,0,0.4)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: WHITE,
              marginBottom: 10, flexShrink: 0, marginTop: 5,
            }}>
              <img src={logo} alt="JewelsReport" style={{ height: 46, width: 46, objectFit: "contain" }} />
            </div>
            <div style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 18, fontWeight: 400, letterSpacing: "0.18em", color: IVORY, lineHeight: 1, textTransform: "uppercase" }}>
              JewelsReport
            </div>
            <HR my={5} op={0.5} dark />
            <div style={{ fontSize: 6, letterSpacing: "0.4em", textTransform: "uppercase", color: GOLD3 }}>
              Gemological Certification Lab
            </div>
          </div>

          <Hdr label={panelHdr} />

          {/* Grading fields */}
          <div style={{ flex: 1, padding: "11px 14px 0", display: "flex", flexDirection: "column", overflow: "hidden" }}>

            {groupA.map(([l, v]) => <FRD key={l} label={l} value={v} />)}

            {groupB.length > 0 && (<>
              <SubD label={groupBLabel} />
              {groupB.map(([l, v]) => <FRD key={l} label={l} value={v} sz={11} />)}
            </>)}

            {groupC.length > 0 && (<>
              <SubD label={groupCLabel} />
              {groupC.map(([l, v]) => <FRD key={l} label={l} value={v} />)}
            </>)}

            {isJ && cert.metalDescription && (
              <div style={{ marginTop: 7, padding: "5px 9px", background: DARK2, borderLeft: `2px solid ${GOLD}`, flexShrink: 0 }}>
                <div style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", color: GOLD3, letterSpacing: "0.16em", marginBottom: 2 }}>Marking(s)</div>
                <div style={{ fontSize: 9, color: TXT_D, lineHeight: 1.6 }}>{cert.metalDescription}</div>
              </div>
            )}

            {cert.remarks && (
              <div style={{ marginTop: 7, padding: "5px 9px", background: DARK2, borderLeft: `2px solid ${GOLD}`, flexShrink: 0 }}>
                <div style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", color: GOLD3, letterSpacing: "0.16em", marginBottom: 2 }}>Comments</div>
                <div style={{ fontSize: 9.5, color: TXT_D, lineHeight: 1.65 }}>{cert.remarks}</div>
              </div>
            )}

            {/* Ornamental filler */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <HR op={0.25} dark />
              <div style={{ padding: "8px 0", textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, marginBottom: 6 }}>
                  <div style={{ width: 2, height: 2, background: GOLD3, transform: "rotate(45deg)" }} />
                  <div style={{ width: 4, height: 4, border: `0.5px solid ${GOLD3}`, transform: "rotate(45deg)" }} />
                  <div style={{ width: 2, height: 2, background: GOLD3, transform: "rotate(45deg)" }} />
                </div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 7, letterSpacing: "0.28em", textTransform: "uppercase", color: GOLD3, fontStyle: "italic" }}>
                  Certified Authentic
                </div>
              </div>
              <HR op={0.25} dark />
            </div>

            {/* Signature */}
            <div style={{ borderTop: `1px solid rgba(232,200,112,0.2)`, paddingTop: 7, flexShrink: 0 }}>
              <div style={{ minHeight: 38, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 3 }}>
                {cert.signatureDataUrl
                  ? <img src={cert.signatureDataUrl} alt="Signature" style={{ maxHeight: 38, maxWidth: "85%", objectFit: "contain", filter: "invert(1) brightness(2)" }} />
                  : <div style={{ width: "62%", height: 1, background: `rgba(232,200,112,0.3)` }} />
                }
              </div>
              <div style={{ textAlign: "center", paddingBottom: 3 }}>
                <div style={{ height: 1, background: `linear-gradient(90deg,transparent,rgba(232,200,112,0.3),transparent)`, marginBottom: 4 }} />
                <div style={{ fontSize: 7.5, color: GOLD3, fontWeight: 600, letterSpacing: "0.1em" }}>Authorised Signatory</div>
                <div style={{ fontSize: 6, color: TXT_D2, letterSpacing: "0.06em", marginTop: 1 }}>JewelsReport Gemological Certification Lab</div>
              </div>
            </div>
          </div>

          {/* P1 footer */}
          <div style={{ background: GRD, padding: "4px 14px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 6, color: DARK, letterSpacing: "0.1em", fontWeight: 700 }}>jewelsreport.com</span>
            <span style={{ fontSize: 6, color: DARK, letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: 700 }}>{reportTypeLabel}</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            PANEL 2 — White Centre · Report No + Photos
        ══════════════════════════════════════════════════════ */}
        <div style={{
          width: P2, height: A4_H, flexShrink: 0, zIndex: 1,
          display: "flex", flexDirection: "column",
          background: WHITE,
          borderRight: `1px solid rgba(232,200,112,0.25)`,
          position: "relative",
        }}>

          {/* Report number header — dark with gold stripe */}
          <div style={{
            height: HDR_H, boxSizing: "border-box",
            padding: "0 22px", flexShrink: 0, textAlign: "center",
            background: DARK2,
            borderBottom: `2px solid ${GOLD}`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: GRD }} />
            <div style={{ fontSize: 6.5, letterSpacing: "0.36em", textTransform: "uppercase", color: GOLD3, marginBottom: 6, opacity: 0.8 }}>GRL Report Number</div>
            <div style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 26, fontWeight: 400, letterSpacing: "0.06em", color: WHITE, lineHeight: 1 }}>
              {cert.reportNo}
            </div>
            <HR my={7} op={0.4} dark />
            <div style={{ fontSize: 7, color: "rgba(248,243,232,0.6)", letterSpacing: "0.07em" }}>Verify this report at jewelsreport.com/verify</div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 10.5, fontWeight: 400, color: GOLD3, marginTop: 5, letterSpacing: "0.04em" }}>{fmtDate(cert.issueDate)}</div>
          </div>

          <Hdr label="Item(s) Overall Description" />

          {/* Photos */}
          <div style={{ flex: 1, padding: "10px 16px 8px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {cert.description && (
              <p style={{ fontFamily: "Georgia,serif", fontSize: 10, color: TXT_W2, lineHeight: 1.75, marginBottom: 9, flexShrink: 0, fontStyle: "italic" }}>
                {cert.description}
              </p>
            )}
            <div style={{
              flex: 1, minHeight: 0,
              display: "flex", flexDirection: "column",
              alignItems: "stretch", justifyContent: "center",
              gap: has2Img ? 8 : 0,
            }}>
              {cert.imageDataUrl && (
                <div style={{ width: "100%", height: has2Img ? 210 : 390, flexShrink: 0, borderRadius: 10, overflow: "hidden" }}>
                  <img src={cert.imageDataUrl} alt="Item" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              )}
              {cert.imageDataUrl2 && (
                <div style={{ width: "100%", height: 210, flexShrink: 0, borderRadius: 10, overflow: "hidden" }}>
                  <img src={cert.imageDataUrl2} alt="Item" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              )}
              {!hasImg && (
                <div style={{
                  width: "100%", height: 390, flexShrink: 0, borderRadius: 10,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  background: "#F8F4EC", border: `1px solid rgba(201,150,58,0.15)`,
                  position: "relative", overflow: "hidden",
                }}>
                  <img src={logo} alt="" style={{ height: 56, opacity: 0.1, marginBottom: 10 }} />
                  <div style={{ fontSize: 8, color: TXT_W3, letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.6 }}>No Image Provided</div>
                </div>
              )}
            </div>
            {hasImg && (
              <p style={{ fontSize: 7, color: TXT_W3, textAlign: "center", marginTop: 5, fontStyle: "italic", flexShrink: 0 }}>Image is approximate</p>
            )}
          </div>

          {/* P2 footer */}
          <div style={{ background: GRD, padding: "4px 16px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 6, color: DARK, letterSpacing: "0.13em", textTransform: "uppercase", fontWeight: 700 }}>Gemological Certification Lab · Surat, Gujarat, India</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            PANEL 3 — Dark Navy · Authentication
        ══════════════════════════════════════════════════════ */}
        <div style={{
          width: P3, height: A4_H, flexShrink: 0, zIndex: 1,
          display: "flex", flexDirection: "column",
          background: DARK,
          position: "relative",
        }}>

          {/* P3 header — dark with gold stripe */}
          <div style={{
            height: HDR_H, boxSizing: "border-box",
            padding: "0 16px", flexShrink: 0, textAlign: "center",
            background: DARK2,
            borderBottom: `2px solid ${GOLD}`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: GRD }} />
            <div style={{ fontSize: 6.5, letterSpacing: "0.36em", textTransform: "uppercase", color: GOLD3, opacity: 0.8 }}>Official Certification Record</div>
            <HR my={8} op={0.3} dark />
            <div style={{ fontSize: 7.5, color: IVORY, opacity: 0.75, letterSpacing: "0.07em" }}>Gemological Certification Lab</div>
            <div style={{ fontSize: 6.5, color: GOLD3, marginTop: 4, letterSpacing: "0.05em", fontStyle: "italic", fontFamily: "Georgia,serif", opacity: 0.7 }}>
              jewelsreport.com
            </div>
          </div>

          <Hdr label="Certification & Authentication" />

          <div style={{ flex: 1, padding: "13px 14px 10px", display: "flex", flexDirection: "column", overflow: "hidden" }}>

            {/* Certification statement */}
            <div style={{ padding: "9px 11px", background: DARK2, borderLeft: `2.5px solid ${GOLD}`, marginBottom: 10, flexShrink: 0 }}>
              <div style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", color: GOLD3, letterSpacing: "0.18em", marginBottom: 4 }}>Certification Statement</div>
              <div style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 9, color: TXT_D, lineHeight: 1.75 }}>
                This is to certify that the article described herein has been examined
                by JewelsReport Gemological Certification Lab and the results documented
                are based on standard gemological testing methods.
              </div>
            </div>

            <HR dark op={0.3} />

            {/* Disclaimer */}
            <div style={{ flex: 1, minHeight: 0, overflow: "hidden", marginTop: 2 }}>
              <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 7.5, color: TXT_D2, lineHeight: 1.9, marginTop: 4 }}>
                The results documented in this report refer only to the article described,
                and were obtained using the techniques and equipment used by JewelsReport
                at the time of examination. This report is not a guarantee or valuation.
                For additional information and important limitations please see
                jewelsreport.com/terms or contact the JewelsReport Gemological
                Certification Lab directly. ©{new Date().getFullYear()} JewelsReport
                Gemological Certification Lab. All rights reserved.
              </p>
            </div>

            {/* Seal + QR */}
            <div style={{ flexShrink: 0 }}>
              <HR my={6} op={0.3} dark />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                {/* Seal — gold gradient circle */}
                <div style={{
                  width: 74, height: 74, flexShrink: 0, borderRadius: "50%",
                  background: GRD,
                  boxShadow: `0 0 0 3px ${GOLD4}, 0 4px 16px rgba(0,0,0,0.4)`,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                }}>
                  <img src={logo} alt="" style={{ height: 36, width: 36, objectFit: "contain" }} />
                  <div style={{ fontSize: 5.5, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: DARK, marginTop: 4 }}>CERTIFIED</div>
                </div>

                {/* QR */}
                <div style={{ padding: 4, background: WHITE, flexShrink: 0 }}>
                  <QRCodeSVG value={verifyUrl} size={66} level="M" fgColor={DARK} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 7, color: GOLD3, fontWeight: 600, lineHeight: 1.6, wordBreak: "break-all" }}>reportcheck.jewelsreport.com</div>
                  <div style={{ fontSize: 7, color: TXT_D2, marginTop: 3, wordBreak: "break-all" }}>{cert.reportNo}</div>
                </div>
              </div>

              {/* Security */}
              <div style={{ border: `1px solid rgba(232,200,112,0.18)`, borderLeft: `2px solid ${GOLD}`, padding: "5px 9px", background: DARK2 }}>
                <div style={{ fontSize: 6, fontWeight: 700, color: GOLD3, lineHeight: 1.85, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Security Features: Holographic Foil · Guilloché Pattern · Embossed Seal · UV Reactive Ink
                </div>
                <div style={{ fontSize: 6, color: TXT_D2, marginTop: 2, lineHeight: 1.55 }}>
                  This document is protected. Unauthorised reproduction or alteration is prohibited.
                  Verify authenticity at jewelsreport.com/verify
                </div>
              </div>
            </div>
          </div>

          {/* P3 footer */}
          <div style={{ background: GRD, padding: "4px 14px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 6, color: DARK, letterSpacing: "0.1em", fontWeight: 700 }}>jewelsreport.com/verify</span>
            <span style={{ fontSize: 6, color: DARK, letterSpacing: "0.06em", fontWeight: 700 }}>{cert.reportNo}</span>
          </div>
        </div>

      </div>
    );
  }
);
