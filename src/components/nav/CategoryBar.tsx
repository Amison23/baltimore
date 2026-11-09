"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getTag, type MenuNode } from "@/lib/nav";
import { useActiveTag } from "./use-active-tag";
import { MegaPanel } from "./MegaPanel";

function nodeId(label: string, index: number) {
  return `category-panel-${index}-${label.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;
}

function categoryHref(node: MenuNode) {
  return node.href ?? "#";
}

export function CategoryBar() {
  const activeTag = useActiveTag();
  const config = getTag(activeTag);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const barRef = useRef<HTMLElement>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const clearTimers = () => {
    if (openTimer.current !== null) window.clearTimeout(openTimer.current);
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  };

  const close = (restoreFocus = false) => {
    clearTimers();
    const previous = openIndex;
    setOpenIndex(null);
    if (restoreFocus && previous !== null) buttonRefs.current[previous]?.focus();
  };

  const scheduleOpen = (index: number) => {
    clearTimers();
    openTimer.current = window.setTimeout(() => setOpenIndex(index), 80);
  };

  const scheduleClose = () => {
    clearTimers();
    closeTimer.current = window.setTimeout(() => setOpenIndex(null), 150);
  };

  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpenIndex(null), 0);
    return () => window.clearTimeout(timer);
  }, [activeTag]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!barRef.current?.contains(event.target as Node)) close();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    const media = window.matchMedia("(min-width: 768px)");
    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (!event.matches) close();
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    media.addEventListener("change", handleMediaChange);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      media.removeEventListener("change", handleMediaChange);
    };
  });

  return (
    <nav ref={barRef} aria-label="Category navigation" className="hidden md:block" onPointerLeave={scheduleClose}>
      <ul className="flex items-center gap-8">
        {config.menu.map((node, index) => {
          const hasChildren = Boolean(node.children?.length);
          const panelId = nodeId(node.label, index);
          return (
            <li key={node.label} onPointerEnter={() => hasChildren && scheduleOpen(index)}>
              {hasChildren ? (
                <>
                  <button
                    ref={(element) => { buttonRefs.current[index] = element; }}
                    type="button"
                    aria-expanded={openIndex === index}
                    aria-controls={panelId}
                    aria-disabled={node.disabled ? "true" : undefined}
                    disabled={node.disabled}
                    onClick={() => setOpenIndex((current) => current === index ? null : index)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                        event.preventDefault();
                        const direction = event.key === "ArrowRight" ? 1 : -1;
                        const next = (index + direction + config.menu.length) % config.menu.length;
                        const nextNode = config.menu[next];
                        if (!nextNode.disabled) buttonRefs.current[next]?.focus();
                      }
                    }}
                    className="py-3 text-[13px] font-medium text-brand-ink transition-colors hover:text-brand-gold motion-reduce:transition-none disabled:cursor-not-allowed disabled:text-brand-slate-light"
                  >
                    {node.label}
                    <span aria-hidden="true" className="ml-1">⌄</span>
                  </button>
                  {openIndex === index && <div id={panelId} onPointerEnter={clearTimers} onPointerLeave={scheduleClose}><MegaPanel node={node} onNavigate={() => close()} /></div>}
                </>
              ) : node.disabled ? (
                <span aria-disabled="true" className="block py-3 text-[13px] font-medium text-brand-slate-light">{node.label}</span>
              ) : (
                <Link href={categoryHref(node)} className="block py-3 text-[13px] font-medium text-brand-ink transition-colors hover:text-brand-gold motion-reduce:transition-none">{node.label}</Link>
              )}
            </li>
          );
        })}
        <li className="ml-auto flex items-center gap-3">
          {config.actions.map((action) => <Link key={action.label} href={action.href} className={action.variant === "primary" ? "rounded-full bg-brand-gold px-4 py-2 text-[13px] font-semibold text-brand-navy transition hover:bg-brand-gold-hover motion-reduce:transition-none" : "rounded-full border border-brand-blue px-4 py-2 text-[13px] font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white motion-reduce:transition-none"}>{action.label}</Link>)}
        </li>
      </ul>
    </nav>
  );
}
