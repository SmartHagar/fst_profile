/** @format */
// src/utils/beritaUtils.ts

interface BeritaData {
  id: number;
  tag: string;
  [key: string]: any;
}

// Helper function untuk generate URL berita dengan query parameters
export const generateBeritaUrl = (berita: BeritaData): string => {
  const encodedTag = encodeURIComponent(
    berita.tag.toLowerCase().replace(/\s+/g, "-")
  );
  return `/berita/detail?id=${berita.id}&tag=${encodedTag}`;
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
