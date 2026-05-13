import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-border bg-[var(--navy-deep)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-gold opacity-60" />
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="JewelReport" className="h-12 w-12 object-contain" />
            <div>
              <div className="font-display text-2xl">
                <span>Jewel</span><span className="text-gradient-gold">Report</span>
              </div>
              <div className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Certification Lab</div>
            </div>
          </div>
          <p className="mt-5 text-sm text-muted-foreground max-w-md leading-relaxed">
            An internationally recognised laboratory delivering trusted reports for natural diamonds,
            lab-grown diamonds, gemstones and fine jewellery.
          </p>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-primary mb-4">Reports</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Lab Grown Diamonds</li>
            <li>Natural Diamonds</li>
            <li>Gemstone Reports</li>
            <li>Jewellery Reports</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-primary mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="text-muted-foreground hover:text-primary">About</Link></li>
            <li><Link to="/verify" className="text-muted-foreground hover:text-primary">Verify Report</Link></li>
            <li><Link to="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            <li><Link to="/admin" className="text-muted-foreground/60 hover:text-primary text-xs">Admin</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} JewelReport Certification Lab. All rights reserved.</p>
          <p className="tracking-widest uppercase">Trust · Precision · Integrity</p>
        </div>
      </div>
    </footer>
  );
}
