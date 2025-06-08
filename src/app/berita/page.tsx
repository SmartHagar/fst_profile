/** @format */

// app/berita/page.tsx
import { Metadata } from "next";
import ListBeritaClient from "./ListBeritaClient";

export const metadata: Metadata = {
  title: "Berita Fakultas Sains & Teknologi",
  description: "Kumpulan berita terbaru dari Fakultas Sains & Teknologi",
  keywords: "berita, fakultas, sains, teknologi, universitas",
  openGraph: {
    title: "Berita Fakultas Sains & Teknologi",
    description: "Kumpulan berita terbaru dari Fakultas Sains & Teknologi",
    type: "website",
  },
};

export default function ListBerita() {
  return <ListBeritaClient />;
}
