"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import type { ProductPageData } from "@/lib/types";

export type ProductSelection = ProductPageData["selectionList"][number];

export function TabsMenu({
  selections,
}: {
  selections: ProductSelection[];
}) {
  const [selectedValue, setSelectedValue] = useState(selections[0]?.id ?? "");
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (!selections.some((selection) => selection.id === selectedValue)) {
      setSelectedValue(selections[0]?.id ?? "");
    }
  }, [selections, selectedValue]);

  const selectedSelection =
    selections.find((selection) => selection.id === selectedValue) ??
    selections[0];

  if (selections.length === 0 || !selectedSelection) return null;

  return (
    <div className="w-full">
      {/* Mobile view */}
      {isMobile ? (
        <div className="relative border-b border-slate-200 pb-3">
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex min-h-11 w-full items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 font-semibold text-[#e07a2c]"
          >
            <span className="flex items-center gap-2">
              <Menu aria-hidden="true" className="size-4 shrink-0" />
              <span>{selectedSelection.label}</span>
            </span>
            <ChevronDown
              aria-hidden="true"
              className={`size-4 shrink-0 transition-transform ${
                mobileMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {mobileMenuOpen && (
            <div className="mt-2 flex flex-col gap-1 rounded-lg border border-slate-200 bg-white p-2 shadow-md">
              {selections.map((selection) => (
                <button
                  key={selection.id}
                  type="button"
                  onClick={() => {
                    setSelectedValue(selection.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium transition ${
                    selection.id === selectedValue
                      ? "bg-orange-50 font-semibold text-[#e07a2c]"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {selection.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Desktop view */
        <div className="border-b border-slate-200">
          <nav
            className="-mb-px flex flex-wrap gap-6 sm:gap-10 overflow-x-auto scrollbar-none"
            aria-label="Product tabs"
          >
            {selections.map((selection) => {
              const isActive = selection.id === selectedValue;
              return (
                <button
                  key={selection.id}
                  type="button"
                  onClick={() => setSelectedValue(selection.id)}
                  className={`relative pb-3 text-lg sm:text-xl font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-[#e07a2c] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#e07a2c]"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  {selection.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Tab Content */}
      <div className="pt-6 sm:pt-8">
        {selectedSelection.items && selectedSelection.items.length > 0 ? (
          <ul className="space-y-4">
            {selectedSelection.items.map((item, index) => (
              <li
                key={index}
                className="text-base sm:text-lg leading-relaxed text-slate-700"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <div className="space-y-4">
            {selectedSelection.title && (
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">
                {selectedSelection.title}
              </h3>
            )}
            {selectedSelection.description && (
              <p className="text-base sm:text-lg leading-relaxed text-slate-700 whitespace-pre-line">
                {selectedSelection.description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
