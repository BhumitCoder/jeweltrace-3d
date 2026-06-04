import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useSEO, SITE_URL, breadcrumb } from "@/lib/seo";

export const Route = createFileRoute("/terms-of-service")({
  component: TermsOfServicePage,
});

function TermsOfServicePage() {
  useSEO({
    title: "Terms of Service — JewelsReport Gemological Laboratory",
    description: "Terms and conditions governing use of JewelsReport certificate verification services, website and gemological reports issued by our laboratory.",
    path: "/terms-of-service",
    keywords: "JewelsReport terms of service, certificate terms, gem lab terms, diamond report terms",
    jsonLd: [
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Terms of Service", path: "/terms-of-service" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/terms-of-service#webpage`,
        url: `${SITE_URL}/terms-of-service`,
        name: "Terms of Service — JewelsReport",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
        datePublished: "2026-06-01",
        dateModified: "2026-06-04",
      },
    ],
  });

  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Legal</p>
          <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-4">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">Effective date: 1 June 2026 &nbsp;·&nbsp; Last updated: 1 June 2026</p>
        </header>

        <div className="prose prose-sm sm:prose-base max-w-none space-y-8 text-foreground/90 leading-relaxed">

          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using the JewelsReport website (<strong>jewelsreport.com</strong>) or any of its services,
              you agree to be bound by these Terms of Service. If you do not agree with any part of these terms,
              you must not use our website or services.
            </p>
          </Section>

          <Section title="2. Services Provided">
            <p>JewelsReport provides:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Gemological certification services for natural diamonds, lab-grown diamonds, coloured gemstones and fine jewellery.</li>
              <li>Tamper-proof PVC certificate cards with holographic foil and QR verification.</li>
              <li>Online certificate verification via our website and QR codes.</li>
              <li>Educational and informational content about gemology and the diamond industry.</li>
            </ul>
          </Section>

          <Section title="3. Certificate Verification Service">
            <p>
              The online verification tool is provided free of charge for users to confirm the authenticity of
              JewelsReport certificates. You may enter a report number or scan a QR code to retrieve the
              associated grading record.
            </p>
            <p>
              The verification service is provided "as is". JewelsReport makes no warranty that the service
              will be uninterrupted, error-free, or that results will be accurate in all circumstances.
              System maintenance may temporarily affect availability.
            </p>
          </Section>

          <Section title="4. Accuracy of Certificates">
            <p>
              JewelsReport certificates represent the professional opinion of our trained gemologists based on
              standard gemological testing conducted at our laboratory. Certificate grades and descriptions reflect
              the stone as assessed at the time of grading. Natural characteristics, subsequent treatments or
              physical damage occurring after grading are not covered.
            </p>
            <p>
              JewelsReport certificates are grading reports — they are <strong>not</strong> valuations, appraisals
              or insurance documents. For insurance or resale purposes, please obtain a separate valuation from a
              qualified appraiser.
            </p>
          </Section>

          <Section title="5. Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable law, JewelsReport and its directors, employees and
              agents shall not be liable for any indirect, incidental, special, consequential or punitive damages
              arising from your use of our services or reliance on our certificates.
            </p>
            <p>
              Our total liability to you for any claim arising from these terms or our services shall not exceed
              the fee paid for the specific certification service giving rise to the claim.
            </p>
          </Section>

          <Section title="6. Intellectual Property">
            <p>
              All content on this website — including text, images, logos, certificate designs, QR codes and
              data — is the intellectual property of JewelsReport Gemological Laboratory. You may not reproduce,
              distribute or create derivative works without our express written consent.
            </p>
            <p>
              Reproduction or forgery of JewelsReport certificates is a criminal offence under the Indian Penal Code
              and will be prosecuted to the fullest extent of the law.
            </p>
          </Section>

          <Section title="7. Prohibited Uses">
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Attempt to reproduce, forge or alter any JewelsReport certificate.</li>
              <li>Use automated tools to scrape or bulk-query our verification system.</li>
              <li>Use our website or services for any unlawful purpose.</li>
              <li>Attempt to gain unauthorised access to our systems or databases.</li>
              <li>Misrepresent the results of a JewelsReport certificate verification.</li>
            </ul>
          </Section>

          <Section title="8. Governing Law">
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of India.
              Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts
              of Surat, Gujarat, India.
            </p>
          </Section>

          <Section title="9. Changes to Terms">
            <p>
              JewelsReport reserves the right to modify these terms at any time. Updated terms will be posted on
              this page with a revised effective date. Continued use of our services after changes constitutes
              acceptance of the revised terms.
            </p>
          </Section>

          <Section title="10. Contact">
            <p>For any questions regarding these terms, please contact us:</p>
            <address className="not-italic mt-2 text-muted-foreground">
              JewelsReport Gemological Laboratory<br />
              202, 2/F, Veer Ashish Building, Surat Diamond Market<br />
              Mahidharpura, Surat, Gujarat 395003, India<br />
              <a href="mailto:reports@jewelsreport.com" className="text-primary hover:underline">reports@jewelsreport.com</a>
              &nbsp;·&nbsp;
              <a href="tel:+919967381180" className="text-primary hover:underline">+91 99673 81180</a>
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
