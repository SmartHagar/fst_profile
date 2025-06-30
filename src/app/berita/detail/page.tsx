/** @format */
// src/app/berita/detail/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import BeritaDetailClient from "./BeritaDetailClient";
import { BASE_URL } from "@/services/baseURL";
import {
  parseBeritaParams,
  getBeritaCacheKey,
  isCacheValid,
  createDescription,
} from "@/utils/beritaUtils";

interface BeritaDetail {
  id: number;
  judul: string;
  isi_berita: string;
  gambar_berita: string;
  penulis: string;
  tag: string;
  tgl_terbit: string;
}

export default function BeritaDetailPage() {
  return (
    <Suspense fallback={<BeritaDetailLoading />}>
      <BeritaDetailContent />
    </Suspense>
  );
}

// Loading component
function BeritaDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <span className="ml-4">Memuat berita...</span>
      </div>
    </div>
  );
}

// Main content component dengan useSearchParams
function BeritaDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [beritaDetail, setBeritaDetail] = useState<BeritaDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Parse URL parameters
  const { id, tag, isValid } = parseBeritaParams(searchParams);

  useEffect(() => {
    if (!isValid) {
      setError(true);
      setLoading(false);
      return;
    }

    const fetchBeritaDetail = async () => {
      try {
        setLoading(true);

        // Try to get from localStorage first (cache)
        if (typeof window !== "undefined") {
          const cacheKey = getBeritaCacheKey(id!, tag!);
          const cached = localStorage.getItem(cacheKey);

          if (cached) {
            const cachedData = JSON.parse(cached);
            if (isCacheValid(cachedData.timestamp)) {
              setBeritaDetail(cachedData.data);
              setLoading(false);
              return;
            }
          }
        }

        // Fetch from API
        const response = await fetch(
          `${BASE_URL}/json/berita/detail/${id}/${tag}`,
          {
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: Berita not found`);
        }

        const data = await response.json();

        // Validate response data
        if (!data || !data.id) {
          throw new Error("Invalid berita data received");
        }

        // Cache the result
        if (typeof window !== "undefined") {
          const cacheKey = getBeritaCacheKey(id!, tag!);
          try {
            localStorage.setItem(
              cacheKey,
              JSON.stringify({
                data,
                timestamp: Date.now(),
              })
            );
          } catch (e) {
            // Handle localStorage quota exceeded
            console.warn("Failed to cache berita data:", e);
          }
        }

        setBeritaDetail(data);
      } catch (error) {
        console.error("Error fetching berita:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBeritaDetail();
  }, [id, tag, isValid]);

  // Update document metadata for SEO
  useEffect(() => {
    if (beritaDetail && typeof window !== "undefined") {
      // Update document title
      document.title = `${beritaDetail.judul} | Fakultas Sains & Teknologi`;

      // Update meta description
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        const description = createDescription(beritaDetail.isi_berita);
        metaDescription.setAttribute("content", description);
      }

      // Update meta keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute(
          "content",
          `${beritaDetail.tag}, berita, fakultas sains teknologi, ${beritaDetail.penulis}`
        );
      }

      // Update Open Graph meta tags
      const updateMetaProperty = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement("meta");
          meta.setAttribute("property", property);
          document.head.appendChild(meta);
        }
        meta.setAttribute("content", content);
      };

      updateMetaProperty("og:title", beritaDetail.judul);
      updateMetaProperty(
        "og:description",
        createDescription(beritaDetail.isi_berita)
      );
      updateMetaProperty(
        "og:image",
        `${BASE_URL}/storage/${beritaDetail.gambar_berita}`
      );
      updateMetaProperty("og:url", window.location.href);
      updateMetaProperty("og:type", "article");

      // Update Twitter Card meta tags
      const updateTwitterMeta = (name: string, content: string) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement("meta");
          meta.setAttribute("name", name);
          document.head.appendChild(meta);
        }
        meta.setAttribute("content", content);
      };

      updateTwitterMeta("twitter:card", "summary_large_image");
      updateTwitterMeta("twitter:title", beritaDetail.judul);
      updateTwitterMeta(
        "twitter:description",
        createDescription(beritaDetail.isi_berita)
      );
      updateTwitterMeta(
        "twitter:image",
        `${BASE_URL}/storage/${beritaDetail.gambar_berita}`
      );
    }
  }, [beritaDetail]);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[50vh]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <span className="ml-4">Memuat berita...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !beritaDetail) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-error/10 rounded-full mb-4">
              <svg
                className="w-10 h-10 text-error"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Berita Tidak Ditemukan</h1>
            <p className="text-base-content/70">
              Maaf, berita yang Anda cari tidak ditemukan atau mungkin telah
              dihapus.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push("/berita")}
              className="btn btn-primary btn-block gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Kembali ke Daftar Berita
            </button>

            <button
              onClick={() => router.push("/")}
              className="btn btn-ghost btn-block gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Ke Beranda
            </button>
          </div>

          <div className="mt-8 text-sm text-base-content/60">
            <p>
              Jika Anda yakin ini adalah kesalahan, silakan hubungi
              administrator.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BeritaDetailClient
      params={{ id: id! as any, tag: tag! }}
      staticData={beritaDetail}
    />
  );
}
