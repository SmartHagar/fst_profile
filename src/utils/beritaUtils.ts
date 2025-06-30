/** @format */

// src/utils/beritaUtils.ts

import { ReadonlyURLSearchParams } from "next/navigation";

// Base URL configuration
const BASE_URL = "https://fstuogp.com";

// Interface for BeritaData
interface BeritaData {
  id: number;
  tag: string;
  judul?: string;
  isi_berita?: string;
  [key: string]: any;
}

// Helper function untuk generate URL berita (untuk internal navigation)
export const generateBeritaUrl = (berita: BeritaData): string => {
  // Use the actual tag from berita object
  const tag = berita.tag;
  return `/berita/detail?id=${berita.id}&tag=${tag}`;
};

// Helper function untuk generate PHP sharing URL
export const generateSharingUrl = (berita: BeritaData): string => {
  // Use the URL structure that matches .htaccess rules
  // This URL will be intercepted by .htaccess for crawlers
  const tag = berita.tag;
  return `${BASE_URL}/berita/detail/?id=${berita.id}&tag=${tag}`;
};

// Helper function untuk generate preview URL (untuk testing)
export const generatePreviewUrl = (berita: BeritaData): string => {
  const tag = berita.tag;
  return `${BASE_URL}/berita-detail.php?id=${berita.id}&tag=${tag}&preview=1`;
};

// Helper function untuk detect crawler/bot
export const isCrawlerBot = (): boolean => {
  if (typeof window === "undefined") return false;

  const userAgent = window.navigator.userAgent.toLowerCase();
  const crawlers = [
    "facebookexternalhit",
    "twitterbot",
    "whatsapp",
    "linkedinbot",
    "googlebot",
    "bingbot",
    "slackbot",
    "telegrambot",
    "skypeuripreview",
  ];

  return crawlers.some((crawler) => userAgent.includes(crawler));
};

// Helper function untuk get sharing URL yang tepat
export const getSharingUrl = (berita: BeritaData): string => {
  // Untuk sharing, selalu gunakan URL yang akan di-handle oleh .htaccess
  return generateSharingUrl(berita);
};

// Helper function untuk test sharing (development only)
export const getTestSharingUrl = (berita: BeritaData): string => {
  if (process.env.NODE_ENV === "development") {
    return generatePreviewUrl(berita);
  }
  return generateSharingUrl(berita);
};

// Parse berita parameters from URL
export function parseBeritaParams(searchParams: ReadonlyURLSearchParams) {
  const id = searchParams.get("id");
  const tag = searchParams.get("tag");

  const isValid = !!(id && tag && !isNaN(Number(id)));

  return {
    id: id ? Number(id) : null,
    tag: tag || null,
    isValid,
  };
}

// Generate cache key for localStorage
export function getBeritaCacheKey(id: number | string, tag: string): string {
  return `berita_detail_${id}_${tag}`;
}

// Check if cache is still valid (1 hour)
export function isCacheValid(timestamp: number): boolean {
  const ONE_HOUR = 60 * 60 * 1000;
  return Date.now() - timestamp < ONE_HOUR;
}

// Create description from HTML content
export function createDescription(
  htmlContent: string,
  maxLength: number = 160
): string {
  // Remove HTML tags
  const textContent = htmlContent.replace(/<[^>]*>/g, "");
  // Remove extra whitespace
  const cleanContent = textContent.replace(/\s+/g, " ").trim();
  // Truncate intelligently
  if (cleanContent.length > maxLength) {
    // Try to cut at last space before maxLength
    const truncated = cleanContent.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > maxLength * 0.8) {
      // If space is reasonably close to end
      return truncated.substring(0, lastSpace) + "...";
    }
    return truncated + "...";
  }
  return cleanContent;
}

// Generate social media sharing URLs
export function generateSocialUrls(berita: BeritaData) {
  const shareUrl = getSharingUrl(berita);
  const title = berita.judul || "Berita Terbaru";
  // const description = berita.isi_berita
  //   ? createDescription(berita.isi_berita, 100)
  //   : "";

  // Encode the complete share URL when passing to social platforms
  const encodedShareUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedTitleAndUrl = encodeURIComponent(`${title} - ${shareUrl}`);

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedShareUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitleAndUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}`,
    telegram: `https://t.me/share/url?url=${encodedShareUrl}&text=${encodedTitle}`,
    line: `https://social-plugins.line.me/lineit/share?url=${encodedShareUrl}`,
    copy: shareUrl, // Don't encode for clipboard copy
  };
}

// Test social sharing URLs (for development)
export function testSocialSharing(berita: BeritaData) {
  if (process.env.NODE_ENV !== "development") {
    console.warn("testSocialSharing hanya untuk development");
    return;
  }

  const sharingUrl = generateSharingUrl(berita);
  const urls = {
    preview: generatePreviewUrl(berita),
    sharing: sharingUrl,
    facebook_debugger: `https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(
      sharingUrl
    )}`,
    twitter_validator: `https://cards-dev.twitter.com/validator`,
  };

  console.group("🧪 Social Sharing Test URLs");
  console.log("Preview URL:", urls.preview);
  console.log("Sharing URL:", urls.sharing);
  console.log("Facebook Debugger:", urls.facebook_debugger);
  console.log("Twitter Validator:", urls.twitter_validator);
  console.log("\n📋 Test these URLs:");
  console.log("1. Direct PHP test:", urls.preview);
  console.log(
    "2. Facebook share test:",
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      sharingUrl
    )}`
  );
  console.groupEnd();

  return urls;
}

// Validate image URL
export const validateImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("content-type");
    return response.ok && !!contentType && contentType.startsWith("image/");
  } catch {
    return false;
  }
};
