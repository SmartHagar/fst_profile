/** @format */

// components/pagination/Paginate.tsx

"use client";

import React from "react";

interface PaginateProps {
  current_page: number;
  last_page: number;
  total: number;
  setPage?: (page: number) => void;
  className?: string;
}

const Paginate: React.FC<PaginateProps> = ({
  current_page,
  last_page,
  total,
  setPage,
  className = "",
}) => {
  if (last_page <= 1) {
    return null;
  }

  // Generate page numbers to show
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Calculate start and end page numbers
    const start = Math.max(2, current_page - delta);
    const end = Math.min(last_page - 1, current_page + delta);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Add first page
    if (current_page - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    // Add middle pages
    rangeWithDots.push(...range);

    // Add last page
    if (current_page + delta < last_page - 1) {
      rangeWithDots.push("...", last_page);
    } else if (last_page !== 1) {
      rangeWithDots.push(last_page);
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  const handlePageClick = (page: number | string) => {
    if (typeof page === "number" && page !== current_page) {
      setPage?.(page);
    }
  };

  const handlePrevious = () => {
    if (current_page > 1) {
      setPage?.(current_page - 1);
    }
  };

  const handleNext = () => {
    if (current_page < last_page) {
      setPage?.(current_page + 1);
    }
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      {/* Pagination Info */}
      <div className="text-sm text-base-content/60">
        Menampilkan halaman{" "}
        <span className="font-semibold text-primary">{current_page}</span> dari{" "}
        <span className="font-semibold text-primary">{last_page}</span> (
        <span className="font-semibold">{total}</span> total item)
      </div>

      {/* Pagination Controls */}
      <div className="join hidden sm:block">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={current_page === 1}
          className="join-item btn btn-sm"
          aria-label="Previous page"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Sebelumnya
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <button className="join-item btn btn-sm ">...</button>
            ) : (
              <button
                onClick={() => handlePageClick(page)}
                className={`join-item btn btn-sm ${
                  page === current_page ? "btn-primary" : "btn-ghost"
                }`}
                aria-label={`Go to page ${page}`}
                aria-current={page === current_page ? "page" : undefined}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={current_page === last_page}
          className="join-item btn btn-sm"
          aria-label="Next page"
        >
          Selanjutnya
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Pagination (Alternative for small screens) */}
      <div className="sm:hidden flex items-center space-x-2">
        <button
          onClick={handlePrevious}
          disabled={current_page === 1}
          className="btn btn-sm btn-circle"
          aria-label="Previous page"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex items-center space-x-1">
          <span className="text-sm text-base-content/60">Halaman</span>
          <select
            value={current_page}
            onChange={(e) => setPage?.(Number(e.target.value))}
            className="select select-sm select-bordered w-20"
          >
            {Array.from({ length: last_page }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <span className="text-sm text-base-content/60">dari {last_page}</span>
        </div>

        <button
          onClick={handleNext}
          disabled={current_page === last_page}
          className="btn btn-sm btn-circle"
          aria-label="Next page"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Quick Jump (Optional) */}
      <div className="hidden md:flex items-center space-x-2 text-sm">
        <span className="text-base-content/60">Lompat ke halaman:</span>
        <input
          type="number"
          min="1"
          max={last_page}
          className="input input-sm input-bordered w-20"
          placeholder="1"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              const value = parseInt((e.target as HTMLInputElement).value);
              if (value >= 1 && value <= last_page) {
                setPage?.(value);
                (e.target as HTMLInputElement).value = "";
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default Paginate;

// Simple Pagination (minimal version)
export const SimplePaginate: React.FC<PaginateProps> = ({
  setPage,
  current_page,
  last_page,
}) => {
  if (last_page <= 1) {
    return null;
  }

  return (
    <div className="join">
      <button
        onClick={() => setPage?.(current_page - 1)}
        disabled={current_page === 1}
        className="join-item btn"
      >
        «
      </button>
      <button className="join-item btn btn-active">{current_page}</button>
      <button
        onClick={() => setPage?.(current_page + 1)}
        disabled={current_page === last_page}
        className="join-item btn"
      >
        »
      </button>
    </div>
  );
};
