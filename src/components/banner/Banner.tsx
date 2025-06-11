/** @format */

// components/Banner.tsx
import Image from "next/image";
import React from "react";

interface BannerProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage: string;
  overlay?: boolean;
  overlayOpacity?: number;
  textPosition?: "left" | "center" | "right";
  height?: "sm" | "md" | "lg" | "xl";
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  overlay = true,
  overlayOpacity = 0.6,
  textPosition = "center",
  height = "md",
  breadcrumbs,
}) => {
  const heightClasses = {
    sm: "h-64",
    md: "h-80",
    lg: "h-96",
    xl: "h-screen",
  };

  const textAlignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const justifyClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div className={`relative w-full ${heightClasses[height]} overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>

      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <div
        className={`relative z-10 h-full flex flex-col ${justifyClasses[textPosition]} items-center px-4 sm:px-6 lg:px-8`}
      >
        <div
          className={`max-w-4xl ${textAlignClasses[textPosition]} text-white space-y-4`}
        >
          {/* Breadcrumbs */}
          {breadcrumbs && (
            <div className="breadcrumbs text-sm opacity-90">
              <ul>
                {breadcrumbs.map((crumb, index) => (
                  <li key={index}>
                    {crumb.href ? (
                      <a href={crumb.href} className="hover:text-primary">
                        {crumb.label}
                      </a>
                    ) : (
                      <span>{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p className="text-sm sm:text-base font-medium text-primary-content/80 uppercase tracking-wider">
              {subtitle}
            </p>
          )}

          {/* Main Title */}
          <h1 className="text-2xl font-merriweather sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-lg sm:text-xl md:text-2xl text-base-content/90 max-w-3xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"></div> */}
    </div>
  );
};

export default Banner;
