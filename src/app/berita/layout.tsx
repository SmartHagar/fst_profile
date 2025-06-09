/** @format */

import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Metadata } from "next";

// add meta
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
const SejarahLayout = ({ children }: { children: React.ReactNode }) => {
  return <PageLayout>{children}</PageLayout>;
};

export default SejarahLayout;
