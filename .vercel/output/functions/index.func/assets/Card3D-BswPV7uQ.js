import { c as createLucideIcon, l as logo } from "./Layout-Cc5lLsVc.js";
import { T as jsxRuntimeExports } from "./server-BcffvMK2.js";
import { Q as QRCodeSVG } from "./proxy-DD0B47Rh.js";
const __iconNode$4 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$4);
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M21.54 15H17a2 2 0 0 0-2 2v4.54", key: "1djwo0" }],
  [
    "path",
    {
      d: "M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17",
      key: "1tzkfa"
    }
  ],
  ["path", { d: "M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05", key: "14pb5j" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const Earth = createLucideIcon("earth", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M10.5 3 8 9l4 13 4-13-2.5-6", key: "b3dvk1" }],
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z",
      key: "7w4byz"
    }
  ],
  ["path", { d: "M2 9h20", key: "16fsjt" }]
];
const Gem = createLucideIcon("gem", __iconNode$1);
const __iconNode = [
  ["path", { d: "M6 18h8", key: "1borvv" }],
  ["path", { d: "M3 22h18", key: "8prr45" }],
  ["path", { d: "M14 22a7 7 0 1 0 0-14h-1", key: "1jwaiy" }],
  ["path", { d: "M9 14h2", key: "197e7h" }],
  ["path", { d: "M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z", key: "1bmzmy" }],
  ["path", { d: "M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3", key: "1drr47" }]
];
const Microscope = createLucideIcon("microscope", __iconNode);
function Card3D({ width = 420 }) {
  const w = width;
  const h = Math.round(w / 1.586);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative mx-auto",
      style: { width: w, height: h, perspective: 1600 },
      "aria-hidden": true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute -inset-16 rounded-full blur-3xl opacity-60",
            style: {
              background: "radial-gradient(circle, oklch(0.78 0.14 80 / 0.35), transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute left-1/2 -bottom-8 -translate-x-1/2 rounded-[50%] blur-2xl",
            style: {
              width: w * 0.85,
              height: 24,
              background: "rgba(0,0,0,0.55)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative w-full h-full animate-card-spin",
            style: { transformStyle: "preserve-3d" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardFace, { side: "front", w, h }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardFace, { side: "back", w, h })
            ]
          }
        )
      ]
    }
  );
}
function CardFace({
  side,
  w,
  h
}) {
  const isBack = side === "back";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "absolute inset-0 overflow-hidden text-white",
      style: {
        borderRadius: 22,
        backfaceVisibility: "hidden",
        transform: isBack ? "rotateY(180deg)" : "rotateY(0deg)",
        background: "linear-gradient(135deg, oklch(0.20 0.06 265) 0%, oklch(0.10 0.04 265) 60%, oklch(0.22 0.07 265) 100%)",
        boxShadow: "0 30px 70px -20px rgba(0,0,0,0.7), inset 0 0 0 1.5px rgba(212,175,55,0.55)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 opacity-30 pointer-events-none animate-holo bg-holo",
            style: { mixBlendMode: "screen" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            className: "absolute inset-0 w-full h-full opacity-[0.10] pointer-events-none",
            viewBox: "0 0 856 540",
            preserveAspectRatio: "none",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("pattern", { id: `g3d-${side}`, width: "22", height: "22", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 22 0 L 0 0 0 22", fill: "none", stroke: "#D4AF37", strokeWidth: "0.5" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "856", height: "540", fill: `url(#g3d-${side})` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "428", cy: "270", r: "220", fill: "none", stroke: "#D4AF37", strokeWidth: "0.7" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-2 pointer-events-none",
            style: {
              borderRadius: 18,
              border: "1px solid",
              borderImage: "linear-gradient(135deg, #f5d97a, #b8862e, #f5d97a) 1"
            }
          }
        ),
        isBack ? /* @__PURE__ */ jsxRuntimeExports.jsx(BackContent, { w, h }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FrontContent, { w, h })
      ]
    }
  );
}
function FrontContent({ w, h }) {
  const pad = w * 0.05;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative h-full w-full flex flex-col",
      style: { padding: pad },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: logo,
                alt: "",
                style: { width: w * 0.09, height: w * 0.09 },
                className: "object-contain"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    fontFamily: "Playfair Display, serif",
                    fontSize: w * 0.05,
                    lineHeight: 1
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: "Jewel" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#E8C56A" }, children: "Report" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: { fontSize: w * 0.018, letterSpacing: "0.3em" },
                  className: "uppercase text-white/60 mt-1",
                  children: "Certification Lab"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: { fontSize: w * 0.018, letterSpacing: "0.25em" },
                className: "uppercase text-white/60",
                children: "Report No."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "font-mono",
                style: { fontSize: w * 0.034, color: "#E8C56A", letterSpacing: "0.06em" },
                children: "LGD-25-481209"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 mt-3 flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-lg flex items-center justify-center",
              style: {
                width: w * 0.26,
                height: w * 0.26,
                background: "linear-gradient(135deg, rgba(212,175,55,0.18), rgba(255,255,255,0.05))",
                border: "1px solid rgba(212,175,55,0.45)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 100", style: { width: "75%", height: "75%" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "dg3d", x1: "0", y1: "0", x2: "1", y2: "1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#E8F4FF" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#5B7FB6" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "polygon",
                  {
                    points: "20,40 50,15 80,40 50,90",
                    fill: "url(#dg3d)",
                    stroke: "#E8C56A",
                    strokeWidth: "0.6"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "20,40 35,40 50,15", fill: "#fff", opacity: "0.35" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "20", y1: "40", x2: "80", y2: "40", stroke: "#E8C56A", strokeWidth: "0.4", opacity: "0.6" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex-1 grid grid-cols-2 gap-x-3 gap-y-1.5",
              style: { fontSize: w * 0.026 },
              children: [
                ["Type", "Lab Grown"],
                ["Shape", "Round"],
                ["Carat", "1.52 ct"],
                ["Color", "D"],
                ["Clarity", "VVS1"],
                ["Cut", "Excellent"]
              ].map(([l, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-white/10 pb-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "uppercase text-white/55",
                    style: { fontSize: w * 0.017, letterSpacing: "0.2em" },
                    children: l
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white", children: v })
              ] }, l))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-end justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "uppercase text-white/60",
                style: { fontSize: w * 0.018, letterSpacing: "0.25em" },
                children: "Issue Date"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#E8C56A", fontSize: w * 0.028 }, children: "13 May 2026" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-white/50 mt-1",
                style: { fontSize: w * 0.016, letterSpacing: "0.25em" },
                children: "SCAN TO VERIFY"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-1.5 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QRCodeSVG, { value: "https://jewelreport.com", size: Math.round(w * 0.16), level: "M" }) })
        ] })
      ]
    }
  );
}
function BackContent({ w }) {
  const pad = w * 0.05;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full w-full flex flex-col", style: { padding: pad }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            fontFamily: "Playfair Display, serif",
            color: "#E8C56A",
            fontSize: w * 0.05
          },
          children: "Certificate Details"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-px mx-auto mt-1.5",
          style: {
            width: w * 0.18,
            background: "linear-gradient(90deg, transparent, #E8C56A, transparent)"
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex-1 mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5",
        style: { fontSize: w * 0.026 },
        children: [
          ["Measurements", "7.32 × 7.34 × 4.51 mm"],
          ["Polish", "Excellent"],
          ["Symmetry", "Excellent"],
          ["Fluorescence", "None"],
          ["Origin", "Lab Grown · CVD"],
          ["Issued", "13 May 2026"]
        ].map(([l, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-white/10 pb-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "uppercase text-white/55",
              style: { fontSize: w * 0.017, letterSpacing: "0.2em" },
              children: l
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white", children: v })
        ] }, l))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-white/55",
        style: { fontSize: w * 0.017 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Property of JewelReport Lab." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#E8C56A", letterSpacing: "0.2em" }, children: "JEWELREPORT.COM" })
        ]
      }
    )
  ] });
}
export {
  Award as A,
  Card3D as C,
  Earth as E,
  Gem as G,
  Microscope as M,
  CircleCheck as a
};
