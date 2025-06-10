/** @format */

// components/gallery/GalleryGrid.tsx

"use client";

import React from "react";
import Image from "next/image";
import { GaleriData } from "@/stores/galeri";
import { BASE_URL } from "@/services/baseURL";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";

interface GalleryGridProps {
  images: GaleriData[];
  loading: boolean;
  onImageClick: (image: GaleriData, index: number) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({
  images,
  loading,
  onImageClick,
}) => {
  const getImageUrl = (path: string) => {
    return `${BASE_URL}/storage/${path}`;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <ScrollRevealComponent
            key={index}
            animations="fade-up"
            offset={100}
            delay={index * 100}
          >
            <div className="animate-pulse">
              <div className="bg-base-300 aspect-square rounded-lg"></div>
            </div>
          </ScrollRevealComponent>
        ))}
      </div>
    );
  }

  if (images.length === 0) {
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-base-content/70 mb-2">
            Belum Ada Foto
          </h3>
          <p className="text-base-content/50">
            Galeri foto masih kosong atau sedang dimuat.
          </p>
        </div>
      </ScrollRevealComponent>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <ScrollRevealComponent
          key={image.id}
          animations="zoom-in"
          delay={index * 50}
          duration={600}
        >
          <div
            className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            onClick={() => onImageClick(image, index)}
          >
            <div className="relative aspect-square overflow-hidden bg-base-200">
              <Image
                src={getImageUrl(image.path_gambar)}
                alt={
                  image.kegiatan_det?.kegiatan?.nm_kegiatan || "Gallery image"
                }
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                width={1000}
                height={1000}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-sm line-clamp-2">
                    {image.kegiatan_det?.kegiatan?.nm_kegiatan}
                  </h3>
                </div>

                {/* View Icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollRevealComponent>
      ))}
    </div>
  );
};

export default GalleryGrid;
