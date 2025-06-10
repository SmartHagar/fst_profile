/** @format */

// components/video/VideoGrid.tsx
"use client";

import React from "react";
import { VideoData } from "@/stores/video";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";
import YouTubeThumbnail from "./YouTubeThumbnail";

interface VideoGridProps {
  videos: VideoData[];
  loading: boolean;
  onVideoClick: (video: VideoData, index: number) => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({
  videos,
  loading,
  onVideoClick,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(8)].map((_, index) => (
          <ScrollRevealComponent
            key={index}
            animations="fade-up"
            delay={index * 100}
          >
            <div className="animate-pulse">
              <div className="bg-base-300 aspect-video rounded-lg mb-2"></div>
              <div className="bg-base-300 h-4 rounded w-3/4 mb-1"></div>
              <div className="bg-base-300 h-3 rounded w-1/2"></div>
            </div>
          </ScrollRevealComponent>
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <ScrollRevealComponent animations="fade-up">
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-base-200 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-base-content/40"
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
          <h3 className="text-xl font-semibold text-base-content/70 mb-2">
            Belum Ada Video
          </h3>
          <p className="text-base-content/50">
            Video belum tersedia atau sedang dimuat.
          </p>
        </div>
      </ScrollRevealComponent>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {videos.map((video, index) => (
        <ScrollRevealComponent
          key={video.id}
          animations="zoom-in"
          delay={index * 50}
          duration={600}
        >
          <div className="group">
            {/* Video Thumbnail */}
            <YouTubeThumbnail
              videoUrl={video.url}
              title={video.judul}
              className="mb-3 shadow-md hover:shadow-xl transition-shadow duration-300"
              onClick={() => onVideoClick(video, index)}
            />

            {/* Video Info */}
            <div className="px-1">
              <h3
                className="font-semibold text-sm line-clamp-2 text-base-content mb-1 group-hover:text-primary transition-colors duration-200 cursor-pointer"
                onClick={() => onVideoClick(video, index)}
              >
                {video.judul}
              </h3>

              {video.deskripsi && (
                <p className="text-xs text-base-content/60 line-clamp-2">
                  {video.deskripsi}
                </p>
              )}

              {/* Optional: Add date */}
              {video.created_at && (
                <p className="text-xs text-base-content/40 mt-1">
                  {new Date(video.created_at).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>
        </ScrollRevealComponent>
      ))}
    </div>
  );
};

export default VideoGrid;
