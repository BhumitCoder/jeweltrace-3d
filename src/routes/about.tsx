import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Diamond3D } from "@/components/Diamond3D";
import { motion } from "framer-motion";
import { Award, FlaskConical, Globe2, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — JewelReport Certification Lab" },
      { name: "description", content: "Learn about JewelReport — our gemologists, instruments and global standards for diamond and jewellery certification." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      <section className="px-6 pt-20 pb-12">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs uppercase tracking-[0.35em] text-primary">About JewelReport</p>
            <h1 className="mt-3 font-display text-5xl md:text-6xl leading-tight">
              A century of <span className="text-gradient-gold">gemological standards</span>, in every card.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              JewelReport Certification Lab is an independent gemological institute serving manufacturers,
              jewellers, traders and collectors across the world. Our reports are recognised in major
              diamond hubs and trusted by retailers in over 30 countries.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center">
            <Diamond3D size={320} />
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Award, title: "Accredited", desc: "ISO/IEC 17025 aligned protocols across every workstation." },
            { icon: FlaskConical, title: "Advanced Instruments", desc: "FTIR, UV-Vis, Raman, photoluminescence and DiamondView." },
            { icon: ShieldCheck, title: "Tamper-Proof", desc: "Hologram, microtext and QR-secured PVC certificates." },
            { icon: Globe2, title: "Global Reach", desc: "Trusted by ateliers and retailers in 30+ countries." },
          ].map((c) => (
            <div key={c.title} className="p-7 rounded-2xl bg-card border border-border shadow-elegant">
              <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                <c.icon className="w-6 h-6 text-gold-foreground" />
              </div>
              <h3 className="mt-5 font-display text-xl">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 bg-gradient-navy">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-primary">Our Mission</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            Bringing <span className="text-gradient-gold">unquestionable trust</span> to every gem.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            We exist to protect both the trade and the consumer. By blending rigorous science with the
            craftsmanship of master gemologists, we ensure every JewelReport-issued certificate stands
            up to the highest scrutiny — anywhere in the world.
          </p>
        </div>
      </section>
    </Layout>
  );
}
