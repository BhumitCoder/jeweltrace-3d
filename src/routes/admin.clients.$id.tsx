import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getClient, saveClient } from "@/lib/db";
import type { Client } from "@/lib/store";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/clients/$id")({
  component: ClientEditor,
});

function makeClient(): Client {
  return {
    id: crypto.randomUUID(),
    name: "",
    phone: "",
    email: "",
    address: "",
    createdAt: Date.now(),
  };
}

function ClientEditor() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [client, setClient] = useState<Client | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew) {
      setClient(makeClient());
    } else {
      getClient(id).then((found) => {
        if (found) setClient(found);
        else navigate({ to: "/admin" });
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!client) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const set = <K extends keyof Client>(k: K, v: Client[K]) =>
    setClient((c) => (c ? { ...c, [k]: v } : c));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!client || saving) return;
    setSaving(true);
    try {
      await saveClient({ ...client, createdAt: client.createdAt || Date.now() });
      toast.success(isNew ? "Client created!" : "Client updated!", {
        description: client.name,
      });
      navigate({ to: "/admin" });
    } catch {
      toast.error("Failed to save client", { description: "Check your connection and try again." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <Link
        to="/admin"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="mt-6 mb-8">
        <h1 className="font-display text-3xl">
          {isNew ? "New Client" : "Edit Client"}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Client details are linked to their certificates for easy management.
        </p>
      </div>

      <form onSubmit={submit} className="space-y-6">
        <div className="p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm shadow-elegant">
          <div className="mb-5">
            <h2 className="font-display text-lg">Client Information</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Contact and identification details
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <F label="Full Name" required>
              <input
                value={client.name}
                onChange={(e) => set("name", e.target.value)}
                className={ic}
                placeholder="e.g. Ravi Jewellers Pvt. Ltd."
                required
              />
            </F>
            <F label="Phone Number" required>
              <input
                value={client.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={ic}
                placeholder="+91 98765 43210"
                required
              />
            </F>
            <F label="Email Address">
              <input
                type="email"
                value={client.email || ""}
                onChange={(e) => set("email", e.target.value)}
                className={ic}
                placeholder="client@example.com"
              />
            </F>
            <F label="Address">
              <input
                value={client.address || ""}
                onChange={(e) => set("address", e.target.value)}
                className={ic}
                placeholder="Shop No., Street, City"
              />
            </F>
          </div>
        </div>

        <div className="flex gap-3 pt-2 pb-10">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-105 transition-transform disabled:opacity-60 disabled:scale-100"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving…
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Client
              </>
            )}
          </button>
          <Link
            to="/admin"
            className="inline-flex items-center px-6 py-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

const ic =
  "w-full bg-input/30 border border-border rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors text-foreground text-sm";

function F({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
        {required && <span className="text-primary ml-0.5">*</span>}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
