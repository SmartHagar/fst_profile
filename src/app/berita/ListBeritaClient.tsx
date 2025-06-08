/** @format */

// app/berita/ListBeritaClient.tsx
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import useBerita from "@/stores/berita";
import BeritaCard from "@/components/pages/berita/BeritaCard";
import RandomBeritaSidebar from "@/components/pages/berita/RandomBeritaSidebar";

const ListBeritaClient = () => {
  const {
    setBerita,
    dataBerita,
    dataRandomBerita,
    setRandomBerita,
    loading,
    error,
  } = useBerita();

  useEffect(() => {
    setBerita();
    setRandomBerita();
  }, [setBerita, setRandomBerita]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        className="flex flex-wrap lg:flex-nowrap gap-8"
      >
        <main className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold mb-8 text-center lg:text-left">
            Berita Fakultas Sains & Teknologi
          </h1>

          {loading ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <BeritaCard
              dataCard={dataBerita}
              random={false}
              baseUrl={process.env.NEXT_PUBLIC_BASE_URL}
            />
          )}
        </main>

        <aside className="w-full lg:w-80">
          <RandomBeritaSidebar dataRandomBerita={dataRandomBerita} />
        </aside>
      </motion.div>
    </div>
  );
};

export default ListBeritaClient;
