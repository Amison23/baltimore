import Link from "next/link";
import type { ReactNode } from "react";
import { MegaMenu } from "@/components/nav/MegaMenu";
import { MobileMenu } from "@/components/nav/MobileMenu";
import { NavStateProvider } from "@/components/nav/NavState";

function Header() {
  return (
    <header className="relative border-b border-brand-border-strong bg-white [--header-h:58px] sm:[--header-h:70px]">
      <NavStateProvider>
        <div className="relative mx-auto flex h-[58px] max-w-[1300px] items-center justify-end gap-4 px-5 sm:h-[70px] sm:px-8 lg:px-10 xl:hidden">
          <MobileMenu />
        </div>
        <div className="hidden xl:block">
          <MegaMenu />
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
