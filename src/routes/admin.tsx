import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  isAdminAuthed, setAdminAuthed,
  ADMIN_USER, ADMIN_PASS,
} from "@/lib/store";
import { Gem, Lock } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAuthed(isAdminAuthed());
    setReady(true);
  }, []);

  if (!ready) return null;

  if (!authed) {
    return <Login onLogin={() => setAuthed(true)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <div className="pointer-events-none fixed -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-radial-gold blur-3xl opacity-20" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-radial-gold blur-3xl opacity-10" />

      {/* Admin top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold">
              <Gem className="w-3.5 h-3.5 text-gold-foreground" />
            </div>
            <Link to="/admin" className="font-display text-base tracking-wide hover:text-primary transition-colors">
              JewelReport
            </Link>
            <span className="hidden sm:inline-block text-xs uppercase tracking-[0.2em] text-muted-foreground border border-border rounded-full px-2.5 py-0.5">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="hidden sm:inline-flex text-xs text-muted-foreground hover:text-foreground transition-colors">
              View site
            </Link>
            <button
              onClick={() => { setAdminAuthed(false); setAuthed(false); }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border text-xs hover:border-primary hover:text-primary transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (u === ADMIN_USER && p === ADMIN_PASS) {
      setAdminAuthed(true);
      onLogin();
    } else {
      setErr("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6">
      <div className="pointer-events-none fixed -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-radial-gold blur-3xl opacity-20" />

      <div className="mb-8 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
          <Gem className="w-4 h-4 text-gold-foreground" />
        </div>
        <span className="font-display text-xl tracking-wide">JewelReport</span>
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground border border-border rounded-full px-2.5 py-0.5 ml-1">
          Admin
        </span>
      </div>

      <form
        onSubmit={submit}
        className="relative w-full max-w-sm p-8 rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-3d"
      >
        <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold mb-6">
          <Lock className="w-5 h-5 text-gold-foreground" />
        </div>
        <h1 className="font-display text-2xl text-center">Sign in</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          JewelReport control panel
        </p>

        <div className="mt-7 space-y-3">
          <input
            value={u}
            onChange={(e) => setU(e.target.value)}
            placeholder="Username"
            autoComplete="username"
            className="w-full bg-input/30 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
          />
          <input
            value={p}
            onChange={(e) => setP(e.target.value)}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className="w-full bg-input/30 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
          />
          {err && <p className="text-xs text-destructive">{err}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-gold text-gold-foreground text-sm font-medium shadow-gold hover:scale-[1.02] transition-transform"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
