"use client";

import Link from "next/link";
import { useState } from "react";
import type { MenuNode } from "@/lib/menu";

export function MobileMenu({ items }: { items: MenuNode[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
        className="flex size-11 items-center justify-center rounded-md text-lg text-brand-navy"
      >
        {open ? "✕" : "☰"}
      </button>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile navigation" className="absolute inset-x-0 top-full z-50 border-b border-brand-border-strong bg-white px-5 py-4 shadow-md">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.label} className="border-b border-brand-border last:border-0">
                <Link href={item.href ?? "#"} onClick={() => setOpen(false)} className="block py-3 text-sm font-medium text-brand-ink hover:text-brand-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
