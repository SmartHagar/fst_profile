/** @format */

// components/BannerVariants.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Gradient Banner (tanpa background image)
export const GradientBanner: React.FC<{
  title: string;
  subtitle?: string;
  description?: string;
  gradientFrom?: string;
  gradientTo?: string;
}> = ({
  title,
  subtitle,
  description,
  gradientFrom = "from-primary",
  gradientTo = "to-secondary",
}) => {
  return (
    <div
      className={`h-80 bg-gradient-to-r ${gradientFrom} ${gradientTo} flex items-center justify-center`}
    >
      <div className="text-center text-white space-y-4 px-4">
        {subtitle && (
          <p className="text-sm font-medium opacity-90 uppercase tracking-wider">
            {subtitle}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
        {description && (
          <p className="text-lg md:text-xl opacity-90 max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

// Minimal Banner (untuk halaman dalam)
export const MinimalBanner: React.FC<{
  title: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}> = ({ title, breadcrumbs }) => {
  return (
    <div className="bg-base-200 py-8">
      <div className="container mx-auto px-4">
        {breadcrumbs && (
          <div className="breadcrumbs text-sm mb-4">
            <ul>
              {breadcrumbs.map((crumb, index) => (
                <li key={index}>
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-primary">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-base-content">
          {title}
        </h1>
      </div>
    </div>
  );
};

// Split Banner (gambar dan teks terpisah)
export const SplitBanner: React.FC<{
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  imagePosition?: "left" | "right";
}> = ({ title, subtitle, description, image, imagePosition = "right" }) => {
  const isImageRight = imagePosition === "right";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
      <div
        className={`flex items-center justify-center p-8 lg:p-12 bg-base-100 ${
          isImageRight ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <div className="space-y-4">
          {subtitle && (
            <p className="text-sm font-medium text-primary uppercase tracking-wider">
              {subtitle}
            </p>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-base-content/80 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className={`relative ${isImageRight ? "lg:order-2" : "lg:order-1"}`}>
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
    </div>
  );
};

// Video Banner
export const VideoBanner: React.FC<{
  title: string;
  subtitle?: string;
  description?: string;
  videoSrc: string;
  posterImage?: string;
}> = ({ title, subtitle, description, videoSrc, posterImage }) => {
  return (
    <div className="relative h-96 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={posterImage}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
        <div className="space-y-4">
          {subtitle && (
            <p className="text-sm font-medium opacity-90 uppercase tracking-wider">
              {subtitle}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            {title}
          </h1>
          {description && (
            <p className="text-lg md:text-xl opacity-90 max-w-3xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
