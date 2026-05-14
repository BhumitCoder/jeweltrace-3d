import { Link } from "@tanstack/react-router";
import { Gem } from "lucide-react";
import type { ReactNode } from "react";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="pointer-events-none fixed -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-radial-gold blur-3xl opacity-25" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-radial-gold blur-3xl opacity-15" />
      <main className="flex-1 relative z-10">{children}</main>
    </div>
  );
}

export function AdminTopBar({
  onLogout,
  showLogout = false,
}: {
  onLogout?: () => void;
  showLogout?: boolean;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold">
            <Gem className="w-3.5 h-3.5 text-gold-foreground" />
          </div>
          <span className="font-display text-base tracking-wide">JewelsReport</span>
          <span className="hidden sm:inline-block text-xs uppercase tracking-[0.2em] text-muted-foreground border border-border rounded-full px-2.5 py-0.5">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            View site
          </Link>
          <Link to="/admin" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
          {showLogout && onLogout && (
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border text-xs hover:border-primary hover:text-primary transition-colors"
            >
              Sign out
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
