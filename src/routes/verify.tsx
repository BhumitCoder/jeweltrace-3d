import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { CertificateCard, CARD_W, CARD_H } from "@/components/CertificateCard";
import { getCertificate, type Certificate } from "@/lib/store";
import { Search, ShieldCheck, AlertCircle, Printer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/verify")({
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
      <section className="px-6 pt-20 pb-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-primary">Authenticity Check</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">
            Verify your <span className="text-gradient-gold">JewelsReport</span>
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
  const SCALE = 0.52;

  return (
    <div>
      {/* Hidden print sheet — shown only during window.print() via CSS */}
      <div className="print-only">
        <div className="print-card-page">
          <div><div><CertificateCard cert={cert} side="front" /></div></div>
          <span className="print-card-label">Front</span>
        </div>
        <div className="print-card-page">
          <div><div><CertificateCard cert={cert} side="back" /></div></div>
          <span className="print-card-label">Back</span>
        </div>
      </div>

      {/* On-screen preview — both front and back side by side */}
      <div className="flex flex-wrap justify-center gap-6">
        {(["front", "back"] as const).map((side) => (
          <div key={side} className="flex flex-col items-center gap-3">
            <div style={{ width: CARD_W * SCALE, height: CARD_H * SCALE, overflow: "hidden", borderRadius: 10, border: "1.5px solid rgba(201,168,76,0.45)", boxShadow: "0 8px 40px -8px rgba(0,0,0,0.5), 0 0 0 3px rgba(201,168,76,0.1)" }}>
              <div style={{ transform: `scale(${SCALE})`, transformOrigin: "top left", width: CARD_W, height: CARD_H }}>
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
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-gold text-gold-foreground font-semibold shadow-gold hover:scale-105 transition-transform text-base"
        >
          <Printer className="w-4 h-4" />
          Print Card (Front + Back)
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
