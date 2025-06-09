/** @format */
// src/utils/beritaUtils.ts - Updated untuk PHP integration
const BASE_URL = "https://fstuogp.com";
interface BeritaData {
  id: number;
  tag: string;
  [key: string]: any;
}

// Helper function untuk generate URL berita (tetap sama untuk aplikasi)
export const generateBeritaUrl = (berita: BeritaData): string => {
  const encodedTag = encodeURIComponent(
    berita.tag.toLowerCase().replace(/\s+/g, "-")
  );
  return `/berita/detail?id=${berita.id}&tag=${encodedTag}`;
};

// Helper function untuk generate PHP sharing URL
export const generateSharingUrl = (berita: BeritaData): string => {
  const encodedTag = encodeURIComponent(
    berita.tag.toLowerCase().replace(/\s+/g, "-")
  );

  // Untuk sharing, gunakan URL yang akan di-redirect ke PHP oleh .htaccess
  if (typeof window !== "undefined") {
    return `${BASE_URL}/berita-detail.php?id=${berita.id}&tag=${encodedTag}`;
  }

  return `${BASE_URL}/berita-detail.php?id=${berita.id}&tag=${encodedTag}`;
};

// Helper function untuk generate preview URL (untuk testing)
export const generatePreviewUrl = (berita: BeritaData): string => {
  const encodedTag = encodeURIComponent(
    berita.tag.toLowerCase().replace(/\s+/g, "-")
  );

  if (typeof window !== "undefined") {
    return `${window.location.origin}/berita-detail.php?id=${berita.id}&tag=${encodedTag}&preview=1`;
  }

  return `/berita-detail.php?id=${berita.id}&tag=${encodedTag}&preview=1`;
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

// Helper function untuk validate image URL
export const validateImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
      response.ok && response.headers.get("content-type")?.startsWith("image/")
    );
  } catch {
    return false;
  }
};

// Helper function untuk generate social media specific URLs
export const generateSocialUrls = (berita: BeritaData) => {
  const shareUrl = getSharingUrl(berita);
  const title = berita.judul || "Berita Terbaru";
  const description = createDescription(berita.isi_berita || "", 100);
  console.log({ description });
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(title)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      `${title} - ${shareUrl}`
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(title)}`,
    line: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
      shareUrl
    )}`,
    copy: shareUrl,
  };
};

// Helper function untuk test social sharing (development)
export const testSocialSharing = (berita: BeritaData) => {
  if (process.env.NODE_ENV !== "development") {
    console.warn("testSocialSharing hanya untuk development");
    return;
  }

  const urls = {
    preview: generatePreviewUrl(berita),
    sharing: generateSharingUrl(berita),
    facebook_debugger: `https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(
      generateSharingUrl(berita)
    )}`,
    twitter_validator: `https://cards-dev.twitter.com/validator`,
  };

  console.group("🧪 Social Sharing Test URLs");
  console.log("Preview URL:", urls.preview);
  console.log("Sharing URL:", urls.sharing);
  console.log("Facebook Debugger:", urls.facebook_debugger);
  console.log("Twitter Validator:", urls.twitter_validator);
  console.groupEnd();

  return urls;
};
