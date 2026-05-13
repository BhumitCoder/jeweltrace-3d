import { r as reactExports, T as jsxRuntimeExports } from "./server-BcffvMK2.js";
import { L as Link } from "./router-Ctblab6t.js";
import { L as Layout, A as ArrowRight } from "./Layout-Cc5lLsVc.js";
import { a as getBlogPosts } from "./store-BKso1y8A.js";
import { C as Calendar } from "./calendar-DNu4Ylo_.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function BlogPage() {
  const [posts, setPosts] = reactExports.useState([]);
  reactExports.useEffect(() => setPosts(getBlogPosts()), []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 pt-20 pb-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.35em] text-primary", children: "Journal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 font-display text-5xl md:text-6xl", children: [
        "The ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-gold", children: "JewelReport" }),
        " Journal"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-muted-foreground max-w-2xl mx-auto", children: "Stories, science and standards from the world of gem certification." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 pb-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-6xl", children: posts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-16 rounded-2xl border border-dashed border-border text-muted-foreground", children: "No articles published yet. Check back soon." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: posts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: {
      slug: p.slug
    }, className: "group rounded-2xl overflow-hidden border border-border bg-card shadow-elegant hover:border-primary/40 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[16/10] overflow-hidden bg-gradient-navy", children: p.coverDataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.coverDataUrl, alt: p.title, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-primary/40 text-6xl font-display", children: "JR" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
          " ",
          p.publishedAt
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-xl group-hover:text-primary transition-colors", children: p.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground line-clamp-3", children: p.excerpt }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 inline-flex items-center gap-1 text-primary text-sm", children: [
          "Read article ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })
        ] })
      ] })
    ] }, p.id)) }) }) })
  ] });
}
export {
  BlogPage as component
};
