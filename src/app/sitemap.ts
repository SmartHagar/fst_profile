/** @format */

import { MetadataRoute } from "next";
import { BASE_URL } from "@/services/baseURL";

interface BeritaItem {
  id: number;
  tag: string;
  tanggal: string;
  judul: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch all berita for sitemap
    const response = await fetch(`${BASE_URL}/api/berita?limit=1000`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch berita data");
    }

    const beritaData = await response.json();

    // Generate berita URLs
    const beritaUrls: MetadataRoute.Sitemap =
      beritaData.data?.map((berita: BeritaItem) => {
        const encodedTag = encodeURIComponent(
          berita.tag.toLowerCase().replace(/\s+/g, "-")
        );

        return {
          url: `${BASE_URL}/berita/detail/${berita.id}/${encodedTag}`,
          lastModified: new Date(berita.tanggal),
          changeFrequency: "monthly" as const,
          priority: 0.8,
        };
      }) || [];

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: `${BASE_URL}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${BASE_URL}/berita`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      // Add other static pages here
    ];

    return [...staticPages, ...beritaUrls];
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // Return basic sitemap if fetch fails
    return [
      {
        url: `${BASE_URL}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${BASE_URL}/berita`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
    ];
  }
}
