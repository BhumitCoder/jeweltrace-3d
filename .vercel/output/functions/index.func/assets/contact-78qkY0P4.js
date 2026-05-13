import { r as reactExports, T as jsxRuntimeExports } from "./server-BcffvMK2.js";
import { c as createLucideIcon, L as Layout } from "./Layout-Cc5lLsVc.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-Ctblab6t.js";
const __iconNode$3 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function ContactPage() {
  const [sent, setSent] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 pt-20 pb-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.35em] text-primary", children: "Get in Touch" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 font-display text-5xl md:text-6xl", children: [
        "We'd love to ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-gold", children: "hear from you" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 pb-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl grid lg:grid-cols-5 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-6", children: [{
        icon: MapPin,
        title: "Visit",
        lines: ["JewelReport Tower", "Diamond District, Mumbai 400001"]
      }, {
        icon: Phone,
        title: "Call",
        lines: ["+91 22 1234 5678", "Mon – Sat, 10:00 – 19:00 IST"]
      }, {
        icon: Mail,
        title: "Email",
        lines: ["reports@jewelreport.com", "support@jewelreport.com"]
      }].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 rounded-2xl border border-border bg-card shadow-elegant flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shrink-0 shadow-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "w-5 h-5 text-gold-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg", children: c.title }),
          c.lines.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: l }, l))
        ] })
      ] }, c.title)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        setSent(true);
      }, className: "lg:col-span-3 p-8 rounded-2xl border border-border bg-card shadow-elegant space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Name", name: "name", required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Email", name: "email", type: "email", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Subject", name: "subject", required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, rows: 6, className: "mt-2 w-full bg-input/30 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-105 transition-transform", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
          " Send Message"
        ] }),
        sent && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-primary", children: "Thanks — we'll be in touch shortly." })
      ] })
    ] }) })
  ] });
}
function Input({
  label,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...rest, className: "mt-2 w-full bg-input/30 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" })
  ] });
}
export {
  ContactPage as component
};
