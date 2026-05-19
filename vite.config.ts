import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
import fs from "fs";

const SITE_URL = "https://www.jewelsreport.com";

const ROUTES: Array<{
  dir: string;
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogType?: string;
  jsonLd: object[];
}> = [
  {
    dir: "about",
    title: "About JewelsReport — Master Gemologists & ISO-Aligned Lab | Surat",
    description:
      "Independent gemological laboratory in Surat founded by master gemologists. ISO/IEC 17025 aligned protocols. Issuing tamper-proof PVC certificates for diamonds, gemstones and jewellery since 2014.",
    keywords:
      "about JewelsReport, gem lab Surat, diamond grading lab India, master gemologist, ISO gem lab, FTIR diamond testing, lab grown diamond origin, gemological laboratory Surat",
    canonical: `${SITE_URL}/about`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${SITE_URL}/about#webpage`,
        url: `${SITE_URL}/about`,
        name: "About JewelsReport Gemological Laboratory",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        description:
          "Independent gemological laboratory founded in 2014 in Surat with 25+ master gemologists and ISO/IEC 17025 aligned protocols.",
        inLanguage: "en-US",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", ".hero-description"],
        },
      },
    ],
  },
  {
    dir: "verify",
    title: "Verify a Certificate — Instant Diamond & Gemstone Report Check | JewelsReport",
    description:
      "Verify any JewelsReport diamond, gemstone or jewellery certificate in seconds. Enter the report number or scan the QR code on your PVC card to confirm authenticity and view full grading details.",
    keywords:
      "verify diamond certificate, check gemstone report, JewelsReport verify, QR diamond verification, certificate authentication, fake diamond certificate check, real gem certificate, lab report verify",
    canonical: `${SITE_URL}/verify`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Verify Certificate", item: `${SITE_URL}/verify` },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "@id": `${SITE_URL}/verify#app`,
        name: "JewelsReport Certificate Verification",
        description:
          "Free online tool to instantly verify any JewelsReport gemological certificate by report number or QR scan.",
        url: `${SITE_URL}/verify`,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        provider: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "How to Verify a JewelsReport Certificate",
        description: "Step-by-step guide to verifying the authenticity of a JewelsReport gemological certificate.",
        totalTime: "PT1M",
        step: [
          { "@type": "HowToStep", position: 1, name: "Find your report number", text: "Locate the unique report number printed on the front of your JewelsReport PVC certificate card." },
          { "@type": "HowToStep", position: 2, name: "Visit the verify page", text: "Go to https://www.jewelsreport.com/verify or scan the QR code on the card.", url: `${SITE_URL}/verify` },
          { "@type": "HowToStep", position: 3, name: "Enter the report number", text: "Type the report number into the search field and press Verify." },
          { "@type": "HowToStep", position: 4, name: "View certificate details", text: "The full certificate details appear instantly — grading results, item description, issue date and the lab-verified record." },
        ],
      },
    ],
  },
  {
    dir: "blog",
    title: "JewelsReport Journal — Diamond, Gemstone & Jewellery Industry Insights",
    description:
      "Stories, science and standards from the world of gem certification. Lab-grown diamond news, buyer guides, gemological research and industry updates from JewelsReport.",
    keywords:
      "diamond blog, gemstone journal, lab grown diamond articles, jewellery industry news, gem grading insights, CVD diamond news, sapphire guide, gemstone buyer guide, certification tips",
    canonical: `${SITE_URL}/blog`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blog` },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${SITE_URL}/blog#blog`,
        url: `${SITE_URL}/blog`,
        name: "JewelsReport Journal",
        description: "Diamond, gemstone and jewellery certification insights from the JewelsReport laboratory team.",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-US",
      },
    ],
  },
  {
    dir: "contact",
    title: "Contact JewelsReport — Lab Enquiries, Bulk Certification & Support",
    description:
      "Reach the JewelsReport gemological laboratory in Surat for diamond grading enquiries, bulk certification, retailer programs and verification support. Call +91 99673 81180 or email reports@jewelsreport.com.",
    keywords:
      "contact gem lab, diamond grading enquiry, jewellery certification contact, JewelsReport support, bulk diamond certification, Surat gem lab contact, diamond lab India phone",
    canonical: `${SITE_URL}/contact`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": `${SITE_URL}/contact#webpage`,
        url: `${SITE_URL}/contact`,
        name: "Contact JewelsReport Gemological Laboratory",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        description: "Contact details and enquiry form for JewelsReport gemological laboratory.",
        inLanguage: "en-US",
      },
      {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${SITE_URL}/#localbusiness`,
        name: "JewelsReport Gemological Laboratory",
        telephone: "+91-9967381180",
        email: "reports@jewelsreport.com",
        url: `${SITE_URL}/`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "202, 2/F, Veer Ashish Building, Surat Diamond Market, Mahidharpura",
          addressLocality: "Surat",
          addressRegion: "Gujarat",
          postalCode: "395003",
          addressCountry: "IN",
        },
        geo: { "@type": "GeoCoordinates", latitude: 21.1939, longitude: 72.8314 },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "10:00",
            closes: "19:00",
          },
        ],
      },
    ],
  },
];

function seoPrerender(): Plugin {
  return {
    name: "seo-prerender",
    apply: "build",
    async closeBundle() {
      const distDir = path.resolve(__dirname, "dist");
      const indexPath = path.join(distDir, "index.html");
      if (!fs.existsSync(indexPath)) return;

      const template = fs.readFileSync(indexPath, "utf-8");

      for (const route of ROUTES) {
        let html = template;

        const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

        html = html.replace(/(<title>)[^<]*(<\/title>)/, `$1${esc(route.title)}$2`);
        html = html.replace(/(<meta name="description" content=")[^"]*(")/,   `$1${esc(route.description)}$2`);
        html = html.replace(/(<meta name="keywords" content=")[^"]*(")/,       `$1${esc(route.keywords)}$2`);
        html = html.replace(/(<link rel="canonical" href=")[^"]*(")/,          `$1${route.canonical}$2`);
        html = html.replace(/(<link rel="alternate" hreflang="en" href=")[^"]*(")/,         `$1${route.canonical}$2`);
        html = html.replace(/(<link rel="alternate" hreflang="en-IN" href=")[^"]*(")/,      `$1${route.canonical}$2`);
        html = html.replace(/(<link rel="alternate" hreflang="x-default" href=")[^"]*(")/,  `$1${route.canonical}$2`);
        html = html.replace(/(<meta property="og:title" content=")[^"]*(")/,       `$1${esc(route.title)}$2`);
        html = html.replace(/(<meta property="og:description" content=")[^"]*(")/,`$1${esc(route.description)}$2`);
        html = html.replace(/(<meta property="og:url" content=")[^"]*(")/,         `$1${route.canonical}$2`);
        html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/,      `$1${esc(route.title)}$2`);
        html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/,`$1${esc(route.description)}$2`);

        const jsonLdBlocks = route.jsonLd
          .map((block) => `    <script type="application/ld+json">\n    ${JSON.stringify(block, null, 2)}\n    </script>`)
          .join("\n");
        html = html.replace("</head>", `${jsonLdBlocks}\n  </head>`);

        const routeDir = path.join(distDir, route.dir);
        fs.mkdirSync(routeDir, { recursive: true });
        fs.writeFileSync(path.join(routeDir, "index.html"), html, "utf-8");
      }

      console.log(`✓ SEO prerender: generated static HTML for ${ROUTES.length} routes`);
    },
  };
}

export default defineConfig({
  plugins: [
    TanStackRouterVite({ routesDirectory: "./src/routes", generatedRouteTree: "./src/routeTree.gen.ts" }),
    react(),
    tailwindcss(),
    seoPrerender(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5000,
    host: "0.0.0.0",
    allowedHosts: true,
    watch: {
      ignored: [
        path.resolve(__dirname, ".cache"),
        path.resolve(__dirname, ".local"),
        "**/.cache/**",
        "**/.local/**",
      ],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) return "react";
          if (id.includes("node_modules/@tanstack/react-router")) return "router";
          if (id.includes("node_modules/framer-motion") || id.includes("node_modules/lucide-react")) return "ui";
          if (id.includes("node_modules/jspdf") || id.includes("node_modules/html-to-image") || id.includes("node_modules/html2canvas")) return "pdf";
        },
      },
    },
  },
});
