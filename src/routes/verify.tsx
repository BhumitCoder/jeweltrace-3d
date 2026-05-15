import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/Layout";
import { useSEO, breadcrumb, webAppSchema, howToVerify, SITE_URL } from "@/lib/seo";
import { CertificateCard, CARD_W, CARD_H } from "@/components/CertificateCard";
import { getCertificate, type Certificate } from "@/lib/store";
import { Search, ShieldCheck, AlertCircle, Printer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";

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

export const Route = createFileRoute("/verify")({
  validateSearch: (s: Record<string, unknown>) => ({ id: typeof s.id === "string" ? s.id : "" }),
  component: VerifyPage,
});

function VerifyPage() {
  useSEO({
    title: "Verify a Certificate — Instant Diamond & Gemstone Report Check | JewelsReport",
    description:
      "Verify any JewelsReport diamond, gemstone or jewellery certificate in seconds. Enter the report number or scan the QR code on your PVC card to confirm authenticity and view full grading details.",
    path: "/verify",
    keywords:
      "verify diamond certificate, check gemstone report, JewelsReport verify, QR diamond verification, certificate authentication, fake diamond certificate check, real gem certificate, lab report verify",
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
        name: "Verify a JewelsReport Certificate",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        description: "Free online certificate verification tool for all JewelsReport gemological reports.",
        inLanguage: "en-US",
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
  const [cert, setCert]         = useState<Certificate | undefined>();

  useEffect(() => {
    if (search.id) {
      setCert(getCertificate(search.id));
      setSearched(true);
    }
  }, [search.id]);

  const onSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    setCert(getCertificate(query.trim()));
    setSearched(true);
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
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold flex items-center gap-2 hover:scale-105 transition-transform text-sm whitespace-nowrap"
            >
              <Search className="w-4 h-4" /> <span className="hidden sm:inline">Verify</span><span className="sm:hidden">Go</span>
            </button>
          </form>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-6xl">
          <AnimatePresence mode="wait">
            {searched && !cert && (
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

            {cert && (
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

/* ─── Card preview + print ───────────────────────────────────────────────────── */
function CardPreview({ cert }: { cert: Certificate }) {
  const scale = useCardScale();
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef  = useRef<HTMLDivElement>(null);
  const [printing, setPrinting] = useState(false);

  async function handlePrint() {
    if (!frontRef.current || !backRef.current) return;
    setPrinting(true);
    try {
      const [frontPng, backPng] = await Promise.all([
        toPng(frontRef.current, { width: CARD_W, height: CARD_H, pixelRatio: 2 }),
        toPng(backRef.current,  { width: CARD_W, height: CARD_H, pixelRatio: 2 }),
      ]);

      const win = window.open("", "_blank");
      if (!win) return;
      win.document.write(`<!DOCTYPE html><html><head><title>JewelsReport Certificate</title>
        <style>
          @page { size: A4 portrait; margin: 0; }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: white; }
          .page {
            width: 210mm; height: 297mm;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center; gap: 6mm;
          }
          .page:first-child { page-break-after: always; break-after: page; }
          img { width: 85.6mm; height: 53.98mm; border-radius: 3.5mm;
                border: 0.4mm solid #C9A84C; display: block; }
          .label { font-family: system-ui, sans-serif; font-size: 8pt;
                   letter-spacing: 0.25em; text-transform: uppercase; color: #999; }
        </style></head><body>
        <div class="page"><img src="${frontPng}" /><span class="label">Front Side</span></div>
        <div class="page"><img src="${backPng}" /><span class="label">Back Side</span></div>
      </body></html>`);
      win.document.close();
      win.onload = () => { win.focus(); win.print(); win.close(); };
    } finally {
      setPrinting(false);
    }
  }

  return (
    <div>
      {/* Hidden full-res renders used for image capture */}
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
            <div style={{ width: CARD_W * scale, height: CARD_H * scale, overflow: "hidden", borderRadius: 10, border: "1.5px solid rgba(201,168,76,0.45)", boxShadow: "0 8px 40px -8px rgba(0,0,0,0.5), 0 0 0 3px rgba(201,168,76,0.1)" }}>
              <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: CARD_W, height: CARD_H }}>
                <CertificateCard cert={cert} side={side} />
              </div>
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{side === "front" ? "Front Side" : "Back Side"}</p>
          </div>
        ))}
      </div>

      {/* Print button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handlePrint}
          disabled={printing}
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-gold text-gold-foreground font-semibold shadow-gold hover:scale-105 transition-transform text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Printer className="w-4 h-4" />
          {printing ? "Preparing…" : "Print Card (Front + Back)"}
        </button>
      </div>
    </div>
  );
}

/* ─── Full details table ─────────────────────────────────────────────────────── */
function FullDetails({ cert }: { cert: Certificate }) {
  const rows = ([
    ["Report Number", cert.reportNo],
    ["Report Type",   cert.type],
    ["Item",          cert.itemName],
    ["Issue Date",    cert.issueDate],
    ["Shape",         cert.shape],
    ["Carat Weight",  cert.caratWeight],
    ["Measurements",  cert.measurements],
    ["Color",         cert.color],
    ["Clarity",       cert.clarity],
    ["Cut Grade",     cert.cut],
    ["Polish",        cert.polish],
    ["Symmetry",      cert.symmetry],
    ["Fluorescence",  cert.fluorescence],
    ["Origin",        cert.origin],
    ["Metal",         cert.metal],
    ["Total Weight",  cert.totalWeight],
    ["Client",        cert.clientName],
  ] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];

  return (
    <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-elegant overflow-hidden">
      <div className="px-8 py-6 border-b border-border">
        <h3 className="font-display text-2xl">Full Certificate Details</h3>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        {rows.map(([k, v]) => (
          <div key={k} className="px-8 py-5 border-b border-border/60">
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{k}</div>
            <div className="mt-1 text-foreground">{v}</div>
          </div>
        ))}
      </div>
      {cert.remarks && (
        <div className="px-8 py-5 border-t border-border/60">
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Remarks</div>
          <p className="mt-2 text-foreground/90">{cert.remarks}</p>
        </div>
      )}
    </div>
  );
}
