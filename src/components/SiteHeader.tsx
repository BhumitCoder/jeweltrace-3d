import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/verify", label: "Verify" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setOpen(false);
  }, [path]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100]">
      <div
        className={`mx-auto flex items-center justify-between h-16 transition-all duration-500 ${
          scrolled
            ? "mt-3 max-w-5xl px-5 sm:px-7 rounded-full border border-primary/40 bg-background/90 backdrop-blur-2xl shadow-[0_12px_45px_-12px_rgba(212,175,55,0.45),0_0_0_1px_rgba(212,175,55,0.15)_inset] mx-3 sm:mx-auto"
            : "mt-0 max-w-none px-6 sm:px-10 rounded-none border-b border-transparent bg-transparent"
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <img
            src={logo}
            alt="JewelsReport"
            className="h-9 w-9 object-contain drop-shadow-[0_0_10px_rgba(232,197,106,0.55)] transition-transform duration-500 group-hover:scale-110"
          />
          <div className="leading-tight">
            <div className="font-display tracking-tight text-base sm:text-lg">
              <span className="text-foreground">Jewels</span>
              <span className="text-gradient-gold">Report</span>
            </div>
            <div className="hidden sm:block text-[9px] tracking-[0.3em] text-muted-foreground uppercase">
              Certification Lab
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => {
            const active = path === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`relative text-sm tracking-wide transition-colors ${
                  active ? "text-primary" : "text-foreground/80 hover:text-primary"
                }`}
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
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-105 transition-transform px-4 py-1.5 text-xs"
          >
            Verify
            <ArrowRight className="w-3.5 h-3.5" />
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
        <div
          className={`lg:hidden mt-2 overflow-hidden bg-background/95 backdrop-blur-xl border border-border ${
            scrolled ? "mx-3 sm:mx-auto max-w-5xl rounded-2xl" : "rounded-none border-x-0"
          }`}
        >
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
