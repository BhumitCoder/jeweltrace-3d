import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Diamond3D } from "@/components/Diamond3D";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Award, Microscope, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JewelReport — Premium Certification for Diamonds & Jewellery" },
      { name: "description", content: "Globally trusted gem & jewellery certification. Lab-grown diamonds, natural diamonds, gemstones and jewellery reports." },
    ],
  }),
  component: HomePage,
});

const services = [
  { title: "Lab Grown Diamond Reports", desc: "Comprehensive grading for CVD & HPHT diamonds with full origin disclosure.", icon: Sparkles },
  { title: "Natural Diamond Reports", desc: "International standard 4Cs grading and precise measurement analysis.", icon: Award },
  { title: "Gemstone Reports", desc: "Identification and authenticity for coloured stones — sapphire, ruby, emerald and more.", icon: Microscope },
  { title: "Jewellery Reports", desc: "Full appraisal of finished jewellery with metal & stone detailing.", icon: ShieldCheck },
];

function HomePage() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center px-6 pt-12 pb-24">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-xs uppercase tracking-[0.25em] text-primary">
              <Sparkles className="w-3.5 h-3.5" /> Internationally Recognised Lab
            </div>
            <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[1.05]">
              The seal of <span className="text-gradient-gold">brilliance</span>
              <br />you can trust.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              JewelReport delivers world-class grading and authentication for diamonds,
              gemstones and fine jewellery — backed by precision instruments and master gemologists.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/verify"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-[1.03] transition-transform"
              >
                Verify a Report <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border text-foreground/90 hover:border-primary hover:text-primary transition-colors"
              >
                About the Lab
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 max-w-md">
              {[
                { k: "150K+", v: "Reports Issued" },
                { k: "25+", v: "Master Graders" },
                { k: "ISO", v: "Accredited" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="text-2xl font-display text-gradient-gold">{s.k}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex items-center justify-center min-h-[400px]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[420px] h-[420px] rounded-full border border-primary/20 animate-spin-slow" />
              <div className="absolute w-[320px] h-[320px] rounded-full border border-primary/10" />
            </div>
            <Diamond3D size={340} />
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-6 py-24 relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Our Reports</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Four pillars of <span className="text-gradient-gold">authenticity</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Each report is a meticulous record — the result of advanced spectroscopy, microscopy and master appraisal.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
                style={{ transformStyle: "preserve-3d" }}
                className="group relative p-7 rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/40 transition-colors shadow-elegant"
              >
                <div className="absolute inset-0 rounded-2xl bg-radial-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                    <s.icon className="w-7 h-7 text-gold-foreground" />
                  </div>
                  <h3 className="mt-5 font-display text-xl">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 py-24 bg-gradient-navy">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Our Process</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              From rough stone to <span className="text-gradient-gold">final word</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg">
              Every submission follows a six-stage protocol designed to remove human bias and capture
              every measurable property with laboratory precision.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Secure intake & sealed handling",
                "Spectroscopic identification (FTIR, UV-Vis, Raman)",
                "Precision measurement & 4Cs grading",
                "Independent cross-verification by senior gemologist",
                "Hologram-secured PVC certificate issued",
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground/90">
                    <span className="text-primary font-mono mr-2">0{i + 1}</span>{step}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto rounded-3xl bg-card/40 border border-primary/20 backdrop-blur-sm shadow-3d p-10 flex items-center justify-center">
              <Diamond3D size={280} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl text-center relative p-12 md:p-16 rounded-3xl gold-border shadow-3d overflow-hidden">
          <div className="absolute inset-0 bg-radial-gold opacity-50" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-5xl">
              Hold a JewelReport card?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Verify the authenticity of any certificate instantly using its report number.
            </p>
            <Link
              to="/verify"
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-[1.03] transition-transform"
            >
              Verify Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
