/** @format */

// components/ui/ViewToggle.tsx
"use client";

import { List, Grid3X3 } from "lucide-react";

interface ViewToggleProps {
  viewMode: "list" | "grid";
  onViewChange: (mode: "list" | "grid") => void;
  className?: string;
}

const ViewToggle = ({
  viewMode,
  onViewChange,
  className = "",
}: ViewToggleProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-base-content/70">
        Tampilan:
      </span>
      <div className="join">
        <button
          className={`btn btn-sm join-item ${
            viewMode === "list" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => onViewChange("list")}
          title="Tampilan List"
        >
          <List size={16} />
          <span className="hidden sm:inline">List</span>
        </button>
        <button
          className={`btn btn-sm join-item ${
            viewMode === "grid" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => onViewChange("grid")}
          title="Tampilan Grid"
        >
          <Grid3X3 size={16} />
          <span className="hidden sm:inline">Grid</span>
        </button>
      </div>
    </div>
  );
};

export default ViewToggle;
