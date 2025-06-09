/** @format */
// detail/[id]/[tag]/page.tsx
import { Metadata } from "next";
import BeritaDetailClient from "./BeritaDetailClient";
import { Suspense } from "react";
import { BASE_URL } from "@/services/baseURL";
import { notFound } from "next/navigation";

interface BeritaDetail {
  id: number;
  judul: string;
  isi_berita: string;
  gambar_berita: string;
  penulis: string;
  tag: string;
  tgl_terbit: string;
}

interface PageProps {
  params: {
    id: string;
    tag: string;
  };
}

// Server-side function untuk fetch berita
async function getBeritaDetail(
  id: string,
  tag: string
): Promise<BeritaDetail | null> {
  try {
    // Validate parameters
    if (!id || !tag || isNaN(Number(id))) {
      return null;
    }

    const response = await fetch(
      `${BASE_URL}/json/berita/detail/${id}/${tag}`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log({ response });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching berita detail:", error);
    return null;
  }
}

// Generate dynamic metadata untuk SEO dan Social Sharing
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id, tag } = params;

  // Fetch berita data
  const berita = await getBeritaDetail(id, tag);

  // Default metadata jika berita tidak ditemukan
  if (!berita) {
    return {
      title: "Berita Tidak Ditemukan | Fakultas Sains & Teknologi",
      description: "Berita yang Anda cari tidak ditemukan atau telah dihapus",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // Clean HTML dari isi berita untuk description
  const cleanDescription = berita.isi_berita
    .replace(/<[^>]*>?/gm, "") // Remove HTML tags
    .replace(/\s+/g, " ") // Replace multiple spaces
    .trim()
    .substring(0, 160);

  const description =
    cleanDescription.length < berita.isi_berita.length
      ? cleanDescription + "..."
      : cleanDescription;

  // URLs
  const imageUrl = `${BASE_URL}/storage/${berita.gambar_berita}`;
  const currentUrl = `${BASE_URL}/berita/detail/${id}/${tag}`;
  const canonicalUrl = currentUrl;

  // Format tanggal
  const publishedTime = new Date(berita.tgl_terbit).toISOString();

  return {
    title: `${berita.judul} | Fakultas Sains & Teknologi`,
    description,
    authors: [{ name: berita.penulis }],
    keywords: [
      berita.tag,
      "berita",
      "fakultas sains teknologi",
      berita.penulis,
    ],

    // Canonical URL
    alternates: {
      canonical: canonicalUrl,
    },

    // Open Graph (Facebook, WhatsApp, LinkedIn, dll)
    openGraph: {
      title: berita.judul,
      description,
      url: currentUrl,
      type: "article",
      publishedTime,
      authors: [berita.penulis],
      tags: [berita.tag],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: berita.judul,
          type: "image/jpeg",
        },
      ],
      siteName: "Fakultas Sains & Teknologi",
      locale: "id_ID",
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: berita.judul,
      description,
      images: [
        {
          url: imageUrl,
          alt: berita.judul,
        },
      ],
      creator: `@fst_univ`, // Sesuaikan dengan Twitter handle fakultas
    },

    // Additional meta tags
    other: {
      "article:author": berita.penulis,
      "article:published_time": publishedTime,
      "article:tag": berita.tag,
      "article:section": "Berita",
      "og:see_also": `${BASE_URL}/berita`,
    },

    // Robots meta
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Generate static params untuk ISR (optional)
export async function generateStaticParams() {
  try {
    // Fetch popular atau recent berita untuk pre-generate
    const response = await fetch(`${BASE_URL}/api/berita?limit=50`);
    const data = await response.json();

    if (!data?.data) return [];

    return data.data.map((berita: BeritaDetail) => ({
      id: berita.id.toString(),
      tag: berita.tag,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Main page component
export default async function BeritaDetailPage({ params }: PageProps) {
  const { id, tag } = params;

  // Fetch data di server-side
  const staticData = await getBeritaDetail(id, tag);

  // Show 404 jika berita tidak ditemukan
  if (!staticData) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[50vh]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <span className="ml-4">Memuat berita...</span>
          </div>
        </div>
      }
    >
      <BeritaDetailClient params={params} staticData={staticData} />
    </Suspense>
  );
}
