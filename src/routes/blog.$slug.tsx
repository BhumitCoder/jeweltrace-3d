import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useSEO, SITE_URL, breadcrumb } from "@/lib/seo";
import { getBlogPost, getBlogPosts } from "@/lib/db";
import { useEffect, useState } from "react";
import type { BlogPost } from "@/lib/store";
import { ArrowLeft, Calendar, User, BookOpen, ArrowRight, Clock } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  component: PostPage,
});

const CATEGORIES: Record<string, string> = {
  "4cs-diamond-grading-cut-colour-clarity-carat": "Diamond Education",
  "lab-grown-diamonds-vs-natural-diamonds-buyers-guide-2026": "Lab Grown Diamonds",
  "how-to-read-diamond-certificate-jewelsreport-guide": "Certification",
  "cvd-vs-hpht-lab-grown-diamonds-differences-explained": "Lab Grown Diamonds",
  "diamond-fluorescence-explained-effect-on-value-certificate": "Diamond Education",
  "why-diamond-gemological-certificate-important-before-buying": "Certification",
  "ruby-emerald-sapphire-coloured-gemstone-certification-grading": "Gemstones",
  "lab-grown-diamond-jewellery-indian-weddings-bridal-guide": "Bridal",
  "diamond-clarity-grades-explained-fl-if-vvs-vs-si-included": "Diamond Education",
  "how-to-verify-diamond-certificate-online-step-by-step": "Certification",
};

const KEYWORDS: Record<string, string> = {
  "4cs-diamond-grading-cut-colour-clarity-carat":
    "4Cs diamond grading, diamond cut colour clarity carat, how to grade diamonds, diamond quality guide, JewelsReport 4Cs",
  "lab-grown-diamonds-vs-natural-diamonds-buyers-guide-2026":
    "lab grown diamonds vs natural, lab diamond guide 2026, CVD diamond buyer guide, synthetic diamond comparison, lab grown diamond price",
  "how-to-read-diamond-certificate-jewelsreport-guide":
    "how to read diamond certificate, JewelsReport certificate guide, diamond grading report explained, certificate fields meaning",
  "cvd-vs-hpht-lab-grown-diamonds-differences-explained":
    "CVD vs HPHT diamonds, CVD diamond differences, HPHT lab grown diamonds, lab grown diamond types, chemical vapour deposition diamond",
  "diamond-fluorescence-explained-effect-on-value-certificate":
    "diamond fluorescence explained, blue fluorescence diamonds, fluorescence effect on value, diamond UV fluorescence, JewelsReport fluorescence grade",
  "why-diamond-gemological-certificate-important-before-buying":
    "why diamond certificate important, gemological certificate benefits, independent diamond grading, JewelsReport certification, certified diamond buying",
  "ruby-emerald-sapphire-coloured-gemstone-certification-grading":
    "ruby certification, emerald grading, sapphire certification, coloured gemstone report, gemstone origin determination, heat treatment detection",
  "lab-grown-diamond-jewellery-indian-weddings-bridal-guide":
    "lab grown diamond wedding India, bridal diamond jewellery guide, lab diamond engagement ring India, Indian wedding jewellery certified",
  "diamond-clarity-grades-explained-fl-if-vvs-vs-si-included":
    "diamond clarity grades, FL IF VVS VS SI clarity scale, eye-clean diamond clarity, best clarity grade value, diamond clarity explained",
  "how-to-verify-diamond-certificate-online-step-by-step":
    "verify diamond certificate online, how to check certificate authentic, JewelsReport verify, QR code diamond certificate, certificate verification guide",
};

function readingTime(content?: string) {
  if (!content) return null;
  const words = content.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return { mins, words };
}

function renderContent(content: string) {
  const paragraphs = content.split(/\n{2,}/);
  return paragraphs.map((para, i) => {
    const trimmed = para.trim();
    if (!trimmed) return null;
    if (/^[A-Z][A-Z\s&:(),/'-]{5,}$/.test(trimmed) && trimmed.length < 80) {
      return (
        <h2 key={i} className="mt-10 mb-4 font-display text-2xl md:text-3xl text-foreground">
          {trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()}
        </h2>
      );
    }
    return (
      <p key={i} className="mt-5 text-base md:text-lg text-foreground/85 leading-[1.85]">
        {trimmed}
      </p>
    );
  });
}

function PostPage() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<BlogPost | undefined>();
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getBlogPost(slug).then((found) => {
      setPost(found);
      setLoaded(true);
    });
    getBlogPosts().then((all) => {
      setRelated(all.filter((p) => p.slug !== slug).slice(0, 3));
    });
  }, [slug]);

  const rt = readingTime(post?.content);

  useSEO({
    title: post
      ? `${post.title} | JewelsReport Journal`
      : "Article — JewelsReport Journal",
    description:
      post?.excerpt ||
      post?.content?.slice(0, 155) ||
      "Gemological insights from the JewelsReport laboratory.",
    path: `/blog/${slug}`,
    type: "article",
    image: post?.coverDataUrl?.startsWith("http") ? post.coverDataUrl : undefined,
    keywords: KEYWORDS[slug] || (post
      ? `${post.title}, JewelsReport Journal, gemological insights, diamond certification, gemstone report`
      : undefined),
    jsonLd: post
      ? [
          breadcrumb([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": `${SITE_URL}/blog/${slug}#article`,
            headline: post.title,
            name: post.title,
            description: post.excerpt || post.content?.slice(0, 160) || "",
            url: `${SITE_URL}/blog/${slug}`,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${SITE_URL}/blog/${slug}`,
            },
            articleSection: CATEGORIES[slug] ?? "Gemology",
            genre: "Informational",
            keywords: KEYWORDS[slug] ?? post.title,
            inLanguage: "en-US",
            ...(post.coverDataUrl?.startsWith("http")
              ? {
                  image: {
                    "@type": "ImageObject",
                    url: post.coverDataUrl,
                    width: 1200,
                    height: 630,
                  },
                }
              : {}),
            author: {
              "@type": "Person",
              name: post.author,
              worksFor: { "@id": `${SITE_URL}/#organization` },
            },
            publisher: {
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: "JewelsReport",
              logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/favicon.ico`,
                width: 512,
                height: 512,
              },
            },
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            isPartOf: { "@id": `${SITE_URL}/blog#blog` },
            about: { "@id": `${SITE_URL}/#organization` },
            ...(rt ? { wordCount: rt.words, timeRequired: `PT${rt.mins}M` } : {}),
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["h1", ".article-excerpt"],
            },
          },
        ]
      : undefined,
  });

  return (
    <Layout>
      <article itemScope itemType="https://schema.org/BlogPosting">

        {/* Cover image — full bleed */}
        {post?.coverDataUrl && (
          <div className="w-full h-[40vh] sm:h-[55vh] overflow-hidden">
            <img
              src={post.coverDataUrl}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="eager"
              itemProp="image"
            />
          </div>
        )}

        <div className="px-4 sm:px-6 pt-10 pb-32 mx-auto max-w-3xl">
          {/* Back nav */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>

          {loaded && !post && (
            <div className="mt-16 text-center text-muted-foreground">
              <p className="text-2xl font-display mb-3">Article not found</p>
              <p className="text-sm">This article may have been moved or removed.</p>
              <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-primary text-sm hover:underline">
                <ArrowLeft className="w-4 h-4" /> Browse all articles
              </Link>
            </div>
          )}

          {post && (
            <>
              {/* Category + meta */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold uppercase tracking-widest">
                  {CATEGORIES[slug] ?? "Article"}
                </span>
                {rt && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" /> {rt.mins} min read
                  </span>
                )}
              </div>

              {/* Headline */}
              <h1
                itemProp="headline"
                className="mt-4 font-display text-3xl md:text-5xl leading-tight"
              >
                {post.title}
              </h1>

              {/* Excerpt */}
              <p
                className="article-excerpt mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-4"
                itemProp="description"
              >
                {post.excerpt}
              </p>

              {/* Author + date */}
              <div className="mt-6 flex flex-wrap items-center gap-4 pb-6 border-b border-border">
                <span
                  className="inline-flex items-center gap-2 text-sm text-foreground/80"
                  itemProp="author"
                  itemScope
                  itemType="https://schema.org/Person"
                >
                  <span className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-[11px] font-bold text-gold-foreground shrink-0">
                    JR
                  </span>
                  <span itemProp="name">{post.author}</span>
                </span>
                <time
                  dateTime={post.publishedAt}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"
                  itemProp="datePublished"
                >
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <BookOpen className="w-4 h-4" />
                  {rt?.words?.toLocaleString()} words
                </span>
              </div>

              {/* Body */}
              <div
                itemProp="articleBody"
                className="mt-2"
              >
                {renderContent(post.content)}
              </div>

              {/* CTA */}
              <div className="mt-14 p-6 sm:p-8 rounded-2xl border border-primary/20 bg-primary/5">
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
                  JewelsReport Certification
                </p>
                <h3 className="font-display text-xl sm:text-2xl mb-2">
                  Verify your certificate or check a report
                </h3>
                <p className="text-sm text-muted-foreground mb-5">
                  Every JewelsReport certificate can be verified instantly online using the report number or QR code on your PVC card — free, no login required.
                </p>
                <Link
                  to="/verify"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-gold text-gold-foreground font-medium text-sm shadow-gold hover:scale-105 transition-transform"
                >
                  Verify a Certificate <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="px-4 sm:px-6 pb-24 bg-card/30 border-t border-border pt-12">
            <div className="mx-auto max-w-6xl">
              <h2 className="font-display text-2xl mb-8 text-center">More from the Journal</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="group rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/40 transition-colors"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-gradient-navy">
                      {p.coverDataUrl ? (
                        <img
                          src={p.coverDataUrl}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary/30 font-display text-4xl">JR</div>
                      )}
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">
                        {CATEGORIES[p.slug] ?? "Article"}
                      </span>
                      <h3 className="mt-1.5 font-display text-base group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {p.title}
                      </h3>
                      <div className="mt-2 inline-flex items-center gap-1 text-primary text-xs font-medium">
                        Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
}
