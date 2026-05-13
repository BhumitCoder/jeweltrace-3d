import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { isAdminAuthed, saveBlogPost, getBlogPost, slugify, type BlogPost } from "@/lib/store";
import { ArrowLeft, Save, Upload } from "lucide-react";

export const Route = createFileRoute("/admin/blog/$id")({
  component: BlogEditor,
});

function BlogEditor() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [authed, setAuthed] = useState(false);
  useEffect(() => {
    if (!isAdminAuthed()) navigate({ to: "/admin" });
    else setAuthed(true);
  }, [navigate]);

  const [post, setPost] = useState<BlogPost>(() => {
    if (!isNew) {
      const all = JSON.parse(localStorage.getItem("jr_blog_posts_v1") || "[]") as BlogPost[];
      const found = all.find((p) => p.id === id);
      if (found) return found;
    }
    return {
      id: crypto.randomUUID(),
      title: "", slug: "", excerpt: "", content: "",
      author: "JewelReport Editorial",
      publishedAt: new Date().toISOString().slice(0, 10),
      createdAt: Date.now(),
    };
  });

  if (!authed) return null;

  const update = <K extends keyof BlogPost>(k: K, v: BlogPost[K]) =>
    setPost((p) => ({ ...p, [k]: v }));

  const onImage = (file?: File) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => update("coverDataUrl", r.result as string);
    r.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = post.slug || slugify(post.title);
    saveBlogPost({ ...post, slug });
    navigate({ to: "/admin" });
  };

  return (
    <Layout>
      <section className="px-6 pt-12 pb-32 mx-auto max-w-4xl">
        <Link to="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="mt-6 font-display text-4xl">{isNew ? "New Blog Post" : "Edit Post"}</h1>

        <form onSubmit={submit} className="mt-10 space-y-6 p-8 rounded-2xl border border-border bg-card shadow-elegant">
          <Field label="Title">
            <input value={post.title} onChange={(e) => { update("title", e.target.value); if (isNew) update("slug", slugify(e.target.value)); }} className={ic} required />
          </Field>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Slug"><input value={post.slug} onChange={(e) => update("slug", slugify(e.target.value))} className={ic} required /></Field>
            <Field label="Author"><input value={post.author} onChange={(e) => update("author", e.target.value)} className={ic} /></Field>
            <Field label="Published Date"><input type="date" value={post.publishedAt} onChange={(e) => update("publishedAt", e.target.value)} className={ic} /></Field>
            <Field label="Cover Image">
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:border-primary cursor-pointer text-sm">
                  <Upload className="w-4 h-4" /> Upload
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => onImage(e.target.files?.[0])} />
                </label>
                {post.coverDataUrl && <img src={post.coverDataUrl} alt="" className="w-12 h-12 object-cover rounded-lg" />}
              </div>
            </Field>
          </div>
          <Field label="Excerpt">
            <textarea value={post.excerpt} onChange={(e) => update("excerpt", e.target.value)} rows={2} className={ic} required />
          </Field>
          <Field label="Content">
            <textarea value={post.content} onChange={(e) => update("content", e.target.value)} rows={14} className={ic} required />
          </Field>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-105 transition-transform">
              <Save className="w-4 h-4" /> Save Post
            </button>
            <Link to="/admin" className="inline-flex items-center px-6 py-3 rounded-full border border-border hover:border-primary">Cancel</Link>
          </div>
        </form>
      </section>
    </Layout>
  );
}

const ic = "w-full bg-input/30 border border-border rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors text-foreground";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
