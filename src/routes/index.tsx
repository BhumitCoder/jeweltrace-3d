import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useSEO, SITE_URL, serviceItemList, reviewsSchema } from "@/lib/seo";
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
  {
    q: "What is a JewelsReport diamond certificate?",
    a: "A JewelsReport certificate is an independent, third-party grading report issued after scientific analysis of a diamond or gemstone. It documents the 4Cs (Cut, Colour, Clarity, Carat), fluorescence, measurements, and origin. Every report is printed on a tamper-proof PVC card with holographic foil and a unique QR code for instant online verification.",
  },
  {
    q: "What format is the JewelsReport certificate?",
    a: "Every report is issued on a secure, credit-card-sized PVC certificate featuring holographic foil, a guilloché micro-pattern, a unique report number, and a QR code that links directly to the live laboratory record.",
  },
  {
    q: "How do I verify a JewelsReport certificate?",
    a: "Scan the QR code on the card with any smartphone camera, or visit jewelsreport.com/verify and enter the report number. Full grading details appear instantly — no login or registration required.",
  },
  {
    q: "Can a JewelsReport certificate be faked or forged?",
    a: "It is extremely difficult. Each card carries holographic foil, guilloché micro-print security features, and a unique report number that is cross-checked against our live server. Any duplicate or altered number will fail verification immediately.",
  },
  {
    q: "How long does diamond grading take?",
    a: "Standard turnaround is 3 working days from submission. Express 24-hour service is available on request for urgent orders. Bulk orders from wholesalers are handled on dedicated schedules.",
  },
  {
    q: "Does JewelsReport certify lab grown diamonds?",
    a: "Yes. JewelsReport issues separate grading reports for CVD and HPHT lab-grown diamonds with full origin disclosure. The report clearly states 'Lab Grown Diamond' and includes the same 4Cs analysis as natural diamond reports.",
  },
  {
    q: "What is the difference between CVD and HPHT on a certificate?",
    a: "CVD (Chemical Vapour Deposition) and HPHT (High Pressure High Temperature) refer to the two methods of growing diamonds in a laboratory. JewelsReport identifies the growth method using advanced spectroscopy and discloses it on the certificate, so buyers always know exactly what they are purchasing.",
  },
  {
    q: "Is JewelsReport accepted by jewellers and buyers internationally?",
    a: "JewelsReport is trusted by diamond wholesalers, retailers, and independent appraisers across India and internationally. Our standards are aligned with global gemological practice, and our QR-based verification system works worldwide with any smartphone.",
  },
  {
    q: "Does JewelsReport certify coloured gemstones — rubies, emeralds, sapphires?",
    a: "Yes. JewelsReport issues gemstone reports for all coloured stones including ruby, emerald, sapphire, tanzanite, spinel and more. Reports include colour grade, clarity, origin determination (where possible) and any treatment disclosure such as heat treatment or fracture filling.",
  },
  {
    q: "What does the fluorescence grade on a diamond certificate mean?",
    a: "Fluorescence describes how a diamond glows under ultraviolet (UV) light. JewelsReport grades fluorescence from None to Very Strong and notes the colour (usually blue). In most cases, faint fluorescence has no visible effect on appearance, but strong fluorescence can make some diamonds look hazy in daylight — which is why it is always disclosed on the certificate.",
  },
  {
    q: "Can I get a certificate for a diamond already set in jewellery?",
    a: "JewelsReport offers both loose-stone grading and mounted jewellery reports. For mounted stones, some measurements and clarity assessments are estimated. For a complete 4Cs report with full precision, loose-stone grading is recommended.",
  },
  {
    q: "How much does a JewelsReport certificate cost?",
    a: "Pricing is based on stone type, carat weight, and turnaround time. Contact us directly via phone (+91-9967381180) or email (reports@jewelsreport.com) for current rates. Wholesale packages are available for high-volume submitters.",
  },
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
    title: "JewelsReport — Diamond, Gemstone & Jewellery Certification Lab | Surat, India",
    description:
      "Internationally trusted gemological lab issuing tamper-proof PVC certificates for natural & lab-grown diamonds, coloured gemstones and fine jewellery. 150,000+ reports issued. Verify by ID or QR in seconds.",
    path: "/",
    keywords:
      "diamond certification, gemstone report, lab grown diamond report, jewellery certification, PVC diamond certificate, QR diamond verification, 4Cs grading, sapphire report, ruby report, emerald report, JewelsReport, Surat diamond lab, certificate verify online",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      serviceItemList(),
      reviewsSchema(testimonials),
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: "JewelsReport — Diamond, Gemstone & Jewellery Certification Lab",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        description:
          "Internationally trusted gemological lab issuing tamper-proof PVC certificates for diamonds, gemstones and fine jewellery.",
        inLanguage: "en-US",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", ".hero-description"],
        },
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
              World-class grading and authentication for diamonds,<br />
              gemstones and fine jewellery.
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
