"use client";

import Link from "next/link";
import { TAGS } from "@/lib/nav";
import { useActiveTag } from "./use-active-tag";

export function TagBar() {
  const activeTag = useActiveTag();

  return (
    <nav aria-label="Audience navigation">
      <ul className="flex items-center gap-7">
        {TAGS.map((tag) => {
          const active = tag.id === activeTag;
          return (
            <li key={tag.id}>
              <Link
                href={`/${tag.id}`}
                aria-current={active ? "true" : undefined}
                className={`relative block px-1 py-2 text-[13px] font-medium transition-colors motion-reduce:transition-none ${active ? "text-brand-gold" : "text-brand-ink hover:text-brand-gold"}`}
              >
                {tag.label}
                {active && <span aria-hidden="true" className="absolute inset-x-0 -bottom-[1px] mx-auto h-0 w-0 border-x-[5px] border-b-0 border-t-[6px] border-x-transparent border-t-brand-gold" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
