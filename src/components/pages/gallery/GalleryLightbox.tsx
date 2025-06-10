/** @format */

// components/gallery/GalleryLightbox.tsx

"use client";

import React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { GaleriData } from "@/stores/galeri";
import { BASE_URL } from "@/services/baseURL";
import Image from "next/image";

interface GalleryLightboxProps {
  images: GaleriData[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}) => {
  // Convert images to lightbox format
  const lightboxImages = images.map((image) => ({
    src: `${BASE_URL}/storage/${image.path_gambar}`,
    alt: image.kegiatan_det?.kegiatan?.nm_kegiatan || "Gallery image",
  }));

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      slides={lightboxImages}
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
              }}
            >
              <Image
                src={slide.src}
                alt={slide.alt || ""}
                width={maxWidth}
                height={maxHeight}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
              {slide.alt && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                    padding: "16px",
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                  }}
                >
                  <h3
                    style={{
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "600",
                      textAlign: "center",
                      margin: 0,
                    }}
                  >
                    {slide.alt}
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "14px",
                      textAlign: "center",
                      margin: "4px 0 0 0",
                    }}
                  >
                    {currentIndex + 1} dari {images.length}
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
    />
  );
};

export default GalleryLightbox;
