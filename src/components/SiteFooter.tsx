import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="relative mt-16 sm:mt-32 border-t border-border/50">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-gold opacity-50" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 grid gap-8 sm:gap-12 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="JewelsReport" className="h-10 w-10 sm:h-12 sm:w-12 object-contain" />
            <div>
              <div className="font-display text-xl sm:text-2xl text-foreground">
                <span>Jewels</span><span className="text-gradient-gold">Report</span>
              </div>
              <div className="text-[9px] sm:text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Certification Lab</div>
            </div>
          </div>
          <p className="mt-4 sm:mt-5 text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
            An internationally recognised laboratory delivering trusted reports for natural diamonds,
            lab-grown diamonds, gemstones and fine jewellery.
          </p>
          <address className="not-italic mt-5 space-y-1 text-xs sm:text-sm text-muted-foreground">
            <div>202, 2/F, Veer Ashish Building,</div>
            <div>Surat Diamond Market, Mahidharpura,</div>
            <div>Surat, Gujarat 395003, India</div>
            <div className="pt-2">
              <a href="tel:+919967381180" className="hover:text-primary transition-colors">+91 99673 81180</a>
            </div>
          </address>
        </div>
        <div>
          <h4 className="text-xs sm:text-sm uppercase tracking-widest text-primary mb-3 sm:mb-4">Reports</h4>
          <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
            <li>Lab Grown Diamonds</li>
            <li>Natural Diamonds</li>
            <li>Gemstone Reports</li>
            <li>Jewellery Reports</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs sm:text-sm uppercase tracking-widest text-primary mb-3 sm:mb-4">Company</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
            <li><Link to="/verify" className="text-muted-foreground hover:text-primary transition-colors">Verify Report</Link></li>
            <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            <li><Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-5 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} JewelsReport Certification Lab. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
            <span>·</span>
            <span className="tracking-widest uppercase">Trust · Precision · Integrity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
