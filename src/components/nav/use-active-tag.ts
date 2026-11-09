"use client";

import { usePathname } from "next/navigation";
import { DEFAULT_TAG, isTagId, type TagId } from "@/lib/nav";

export function useActiveTag(): TagId {
  const pathname = usePathname();
  const firstSegment = pathname.split("/").filter(Boolean)[0] ?? "";

  return isTagId(firstSegment) ? firstSegment : DEFAULT_TAG;
}
