/** @format */

// components/video/VideoStatistics.tsx
"use client";

import React from "react";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";

interface VideoStatisticsProps {
  totalVideos: number;
  currentPage: number;
  totalPages: number;
}

const VideoStatistics: React.FC<VideoStatisticsProps> = ({
  totalVideos,
  currentPage,
  totalPages,
}) => {
  if (totalVideos === 0) return null;

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
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="stat-title">Total Video</div>
            <div className="stat-value text-primary">{totalVideos}</div>
            <div className="stat-desc">Koleksi video</div>
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

          <div className="stat">
            <div className="stat-figure text-accent">
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
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-10 5a2 2 0 002 2h8a2 2 0 002-2M7 3a2 2 0 00-2 2v1a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H7z"
                />
              </svg>
            </div>
            <div className="stat-title">Platform</div>
            <div className="stat-value text-accent">YouTube</div>
            <div className="stat-desc">Video streaming</div>
          </div>
        </div>
      </div>
    </ScrollRevealComponent>
  );
};

export default VideoStatistics;
