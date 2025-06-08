/** @format */

import React from "react";
import PageLayout from "@/components/layout/PageLayout";

// add meta
export const metadata = {
  title: "Prodi Geologi FST-UOGP",
  description:
    "Prodi Geologi Fakultas Sains dan Teknologi Universitas Ottow Geissler Papua",
};

const SejarahLayout = ({ children }: { children: React.ReactNode }) => {
  return <PageLayout>{children}</PageLayout>;
};

export default SejarahLayout;
