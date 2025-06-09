/** @format */
// src/utils/beritaUtils.ts

interface BeritaData {
  id: number;
  tag: string;
  [key: string]: any;
}

// Helper function untuk generate URL berita
export const generateBeritaUrl = (berita: BeritaData): string => {
  const encodedTag = encodeURIComponent(
    berita.tag.toLowerCase().replace(/\s+/g, "-")
  );
  return `/berita/detail?id=${berita.id}&tag=${encodedTag}`;
};

// Helper function untuk generate static sharing URL
export const generateStaticSharingUrl = (berita: BeritaData): string => {
  const encodedTag = berita.tag.toLowerCase().replace(/\s+/g, "-");
  return `/static-berita/${berita.id}/${encodedTag}.html`;
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
  ];

  return crawlers.some((crawler) => userAgent.includes(crawler));
};

// Helper function untuk get sharing URL yang tepat
export const getSharingUrl = (berita: BeritaData): string => {
  // Untuk sharing, selalu gunakan static URL
  if (typeof window !== "undefined") {
    const baseUrl = window.location.origin;
    const staticPath = generateStaticSharingUrl(berita);
    return `${baseUrl}${staticPath}`;
  }

  return generateStaticSharingUrl(berita);
};

// Helper function untuk parse URL parameters
export const parseBeritaParams = (searchParams: URLSearchParams) => {
  const id = searchParams.get("id");
  const tag = searchParams.get("tag");

  return {
    id,
    tag,
    isValid: !!(id && tag && !isNaN(Number(id))),
  };
};

// Helper function untuk generate cache key
export const getBeritaCacheKey = (id: string, tag: string): string => {
  return `berita_${id}_${tag}`;
};

// Helper function untuk check cache validity (24 hours)
export const isCacheValid = (timestamp: number): boolean => {
  return Date.now() - timestamp < 24 * 60 * 60 * 1000;
};

// Helper function untuk clean HTML dan create description
export const createDescription = (
  htmlContent: string,
  maxLength: number = 160
): string => {
  const cleanText = htmlContent
    .replace(/<[^>]*>?/gm, "") // Remove HTML tags
    .replace(/\s+/g, " ") // Replace multiple spaces
    .trim();

  return cleanText.length > maxLength
    ? cleanText.substring(0, maxLength) + "..."
    : cleanText;
};
