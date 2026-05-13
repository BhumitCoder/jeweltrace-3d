import { r as reactExports, T as jsxRuntimeExports } from "./server-BcffvMK2.js";
import { c as Route, a as useNavigate, L as Link } from "./router-Ctblab6t.js";
import { L as Layout } from "./Layout-Cc5lLsVc.js";
import { i as isAdminAuthed, f as getBlogPost, k as slugify, l as saveBlogPost } from "./store-BKso1y8A.js";
import { A as ArrowLeft } from "./arrow-left-D-tWFjPB.js";
import { U as Upload, S as Save } from "./upload-sAw98O76.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function BlogEditor() {
  const {
    id
  } = Route.useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const [authed, setAuthed] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isAdminAuthed()) navigate({
      to: "/admin"
    });
    else setAuthed(true);
  }, [navigate]);
  const [post, setPost] = reactExports.useState(() => {
    if (!isNew && typeof window !== "undefined") {
      const found = getBlogPost(id) || JSON.parse(localStorage.getItem("jr_blog_posts_v1") || "[]").find((p) => p.id === id);
      if (found) return found;
    }
    return {
      id: crypto.randomUUID(),
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "JewelReport Editorial",
      publishedAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      createdAt: Date.now()
    };
  });
  if (!authed) return null;
  const update = (k, v) => setPost((p) => ({
    ...p,
    [k]: v
  }));
  const onImage = (file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => update("coverDataUrl", r.result);
    r.readAsDataURL(file);
  };
  const submit = (e) => {
    e.preventDefault();
    const slug = post.slug || slugify(post.title);
    saveBlogPost({
      ...post,
      slug
    });
    navigate({
      to: "/admin"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 pt-12 pb-32 mx-auto max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
      " Back to Dashboard"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 font-display text-4xl", children: isNew ? "New Blog Post" : "Edit Post" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mt-10 space-y-6 p-8 rounded-2xl border border-border bg-card shadow-elegant", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: post.title, onChange: (e) => {
        update("title", e.target.value);
        if (isNew) update("slug", slugify(e.target.value));
      }, className: ic, required: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Slug", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: post.slug, onChange: (e) => update("slug", slugify(e.target.value)), className: ic, required: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Author", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: post.author, onChange: (e) => update("author", e.target.value), className: ic }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Published Date", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: post.publishedAt, onChange: (e) => update("publishedAt", e.target.value), className: ic }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Cover Image", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:border-primary cursor-pointer text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
            " Upload",
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => onImage(e.target.files?.[0]) })
          ] }),
          post.coverDataUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.coverDataUrl, alt: "", className: "w-12 h-12 object-cover rounded-lg" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Excerpt", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: post.excerpt, onChange: (e) => update("excerpt", e.target.value), rows: 2, className: ic, required: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Content", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: post.content, onChange: (e) => update("content", e.target.value), rows: 14, className: ic, required: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-105 transition-transform", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
          " Save Post"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", className: "inline-flex items-center px-6 py-3 rounded-full border border-border hover:border-primary", children: "Cancel" })
      ] })
    ] })
  ] }) });
}
const ic = "w-full bg-input/30 border border-border rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors text-foreground";
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children })
  ] });
}
export {
  BlogEditor as component
};
