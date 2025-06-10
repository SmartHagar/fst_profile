/** @format */

// components/gallery/GalleryStatistics.tsx

"use client";

import React from "react";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";

interface GalleryStatisticsProps {
  totalImages: number;
  currentPage: number;
  totalPages: number;
}

const GalleryStatistics: React.FC<GalleryStatisticsProps> = ({
  totalImages,
  currentPage,
  totalPages,
}) => {
  if (totalImages === 0) return null;

  return (
    <ScrollRevealComponent animations="fade-up" delay={200}>
      <div className="mt-12 text-center">
        <div className="stats stats-vertical lg:stats-horizontal shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="stat-title">Total Foto</div>
            <div className="stat-value text-primary">{totalImages}</div>
            <div className="stat-desc">Dokumentasi kegiatan</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div className="stat-title">Halaman</div>
            <div className="stat-value text-secondary">{currentPage}</div>
            <div className="stat-desc">dari {totalPages}</div>
          </div>
        </div>
      </div>
    </ScrollRevealComponent>
  );
};

export default GalleryStatistics;
