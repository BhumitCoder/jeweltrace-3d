import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { saveBlogPost, getBlogPostById } from "@/lib/db";
import { slugify } from "@/lib/store";
import type { BlogPost } from "@/lib/store";
import { ArrowLeft, Save, Upload, Eye, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/blog/$id")({
  component: BlogEditor,
});

function makePost(): BlogPost {
  return {
    id: crypto.randomUUID(),
    title: "", slug: "", excerpt: "", content: "",
    author: "JewelsReport Editorial",
    publishedAt: new Date().toISOString().slice(0, 10),
    createdAt: Date.now(),
  };
}

function BlogEditor() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [post, setPost] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew) {
      setPost(makePost());
    } else {
      getBlogPostById(id).then((found) => {
        if (found) setPost(found);
        else navigate({ to: "/admin" });
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const set = <K extends keyof BlogPost>(k: K, v: BlogPost[K]) =>
    setPost((p) => p ? { ...p, [k]: v } : p);

  const onImage = (file?: File) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => set("coverDataUrl", r.result as string);
    r.readAsDataURL(file);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || saving) return;
    setSaving(true);
    try {
      const slug = post.slug || slugify(post.title);
      await saveBlogPost({ ...post, slug });
      navigate({ to: "/admin" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="flex items-center justify-between">
        <Link to="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        {!isNew && post.slug && (
          <Link to="/blog/$slug" params={{ slug: post.slug }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm hover:border-primary hover:text-primary transition-colors">
            <Eye className="w-4 h-4" /> Preview post
          </Link>
        )}
      </div>

      <div className="mt-6 mb-8">
        <h1 className="font-display text-3xl">{isNew ? "New Blog Post" : "Edit Post"}</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Your article will appear on the public blog immediately after saving.
        </p>
      </div>

      <form onSubmit={submit} className="space-y-6">

        <div className="p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm shadow-elegant space-y-5">
          <h2 className="font-display text-lg">Post Details</h2>

          <F label="Title" required>
            <input value={post.title}
              onChange={(e) => { set("title", e.target.value); if (isNew) set("slug", slugify(e.target.value)); }}
              className={ic} placeholder="e.g. How to read your JewelsReport certificate" required />
          </F>

          <div className="grid sm:grid-cols-2 gap-5">
            <F label="URL Slug" required>
              <input value={post.slug} onChange={(e) => set("slug", slugify(e.target.value))}
                className={ic} placeholder="auto-generated from title" required />
            </F>
            <F label="Author">
              <input value={post.author} onChange={(e) => set("author", e.target.value)} className={ic} />
            </F>
            <F label="Published Date">
              <input type="date" value={post.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} className={ic} />
            </F>
            <F label="Cover Image">
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:border-primary cursor-pointer text-sm transition-colors">
                  <Upload className="w-4 h-4" /> Upload
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => onImage(e.target.files?.[0])} />
                </label>
                {post.coverDataUrl && (
                  <div className="relative">
                    <img src={post.coverDataUrl} alt="" className="w-14 h-14 object-cover rounded-xl border border-border" />
                    <button type="button" onClick={() => set("coverDataUrl", undefined)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-white text-[10px] flex items-center justify-center leading-none">×</button>
                  </div>
                )}
              </div>
            </F>
          </div>

          <F label="Excerpt" required>
            <textarea value={post.excerpt} onChange={(e) => set("excerpt", e.target.value)}
              rows={2} className={ic} placeholder="Short summary shown on the blog listing page..." required />
          </F>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm shadow-elegant">
          <h2 className="font-display text-lg mb-4">Article Content</h2>
          <textarea value={post.content} onChange={(e) => set("content", e.target.value)}
            rows={22} className={`${ic} font-mono text-xs leading-relaxed resize-y`}
            placeholder="Write your article here. Blank lines become paragraph breaks." required />
          <p className="text-xs text-muted-foreground mt-2">Plain text — blank lines separate paragraphs.</p>
        </div>

        <div className="flex gap-3 pt-2 pb-10">
          <button type="submit" disabled={saving}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-105 transition-transform disabled:opacity-60 disabled:scale-100">
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <><Save className="w-4 h-4" /> {isNew ? "Publish Post" : "Save Changes"}</>}
          </button>
          <Link to="/admin"
            className="inline-flex items-center px-6 py-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

const ic = "w-full bg-input/30 border border-border rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors text-foreground text-sm";

function F({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}{required && <span className="text-primary ml-0.5">*</span>}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
