/** @format */

// app/video/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useVideo, { VideoData } from "@/stores/video";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";
import VideoGrid from "@/components/pages/video/VideoGrid";
import VideoLightbox from "@/components/pages/video/VideoLightbox";
import VideoStatistics from "@/components/pages/video/VideoStatistics";
import { useBanner } from "@/context/BannerContext";

// Dynamic import untuk pagination
const Paginate = dynamic(() => import("@/components/pagination/Paginate"), {
  ssr: false,
  loading: () => <div className="skeleton h-12 w-full"></div>,
});

const VideoPage = () => {
  // banner
  const { setBannerConfig } = useBanner();

  useEffect(() => {
    setBannerConfig({
      type: "minimal",
      title: "Galeri Video",
      show: true,
      breadcrumbs: [
        {
          label: "Beranda",
          href: "/",
        },
        {
          label: "Galeri",
        },
        {
          label: "Galeri Video",
        },
      ],
    });

    return () => {
      setBannerConfig(null);
    };
  }, [setBannerConfig]);

  // store
  const { setVideo, dataVideo, loading, error, clearError, currentPage } =
    useVideo();
  // state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [page, setPage] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Fetch video data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await setVideo(page);
        if (result.status === "berhasil" && result.data?.data) {
          setVideos(result.data.data);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchData();
  }, [page, setVideo]);

  // Handle video click
  const handleVideoClick = (video: VideoData, index: number) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  // Handle lightbox close
  const handleLightboxClose = () => {
    setIsLightboxOpen(false);
  };

  // Handle index change in lightbox
  const handleIndexChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {/* Video Lightbox */}
      <VideoLightbox
        videos={videos}
        currentIndex={currentIndex}
        isOpen={isLightboxOpen}
        onClose={handleLightboxClose}
        onIndexChange={handleIndexChange}
      />

      {/* Main Video Content */}
      <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <ScrollRevealComponent animations="fade-down" duration={800}>
            <div className="text-center mb-12">
              <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                Kumpulan video dokumentasi kegiatan dan informasi terkini dari
                Fakultas Sains & Teknologi
              </p>
            </div>
          </ScrollRevealComponent>
          {/* Error Message */}
          {error && (
            <ScrollRevealComponent animations="fade-up">
              <div className="alert alert-error mb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
                <button
                  onClick={clearError}
                  className="btn btn-sm btn-ghost text-error"
                  aria-label="Close error message"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </ScrollRevealComponent>
          )}

          {/* Video Grid */}
          <div className="mb-8">
            <VideoGrid
              videos={videos}
              loading={loading}
              onVideoClick={handleVideoClick}
            />
          </div>

          {/* Pagination */}
          {dataVideo.data?.meta && (
            <ScrollRevealComponent animations="fade-up">
              <div className="flex justify-center">
                <Paginate responses={dataVideo} setPage={setPage} />
              </div>
            </ScrollRevealComponent>
          )}

          {/* Statistics */}
          <VideoStatistics
            totalVideos={dataVideo.data?.meta?.total || videos.length}
            currentPage={currentPage}
            totalPages={dataVideo.data?.meta?.last_page || 1}
          />
        </div>
      </div>
    </>
  );
};

export default VideoPage;
