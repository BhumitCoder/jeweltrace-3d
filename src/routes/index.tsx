import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useSEO, SITE_URL } from "@/lib/seo";
import { Card3D } from "@/components/Card3D";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ShieldCheck, Sparkles, Award, Microscope, ArrowRight,
  CheckCircle2, Gem, Globe2, Lock, Star, QrCode, ScanSearch,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const services = [
  { title: "Lab Grown Diamond Reports", desc: "Comprehensive grading for CVD & HPHT diamonds with full origin disclosure and 4Cs analysis.", icon: Sparkles },
  { title: "Jewellery Reports", desc: "Full appraisal of finished jewellery pieces with complete metal, stone and setting detailing.", icon: ShieldCheck },
  { title: "Gemstone Reports", desc: "Scientific identification & authenticity verification for sapphire, ruby, emerald and all coloured stones.", icon: Microscope },
  { title: "Lab Grown Jewellery Reports", desc: "Mounted lab-grown stones graded on the finished piece — origin disclosed with full transparency.", icon: Gem },
];

const whyUs = [
  { icon: Globe2, title: "Globally Recognised", desc: "Standards aligned with international gemological practice." },
  { icon: Lock, title: "Tamper-proof PVC Card", desc: "Holographic foil, micro-print and unique QR — virtually impossible to fake." },
  { icon: Microscope, title: "Master Gemologists", desc: "25+ senior graders, every stone independently cross-verified." },
  { icon: QrCode, title: "Instant Verification", desc: "Anyone, anywhere can verify a card in seconds with a phone." },
];

const testimonials = [
  { name: "Aarav Mehta", role: "Diamond Wholesaler, Surat", text: "JewelsReport cards have become our default. Buyers trust the holographic finish and the QR works every time." },
  { name: "Priya Shah", role: "Jewellery Retailer, Mumbai", text: "The PVC certificate feels premium in hand — like a passport for the stone. Customers love it." },
  { name: "Daniel Roy", role: "Independent Appraiser", text: "Reports are precise, the verification flow is fast, and turnaround is the best I have used." },
];

const faqs = [
  { q: "What format is the certificate?", a: "Every report is issued on a secure, tamper-proof PVC certificate with holographic foil and a unique QR code." },
  { q: "How do I verify a card?", a: "Scan the QR on the card, or enter the report number on the Verify page — full details appear instantly." },
  { q: "Can the card be forged?", a: "Each card carries holographic foil, guilloché micro-pattern and a unique server-verified report number." },
  { q: "How long does grading take?", a: "Standard turnaround is 3 business days. Express service is available on request." },
];

function useCardWidth(max = 420) {
  const [width, setWidth] = useState(max);
  useEffect(() => {
    const update = () => setWidth(Math.min(max, window.innerWidth * 0.8));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [max]);
  return width;
}

function HomePage() {
  const heroCardWidth = useCardWidth(420);
  const processCardWidth = useCardWidth(360);

  useSEO({
    title: "JewelsReport — Diamond, Gemstone & Jewellery Certification Lab",
    description:
      "Internationally trusted gemological lab issuing tamper-proof PVC certificates for natural & lab-grown diamonds, coloured gemstones and fine jewellery. Verify by ID or QR in seconds.",
    path: "/",
    keywords:
      "diamond certification, gemstone report, lab grown diamond report, jewellery certification, PVC diamond certificate, QR diamond verification, 4Cs grading, sapphire report, ruby report, emerald report, JewelsReport",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: "JewelsReport Gemological Laboratory",
        url: SITE_URL,
        description:
          "Independent gem & jewellery grading lab. PVC certificates with holographic foil and QR-based instant online verification.",
        serviceType: [
          "Diamond grading",
          "Lab grown diamond certification",
          "Gemstone identification",
          "Fine jewellery appraisal",
        ],
        areaServed: "Worldwide",
        priceRange: "$$",
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  });

  return (
    <Layout>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center px-4 sm:px-6 pt-20 pb-16">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 lg:gap-12 items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-primary">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> Internationally Recognised Lab
            </div>
            <h1 className="mt-5 font-display text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
              The seal of <span className="text-gradient-gold">brilliance</span>
              <br />you can trust.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              JewelsReport delivers world-class grading and authentication for diamonds,
              gemstones and fine jewellery — issued on a secure, tamper-proof PVC certificate.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
              <Link
                to="/verify"
                className="group inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-[1.03] transition-transform text-sm sm:text-base"
              >
                Verify a Report <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full border border-border text-foreground/90 hover:border-primary hover:text-primary transition-colors text-sm sm:text-base"
              >
                About the Lab
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4 max-w-xs sm:max-w-md">
              {[
                { k: "150K+", v: "Reports Issued" },
                { k: "25+", v: "Master Graders" },
                { k: "ISO", v: "Accredited" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="text-xl sm:text-2xl font-display text-gradient-gold">{s.k}</div>
                  <div className="text-[9px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex items-center justify-center py-10 lg:py-0 w-full"
          >
            {/* rings — clipped to their own layer so they never cause page overflow */}
            <div className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none">
              <div className="w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] rounded-full border border-primary/15 animate-spin-slow" />
              <div className="absolute w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] lg:w-[340px] lg:h-[340px] rounded-full border border-primary/10" />
            </div>
            <Card3D width={heroCardWidth} />
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-4 sm:px-6 py-16 md:py-24 relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Our Reports</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl">
              Four pillars of <span className="text-gradient-gold">authenticity</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground">
              Every report is a meticulous record — the result of advanced spectroscopy, microscopy and master appraisal.
            </p>
          </div>
          <div className="mt-12 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative p-6 sm:p-7 rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/40 transition-colors shadow-elegant"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                  <s.icon className="w-6 h-6 sm:w-7 sm:h-7 text-gold-foreground" />
                </div>
                <h3 className="mt-4 sm:mt-5 font-display text-lg sm:text-xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="px-4 sm:px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Why JewelsReport</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl">
              Built for <span className="text-gradient-gold">absolute trust</span>
            </h2>
          </div>
          <div className="mt-10 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {whyUs.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-5 sm:p-6 rounded-2xl border border-border bg-card/40 backdrop-blur-sm hover:border-primary/40 transition-colors"
              >
                <w.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                <h3 className="mt-3 sm:mt-4 font-display text-lg">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-4 sm:px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Our Process</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl">
              From rough stone to <span className="text-gradient-gold">final word</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-lg">
              Every submission follows a six-stage protocol designed to remove human bias and capture
              every measurable property with laboratory precision.
            </p>
            <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
              {[
                "Secure intake & sealed handling",
                "Spectroscopic identification (FTIR, UV-Vis, Raman)",
                "Precision measurement & 4Cs grading",
                "Independent cross-verification by senior gemologist",
                "Digital archive & QR-linked report number",
                "Hologram-secured PVC certificate issued",
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm sm:text-base text-foreground/90">
                    <span className="text-primary font-mono mr-2">0{i + 1}</span>{step}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative flex items-center justify-center w-full">
            <Card3D width={processCardWidth} />
          </div>
        </div>
      </section>

      {/* HOW VERIFY */}
      <section className="px-4 sm:px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Verification</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl">
              Verify in <span className="text-gradient-gold">three taps</span>
            </h2>
          </div>
          <div className="mt-10 sm:mt-14 grid sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: QrCode, title: "Scan the QR", desc: "Use any phone camera on the card's QR code." },
              { icon: ScanSearch, title: "Or enter report number", desc: "Type the report number on the Verify page." },
              { icon: ShieldCheck, title: "See full details", desc: "Live data direct from our laboratory archive." },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-6 sm:p-8 rounded-2xl gold-border shadow-3d text-center"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-gold text-gold-foreground font-display text-lg flex items-center justify-center shadow-gold">
                  {i + 1}
                </div>
                <s.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary mx-auto mt-2" />
                <h3 className="mt-3 sm:mt-4 font-display text-lg sm:text-xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-4 sm:px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Trusted by the trade</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl">
              Words from the <span className="text-gradient-gold">industry</span>
            </h2>
          </div>
          <div className="mt-10 sm:mt-14 grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 sm:p-7 rounded-2xl bg-card/60 border border-border backdrop-blur-sm shadow-elegant"
              >
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-foreground/90 leading-relaxed">"{t.text}"</p>
                <div className="mt-4 sm:mt-5 pt-4 border-t border-border">
                  <div className="font-display text-base sm:text-lg">{t.name}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">FAQ</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl">
              Common <span className="text-gradient-gold">questions</span>
            </h2>
          </div>
          <div className="mt-10 sm:mt-12 space-y-3 sm:space-y-4">
            {faqs.map((f, i) => (
              <motion.details
                key={f.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group p-5 sm:p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm open:border-primary/40 transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none gap-3">
                  <span className="font-display text-base sm:text-lg">{f.q}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">{f.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 py-16 md:py-24">
        <div className="mx-auto max-w-5xl text-center relative p-8 sm:p-12 md:p-16 rounded-3xl gold-border shadow-3d overflow-hidden">
          <div className="absolute inset-0 bg-radial-gold opacity-50" />
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">
              Hold a JewelsReport card?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Verify the authenticity of any certificate instantly using its report number.
            </p>
            <Link
              to="/verify"
              className="mt-7 sm:mt-8 inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-[1.03] transition-transform text-sm sm:text-base"
            >
              Verify Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
