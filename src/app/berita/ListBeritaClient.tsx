/** @format */

// app/berita/ListBeritaClient.tsx
"use client";

import { useEffect } from "react";
import useBerita from "@/stores/berita";
import BeritaCard from "@/components/pages/berita/BeritaCard";
import RandomBeritaSidebar from "@/components/pages/berita/RandomBeritaSidebar";
import ViewToggle from "@/components/ui/ViewToggle";
import { useViewPreference } from "@/hooks/useViewPreference";
import { Newspaper } from "lucide-react";
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
      <div className="container mx-auto py-8">
        <div className="alert alert-error">
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-wrap lg:flex-nowrap gap-8">
        <main className="flex-1">
          {/* Stats Bar */}
          <div className="stats shadow mb-6 w-full hidden lg:flex">
            <div className="stat">
              <div className="stat-title">Mode Tampilan</div>
              <div className="stat-value text-sm">
                {viewMode === "list" ? "List View" : "Grid View"}
              </div>
              <div className="stat-desc">
                {viewMode === "list" ? "Detail preview" : "Visual browsing"}
              </div>
            </div>
            <div className="stat">
              <ViewToggle
                viewMode={viewMode}
                onViewChange={setViewMode}
                className="self-start lg:self-auto"
              />
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
