/** @format */

// components/video/YouTubeThumbnail.tsx
import React from "react";
import Image from "next/image";

interface YouTubeThumbnailProps {
  videoUrl: string;
  title?: string;
  className?: string;
  onClick?: () => void;
}

const YouTubeThumbnail: React.FC<YouTubeThumbnailProps> = ({
  videoUrl,
  title = "Video Thumbnail",
  className = "",
  onClick,
}) => {
  // Fungsi untuk mengekstrak ID video dari URL
  const extractVideoId = (url: string): string | null => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|embed|watch)(?:\.php)?\?v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = extractVideoId(videoUrl);

  if (!videoId) {
    return (
      <div
        className={`bg-gray-200 rounded-lg flex items-center justify-center aspect-video ${className}`}
      >
        <p className="text-gray-500">Invalid YouTube URL</p>
      </div>
    );
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      className={`relative group cursor-pointer overflow-hidden rounded-lg ${className}`}
      onClick={onClick}
    >
      <div className="relative aspect-video">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <div className="bg-red-600 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-8 h-8 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Duration badge (optional - you can add this if you have duration data) */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          Video
        </div>
      </div>

      {/* Title overlay */}
      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white text-sm font-medium line-clamp-2">
            {title}
          </h3>
        </div>
      )}
    </div>
  );
};

export default YouTubeThumbnail;
