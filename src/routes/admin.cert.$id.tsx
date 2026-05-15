import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  generateReportNo, saveCertificate, getCertificate, getClients,
  REPORT_TYPE_LABELS,
  type Certificate, type ReportType, type Client,
} from "@/lib/store";
import { ArrowLeft, Save, Upload, RefreshCw, Loader2, Users, Search, ChevronDown, X, Check } from "lucide-react";

export const Route = createFileRoute("/admin/cert/$id")({
  component: CertEditor,
});

const REPORT_TYPES: ReportType[] = [
  "Natural Diamond",
  "Lab Grown Diamond",
  "Gemstone",
  "Lab Grown Jewellery",
  "Natural Jewellery",
];

function makeCert(type: ReportType = "Lab Grown Diamond"): Certificate {
  const reportNo = generateReportNo(type);
  return {
    id: reportNo, reportNo, type,
    issueDate: new Date().toISOString().slice(0, 10),
    itemName: "", shape: "", caratWeight: "", measurements: "",
    color: "", clarity: "", cut: "", polish: "", symmetry: "",
    fluorescence: "", origin: "", metal: "", metalDescription: "",
    grossWeight: "", netWeight: "",
    diamondShape: "", diamondWeight: "", diamondColor: "", diamondClarity: "", diamondTotalPcs: "",
    gemstoneStone: "", gemstoneOrigin: "", gemstoneShape: "", gemstoneCaratWeight: "", gemstonePcs: "", gemstoneMeasurements: "", gemstoneColorTransparency: "", gemstoneCharacteristics: "",
    remarks: "",
    clientId: "", clientName: "",
    createdAt: Date.now(),
  };
}

function CertEditor() {
  const { id }  = Route.useParams();
  const navigate = useNavigate();
  const isNew    = id === "new";

  const [cert, setCert]       = useState<Certificate | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [saving, setSaving]   = useState(false);

  useEffect(() => {
    setClients(getClients());
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

  const selectClient = (clientId: string) => {
    const cl = clients.find((c) => c.id === clientId);
    setCert((c) => c ? { ...c, clientId, clientName: cl?.name ?? "" } : c);
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

  const isJewellery = cert.type === "Lab Grown Jewellery" || cert.type === "Natural Jewellery";
  const isGemstone = cert.type === "Gemstone";

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <Link to="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="mt-6 mb-8">
        <h1 className="font-display text-3xl">{isNew ? "New Certificate" : "Edit Certificate"}</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Fill in all report details. The PVC card can be printed from the Verify page.
        </p>
      </div>

      <form onSubmit={submit} className="space-y-6">

        {/* Client */}
        <Card title="Client" sub="Select the client this certificate belongs to">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              {clients.length === 0 ? (
                <div className="flex items-center gap-3 p-4 rounded-xl border border-dashed border-border text-sm text-muted-foreground">
                  <Users className="w-4 h-4 shrink-0" />
                  <span>No clients yet.&nbsp;</span>
                  <Link to="/admin/clients/$id" params={{ id: "new" }} className="text-primary hover:underline">
                    Create a client first
                  </Link>
                </div>
              ) : (
                <ClientPicker
                  clients={clients}
                  selectedId={cert.clientId || ""}
                  onChange={selectClient}
                />
              )}
            </div>
            <Link
              to="/admin/clients/$id"
              params={{ id: "new" }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:border-primary text-sm transition-colors whitespace-nowrap text-muted-foreground hover:text-primary"
            >
              <Users className="w-4 h-4" /> New Client
            </Link>
          </div>
        </Card>

        {/* Report Type */}
        <Card title="Report Type" sub="Select the category for this certificate">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {REPORT_TYPES.map((t) => (
              <button key={t} type="button" onClick={() => changeType(t)}
                className={`px-4 py-3 rounded-xl border text-left transition-all ${
                  cert.type === t
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border hover:border-primary/50 text-muted-foreground"
                }`}>
                <span className="block text-[11px] font-bold tracking-widest uppercase leading-tight">
                  {REPORT_TYPE_LABELS[t]}
                </span>
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
                  <button type="button"
                    onClick={() => { const n = generateReportNo(cert.type); setCert(c => c ? { ...c, reportNo: n, id: n } : c); }}
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

        {/* Gemstone — dedicated grading fields */}
        {isGemstone && (
          <Card title="Gemstone Grading Details" sub="Laboratory measurements and grades for the gemstone">
            <div className="grid sm:grid-cols-2 gap-5">
              <F label="Stone"><input value={cert.gemstoneStone || ""} onChange={(e) => set("gemstoneStone", e.target.value)} className={ic} placeholder="e.g. Ruby, Emerald, Sapphire" /></F>
              <F label="Origin"><input value={cert.gemstoneOrigin || ""} onChange={(e) => set("gemstoneOrigin", e.target.value)} className={ic} placeholder="e.g. Burma, Sri Lanka" /></F>
              <F label="Shape and Cutting Style"><input value={cert.gemstoneShape || ""} onChange={(e) => set("gemstoneShape", e.target.value)} className={ic} placeholder="e.g. Oval, Mixed Cut" /></F>
              <F label="Carat Weight"><input value={cert.gemstoneCaratWeight || ""} onChange={(e) => set("gemstoneCaratWeight", e.target.value)} className={ic} placeholder="e.g. 2.45 CT" /></F>
              <F label="PCS"><input value={cert.gemstonePcs || ""} onChange={(e) => set("gemstonePcs", e.target.value)} className={ic} placeholder="e.g. 1" /></F>
              <F label="Measurements"><input value={cert.gemstoneMeasurements || ""} onChange={(e) => set("gemstoneMeasurements", e.target.value)} className={ic} placeholder="e.g. 9.12 x 7.04 x 4.21 mm" /></F>
              <F label="Color and Transparency"><input value={cert.gemstoneColorTransparency || ""} onChange={(e) => set("gemstoneColorTransparency", e.target.value)} className={ic} placeholder="e.g. Vivid Red, Transparent" /></F>
              <F label="Characteristics"><input value={cert.gemstoneCharacteristics || ""} onChange={(e) => set("gemstoneCharacteristics", e.target.value)} className={ic} placeholder="e.g. Eye Clean" /></F>
            </div>
          </Card>
        )}

        {/* Grading — non-jewellery, non-gemstone only */}
        {!isJewellery && !isGemstone && (
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
              <F label="Origin"><input value={cert.origin} onChange={(e) => set("origin", e.target.value)} className={ic} placeholder="Lab Grown (CVD)" /></F>
            </div>
          </Card>
        )}

        {/* Jewellery — Metal */}
        {isJewellery && (
          <Card title="Metal Details" sub="Metal type, description and weight for this jewellery piece">
            <div className="grid sm:grid-cols-2 gap-5">
              <F label="Metal Tested"><input value={cert.metal || ""} onChange={(e) => set("metal", e.target.value)} className={ic} placeholder="18kt" /></F>
              <F label="Metal Description"><input value={cert.metalDescription || ""} onChange={(e) => set("metalDescription", e.target.value)} className={ic} placeholder="YELLOW GOLD" /></F>
              <F label="Gross Weight"><input value={cert.grossWeight || ""} onChange={(e) => set("grossWeight", e.target.value)} className={ic} placeholder="11.709 GRM" /></F>
              <F label="Net Weight"><input value={cert.netWeight || ""} onChange={(e) => set("netWeight", e.target.value)} className={ic} placeholder="10.443 GRM" /></F>
              <F label="Origin"><input value={cert.origin} onChange={(e) => set("origin", e.target.value)} className={ic} placeholder="Natural / Lab Grown" /></F>
            </div>
          </Card>
        )}

        {/* Jewellery — Diamond Details */}
        {isJewellery && (
          <Card title="Diamond Details" sub="Details of diamonds set in this jewellery piece">
            <div className="grid sm:grid-cols-2 gap-5">
              <F label="Shape and Cut"><input value={cert.diamondShape || ""} onChange={(e) => set("diamondShape", e.target.value)} className={ic} placeholder="Round" /></F>
              <F label="Total Est. Weight (CT)"><input value={cert.diamondWeight || ""} onChange={(e) => set("diamondWeight", e.target.value)} className={ic} placeholder="4.34 + 1.98 (111 +19)" /></F>
              <F label="Total PCS"><input value={cert.diamondTotalPcs || ""} onChange={(e) => set("diamondTotalPcs", e.target.value)} className={ic} placeholder="e.g. 130" /></F>
              <F label="Color"><input value={cert.diamondColor || ""} onChange={(e) => set("diamondColor", e.target.value)} className={ic} placeholder="E-F" /></F>
              <F label="Clarity"><input value={cert.diamondClarity || ""} onChange={(e) => set("diamondClarity", e.target.value)} className={ic} placeholder="VVS" /></F>
            </div>
          </Card>
        )}

        {/* Jewellery — Gemstone Details */}
        {isJewellery && (
          <Card title="Gemstone Details" sub="Details of coloured gemstones set in this jewellery piece">
            <div className="grid sm:grid-cols-2 gap-5">
              <F label="Stone"><input value={cert.gemstoneStone || ""} onChange={(e) => set("gemstoneStone", e.target.value)} className={ic} placeholder="e.g. Ruby, Emerald, Sapphire" /></F>
              <F label="Origin"><input value={cert.gemstoneOrigin || ""} onChange={(e) => set("gemstoneOrigin", e.target.value)} className={ic} placeholder="e.g. Burma, Sri Lanka" /></F>
              <F label="Shape and Cutting Style"><input value={cert.gemstoneShape || ""} onChange={(e) => set("gemstoneShape", e.target.value)} className={ic} placeholder="e.g. Oval, Mixed Cut" /></F>
              <F label="Carat Weight"><input value={cert.gemstoneCaratWeight || ""} onChange={(e) => set("gemstoneCaratWeight", e.target.value)} className={ic} placeholder="e.g. 2.45 CT" /></F>
              <F label="PCS"><input value={cert.gemstonePcs || ""} onChange={(e) => set("gemstonePcs", e.target.value)} className={ic} placeholder="e.g. 1" /></F>
              <F label="Measurements"><input value={cert.gemstoneMeasurements || ""} onChange={(e) => set("gemstoneMeasurements", e.target.value)} className={ic} placeholder="e.g. 9.12 x 7.04 x 4.21 mm" /></F>
              <F label="Color and Transparency"><input value={cert.gemstoneColorTransparency || ""} onChange={(e) => set("gemstoneColorTransparency", e.target.value)} className={ic} placeholder="e.g. Vivid Red, Transparent" /></F>
              <F label="Characteristics"><input value={cert.gemstoneCharacteristics || ""} onChange={(e) => set("gemstoneCharacteristics", e.target.value)} className={ic} placeholder="e.g. Eye Clean" /></F>
            </div>
          </Card>
        )}

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
              <textarea value={cert.remarks || ""} onChange={(e) => set("remarks", e.target.value)} rows={3} className={ic} placeholder="Any additional notes for this report…" />
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

function clientInitials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function ClientPicker({
  clients,
  selectedId,
  onChange,
}: {
  clients: Client[];
  selectedId: string;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dropStyle, setDropStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = clients.find((c) => c.id === selectedId) ?? null;

  const filtered = clients.filter((c) => {
    const q = query.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      (c.email ?? "").toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        ref.current && !ref.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = () => {
    if (!open && triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      setDropStyle({
        position: "fixed",
        top: r.bottom + 8,
        left: r.left,
        width: r.width,
        zIndex: 9999,
      });
    }
    setOpen((o) => !o);
    if (!open) setTimeout(() => inputRef.current?.focus(), 50);
  };

  const pick = (id: string) => {
    onChange(id);
    setOpen(false);
    setQuery("");
  };

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all text-sm text-left ${
          open ? "border-primary bg-primary/5" : "border-border bg-input/30 hover:border-primary/50"
        }`}
      >
        {selected ? (
          <>
            <span className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-[11px] font-bold text-gold-foreground shrink-0">
              {clientInitials(selected.name)}
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-medium text-foreground truncate">{selected.name}</span>
              <span className="block text-xs text-muted-foreground truncate">{selected.phone}</span>
            </span>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => { e.stopPropagation(); pick(""); }}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.stopPropagation(); pick(""); } }}
              className="p-1 rounded-lg hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          </>
        ) : (
          <>
            <span className="w-8 h-8 rounded-full border border-dashed border-border flex items-center justify-center shrink-0">
              <Users className="w-3.5 h-3.5 text-muted-foreground" />
            </span>
            <span className="flex-1 text-muted-foreground">Select a client…</span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform shrink-0 ${open ? "rotate-180" : ""}`} />
          </>
        )}
      </button>

      {/* Dropdown — portalled into body to escape all stacking contexts */}
      {open && createPortal(
        <div ref={ref} style={dropStyle} className="rounded-2xl border border-border bg-card shadow-[0_8px_40px_-4px_rgba(0,0,0,0.7)] overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, phone, email…"
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-input/40 border border-border text-sm outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* List */}
          <div className="max-h-60 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">No clients match your search.</div>
            ) : (
              filtered.map((cl) => {
                const isSelected = cl.id === selectedId;
                return (
                  <button
                    key={cl.id}
                    type="button"
                    onClick={() => pick(cl.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      isSelected ? "bg-primary/10" : "hover:bg-muted/30"
                    }`}
                  >
                    <span className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      isSelected ? "bg-gradient-gold text-gold-foreground" : "bg-muted/50 text-foreground/70"
                    }`}>
                      {clientInitials(cl.name)}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-medium text-foreground truncate">{cl.name}</span>
                      <span className="block text-xs text-muted-foreground truncate">{cl.phone}{cl.email ? ` · ${cl.email}` : ""}</span>
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-primary shrink-0" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      , document.body)}
    </div>
  );
}

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
