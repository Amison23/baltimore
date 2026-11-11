"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useNavState } from "@/components/nav/NavState";
import { getTag, TAGS, type MenuNode, type TagId } from "@/lib/nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";

const COLLAPSE = { duration: 0.35, ease: [0.4, 0, 0.2, 1] } as const;
const PANEL = { duration: 0.75, ease: [0.4, 0, 0.2, 1] } as const;

type Crumb = { key: string; label: string };

function Collapse({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div
      inert={!open}
      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out motion-reduce:transition-none ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

type BranchProps = {
  nodes: MenuNode[];
  parentKey: string;
  depth: number;
  openPath: Crumb[];
  onToggle: (crumb: Crumb, depth: number) => void;
  onNavigate: () => void;
};

/* Renders one level of the menu. Items with children expand inline;
   items without children are plain links. Calls itself for deeper levels. */
function MenuBranch({
  nodes,
  parentKey,
  depth,
  openPath,
  onToggle,
  onNavigate,
}: BranchProps) {
  return (
    <ul
      className={
        depth > 1
          ? "ml-1 flex flex-col border-l border-brand-border pl-4"
          : "flex flex-col pl-3"
      }
    >
      {nodes.map((node) => {
        const key = `${parentKey}/${node.label}`;
        const isOpen = openPath[depth]?.key === key;

        return (
          <li key={key} className="border-b border-brand-border last:border-0">
            {node.children?.length ? (
              <>
                <button
                  type="button"
                  disabled={node.disabled}
                  aria-disabled={node.disabled ? "true" : undefined}
                  aria-expanded={isOpen}
                  onClick={() => onToggle({ key, label: node.label }, depth)}
                  className="flex min-h-11 w-full items-center justify-between py-3 text-left text-sm font-medium text-brand-ink transition-colors duration-300 enabled:hover:text-brand-gold motion-reduce:transition-none disabled:cursor-not-allowed disabled:text-brand-slate-light"
                >
                  {node.label}
                  <span
                    aria-hidden="true"
                    className={`transition-transform duration-500 ease-out motion-reduce:transition-none ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  >
                    ›
                  </span>
                </button>

                <Collapse open={isOpen}>
                  <div className="pb-2">
                    {node.href && (
                      <Link
                        href={node.href}
                        onClick={onNavigate}
                        className="block min-h-11 py-3 pl-3 text-sm font-semibold text-brand-gold"
                      >
                        View all {node.label}
                      </Link>
                    )}
                    <MenuBranch
                      nodes={node.children}
                      parentKey={key}
                      depth={depth + 1}
                      openPath={openPath}
                      onToggle={onToggle}
                      onNavigate={onNavigate}
                    />
                  </div>
                </Collapse>
              </>
            ) : node.disabled ? (
              <span
                aria-disabled="true"
                className="block min-h-11 py-3 text-sm text-brand-slate-light"
              >
                {node.label}
                <span className="ml-2 text-xs">Coming soon</span>
              </span>
            ) : (
              <Link
                href={node.href ?? "#"}
                onClick={onNavigate}
                className="block min-h-11 py-3 text-sm font-medium text-brand-ink transition-colors duration-300 hover:text-brand-gold motion-reduce:transition-none"
              >
                {node.label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function MobileMenu() {
  const { setActiveTag } = useNavState();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // The chain of currently open items, one per level. Opening an item
  // closes its siblings. This same list drives the breadcrumb trail.
  const [openPath, setOpenPath] = useState<Crumb[]>([]);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const expandedTag = openPath[0]?.key as TagId | undefined;
  const config = expandedTag ? getTag(expandedTag) : null;

  const close = () => {
    setOpen(false);
    window.requestAnimationFrame(() => toggleRef.current?.focus());
  };

  // Move focus into the panel once, when the menu opens.
  useEffect(() => {
    if (!open) return;
    window.requestAnimationFrame(() =>
      panelRef.current?.querySelector<HTMLElement>("button, a")?.focus(),
    );
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) close();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  const previousPathname = useRef(pathname);
  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    if (open) window.requestAnimationFrame(close);
    // close intentionally uses the latest active tag when the route changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, open]);

  function toggle(crumb: Crumb, depth: number) {
    setOpenPath((current) =>
      current[depth]?.key === crumb.key
        ? current.slice(0, depth)
        : [...current.slice(0, depth), crumb],
    );
  }

  function toggleTag(tag: { id: TagId; label: string }) {
    if (openPath[0]?.key !== tag.id) setActiveTag(tag.id);
    toggle({ key: tag.id, label: tag.label }, 0);
  }

  function openMenu() {
    setOpenPath([]);
    setOpen(true);
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex items-center xl:hidden">
        <button
          ref={toggleRef}
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => (open ? close() : openMenu())}
          className="flex size-11 items-center justify-center rounded-md text-xl text-brand-navy transition-colors motion-reduce:transition-none"
        >
          {open ? "✕" : "☰"}
        </button>

        <AnimatePresence onExitComplete={() => setOpenPath([])}>
        {open && (
          <SidebarProvider
            key="mobile-menu"
            defaultOpen
            className="fixed inset-0 z-50 h-dvh min-h-0 w-full justify-end"
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-brand-navy/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={PANEL}
              onClick={close}
            />
            <motion.div
              className="relative h-dvh"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={PANEL}
            >
            <Sidebar
              collapsible="none"
              className="!h-dvh !w-[92vw] max-w-none bg-white shadow-2xl"
            >
              <SidebarHeader className="flex min-h-[58px] flex-row items-center justify-between border-b border-brand-border-strong px-5 sm:min-h-[70px] sm:px-8">
                <span className="text-base font-bold text-brand-navy">Menu</span>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={close}
                  className="flex size-11 items-center justify-center rounded-md text-xl text-brand-navy transition-colors hover:bg-brand-surface motion-reduce:transition-none"
                >
                  ✕
                </button>
              </SidebarHeader>

              <SidebarContent className="px-5 py-4 sm:px-8">
                <div ref={panelRef} id="mobile-nav" className="contents">
                  {/* Breadcrumb trail: slides in once something is open */}
                  <Collapse open={openPath.length > 0}>
                    <nav
                      aria-label="Menu path"
                      className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-brand-border-strong pb-3 text-xs"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenPath([])}
                        className="font-medium text-brand-gold hover:underline"
                      >
                        Menu
                      </button>
                      {openPath.map((crumb, index) => {
                        const isLast = index === openPath.length - 1;
                        return (
                          <motion.span
                            key={crumb.key}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={COLLAPSE}
                            className="flex items-center gap-2"
                          >
                            <span aria-hidden="true" className="text-brand-slate-light">
                              ›
                            </span>
                            {isLast ? (
                              <span
                                aria-current="location"
                                className="font-semibold text-brand-navy"
                              >
                                {crumb.label}
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setOpenPath(openPath.slice(0, index + 1))}
                                className="font-medium text-brand-gold hover:underline"
                              >
                                {crumb.label}
                              </button>
                            )}
                          </motion.span>
                        );
                      })}
                    </nav>
                  </Collapse>

                  <ul className="flex flex-col">
                    {TAGS.map((tag) => {
                      const isOpen = openPath[0]?.key === tag.id;
                      return (
                        <li
                          key={tag.id}
                          className="border-b border-brand-border last:border-0"
                        >
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            onClick={() => toggleTag(tag)}
                            className="flex min-h-11 w-full items-center justify-between py-3 text-left text-sm font-medium text-brand-ink transition-colors duration-300 hover:text-brand-gold motion-reduce:transition-none"
                          >
                            {tag.label}
                            <span
                              aria-hidden="true"
                              className={`transition-transform duration-500 ease-out motion-reduce:transition-none ${
                                isOpen ? "rotate-90" : ""
                              }`}
                            >
                              ›
                            </span>
                          </button>

                          <Collapse open={isOpen}>
                            <div className="pb-2">
                              <MenuBranch
                                nodes={getTag(tag.id).categories}
                                parentKey={tag.id}
                                depth={1}
                                openPath={openPath}
                                onToggle={toggle}
                                onNavigate={close}
                              />
                            </div>
                          </Collapse>
                        </li>
                      );
                    })}

                    <li className="border-b border-brand-border last:border-0">
                      <Link
                        href="/careers"
                        onClick={close}
                        className="flex min-h-11 w-full items-center justify-between py-3 text-sm font-medium text-brand-ink transition-colors duration-300 hover:text-brand-gold motion-reduce:transition-none"
                      >
                        Careers
                        <span aria-hidden="true">›</span>
                      </Link>
                    </li>
                    <li className="border-b border-brand-border last:border-0">
                      <Link
                        href="/#our-people"
                        onClick={close}
                        className="flex min-h-11 w-full items-center justify-between py-3 text-sm font-medium text-brand-ink transition-colors duration-300 hover:text-brand-gold motion-reduce:transition-none"
                      >
                        Our People
                        <span aria-hidden="true">›</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </SidebarContent>

              {config && (
                <SidebarFooter className="flex shrink-0 flex-row gap-3 border-t border-brand-border-strong bg-white px-5 py-4 sm:px-8">
                  {(config.actions ?? []).map((action) => (
                    <Link
                      key={action.label}
                      href={action.href}
                      onClick={close}
                      className={
                        action.variant === "primary"
                          ? "flex-1 rounded-full bg-brand-gold px-4 py-3 text-center text-sm font-semibold text-brand-navy transition hover:bg-brand-gold-hover motion-reduce:transition-none"
                          : "flex-1 rounded-full border border-brand-blue px-4 py-3 text-center text-sm font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white motion-reduce:transition-none"
                      }
                    >
                      {action.label}
                    </Link>
                  ))}
                </SidebarFooter>
              )}
                       </Sidebar>
            </motion.div>
          </SidebarProvider>
        )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}