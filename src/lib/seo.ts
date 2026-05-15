import { useEffect } from "react";

export const SITE_URL = "https://www.jewelsreport.com";
export const SITE_NAME = "JewelsReport";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

type SEOProps = {
  title: string;
  description: string;
  path: string;             // route path, e.g. "/about"
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
