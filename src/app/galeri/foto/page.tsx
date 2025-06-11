/** @format */

// app/galeri/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useGaleri, { GaleriData } from "@/stores/galeri";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";
import GalleryGrid from "@/components/pages/gallery/GalleryGrid";
import GalleryLightbox from "@/components/pages/gallery/GalleryLightbox";
import GalleryStatistics from "@/components/pages/gallery/GalleryStatistics";
import { useBanner } from "@/context/BannerContext";

// Dynamic import untuk pagination jika ada
const Paginate = dynamic(() => import("@/components/pagination/Paginate"), {
  ssr: false,
  loading: () => <div className="skeleton h-12 w-full"></div>,
});

const GaleriPage = () => {
  // banner
  const { setBannerConfig } = useBanner();

  useEffect(() => {
    setBannerConfig({
      type: "minimal",
      title: "Galeri Foto",
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
          label: "Galeri Foto",
        },
      ],
    });

    return () => {
      setBannerConfig(null);
    };
  }, [setBannerConfig]);
  // store
  const { setGaleri, dataGaleri, loading, error, clearError, currentPage } =
    useGaleri();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<GaleriData[]>([]);
  const [page, setPage] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Fetch galeri data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await setGaleri(page);
        if (result.status === "berhasil" && result.data?.data) {
          setImages(result.data.data);
        }
      } catch (error) {
        console.error("Error fetching galeri:", error);
      }
    };

    fetchData();
  }, [page, setGaleri]);

  // Handle image click
  const handleImageClick = (image: GaleriData, index: number) => {
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
      {/* Lightbox */}
      <GalleryLightbox
        images={images}
        currentIndex={currentIndex}
        isOpen={isLightboxOpen}
        onClose={handleLightboxClose}
        onIndexChange={handleIndexChange}
      />

      {/* Main Gallery Content */}
      <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <ScrollRevealComponent animations="fade-down" duration={800}>
            <div className="text-center mb-12">
              <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                Dokumentasi kegiatan dan momen berharga di Fakultas Sains &
                Teknologi
              </p>
            </div>
          </ScrollRevealComponent>

          {/* Error Message */}
          {error && (
            <ScrollRevealComponent animations="fade-up">
              <div className="alert alert-error mb-6 flex items-center justify-between">
                <span>{error}</span>
                <button
                  onClick={clearError}
                  className="btn btn-sm btn-ghost text-error"
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

          {/* Gallery Grid */}
          <div className="mb-8">
            <GalleryGrid
              images={images}
              loading={loading}
              onImageClick={handleImageClick}
            />
          </div>

          {/* Pagination */}
          {dataGaleri.data?.meta && (
            <ScrollRevealComponent animations="fade-up">
              <div className="flex justify-center">
                <Paginate responses={dataGaleri} setPage={setPage} />
              </div>
            </ScrollRevealComponent>
          )}

          {/* Statistics */}
          <GalleryStatistics
            totalImages={dataGaleri.data?.meta?.total || images.length}
            currentPage={currentPage}
            totalPages={dataGaleri.data?.meta?.last_page || 1}
          />
        </div>
      </div>
    </>
  );
};

export default GaleriPage;
