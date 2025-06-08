/** @format */

// hooks/useViewPreference.ts
import { useState, useCallback } from "react";

type ViewMode = "list" | "grid";

interface UseViewPreferenceReturn {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleView: () => void;
  isListView: boolean;
  isGridView: boolean;
}

export const useViewPreference = (
  defaultView: ViewMode = "list"
): UseViewPreferenceReturn => {
  const [viewMode, setViewModeState] = useState<ViewMode>(defaultView);

  const setViewMode = useCallback((mode: ViewMode) => {
    setViewModeState(mode);
  }, []);

  const toggleView = useCallback(() => {
    setViewModeState((prev) => (prev === "list" ? "grid" : "list"));
  }, []);

  return {
    viewMode,
    setViewMode,
    toggleView,
    isListView: viewMode === "list",
    isGridView: viewMode === "grid",
  };
};
