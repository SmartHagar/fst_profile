/** @format */
"use client";
// app/berita/page.tsx
import { useBanner } from "@/context/BannerContext";
import ListBeritaClient from "./ListBeritaClient";
import { useEffect } from "react";

export default function ListBerita() {
  const { setBannerConfig } = useBanner();

  useEffect(() => {
    // Set banner config untuk halaman ini
    setBannerConfig({
      type: "minimal",
      title: "Berita Fakultas Sains & Teknologi ",
      breadcrumbs: [
        {
          label: "Berita & Pengumuman",
          href: "/",
        },
        {
          label: "Berita",
        },
      ],
      show: true,
    });

    return () => {
      setBannerConfig(null);
    };
  }, [setBannerConfig]);
  return <ListBeritaClient />;
}
