/** @format */

// components/loading/ImgLoading.tsx

"use client";

import React from "react";
import ScrollRevealComponent from "../effects/ScrollRevealComponent";

const ImgLoading: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, index) => (
        <ScrollRevealComponent
          key={index}
          animations="fade-up"
          delay={index * 100}
        >
          <div className="card bg-base-100 shadow-md">
            <div className="animate-pulse">
              {/* Image Skeleton */}
              <div className="aspect-square bg-base-300 rounded-t-lg"></div>

              {/* Content Skeleton */}
              <div className="card-body p-4">
                <div className="space-y-2">
                  <div className="h-3 bg-base-300 rounded w-3/4"></div>
                  <div className="h-3 bg-base-300 rounded w-1/2"></div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="h-2 bg-base-300 rounded w-1/4"></div>
                  <div className="h-6 w-6 bg-base-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </ScrollRevealComponent>
      ))}
    </div>
  );
};

// Gallery Grid Loading - untuk loading yang lebih simple
export const GalleryGridLoading: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(12)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-square bg-base-300 rounded-lg"></div>
        </div>
      ))}
    </div>
  );
};

// Single Image Loading
export const SingleImageLoading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-pulse flex flex-col items-center space-y-4">
        <div className="w-32 h-32 bg-base-300 rounded-lg"></div>
        <div className="space-y-2 text-center">
          <div className="h-4 bg-base-300 rounded w-48"></div>
          <div className="h-3 bg-base-300 rounded w-32"></div>
        </div>
      </div>
    </div>
  );
};

// Page Loading with Spinner
export const PageLoading: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300 flex items-center justify-center">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
        <h3 className="text-lg font-semibold text-base-content mb-2">
          Memuat Galeri
        </h3>
        <p className="text-base-content/60">Mohon tunggu sebentar...</p>
      </div>
    </div>
  );
};

// Content Loading (for sections)
export const ContentLoading: React.FC = () => {
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <div className="animate-pulse space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-base-300 rounded-full"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-base-300 rounded w-3/4"></div>
              <div className="h-3 bg-base-300 rounded w-1/2"></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-3 bg-base-300 rounded"></div>
            <div className="h-3 bg-base-300 rounded w-5/6"></div>
            <div className="h-3 bg-base-300 rounded w-4/6"></div>
          </div>

          <div className="flex space-x-4">
            <div className="h-8 bg-base-300 rounded w-20"></div>
            <div className="h-8 bg-base-300 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImgLoading;
