/** @format */

// pages/dokumen/page.tsx
"use client";

import { useBanner } from "@/context/BannerContext";
import useDokumen from "@/stores/dokumen";
import React, { useEffect, useState } from "react";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";
import { FileText, Grid, List, Filter, Search } from "lucide-react";
import DokumenGrid, {
  DokumenList,
  DokumenStats,
} from "@/components/pages/dokumen/DokumenGrid";
import Paginate from "@/components/pagination/Paginate";

type ViewMode = "grid" | "list";

const DokumenPage = () => {
  const { setBannerConfig } = useBanner();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJenis, setSelectedJenis] = useState<string>("");
  const [selectedProdi, setSelectedProdi] = useState<string>("");

  // Store
  const { setDokumen, dataDokumen, loading } = useDokumen();

  useEffect(() => {
    setBannerConfig({
      type: "minimal",
      title: "Dokumen",
      show: true,
      breadcrumbs: [
        {
          label: "Beranda",
          href: "/",
        },
        {
          label: "Layanan",
        },
        {
          label: "Dokumen",
        },
      ],
    });

    return () => {
      setBannerConfig(null);
    };
  }, [setBannerConfig]);

  useEffect(() => {
    setDokumen({
      limit: 10,
      page: currentPage,
      no_jenis_id: 8,
      search: searchQuery || undefined,
      jenis_id: selectedJenis || undefined,
      prodi_id: selectedProdi || undefined,
    });
  }, [setDokumen, currentPage, searchQuery, selectedJenis, selectedProdi]);

  // Get unique values for filters
  const uniqueJenis = dataDokumen?.data
    ? Array.from(
        new Set(
          dataDokumen.data
            .map((item) => item.jenis_dokumen?.nama)
            .filter((nama): nama is string => Boolean(nama))
        )
      )
    : [];

  const uniqueProdi = dataDokumen?.data
    ? Array.from(
        new Set(
          dataDokumen.data
            .map((item) => item.prodi?.nm_prodi)
            .filter((nama): nama is string => Boolean(nama))
        )
      )
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedJenis("");
    setSelectedProdi("");
    setCurrentPage(1);
  };

  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <ScrollRevealComponent animations="fade-down">
        <div className="text-center space-y-4 mb-12">
          <div className="p-4 bg-primary/10 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
            <FileText className="w-10 h-10 text-primary" />
          </div>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Akses dan unduh berbagai dokumen penting yang telah dikategorikan
            berdasarkan program studi
          </p>
        </div>
      </ScrollRevealComponent>

      {/* Statistics */}
      {dataDokumen?.data && <DokumenStats data={dataDokumen.data} />}

      {/* Search and Filter Section */}
      <ScrollRevealComponent animations="fade-up">
        <div className="bg-base-100 rounded-lg border border-base-200 p-6 space-y-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Cari dokumen..."
                className="input input-bordered w-full pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="w-5 h-5 text-base-content/40 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <button type="submit" className="btn btn-primary">
              Cari
            </button>
          </form>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-base-content/60" />
              <span className="text-sm font-medium text-base-content/80">
                Filter:
              </span>
            </div>

            <select
              className="select select-bordered select-sm"
              value={selectedJenis}
              onChange={(e) => setSelectedJenis(e.target.value)}
            >
              <option value="">Semua Jenis</option>
              {uniqueJenis.map((jenis) => (
                <option key={jenis} value={jenis}>
                  {jenis}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered select-sm"
              value={selectedProdi}
              onChange={(e) => setSelectedProdi(e.target.value)}
            >
              <option value="">Semua Prodi</option>
              {uniqueProdi.map((prodi) => (
                <option key={prodi} value={prodi}>
                  {prodi}
                </option>
              ))}
            </select>

            {(searchQuery || selectedJenis || selectedProdi) && (
              <button onClick={clearFilters} className="btn btn-ghost btn-sm">
                Reset Filter
              </button>
            )}
          </div>
        </div>
      </ScrollRevealComponent>

      {/* View Toggle */}
      <ScrollRevealComponent animations="fade-up">
        <div className="flex justify-between items-center">
          <div className="text-sm text-base-content/60">
            {dataDokumen?.data && (
              <>
                Menampilkan {dataDokumen.data.length} dari{" "}
                {dataDokumen.data.length || 0} dokumen
              </>
            )}
          </div>

          <div className="join">
            <button
              onClick={() => setViewMode("grid")}
              className={`join-item btn btn-sm ${
                viewMode === "grid" ? "btn-primary" : "btn-ghost"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`join-item btn btn-sm ${
                viewMode === "list" ? "btn-primary" : "btn-ghost"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </ScrollRevealComponent>

      {/* Loading State */}
      {loading && (
        <ScrollRevealComponent animations="fade-up">
          <div className="flex justify-center items-center py-16">
            <div className="loading loading-spinner loading-lg text-primary"></div>
          </div>
        </ScrollRevealComponent>
      )}

      {/* Content */}
      {!loading && dataDokumen?.data && (
        <>
          {viewMode === "grid" ? (
            <DokumenGrid data={dataDokumen.data} />
          ) : (
            <DokumenList data={dataDokumen.data} />
          )}

          {/* Pagination */}
          {dataDokumen && (
            <ScrollRevealComponent animations="fade-up">
              <div className="flex justify-center mt-12">
                <Paginate
                  responses={{ data: { meta: dataDokumen.meta } }}
                  setPage={setCurrentPage}
                  className="w-full"
                />
              </div>
            </ScrollRevealComponent>
          )}
        </>
      )}

      {/* Empty State */}
      {!loading && (!dataDokumen?.data || dataDokumen.data.length === 0) && (
        <ScrollRevealComponent animations="fade-up">
          <div className="text-center py-16">
            <div className="p-6 bg-base-200 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <FileText className="w-12 h-12 text-base-content/40" />
            </div>
            <h3 className="text-xl font-semibold text-base-content mb-2">
              Tidak ada dokumen ditemukan
            </h3>
            <p className="text-base-content/60 mb-4">
              {searchQuery || selectedJenis || selectedProdi
                ? "Coba ubah atau hapus filter pencarian"
                : "Belum ada dokumen yang tersedia saat ini"}
            </p>
            {(searchQuery || selectedJenis || selectedProdi) && (
              <button onClick={clearFilters} className="btn btn-primary">
                Reset Filter
              </button>
            )}
          </div>
        </ScrollRevealComponent>
      )}
    </main>
  );
};

export default DokumenPage;
