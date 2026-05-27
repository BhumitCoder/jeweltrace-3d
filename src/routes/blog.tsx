import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useSEO, breadcrumb, SITE_URL } from "@/lib/seo";
import { getBlogPosts } from "@/lib/db";
import { useEffect, useState } from "react";
import type { BlogPost } from "@/lib/store";
import { Calendar, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
});

function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    getBlogPosts().then(setPosts);
  }, []);

  useSEO({
    title: "JewelsReport Journal — Diamond, Gemstone & Jewellery Industry Insights",
    description:
      "Stories, science and standards from the world of gem certification. Read the JewelsReport Journal for grading insights, lab-grown diamond news, buyer guides and gemological research.",
    path: "/blog",
    keywords:
      "diamond blog, gemstone journal, lab grown diamond articles, jewellery industry news, gem grading insights, CVD diamond news, sapphire guide, gemstone buyer guide, certification tips",
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
          "Diamond, gemstone and jewellery certification insights from the JewelsReport laboratory team.",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-US",
        blogPost: posts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: `${SITE_URL}/blog/${p.slug}`,
          datePublished: p.publishedAt,
          author: {
            "@type": "Person",
            name: p.author,
            worksFor: { "@id": `${SITE_URL}/#organization` },
          },
          description: p.excerpt,
          publisher: { "@id": `${SITE_URL}/#organization` },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/blog#webpage`,
        url: `${SITE_URL}/blog`,
        name: "JewelsReport Journal",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: "en-US",
      },
    ],
  });


  return (
    <Layout>
      <section className="px-4 sm:px-6 pt-20 pb-10 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-primary">Journal</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl">
          The <span className="text-gradient-gold">JewelsReport</span> Journal
        </h1>
        <p className="mt-5 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Stories, science and standards from the world of gem certification.
        </p>
      </section>

      <section className="px-4 sm:px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          {posts.length === 0 ? (
            <div className="text-center p-12 sm:p-16 rounded-2xl border border-dashed border-border text-muted-foreground text-sm sm:text-base">
              No articles published yet. Check back soon.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
              {posts.map((p) => (
                <Link
                  key={p.id}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group rounded-2xl overflow-hidden border border-border bg-card shadow-elegant hover:border-primary/40 transition-colors"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-gradient-navy">
                    {p.coverDataUrl ? (
                      <img src={p.coverDataUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-primary/40 text-5xl sm:text-6xl font-display">JR</div>
                    )}
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5 shrink-0" /> {p.publishedAt}
                    </div>
                    <h3 className="mt-3 font-display text-lg sm:text-xl group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>
                    <div className="mt-4 inline-flex items-center gap-1 text-primary text-sm">
                      Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
