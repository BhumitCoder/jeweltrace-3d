# JewelsReport — Complete SEO Structure Guide

> Every SEO-relevant file, what it does, why it exists, and how it connects to everything else.
> Read this top-to-bottom once. After that use it as a lookup reference.

---

## 1. File Map — What Does What

```
jewelsreport/
│
├── index.html                    ← STATIC SEO BASE (server-sends this first)
│
├── src/
│   ├── lib/
│   │   └── seo.ts                ← SEO BRAIN (all logic + schema helpers)
│   │
│   └── routes/
│       ├── index.tsx             ← / homepage
│       ├── about.tsx             ← /about
│       ├── verify.tsx            ← /verify
│       ├── contact.tsx           ← /contact
│       ├── blog.index.tsx        ← /blog (listing)
│       ├── blog.$slug.tsx        ← /blog/[article-slug]
│       ├── privacy-policy.tsx    ← /privacy-policy
│       └── terms-of-service.tsx  ← /terms-of-service
│
└── public/
    ├── robots.txt                ← Crawler rules
    ├── sitemap-index.xml         ← Master sitemap (submit THIS to Google)
    ├── sitemap.xml               ← Page URLs + hreflang + images
    ├── sitemap-images.xml        ← All images (for Google Image Search)
    ├── sitemap-news.xml          ← Blog posts (for Google News)
    ├── manifest.json             ← PWA / mobile install metadata
    ├── og-image.jpg              ← Default social share image (1200×630)
    ├── apple-touch-icon.png      ← Publisher logo in Article schema (180×180)
    ├── llms.txt                  ← AI crawler permission + content summary
    └── ai.txt                    ← AI content declaration
```

---

## 2. The Two-Layer System

This site uses **two layers** of SEO that work together:

```
LAYER 1 — index.html (static, always present)
  ↓
  Sends base meta tags to the browser immediately.
  Google sees these even before React loads.
  Contains: title, description, OG, Twitter, JSON-LD for
  Organization, LocalBusiness, WebSite, SiteNavigationElement, FAQPage.

LAYER 2 — useSEO() in each route (dynamic, React)
  ↓
  Overwrites Layer 1 tags with page-specific values.
  Each page calls useSEO() which upserts the same <meta> tags.
  Also injects page-specific JSON-LD (schemas).
```

**Key rule:** Layer 2 always wins. When `/about` loads, useSEO() replaces
the homepage title/description/OG with about-page values. When you navigate
back to `/`, homepage values are restored.

---

## 3. `index.html` — Line by Line

| Lines | Block | What it is | Why it matters |
|-------|-------|-----------|----------------|
| 8 | `<title>` | Homepage title tag | Google uses this as the clickable blue link in results |
| 9 | `meta description` | Homepage meta description | Shown as the grey snippet under the title in Google |
| 10 | `meta keywords` | ~450 keyword terms | Helps crawlers understand topical coverage (not a ranking factor alone, but signals relevance) |
| 13 | `meta robots` | `index, follow, max-image-preview:large` | Tells Google to index the page AND show large preview images in results |
| 14 | `meta googlebot` | Same as robots but Googlebot-specific | Overrides the generic robots tag for Google only |
| 36–39 | `geo.*` meta tags | GPS coordinates + region code | Local SEO — tells Google this is an Indian business in Gujarat |
| 42–45 | `canonical` + `hreflang` | Self-referencing canonical URL | Prevents duplicate content issues; hreflang signals India (en-IN) audience |
| 47–52 | `preconnect` / `dns-prefetch` | Network hints for fonts | Reduces font load latency (improves Core Web Vitals / LCP) |
| 54–70 | Open Graph block | Facebook / WhatsApp / LinkedIn previews | When anyone shares the URL, these control what card appears |
| 72–75 | Twitter Card block | X (Twitter) preview card | Controls how the URL looks when shared on X |
| 77–92 | AI bot meta tags | GPTBot, ClaudeBot, etc. | Explicitly permits AI crawlers to index content for answer attribution |
| 107–519 | JSON-LD blocks | Structured data for Google | See Section 4 below |

---

## 4. JSON-LD Schemas in `index.html` (Static)

These are **always in the HTML** — Google reads them on every page load.

### 4a. SiteNavigationElement (lines ~107–165)

```json
{
  "@type": "ItemList",
  "name": "JewelsReport Primary Navigation",
  "itemListElement": [
    { "position": 1, "name": "Home",    "item": "https://www.jewelsreport.com/" },
    { "position": 2, "name": "Verify",  "item": "...verify" },
    { "position": 3, "name": "About",   "item": "...about" },
    { "position": 4, "name": "Blog",    "item": "...blog" },
    { "position": 5, "name": "Contact", "item": "...contact" }
  ]
}
```

**Purpose:** Tells Google the structure of the navigation menu.
Google uses this to generate **Sitelinks** — the indented sub-links
that appear under your main result in search.

---

### 4b. WebSite with Sitelinks Searchbox (lines ~167–210)

```json
{
  "@type": "WebSite",
  "@id": "https://www.jewelsreport.com/#website",
  "name": "JewelsReport",
  "url": "https://www.jewelsreport.com/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.jewelsreport.com/verify?id={search_term_string}"
  }
}
```

**Purpose:** The `SearchAction` makes your site eligible for a
**Sitelinks Searchbox** — a search box shown directly in Google results
that sends the query to your verify page.

---

### 4c. Organization (lines ~212–295)

```json
{
  "@type": "Organization",
  "@id": "https://www.jewelsreport.com/#organization",
  "name": "JewelsReport",
  "foundingDate": "2014",
  "contactPoint": [...],
  "knowsAbout": ["Diamond grading", "Gemstone identification", ...]
}
```

**Purpose:** The master identity card for the business. Every other schema
on the site references this via `"@id": ".../#organization"`.
Google uses it for the **Knowledge Panel** (the box on the right side
of search results showing business info).

---

### 4d. LocalBusiness (lines ~297–380)

```json
{
  "@type": ["LocalBusiness", "ProfessionalService", "Store"],
  "@id": "https://www.jewelsreport.com/#localbusiness",
  "address": { "streetAddress": "202, 2/F, Veer Ashish Building..." },
  "geo": { "latitude": 21.1939, "longitude": 72.8314 },
  "openingHoursSpecification": [...],
  "aggregateRating": { "ratingValue": "4.9", "ratingCount": "1247" }
}
```

**Purpose:** Activates **Google Maps** visibility and the **Local Pack**
(the 3-listing box that appears for "diamond lab near me" searches).
The `aggregateRating` can show star ratings in search results.

---

### 4e. FAQPage (lines ~382–500)

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a JewelsReport certificate?",
      "acceptedAnswer": { "@type": "Answer", "text": "..." }
    }
  ]
}
```

**Purpose:** Activates the **FAQ rich result** — expandable Q&A accordion
shown directly in Google results, taking up 3–5× more screen space than
a normal result.

---

## 5. `src/lib/seo.ts` — The SEO Brain

This file has two parts:

### Part A: `useSEO()` hook (lines 82–155)

Called at the top of every page component. It does 4 things:

```
1. Sets document.title          → the <title> tag
2. Upserts <meta> tags          → overwrites index.html base values
3. Manages article OG tags      → adds article:published_time etc. for blog posts
4. Injects page-specific JSON-LD → removes old, adds new structured data
```

**useSEO() props reference:**

| Prop | Type | Required | What it controls |
|------|------|----------|-----------------|
| `title` | string | ✅ | `<title>` + og:title + twitter:title |
| `description` | string | ✅ | meta description + og:description + twitter:description |
| `path` | string | ✅ | canonical URL + og:url |
| `keywords` | string | — | meta keywords |
| `image` | string | — | og:image + og:image:secure_url + twitter:image (defaults to og-image.jpg) |
| `imageAlt` | string | — | og:image:alt + twitter:image:alt |
| `type` | `website` \| `article` | — | og:type (defaults to "website") |
| `article.publishedTime` | string | — | article:published_time OG tag |
| `article.modifiedTime` | string | — | article:modified_time OG tag |
| `article.author` | string | — | Author name |
| `article.authorUrl` | string | — | article:author OG tag URL |
| `article.section` | string | — | article:section OG tag |
| `article.tags` | string[] | — | article:tag OG tags (up to 6) |
| `jsonLd` | object \| object[] | — | JSON-LD structured data injected into `<head>` |

### Part B: Schema helper functions

These are factory functions that return ready-to-use JSON-LD objects.
Import them in any route and pass to `useSEO({ jsonLd: [...] })`.

| Function | Schema type | Used on page |
|----------|-------------|--------------|
| `breadcrumb(items)` | BreadcrumbList | Every page except homepage |
| `localBusiness()` | LocalBusiness + ProfessionalService | contact.tsx |
| `organizationSchema()` | Organization | about.tsx |
| `serviceItemList()` | ItemList of Service | index.tsx |
| `reviewsSchema(reviews)` | Product + AggregateRating + Review | index.tsx |
| `webAppSchema()` | WebApplication | verify.tsx |
| `howToVerify()` | HowTo | verify.tsx |
| `webPage(path, name, desc)` | WebPage | all pages |
| `speakable(selectors)` | SpeakableSpecification | available but optional |

---

## 6. Route-by-Route Schema Map

| Page | URL | Schemas injected by useSEO |
|------|-----|---------------------------|
| Homepage | `/` | FAQPage · ItemList (Services) · Product+AggregateRating (Reviews) · WebPage |
| Verify | `/verify` | BreadcrumbList · WebApplication · HowTo · WebPage |
| About | `/about` | BreadcrumbList · Organization · ItemList (Team) · ItemList (Instruments) · WebPage |
| Contact | `/contact` | BreadcrumbList · LocalBusiness · ContactPage (WebPage) |
| Blog Index | `/blog` | BreadcrumbList · Blog · CollectionPage · WebPage |
| Blog Post | `/blog/[slug]` | BreadcrumbList · BlogPosting · WebPage |
| Privacy Policy | `/privacy-policy` | BreadcrumbList · WebPage |
| Terms of Service | `/terms-of-service` | BreadcrumbList · WebPage |

---

## 7. JSON-LD Entity Cross-Linking (How Everything Connects)

All schemas on the site are **linked by @id references**. This tells Google
they are all describing the same real-world entity.

```
index.html:
  /#organization     ←─────────────────────────────────┐
  /#localbusiness    ←───────────────────────────────┐  │
  /#website          ←─────────────────────────────┐ │  │
                                                   │ │  │
Each page WebPage schema:                          │ │  │
  isPartOf: { "@id": ".../#website" }  ────────────┘ │  │
  publisher: { "@id": ".../#organization" }  ─────────┼──┘
  about: { "@id": ".../#organization" }  ─────────────┘

blog.$slug.tsx BlogPosting schema:
  publisher.@id: ".../#organization"
  author.url: ".../about"
  isPartOf: { "@id": ".../blog#blog" }
  copyrightHolder: { "@id": ".../#organization" }

contact.tsx LocalBusiness (dynamic):
  Same data as static in index.html but injected on /contact specifically
  for the ContactPage context
```

Google's Rich Results Test reads all these @id links and builds a
**knowledge graph** of your site. The more connected, the better.

---

## 8. Open Graph — Complete Tag Reference

These tags control how the URL looks when shared on WhatsApp, Facebook,
LinkedIn, Slack, iMessage, etc.

| Tag | Where set | Example value |
|-----|-----------|---------------|
| `og:type` | useSEO() | `website` or `article` |
| `og:title` | useSEO() | Page title |
| `og:description` | useSEO() | Page description |
| `og:url` | useSEO() | `https://www.jewelsreport.com/verify` |
| `og:locale` | useSEO() | `en_IN` |
| `og:locale:alternate` | index.html | `en_US` |
| `og:image` | useSEO() | `https://www.jewelsreport.com/og-image.jpg` |
| `og:image:secure_url` | useSEO() | Same as og:image (required by some crawlers) |
| `og:image:width` | useSEO() | `1200` |
| `og:image:height` | useSEO() | `630` |
| `og:image:type` | useSEO() | `image/jpeg` |
| `og:image:alt` | useSEO() | Dynamic per page |
| `og:site_name` | useSEO() | `JewelsReport` |
| `article:published_time` | useSEO() | ISO date — blog posts only |
| `article:modified_time` | useSEO() | ISO date — blog posts only |
| `article:author` | useSEO() | `https://www.jewelsreport.com/about` |
| `article:section` | useSEO() | `Diamond Education` etc. |
| `article:tag` | useSEO() | Up to 6 keyword tags |

---

## 9. Sitemap Files

| File | Submit to Google? | What's in it |
|------|-----------------|--------------|
| `sitemap-index.xml` | ✅ YES — submit this one | Points to the 3 child sitemaps |
| `sitemap.xml` | No (auto-found via index) | All 8 public pages + hreflang + image per page |
| `sitemap-images.xml` | No (auto-found via index) | All images (og-image, blog covers) for Google Image Search |
| `sitemap-news.xml` | No (auto-found via index) | All 10 blog posts for Google News indexing |

**How to submit:** Google Search Console → Sitemaps → Add:
```
https://www.jewelsreport.com/sitemap-index.xml
```

**Sitemap URL fields explained:**

```xml
<url>
  <loc>https://www.jewelsreport.com/verify</loc>   ← The page URL
  <lastmod>2026-06-04</lastmod>                    ← When page last changed
  <changefreq>weekly</changefreq>                  ← Hint (Google may ignore)
  <priority>0.95</priority>                        ← 0.0–1.0, relative importance
  <xhtml:link hreflang="en-IN" .../>              ← India audience signal
  <image:image>...</image:image>                  ← Image Google can show
</url>
```

---

## 10. `robots.txt` — Crawler Rules

```
User-agent: *         → applies to ALL crawlers
Allow: /              → allow everything
Disallow: /admin      → block the admin panel

User-agent: Googlebot → Google-specific overrides
Allow: /
Disallow: /admin
(no Crawl-delay — Google ignores it; removed)

User-agent: Googlebot-News
Allow: /blog          → Google News crawler gets blog access

User-agent: GPTBot, ClaudeBot, PerplexityBot, ...
Allow: /              → all AI crawlers explicitly allowed
```

---

## 11. `manifest.json` — PWA Metadata

Used by browsers for "Add to Home Screen" on mobile. Also read by
Google for app-like search features.

| Field | Value | Why |
|-------|-------|-----|
| `name` | JewelsReport — Gemological Certification Lab | Full app name |
| `short_name` | JewelsReport | Icon label on home screen |
| `lang` | `en-IN` | Correct locale for India |
| `dir` | `ltr` | Left-to-right text direction |
| `display` | `standalone` | Runs without browser chrome |
| `theme_color` | `#B8922A` | Gold — matches brand, used by Chrome |
| `start_url` | `/` | Where app opens from home screen |
| `shortcuts` | Verify, Contact | Jump shortcuts on long-press |
| `screenshots` | og-image.jpg | Shown in app install prompt |

---

## 12. Meta Tags Quick Reference

| Tag | Format | Purpose |
|-----|--------|---------|
| `<meta name="robots">` | `index, follow, max-image-preview:large` | Core indexing instruction |
| `<meta name="googlebot">` | Same as robots | Google-specific override |
| `<meta name="geo.region">` | `IN-GJ` | Gujarat, India — Local SEO |
| `<meta name="geo.position">` | `21.1939;72.8314` | GPS coordinates |
| `<meta name="theme-color">` | `#B8922A` | Chrome address bar colour |
| `<meta name="viewport">` | `width=device-width, initial-scale=1, viewport-fit=cover` | Mobile responsiveness |
| `<link rel="canonical">` | Full absolute URL | Prevents duplicate content |
| `<link rel="alternate" hreflang="en-IN">` | Full URL | Tells Google this is for India English audience |
| `<link rel="preconnect">` | Google Fonts domains | Speeds up font loading (better LCP) |

---

## 13. Blog Post SEO Checklist

Each blog post at `/blog/[slug]` automatically gets all of these:

### Meta tags (via `useSEO()`)
- [x] `<title>` — post title + `| JewelsReport Journal`
- [x] `meta description` — post excerpt or first 155 chars
- [x] `meta keywords` — post-specific keyword string from `KEYWORDS` map
- [x] `og:type` = `article`
- [x] `og:image` — post cover image (Unsplash URL)
- [x] `og:image:alt` — `[post title] — JewelsReport Journal`
- [x] `og:image:secure_url` — same as og:image
- [x] `article:published_time` — post.publishedAt ISO date
- [x] `article:modified_time` — same as published (update when content changes)
- [x] `article:author` — `https://www.jewelsreport.com/about`
- [x] `article:section` — e.g. `Diamond Education`, `Certification`, etc.
- [x] `article:tag` — up to 6 keyword tags from KEYWORDS map
- [x] `<link rel="canonical">` — `/blog/[slug]`
- [x] `twitter:card` = `summary_large_image`

### JSON-LD schemas (via `jsonLd` prop)
- [x] `BreadcrumbList` — Home → Blog → [Post Title]
- [x] `BlogPosting` with:
  - headline (max 110 chars — Google requirement)
  - 3 image aspect ratios: 1:1 (1200×1200), 4:3 (1200×900), 16:9 (1200×675)
  - datePublished + dateModified
  - author with name + url + worksFor
  - publisher with logo (apple-touch-icon.png 180×180)
  - wordCount + timeRequired (reading time)
  - articleSection + genre + keywords
  - inLanguage: `en-IN`
  - copyrightHolder → /#organization
  - isPartOf → /blog#blog
  - about → /#organization
- [x] `WebPage` — linked to /#website and /#organization

---

## 14. Rich Results Each Schema Unlocks

| Schema | Rich Result in Google |
|--------|----------------------|
| `FAQPage` | Expandable Q&A accordion in search results |
| `LocalBusiness` with rating | Star rating + address in local pack |
| `HowTo` | Numbered steps shown in search result |
| `WebApplication` | App info panel in search results |
| `BlogPosting` with 3 images | Article card with image carousel |
| `BreadcrumbList` | Breadcrumb path shown under URL in results |
| `SiteNavigationElement` | Sitelinks (indented sub-pages under main result) |
| `WebSite` + `SearchAction` | Sitelinks Searchbox in results |
| `Product` + `AggregateRating` | Star rating shown in main results |
| `Organization` | Google Knowledge Panel (right-side card) |

---

## 15. How to Add SEO to a New Page

If you create a new route, copy this pattern:

```tsx
import { useSEO, SITE_URL, breadcrumb } from "@/lib/seo";

function NewPage() {
  useSEO({
    title: "Page Title (50-60 chars) | JewelsReport",
    description: "Page description 150-160 chars. Make it unique, specific, and include the main keyword.",
    path: "/new-page",
    keywords: "keyword one, keyword two, keyword three, ...",
    jsonLd: [
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "New Page", path: "/new-page" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/new-page#webpage`,
        url: `${SITE_URL}/new-page`,
        name: "New Page — JewelsReport",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
        datePublished: "2026-06-04",
        dateModified: "2026-06-04",
      },
    ],
  });

  // Also add the page to:
  // 1. public/sitemap.xml          → add <url> block
  // 2. public/sitemap-index.xml    → update <lastmod>
  // 3. index.html SiteNavigationElement → add to ItemList if it's a nav link
  // 4. vite.config.ts ROUTES array → add for pre-rendering
}
```

---

## 16. Files That Are NOT in SEO but Affect It

| File | Why it matters for SEO |
|------|----------------------|
| `src/routes/__root.tsx` | App shell — if Layout breaks, all pages break |
| `src/lib/db.ts` | Fetches blog posts from Firebase — if it fails, blog pages have no content |
| `vite.config.ts` | Pre-renders all ROUTES to static HTML at build time — critical for Googlebot |
| `public/og-image.jpg` | Default social share image (1200×630) |
| `public/apple-touch-icon.png` | Used as publisher logo in Article schema (180×180) |

---

## 17. Title + Description Length Rules

Google truncates at specific lengths. Stay within these:

| Tag | Max Length | What happens if over |
|-----|-----------|---------------------|
| `<title>` | 60 characters | Google rewrites it with your own content |
| `meta description` | 160 characters | Truncated with `…` in results |
| BlogPosting `headline` | 110 characters | Google ignores it for Article rich results |
| `og:title` | 88 characters | Facebook truncates with `…` |

---

*Last updated: 2026-06-04 — reflects Google Search Central structured data docs (2025–2026 edition)*
