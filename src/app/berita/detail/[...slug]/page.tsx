/** @format */

// app/berita/detail/[...slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BeritaDetailClient from "./BeritaDetailClient";

interface BeritaDetailProps {
  params: {
    slug: string[];
  };
}

async function getBeritaData(id: string, tag: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/berita/detail/${id}/${tag}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching berita data:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: BeritaDetailProps): Promise<Metadata> {
  const { slug } = params;
  const idBerita = slug[0]?.split("-")[1];
  const tag = slug[1];

  if (!idBerita || !tag) {
    return {
      title: "Berita Tidak Ditemukan",
      description: "Halaman berita yang Anda cari tidak ditemukan.",
    };
  }

  const berita = await getBeritaData(idBerita, tag);

  if (!berita) {
    return {
      title: "Berita Tidak Ditemukan",
      description: "Halaman berita yang Anda cari tidak ditemukan.",
    };
  }

  const description =
    berita.isi_berita?.replace(/<[^>]*>?/gm, "").substring(0, 155) + "..." ||
    "";

  const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/storage/${berita.gambar_berita}`;
  const pageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/berita/detail/fst-${berita.id}/${berita.tag}`;

  return {
    title: berita.judul,
    description,
    keywords: `berita, ${berita.tag}, ${berita.penulis}`,
    authors: [{ name: berita.penulis }],
    publisher: "Fakultas Sains & Teknologi",

    openGraph: {
      title: berita.judul,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: berita.judul,
        },
      ],
      type: "article",
      publishedTime: berita.tanggal,
      authors: [berita.penulis],
      url: pageUrl,
      siteName: "Fakultas Sains & Teknologi",
    },

    twitter: {
      card: "summary_large_image",
      title: berita.judul,
      description,
      images: [imageUrl],
      creator: "@NamaTwitterAnda",
    },

    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function BeritaDetail({ params }: BeritaDetailProps) {
  const { slug } = params;
  const idBerita = slug[0]?.split("-")[1];
  const tag = slug[1];

  if (!idBerita || !tag) {
    notFound();
  }

  const berita = await getBeritaData(idBerita, tag);

  if (!berita) {
    notFound();
  }

  return (
    <BeritaDetailClient initialData={berita} idBerita={idBerita} tag={tag} />
  );
}
