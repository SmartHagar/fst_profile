/** @format */

import React from "react";
import PageLayout from "@/components/layout/PageLayout";

// add meta
export const metadata = {
  title: "Lokasi FST-UOGP",
  description:
    "Lokasi Fakultas Sains dan Teknologi Universitas Ottow Geissler Papua",
};

const LokasiLayout = ({ children }: { children: React.ReactNode }) => {
  return <PageLayout>{children}</PageLayout>;
};

export default LokasiLayout;
