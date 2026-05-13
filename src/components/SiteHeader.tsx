import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/verify", label: "Verify Report" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="JewelReport" className="h-12 w-12 object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-transform group-hover:scale-105" />
          <div className="leading-tight">
            <div className="font-display text-xl tracking-tight">
              <span className="text-foreground">Jewel</span>
              <span className="text-gradient-gold">Report</span>
            </div>
            <div className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Certification Lab</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => {
            const active = path === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`relative text-sm tracking-wide transition-colors ${active ? "text-primary" : "text-foreground/80 hover:text-primary"}`}
              >
                {n.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-gold" />
                )}
              </Link>
            );
          })}
          <Link
            to="/verify"
            className="px-5 py-2.5 rounded-full bg-gradient-gold text-gold-foreground text-sm font-medium shadow-gold hover:scale-105 transition-transform"
          >
            Verify Report
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="px-6 py-4 flex flex-col gap-3">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-foreground/90 hover:text-primary"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
