/** @format */

"use client";
import React from "react";
import {
  MinimalBanner,
  GradientBanner,
  SplitBanner,
  VideoBanner,
} from "../banner/BannerVariants";
import Banner from "@/components/banner/Banner"; // Custom banner component
import { useBanner } from "@/context/BannerContext";

type Props = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  const { bannerConfig } = useBanner();

  const renderBanner = () => {
    if (!bannerConfig || bannerConfig.show === false) {
      return null;
    }

    switch (bannerConfig.type) {
      case "minimal":
        return (
          <MinimalBanner
            title={bannerConfig.title}
            breadcrumbs={bannerConfig.breadcrumbs}
          />
        );

      case "gradient":
        return (
          <GradientBanner
            title={bannerConfig.title}
            subtitle={bannerConfig.subtitle}
            description={bannerConfig.description}
            gradientFrom={bannerConfig.gradientFrom}
            gradientTo={bannerConfig.gradientTo}
          />
        );

      case "split":
        return (
          <SplitBanner
            title={bannerConfig.title}
            subtitle={bannerConfig.subtitle}
            description={bannerConfig.description}
            image={bannerConfig.image}
            imagePosition={bannerConfig.imagePosition}
          />
        );

      case "video":
        return (
          <VideoBanner
            title={bannerConfig.title}
            subtitle={bannerConfig.subtitle}
            description={bannerConfig.description}
            videoSrc={bannerConfig.videoSrc}
            posterImage={bannerConfig.posterImage}
          />
        );

      case "custom":
        return (
          <Banner
            title={bannerConfig.title}
            subtitle={bannerConfig.subtitle}
            description={bannerConfig.description}
            backgroundImage={bannerConfig.backgroundImage}
            overlay={bannerConfig.overlay}
            overlayOpacity={bannerConfig.overlayOpacity}
            textPosition={bannerConfig.textPosition}
            height={bannerConfig.height}
            breadcrumbs={bannerConfig.breadcrumbs}
          />
        );

      default:
        return null;
    }
  };

  return (
    <main>
      {renderBanner()}
      <section className="container px-4">{children}</section>
    </main>
  );
};

export default PageLayout;
