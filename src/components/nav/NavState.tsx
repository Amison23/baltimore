"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { DEFAULT_TAG, type TagId } from "@/lib/nav";

type NavStateValue = {
  activeTag: TagId;
  setActiveTag: (tag: TagId) => void;
};

const NavStateContext = createContext<NavStateValue | null>(null);

export function NavStateProvider({ children }: { children: ReactNode }) {
  const [activeTag, setActiveTag] = useState<TagId>(DEFAULT_TAG);
  return <NavStateContext.Provider value={{ activeTag, setActiveTag }}>{children}</NavStateContext.Provider>;
}

export function useNavState(): NavStateValue {
  const value = useContext(NavStateContext);
  if (!value) throw new Error("useNavState must be used inside NavStateProvider");
  return value;
}
