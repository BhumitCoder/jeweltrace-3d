import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  generateReportNo, saveCertificate, getCertificate,
  type Certificate, type ReportType,
} from "@/lib/store";
import { ArrowLeft, Save, Upload, RefreshCw, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/cert/$id")({
  component: CertEditor,
});

const REPORT_TYPES: ReportType[] = [
  "Lab Grown Diamond",
  "Jewellery",
  "Gemstone",
  "Lab Grown Jewellery",
];

function makeCert(type: ReportType = "Lab Grown Diamond"): Certificate {
  const reportNo = generateReportNo(type);
  return {
    id: reportNo, reportNo, type,
    issueDate: new Date().toISOString().slice(0, 10),
    itemName: "", shape: "", caratWeight: "", measurements: "",
    color: "", clarity: "", cut: "", polish: "", symmetry: "",
    fluorescence: "", origin: "", metal: "", totalWeight: "", remarks: "",
    createdAt: Date.now(),
  };
}

function CertEditor() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [cert, setCert] = useState<Certificate | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew) {
      setCert(makeCert());
    } else {
      const found = getCertificate(id);
      if (found) setCert(found);
      else navigate({ to: "/admin" });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!cert) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const set = <K extends keyof Certificate>(k: K, v: Certificate[K]) =>
    setCert((c) => c ? { ...c, [k]: v } : c);

  const changeType = (t: ReportType) => {
    const no = isNew ? generateReportNo(t) : cert.reportNo;
    setCert((c) => c ? { ...c, type: t, reportNo: no, id: no } : c);
  };

  const onImage = (file?: File) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => set("imageDataUrl", r.result as string);
    r.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cert || saving) return;
    setSaving(true);
    saveCertificate({ ...cert, createdAt: cert.createdAt || Date.now() });
    navigate({ to: "/admin" });
  };

  const isJewellery = cert.type === "Jewellery" || cert.type === "Lab Grown Jewellery";

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <Link to="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="mt-6 mb-8">
        <h1 className="font-display text-3xl">{isNew ? "New Certificate" : "Edit Certificate"}</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Fill in all report details. The PVC card is auto-generated and can be downloaded from the Verify page.
        </p>
      </div>

      <form onSubmit={submit} className="space-y-6">

        {/* Report Type */}
        <Card title="Report Type" sub="Select the category for this certificate">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {REPORT_TYPES.map((t) => (
              <button key={t} type="button" onClick={() => changeType(t)}
                className={`px-3 py-3 rounded-xl border text-sm text-center transition-all ${
                  cert.type === t
                    ? "border-primary bg-primary/10 text-primary font-medium"
                    : "border-border hover:border-primary/50 text-muted-foreground"
                }`}>
                {t}
              </button>
            ))}
          </div>
        </Card>

        {/* Core Info */}
        <Card title="Report Information" sub="Core identification fields">
          <div className="grid sm:grid-cols-2 gap-5">
            <F label="Report Number" required>
              <div className="flex gap-2">
                <input value={cert.reportNo}
                  onChange={(e) => { set("reportNo", e.target.value); set("id", e.target.value); }}
                  className={ic} required />
                {isNew && (
                  <button type="button" onClick={() => { const n = generateReportNo(cert.type); setCert(c => c ? { ...c, reportNo: n, id: n } : c); }}
                    className="px-3 rounded-xl border border-border hover:border-primary text-muted-foreground hover:text-primary transition-colors shrink-0" title="Regenerate">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </F>
            <F label="Issue Date" required>
              <input type="date" value={cert.issueDate} onChange={(e) => set("issueDate", e.target.value)} className={ic} required />
            </F>
            <F label="Item Name" required>
              <input value={cert.itemName} onChange={(e) => set("itemName", e.target.value)} className={ic} placeholder="e.g. Round Brilliant Diamond" required />
            </F>
            <F label="Shape / Cut Style">
              <input value={cert.shape} onChange={(e) => set("shape", e.target.value)} className={ic} placeholder="Round Brilliant" />
            </F>
          </div>
        </Card>

        {/* Grading */}
        <Card title="Grading Details" sub="Laboratory measurements and grades">
          <div className="grid sm:grid-cols-2 gap-5">
            <F label="Carat Weight"><input value={cert.caratWeight} onChange={(e) => set("caratWeight", e.target.value)} className={ic} placeholder="1.05 ct" /></F>
            <F label="Measurements"><input value={cert.measurements} onChange={(e) => set("measurements", e.target.value)} className={ic} placeholder="6.52 × 6.55 × 4.01 mm" /></F>
            <F label="Color"><input value={cert.color} onChange={(e) => set("color", e.target.value)} className={ic} placeholder="D" /></F>
            <F label="Clarity"><input value={cert.clarity} onChange={(e) => set("clarity", e.target.value)} className={ic} placeholder="VVS1" /></F>
            <F label="Cut Grade"><input value={cert.cut} onChange={(e) => set("cut", e.target.value)} className={ic} placeholder="Excellent" /></F>
            <F label="Polish"><input value={cert.polish} onChange={(e) => set("polish", e.target.value)} className={ic} placeholder="Excellent" /></F>
            <F label="Symmetry"><input value={cert.symmetry} onChange={(e) => set("symmetry", e.target.value)} className={ic} placeholder="Excellent" /></F>
            <F label="Fluorescence"><input value={cert.fluorescence} onChange={(e) => set("fluorescence", e.target.value)} className={ic} placeholder="None" /></F>
            <F label="Origin"><input value={cert.origin} onChange={(e) => set("origin", e.target.value)} className={ic} placeholder={isJewellery ? "Natural / Lab Grown" : "Lab Grown (CVD)"} /></F>
            {isJewellery && <>
              <F label="Metal"><input value={cert.metal || ""} onChange={(e) => set("metal", e.target.value)} className={ic} placeholder="18K Yellow Gold" /></F>
              <F label="Total Weight"><input value={cert.totalWeight || ""} onChange={(e) => set("totalWeight", e.target.value)} className={ic} placeholder="4.20 g" /></F>
            </>}
          </div>
        </Card>

        {/* Media */}
        <Card title="Media & Notes" sub="Item photo and any additional remarks">
          <div className="grid sm:grid-cols-2 gap-5">
            <F label="Item Image">
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:border-primary cursor-pointer text-sm transition-colors">
                  <Upload className="w-4 h-4" /> Upload Image
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => onImage(e.target.files?.[0])} />
                </label>
                {cert.imageDataUrl && (
                  <div className="relative">
                    <img src={cert.imageDataUrl} alt="" className="w-16 h-16 object-cover rounded-xl border border-border" />
                    <button type="button" onClick={() => set("imageDataUrl", undefined)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-white text-[10px] flex items-center justify-center leading-none">×</button>
                  </div>
                )}
              </div>
            </F>
            <F label="Remarks">
              <textarea value={cert.remarks || ""} onChange={(e) => set("remarks", e.target.value)} rows={3} className={ic} placeholder="Any additional notes for this report..." />
            </F>
          </div>
        </Card>

        <div className="flex gap-3 pt-2 pb-10">
          <button type="submit" disabled={saving}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-105 transition-transform disabled:opacity-60 disabled:scale-100">
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <><Save className="w-4 h-4" /> Save Certificate</>}
          </button>
          <Link to="/admin"
            className="inline-flex items-center px-6 py-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

const ic = "w-full bg-input/30 border border-border rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors text-foreground text-sm";

function Card({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm shadow-elegant">
      <div className="mb-5">
        <h2 className="font-display text-lg">{title}</h2>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
      {children}
    </div>
  );
}

function F({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}{required && <span className="text-primary ml-0.5">*</span>}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
