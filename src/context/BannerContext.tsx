/** @format */

"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";

// Define all possible banner types
type BannerType = "minimal" | "gradient" | "split" | "video" | "custom";

interface BaseBannerConfig {
  type: BannerType;
  title: string;
  subtitle?: string;
  description?: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
  show?: boolean;
}

interface MinimalBannerConfig extends BaseBannerConfig {
  type: "minimal";
}

interface GradientBannerConfig extends BaseBannerConfig {
  type: "gradient";
  gradientFrom?: string;
  gradientTo?: string;
}

interface SplitBannerConfig extends BaseBannerConfig {
  type: "split";
  image: string;
  imagePosition?: "left" | "right";
}

interface VideoBannerConfig extends BaseBannerConfig {
  type: "video";
  videoSrc: string;
  posterImage?: string;
}

interface CustomBannerConfig extends BaseBannerConfig {
  type: "custom";
  backgroundImage: string;
  overlay?: boolean;
  overlayOpacity?: number;
  textPosition?: "left" | "center" | "right";
  height?: "sm" | "md" | "lg" | "xl";
}

type BannerConfig =
  | MinimalBannerConfig
  | GradientBannerConfig
  | SplitBannerConfig
  | VideoBannerConfig
  | CustomBannerConfig;

interface BannerContextType {
  bannerConfig: BannerConfig | null;
  setBannerConfig: (config: BannerConfig | null) => void;
}

const BannerContext = createContext<BannerContextType | undefined>(undefined);

export const BannerProvider = ({ children }: { children: ReactNode }) => {
  const [bannerConfig, setBannerConfig] = useState<BannerConfig | null>(null);

  return (
    <BannerContext.Provider value={{ bannerConfig, setBannerConfig }}>
      {children}
    </BannerContext.Provider>
  );
};

export const useBanner = () => {
  const context = useContext(BannerContext);
  if (context === undefined) {
    throw new Error("useBanner must be used within a BannerProvider");
  }
  return context;
};
