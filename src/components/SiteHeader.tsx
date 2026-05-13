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
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ease-out ${
        scrolled ? "pt-3 px-3 sm:px-6" : "pt-0 px-0"
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-500 ease-out ${
          scrolled
            ? "max-w-5xl h-14 px-4 sm:px-6 rounded-full border border-primary/30 bg-background/70 backdrop-blur-2xl shadow-[0_10px_40px_-15px_rgba(212,175,55,0.35),0_0_0_1px_rgba(212,175,55,0.15)_inset]"
            : "max-w-7xl h-20 px-6 rounded-none border-b border-border bg-background/70 backdrop-blur-xl"
        }`}
      >
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <img
            src={logo}
            alt="JewelReport"
            className={`object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-500 group-hover:scale-105 ${
              scrolled ? "h-8 w-8" : "h-12 w-12"
            }`}
          />
          <div className="leading-tight">
            <div
              className={`font-display tracking-tight transition-all duration-500 ${
                scrolled ? "text-base" : "text-xl"
              }`}
            >
              <span className="text-foreground">Jewel</span>
              <span className="text-gradient-gold">Report</span>
            </div>
            {!scrolled && (
              <div className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                Certification Lab
              </div>
            )}
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
            className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-105 transition-all duration-500 ${
              scrolled ? "px-4 py-1.5 text-xs" : "px-5 py-2.5 text-sm"
            }`}
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
          className={`lg:hidden mx-auto mt-2 overflow-hidden bg-background/95 backdrop-blur-xl border border-border ${
            scrolled ? "max-w-5xl rounded-2xl mx-3 sm:mx-auto" : "rounded-none border-x-0"
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
