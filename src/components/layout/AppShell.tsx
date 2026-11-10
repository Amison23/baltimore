import Link from "next/link";
import type { ReactNode } from "react";
import { CategoryBar } from "@/components/nav/CategoryBar";
import { MobileMenu } from "@/components/nav/MobileMenu";
import { NavStateProvider } from "@/components/nav/NavState";
import { TagBar } from "@/components/nav/TagBar";

function Header() {
  return (
    <header className="relative border-b border-brand-border-strong bg-white [--header-h:58px] sm:[--header-h:70px]">
      <NavStateProvider>
          <div className="relative mx-auto flex h-[58px] max-w-[1180px] items-center justify-between gap-4 px-5 sm:h-[70px] sm:px-8 lg:px-10">
            <Link href="/" className="flex items-center gap-2" aria-label="Baltimore Group home">
              <img src="/assets/brand-mark.png" alt="" className="h-12 w-14 object-contain" />
              <span className="leading-none">
                <span className="block text-base font-bold text-brand-navy sm:text-[22px]">Baltimore Group</span>
                <span className="mt-1 block text-[9px] text-brand-navy sm:text-[11px]">Excellence Through Integrity</span>
              </span>
            </Link>

            <div className="hidden flex-1 justify-center md:flex">
              <TagBar />
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <Link href="#contact" className="rounded-full border-2 border-brand-blue px-4 py-2 text-sm font-semibold text-brand-blue hover:bg-brand-blue hover:text-white sm:px-5">Contact Us</Link>
              <div className="hidden items-center gap-3 sm:flex" aria-label="Social links">
                <img src="/assets/facebook.svg" alt="Facebook" className="size-6" />
                <img src="/assets/twitter-x.svg" alt="X" className="size-5" />
                <img src="/assets/linkedin.svg" alt="LinkedIn" className="size-6" />
                <img src="/assets/instagram.svg" alt="Instagram" className="size-6" />
              </div>
            </div>
            <MobileMenu />
          </div>
          <div className="hidden h-12 border-t border-brand-border md:block">
            <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
              <CategoryBar />
            </div>
          </div>
      </NavStateProvider>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-6 py-6 text-sm text-white/80 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© 2023 Baltimore Group Ltd, All rights reserved.</p>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-3 gap-y-1">
          <Link href="#home">Home</Link>
          <Link href="#about-us">About</Link>
          <Link href="#our-people">Our People</Link>
          <Link href="#services">Services</Link>
          <Link href="#careers">Careers</Link>
          <Link href="#partners">Partners</Link>
          <Link href="#contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-brand-surface">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
