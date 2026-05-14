import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <section className="px-6 pt-20 pb-10 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-primary">Get in Touch</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">
          We'd love to <span className="text-gradient-gold">hear from you</span>
        </h1>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: MapPin, title: "Visit", lines: ["JewelsReport Tower", "Diamond District, Mumbai 400001"] },
              { icon: Phone, title: "Call", lines: ["+91 22 1234 5678", "Mon – Sat, 10:00 – 19:00 IST"] },
              { icon: Mail, title: "Email", lines: ["reports@jewelsreport.com", "support@jewelsreport.com"] },
            ].map((c) => (
              <div key={c.title} className="p-6 rounded-2xl border border-border bg-card shadow-elegant flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shrink-0 shadow-gold">
                  <c.icon className="w-5 h-5 text-gold-foreground" />
                </div>
                <div>
                  <div className="font-display text-lg">{c.title}</div>
                  {c.lines.map((l) => (
                    <div key={l} className="text-sm text-muted-foreground">{l}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="lg:col-span-3 p-8 rounded-2xl border border-border bg-card shadow-elegant space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Input label="Name" name="name" required />
              <Input label="Email" name="email" type="email" required />
            </div>
            <Input label="Subject" name="subject" required />
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Message</label>
              <textarea required rows={6} className="mt-2 w-full bg-input/30 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" />
            </div>
            <button className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-105 transition-transform">
              <Send className="w-4 h-4" /> Send Message
            </button>
            {sent && <p className="text-sm text-primary">Thanks — we'll be in touch shortly.</p>}
          </form>
        </div>
      </section>
    </Layout>
  );
}

function Input({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <input
        {...rest}
        className="mt-2 w-full bg-input/30 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors"
      />
    </div>
  );
}
