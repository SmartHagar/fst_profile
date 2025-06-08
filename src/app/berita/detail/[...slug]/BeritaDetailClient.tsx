/** @format */

// app/berita/detail/[...slug]/BeritaDetailClient.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import useBerita from "@/stores/berita";
import SocialShare from "@/components/social/SocialShare";
import BeritaImage from "@/components/pages/berita/BeritaImage";
import BeritaContent from "@/components/pages/berita/BeritaContent";
import RandomBeritaSidebar from "@/components/pages/berita/RandomBeritaSidebar";
import moment from "moment";
import { User, Calendar } from "lucide-react";

interface BeritaDetailClientProps {
  initialData: any;
  idBerita: string;
  tag: string;
}

const BeritaDetailClient = ({ initialData }: BeritaDetailClientProps) => {
  const pathname = usePathname();
  const [shareUrl, setShareUrl] = useState("");

  const {
    setBerita,
    dataRandomBerita,
    setRandomBerita,
    dtShowBerita,
    loading,
    error,
  } = useBerita();

  // Set initial data
  useEffect(() => {
    // Use initial data from SSR
    if (initialData && !dtShowBerita) {
      // You might want to set this in store or use initialData directly
    }
  }, [initialData, dtShowBerita]);

  useEffect(() => {
    setBerita();
    setRandomBerita();
  }, [setBerita, setRandomBerita]);

  // Set URLs for sharing
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}${pathname}`);
    }
  }, [pathname]);

  const beritaData = dtShowBerita || initialData;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>Error: {error}</span>
      </div>
    );
  }

  if (!beritaData) {
    return (
      <div className="alert alert-warning">
        <span>Berita tidak ditemukan</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap lg:flex-nowrap gap-8">
        <motion.article
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="flex-1"
        >
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h1 className="card-title text-2xl lg:text-3xl text-center mb-6">
                {beritaData.judul}
              </h1>

              <div className="flex items-center justify-center gap-6 mb-6 text-sm text-base-content/70">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{beritaData.penulis}</span>
                </div>
                {beritaData.tanggal && (
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>
                      {moment(beritaData.tanggal).format("DD MMMM YYYY")}
                    </span>
                  </div>
                )}
              </div>

              <BeritaImage
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${beritaData.gambar_berita}`}
                alt={beritaData.judul}
                priority={true}
                className="mb-6"
              />

              <SocialShare shareUrl={shareUrl} title={beritaData.judul} />

              <BeritaContent content={beritaData.isi_berita} />
            </div>
          </div>
        </motion.article>

        <aside className="w-full lg:w-80">
          <RandomBeritaSidebar dataRandomBerita={dataRandomBerita} />
        </aside>
      </div>
    </div>
  );
};

export default BeritaDetailClient;
