/** @format */

// hooks/useMetaTags.ts
import { useEffect } from "react";
import { BASE_URL } from "@/services/baseURL";

interface MetaTagsData {
  title: string;
  description: string;
  image?: string;
  url?: string;
  author?: string;
  publishedTime?: string;
  tag?: string;
  type?: "article" | "website";
}

export const useMetaTags = (data: MetaTagsData) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Update document title
    document.title = data.title;

    // Remove existing meta tags
    const existingTags = document.querySelectorAll('meta[data-dynamic="true"]');
    existingTags.forEach((tag) => tag.remove());

    // Create new meta tags
    const metaTags = [
      // Basic SEO
      { name: "description", content: data.description },
      ...(data.author ? [{ name: "author", content: data.author }] : []),

      // Open Graph / Facebook
      { property: "og:type", content: data.type || "article" },
      { property: "og:title", content: data.title },
      { property: "og:description", content: data.description },
      { property: "og:site_name", content: "Fakultas Sains & Teknologi" },
      ...(data.url ? [{ property: "og:url", content: data.url }] : []),
      ...(data.image
        ? [
            { property: "og:image", content: data.image },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
          ]
        : []),
      ...(data.author
        ? [{ property: "article:author", content: data.author }]
        : []),
      ...(data.publishedTime
        ? [{ property: "article:published_time", content: data.publishedTime }]
        : []),
      ...(data.tag ? [{ property: "article:section", content: data.tag }] : []),

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: data.title },
      { name: "twitter:description", content: data.description },
      ...(data.image ? [{ name: "twitter:image", content: data.image }] : []),
      ...(data.url ? [{ name: "twitter:url", content: data.url }] : []),
    ];

    // Add meta tags to head
    const head = document.head;
    metaTags.forEach((tag) => {
      const metaElement = document.createElement("meta");

      if (tag.name) {
        metaElement.setAttribute("name", tag.name);
      }
      if (tag.property) {
        metaElement.setAttribute("property", tag.property);
      }

      metaElement.setAttribute("content", tag.content);
      metaElement.setAttribute("data-dynamic", "true");

      head.appendChild(metaElement);
    });

    // Update canonical URL if provided
    if (data.url) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        canonical.setAttribute("data-dynamic", "true");
        head.appendChild(canonical);
      }
      canonical.setAttribute("href", data.url);
    }

    // Cleanup function
    return () => {
      const dynamicTags = document.querySelectorAll('[data-dynamic="true"]');
      dynamicTags.forEach((tag) => tag.remove());
    };
  }, [data]);
};

// Helper hook untuk berita detail
export const useBeritaMetaTags = (berita: any) => {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  useMetaTags({
    title: berita?.judul || "Detail Berita - Fakultas Sains & Teknologi",
    description: berita?.isi_berita
      ? createDescription(berita.isi_berita, 155)
      : "Baca berita terbaru dari Fakultas Sains & Teknologi",
    image: berita?.gambar_berita
      ? `${BASE_URL}/storage/${berita.gambar_berita}`
      : undefined,
    url: currentUrl,
    author: berita?.penulis,
    publishedTime: berita?.tanggal,
    tag: berita?.tag,
    type: "article",
  });
};

// Helper function to create description
function createDescription(html: string, maxLength: number = 155): string {
  return (
    html
      .replace(/<[^>]*>?/gm, "") // Remove HTML tags
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .trim()
      .substring(0, maxLength) + (html.length > maxLength ? "..." : "")
  );
}
