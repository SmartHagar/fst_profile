/** @format */

import React from "react";
import PageLayout from "@/components/layout/PageLayout";

// add meta
export const metadata = {
  title: "Jadwal FST-UOGP",
  description:
    "Jadwal Fakultas Sains dan Teknologi Universitas Ottow Geissler Papua",
};

const VideoLayout = ({ children }: { children: React.ReactNode }) => {
  return <PageLayout>{children}</PageLayout>;
};

export default VideoLayout;
