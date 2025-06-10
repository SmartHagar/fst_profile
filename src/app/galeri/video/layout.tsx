/** @format */

import React from "react";
import PageLayout from "@/components/layout/PageLayout";

// add meta
export const metadata = {
  title: "Galeri Video FST-UOGP",
  description:
    "Galeri Video Fakultas Sains dan Teknologi Universitas Ottow Geissler Papua",
};

const VideoLayout = ({ children }: { children: React.ReactNode }) => {
  return <PageLayout>{children}</PageLayout>;
};

export default VideoLayout;
