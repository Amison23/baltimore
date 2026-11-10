"use client";

import { useNavState } from "@/components/nav/NavState";
import { getTag, TAGS, type MenuNode, type TagId } from "@/lib/nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";

export function MobileMenu() {
  const { activeTag, setActiveTag } = useNavState();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [viewTag, setViewTag] = useState<TagId | null>(null);
  const [path, setPath] = useState<MenuNode[]>([]);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const current = path[path.length - 1];
  const config = viewTag ? getTag(viewTag) : null;
  const list = current?.children ?? config?.categories ?? [];

  const close = () => {
    setOpen(false);
    setViewTag(null);
    setPath([]);
    window.requestAnimationFrame(() => toggleRef.current?.focus());
  };

  useEffect(() => {
    if (!open) return;
    window.requestAnimationFrame(() =>
      panelRef.current?.querySelector<HTMLElement>("button, a")?.focus(),
    );
  }, [open, viewTag, path]);

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

  function selectTag(tag: TagId) {
    setActiveTag(tag);
    setViewTag(tag);
    setPath([]);
  }

  function openMenu() {
    setViewTag(null);
    setPath([]);
    setOpen(true);
  }

  function handleNodeClick(node: MenuNode) {
    if (node.children?.length) setPath((currentPath) => [...currentPath, node]);
  }

  return (
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

      {open && (
        <SidebarProvider defaultOpen className="fixed inset-0 z-50 h-dvh min-h-0 w-full bg-brand-navy/20" onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
          <Sidebar collapsible="none" className="!h-dvh !w-[92vw] max-w-none bg-white shadow-2xl">
            <SidebarHeader className="flex min-h-[58px] flex-row items-center justify-between border-b border-brand-border-strong px-5 sm:min-h-[70px] sm:px-8">
            <span className="text-base font-bold text-brand-navy">Menu</span>
            <button type="button" aria-label="Close navigation menu" onClick={close} className="flex size-11 items-center justify-center rounded-md text-xl text-brand-navy transition-colors hover:bg-brand-surface motion-reduce:transition-none">
              ✕
            </button>
            </SidebarHeader>
            <SidebarContent className="px-5 py-4 sm:px-8">
              <div ref={panelRef} id="mobile-nav" className="contents">
            {!viewTag ? (
              <ul className="flex flex-col">
                {TAGS.map((tag) => (
                  <li
                    key={tag.id}
                    className="border-b border-brand-border last:border-0"
                  >
                    <button
                      type="button"
                      onClick={() => selectTag(tag.id)}
                      className="flex min-h-11 w-full items-center justify-between py-3 text-left text-sm font-medium text-brand-ink"
                    >
                      {tag.label}
                      <span aria-hidden="true">›</span>
                    </button>
                  </li>
                ))}
                <li className="border-b border-brand-border last:border-0">
                  <Link href="/careers" onClick={close} className="flex min-h-11 w-full items-center justify-between py-3 text-sm font-medium text-brand-ink hover:text-brand-gold motion-reduce:transition-none">
                    Careers
                    <span aria-hidden="true">›</span>
                  </Link>
                </li>
                <li className="border-b border-brand-border last:border-0">
                  <Link href="/#our-people" onClick={close} className="flex min-h-11 w-full items-center justify-between py-3 text-sm font-medium text-brand-ink hover:text-brand-gold motion-reduce:transition-none">
                    Our People
                    <span aria-hidden="true">›</span>
                  </Link>
                </li>
              </ul>
            ) : (
              <>
                <div className="mb-3 flex min-h-11 items-center gap-3 border-b border-brand-border-strong pb-3">
                  <button
                    type="button"
                    onClick={() =>
                      path.length
                        ? setPath((currentPath) => currentPath.slice(0, -1))
                        : setViewTag(null)
                    }
                    className="text-sm font-medium text-brand-gold"
                  >
                    ← Back
                  </button>

                  <span className="text-lg font-bold text-brand-navy mx-auto">
                    {current?.label ??
                      TAGS.find((tag) => tag.id === viewTag)?.label}
                  </span>
                </div>

                <ul className="flex flex-col">
                  {current?.href && (
                    <li>
                      <Link
                        href={current.href}
                        onClick={close}
                        className="block min-h-11 py-3 text-sm font-semibold text-brand-gold"
                      >
                        View all {current.label}
                      </Link>
                    </li>
                  )}
                  {list.map((node) => (
                    <li
                      key={node.label}
                      className="border-b border-brand-border last:border-0"
                    >
                      {node.children?.length ? (
                        <button
                          type="button"
                          disabled={node.disabled}
                          aria-disabled={node.disabled ? "true" : undefined}
                          onClick={() => handleNodeClick(node)}
                          className="flex min-h-11 w-full items-center justify-between py-3 text-left text-sm font-medium text-brand-ink disabled:cursor-not-allowed disabled:text-brand-slate-light"
                        >
                          {node.label}
                          <span aria-hidden="true">›</span>
                        </button>
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
                          onClick={close}
                          className="block min-h-11 py-3 text-sm font-medium text-brand-ink hover:text-brand-gold motion-reduce:transition-none"
                        >
                          {node.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
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
        </SidebarProvider>
      )}
    </div>
  );
}
