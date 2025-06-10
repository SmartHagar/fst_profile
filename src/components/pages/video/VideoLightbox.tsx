/** @format */

// components/video/VideoLightbox.tsx
"use client";

import React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ReactPlayer from "react-player";
import { VideoData } from "@/stores/video";

interface VideoLightboxProps {
  videos: VideoData[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const VideoLightbox: React.FC<VideoLightboxProps> = ({
  videos,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}) => {
  // Convert videos to lightbox format
  const lightboxSlides = videos.map((video) => ({
    type: "video" as const,
    src: video.url,
    title: video.judul,
    description: video.deskripsi,
  }));

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      slides={lightboxSlides as any}
      index={currentIndex}
      on={{
        view: ({ index }) => onIndexChange(index),
      }}
      carousel={{
        finite: true,
      }}
      render={{
        slide: ({ slide, rect }) => {
          const maxWidth = Math.min(rect.width * 0.9, 1200);
          const maxHeight = Math.min(rect.height * 0.9, 800);

          return (
            <div
              style={{
                position: "relative",
                width: maxWidth,
                height: maxHeight,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Video Player */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#000",
                  borderRadius: "8px 8px 0 0",
                  overflow: "hidden",
                }}
              >
                <ReactPlayer
                  url={slide.src}
                  width="100%"
                  height="100%"
                  controls={true}
                  playing={false}
                  config={{
                    youtube: {
                      playerVars: {
                        showinfo: 1,
                        modestbranding: 1,
                      },
                    },
                  }}
                />
              </div>

              {/* Video Info */}
              {(slide as any).title && (
                <div
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.6))",
                    padding: "16px",
                    borderRadius: "0 0 8px 8px",
                    color: "white",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      margin: "0 0 8px 0",
                      lineHeight: "1.4",
                    }}
                  >
                    {(slide as any).title}
                  </h3>
                  {(slide as any).description && (
                    <p
                      style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.8)",
                        margin: "0 0 8px 0",
                        lineHeight: "1.4",
                      }}
                    >
                      {(slide as any).description}
                    </p>
                  )}
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.6)",
                      margin: 0,
                    }}
                  >
                    {currentIndex + 1} dari {videos.length}
                  </p>
                </div>
              )}
            </div>
          );
        },
      }}
      controller={{
        closeOnBackdropClick: true,
        closeOnPullDown: true,
        closeOnPullUp: true,
      }}
      animation={{
        fade: 300,
        swipe: 500,
      }}
      styles={{
        container: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
        },
      }}
    />
  );
};

export default VideoLightbox;
