/** @format */

// hooks/useViewPreference.ts
import { useState, useEffect } from "react";

type ViewMode = "list" | "grid";

interface UseViewPreferenceReturn {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const useViewPreference = (
  defaultMode: ViewMode = "list"
): UseViewPreferenceReturn => {
  const [viewMode, setViewModeState] = useState<ViewMode>(defaultMode);

  // Load saved preference on mount
  useEffect(() => {
    try {
      const savedMode = localStorage.getItem("viewPreference");
      if (savedMode && (savedMode === "list" || savedMode === "grid")) {
        setViewModeState(savedMode as ViewMode);
      }
    } catch (error) {
      console.warn("Failed to load view preference from localStorage:", error);
    }
  }, []);

  // Save preference when it changes
  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    try {
      localStorage.setItem("viewPreference", mode);
    } catch (error) {
      console.warn("Failed to save view preference to localStorage:", error);
    }
  };

  return {
    viewMode,
    setViewMode,
  };
};
