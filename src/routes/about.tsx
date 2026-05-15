import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useSEO, breadcrumb } from "@/lib/seo";
import { Card3D } from "@/components/Card3D";
import { motion } from "framer-motion";
import {
  Award,
  FlaskConical,
  Globe2,
  ShieldCheck,
  Microscope,
  Gem,
  Users,
  Target,
  Eye,
  Heart,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

const values = [
  { icon: Target, title: "Integrity", desc: "Every grade is independent. No commercial pressure ever influences a report." },
  { icon: Eye, title: "Transparency", desc: "Full origin disclosure on lab-grown stones. Nothing hidden, ever." },
  { icon: Heart, title: "Craftsmanship", desc: "Science meets the trained eye of master gemologists with decades of practice." },
  { icon: ShieldCheck, title: "Security", desc: "Tamper-proof PVC, holographic foil and digital archive for every card." },
];

const milestones = [
  { year: "2014", text: "Founded as a small grading bench in Surat by three master gemologists." },
  { year: "2017", text: "Achieved ISO/IEC 17025 aligned protocols across all workstations." },
  { year: "2019", text: "Crossed 25,000 reports issued and opened a second lab in Mumbai." },
  { year: "2022", text: "Launched secure PVC card format with QR-linked verification." },
  { year: "2024", text: "Recognised by retailers in 30+ countries; 100K+ reports milestone." },
  { year: "2026", text: "Lab Grown Jewellery report category launched for finished pieces." },
];

const team = [
  { name: "Dr. Anjali Verma", role: "Chief Gemologist", years: "22 yrs" },
  { name: "Rohit Khanna", role: "Head of Diamonds", years: "18 yrs" },
  { name: "Meera Iyer", role: "Coloured Stones Lead", years: "15 yrs" },
  { name: "Daniel Cohen", role: "Lab Operations Director", years: "20 yrs" },
];

const instruments = [
  { name: "FTIR Spectrometer", use: "Identifies natural vs. lab-grown diamonds via infrared signatures." },
  { name: "UV-Vis-NIR", use: "Detects treatments and colour origin in coloured gemstones." },
  { name: "Raman Spectroscopy", use: "Non-destructive identification of inclusions and minerals." },
  { name: "DiamondView", use: "UV fluorescence imaging to distinguish HPHT/CVD growth patterns." },
  { name: "Photoluminescence", use: "Reveals treatment history at the atomic level." },
  { name: "Sarine Loupe", use: "Captures clarity inclusions at micron-level precision." },
];

function AboutPage() {
  return (
    <Layout>
      {/* HERO */}
      <section className="px-4 sm:px-6 pt-20 pb-16">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs uppercase tracking-[0.35em] text-primary">About JewelsReport</p>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl leading-tight">
              A new standard of <span className="text-gradient-gold">gemological trust</span>.
            </h1>
            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              JewelsReport Certification Lab is an independent gemological institute serving manufacturers,
              jewellers, traders and collectors across the world. Our reports are recognised in major
              diamond hubs and trusted by retailers in over 30 countries — issued on a secure,
              tamper-proof PVC certificate built to last a lifetime.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Link
                to="/verify"
                className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-[1.03] transition-transform text-sm sm:text-base"
              >
                Verify a Report <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full border border-border hover:border-primary hover:text-primary transition-colors text-sm sm:text-base"
              >
                Talk to the Lab
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center"
          >
            <Card3D width={400} />
          </motion.div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="px-4 sm:px-6 py-10 sm:py-12 border-y border-border/50">
        <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          {[
            { k: "150K+", v: "Reports Issued" },
            { k: "30+", v: "Countries Served" },
            { k: "25+", v: "Master Graders" },
            { k: "12 yrs", v: "of Heritage" },
          ].map((s) => (
            <div key={s.v}>
              <div className="text-4xl md:text-5xl font-display text-gradient-gold">{s.k}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="px-4 sm:px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Credentials</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl">
              Built on <span className="text-gradient-gold">science</span>, sealed by craft
            </h2>
          </div>
          <div className="mt-10 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Award, title: "Accredited", desc: "ISO/IEC 17025 aligned protocols across every workstation." },
              { icon: FlaskConical, title: "Advanced Instruments", desc: "FTIR, UV-Vis, Raman, photoluminescence & DiamondView." },
              { icon: ShieldCheck, title: "Tamper-Proof", desc: "Hologram, microtext and QR-secured PVC certificates." },
              { icon: Globe2, title: "Global Reach", desc: "Trusted by ateliers and retailers in 30+ countries." },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-7 rounded-2xl bg-card border border-border shadow-elegant hover:border-primary/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                  <c.icon className="w-6 h-6 text-gold-foreground" />
                </div>
                <h3 className="mt-5 font-display text-xl">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="px-4 sm:px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-6 sm:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-10 rounded-3xl gold-border shadow-3d"
          >
            <Target className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            <h2 className="mt-3 sm:mt-4 font-display text-2xl sm:text-3xl md:text-4xl">Our Mission</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              To protect both the trade and the consumer by blending rigorous science with the
              craftsmanship of master gemologists — ensuring every JewelsReport certificate stands
              up to the highest scrutiny anywhere in the world.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-10 rounded-3xl gold-border shadow-3d"
          >
            <Eye className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            <h2 className="mt-3 sm:mt-4 font-display text-2xl sm:text-3xl md:text-4xl">Our Vision</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              A world where every gemstone, every diamond and every piece of jewellery carries an
              unforgeable identity — verifiable in seconds, trusted for generations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="px-4 sm:px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Our Values</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl">
              The principles we <span className="text-gradient-gold">grade by</span>
            </h2>
          </div>
          <div className="mt-10 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-7 rounded-2xl bg-card/60 border border-border backdrop-blur-sm hover:border-primary/40 transition-colors"
              >
                <v.icon className="w-9 h-9 text-primary" />
                <h3 className="mt-4 font-display text-xl">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="px-4 sm:px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Our Journey</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl">
              A decade of <span className="text-gradient-gold">precision</span>
            </h2>
          </div>
          <div className="mt-14 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex md:items-center gap-6 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-gold shadow-gold" />
                  <div className="md:w-1/2 pl-12 md:pl-0 md:px-10">
                    <div className="font-display text-3xl text-gradient-gold">{m.year}</div>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{m.text}</p>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INSTRUMENTS */}
      <section className="px-4 sm:px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-primary">Inside the Lab</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl">
                Instruments behind every <span className="text-gradient-gold">grade</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
                Our laboratory pairs traditional 10× loupe inspection with a complete suite of modern
                spectroscopic instruments. Each report is the result of multiple independent readings.
              </p>
              <div className="mt-8 flex items-center gap-4 p-5 rounded-2xl border border-primary/30 bg-card/60">
                <Microscope className="w-10 h-10 text-primary shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Every diamond is examined at minimum 10× magnification by two independent graders
                  before a final report is issued.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {instruments.map((it, i) => (
                <motion.div
                  key={it.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-5 rounded-2xl bg-card/60 border border-border hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Gem className="w-4 h-4 text-primary" />
                    <h3 className="font-display text-lg">{it.name}</h3>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{it.use}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="px-4 sm:px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Leadership</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl">
              The <span className="text-gradient-gold">people</span> behind the seal
            </h2>
          </div>
          <div className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {team.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-card/60 border border-border backdrop-blur-sm text-center hover:border-primary/40 transition-colors"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
                  <Users className="w-10 h-10 text-gold-foreground" />
                </div>
                <h3 className="mt-5 font-display text-lg">{t.name}</h3>
                <p className="text-xs text-primary uppercase tracking-widest mt-1">{t.role}</p>
                <p className="mt-3 text-xs text-muted-foreground">{t.years} experience</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMISE */}
      <section className="px-4 sm:px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Our Promise</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl">
              What every <span className="text-gradient-gold">JewelsReport card</span> guarantees
            </h2>
          </div>
          <ul className="mt-8 sm:mt-12 grid sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              "Independent grading with no commercial bias",
              "Cross-verification by at least two senior gemologists",
              "Tamper-proof PVC card with holographic foil",
              "Unique QR-linked report number",
              "Lifetime digital archive accessible 24/7",
              "Full disclosure of treatments and origin",
            ].map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 p-5 rounded-2xl bg-card/50 border border-border"
              >
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground/90">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl text-center relative p-8 sm:p-12 md:p-16 rounded-3xl gold-border shadow-3d overflow-hidden">
          <div className="absolute inset-0 bg-radial-gold opacity-50" />
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">
              Ready to certify your stones?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Speak with our team about grading, bulk submissions, or becoming an authorised partner.
            </p>
            <div className="mt-7 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-[1.03] transition-transform text-sm sm:text-base"
              >
                Contact the Lab <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/verify"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-border hover:border-primary hover:text-primary transition-colors text-sm sm:text-base"
              >
                Verify a Report
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
