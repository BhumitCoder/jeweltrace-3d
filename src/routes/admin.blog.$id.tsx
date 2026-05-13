import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AdminShell, AdminTopBar } from "@/components/AdminShell";
import { useEffect, useState } from "react";
import { isAdminAuthed, saveBlogPost, getBlogPostById, slugify, type BlogPost } from "@/lib/store";
import { ArrowLeft, Save, Upload, Eye } from "lucide-react";

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
    if (!isNew && typeof window !== "undefined") {
      const found = getBlogPostById(id);
      if (found) return found;
    }
    return {
      id: crypto.randomUUID(),
      title: "",
      slug: "",
      excerpt: "",
      content: "",
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
    <AdminShell>
      <AdminTopBar />
      <div className="mx-auto max-w-4xl px-6 py-8">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="mt-6 mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl">{isNew ? "New Blog Post" : "Edit Post"}</h1>
            <p className="text-muted-foreground mt-1.5 text-sm">
              Write your article and it will appear on the public blog instantly after saving.
            </p>
          </div>
          {!isNew && post.slug && (
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm hover:border-primary hover:text-primary transition-colors shrink-0"
            >
              <Eye className="w-4 h-4" /> Preview
            </Link>
          )}
        </div>

        <form onSubmit={submit} className="space-y-6">
          {/* Meta */}
          <div className="p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm shadow-elegant space-y-5">
            <div>
              <h2 className="font-display text-lg mb-4">Post Details</h2>
            </div>
            <Field label="Title" required>
              <input
                value={post.title}
                onChange={(e) => {
                  update("title", e.target.value);
                  if (isNew) update("slug", slugify(e.target.value));
                }}
                className={ic}
                placeholder="e.g. How to read your JewelReport certificate"
                required
              />
            </Field>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="URL Slug" required>
                <input
                  value={post.slug}
                  onChange={(e) => update("slug", slugify(e.target.value))}
                  className={ic}
                  placeholder="auto-generated"
                  required
                />
              </Field>
              <Field label="Author">
                <input
                  value={post.author}
                  onChange={(e) => update("author", e.target.value)}
                  className={ic}
                  placeholder="JewelReport Editorial"
                />
              </Field>
              <Field label="Published Date">
                <input
                  type="date"
                  value={post.publishedAt}
                  onChange={(e) => update("publishedAt", e.target.value)}
                  className={ic}
                />
              </Field>
              <Field label="Cover Image">
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:border-primary cursor-pointer text-sm transition-colors">
                    <Upload className="w-4 h-4" /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => onImage(e.target.files?.[0])}
                    />
                  </label>
                  {post.coverDataUrl && (
                    <div className="relative">
                      <img src={post.coverDataUrl} alt="" className="w-14 h-14 object-cover rounded-xl border border-border" />
                      <button
                        type="button"
                        onClick={() => update("coverDataUrl", undefined)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-white text-xs flex items-center justify-center"
                      >×</button>
                    </div>
                  )}
                </div>
              </Field>
            </div>

            <Field label="Excerpt" required>
              <textarea
                value={post.excerpt}
                onChange={(e) => update("excerpt", e.target.value)}
                rows={2}
                className={ic}
                placeholder="A short summary shown on the blog listing page..."
                required
              />
            </Field>
          </div>

          {/* Content */}
          <div className="p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm shadow-elegant">
            <h2 className="font-display text-lg mb-4">Article Content</h2>
            <textarea
              value={post.content}
              onChange={(e) => update("content", e.target.value)}
              rows={20}
              className={`${ic} font-mono text-xs leading-relaxed resize-y`}
              placeholder="Write your article here. Line breaks are preserved as paragraph breaks."
              required
            />
            <p className="text-xs text-muted-foreground mt-2">
              Plain text only. Use blank lines to separate paragraphs.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-105 transition-transform"
            >
              <Save className="w-4 h-4" /> {isNew ? "Publish Post" : "Save Changes"}
            </button>
            <Link
              to="/admin"
              className="inline-flex items-center px-6 py-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}

const ic = "w-full bg-input/30 border border-border rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors text-foreground text-sm";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}{required && <span className="text-primary ml-0.5">*</span>}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
