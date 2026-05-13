import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AdminShell, AdminTopBar } from "@/components/AdminShell";
import { useEffect, useState } from "react";
import {
  isAdminAuthed, generateReportNo, saveCertificate, getCertificate,
  type Certificate, type ReportType,
} from "@/lib/store";
import { ArrowLeft, Save, Upload, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/admin/cert/$id")({
  component: CertEditor,
});

const REPORT_TYPES: ReportType[] = [
  "Lab Grown Diamond",
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
      id: isNew ? generateReportNo(t) : c.id,
    }));
  };

  const regenerateReportNo = () => {
    const no = generateReportNo(cert.type);
    setCert((c) => ({ ...c, reportNo: no, id: no }));
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

  const isJewellery = cert.type === "Jewellery" || cert.type === "Lab Grown Jewellery";

  return (
    <AdminShell>
      <AdminTopBar />
      <div className="mx-auto max-w-5xl px-6 py-8">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="mt-6 mb-8">
          <h1 className="font-display text-3xl">
            {isNew ? "New Certificate" : "Edit Certificate"}
          </h1>
          <p className="text-muted-foreground mt-1.5 text-sm">
            Fill in all report details. The PVC card is generated automatically and can be downloaded from the Verify page.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          {/* Report Information */}
          <Section title="Report Information" subtitle="Core identification details for this certificate">
            <Field label="Report Type" required>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {REPORT_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => onTypeChange(t)}
                    className={`px-3 py-2.5 rounded-xl border text-sm text-center transition-all ${
                      cert.type === t
                        ? "border-primary bg-primary/10 text-primary font-medium"
                        : "border-border hover:border-primary/50 text-muted-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Field>

            <div className="grid sm:grid-cols-2 gap-5 mt-4">
              <Field label="Report Number" required>
                <div className="flex gap-2">
                  <input
                    value={cert.reportNo}
                    onChange={(e) => { update("reportNo", e.target.value); update("id", e.target.value); }}
                    className={ic}
                    required
                  />
                  {isNew && (
                    <button
                      type="button"
                      onClick={regenerateReportNo}
                      className="px-3 rounded-xl border border-border hover:border-primary text-muted-foreground hover:text-primary transition-colors shrink-0"
                      title="Regenerate"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </Field>
              <Field label="Issue Date" required>
                <input type="date" value={cert.issueDate} onChange={(e) => update("issueDate", e.target.value)} className={ic} required />
              </Field>
              <Field label="Item Name" required>
                <input value={cert.itemName} onChange={(e) => update("itemName", e.target.value)} className={ic} placeholder="e.g. Round Brilliant Diamond" required />
              </Field>
              <Field label="Shape / Cut Style">
                <input value={cert.shape} onChange={(e) => update("shape", e.target.value)} className={ic} placeholder="Round Brilliant" />
              </Field>
            </div>
          </Section>

          {/* Grading */}
          <Section title="Grading Details" subtitle="Technical specifications measured in the laboratory">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Carat Weight">
                <input value={cert.caratWeight} onChange={(e) => update("caratWeight", e.target.value)} className={ic} placeholder="1.05 ct" />
              </Field>
              <Field label="Measurements">
                <input value={cert.measurements} onChange={(e) => update("measurements", e.target.value)} className={ic} placeholder="6.52 × 6.55 × 4.01 mm" />
              </Field>
              <Field label="Color">
                <input value={cert.color} onChange={(e) => update("color", e.target.value)} className={ic} placeholder="D" />
              </Field>
              <Field label="Clarity">
                <input value={cert.clarity} onChange={(e) => update("clarity", e.target.value)} className={ic} placeholder="VVS1" />
              </Field>
              <Field label="Cut Grade">
                <input value={cert.cut} onChange={(e) => update("cut", e.target.value)} className={ic} placeholder="Excellent" />
              </Field>
              <Field label="Polish">
                <input value={cert.polish} onChange={(e) => update("polish", e.target.value)} className={ic} placeholder="Excellent" />
              </Field>
              <Field label="Symmetry">
                <input value={cert.symmetry} onChange={(e) => update("symmetry", e.target.value)} className={ic} placeholder="Excellent" />
              </Field>
              <Field label="Fluorescence">
                <input value={cert.fluorescence} onChange={(e) => update("fluorescence", e.target.value)} className={ic} placeholder="None" />
              </Field>
              <Field label="Origin">
                <input value={cert.origin} onChange={(e) => update("origin", e.target.value)} className={ic} placeholder={cert.type === "Lab Grown Diamond" ? "Lab Grown (CVD)" : "Natural"} />
              </Field>
              {isJewellery && (
                <>
                  <Field label="Metal">
                    <input value={cert.metal || ""} onChange={(e) => update("metal", e.target.value)} className={ic} placeholder="18K Yellow Gold" />
                  </Field>
                  <Field label="Total Weight">
                    <input value={cert.totalWeight || ""} onChange={(e) => update("totalWeight", e.target.value)} className={ic} placeholder="4.20 g" />
                  </Field>
                </>
              )}
            </div>
          </Section>

          {/* Media & Notes */}
          <Section title="Media & Notes" subtitle="Optional image and any additional remarks">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Item Image">
                <div className="flex items-center gap-4">
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:border-primary cursor-pointer text-sm transition-colors">
                    <Upload className="w-4 h-4" /> Upload Image
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => onImage(e.target.files?.[0])} />
                  </label>
                  {cert.imageDataUrl && (
                    <div className="relative">
                      <img src={cert.imageDataUrl} alt="" className="w-16 h-16 object-cover rounded-xl border border-border" />
                      <button
                        type="button"
                        onClick={() => update("imageDataUrl", undefined)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-white text-xs flex items-center justify-center"
                      >×</button>
                    </div>
                  )}
                </div>
              </Field>
              <Field label="Remarks">
                <textarea value={cert.remarks || ""} onChange={(e) => update("remarks", e.target.value)} rows={3} className={ic} placeholder="Any additional notes..." />
              </Field>
            </div>
          </Section>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-105 transition-transform"
            >
              <Save className="w-4 h-4" /> Save Certificate
            </button>
            <Link to="/admin" className="inline-flex items-center px-6 py-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}

const ic = "w-full bg-input/30 border border-border rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors text-foreground text-sm";

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm shadow-elegant">
      <div className="mb-5">
        <h2 className="font-display text-lg text-foreground">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}{required && <span className="text-primary ml-0.5">*</span>}
      </label>
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
