import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useSEO, breadcrumb, localBusiness, SITE_URL } from "@/lib/seo";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  useSEO({
    title: "Contact JewelsReport — Lab Enquiries, Bulk Certification & Support",
    description:
      "Reach the JewelsReport gemological laboratory in Surat for diamond grading enquiries, bulk certification, retailer programs and verification support. Call +91 99673 81180 or email reports@jewelsreport.com.",
    path: "/contact",
    keywords:
      "contact JewelsReport, JewelsReport phone number India, JewelsReport contact number, JewelsReport email address, JewelsReport Surat address, JewelsReport office address, gem lab Surat contact, diamond grading enquiry India, jewellery certification contact, diamond lab India phone, gem lab email India, JewelsReport customer support, diamond grading help India, gemstone certification enquiry India, lab grown diamond grading contact, CVD diamond report enquiry India, HPHT diamond grading enquiry, natural diamond certification enquiry, ruby certification enquiry India, sapphire report enquiry India, emerald certification contact, coloured stone grading enquiry, fancy colour diamond enquiry, bulk diamond certification India, wholesale diamond grading enquiry, large volume diamond certification India, high volume gem grading, diamond wholesaler certification India, diamond dealer certification India, jeweller certification program India, retailer diamond grading India, manufacturing jeweller certification, importer diamond certification India, exporter diamond report India, export quality diamond lab, B2B diamond grading India, bulk gem grading India, slab pricing diamond certification, discounted bulk grading India, 202 Veer Ashish Building Surat, Surat Diamond Market office, Mahidharpura Surat gem lab, Surat Gujarat 395003 India, gem lab Surat location, diamond lab Surat address, directions JewelsReport Surat, how to reach gem lab Surat, visit JewelsReport lab, diamond lab walk in appointment, gem lab Surat timing, gem lab working hours, Monday to Saturday gem lab, 10am 7pm lab hours, closed Sunday gem lab, gem lab appointment booking, diamond grading appointment India, how to submit diamond for grading India, how to get diamond certified India, diamond submission process, gemstone submission India, secure packaging diamond, courier diamond to lab, hand deliver diamond Surat, diamond grading process India, steps to get diamond certified, time required diamond grading, turnaround time diamond certificate, 3 day turnaround India, 3 working day certificate, express diamond certificate India, 24 hour diamond report India, same day diamond grading, urgent certification India, standard diamond grading time, diamond grading cost India, gem certification price India, diamond report fee India, certificate price list India, affordable certification India, cheap diamond certification India, best price gem lab India, certification rate India, grading fee structure, UPI payment gem lab, bank transfer diamond lab, NEFT RTGS gem lab, cash payment diamond lab, cheque payment certification, GST invoice certification, gem lab invoice India, diamond grading invoice, JewelsReport billing, certification receipt India, how to pay gem lab India, online payment gem lab",
    jsonLd: [
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
      localBusiness(),
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": `${SITE_URL}/contact#webpage`,
        url: `${SITE_URL}/contact`,
        name: "Contact the Lab",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        description: "Contact JewelsReport for diamond grading enquiries, bulk certification, retailer programmes and verification support. Call +91-9967381180.",
        inLanguage: "en-IN",
        publisher: { "@id": `${SITE_URL}/#organization` },
        breadcrumb: { "@id": `${SITE_URL}/contact#breadcrumb` },
        datePublished: "2026-05-01",
        dateModified: "2026-06-04",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "h2", ".contact-address"],
        },
      },
    ],
  });

  return (
    <Layout>
      <section className="px-4 sm:px-6 pt-20 pb-10 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-primary">Get in Touch</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl">
          We'd love to <span className="text-gradient-gold">hear from you</span>
        </h1>
      </section>

      <section className="px-4 sm:px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-5 gap-6 sm:gap-10">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {[
              { icon: MapPin, title: "Visit", lines: ["202, 2/F, Veer Ashish Building", "Surat Diamond Market, Mahidharpura", "Surat, Gujarat 395003, India"] },
              { icon: Phone, title: "Call", lines: ["+91 99673 81180", "Mon – Sat, 10:00 – 19:00 IST"] },
              { icon: Mail, title: "Email", lines: ["reports@jewelsreport.com", "support@jewelsreport.com"] },
            ].map((c) => (
              <div key={c.title} className="p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-elegant flex gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-gold flex items-center justify-center shrink-0 shadow-gold">
                  <c.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gold-foreground" />
                </div>
                <div>
                  <div className="font-display text-base sm:text-lg">{c.title}</div>
                  {c.lines.map((l) => (
                    <div key={l} className="text-xs sm:text-sm text-muted-foreground">{l}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="lg:col-span-3 p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-elegant space-y-4 sm:space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <Input label="Name" name="name" required />
              <Input label="Email" name="email" type="email" required />
            </div>
            <Input label="Subject" name="subject" required />
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Message</label>
              <textarea required rows={5} className="mt-2 w-full bg-input/30 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-sm sm:text-base" />
            </div>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-105 transition-transform text-sm sm:text-base">
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
        className="mt-2 w-full bg-input/30 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-sm sm:text-base"
      />
    </div>
  );
}
