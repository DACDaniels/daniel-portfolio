"use client";

import { useCallback, useSyncExternalStore } from "react";

export const PROJECT_FILTERS = [
  { id: "all", label: "All" },
  { id: "client-systems", label: "Client systems" },
  { id: "products-hardware", label: "Products and hardware" },
  { id: "automation-ai", label: "Automation and AI" },
  { id: "websites", label: "Websites" },
] as const;

export type ProjectFilterId = (typeof PROJECT_FILTERS)[number]["id"];
export type ProjectGroup = Exclude<ProjectFilterId, "all">;

const HASH_PREFIX = "#work-";
const HASH_EVENT = "project-filter-change";

function filterFromHash(hash: string): ProjectFilterId {
  if (!hash.startsWith(HASH_PREFIX)) return "all";
  const id = hash.slice(HASH_PREFIX.length);
  return PROJECT_FILTERS.some((f) => f.id === id && id !== "all")
    ? (id as ProjectFilterId)
    : "all";
}

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener(HASH_EVENT, onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener(HASH_EVENT, onChange);
  };
}

/**
 * The chosen filter lives in the URL hash (#work-websites), so a shared or
 * reloaded link keeps it. The server and first paint always show All.
 */
export function useProjectFilter() {
  const active = useSyncExternalStore(
    subscribe,
    () => filterFromHash(window.location.hash),
    () => "all" as ProjectFilterId,
  );

  const setActive = useCallback((id: ProjectFilterId) => {
    const hash = id === "all" ? "#projects" : `${HASH_PREFIX}${id}`;
    // replaceState, not location.hash, so choosing a chip never scrolls.
    window.history.replaceState(null, "", hash);
    window.dispatchEvent(new Event(HASH_EVENT));
  }, []);

  return { active, setActive };
}

export function isFilterHash(hash: string) {
  return filterFromHash(hash) !== "all";
}
