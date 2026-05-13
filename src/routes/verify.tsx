import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/Layout";
import { CertificateCard, CARD_W, CARD_H } from "@/components/CertificateCard";
import { getCertificate, type Certificate } from "@/lib/store";
import { Search, ShieldCheck, AlertCircle, Printer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/verify")({
  head: () => ({
    meta: [
      { title: "Verify Report — JewelReport" },
      { name: "description", content: "Enter your JewelReport number to verify the authenticity of your diamond, gemstone or jewellery certificate." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({ id: typeof s.id === "string" ? s.id : "" }),
  component: VerifyPage,
});

function VerifyPage() {
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
      {/* Search hero */}
      <section className="px-6 pt-20 pb-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-primary">Authenticity Check</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">
            Verify your <span className="text-gradient-gold">JewelReport</span>
          </h1>
          <p className="mt-5 text-muted-foreground">
            Enter the report number printed on your certificate card to confirm its details.
          </p>

          <form onSubmit={onSearch} className="mt-10 flex gap-3 p-2 rounded-full bg-card border border-border shadow-elegant max-w-xl mx-auto">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. LGD-25-123456"
              className="flex-1 bg-transparent px-5 py-3 outline-none text-foreground placeholder:text-muted-foreground/60 font-mono tracking-wider"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Search className="w-4 h-4" /> Verify
            </button>
          </form>
        </div>
      </section>

      {/* Results */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-6xl">
          <AnimatePresence mode="wait">
            {searched && !cert && (
              <motion.div
                key="notfound"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
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
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef  = useRef<HTMLDivElement>(null);
  const [printing, setPrinting] = useState(false);

  const printCards = async () => {
    if (!frontRef.current || !backRef.current) return;
    setPrinting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;

      // Capture both sides at 2× resolution for crisp print
      const opts = { scale: 2, useCORS: true, backgroundColor: "#ffffff", logging: false };
      const [frontCanvas, backCanvas] = await Promise.all([
        html2canvas(frontRef.current, opts),
        html2canvas(backRef.current, opts),
      ]);

      const frontDataUrl = frontCanvas.toDataURL("image/png");
      const backDataUrl  = backCanvas.toDataURL("image/png");

      // Open a tiny window sized exactly to the card (landscape PAN/CR80)
      const win = window.open("", "_blank", "width=900,height=700");
      if (!win) { alert("Please allow popups to print the card."); return; }

      win.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>JewelReport Card — ${cert.reportNo}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @page { size: 85.6mm 53.98mm landscape; margin: 0; }
    body { background: #fff; }
    .page {
      width: 85.6mm;
      height: 53.98mm;
      overflow: hidden;
      page-break-after: always;
      break-after: page;
    }
    .page:last-child {
      page-break-after: avoid;
      break-after: avoid;
    }
    img { width: 85.6mm; height: 53.98mm; display: block; }
    @media screen {
      body { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 24px; background: #f3f4f6; }
      .page { box-shadow: 0 4px 20px rgba(0,0,0,0.15); border-radius: 8px; overflow: hidden; }
      img { border-radius: 8px; }
      .print-btn {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 10px 28px; border-radius: 999px;
        background: linear-gradient(135deg,#C9A84C,#e8c96b);
        color: #1a1a2e; font-weight: 600; font-size: 14px;
        border: none; cursor: pointer; font-family: system-ui;
      }
    }
    @media print { .print-btn { display: none !important; } }
  </style>
</head>
<body>
  <div class="page"><img src="${frontDataUrl}" /></div>
  <div class="page"><img src="${backDataUrl}"  /></div>
  <button class="print-btn" onclick="window.print()">🖨️ Print</button>
  <script>window.onload = () => window.print();<\/script>
</body>
</html>`);
      win.document.close();
    } finally {
      setPrinting(false);
    }
  };

  return (
    <div>
      {/* Off-screen front card — not visible, but rendered so html2canvas can capture it */}
      <div
        style={{
          position: "absolute",
          left: -9999,
          top: 0,
          pointerEvents: "none",
          visibility: "hidden",
        }}
      >
        <div ref={frontRef}>
          <CertificateCard cert={cert} side="front" />
        </div>
      </div>

      {/* On-screen: back side only */}
      <div className="flex justify-center">
        <ScaledCard innerRef={backRef} cert={cert} side="back" label="Back" />
      </div>

      {/* Print button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={printCards}
          disabled={printing}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-gold text-gold-foreground font-semibold shadow-gold hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed text-base"
        >
          <Printer className="w-4 h-4" />
          {printing ? "Preparing…" : "Print Card"}
        </button>
      </div>
    </div>
  );
}

interface ScaledCardProps {
  cert: Certificate;
  side: "front" | "back";
  label: string;
  innerRef?: React.RefObject<HTMLDivElement | null>;
}

function ScaledCard({ cert, side, label, innerRef }: ScaledCardProps) {
  const scale = 0.52;
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        style={{
          width: CARD_W * scale,
          height: CARD_H * scale,
          overflow: "hidden",
          borderRadius: 12,
          flexShrink: 0,
        }}
      >
        <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: CARD_W, height: CARD_H }}>
          <div ref={innerRef}>
            <CertificateCard cert={cert} side={side} />
          </div>
        </div>
      </div>
      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}</p>
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
      <div className="px-8 py-6 border-b border-border bg-gradient-navy">
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
