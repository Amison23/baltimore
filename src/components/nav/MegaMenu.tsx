"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getMenuNodeHref, getTag, TAGS, type MenuNode } from "@/lib/nav";
import { useNavState } from "./NavState";

const spring = { type: "spring", stiffness: 380, damping: 34, mass: 0.9 } as const;

const columnsVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const columnVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: spring },
};

function ChevronDownIcon({ expanded = false }: { expanded?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`size-3.5 transition-transform duration-200 motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="m3.5 6 4.5 4 4.5-4" />
    </svg>
  );
}

function MenuItem({
  item,
  id,
  expanded,
  expandedKeys,
  onToggle,
}: {
  item: MenuNode;
  id: string;
  expanded: boolean;
  expandedKeys: Set<string>;
  onToggle: (id: string) => void;
}) {
  const hasChildren = Boolean(item.children?.length);
  const href = getMenuNodeHref(item);
  const label = item.disabled ? `${item.label} (Coming soon)` : item.label;

  return (
    <>
    <li>
      <div className="flex items-center justify-between gap-4">
        {item.disabled || !href ? (
          <span className={`rounded-md px-3 py-2 text-sm ${item.disabled ? "text-brand-slate-light" : "text-brand-ink"}`} aria-disabled={item.disabled ? "true" : undefined}>
            {label}
          </span>
        ) : (
          <Link href={href} className="block rounded-md px-3 py-2 text-sm text-brand-ink transition-all duration-200 ease-out hover:translate-x-1 hover:bg-brand-surface hover:text-brand-gold motion-reduce:transform-none motion-reduce:transition-none">
            {item.label}
          </Link>
        )}
        {hasChildren && (
          <button
            type="button"
            aria-expanded={expanded}
            aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`}
            onClick={() => onToggle(id)}
            className="rounded-md p-1 text-brand-slate-light transition-all duration-200 ease-out hover:bg-brand-surface hover:text-brand-gold motion-reduce:transition-none"
          >
            <motion.span animate={{ rotate: expanded ? 45 : 0 }} transition={spring} className="block text-lg leading-none">
              +
            </motion.span>
          </button>
        )}
      </div>
      <AnimatePresence initial={false}>
        {hasChildren && expanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={spring}
            className="overflow-hidden border-l border-brand-border pl-3"
          >
            {item.children?.map((child) => {
              const childId = `${id}:${child.label}`;
              return <MenuItem key={child.label} item={child} id={childId} expanded={expandedKeys.has(childId)} expandedKeys={expandedKeys} onToggle={onToggle} />;
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
    </>
  );
}

export function MegaMenu() {
  const { activeTag, setActiveTag } = useNavState();
  const config = getTag(activeTag);
  const [active, setActive] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [height, setHeight] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const previous = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const menuRef = useRef<HTMLElement>(null);
  const activeCategory = active === null ? undefined : config.categories[active];

  const clearCloseTimer = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const open = (index: number) => {
    clearCloseTimer();
    if (previous.current !== null && previous.current !== index) {
      setDirection(index > previous.current ? 1 : -1);
    }
    previous.current = index;
    setActive(index);
  };

  const close = (restore = false) => {
    clearCloseTimer();
    if (restore) {
      previous.current = null;
      setActive(null);
      setHeight(null);
      setExpanded(new Set());
      return;
    }
    closeTimer.current = window.setTimeout(() => {
      previous.current = null;
      setActive(null);
      setHeight(null);
      setExpanded(new Set());
    }, restore ? 0 : 120);
  };

  const toggleExpanded = (id: string) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const measureRef = (element: HTMLDivElement | null) => {
    observer.current?.disconnect();
    if (!element) return;
    const update = () => setHeight(element.offsetHeight);
    update();
    observer.current = new ResizeObserver(update);
    observer.current.observe(element);
  };

  useEffect(() => () => {
    clearCloseTimer();
    observer.current?.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) close(true);
    };
    const media = window.matchMedia("(min-width: 1280px)");
    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (!event.matches) close(true);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    media.addEventListener("change", handleMediaChange);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      media.removeEventListener("change", handleMediaChange);
    };
  });

  return (
    <MotionConfig transition={spring} reducedMotion="user">
      <nav ref={menuRef} aria-label="Main navigation" className="hidden xl:block" onPointerLeave={() => close()}>
        <div className="mx-auto flex h-[70px] max-w-[1300px] items-center gap-6 px-5 sm:px-8 lg:px-10">
          <Link href="/" className="flex items-center gap-2" aria-label="Baltimore Group home">
            <img src="/assets/brand-mark.png" alt="" className="h-12 w-14 object-contain" />
            <span className="leading-none">
              <span className="block text-base font-bold text-brand-navy sm:text-[22px]">Baltimore Group</span>
              <span className="mt-1 block text-[9px] text-brand-navy sm:text-[11px]">Excellence Through Integrity</span>
            </span>
          </Link>

          <div className="flex flex-1 justify-center">
            <ul className="flex items-center gap-1">
              {TAGS.map((tag) => {
                const selected = tag.id === activeTag;
                return (
                  <li key={tag.id}>
                    <button
                      type="button"
                      aria-current={selected ? "true" : undefined}
                      onMouseEnter={() => { close(true); setActiveTag(tag.id); }}
                      onFocus={() => { close(true); setActiveTag(tag.id); }}
                      onClick={() => { close(true); setActiveTag(tag.id); }}
                      className={`relative block rounded-lg border px-3 py-2 text-[13px] font-medium transition-all 
                      duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transform-none 
                      motion-reduce:transition-none 
                      ${selected ? "border-brand-gold bg-white text-brand-gold shadow-sm" : 
                      "border-transparent text-brand-ink hover:border-brand-border hover:bg-white/80 hover:text-brand-gold"}`}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {tag.label}
                        <ChevronDownIcon expanded={selected} />
                      </span>
                      {/* {selected && <span aria-hidden="true" className="absolute inset-x-0 -bottom-[1px] mx-auto h-0 w-0 border-x-[5px] border-b-0 border-t-[6px] border-x-transparent border-t-brand-gold" />} */}
                    </button>
                  </li>
                );
              })}
              <li>
                <Link
                  href="#our-people"
                  className={`relative block rounded-lg px-3 py-2 text-[13px] 
                  font-medium transition-all duration-200 ease-out hover:-translate-y-0.5 
                  motion-reduce:transform-none motion-reduce:transition-none
                  hover:border-brand-gold hover:bg-white hover:text-brand-gold hover:shadow-sm`}
                  onFocus={() => {close(true)}}
                >
                  Our People
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className={`relative block rounded-lg px-3 py-2 text-[13px] 
                  font-medium transition-all duration-200 ease-out hover:-translate-y-0.5 
                  motion-reduce:transform-none motion-reduce:transition-none
                  hover:border-brand-gold hover:bg-white hover:text-brand-gold hover:shadow-sm`}
                  onFocus={() => {close(true)}}
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <Link href="#contact" className="rounded-full border-2 border-brand-blue px-4 py-2 text-sm font-semibold text-brand-blue hover:bg-brand-blue hover:text-white sm:px-5">Contact Us</Link>
            <div className="hidden items-center gap-3 2xl:flex" aria-label="Social links">
              <img src="/assets/facebook.svg" alt="Facebook" className="size-6" />
              <img src="/assets/twitter-x.svg" alt="X" className="size-5" />
              <img src="/assets/linkedin.svg" alt="LinkedIn" className="size-6" />
              <img src="/assets/instagram.svg" alt="Instagram" className="size-6" />
            </div>
          </div>
        </div>

        <div className="relative w-full border-t border-brand-border">
          <div className="relative mx-auto flex max-w-[1300px] items-center justify-center px-5 sm:px-8 lg:px-10" onPointerEnter={clearCloseTimer}>
          <div className="flex items-center gap-1 rounded-xl p-1">
          {config.categories.map((category, index) => {
            const selected = active === index;
            return (
              <button
                key={category.label}
                type="button"
                aria-expanded={selected}
                aria-controls={`mega-panel-${index}`}
                onMouseEnter={() => open(index)}
                onFocus={() => open(index)}
                onClick={() => (selected ? close(true) : open(index))}
                className={`relative rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none ${selected ? "bg-brand-surface text-brand-gold shadow-sm" : "text-brand-ink hover:bg-brand-surface hover:text-brand-gold"}`}
              >
                {category.label}
                <span className="ml-1 inline-flex align-middle"><ChevronDownIcon expanded={selected} /></span>
              </button>
            );
          })}
          </div>
          <div className="absolute right-5 flex items-center gap-3 sm:right-8 lg:right-10">
            {(config.actions ?? []).map((action) => (
              <Link key={action.label} href={action.href} className={action.variant === "primary" ? "rounded-full bg-brand-gold px-4 py-2 text-[13px] font-semibold text-brand-navy transition hover:bg-brand-gold-hover motion-reduce:transition-none" : "rounded-full border border-brand-blue px-4 py-2 text-[13px] font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white motion-reduce:transition-none"}>
                {action.label}
              </Link>
            ))}
          </div>
          </div>

          <AnimatePresence>
          {activeCategory && active !== null && (
            <motion.div
              key="panel"
              id={`mega-panel-${active}`}
              className="absolute inset-x-0 top-full z-50 overflow-hidden border-t border-brand-border-strong bg-white shadow-lg"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0, ...(height !== null ? { height } : {}) }}
              exit={{ opacity: 0, y: -8 }}
              onPointerEnter={clearCloseTimer}
            >
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                  key={`${activeTag}:${active}`}
                  ref={measureRef}
                  custom={direction}
                  className="mx-auto max-h-[calc(100dvh-var(--header-h)-3rem)] max-w-[1300px] overflow-y-auto px-5 py-8 sm:px-8 lg:px-10"
                  initial={{ x: direction * 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction * -40, opacity: 0 }}
                >
                  <motion.div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8" variants={columnsVariants} initial="hidden" animate="show">
                    {(activeCategory.children ?? []).map((column) => (
                      <motion.div key={column.label} variants={columnVariants}>
                        <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-brand-slate">{column.label}</h3>
                        <ul className="space-y-1">
                          {(column.children ?? []).map((item) => {
                            const id = `${activeTag}:${active}:${column.label}:${item.label}`;
                            return <MenuItem key={id} item={item} id={id} expanded={expanded.has(id)} expandedKeys={expanded} onToggle={toggleExpanded} />;
                          })}
                        </ul>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
          </AnimatePresence>
        </div>

      </nav>

    </MotionConfig>
  );
}
