import { useEffect } from "react";

export const SITE_URL = "https://www.jewelsreport.com";
export const SITE_NAME = "JewelsReport";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

type SEOProps = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  image?: string;
  type?: "website" | "article" | "product";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const MANAGED_ATTR = "data-seo-managed";

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(MANAGED_ATTR, "true");
    document.head.appendChild(el);
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    el.setAttribute(MANAGED_ATTR, "true");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function clearJsonLd() {
  document.head
    .querySelectorAll(`script[type="application/ld+json"][${MANAGED_ATTR}]`)
    .forEach((n) => n.remove());
}

function injectJsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
  const blocks = Array.isArray(data) ? data : [data];
  for (const block of blocks) {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute(MANAGED_ATTR, "true");
    s.text = JSON.stringify(block);
    document.head.appendChild(s);
  }
}

export function useSEO({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;

    upsertMeta('meta[name="description"]', { name: "description", content: description });
    if (keywords) upsertMeta('meta[name="keywords"]', { name: "keywords", content: keywords });

    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });

    upsertLink("canonical", url);

    clearJsonLd();
    if (jsonLd) injectJsonLd(jsonLd);
  }, [title, description, path, keywords, image, type, JSON.stringify(jsonLd)]);
}

/* ─── Schema helpers ─────────────────────────────────────────── */

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE_URL}${it.path}`,
  })),
});

export const localBusiness = () => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}/#localbusiness`,
  name: "JewelsReport Gemological Laboratory",
  alternateName: "JewelsReport",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/favicon.ico`,
  image: DEFAULT_OG_IMAGE,
  description:
    "Independent gemological certification laboratory issuing tamper-proof PVC certificates with QR verification for diamonds, gemstones and jewellery.",
  telephone: "+91-9967381180",
  email: "reports@jewelsreport.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "202, 2/F, Veer Ashish Building, Surat Diamond Market, Mahidharpura",
    addressLocality: "Surat",
    addressRegion: "Gujarat",
    postalCode: "395003",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 21.1939,
    longitude: 72.8314,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
  ],
  priceRange: "$$",
  currenciesAccepted: "INR, USD",
  paymentAccepted: "Cash, Bank Transfer, UPI",
  areaServed: "Worldwide",
  hasMap: "https://maps.google.com/?q=Surat+Diamond+Market+Mahidharpura+Surat+Gujarat",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "1247",
    reviewCount: "312",
  },
  sameAs: [
    "https://www.jewelsreport.com",
  ],
});

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "JewelsReport",
  alternateName: "JewelsReport Gemological Laboratory",
  url: `${SITE_URL}/`,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/favicon.ico`,
    width: 512,
    height: 512,
  },
  description:
    "Independent gemological laboratory founded in 2014, issuing tamper-proof PVC certificates for natural & lab-grown diamonds, coloured gemstones and fine jewellery.",
  foundingDate: "2014",
  foundingLocation: {
    "@type": "Place",
    name: "Surat, Gujarat, India",
  },
  numberOfEmployees: { "@type": "QuantitativeValue", value: 50 },
  areaServed: "Worldwide",
  telephone: "+91-9967381180",
  email: "reports@jewelsreport.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "202, 2/F, Veer Ashish Building, Surat Diamond Market, Mahidharpura",
    addressLocality: "Surat",
    addressRegion: "Gujarat",
    postalCode: "395003",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Diamond grading",
    "Lab grown diamond certification",
    "Gemstone identification",
    "Jewellery appraisal",
    "4Cs grading",
    "QR certificate verification",
    "CVD diamond",
    "HPHT diamond",
    "Coloured gemstone treatment detection",
  ],
  hasCredential: "ISO/IEC 17025 aligned protocols",
  slogan: "The seal of brilliance you can trust.",
});

export const serviceItemList = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "JewelsReport Certification Services",
  description: "Gemological laboratory report types issued by JewelsReport",
  numberOfItems: 4,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Lab Grown Diamond Report",
        description:
          "Full 4Cs grading for CVD and HPHT lab-grown diamonds with complete origin disclosure, including cut, colour, clarity, carat weight, fluorescence, polish and symmetry grades.",
        provider: { "@id": `${SITE_URL}/#organization` },
        serviceType: "Lab Grown Diamond Certification",
        areaServed: "Worldwide",
        url: `${SITE_URL}/`,
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Jewellery Report",
        description:
          "Comprehensive appraisal of finished jewellery pieces including metal type, stone weight, setting details and manufacturing quality.",
        provider: { "@id": `${SITE_URL}/#organization` },
        serviceType: "Jewellery Appraisal",
        areaServed: "Worldwide",
        url: `${SITE_URL}/`,
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "Gemstone Report",
        description:
          "Scientific identification and authenticity verification for sapphire, ruby, emerald and all coloured stones with treatment disclosure.",
        provider: { "@id": `${SITE_URL}/#organization` },
        serviceType: "Gemstone Certification",
        areaServed: "Worldwide",
        url: `${SITE_URL}/`,
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Service",
        name: "Lab Grown Jewellery Report",
        description:
          "Grading of finished jewellery with mounted lab-grown stones — full transparency on stone origin and piece composition.",
        provider: { "@id": `${SITE_URL}/#organization` },
        serviceType: "Lab Grown Jewellery Certification",
        areaServed: "Worldwide",
        url: `${SITE_URL}/`,
      },
    },
  ],
});

export const reviewsSchema = (reviews: { name: string; role: string; text: string; rating?: number }[]) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: "JewelsReport Gemological Certificate",
  description:
    "Tamper-proof PVC gemological certificate with holographic foil and QR-based instant verification, issued by JewelsReport laboratory.",
  brand: { "@type": "Brand", name: "JewelsReport" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "1247",
  },
  review: reviews.map((r) => ({
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating ?? 5,
      bestRating: 5,
    },
    author: {
      "@type": "Person",
      name: r.name,
      jobTitle: r.role,
    },
    reviewBody: r.text,
    publisher: { "@type": "Organization", name: "JewelsReport" },
  })),
});

export const webAppSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${SITE_URL}/verify#app`,
  name: "JewelsReport Certificate Verification",
  description:
    "Free online tool to instantly verify any JewelsReport gemological certificate by entering the report number or scanning the QR code on the PVC card.",
  url: `${SITE_URL}/verify`,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  provider: { "@id": `${SITE_URL}/#organization` },
  featureList: [
    "Instant certificate verification by report number",
    "QR code scan verification",
    "View full grading details",
    "Download PVC card as PDF",
  ],
});

export const howToVerify = () => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Verify a JewelsReport Certificate",
  description:
    "Step-by-step guide to verifying the authenticity of a JewelsReport gemological certificate online.",
  totalTime: "PT1M",
  tool: [{ "@type": "HowToTool", name: "Report number or QR code from the certificate card" }],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Find your report number",
      text: "Locate the unique report number printed on the front of your JewelsReport PVC certificate card.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Visit the verify page",
      text: "Go to https://www.jewelsreport.com/verify or scan the QR code on the card with any smartphone camera.",
      url: `${SITE_URL}/verify`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Enter the report number",
      text: "Type the report number into the search field and press Verify.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "View certificate details",
      text: "The full certificate details appear instantly — grading results, item description, issue date and the lab-verified record.",
    },
  ],
});

export const webPage = (
  path: string,
  name: string,
  description: string,
  extra?: Record<string, unknown>
) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}${path}#webpage`,
  url: `${SITE_URL}${path}`,
  name,
  description,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
  ...(extra ?? {}),
});

export const speakable = (cssSelectors: string[]) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: cssSelectors,
  },
  url: SITE_URL,
});
