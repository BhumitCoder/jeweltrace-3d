import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/Layout";
import { useSEO, breadcrumb, webAppSchema, howToVerify, SITE_URL } from "@/lib/seo";
import { CertificateCard, CARD_W, CARD_H } from "@/components/CertificateCard";
import { A4Certificate, A4_W, A4_H } from "@/components/A4Certificate";
import { getCertificate } from "@/lib/db";
import type { Certificate } from "@/lib/store";
import { isAdminAuthed } from "@/lib/store";
import { downloadJpg } from "@/lib/download";
import { Search, ShieldCheck, AlertCircle, Printer, Loader2, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function useCardScale() {
  const [scale, setScale] = useState(0.52);
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw < 640) {
        setScale(Math.max(0.28, (vw - 32) / CARD_W));
      } else {
        setScale(0.52);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return scale;
}

function useA4Scale() {
  const [scale, setScale] = useState(0.68);
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      /* landscape cert is 1122px wide — scale to fit viewport with 48px padding */
      setScale(Math.min(0.68, Math.max(0.28, (vw - 48) / A4_W)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return scale;
}

export const Route = createFileRoute("/verify")({
  validateSearch: (s: Record<string, unknown>) => ({ id: typeof s.id === "string" ? s.id : "" }),
  component: VerifyPage,
});

function VerifyPage() {
  useSEO({
    title: "Verify Your Diamond Certificate | JewelsReport",
    description:
      "Verify any JewelsReport diamond, gemstone or jewellery certificate in seconds. Enter the report number or scan the QR code on your PVC card to confirm authenticity and view full grading details.",
    path: "/verify",
    keywords:
      "verify diamond certificate online, check diamond certificate India, diamond certificate verification, verify gemstone report India, JewelsReport verify, JewelsReport certificate check, JewelsReport report lookup, check JewelsReport certificate, QR diamond verification, QR code diamond scan, QR code gem certificate, scan QR diamond card, QR code verify India, NFC diamond verify, certificate authentication India, diamond report authentication, gem report verification, online certificate check free, instant diamond verification, real time certificate lookup, live certificate database, diamond report number search, gemstone certificate lookup, report number verification, certificate ID check, report ID lookup, diamond certificate valid check, genuine diamond certificate check, fake diamond certificate check, counterfeit diamond certificate detection, forged gem certificate detection, diamond fraud prevention India, how to verify diamond certificate, diamond certificate real or fake, identify genuine diamond report, spot fake diamond certificate, how to check diamond certificate India, holographic certificate verify, holographic foil authentication, PVC card verification, tamper proof certificate check, guilloché pattern security, anti-counterfeit diamond check, secure certificate system, digital diamond record, online diamond database, free certificate verify India, no login certificate check, instant online verify India, mobile certificate check, smartphone QR verify, scan and verify certificate India, verify certificate by phone, certificate check WhatsApp, how to verify lab grown diamond, CVD diamond certificate verify, HPHT diamond report check, lab grown diamond authentication, synthetic diamond verify, man made diamond certificate check, verify sapphire certificate India, verify ruby report India, verify emerald certification India, coloured stone report check, gemstone authenticity check India, jewellery report verification, mounted jewellery certificate check, LGD report number format, NDR report number format, GEM report number format, NJR report number format, JewelsReport report number, JewelsReport certificate number, diamond certificate format India, how to read diamond certificate, diamond report explained, 4Cs certificate explained, cut grade meaning, colour grade meaning, clarity grade meaning, carat weight meaning, diamond certificate sections, certificate details explained, what is FL clarity, what is VVS, what is VS clarity, what is SI clarity, diamond colour D explained, diamond fluorescence meaning, polish symmetry explained, diamond table depth meaning, diamond measurements explained, certificate issue date, lab seal meaning, grader signature, tamper proof features explained, hologram meaning certificate, QR code purpose certificate, certificate expiry diamond, diamond certificate lifetime, renew diamond certificate, update diamond certificate, re-certify diamond, old certificate update",
    jsonLd: [
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Verify Certificate", path: "/verify" },
      ]),
      webAppSchema(),
      howToVerify(),
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/verify#webpage`,
        url: `${SITE_URL}/verify`,
        name: "Verify Certificate",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        description: "Instantly verify any JewelsReport diamond or gemstone certificate by report number or QR code — free, no login required.",
        inLanguage: "en-IN",
        publisher: { "@id": `${SITE_URL}/#organization` },
        breadcrumb: { "@id": `${SITE_URL}/verify#breadcrumb` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1"],
        },
      },
    ],
  });

  const search = useSearch({ from: "/verify" });
  const [query, setQuery]       = useState(search.id || "");
  const [searched, setSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [cert, setCert]         = useState<Certificate | undefined>();

  useEffect(() => {
    if (search.id) {
      setSearching(true);
      getCertificate(search.id).then((found) => {
        setCert(found);
        setSearched(true);
        setSearching(false);
      });
    }
  }, [search.id]);

  const onSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = query.trim();
    if (!q) return;
    setSearching(true);
    setCert(undefined);
    setSearched(false);
    const found = await getCertificate(q);
    setCert(found);
    setSearched(true);
    setSearching(false);
  };

  return (
    <Layout>
      <section className="px-4 sm:px-6 pt-20 pb-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-primary">Authenticity Check</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl">
            Verify your <span className="text-gradient-gold">JewelsReport</span>
          </h1>
          <p className="mt-5 text-sm sm:text-base text-muted-foreground">
            Enter the report number printed on your certificate card to confirm its details.
          </p>
          <form onSubmit={onSearch} className="mt-8 sm:mt-10 flex gap-2 p-1.5 sm:p-2 rounded-full bg-card border border-border shadow-elegant max-w-xl mx-auto">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. LGD-25-123456"
              className="flex-1 min-w-0 bg-transparent px-3 sm:px-5 py-2.5 sm:py-3 outline-none text-foreground placeholder:text-muted-foreground/60 font-mono tracking-wider text-sm"
            />
            <button
              type="submit"
              disabled={searching}
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold flex items-center gap-2 hover:scale-105 transition-transform text-sm whitespace-nowrap disabled:opacity-60 disabled:scale-100"
            >
              {searching
                ? <><Loader2 className="w-4 h-4 animate-spin" /> <span className="hidden sm:inline">Searching…</span></>
                : <><Search className="w-4 h-4" /> <span className="hidden sm:inline">Verify</span><span className="sm:hidden">Go</span></>
              }
            </button>
          </form>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-6xl">
          <AnimatePresence mode="wait">
            {searching && (
              <motion.div
                key="searching"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex justify-center py-16"
              >
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </motion.div>
            )}

            {!searching && searched && !cert && (
              <motion.div
                key="notfound"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="max-w-xl mx-auto p-8 rounded-2xl border border-destructive/40 bg-destructive/10 text-center"
              >
                <AlertCircle className="w-10 h-10 text-destructive mx-auto" />
                <h3 className="mt-4 font-display text-2xl">Report Not Found</h3>
                <p className="mt-2 text-muted-foreground">
                  No certificate matches "{query}". Please double-check the report number on your card.
                </p>
              </motion.div>
            )}

            {!searching && cert && (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
              >
                <div className="flex items-center justify-center gap-2 text-primary">
                  <ShieldCheck className="w-6 h-6" />
                  <span className="uppercase tracking-[0.3em] text-sm">Authentic — Verified</span>
                </div>
                <CardPreview cert={cert} />
                <FullDetails cert={cert} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
}

/* ─── Card preview + download ────────────────────────────────────────────────── */
function CardPreview({ cert }: { cert: Certificate }) {
  const isA4    = cert.cardStyle === "a4";
  const isAdmin = isAdminAuthed();
  const pvcScale = useCardScale();
  const a4Scale  = useA4Scale();

  const frontRef = useRef<HTMLDivElement>(null);
  const backRef  = useRef<HTMLDivElement>(null);
  const a4Ref    = useRef<HTMLDivElement>(null);
  const [printing,    setPrinting]    = useState(false);
  const [downloading, setDownloading] = useState(false);

  /* ── PVC print popup (front + back, credit-card size) ── */
  async function handlePrintPvc() {
    if (!frontRef.current || !backRef.current) return;
    setPrinting(true);
    try {
      const frontHTML = frontRef.current.outerHTML;
      const backHTML  = backRef.current.outerHTML;
      const win = window.open("", "_blank");
      if (!win) return;
      win.document.write(`<!DOCTYPE html><html><head>
        <title>JewelsReport Certificate ${cert.reportNo}</title>
        <style>
          @page { size: 85.6mm 53.98mm; margin: 0; }
          *, *::before, *::after { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
          html, body { margin: 0; padding: 0; background: white; }
          .page { width: 85.6mm; height: 53.98mm; overflow: hidden; page-break-after: always; break-after: page; }
          .page:last-child { page-break-after: avoid; break-after: avoid; }
          .card { width: ${CARD_W}px; height: ${CARD_H}px; transform: scale(0.378); transform-origin: top left; }
        </style>
      </head><body>
        <div class="page"><div class="card">${frontHTML}</div></div>
        <div class="page"><div class="card">${backHTML}</div></div>
      </body></html>`);
      win.document.close();
      const imgs = Array.from(win.document.querySelectorAll("img"));
      await Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })));
      win.focus(); win.print();
    } finally { setPrinting(false); }
  }

  /* ── A4 print popup (single page, A4 size) ── */
  async function handlePrintA4() {
    if (!a4Ref.current) return;
    setPrinting(true);
    try {
      const html = a4Ref.current.outerHTML;
      const win = window.open("", "_blank");
      if (!win) return;
      win.document.write(`<!DOCTYPE html><html><head>
        <title>JewelsReport Certificate ${cert.reportNo}</title>
        <style>
          @page { size: A4 landscape; margin: 0; }
          *, *::before, *::after { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
          html, body { margin: 0; padding: 0; background: white; }
          /* 1122px ≈ 297mm and 794px ≈ 210mm at 96 CSS px/inch — exact fit */
          .page { width: 297mm; height: 210mm; overflow: hidden; }
          .cert { width: ${A4_W}px; height: ${A4_H}px; display: block; }
        </style>
      </head><body>
        <div class="page"><div class="cert">${html}</div></div>
      </body></html>`);
      win.document.close();
      const imgs = Array.from(win.document.querySelectorAll("img"));
      await Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })));
      win.focus(); win.print();
    } finally { setPrinting(false); }
  }

  /* ── JPG download — admin only ── */
  async function handleDownloadJpg() {
    setDownloading(true);
    try {
      if (isA4) {
        if (!a4Ref.current) return;
        await downloadJpg(a4Ref.current, `JewelsReport-${cert.reportNo}-Certificate`);
      } else {
        if (!frontRef.current || !backRef.current) return;
        await downloadJpg(frontRef.current, `JewelsReport-${cert.reportNo}-Front`);
        await new Promise(r => setTimeout(r, 400));
        await downloadJpg(backRef.current, `JewelsReport-${cert.reportNo}-Back`);
      }
    } catch (err) {
      console.error("JPG download failed", err);
    } finally { setDownloading(false); }
  }

  /* ── Download buttons shared UI ── */
  const DownloadButtons = (
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <button
        onClick={isA4 ? handlePrintA4 : handlePrintPvc}
        disabled={printing}
        className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-gold text-gold-foreground font-semibold shadow-gold hover:scale-105 transition-transform text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Printer className="w-4 h-4" />
        {printing ? "Preparing…" : isA4 ? "Print / Save PDF" : "Print Card (Front + Back)"}
      </button>
      {isAdmin && (
        <button
          onClick={handleDownloadJpg}
          disabled={downloading}
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-primary text-primary font-semibold hover:bg-primary/10 hover:scale-105 transition-all text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          {downloading ? "Generating…" : "Download JPG"}
        </button>
      )}
    </div>
  );

  /* ── A4 layout ── */
  if (isA4) {
    return (
      <div>
        {/* Hidden full-res for download/print */}
        <div style={{ position: "fixed", left: -9999, top: -9999, pointerEvents: "none", zIndex: -1 }}>
          <div ref={a4Ref}><A4Certificate cert={cert} /></div>
        </div>

        {/* On-screen scaled preview */}
        <div className="flex justify-center">
          <div style={{
            width: A4_W * a4Scale, height: A4_H * a4Scale,
            overflow: "hidden", borderRadius: 8,
            border: "1.5px solid rgba(201,168,76,0.45)",
            boxShadow: "0 8px 40px -8px rgba(0,0,0,0.5), 0 0 0 3px rgba(201,168,76,0.1)",
          }}>
            <div style={{ transform: `scale(${a4Scale})`, transformOrigin: "top left", width: A4_W, height: A4_H }}>
              <A4Certificate cert={cert} />
            </div>
          </div>
        </div>
        {DownloadButtons}
      </div>
    );
  }

  /* ── PVC layout ── */
  return (
    <div>
      {/* Hidden full-res cards — source for print/download */}
      <div style={{ position: "fixed", left: -9999, top: -9999, pointerEvents: "none", zIndex: -1 }}>
        <div ref={frontRef} style={{ width: CARD_W, height: CARD_H }}>
          <CertificateCard cert={cert} side="front" />
        </div>
        <div ref={backRef} style={{ width: CARD_W, height: CARD_H }}>
          <CertificateCard cert={cert} side="back" />
        </div>
      </div>

      {/* On-screen preview */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6">
        {(["front", "back"] as const).map((side) => (
          <div key={side} className="flex flex-col items-center gap-3">
            <div style={{ width: CARD_W * pvcScale, height: CARD_H * pvcScale, overflow: "hidden", borderRadius: 10, border: "1.5px solid rgba(201,168,76,0.45)", boxShadow: "0 8px 40px -8px rgba(0,0,0,0.5), 0 0 0 3px rgba(201,168,76,0.1)" }}>
              <div style={{ transform: `scale(${pvcScale})`, transformOrigin: "top left", width: CARD_W, height: CARD_H }}>
                <CertificateCard cert={cert} side={side} />
              </div>
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{side === "front" ? "Front Side" : "Back Side"}</p>
          </div>
        ))}
      </div>
      {DownloadButtons}
    </div>
  );
}

/* ─── Full details table ─────────────────────────────────────────────────────── */
function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="px-6 py-4 border-b border-border/60">
      <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
      <div className="mt-1 font-medium text-foreground uppercase">{value}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="px-6 py-3 bg-primary/5 border-b border-border">
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">{title}</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </div>
  );
}

function FullDetails({ cert }: { cert: Certificate }) {
  const isJewellery = cert.type === "Lab Grown Jewellery" || cert.type === "Natural Jewellery";
  const isGemstone  = cert.type === "Gemstone";
  const isDiamond   = !isJewellery && !isGemstone;

  const hasDiamondDetails = isJewellery && (cert.diamondShape || cert.diamondWeight || cert.diamondTotalPcs || cert.diamondColor || cert.diamondClarity);
  const hasGemstoneDetails = isJewellery && (cert.gemstoneStone || cert.gemstoneOrigin || cert.gemstoneShape || cert.gemstoneCaratWeight || cert.gemstonePcs || cert.gemstoneMeasurements || cert.gemstoneColorTransparency || cert.gemstoneCharacteristics);

  return (
    <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-elegant overflow-hidden">
      <div className="px-6 py-6 border-b border-border">
        <h3 className="font-display text-2xl">Full Certificate Details</h3>
        <p className="text-xs text-muted-foreground mt-1">All information recorded on this certificate</p>
      </div>

      <Section title="Report Information">
        <DetailRow label="Report Number"  value={cert.reportNo} />
        <DetailRow label="Report Type"    value={cert.type} />
        <DetailRow label="Issue Date"     value={cert.issueDate} />
        <DetailRow label="Item"           value={cert.itemName} />
        <DetailRow label="Origin"         value={cert.origin} />
      </Section>

      {isDiamond && (
        <Section title="Grading Details">
          <DetailRow label="Shape / Cut Style" value={cert.shape} />
          <DetailRow label="Carat Weight"      value={cert.caratWeight ? `${cert.caratWeight} CT` : undefined} />
          <DetailRow label="Measurements"      value={cert.measurements} />
          <DetailRow label="Color"             value={cert.color} />
          <DetailRow label="Clarity"           value={cert.clarity} />
          <DetailRow label="Cut Grade"         value={cert.cut} />
          <DetailRow label="Polish"            value={cert.polish} />
          <DetailRow label="Symmetry"          value={cert.symmetry} />
          <DetailRow label="Fluorescence"      value={cert.fluorescence} />
        </Section>
      )}

      {isGemstone && (
        <Section title="Gemstone Grading">
          <DetailRow label="Stone"                    value={cert.gemstoneStone} />
          <DetailRow label="Origin"                   value={cert.gemstoneOrigin} />
          <DetailRow label="Shape and Cutting Style"  value={cert.gemstoneShape} />
          <DetailRow label="Carat Weight"             value={cert.gemstoneCaratWeight} />
          <DetailRow label="PCS"                      value={cert.gemstonePcs} />
          <DetailRow label="Measurements"             value={cert.gemstoneMeasurements} />
          <DetailRow label="Color and Transparency"   value={cert.gemstoneColorTransparency} />
          <DetailRow label="Characteristics"          value={cert.gemstoneCharacteristics} />
        </Section>
      )}

      {isJewellery && (
        <Section title="Metal Details">
          <DetailRow label="Metal Tested"       value={cert.metal} />
          <DetailRow label="Metal Description"  value={cert.metalDescription} />
          <DetailRow label="Gross Weight"       value={cert.grossWeight ? `${cert.grossWeight} GRM` : undefined} />
          <DetailRow label="Net Weight"         value={cert.netWeight ? `${cert.netWeight} GRM` : undefined} />
        </Section>
      )}

      {hasDiamondDetails && (
        <Section title="Diamond Details">
          <DetailRow label="Shape and Cut"      value={cert.diamondShape} />
          <DetailRow label="Total Est. Weight"  value={cert.diamondWeight ? `${cert.diamondWeight} CT` : undefined} />
          <DetailRow label="Total PCS"          value={cert.diamondTotalPcs} />
          <DetailRow label="Color"              value={cert.diamondColor} />
          <DetailRow label="Clarity"            value={cert.diamondClarity} />
        </Section>
      )}

      {hasGemstoneDetails && (
        <Section title="Gemstone Details">
          <DetailRow label="Stone"                    value={cert.gemstoneStone} />
          <DetailRow label="Origin"                   value={cert.gemstoneOrigin} />
          <DetailRow label="Shape and Cutting Style"  value={cert.gemstoneShape} />
          <DetailRow label="Carat Weight"             value={cert.gemstoneCaratWeight} />
          <DetailRow label="PCS"                      value={cert.gemstonePcs} />
          <DetailRow label="Measurements"             value={cert.gemstoneMeasurements} />
          <DetailRow label="Color and Transparency"   value={cert.gemstoneColorTransparency} />
          <DetailRow label="Characteristics"          value={cert.gemstoneCharacteristics} />
        </Section>
      )}

      {cert.remarks && (
        <div className="px-6 py-5 border-t border-border/60">
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Remarks</div>
          <p className="mt-2 text-foreground/90">{cert.remarks}</p>
        </div>
      )}
    </div>
  );
}
