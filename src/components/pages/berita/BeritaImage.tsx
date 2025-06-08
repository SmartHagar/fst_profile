/** @format */

// components/berita/BeritaImage.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

interface BeritaImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  width?: number;
  height?: number;
}

const BeritaImage = ({
  src,
  alt,
  priority = false,
  className = "",
  width = 800,
  height = 600,
}: BeritaImageProps) => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div
        className={`bg-base-200 flex flex-col items-center justify-center p-8 rounded-lg ${className}`}
      >
        <ImageOff size={48} className="text-base-content/50 mb-2" />
        <span className="text-base-content/70 text-sm">
          Gambar tidak dapat dimuat
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="w-full h-auto object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
};

export default BeritaImage;
