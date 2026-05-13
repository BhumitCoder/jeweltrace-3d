import { r as reactExports, T as jsxRuntimeExports } from "./server-BcffvMK2.js";
import { u as useSearch } from "./router-Ctblab6t.js";
import { c as createLucideIcon, l as logo, L as Layout } from "./Layout-Cc5lLsVc.js";
import { Q as QRCodeSVG, M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion, S as ShieldCheck } from "./proxy-DD0B47Rh.js";
import { g as getCertificate } from "./store-BKso1y8A.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode$1);
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const CARD_W = 856;
const CARD_H = 540;
const CertificateCard = reactExports.forwardRef(function CertificateCard2({ cert, side }, ref) {
  const verifyUrl = typeof window !== "undefined" ? `${window.location.origin}/verify?id=${encodeURIComponent(cert.reportNo)}` : `/verify?id=${cert.reportNo}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      className: "relative overflow-hidden text-white",
      style: {
        width: CARD_W,
        height: CARD_H,
        borderRadius: 28,
        background: "linear-gradient(135deg, oklch(0.18 0.05 265) 0%, oklch(0.10 0.04 265) 60%, oklch(0.20 0.06 265) 100%)",
        boxShadow: "0 25px 60px -20px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(212,175,55,0.4)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 opacity-25 pointer-events-none animate-holo bg-holo",
            style: { mixBlendMode: "screen" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            className: "absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none",
            viewBox: "0 0 856 540",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("pattern", { id: "grid", width: "22", height: "22", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 22 0 L 0 0 0 22", fill: "none", stroke: "#D4AF37", strokeWidth: "0.4" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "856", height: "540", fill: "url(#grid)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "428", cy: "270", r: "220", fill: "none", stroke: "#D4AF37", strokeWidth: "0.6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "428", cy: "270", r: "180", fill: "none", stroke: "#D4AF37", strokeWidth: "0.4" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-3 rounded-[22px] pointer-events-none",
            style: { border: "1.5px solid", borderImage: "linear-gradient(135deg, #f5d97a, #b8862e, #f5d97a) 1" }
          }
        ),
        side === "front" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FrontSide, { cert, verifyUrl }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BackSide, { cert })
      ]
    }
  );
});
function FrontSide({ cert, verifyUrl }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full w-full p-8 flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "", className: "h-14 w-14 object-contain", crossOrigin: "anonymous" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontFamily: "Playfair Display, serif" }, className: "text-2xl leading-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: "Jewel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#E8C56A" }, children: "Report" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] tracking-[0.35em] uppercase text-white/60 mt-1", children: "Certification Lab" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-[0.25em] text-white/60", children: "Report No." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-mono tracking-wider", style: { color: "#E8C56A" }, children: cert.reportNo })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex-1 flex gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-44 h-44 rounded-xl overflow-hidden flex items-center justify-center",
          style: {
            background: "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(255,255,255,0.05))",
            border: "1px solid rgba(212,175,55,0.4)"
          },
          children: cert.imageDataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: cert.imageDataUrl, alt: "", className: "w-full h-full object-cover", crossOrigin: "anonymous" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 100", className: "w-28 h-28", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "dg", x1: "0", y1: "0", x2: "1", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#E8F4FF" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#5B7FB6" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "20,40 50,15 80,40 50,90", fill: "url(#dg)", stroke: "#E8C56A", strokeWidth: "0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "20,40 35,40 50,15", fill: "#fff", opacity: "0.3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "20", y1: "40", x2: "80", y2: "40", stroke: "#E8C56A", strokeWidth: "0.4", opacity: "0.6" })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 grid grid-cols-2 gap-x-5 gap-y-2 text-[12px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Spec, { label: "Type", value: cert.type }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Spec, { label: "Item", value: cert.itemName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Spec, { label: "Shape", value: cert.shape }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Spec, { label: "Carat", value: cert.caratWeight }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Spec, { label: "Color", value: cert.color }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Spec, { label: "Clarity", value: cert.clarity }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Spec, { label: "Cut", value: cert.cut }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Spec, { label: "Origin", value: cert.origin })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-end justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-[0.25em] text-white/60", children: "Issue Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", style: { color: "#E8C56A" }, children: cert.issueDate }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-[9px] tracking-[0.25em] text-white/50", children: "SCAN TO VERIFY AUTHENTICITY" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-2 rounded-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QRCodeSVG, { value: verifyUrl, size: 86, level: "M" }) })
    ] })
  ] });
}
function BackSide({ cert }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full w-full p-8 flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontFamily: "Playfair Display, serif", color: "#E8C56A" }, className: "text-2xl", children: "Certificate Details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-px w-24 mx-auto mt-2",
          style: { background: "linear-gradient(90deg, transparent, #E8C56A, transparent)" }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex-1 grid grid-cols-2 gap-x-6 gap-y-2 text-[12px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Spec, { label: "Measurements", value: cert.measurements }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Spec, { label: "Polish", value: cert.polish }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Spec, { label: "Symmetry", value: cert.symmetry }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Spec, { label: "Fluorescence", value: cert.fluorescence }),
      cert.metal && /* @__PURE__ */ jsxRuntimeExports.jsx(Spec, { label: "Metal", value: cert.metal }),
      cert.totalWeight && /* @__PURE__ */ jsxRuntimeExports.jsx(Spec, { label: "Total Weight", value: cert.totalWeight }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Spec, { label: "Report No.", value: cert.reportNo }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Spec, { label: "Issued", value: cert.issueDate })
    ] }),
    cert.remarks && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-[0.25em] text-white/60", children: "Remarks" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/85 leading-snug", children: cert.remarks })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[9px] text-white/55", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "This card is the property of JewelReport Certification Lab." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tracking-widest", style: { color: "#E8C56A" }, children: "JEWELREPORT.COM" })
    ] })
  ] });
}
function Spec({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-white/10 pb-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[8.5px] uppercase tracking-[0.2em] text-white/55", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-white", children: value || "—" })
  ] });
}
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = children.props?.ref ?? children?.ref;
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      ref.current?.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender?.();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && safeToRemove?.();
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
function VerifyPage() {
  const search = useSearch({
    from: "/verify"
  });
  const [query, setQuery] = reactExports.useState(search.id || "");
  const [searched, setSearched] = reactExports.useState(false);
  const [cert, setCert] = reactExports.useState();
  reactExports.useEffect(() => {
    if (search.id) {
      const c = getCertificate(search.id);
      setCert(c);
      setSearched(true);
    }
  }, [search.id]);
  const onSearch = (e) => {
    e?.preventDefault();
    const c = getCertificate(query.trim());
    setCert(c);
    setSearched(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 pt-20 pb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.35em] text-primary", children: "Authenticity Check" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 font-display text-5xl md:text-6xl", children: [
        "Verify your ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-gold", children: "JewelReport" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-muted-foreground", children: "Enter the report number printed on your certificate card to confirm its details." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: onSearch, className: "mt-10 flex gap-3 p-2 rounded-full bg-card border border-border shadow-elegant max-w-xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "e.g. LGD-25-123456", className: "flex-1 bg-transparent px-5 py-3 outline-none text-foreground placeholder:text-muted-foreground/60 font-mono tracking-wider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "px-6 py-3 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold flex items-center gap-2 hover:scale-105 transition-transform", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
          " Verify"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 pb-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-6xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
      searched && !cert && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, exit: {
        opacity: 0
      }, className: "max-w-xl mx-auto p-8 rounded-2xl border border-destructive/40 bg-destructive/10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-10 h-10 text-destructive mx-auto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-2xl", children: "Report Not Found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-muted-foreground", children: [
          "No certificate matches “",
          query,
          "”. Please double-check the report number on your card."
        ] })
      ] }, "notfound"),
      cert && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 30
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "space-y-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-6 h-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase tracking-[0.3em] text-sm", children: "Authentic — Verified" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardPreview, { cert }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FullDetails, { cert })
      ] }, cert.id)
    ] }) }) })
  ] });
}
function CardPreview({
  cert
}) {
  const frontRef = reactExports.useRef(null);
  const backRef = reactExports.useRef(null);
  const downloadPdf = async () => {
    const html2canvas = (await import("./html2canvas.esm-C17pzFXx.js")).default;
    const {
      jsPDF
    } = await import("./jspdf.es.min-cRHpREYv.js").then((n) => n.j);
    const opts = {
      backgroundColor: null,
      scale: 2,
      useCORS: true
    };
    const f = await html2canvas(frontRef.current, opts);
    const b = await html2canvas(backRef.current, opts);
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [85.6, 53.98]
    });
    pdf.addImage(f.toDataURL("image/png"), "PNG", 0, 0, 85.6, 53.98);
    pdf.addPage([85.6, 53.98], "landscape");
    pdf.addImage(b.toDataURL("image/png"), "PNG", 0, 0, 85.6, 53.98);
    pdf.save(`${cert.reportNo}.pdf`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-8 justify-items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "origin-top-left scale-[0.55] sm:scale-[0.7] md:scale-[0.85] lg:scale-[0.65] xl:scale-[0.75]", style: {
        width: "fit-content"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CertificateCard, { ref: frontRef, cert, side: "front" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "origin-top-left scale-[0.55] sm:scale-[0.7] md:scale-[0.85] lg:scale-[0.65] xl:scale-[0.75]", style: {
        width: "fit-content"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CertificateCard, { ref: backRef, cert, side: "back" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: downloadPdf, className: "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-105 transition-transform", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
        " Download PVC Card (PDF)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => window.print(), className: "inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-4 h-4" }),
        " Print"
      ] })
    ] })
  ] });
}
function FullDetails({
  cert
}) {
  const rows = [["Report Number", cert.reportNo], ["Report Type", cert.type], ["Item", cert.itemName], ["Issue Date", cert.issueDate], ["Shape", cert.shape], ["Carat Weight", cert.caratWeight], ["Measurements", cert.measurements], ["Color", cert.color], ["Clarity", cert.clarity], ["Cut Grade", cert.cut], ["Polish", cert.polish], ["Symmetry", cert.symmetry], ["Fluorescence", cert.fluorescence], ["Origin", cert.origin], ["Metal", cert.metal], ["Total Weight", cert.totalWeight]].filter(([, v]) => v);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-elegant overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-8 py-6 border-b border-border bg-gradient-navy", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl", children: "Full Certificate Details" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3", children: rows.map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 py-5 border-b border-border/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: k }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-foreground", children: v })
    ] }, k)) }),
    cert.remarks && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 py-5 border-t border-border/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: "Remarks" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-foreground/90", children: cert.remarks })
    ] })
  ] });
}
export {
  VerifyPage as component
};
