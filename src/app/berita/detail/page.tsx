/** @format */

// app/berita/detail/page.tsx
import { Metadata } from "next";
import BeritaDetailClient from "./BeritaDetailClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Detail Berita - Fakultas Sains & Teknologi",
  description: "Baca berita terbaru dari Fakultas Sains & Teknologi",
};

export default function BeritaDetailPage() {
  return (
    <Suspense>
      <BeritaDetailClient />
    </Suspense>
  );
}
