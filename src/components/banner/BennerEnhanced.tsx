/** @format */

"use client";

import React, { useState } from "react";
import Image from "next/image";

const BennerEnhanced: React.FC = () => {
  const [imageLoadError, setImageLoadError] = useState<boolean>(false);

  // Data banner statis
  const bannerData = {
    id: 1,
    title: "Banner Title",
    description: "Banner description text here",
    image: "/images/banner/1.png",
    link: "#", // Optional: ganti dengan link yang diinginkan
  };

  // Handle image load error
  const handleImageError = () => {
    setImageLoadError(true);
  };

  return (
    <div className="relative w-full">
      <div className="relative h-32 lg:h-72 md:h-64 w-full overflow-hidden group">
        {/* Next.js Image Component dengan error handling */}
        {!imageLoadError ? (
          <Image
            src={bannerData.image}
            alt={bannerData.title}
            fill
            className="object-fill transition-transform duration-700 group-hover:scale-105"
            priority={true}
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            onError={handleImageError}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500">Image not found</span>
          </div>
        )}

        {/* Overlay gradient */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div> */}
      </div>

      {/* Custom CSS untuk animasi */}
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-delay-2 {
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default BennerEnhanced;
