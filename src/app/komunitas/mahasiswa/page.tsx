/** @format */

// pages/mahasiswa/page.tsx
"use client";
import React, { useEffect, useState, useCallback } from "react";
import useMahasiswa from "@/stores/mahasiswa";
import MahasiswaSearchFilter from "@/components/pages/mahasiswa/MahasiswaSearchFilter";
import MahasiswaGrid from "@/components/pages/mahasiswa/MahasiswaGrid";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";
import { Users, Info, Eye, AlertCircle } from "lucide-react";
import { MahasiswaType } from "@/types/mahasiswa.types";
import { scrollToContent } from "@/utils/scroll.utils";

const MahasiswaPage = () => {
  const [showMahasiswaDetail, setShowMahasiswaDetail] =
    useState<MahasiswaType | null>(null);

  const {
    dataMahasiswa,
    filterOptions,
    loading,
    loadingOptions,
    error,
    filters,
    setMahasiswa,
    setFilterOptions,
    setFilters,
    applyFilters,
    resetFilters,
    changePage,
    clearError,
  } = useMahasiswa();

  useEffect(() => {
    // Load initial data
    const loadInitialData = async () => {
      try {
        // Load filter options first
        await setFilterOptions();
        // Then load mahasiswa data
        await setMahasiswa();
      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    };

    loadInitialData();
  }, []); // Empty dependency array - only run once on mount

  const handleFiltersChange = useCallback(
    (newFilters: Partial<typeof filters>) => {
      setFilters(newFilters);
    },
    [setFilters]
  );

  const handleApplyFilters = useCallback(() => {
    applyFilters();
  }, [applyFilters]);

  const handleResetFilters = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  const handlePageChange = useCallback(
    (page: number) => {
      scrollToContent({
        offset: 10,
      });
      changePage(page);
    },
    [changePage]
  );

  const handleMahasiswaClick = (mahasiswa: MahasiswaType) => {
    setShowMahasiswaDetail(mahasiswa);
  };

  const closeMahasiswaDetail = () => {
    setShowMahasiswaDetail(null);
  };

  // Clear error when component mounts
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000); // Auto-clear error after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  // Get filter options
  const prodiOptions = filterOptions?.prodi || [];
  const tahunAngkatanOptions = filterOptions?.tahun_angkatan || [];
  const totalResults = dataMahasiswa?.total || 0;

  return (
    <main className="flex flex-col gap-8" data-mahasiswa-content>
      {/* Introduction Section */}
      <ScrollRevealComponent animations="fade-up">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Data Mahasiswa Universitas
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Halaman ini menampilkan data lengkap mahasiswa yang terdaftar di
                universitas. Anda dapat mencari dan memfilter data berdasarkan
                berbagai kriteria seperti nama, program studi, tahun angkatan,
                status, dan jenis kelamin.
              </p>

              {/* Statistics from filter options */}
              {filterOptions?.statistics && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <div className="font-semibold text-blue-900">
                      {filterOptions.statistics.total}
                    </div>
                    <div className="text-blue-700">Total Mahasiswa</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <div className="font-semibold text-green-900">
                      {filterOptions.statistics.aktif}
                    </div>
                    <div className="text-green-700">Mahasiswa Aktif</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-red-200">
                    <div className="font-semibold text-red-900">
                      {filterOptions.statistics.tidak_aktif}
                    </div>
                    <div className="text-red-700">Tidak Aktif</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-purple-200">
                    <div className="font-semibold text-purple-900">
                      {filterOptions.statistics.lulus}
                    </div>
                    <div className="text-purple-700">Lulus</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollRevealComponent>

      {/* Info Alert */}
      <ScrollRevealComponent animations="fade-up" delay={100}>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <strong>Informasi:</strong> Data mahasiswa menggunakan pagination
              untuk optimasi performa. Status &quot;Aktif&quot; menunjukkan
              mahasiswa yang masih terdaftar dan aktif kuliah, sedangkan
              &quot;Tidak Aktif&quot; menunjukkan mahasiswa yang cuti atau
              non-aktif.
            </div>
          </div>
        </div>
      </ScrollRevealComponent>

      {/* Error Alert */}
      {error && (
        <ScrollRevealComponent animations="fade-up">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm text-red-800">
                  <strong>Error:</strong> {error}
                </div>
              </div>
              <button
                onClick={clearError}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                ✕
              </button>
            </div>
          </div>
        </ScrollRevealComponent>
      )}

      {/* Loading Filter Options */}
      {loadingOptions && !filterOptions && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <div className="text-sm text-blue-800">Memuat opsi filter...</div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      {filterOptions && (
        <MahasiswaSearchFilter
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
          prodiOptions={prodiOptions}
          tahunAngkatanOptions={tahunAngkatanOptions}
          totalResults={totalResults}
          loading={loading}
        />
      )}

      {/* Main Content Grid */}
      <MahasiswaGrid
        mahasiswaData={dataMahasiswa}
        loading={loading}
        onMahasiswaClick={handleMahasiswaClick}
        onPageChange={handlePageChange}
      />

      {/* Footer Info */}
      {!loading && dataMahasiswa && dataMahasiswa.data.length > 0 && (
        <ScrollRevealComponent animations="fade-up">
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-sm text-gray-600">
              Data mahasiswa ini bersifat internal dan hanya dapat diakses oleh
              pihak yang berwenang. Untuk informasi lebih lanjut, silakan
              hubungi bagian akademik universitas.
            </p>
            {dataMahasiswa && (
              <p className="text-xs text-gray-500 mt-2">
                Halaman {dataMahasiswa.current_page} dari{" "}
                {dataMahasiswa.last_page} • Total {dataMahasiswa.total}{" "}
                mahasiswa
              </p>
            )}
          </div>
        </ScrollRevealComponent>
      )}

      {/* Modal Detail Mahasiswa */}
      {showMahasiswaDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Detail Mahasiswa
                  </h3>
                  <p className="text-sm text-gray-600">
                    Informasi lengkap mahasiswa
                  </p>
                </div>
              </div>
              <button
                onClick={closeMahasiswaDetail}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex items-start gap-6 mb-6">
                {/* Photo */}
                <div className="flex-shrink-0">
                  {showMahasiswaDetail.img_mhs ? (
                    <img
                      src={`https://back-siakad.fstuogp.com/storage/${showMahasiswaDetail.img_mhs}`}
                      alt={showMahasiswaDetail.nm_mhs}
                      className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling?.classList.remove(
                          "hidden"
                        );
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl ${
                      showMahasiswaDetail.img_mhs ? "hidden" : ""
                    }`}
                  >
                    {showMahasiswaDetail.nm_mhs.charAt(0).toUpperCase()}
                  </div>
                </div>

                {/* Basic Info */}
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {showMahasiswaDetail.nm_mhs}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">NPM: </span>
                      <span className="text-gray-900">
                        {showMahasiswaDetail.NPM}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Jenis Kelamin:{" "}
                      </span>
                      <span className="text-gray-900">
                        {showMahasiswaDetail.jenkel}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Tahun Angkatan:{" "}
                      </span>
                      <span className="text-gray-900">
                        {showMahasiswaDetail.thn_angkatan}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Status:{" "}
                      </span>
                      <span
                        className={`font-medium ${
                          showMahasiswaDetail.statusMhs
                            ? "text-red-600"
                            : showMahasiswaDetail.status === "lulus"
                            ? "text-blue-600"
                            : "text-green-600"
                        }`}
                      >
                        {showMahasiswaDetail.statusMhs
                          ? "Tidak Aktif"
                          : showMahasiswaDetail.status === "lulus"
                          ? "Lulus"
                          : "Aktif"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Program Studi */}
                <div className="space-y-3">
                  <h5 className="font-semibold text-gray-900">
                    Informasi Akademik
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">
                        Program Studi:{" "}
                      </span>
                      <span className="text-gray-900">
                        {showMahasiswaDetail.prodi?.nm_prodi ||
                          "Tidak tersedia"}
                      </span>
                    </div>
                    {showMahasiswaDetail.prodi?.kode && (
                      <div>
                        <span className="font-medium text-gray-700">
                          Kode Prodi:{" "}
                        </span>
                        <span className="text-gray-900">
                          {showMahasiswaDetail.prodi.kode} (
                          {showMahasiswaDetail.prodi.singkat})
                        </span>
                      </div>
                    )}
                    {showMahasiswaDetail.prodi?.fakultas && (
                      <div>
                        <span className="font-medium text-gray-700">
                          Fakultas:{" "}
                        </span>
                        <span className="text-gray-900">
                          {showMahasiswaDetail.prodi.fakultas.nm_fakultas} (
                          {showMahasiswaDetail.prodi.fakultas.singkat})
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Detail */}
                <div className="space-y-3">
                  <h5 className="font-semibold text-gray-900">Detail Status</h5>
                  <div className="space-y-2 text-sm">
                    {showMahasiswaDetail.statusMhs ? (
                      <>
                        <div>
                          <span className="font-medium text-gray-700">
                            Status:{" "}
                          </span>
                          <span className="text-red-600 font-medium">
                            {showMahasiswaDetail.statusMhs.status}
                          </span>
                        </div>
                        {showMahasiswaDetail.statusMhs.keterangan && (
                          <div>
                            <span className="font-medium text-gray-700">
                              Keterangan:{" "}
                            </span>
                            <span className="text-gray-900">
                              {showMahasiswaDetail.statusMhs.keterangan}
                            </span>
                          </div>
                        )}
                        {showMahasiswaDetail.statusMhs.tanggal && (
                          <div>
                            <span className="font-medium text-gray-700">
                              Tanggal:{" "}
                            </span>
                            <span className="text-gray-900">
                              {new Date(
                                showMahasiswaDetail.statusMhs.tanggal
                              ).toLocaleDateString("id-ID")}
                            </span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div>
                        <span className="font-medium text-gray-700">
                          Status:{" "}
                        </span>
                        <span className="text-green-600 font-medium">
                          {showMahasiswaDetail.status === "lulus"
                            ? "Lulus"
                            : "Aktif"}
                        </span>
                      </div>
                    )}

                    <div>
                      <span className="font-medium text-gray-700">
                        Masa Studi:{" "}
                      </span>
                      <span className="text-gray-900">
                        {new Date().getFullYear() -
                          showMahasiswaDetail.thn_angkatan}{" "}
                        tahun
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Tanggal Daftar: </span>
                    {new Date(
                      showMahasiswaDetail.created_at
                    ).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div>
                    <span className="font-medium">Terakhir Update: </span>
                    {new Date(
                      showMahasiswaDetail.updated_at
                    ).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={closeMahasiswaDetail}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MahasiswaPage;
