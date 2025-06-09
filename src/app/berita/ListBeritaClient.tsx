/** @format */

// app/berita/ListBeritaClient.tsx
"use client";

import { useEffect } from "react";
import useBerita from "@/stores/berita";
import BeritaCard from "@/components/pages/berita/BeritaCard";
import RandomBeritaSidebar from "@/components/pages/berita/RandomBeritaSidebar";
import ViewToggle from "@/components/ui/ViewToggle";
import { useViewPreference } from "@/hooks/useViewPreference";
import { Newspaper, TrendingUp } from "lucide-react";
import { BASE_URL } from "@/services/baseURL";

const ListBeritaClient = () => {
  const {
    setBerita,
    dataBerita,
    dataRandomBerita,
    setRandomBerita,
    loading,
    error,
  } = useBerita();

  // Use custom hook for view management
  const { viewMode, setViewMode } = useViewPreference("list");

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
      <div className="flex flex-wrap lg:flex-nowrap gap-8">
        <main className="flex-1">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="flex items-center gap-3 mb-4 lg:mb-0">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Newspaper className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold">
                  Berita Fakultas Sains & Teknologi
                </h1>
                <p className="text-sm text-base-content/70 mt-1">
                  Informasi terkini dan terbaru dari fakultas
                </p>
              </div>
            </div>

            {/* View Toggle */}
            <ViewToggle
              viewMode={viewMode}
              onViewChange={setViewMode}
              className="self-start lg:self-auto"
            />
          </div>

          {/* Stats Bar */}
          <div className="stats shadow mb-6 w-full">
            <div className="stat">
              <div className="stat-figure text-primary">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div className="stat-title">Total Berita</div>
              <div className="stat-value text-primary">
                {dataBerita?.data?.length || 0}
              </div>
              <div className="stat-desc">Berita tersedia</div>
            </div>

            <div className="stat">
              <div className="stat-title">Mode Tampilan</div>
              <div className="stat-value text-sm">
                {viewMode === "list" ? "List View" : "Grid View"}
              </div>
              <div className="stat-desc">
                {viewMode === "list" ? "Detail preview" : "Visual browsing"}
              </div>
            </div>
          </div>

          {/* Content Section */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p className="mt-4 text-base-content/70">Memuat berita...</p>
            </div>
          ) : (
            <div
              key={viewMode} // Re-animate when view changes
            >
              <BeritaCard
                dataCard={dataBerita}
                random={false}
                baseUrl={BASE_URL}
                viewMode={viewMode}
              />
            </div>
          )}

          {/* Empty State */}
          {!loading && (!dataBerita?.data || dataBerita.data.length === 0) && (
            <div className="text-center py-12">
              <div className="p-4 bg-base-200 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Newspaper className="w-10 h-10 text-base-content/40" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Belum Ada Berita</h3>
              <p className="text-base-content/70">
                Belum ada berita yang tersedia saat ini.
              </p>
            </div>
          )}
        </main>

        {/* Sidebar */}
        <aside className="w-full lg:w-80">
          <RandomBeritaSidebar dataRandomBerita={dataRandomBerita} />
        </aside>
      </div>
    </div>
  );
};

export default ListBeritaClient;
