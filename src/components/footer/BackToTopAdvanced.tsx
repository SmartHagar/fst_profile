/** @format */

// components/BackToTop/BackToTopAdvanced.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ChevronUp } from "lucide-react";

interface BackToTopAdvancedProps {
  showAfter?: number;
  variant?: "circle" | "pill" | "square" | "floating";
  theme?: "primary" | "secondary" | "accent" | "glass";
  position?: "bottom-right" | "bottom-left" | "bottom-center" | "top-right";
  showProgress?: boolean;
  showText?: boolean;
  text?: string;
  animation?: "fade" | "slide" | "bounce" | "scale";
  hideOnMobile?: boolean;
}

const BackToTopAdvanced: React.FC<BackToTopAdvancedProps> = ({
  showAfter = 300,
  variant = "circle",
  theme = "primary",
  position = "bottom-right",
  showProgress = false,
  showText = false,
  text = "Ke Atas",
  animation = "slide",
  hideOnMobile = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrolled = document.documentElement.scrollTop;
    const maxHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = Math.min((scrolled / maxHeight) * 100, 100);

    setIsVisible(scrolled > showAfter);
    setScrollProgress(progress);
  }, [showAfter]);

  useEffect(() => {
    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Throttle function for better performance
  function throttle(func: any, wait: number) {
    let timeout: NodeJS.Timeout | null = null;
    return function executedFunction(...args: any[]) {
      const later = () => {
        timeout = null;
        func(...args);
      };
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
    };
  }

  const themeClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    glass:
      "btn-glass bg-base-100/80 backdrop-blur-sm border border-base-content/10",
  };

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-center": "bottom-6 left-1/2 transform -translate-x-1/2",
    "top-right": "top-20 right-6",
  };

  const animationClasses = {
    fade: isVisible ? "opacity-100" : "opacity-0",
    slide: isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
    bounce: isVisible
      ? "opacity-100 animate-bounce"
      : "opacity-0 translate-y-4",
    scale: isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75",
  };

  const baseClasses = `
    fixed ${positionClasses[position]} z-50 transition-all duration-300
    ${animationClasses[animation]}
    ${hideOnMobile ? "hidden sm:flex" : "flex"}
    ${!isVisible ? "pointer-events-none" : ""}
  `;

  if (variant === "floating") {
    return (
      <div className={baseClasses}>
        <div className="relative group">
          <button
            onClick={scrollToTop}
            className={`
              btn ${themeClasses[theme]} shadow-lg hover:shadow-xl
              rounded-full px-4 py-2 flex items-center gap-2
              hover:scale-105 transition-all duration-200
            `}
            aria-label="Kembali ke atas"
          >
            <ChevronUp className="w-4 h-4" />
            {showText && <span className="text-sm font-medium">{text}</span>}
          </button>

          {showProgress && (
            <div className="absolute -top-1 left-0 right-0 h-1 bg-base-content/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-content transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={baseClasses}>
      <button
        onClick={scrollToTop}
        className={`
          btn ${themeClasses[theme]} shadow-lg hover:shadow-xl
          ${
            variant === "circle"
              ? "btn-circle w-12 h-12"
              : variant === "pill"
              ? "rounded-full px-4"
              : "btn-square w-12 h-12"
          }
          hover:scale-105 transition-all duration-200 relative overflow-hidden group
        `}
        aria-label="Kembali ke atas"
      >
        {/* Progress Ring for Circle variant */}
        {showProgress && variant === "circle" && (
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 36 36"
          >
            <circle
              className="text-current opacity-20"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              r="15.915"
              cx="18"
              cy="18"
            />
            <circle
              className="text-current"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${scrollProgress * 0.628}, 100`}
              strokeLinecap="round"
              fill="transparent"
              r="15.915"
              cx="18"
              cy="18"
            />
          </svg>
        )}

        <span className="relative z-10">
          <ChevronUp className="w-5 h-5" />
        </span>

        {showText && variant === "pill" && (
          <span className="ml-2 text-sm">{text}</span>
        )}
      </button>
    </div>
  );
};

// Preset configurations
export const BackToTopPresets = {
  // Basic circular button
  Simple: () => <BackToTopAdvanced />,

  // With progress indicator
  WithProgress: () => (
    <BackToTopAdvanced showProgress={true} theme="primary" animation="slide" />
  ),

  // Floating pill with text
  FloatingPill: () => (
    <BackToTopAdvanced
      variant="floating"
      showText={true}
      theme="glass"
      animation="fade"
    />
  ),

  // Minimal glass style
  Glass: () => (
    <BackToTopAdvanced theme="glass" animation="scale" hideOnMobile={true} />
  ),

  // Mobile-friendly
  Mobile: () => (
    <BackToTopAdvanced
      variant="circle"
      theme="primary"
      position="bottom-center"
      animation="bounce"
      showAfter={200}
    />
  ),
};

export default BackToTopAdvanced;
