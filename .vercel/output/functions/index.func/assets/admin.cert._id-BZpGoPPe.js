import { r as reactExports, T as jsxRuntimeExports } from "./server-BcffvMK2.js";
import { b as Route, a as useNavigate, L as Link } from "./router-Ctblab6t.js";
import { L as Layout } from "./Layout-Cc5lLsVc.js";
import { i as isAdminAuthed, g as getCertificate, h as generateReportNo, j as saveCertificate } from "./store-BKso1y8A.js";
import { A as ArrowLeft } from "./arrow-left-D-tWFjPB.js";
import { U as Upload, S as Save } from "./upload-sAw98O76.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const REPORT_TYPES = ["Lab Grown Diamond", "Natural Diamond", "Jewellery", "Gemstone", "Lab Grown Jewellery"];
function CertEditor() {
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
  const [cert, setCert] = reactExports.useState(() => {
    if (!isNew) {
      const found = getCertificate(id);
      if (found) return found;
    }
    return blankCert("Lab Grown Diamond");
  });
  if (!authed) return null;
  const update = (k, v) => setCert((c) => ({
    ...c,
    [k]: v
  }));
  const onTypeChange = (t) => {
    setCert((c) => ({
      ...c,
      type: t,
      reportNo: isNew ? generateReportNo(t) : c.reportNo
    }));
  };
  const onImage = async (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("imageDataUrl", reader.result);
    reader.readAsDataURL(file);
  };
  const submit = (e) => {
    e.preventDefault();
    saveCertificate({
      ...cert,
      createdAt: cert.createdAt || Date.now()
    });
    navigate({
      to: "/admin"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 pt-12 pb-32 mx-auto max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
      " Back to Dashboard"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 font-display text-4xl", children: isNew ? "New Certificate" : "Edit Certificate" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Fill in the report details. PVC card will be generated automatically." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mt-10 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Report Information", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Report Type", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: cert.type, onChange: (e) => onTypeChange(e.target.value), className: inputCls, children: REPORT_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t, children: t }, t)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Report Number", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: cert.reportNo, onChange: (e) => {
          update("reportNo", e.target.value);
          update("id", e.target.value);
        }, className: inputCls, required: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Issue Date", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: cert.issueDate, onChange: (e) => update("issueDate", e.target.value), className: inputCls, required: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Item Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: cert.itemName, onChange: (e) => update("itemName", e.target.value), className: inputCls, placeholder: "e.g. Round Brilliant Diamond", required: true }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Specifications", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Shape / Cut Style", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: cert.shape, onChange: (e) => update("shape", e.target.value), className: inputCls, placeholder: "Round Brilliant" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Carat Weight", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: cert.caratWeight, onChange: (e) => update("caratWeight", e.target.value), className: inputCls, placeholder: "1.05 ct" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Measurements", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: cert.measurements, onChange: (e) => update("measurements", e.target.value), className: inputCls, placeholder: "6.52 × 6.55 × 4.01 mm" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Color", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: cert.color, onChange: (e) => update("color", e.target.value), className: inputCls, placeholder: "D" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Clarity", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: cert.clarity, onChange: (e) => update("clarity", e.target.value), className: inputCls, placeholder: "VVS1" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Cut Grade", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: cert.cut, onChange: (e) => update("cut", e.target.value), className: inputCls, placeholder: "Excellent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Polish", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: cert.polish, onChange: (e) => update("polish", e.target.value), className: inputCls, placeholder: "Excellent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Symmetry", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: cert.symmetry, onChange: (e) => update("symmetry", e.target.value), className: inputCls, placeholder: "Excellent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Fluorescence", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: cert.fluorescence, onChange: (e) => update("fluorescence", e.target.value), className: inputCls, placeholder: "None" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Origin", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: cert.origin, onChange: (e) => update("origin", e.target.value), className: inputCls, placeholder: "Lab Grown (CVD)" }) }),
        (cert.type === "Jewellery" || cert.type === "Lab Grown Jewellery") && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Metal", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: cert.metal || "", onChange: (e) => update("metal", e.target.value), className: inputCls, placeholder: "18K Gold" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Total Weight", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: cert.totalWeight || "", onChange: (e) => update("totalWeight", e.target.value), className: inputCls, placeholder: "4.20 g" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Media & Notes", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Item Image", full: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border hover:border-primary cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
            " Upload Image",
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => onImage(e.target.files?.[0]) })
          ] }),
          cert.imageDataUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: cert.imageDataUrl, alt: "", className: "w-20 h-20 object-cover rounded-lg border border-border" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Remarks", full: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: cert.remarks || "", onChange: (e) => update("remarks", e.target.value), rows: 3, className: inputCls }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-105 transition-transform", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
          " Save Certificate"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", className: "inline-flex items-center px-6 py-3 rounded-full border border-border hover:border-primary", children: "Cancel" })
      ] })
    ] })
  ] }) });
}
const inputCls = "w-full bg-input/30 border border-border rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors text-foreground";
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 rounded-2xl border border-border bg-card shadow-elegant", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-primary", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid sm:grid-cols-2 gap-5", children })
  ] });
}
function Field({
  label,
  full,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: full ? "sm:col-span-2" : "", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children })
  ] });
}
function blankCert(type) {
  const reportNo = generateReportNo(type);
  return {
    id: reportNo,
    reportNo,
    type,
    issueDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    itemName: "",
    shape: "",
    caratWeight: "",
    measurements: "",
    color: "",
    clarity: "",
    cut: "",
    polish: "",
    symmetry: "",
    fluorescence: "",
    origin: "",
    metal: "",
    totalWeight: "",
    remarks: "",
    createdAt: Date.now()
  };
}
export {
  CertEditor as component
};
