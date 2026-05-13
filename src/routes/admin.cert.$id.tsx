import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import {
  isAdminAuthed, generateReportNo, saveCertificate, getCertificate,
  type Certificate, type ReportType,
} from "@/lib/store";
import { ArrowLeft, Save, Upload } from "lucide-react";

export const Route = createFileRoute("/admin/cert/$id")({
  component: CertEditor,
});

const REPORT_TYPES: ReportType[] = [
  "Lab Grown Diamond",
  "Natural Diamond",
  "Jewellery",
  "Gemstone",
  "Lab Grown Jewellery",
];

function CertEditor() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [authed, setAuthed] = useState(false);
  useEffect(() => {
    if (!isAdminAuthed()) navigate({ to: "/admin" });
    else setAuthed(true);
  }, [navigate]);

  const [cert, setCert] = useState<Certificate>(() => {
    if (!isNew) {
      const found = getCertificate(id);
      if (found) return found;
    }
    return blankCert("Lab Grown Diamond");
  });

  if (!authed) return null;

  const update = <K extends keyof Certificate>(k: K, v: Certificate[K]) =>
    setCert((c) => ({ ...c, [k]: v }));

  const onTypeChange = (t: ReportType) => {
    setCert((c) => ({
      ...c,
      type: t,
      reportNo: isNew ? generateReportNo(t) : c.reportNo,
    }));
  };

  const onImage = async (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("imageDataUrl", reader.result as string);
    reader.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    saveCertificate({ ...cert, createdAt: cert.createdAt || Date.now() });
    navigate({ to: "/admin" });
  };

  return (
    <Layout>
      <section className="px-6 pt-12 pb-32 mx-auto max-w-5xl">
        <Link to="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="mt-6 font-display text-4xl">{isNew ? "New Certificate" : "Edit Certificate"}</h1>
        <p className="text-muted-foreground mt-2">Fill in the report details. PVC card will be generated automatically.</p>

        <form onSubmit={submit} className="mt-10 space-y-8">
          <Section title="Report Information">
            <Field label="Report Type">
              <select value={cert.type} onChange={(e) => onTypeChange(e.target.value as ReportType)} className={inputCls}>
                {REPORT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Report Number">
              <input value={cert.reportNo} onChange={(e) => { update("reportNo", e.target.value); update("id", e.target.value); }} className={inputCls} required />
            </Field>
            <Field label="Issue Date">
              <input type="date" value={cert.issueDate} onChange={(e) => update("issueDate", e.target.value)} className={inputCls} required />
            </Field>
            <Field label="Item Name">
              <input value={cert.itemName} onChange={(e) => update("itemName", e.target.value)} className={inputCls} placeholder="e.g. Round Brilliant Diamond" required />
            </Field>
          </Section>

          <Section title="Specifications">
            <Field label="Shape / Cut Style"><input value={cert.shape} onChange={(e) => update("shape", e.target.value)} className={inputCls} placeholder="Round Brilliant" /></Field>
            <Field label="Carat Weight"><input value={cert.caratWeight} onChange={(e) => update("caratWeight", e.target.value)} className={inputCls} placeholder="1.05 ct" /></Field>
            <Field label="Measurements"><input value={cert.measurements} onChange={(e) => update("measurements", e.target.value)} className={inputCls} placeholder="6.52 × 6.55 × 4.01 mm" /></Field>
            <Field label="Color"><input value={cert.color} onChange={(e) => update("color", e.target.value)} className={inputCls} placeholder="D" /></Field>
            <Field label="Clarity"><input value={cert.clarity} onChange={(e) => update("clarity", e.target.value)} className={inputCls} placeholder="VVS1" /></Field>
            <Field label="Cut Grade"><input value={cert.cut} onChange={(e) => update("cut", e.target.value)} className={inputCls} placeholder="Excellent" /></Field>
            <Field label="Polish"><input value={cert.polish} onChange={(e) => update("polish", e.target.value)} className={inputCls} placeholder="Excellent" /></Field>
            <Field label="Symmetry"><input value={cert.symmetry} onChange={(e) => update("symmetry", e.target.value)} className={inputCls} placeholder="Excellent" /></Field>
            <Field label="Fluorescence"><input value={cert.fluorescence} onChange={(e) => update("fluorescence", e.target.value)} className={inputCls} placeholder="None" /></Field>
            <Field label="Origin"><input value={cert.origin} onChange={(e) => update("origin", e.target.value)} className={inputCls} placeholder="Lab Grown (CVD)" /></Field>
            {(cert.type === "Jewellery" || cert.type === "Lab Grown Jewellery") && (
              <>
                <Field label="Metal"><input value={cert.metal || ""} onChange={(e) => update("metal", e.target.value)} className={inputCls} placeholder="18K Gold" /></Field>
                <Field label="Total Weight"><input value={cert.totalWeight || ""} onChange={(e) => update("totalWeight", e.target.value)} className={inputCls} placeholder="4.20 g" /></Field>
              </>
            )}
          </Section>

          <Section title="Media & Notes">
            <Field label="Item Image" full>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border hover:border-primary cursor-pointer">
                  <Upload className="w-4 h-4" /> Upload Image
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => onImage(e.target.files?.[0])} />
                </label>
                {cert.imageDataUrl && <img src={cert.imageDataUrl} alt="" className="w-20 h-20 object-cover rounded-lg border border-border" />}
              </div>
            </Field>
            <Field label="Remarks" full>
              <textarea value={cert.remarks || ""} onChange={(e) => update("remarks", e.target.value)} rows={3} className={inputCls} />
            </Field>
          </Section>

          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-105 transition-transform">
              <Save className="w-4 h-4" /> Save Certificate
            </button>
            <Link to="/admin" className="inline-flex items-center px-6 py-3 rounded-full border border-border hover:border-primary">Cancel</Link>
          </div>
        </form>
      </section>
    </Layout>
  );
}

const inputCls = "w-full bg-input/30 border border-border rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors text-foreground";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl border border-border bg-card shadow-elegant">
      <h2 className="font-display text-xl text-primary">{title}</h2>
      <div className="mt-5 grid sm:grid-cols-2 gap-5">{children}</div>
    </div>
  );
}

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function blankCert(type: ReportType): Certificate {
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
