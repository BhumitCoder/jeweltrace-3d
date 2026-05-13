import { r as reactExports, T as jsxRuntimeExports } from "./server-BcffvMK2.js";
import { R as Route, L as Link } from "./router-Ctblab6t.js";
import { c as createLucideIcon, L as Layout } from "./Layout-Cc5lLsVc.js";
import { f as getBlogPost } from "./store-BKso1y8A.js";
import { A as ArrowLeft } from "./arrow-left-D-tWFjPB.js";
import { C as Calendar } from "./calendar-DNu4Ylo_.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function PostPage() {
  const {
    slug
  } = Route.useParams();
  const [post, setPost] = reactExports.useState();
  const [loaded, setLoaded] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setPost(getBlogPost(slug));
    setLoaded(true);
  }, [slug]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "px-6 pt-16 pb-32 mx-auto max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
      " Back to Journal"
    ] }),
    loaded && !post && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 text-center text-muted-foreground", children: "Article not found." }),
    post && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-8 font-display text-4xl md:text-6xl leading-tight", children: post.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center gap-5 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
          " ",
          post.author
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
          " ",
          post.publishedAt
        ] })
      ] }),
      post.coverDataUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.coverDataUrl, alt: post.title, className: "mt-10 w-full rounded-2xl shadow-elegant" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 prose-content text-foreground/90 leading-relaxed whitespace-pre-wrap text-lg", children: post.content })
    ] })
  ] }) });
}
export {
  PostPage as component
};
