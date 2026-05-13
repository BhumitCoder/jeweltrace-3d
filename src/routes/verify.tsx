import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/Layout";
import { CertificateCard } from "@/components/CertificateCard";
import { getCertificate, type Certificate } from "@/lib/store";
import { Search, ShieldCheck, AlertCircle, Download, Printer } from "lucide-react";
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
  const [query, setQuery] = useState(search.id || "");
  const [searched, setSearched] = useState(false);
  const [cert, setCert] = useState<Certificate | undefined>();

  useEffect(() => {
    if (search.id) {
      const c = getCertificate(search.id);
      setCert(c);
      setSearched(true);
    }
  }, [search.id]);

  const onSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const c = getCertificate(query.trim());
    setCert(c);
    setSearched(true);
  };

  return (
    <Layout>
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
                  No certificate matches “{query}”. Please double-check the report number on your card.
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

function CardPreview({ cert }: { cert: Certificate }) {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const downloadPdf = async () => {
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");
    const opts = { backgroundColor: null, scale: 2, useCORS: true } as const;
    const f = await html2canvas(frontRef.current!, opts);
    const b = await html2canvas(backRef.current!, opts);
    // CR80 size in mm: 85.6 × 53.98
    const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [85.6, 53.98] });
    pdf.addImage(f.toDataURL("image/png"), "PNG", 0, 0, 85.6, 53.98);
    pdf.addPage([85.6, 53.98], "landscape");
    pdf.addImage(b.toDataURL("image/png"), "PNG", 0, 0, 85.6, 53.98);
    pdf.save(`${cert.reportNo}.pdf`);
  };

  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-8 justify-items-center">
        <div className="origin-top-left scale-[0.55] sm:scale-[0.7] md:scale-[0.85] lg:scale-[0.65] xl:scale-[0.75]" style={{ width: "fit-content" }}>
          <CertificateCard ref={frontRef} cert={cert} side="front" />
        </div>
        <div className="origin-top-left scale-[0.55] sm:scale-[0.7] md:scale-[0.85] lg:scale-[0.65] xl:scale-[0.75]" style={{ width: "fit-content" }}>
          <CertificateCard ref={backRef} cert={cert} side="back" />
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={downloadPdf}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-105 transition-transform"
        >
          <Download className="w-4 h-4" /> Download PVC Card (PDF)
        </button>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
        >
          <Printer className="w-4 h-4" /> Print
        </button>
      </div>
    </div>
  );
}

function FullDetails({ cert }: { cert: Certificate }) {
  const rows: Array<[string, string | undefined]> = [
    ["Report Number", cert.reportNo],
    ["Report Type", cert.type],
    ["Item", cert.itemName],
    ["Issue Date", cert.issueDate],
    ["Shape", cert.shape],
    ["Carat Weight", cert.caratWeight],
    ["Measurements", cert.measurements],
    ["Color", cert.color],
    ["Clarity", cert.clarity],
    ["Cut Grade", cert.cut],
    ["Polish", cert.polish],
    ["Symmetry", cert.symmetry],
    ["Fluorescence", cert.fluorescence],
    ["Origin", cert.origin],
    ["Metal", cert.metal],
    ["Total Weight", cert.totalWeight],
  ].filter(([, v]) => v) as Array<[string, string]>;

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
