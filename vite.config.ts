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
  /* ── Static pages ───────────────────────────────────────────── */
  {
    dir: "about",
    title: "About JewelsReport — Gem Lab, Surat India",
    description:
      "Independent gemological laboratory in Surat founded by master gemologists. ISO/IEC 17025 aligned protocols. Issuing tamper-proof PVC certificates for diamonds, gemstones and jewellery since 2014.",
    keywords:
      "about JewelsReport, gem lab Surat, diamond grading lab India, master gemologist, ISO gem lab, FTIR diamond testing, lab grown diamond origin, gemological laboratory Surat",
    canonical: `${SITE_URL}/about`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/about#breadcrumb`,
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
        publisher: { "@id": `${SITE_URL}/#organization` },
        description:
          "Independent gemological laboratory founded in 2014 in Surat with 25+ master gemologists and ISO/IEC 17025 aligned protocols.",
        inLanguage: "en-IN",
        datePublished: "2026-05-01",
        dateModified: "2026-06-04",
      },
    ],
  },
  {
    dir: "verify",
    title: "Verify Your Diamond Certificate | JewelsReport",
    description:
      "Verify any JewelsReport diamond, gemstone or jewellery certificate in seconds. Enter the report number or scan the QR code on your PVC card to confirm authenticity and view full grading details.",
    keywords:
      "verify diamond certificate, check gemstone report, JewelsReport verify, QR diamond verification, certificate authentication, fake diamond certificate check, real gem certificate, lab report verify",
    canonical: `${SITE_URL}/verify`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/verify#breadcrumb`,
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
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/verify#webpage`,
        url: `${SITE_URL}/verify`,
        name: "Verify Certificate — Instant Diamond & Gemstone Report Check",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
        datePublished: "2026-05-01",
        dateModified: "2026-06-04",
      },
    ],
  },
  {
    dir: "blog",
    title: "JewelsReport Journal — Diamond & Gem Grading Guides",
    description:
      "Stories, science and standards from the world of gem certification. Lab-grown diamond news, buyer guides, gemological research and industry updates from JewelsReport.",
    keywords:
      "diamond blog, gemstone journal, lab grown diamond articles, jewellery industry news, gem grading insights, CVD diamond news, sapphire guide, gemstone buyer guide, certification tips",
    canonical: `${SITE_URL}/blog`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/blog#breadcrumb`,
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
        inLanguage: "en-IN",
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/blog#webpage`,
        url: `${SITE_URL}/blog`,
        name: "JewelsReport Journal — Diamond & Gemstone Certification Insights",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
        datePublished: "2026-05-01",
        dateModified: "2026-06-04",
      },
    ],
  },
  {
    dir: "privacy-policy",
    title: "Privacy Policy | JewelsReport",
    description:
      "JewelsReport privacy policy. Learn how we collect, use and protect your personal data when you use our certificate verification service and website.",
    keywords:
      "JewelsReport privacy policy, data protection, gemological lab privacy, certificate verification privacy, personal data gem lab",
    canonical: `${SITE_URL}/privacy-policy`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/privacy-policy#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${SITE_URL}/privacy-policy` },
        ],
      },
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
        dateModified: "2026-06-04",
      },
    ],
  },
  {
    dir: "terms-of-service",
    title: "Terms of Service | JewelsReport",
    description:
      "Terms and conditions governing use of JewelsReport certificate verification services, website and gemological reports issued by our laboratory.",
    keywords:
      "JewelsReport terms of service, certificate terms, gem lab terms, diamond report terms, lab report conditions of use",
    canonical: `${SITE_URL}/terms-of-service`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/terms-of-service#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Terms of Service", item: `${SITE_URL}/terms-of-service` },
        ],
      },
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
  },
  {
    dir: "contact",
    title: "Contact JewelsReport — Diamond Lab Enquiries",
    description:
      "Reach the JewelsReport gemological laboratory in Surat for diamond grading enquiries, bulk certification, retailer programs and verification support. Call +91 99673 81180 or email reports@jewelsreport.com.",
    keywords:
      "contact gem lab, diamond grading enquiry, jewellery certification contact, JewelsReport support, bulk diamond certification, Surat gem lab contact, diamond lab India phone",
    canonical: `${SITE_URL}/contact`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/contact#breadcrumb`,
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
        publisher: { "@id": `${SITE_URL}/#organization` },
        description: "Contact details and enquiry form for JewelsReport gemological laboratory.",
        inLanguage: "en-IN",
        datePublished: "2026-05-01",
        dateModified: "2026-06-04",
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

  /* ── Blog posts ─────────────────────────────────────────────── */
  {
    dir: "blog/4cs-diamond-grading-cut-colour-clarity-carat",
    title: "The 4Cs of Diamond Grading Explained | JewelsReport",
    description:
      "Complete guide to the 4Cs of diamond grading — cut, colour, clarity and carat weight. Learn how each factor affects a diamond's beauty, quality and value from JewelsReport master gemologists.",
    keywords:
      "4Cs diamond grading, diamond cut colour clarity carat, how to grade diamonds, diamond quality guide, JewelsReport 4Cs, diamond grading scale, 4Cs explained India",
    canonical: `${SITE_URL}/blog/4cs-diamond-grading-cut-colour-clarity-carat`,
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/blog/4cs-diamond-grading-cut-colour-clarity-carat#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: "The 4Cs of Diamond Grading", item: `${SITE_URL}/blog/4cs-diamond-grading-cut-colour-clarity-carat` },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${SITE_URL}/blog/4cs-diamond-grading-cut-colour-clarity-carat#article`,
        headline: "The 4Cs of Diamond Grading: Cut, Colour, Clarity & Carat Explained",
        url: `${SITE_URL}/blog/4cs-diamond-grading-cut-colour-clarity-carat`,
        datePublished: "2026-05-01",
        dateModified: "2026-06-04",
        articleSection: "Diamond Education",
        inLanguage: "en-IN",
        author: { "@type": "Person", name: "JewelsReport Editorial Team", url: `${SITE_URL}/about` },
        publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "JewelsReport", logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-touch-icon.png`, width: 180, height: 180 } },
        isPartOf: { "@id": `${SITE_URL}/blog#blog` },
        about: { "@id": `${SITE_URL}/#organization` },
        copyrightHolder: { "@id": `${SITE_URL}/#organization` },
        image: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/blog/4cs-diamond-grading-cut-colour-clarity-carat#webpage`,
        url: `${SITE_URL}/blog/4cs-diamond-grading-cut-colour-clarity-carat`,
        name: "The 4Cs of Diamond Grading: Cut, Colour, Clarity & Carat Explained",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
        datePublished: "2026-05-01",
        dateModified: "2026-06-04",
      },
    ],
  },
  {
    dir: "blog/lab-grown-diamonds-vs-natural-diamonds-buyers-guide-2026",
    title: "Lab Grown vs Natural Diamonds: Buyer's Guide 2026 | JewelsReport",
    description:
      "Everything you need to know about lab grown vs natural diamonds in 2026 — price difference, quality, certification, resale value and what your gemological certificate actually says.",
    keywords:
      "lab grown diamonds vs natural diamonds, lab diamond guide 2026, CVD diamond buyer guide, synthetic diamond comparison, lab grown diamond price India, lab grown vs mined diamond",
    canonical: `${SITE_URL}/blog/lab-grown-diamonds-vs-natural-diamonds-buyers-guide-2026`,
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/blog/lab-grown-diamonds-vs-natural-diamonds-buyers-guide-2026#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: "Lab Grown vs Natural Diamonds 2026", item: `${SITE_URL}/blog/lab-grown-diamonds-vs-natural-diamonds-buyers-guide-2026` },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${SITE_URL}/blog/lab-grown-diamonds-vs-natural-diamonds-buyers-guide-2026#article`,
        headline: "Lab Grown vs Natural Diamonds: Complete Buyer's Guide 2026",
        url: `${SITE_URL}/blog/lab-grown-diamonds-vs-natural-diamonds-buyers-guide-2026`,
        datePublished: "2026-05-05",
        dateModified: "2026-06-04",
        articleSection: "Lab Grown Diamonds",
        inLanguage: "en-IN",
        author: { "@type": "Person", name: "JewelsReport Editorial Team", url: `${SITE_URL}/about` },
        publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "JewelsReport", logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-touch-icon.png`, width: 180, height: 180 } },
        isPartOf: { "@id": `${SITE_URL}/blog#blog` },
        about: { "@id": `${SITE_URL}/#organization` },
        copyrightHolder: { "@id": `${SITE_URL}/#organization` },
        image: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/blog/lab-grown-diamonds-vs-natural-diamonds-buyers-guide-2026#webpage`,
        url: `${SITE_URL}/blog/lab-grown-diamonds-vs-natural-diamonds-buyers-guide-2026`,
        name: "Lab Grown vs Natural Diamonds: Complete Buyer's Guide 2026",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
        datePublished: "2026-05-05",
        dateModified: "2026-06-04",
      },
    ],
  },
  {
    dir: "blog/how-to-read-diamond-certificate-jewelsreport-guide",
    title: "How to Read a Diamond Certificate | JewelsReport",
    description:
      "Step-by-step guide to reading every field on a JewelsReport diamond certificate — from cut grade to fluorescence, measurements, clarity map and what each number really means.",
    keywords:
      "how to read diamond certificate, JewelsReport certificate guide, diamond grading report explained, certificate fields meaning, diamond report sections, read gem report India",
    canonical: `${SITE_URL}/blog/how-to-read-diamond-certificate-jewelsreport-guide`,
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/blog/how-to-read-diamond-certificate-jewelsreport-guide#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: "How to Read a Diamond Certificate", item: `${SITE_URL}/blog/how-to-read-diamond-certificate-jewelsreport-guide` },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${SITE_URL}/blog/how-to-read-diamond-certificate-jewelsreport-guide#article`,
        headline: "How to Read a Diamond Certificate: Understanding Your JewelsReport Card",
        url: `${SITE_URL}/blog/how-to-read-diamond-certificate-jewelsreport-guide`,
        datePublished: "2026-05-08",
        dateModified: "2026-06-04",
        articleSection: "Certification",
        inLanguage: "en-IN",
        author: { "@type": "Person", name: "JewelsReport Editorial Team", url: `${SITE_URL}/about` },
        publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "JewelsReport", logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-touch-icon.png`, width: 180, height: 180 } },
        isPartOf: { "@id": `${SITE_URL}/blog#blog` },
        about: { "@id": `${SITE_URL}/#organization` },
        copyrightHolder: { "@id": `${SITE_URL}/#organization` },
        image: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/blog/how-to-read-diamond-certificate-jewelsreport-guide#webpage`,
        url: `${SITE_URL}/blog/how-to-read-diamond-certificate-jewelsreport-guide`,
        name: "How to Read a Diamond Certificate: JewelsReport Complete Guide",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
        datePublished: "2026-05-08",
        dateModified: "2026-06-04",
      },
    ],
  },
  {
    dir: "blog/cvd-vs-hpht-lab-grown-diamonds-differences-explained",
    title: "CVD vs HPHT Lab Grown Diamonds Explained | JewelsReport",
    description:
      "CVD vs HPHT lab grown diamonds explained — how each is made, how gemologists tell them apart, what your certificate discloses, and which is better for buyers in India.",
    keywords:
      "CVD vs HPHT diamonds, CVD diamond differences, HPHT lab grown diamonds, lab grown diamond types, chemical vapour deposition diamond, high pressure diamond India",
    canonical: `${SITE_URL}/blog/cvd-vs-hpht-lab-grown-diamonds-differences-explained`,
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/blog/cvd-vs-hpht-lab-grown-diamonds-differences-explained#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: "CVD vs HPHT Diamonds", item: `${SITE_URL}/blog/cvd-vs-hpht-lab-grown-diamonds-differences-explained` },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${SITE_URL}/blog/cvd-vs-hpht-lab-grown-diamonds-differences-explained#article`,
        headline: "CVD vs HPHT Diamonds: Understanding How Lab Grown Diamonds Are Created",
        url: `${SITE_URL}/blog/cvd-vs-hpht-lab-grown-diamonds-differences-explained`,
        datePublished: "2026-05-11",
        dateModified: "2026-06-04",
        articleSection: "Lab Grown Diamonds",
        inLanguage: "en-IN",
        author: { "@type": "Person", name: "JewelsReport Editorial Team", url: `${SITE_URL}/about` },
        publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "JewelsReport", logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-touch-icon.png`, width: 180, height: 180 } },
        isPartOf: { "@id": `${SITE_URL}/blog#blog` },
        about: { "@id": `${SITE_URL}/#organization` },
        copyrightHolder: { "@id": `${SITE_URL}/#organization` },
        image: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/blog/cvd-vs-hpht-lab-grown-diamonds-differences-explained#webpage`,
        url: `${SITE_URL}/blog/cvd-vs-hpht-lab-grown-diamonds-differences-explained`,
        name: "CVD vs HPHT Lab Grown Diamonds: Key Differences Explained",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
        datePublished: "2026-05-11",
        dateModified: "2026-06-04",
      },
    ],
  },
  {
    dir: "blog/diamond-fluorescence-explained-effect-on-value-certificate",
    title: "Diamond Fluorescence Explained | JewelsReport",
    description:
      "What is diamond fluorescence? How blue fluorescence affects appearance and price, which fluorescence grades exist, and how JewelsReport grades and discloses fluorescence on the certificate.",
    keywords:
      "diamond fluorescence explained, blue fluorescence diamonds, fluorescence effect on value, diamond UV fluorescence, JewelsReport fluorescence grade, is fluorescence bad diamond India",
    canonical: `${SITE_URL}/blog/diamond-fluorescence-explained-effect-on-value-certificate`,
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/blog/diamond-fluorescence-explained-effect-on-value-certificate#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: "Diamond Fluorescence Explained", item: `${SITE_URL}/blog/diamond-fluorescence-explained-effect-on-value-certificate` },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${SITE_URL}/blog/diamond-fluorescence-explained-effect-on-value-certificate#article`,
        headline: "Diamond Fluorescence: What It Is, How It Affects Value and What Your Certificate Says",
        url: `${SITE_URL}/blog/diamond-fluorescence-explained-effect-on-value-certificate`,
        datePublished: "2026-05-14",
        dateModified: "2026-06-04",
        articleSection: "Diamond Education",
        inLanguage: "en-IN",
        author: { "@type": "Person", name: "JewelsReport Editorial Team", url: `${SITE_URL}/about` },
        publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "JewelsReport", logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-touch-icon.png`, width: 180, height: 180 } },
        isPartOf: { "@id": `${SITE_URL}/blog#blog` },
        about: { "@id": `${SITE_URL}/#organization` },
        copyrightHolder: { "@id": `${SITE_URL}/#organization` },
        image: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/blog/diamond-fluorescence-explained-effect-on-value-certificate#webpage`,
        url: `${SITE_URL}/blog/diamond-fluorescence-explained-effect-on-value-certificate`,
        name: "Diamond Fluorescence Explained: Effect on Value & Certificate",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
        datePublished: "2026-05-14",
        dateModified: "2026-06-04",
      },
    ],
  },
  {
    dir: "blog/why-diamond-gemological-certificate-important-before-buying",
    title: "Why a Diamond Certificate Matters | JewelsReport",
    description:
      "Why every diamond buyer needs an independent gemological certificate. What certified really means, how to spot a fake report, and what protection a JewelsReport certificate provides.",
    keywords:
      "why diamond certificate important, gemological certificate benefits, independent diamond grading, JewelsReport certification, certified diamond buying India, diamond certificate protection",
    canonical: `${SITE_URL}/blog/why-diamond-gemological-certificate-important-before-buying`,
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/blog/why-diamond-gemological-certificate-important-before-buying#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: "Why a Diamond Certificate Is Essential", item: `${SITE_URL}/blog/why-diamond-gemological-certificate-important-before-buying` },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${SITE_URL}/blog/why-diamond-gemological-certificate-important-before-buying#article`,
        headline: "Why Every Diamond Needs a Gemological Certificate Before You Buy",
        url: `${SITE_URL}/blog/why-diamond-gemological-certificate-important-before-buying`,
        datePublished: "2026-05-17",
        dateModified: "2026-06-04",
        articleSection: "Certification",
        inLanguage: "en-IN",
        author: { "@type": "Person", name: "JewelsReport Editorial Team", url: `${SITE_URL}/about` },
        publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "JewelsReport", logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-touch-icon.png`, width: 180, height: 180 } },
        isPartOf: { "@id": `${SITE_URL}/blog#blog` },
        about: { "@id": `${SITE_URL}/#organization` },
        copyrightHolder: { "@id": `${SITE_URL}/#organization` },
        image: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/blog/why-diamond-gemological-certificate-important-before-buying#webpage`,
        url: `${SITE_URL}/blog/why-diamond-gemological-certificate-important-before-buying`,
        name: "Why a Diamond Certificate Is Essential Before You Buy",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
        datePublished: "2026-05-17",
        dateModified: "2026-06-04",
      },
    ],
  },
  {
    dir: "blog/ruby-emerald-sapphire-coloured-gemstone-certification-grading",
    title: "Ruby, Emerald & Sapphire Certification Guide | JewelsReport",
    description:
      "How JewelsReport certifies ruby, emerald and sapphire — treatment detection, origin determination, colour grading and what the coloured gemstone report shows buyers and dealers.",
    keywords:
      "ruby certification India, emerald grading, sapphire certification, coloured gemstone report, heat treatment detection, gemstone origin determination, JewelsReport gemstone cert",
    canonical: `${SITE_URL}/blog/ruby-emerald-sapphire-coloured-gemstone-certification-grading`,
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/blog/ruby-emerald-sapphire-coloured-gemstone-certification-grading#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: "Coloured Gemstone Certification", item: `${SITE_URL}/blog/ruby-emerald-sapphire-coloured-gemstone-certification-grading` },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${SITE_URL}/blog/ruby-emerald-sapphire-coloured-gemstone-certification-grading#article`,
        headline: "Ruby, Emerald and Sapphire Certification: How Coloured Gemstones Are Graded",
        url: `${SITE_URL}/blog/ruby-emerald-sapphire-coloured-gemstone-certification-grading`,
        datePublished: "2026-05-19",
        dateModified: "2026-06-04",
        articleSection: "Gemstones",
        inLanguage: "en-IN",
        author: { "@type": "Person", name: "JewelsReport Editorial Team", url: `${SITE_URL}/about` },
        publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "JewelsReport", logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-touch-icon.png`, width: 180, height: 180 } },
        isPartOf: { "@id": `${SITE_URL}/blog#blog` },
        about: { "@id": `${SITE_URL}/#organization` },
        copyrightHolder: { "@id": `${SITE_URL}/#organization` },
        image: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/blog/ruby-emerald-sapphire-coloured-gemstone-certification-grading#webpage`,
        url: `${SITE_URL}/blog/ruby-emerald-sapphire-coloured-gemstone-certification-grading`,
        name: "Ruby, Emerald & Sapphire Certification: Coloured Gemstone Grading Guide",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
        datePublished: "2026-05-19",
        dateModified: "2026-06-04",
      },
    ],
  },
  {
    dir: "blog/lab-grown-diamond-jewellery-indian-weddings-bridal-guide",
    title: "Lab Grown Diamond Jewellery for Indian Weddings | JewelsReport",
    description:
      "Why Indian brides are choosing certified lab grown diamond jewellery in 2026. Bridal set comparisons, budget guide, and why the certificate matters for wedding purchases.",
    keywords:
      "lab grown diamond India wedding, bridal diamond jewellery certified, lab diamond engagement ring India, Indian wedding lab grown diamond, certified bridal jewellery Surat",
    canonical: `${SITE_URL}/blog/lab-grown-diamond-jewellery-indian-weddings-bridal-guide`,
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/blog/lab-grown-diamond-jewellery-indian-weddings-bridal-guide#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: "Lab Grown Diamond Bridal Guide India", item: `${SITE_URL}/blog/lab-grown-diamond-jewellery-indian-weddings-bridal-guide` },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${SITE_URL}/blog/lab-grown-diamond-jewellery-indian-weddings-bridal-guide#article`,
        headline: "Lab Grown Diamond Jewellery for Indian Weddings: A Complete Bridal Guide",
        url: `${SITE_URL}/blog/lab-grown-diamond-jewellery-indian-weddings-bridal-guide`,
        datePublished: "2026-05-21",
        dateModified: "2026-06-04",
        articleSection: "Bridal",
        inLanguage: "en-IN",
        author: { "@type": "Person", name: "JewelsReport Editorial Team", url: `${SITE_URL}/about` },
        publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "JewelsReport", logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-touch-icon.png`, width: 180, height: 180 } },
        isPartOf: { "@id": `${SITE_URL}/blog#blog` },
        about: { "@id": `${SITE_URL}/#organization` },
        copyrightHolder: { "@id": `${SITE_URL}/#organization` },
        image: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/blog/lab-grown-diamond-jewellery-indian-weddings-bridal-guide#webpage`,
        url: `${SITE_URL}/blog/lab-grown-diamond-jewellery-indian-weddings-bridal-guide`,
        name: "Lab Grown Diamond Jewellery for Indian Weddings: Complete Bridal Guide",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
        datePublished: "2026-05-21",
        dateModified: "2026-06-04",
      },
    ],
  },
  {
    dir: "blog/diamond-clarity-grades-explained-fl-if-vvs-vs-si-included",
    title: "Diamond Clarity Grades: FL, IF, VVS, VS, SI Explained | JewelsReport",
    description:
      "Complete diamond clarity grade scale from Flawless to Included — what each grade means, how inclusions affect beauty and value, and how to choose the best clarity for your budget.",
    keywords:
      "diamond clarity grades, FL IF VVS VS SI clarity scale, eye-clean diamond clarity, best clarity grade value, diamond clarity explained India, flawless diamond guide, VVS diamond",
    canonical: `${SITE_URL}/blog/diamond-clarity-grades-explained-fl-if-vvs-vs-si-included`,
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/blog/diamond-clarity-grades-explained-fl-if-vvs-vs-si-included#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: "Diamond Clarity Grades Explained", item: `${SITE_URL}/blog/diamond-clarity-grades-explained-fl-if-vvs-vs-si-included` },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${SITE_URL}/blog/diamond-clarity-grades-explained-fl-if-vvs-vs-si-included#article`,
        headline: "Diamond Clarity Grades Explained: From Flawless to Included — A Deep Dive",
        url: `${SITE_URL}/blog/diamond-clarity-grades-explained-fl-if-vvs-vs-si-included`,
        datePublished: "2026-05-23",
        dateModified: "2026-06-04",
        articleSection: "Diamond Education",
        inLanguage: "en-IN",
        author: { "@type": "Person", name: "JewelsReport Editorial Team", url: `${SITE_URL}/about` },
        publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "JewelsReport", logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-touch-icon.png`, width: 180, height: 180 } },
        isPartOf: { "@id": `${SITE_URL}/blog#blog` },
        about: { "@id": `${SITE_URL}/#organization` },
        copyrightHolder: { "@id": `${SITE_URL}/#organization` },
        image: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/blog/diamond-clarity-grades-explained-fl-if-vvs-vs-si-included#webpage`,
        url: `${SITE_URL}/blog/diamond-clarity-grades-explained-fl-if-vvs-vs-si-included`,
        name: "Diamond Clarity Grades Explained: FL, IF, VVS, VS, SI, Included",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
        datePublished: "2026-05-23",
        dateModified: "2026-06-04",
      },
    ],
  },
  {
    dir: "blog/how-to-verify-diamond-certificate-online-step-by-step",
    title: "How to Verify a Diamond Certificate Online | JewelsReport",
    description:
      "Complete step-by-step guide to verifying a JewelsReport certificate online. Scan the QR code or enter the report number at jewelsreport.com/verify — free, instant, no login required.",
    keywords:
      "verify diamond certificate online, how to check diamond certificate, JewelsReport verify certificate, QR code diamond verification, certificate authentication online India",
    canonical: `${SITE_URL}/blog/how-to-verify-diamond-certificate-online-step-by-step`,
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/blog/how-to-verify-diamond-certificate-online-step-by-step#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: "How to Verify a Diamond Certificate", item: `${SITE_URL}/blog/how-to-verify-diamond-certificate-online-step-by-step` },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${SITE_URL}/blog/how-to-verify-diamond-certificate-online-step-by-step#article`,
        headline: "How to Verify a Diamond Certificate Online: A Complete Step-by-Step Guide",
        url: `${SITE_URL}/blog/how-to-verify-diamond-certificate-online-step-by-step`,
        datePublished: "2026-05-26",
        dateModified: "2026-06-04",
        articleSection: "Certification",
        inLanguage: "en-IN",
        author: { "@type": "Person", name: "JewelsReport Editorial Team", url: `${SITE_URL}/about` },
        publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "JewelsReport", logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-touch-icon.png`, width: 180, height: 180 } },
        isPartOf: { "@id": `${SITE_URL}/blog#blog` },
        about: { "@id": `${SITE_URL}/#organization` },
        copyrightHolder: { "@id": `${SITE_URL}/#organization` },
        image: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/blog/how-to-verify-diamond-certificate-online-step-by-step#webpage`,
        url: `${SITE_URL}/blog/how-to-verify-diamond-certificate-online-step-by-step`,
        name: "How to Verify a Diamond Certificate Online: Step-by-Step Guide",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
        datePublished: "2026-05-26",
        dateModified: "2026-06-04",
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
        html = html.replace(/(<meta name="description" content=")[^"]*(")/,    `$1${esc(route.description)}$2`);
        html = html.replace(/(<meta name="keywords" content=")[^"]*(")/,        `$1${esc(route.keywords)}$2`);
        html = html.replace(/(<link rel="canonical" href=")[^"]*(")/,           `$1${route.canonical}$2`);
        html = html.replace(/(<link rel="alternate" hreflang="en" href=")[^"]*(")/,         `$1${route.canonical}$2`);
        html = html.replace(/(<link rel="alternate" hreflang="en-IN" href=")[^"]*(")/,      `$1${route.canonical}$2`);
        html = html.replace(/(<link rel="alternate" hreflang="x-default" href=")[^"]*(")/,  `$1${route.canonical}$2`);
        html = html.replace(/(<meta property="og:title" content=")[^"]*(")/,        `$1${esc(route.title)}$2`);
        html = html.replace(/(<meta property="og:description" content=")[^"]*(")/,  `$1${esc(route.description)}$2`);
        html = html.replace(/(<meta property="og:url" content=")[^"]*(")/,          `$1${route.canonical}$2`);
        html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/,       `$1${esc(route.title)}$2`);
        html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/,`$1${esc(route.description)}$2`);
        if (route.ogType) {
          html = html.replace(/(<meta property="og:type" content=")[^"]*(")/,  `$1${route.ogType}$2`);
        }

        const jsonLdBlocks = route.jsonLd
          .map((block) => `    <script type="application/ld+json">\n    ${JSON.stringify(block, null, 2)}\n    </script>`)
          .join("\n");
        html = html.replace("</head>", `${jsonLdBlocks}\n  </head>`);

        const routeDir = path.join(distDir, route.dir);
        fs.mkdirSync(routeDir, { recursive: true });
        fs.writeFileSync(path.join(routeDir, "index.html"), html, "utf-8");
      }

      console.log(`✓ SEO prerender: generated static HTML for ${ROUTES.length} routes (${ROUTES.filter(r => r.ogType === "article").length} blog posts)`);
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
