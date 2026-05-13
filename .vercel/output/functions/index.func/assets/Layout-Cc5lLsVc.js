import { M as useRouter, r as reactExports, T as jsxRuntimeExports } from "./server-BcffvMK2.js";
import { L as Link } from "./router-Ctblab6t.js";
function useRouterState(opts) {
  const contextRouter = useRouter({ warn: opts?.router === void 0 });
  const router = opts?.router || contextRouter;
  {
    const state = router.stores.__store.get();
    return opts?.select ? opts.select(state) : state;
  }
}
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
];
const Menu = createLucideIcon("menu", __iconNode$1);
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
const logo = "/assets/logo-DSG8pKuX.png";
const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/verify", label: "Verify" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" }
];
function SiteHeader() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const [open, setOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "fixed top-0 left-0 right-0 z-[100] pt-3 px-3 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `mx-auto flex items-center justify-between max-w-6xl h-16 px-5 sm:px-7 rounded-full border bg-background/85 backdrop-blur-2xl transition-all duration-500 ${scrolled ? "max-w-5xl border-primary/45 shadow-[0_12px_45px_-12px_rgba(212,175,55,0.5),0_0_0_1px_rgba(212,175,55,0.2)_inset]" : "border-primary/20 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.5)]"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5 group shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: logo,
                alt: "JewelReport",
                className: "h-9 w-9 object-contain drop-shadow-[0_0_10px_rgba(232,197,106,0.55)] transition-transform duration-500 group-hover:scale-110"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display tracking-tight text-base sm:text-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Jewel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-gold", children: "Report" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block text-[9px] tracking-[0.3em] text-muted-foreground uppercase", children: "Certification Lab" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden lg:flex items-center gap-7", children: [
            NAV.map((n) => {
              const active = path === n.to;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: n.to,
                  className: `relative text-sm tracking-wide transition-colors ${active ? "text-primary" : "text-foreground/80 hover:text-primary"}`,
                  children: [
                    n.label,
                    active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 left-0 right-0 h-px bg-gradient-gold" })
                  ]
                },
                n.to
              );
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/verify",
                className: "inline-flex items-center gap-1.5 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-105 transition-transform px-4 py-1.5 text-xs",
                children: [
                  "Verify",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setOpen(!open),
              className: "lg:hidden text-foreground p-2",
              "aria-label": "Toggle menu",
              children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, {})
            }
          )
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `lg:hidden mx-auto mt-2 overflow-hidden bg-background/95 backdrop-blur-xl border border-border ${scrolled ? "max-w-5xl rounded-2xl mx-3 sm:mx-auto" : "rounded-none border-x-0"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 flex flex-col gap-3", children: NAV.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: n.to,
            onClick: () => setOpen(false),
            className: "py-2 text-foreground/90 hover:text-primary",
            children: n.label
          },
          n.to
        )) })
      }
    )
  ] });
}
function SiteFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "relative mt-32 border-t border-border bg-[var(--navy-deep)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-gold opacity-60" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "JewelReport", className: "h-12 w-12 object-contain" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-2xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Jewel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-gold", children: "Report" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.3em] text-muted-foreground uppercase", children: "Certification Lab" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-sm text-muted-foreground max-w-md leading-relaxed", children: "An internationally recognised laboratory delivering trusted reports for natural diamonds, lab-grown diamonds, gemstones and fine jewellery." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm uppercase tracking-widest text-primary mb-4", children: "Reports" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Lab Grown Diamonds" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Natural Diamonds" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Gemstone Reports" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Jewellery Reports" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm uppercase tracking-widest text-primary mb-4", children: "Company" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "text-muted-foreground hover:text-primary", children: "About" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/verify", className: "text-muted-foreground hover:text-primary", children: "Verify Report" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", className: "text-muted-foreground hover:text-primary", children: "Blog" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "text-muted-foreground hover:text-primary", children: "Contact" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", className: "text-muted-foreground/60 hover:text-primary text-xs", children: "Admin" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-5 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " JewelReport Certification Lab. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tracking-widest uppercase", children: "Trust · Precision · Integrity" })
    ] }) })
  ] });
}
function Layout({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background relative overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none fixed -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-radial-gold blur-3xl opacity-50" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none fixed top-1/2 -right-60 h-[600px] w-[600px] rounded-full bg-radial-gold blur-3xl opacity-30" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "h-24" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 relative z-10", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  ArrowRight as A,
  Layout as L,
  createLucideIcon as c,
  logo as l
};
