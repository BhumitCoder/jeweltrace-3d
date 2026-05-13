import { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-x-hidden">
      {/* Decorative ambient lights */}
      <div className="pointer-events-none fixed -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-radial-gold blur-3xl opacity-50" />
      <div className="pointer-events-none fixed top-1/2 -right-60 h-[600px] w-[600px] rounded-full bg-radial-gold blur-3xl opacity-30" />
      <SiteHeader />
      <div aria-hidden className="h-24" />
      <main className="flex-1 relative z-10">{children}</main>
      <SiteFooter />
    </div>
  );
}
