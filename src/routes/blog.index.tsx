import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useSEO, breadcrumb, SITE_URL } from "@/lib/seo";
import { getBlogPosts } from "@/lib/db";
import { useEffect, useState } from "react";
import type { BlogPost } from "@/lib/store";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  component: BlogPage,
});

function readingTime(content?: string) {
  if (!content) return null;
  const words = content.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

const CATEGORIES: Record<string, string> = {
  "4cs-diamond-grading-cut-colour-clarity-carat": "Diamond Education",
  "lab-grown-diamonds-vs-natural-diamonds-buyers-guide-2026": "Lab Grown",
  "how-to-read-diamond-certificate-jewelsreport-guide": "Certification",
  "cvd-vs-hpht-lab-grown-diamonds-differences-explained": "Lab Grown",
  "diamond-fluorescence-explained-effect-on-value-certificate": "Diamond Education",
  "why-diamond-gemological-certificate-important-before-buying": "Certification",
  "ruby-emerald-sapphire-coloured-gemstone-certification-grading": "Gemstones",
  "lab-grown-diamond-jewellery-indian-weddings-bridal-guide": "Bridal",
  "diamond-clarity-grades-explained-fl-if-vvs-vs-si-included": "Diamond Education",
  "how-to-verify-diamond-certificate-online-step-by-step": "Certification",
};

function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts().then((p) => {
      setPosts(p);
      setLoading(false);
    });
  }, []);

  useSEO({
    title: "JewelsReport Journal — Diamond, Gemstone & Jewellery Grading Insights",
    description:
      "Expert guides on the 4Cs of diamond grading, lab grown vs natural diamonds, gemstone certification, CVD vs HPHT, diamond fluorescence, and how to verify a certificate. Written by JewelsReport gemologists.",
    path: "/blog",
    keywords:
      "diamond grading guide India, 4Cs diamond explained, cut colour clarity carat guide, how to grade a diamond India, diamond quality factors, diamond colour scale explained, D to Z colour diamond, diamond clarity scale explained, FL to I3 clarity, flawless diamond guide, VVS diamond explained, VS diamond guide, SI diamond explained, Included diamond guide, diamond cut grades explained, Excellent cut explained, Very Good cut diamond, what is Good cut diamond, diamond fluorescence guide, blue fluorescence diamond, is fluorescence bad diamond, fluorescence effect value, diamond table depth guide, diamond proportions guide, diamond certification guide India, why certify diamond India, diamond certification importance, importance of gem report, how to read diamond certificate India, diamond certificate explained, 4Cs on certificate explained, diamond certificate sections, grading report guide, JewelsReport grading guide, lab grown diamond guide India, lab grown vs natural diamond 2026, lab grown diamond pros cons, should I buy lab grown diamond, CVD vs HPHT guide, CVD diamond explained, HPHT diamond guide, chemical vapour deposition explained, high pressure high temperature diamond, lab grown diamond price India, lab grown diamond market India, lab grown diamond Surat, synthetic diamond guide India, man made diamond India, lab grown diamond resale, lab grown diamond investment, gemstone guide India, ruby buying guide India, sapphire buying guide, emerald buying guide India, how to buy ruby India, blue sapphire buying tips, emerald quality guide, gemstone treatment disclosure, heat treated vs untreated gem, gemstone origin importance, origin certified gemstone, untreated gemstone premium, gemstone investment India, coloured stone guide India, precious gemstone India, semi precious stone guide, ruby investment India, sapphire investment, emerald investment guide, diamond fraud prevention India, fake diamond certificate detection, counterfeit diamond report India, how to spot fake certificate, diamond fraud India, diamond scam prevention, certified diamond vs uncertified, buy certified diamond India, diamond without certificate risk, certified diamond advantages, diamond appraisal guide India, diamond resale India, diamond second hand market, diamond inheritance India, diamond insurance India, diamond auction India, JewelsReport journal, JewelsReport blog, diamond education India, gemological knowledge, jewellery industry news India, Surat diamond industry news, lab grown diamond news 2026, diamond market news India, diamond price trend India, diamond investment guide India, bridal diamond guide India, engagement ring guide India, wedding diamond India, bridal diamond Surat, anniversary diamond gift India, diamond gifting guide India, diamond jewellery occasions India, diamond gifting etiquette, diamond birthstone guide, April birthstone diamond, birthstone jewellery India, diamond solitaire guide India, diamond fashion India, diamond jewellery trends 2026, emerald cut trend, lab grown diamond trend India, celebrity diamond India",
    jsonLd: [
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Journal", path: "/blog" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${SITE_URL}/blog#blog`,
        url: `${SITE_URL}/blog`,
        name: "JewelsReport Journal",
        description:
          "Expert diamond and gemstone grading insights from the JewelsReport gemological laboratory. Buyer guides, certification tutorials, lab grown diamond news and gemstone identification articles.",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-US",
        blogPost: posts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: `${SITE_URL}/blog/${p.slug}`,
          datePublished: p.publishedAt,
          dateModified: p.publishedAt,
          author: {
            "@type": "Person",
            name: p.author,
            worksFor: { "@id": `${SITE_URL}/#organization` },
          },
          description: p.excerpt,
          image: p.coverDataUrl?.startsWith("http") ? p.coverDataUrl : undefined,
          publisher: { "@id": `${SITE_URL}/#organization` },
          inLanguage: "en-US",
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/blog#webpage`,
        url: `${SITE_URL}/blog`,
        name: "JewelsReport Journal — Diamond & Gemstone Grading Insights",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: "en-US",
        about: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  });

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <Layout>
      {/* Hero */}
      <section className="px-4 sm:px-6 pt-20 pb-12 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-primary font-medium">Journal</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl">
          The <span className="text-gradient-gold">JewelsReport</span> Journal
        </h1>
        <p className="mt-5 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Expert guides on diamond grading, gemstone certification and the science behind every JewelsReport certificate — written by our laboratory team.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["Diamond Education", "Lab Grown", "Gemstones", "Certification", "Bridal"].map((cat) => (
            <span key={cat} className="px-3 py-1 rounded-full border border-border text-xs text-muted-foreground bg-card/60">
              {cat}
            </span>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl">

          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card animate-pulse">
                  <div className="aspect-[16/10] bg-muted/40 rounded-t-2xl" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 w-24 bg-muted/40 rounded" />
                    <div className="h-5 w-full bg-muted/40 rounded" />
                    <div className="h-4 w-5/6 bg-muted/40 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="text-center p-16 rounded-2xl border border-dashed border-border text-muted-foreground">
              No articles published yet. Check back soon.
            </div>
          )}

          {!loading && posts.length > 0 && (
            <>
              {/* Featured post — large hero card */}
              {featured && (
                <Link
                  to="/blog/$slug"
                  params={{ slug: featured.slug }}
                  className="group block rounded-3xl overflow-hidden border border-border bg-card shadow-elegant hover:border-primary/40 transition-colors mb-10"
                >
                  <div className="sm:flex">
                    <div className="sm:w-1/2 aspect-[16/10] sm:aspect-auto overflow-hidden bg-gradient-navy">
                      {featured.coverDataUrl ? (
                        <img
                          src={featured.coverDataUrl}
                          alt={featured.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="eager"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary/30 font-display text-6xl">JR</div>
                      )}
                    </div>
                    <div className="sm:w-1/2 flex flex-col justify-center p-6 sm:p-10">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold uppercase tracking-wider">
                          {CATEGORIES[featured.slug] ?? "Featured"}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                          <BookOpen className="w-3.5 h-3.5" />
                          {readingTime(featured.content)}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl group-hover:text-primary transition-colors leading-snug">
                        {featured.title}
                      </h2>
                      <p className="mt-3 text-sm text-muted-foreground line-clamp-3 leading-relaxed">{featured.excerpt}</p>
                      <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(featured.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                        </span>
                        <span>·</span>
                        <span>{featured.author}</span>
                      </div>
                      <div className="mt-5 inline-flex items-center gap-1.5 text-primary text-sm font-medium">
                        Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Rest of posts grid */}
              {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((p) => (
                    <Link
                      key={p.id}
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      className="group rounded-2xl overflow-hidden border border-border bg-card shadow-elegant hover:border-primary/40 hover:shadow-gold/10 transition-all"
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
                          <div className="w-full h-full flex items-center justify-center text-primary/30 font-display text-5xl">JR</div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wider">
                            {CATEGORIES[p.slug] ?? "Article"}
                          </span>
                          <span className="text-[11px] text-muted-foreground inline-flex items-center gap-1">
                            <BookOpen className="w-3 h-3" /> {readingTime(p.content)}
                          </span>
                        </div>
                        <h3 className="mt-2 font-display text-lg group-hover:text-primary transition-colors leading-snug line-clamp-2">
                          {p.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{p.excerpt}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {new Date(p.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                          <span className="inline-flex items-center gap-1 text-primary text-xs font-medium">
                            Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
