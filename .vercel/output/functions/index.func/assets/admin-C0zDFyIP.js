import { r as reactExports, T as jsxRuntimeExports } from "./server-BcffvMK2.js";
import { a as useNavigate, L as Link } from "./router-Ctblab6t.js";
import { c as createLucideIcon, L as Layout } from "./Layout-Cc5lLsVc.js";
import { i as isAdminAuthed, s as setAdminAuthed, d as deleteCertificate, b as deleteBlogPost, c as getCertificates, a as getBlogPosts, A as ADMIN_USER, e as ADMIN_PASS } from "./store-BKso1y8A.js";
import { E as Eye } from "./eye-J03L0KFC.js";
import { L as Lock } from "./lock-Dhzsq2-d.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$5 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$5);
const __iconNode$4 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "M15 18h-5", key: "95g1m2" }],
  ["path", { d: "M18 14h-8", key: "sponae" }],
  [
    "path",
    {
      d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",
      key: "39pd36"
    }
  ],
  ["rect", { width: "8", height: "4", x: "10", y: "6", rx: "1", key: "aywv1n" }]
];
const Newspaper = createLucideIcon("newspaper", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M13 21h8", key: "1jsn5i" }],
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
const __iconNode = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function AdminPage() {
  const [authed, setAuthed] = reactExports.useState(false);
  const [ready, setReady] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setAuthed(isAdminAuthed());
    setReady(true);
  }, []);
  if (!ready) return null;
  return authed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, { onLogout: () => {
    setAdminAuthed(false);
    setAuthed(false);
  } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Login, { onLogin: () => setAuthed(true) });
}
function Login({
  onLogin
}) {
  const [u, setU] = reactExports.useState("");
  const [p, setP] = reactExports.useState("");
  const [err, setErr] = reactExports.useState("");
  const submit = (e) => {
    e.preventDefault();
    if (u === ADMIN_USER && p === ADMIN_PASS) {
      setAdminAuthed(true);
      onLogin();
    } else {
      setErr("Invalid credentials");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 py-32 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "w-full max-w-md p-10 rounded-2xl border border-border bg-card shadow-3d", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 mx-auto rounded-2xl bg-gradient-gold flex items-center justify-center shadow-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-6 h-6 text-gold-foreground" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 font-display text-3xl text-center", children: "Admin Access" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-center text-sm text-muted-foreground", children: "JewelReport control panel" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: u, onChange: (e) => setU(e.target.value), placeholder: "Username", className: "w-full bg-input/30 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: p, onChange: (e) => setP(e.target.value), type: "password", placeholder: "Password", className: "w-full bg-input/30 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary" }),
      err && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: err }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-full py-3 rounded-xl bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-[1.02] transition-transform", children: "Sign In" })
    ] })
  ] }) }) });
}
function Dashboard({
  onLogout
}) {
  const [tab, setTab] = reactExports.useState("reports");
  const [certs, setCerts] = reactExports.useState([]);
  const [posts, setPosts] = reactExports.useState([]);
  const refresh = () => {
    setCerts(getCertificates());
    setPosts(getBlogPosts());
  };
  reactExports.useEffect(refresh, []);
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 pt-16 pb-32 mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.35em] text-primary", children: "Control Panel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl", children: "Admin Dashboard" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onLogout, className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:border-primary hover:text-primary transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
        " Sign out"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 inline-flex rounded-full border border-border bg-card p-1", children: [{
      k: "reports",
      label: "Certificates",
      icon: FileText
    }, {
      k: "blog",
      label: "Blog",
      icon: Newspaper
    }].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab(t.k), className: `px-5 py-2 rounded-full inline-flex items-center gap-2 text-sm transition-all ${tab === t.k ? "bg-gradient-gold text-gold-foreground shadow-gold" : "text-muted-foreground hover:text-foreground"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(t.icon, { className: "w-4 h-4" }),
      " ",
      t.label
    ] }, t.k)) }),
    tab === "reports" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl", children: [
          "Certificates (",
          certs.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/cert/$id", params: {
          id: "new"
        }, className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-gold text-gold-foreground shadow-gold font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
          " New Certificate"
        ] })
      ] }),
      certs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { msg: "No certificates yet. Create your first one." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card shadow-elegant overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gradient-navy text-muted-foreground uppercase tracking-widest text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-4", children: "Report No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-4", children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-4", children: "Item" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-4", children: "Carat" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-4", children: "Issued" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-4", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: certs.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 font-mono text-primary", children: c.reportNo }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: c.type }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: c.itemName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: c.caratWeight }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 text-muted-foreground", children: c.issueDate }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
              to: "/verify",
              search: {
                id: c.reportNo
              }
            }), className: "p-2 rounded-lg hover:bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/cert/$id", params: {
              id: c.id
            }, className: "p-2 rounded-lg hover:bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              if (confirm("Delete this certificate?")) {
                deleteCertificate(c.id);
                refresh();
              }
            }, className: "p-2 rounded-lg hover:bg-destructive/10 text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
          ] }) })
        ] }, c.id)) })
      ] }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl", children: [
          "Blog Posts (",
          posts.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/blog/$id", params: {
          id: "new"
        }, className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-gold text-gold-foreground shadow-gold font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
          " New Post"
        ] })
      ] }),
      posts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { msg: "No blog posts yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-5", children: posts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 rounded-2xl border border-border bg-card shadow-elegant", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-xl overflow-hidden bg-gradient-navy shrink-0", children: p.coverDataUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.coverDataUrl, alt: "", className: "w-full h-full object-cover" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg truncate", children: p.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              p.publishedAt,
              " • ",
              p.author
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 line-clamp-2", children: p.excerpt })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog/$slug", params: {
            slug: p.slug
          }, className: "p-2 rounded-lg hover:bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/blog/$id", params: {
            id: p.id
          }, className: "p-2 rounded-lg hover:bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            if (confirm("Delete this post?")) {
              deleteBlogPost(p.id);
              refresh();
            }
          }, className: "p-2 rounded-lg hover:bg-destructive/10 text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
        ] })
      ] }, p.id)) })
    ] })
  ] }) });
}
function Empty({
  msg
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-16 rounded-2xl border border-dashed border-border text-center text-muted-foreground", children: msg });
}
export {
  AdminPage as component
};
