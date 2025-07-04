/** @format */

// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import ContainerLayout from "@/components/layout/ContainerLayout";
import { BannerProvider } from "@/context/BannerContext";

export const metadata: Metadata = {
  title: "FST UOGP - Fakultas Sains dan Teknologi",
  description:
    "Website resmi Fakultas Sains & Teknologi Universitas Ottow Geissler Papua",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" data-theme="mytheme">
      <body className="font-montserrat">
        <BannerProvider>
          <ContainerLayout>{children}</ContainerLayout>
        </BannerProvider>
      </body>
    </html>
  );
}
