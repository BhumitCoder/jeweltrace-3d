import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useSEO, SITE_URL, breadcrumb } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  useSEO({
    title: "Privacy Policy | JewelsReport",
    description: "JewelsReport privacy policy. Learn how we collect, use and protect your personal data when you use our certificate verification service and website.",
    path: "/privacy-policy",
    keywords: "JewelsReport privacy policy, data protection, gemological lab privacy",
    jsonLd: [
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Privacy Policy", path: "/privacy-policy" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/privacy-policy#webpage`,
        url: `${SITE_URL}/privacy-policy`,
        name: "Privacy Policy — JewelsReport",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
        datePublished: "2026-06-01",
        dateModified: "2026-06-01",
      },
    ],
  });

  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Legal</p>
          <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-4">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Effective date: 1 June 2026 &nbsp;·&nbsp; Last updated: 1 June 2026</p>
        </header>

        <div className="prose prose-sm sm:prose-base max-w-none space-y-8 text-foreground/90 leading-relaxed">

          <Section title="1. Who We Are">
            <p>
              JewelsReport Gemological Laboratory (<strong>"JewelsReport"</strong>, <strong>"we"</strong>, <strong>"us"</strong>)
              is an independent gemological certification laboratory located at 202, 2/F, Veer Ashish Building,
              Surat Diamond Market, Mahidharpura, Surat, Gujarat 395003, India.
              We issue tamper-proof PVC certificates with QR verification for natural diamonds, lab-grown diamonds,
              coloured gemstones and fine jewellery.
            </p>
            <p>
              Contact: <a href="mailto:reports@jewelsreport.com" className="text-primary hover:underline">reports@jewelsreport.com</a>
              &nbsp;·&nbsp; <a href="tel:+919967381180" className="text-primary hover:underline">+91 99673 81180</a>
            </p>
          </Section>

          <Section title="2. What Data We Collect">
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Certificate verification:</strong> When you verify a certificate, we log the report number queried and the approximate timestamp. We do not collect your name, email or IP address for verification queries.</li>
              <li><strong>Contact enquiries:</strong> If you submit an enquiry via our contact form or email, we collect your name, email address and the contents of your message.</li>
              <li><strong>Usage data:</strong> We may collect anonymised analytics data (pages visited, browser type, country) to improve our service. No personally identifiable information is included.</li>
              <li><strong>Cookies:</strong> We use only essential cookies required for the website to function. We do not use tracking or advertising cookies.</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Data">
            <ul className="list-disc pl-5 space-y-1">
              <li>To operate and maintain the certificate verification service.</li>
              <li>To respond to enquiries and provide customer support.</li>
              <li>To improve the website and user experience.</li>
              <li>To comply with legal obligations under Indian law (IT Act 2000, IT Rules 2011).</li>
            </ul>
            <p>We do <strong>not</strong> sell, rent or share your personal data with third parties for marketing purposes.</p>
          </Section>

          <Section title="4. Data Storage & Security">
            <p>
              Certificate records are stored in Google Firebase (Firestore) with industry-standard encryption at rest and in transit.
              Contact form submissions are processed via email and retained for up to 2 years for business continuity purposes.
              We implement technical and organisational measures to protect your data against unauthorised access, loss or disclosure.
            </p>
          </Section>

          <Section title="5. Your Rights">
            <p>Under the Digital Personal Data Protection Act 2023 (India) you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access the personal data we hold about you.</li>
              <li>Correct inaccurate personal data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Withdraw consent where processing is based on consent.</li>
            </ul>
            <p>
              To exercise any of these rights, email us at{" "}
              <a href="mailto:reports@jewelsreport.com" className="text-primary hover:underline">reports@jewelsreport.com</a>.
              We will respond within 30 days.
            </p>
          </Section>

          <Section title="6. Third-Party Services">
            <p>We use the following third-party services which may process data on our behalf:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Google Firebase</strong> — database and hosting infrastructure (<a href="https://firebase.google.com/support/privacy" className="text-primary hover:underline" target="_blank" rel="noopener">Google Privacy Policy</a>).</li>
              <li><strong>Google Fonts</strong> — typeface delivery via CDN.</li>
            </ul>
          </Section>

          <Section title="7. Children's Privacy">
            <p>
              Our website is not directed at children under 18. We do not knowingly collect personal data from minors.
              If you believe a child has provided us with personal data, please contact us and we will delete it promptly.
            </p>
          </Section>

          <Section title="8. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised effective date.
              Continued use of our website after changes constitutes acceptance of the updated policy.
            </p>
          </Section>

          <Section title="9. Contact Us">
            <p>
              For any privacy-related questions or requests, please contact our Data Protection representative:
            </p>
            <address className="not-italic mt-2 text-muted-foreground">
              JewelsReport Gemological Laboratory<br />
              202, 2/F, Veer Ashish Building, Surat Diamond Market<br />
              Mahidharpura, Surat, Gujarat 395003, India<br />
              <a href="mailto:reports@jewelsreport.com" className="text-primary hover:underline">reports@jewelsreport.com</a>
            </address>
          </Section>

        </div>
      </article>
    </Layout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl sm:text-2xl text-foreground mb-3 pb-2 border-b border-border/50">{title}</h2>
      <div className="space-y-3 text-sm sm:text-base text-foreground/80 leading-relaxed">
        {children}
      </div>
    </section>
  );
}
