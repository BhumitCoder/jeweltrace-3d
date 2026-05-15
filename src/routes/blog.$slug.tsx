import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useSEO, SITE_URL, breadcrumb } from "@/lib/seo";
import { getBlogPost } from "@/lib/store";
import { useEffect, useState } from "react";
import type { BlogPost } from "@/lib/store";
import { ArrowLeft, Calendar, User } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  component: PostPage,
});

function PostPage() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<BlogPost | undefined>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setPost(getBlogPost(slug));
    setLoaded(true);
  }, [slug]);

  const wordCount = post?.content ? post.content.trim().split(/\s+/).length : undefined;

  useSEO({
    title: post ? `${post.title} | JewelsReport Journal` : "Article — JewelsReport Journal",
    description:
      post?.excerpt ||
      post?.content?.slice(0, 155) ||
      "Gemological insights from the JewelsReport laboratory.",
    path: `/blog/${slug}`,
    type: "article",
    image: post?.coverDataUrl?.startsWith("http") ? post.coverDataUrl : undefined,
    keywords: post
      ? `${post.title}, JewelsReport Journal, gemological insights, diamond certification, gemstone report`
      : undefined,
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
            inLanguage: "en-US",
            isPartOf: { "@id": `${SITE_URL}/blog#blog` },
            ...(wordCount ? { wordCount } : {}),
            about: { "@id": `${SITE_URL}/#organization` },
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
      <article className="px-6 pt-16 pb-32 mx-auto max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </Link>

        {loaded && !post && (
          <div className="mt-16 text-center text-muted-foreground">Article not found.</div>
        )}

        {post && (
          <>
            <h1 className="mt-8 font-display text-4xl md:text-6xl leading-tight">{post.title}</h1>
            <div className="mt-5 flex items-center gap-5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><User className="w-4 h-4" /> {post.author}</span>
              <span className="inline-flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.publishedAt}</span>
            </div>
            {post.coverDataUrl && (
              <img src={post.coverDataUrl} alt={post.title} className="mt-10 w-full rounded-2xl shadow-elegant" />
            )}
            <div className="mt-10 prose-content text-foreground/90 leading-relaxed whitespace-pre-wrap text-lg">
              {post.content}
            </div>
          </>
        )}
      </article>
    </Layout>
  );
}
