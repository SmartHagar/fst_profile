/** @format */

// components/mahasiswa/MahasiswaGrid.tsx
import React from "react";
import { MahasiswaType, MahasiswaResponse } from "@/types/mahasiswa.types";
import MahasiswaCard from "./MahasiswaCard";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";
import {
  Users,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

interface MahasiswaGridProps {
  mahasiswaData: MahasiswaResponse | null;
  loading?: boolean;
  onMahasiswaClick?: (mahasiswa: MahasiswaType) => void;
  onPageChange?: (page: number) => void;
}

const MahasiswaGrid: React.FC<MahasiswaGridProps> = ({
  mahasiswaData,
  loading,
  onMahasiswaClick,
  onPageChange,
}) => {
  const mahasiswaList = mahasiswaData?.data || [];

  // Group by prodi for additional stats
  const prodiStats = mahasiswaList.reduce((acc, mhs) => {
    const prodiName = mhs.prodi?.nm_prodi || "Tidak Diketahui";
    acc[prodiName] = (acc[prodiName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalProdi = Object.keys(prodiStats).length;

  // Pagination component
  const PaginationComponent = () => {
    if (!mahasiswaData || mahasiswaData.last_page <= 1) return null;

    const currentPage = mahasiswaData.current_page;
    const totalPages = mahasiswaData.last_page;
    const maxVisiblePages = 5;

    const getVisiblePages = () => {
      const pages = [];
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // Adjust start page if we're near the end
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    };

    const visiblePages = getVisiblePages();

    return (
      <div className="flex items-center justify-between mt-6">
        {/* Pagination Info */}
        <div className="text-sm text-gray-600">
          Menampilkan {mahasiswaData.from} - {mahasiswaData.to} dari{" "}
          {mahasiswaData.total} mahasiswa
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-1">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={!mahasiswaData.prev_page_url || loading}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {/* First page if not visible */}
            {visiblePages[0] > 1 && (
              <>
                <button
                  onClick={() => onPageChange?.(1)}
                  disabled={loading}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50"
                >
                  1
                </button>
                {visiblePages[0] > 2 && (
                  <span className="px-2 py-2 text-gray-500">
                    <MoreHorizontal className="w-4 h-4" />
                  </span>
                )}
              </>
            )}

            {/* Visible page numbers */}
            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange?.(page)}
                disabled={loading}
                className={`px-3 py-2 text-sm font-medium rounded-lg border disabled:opacity-50 ${
                  page === currentPage
                    ? "text-blue-600 bg-blue-50 border-blue-300"
                    : "text-gray-500 bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Last page if not visible */}
            {visiblePages[visiblePages.length - 1] < totalPages && (
              <>
                {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                  <span className="px-2 py-2 text-gray-500">
                    <MoreHorizontal className="w-4 h-4" />
                  </span>
                )}
                <button
                  onClick={() => onPageChange?.(totalPages)}
                  disabled={loading}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={!mahasiswaData.next_page_url || loading}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-6 border border-gray-200"
            >
              <div className="animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mb-3"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-4 border border-gray-200"
            >
              <div className="animate-pulse">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (mahasiswaList.length === 0) {
    return (
      <ScrollRevealComponent animations="fade-up">
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Users className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Tidak Ada Data Mahasiswa
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Belum ada data mahasiswa yang sesuai dengan filter yang dipilih.
            Coba ubah kriteria pencarian atau filter yang digunakan.
          </p>
        </div>
      </ScrollRevealComponent>
    );
  }

  return (
    <div className="space-y-6">
      {/* Additional Stats - Top Prodi (from current page) */}
      {totalProdi > 1 && (
        <ScrollRevealComponent animations="fade-up" delay={100}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Distribusi Program Studi (Halaman Ini)
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(prodiStats)
                .sort(([, a], [, b]) => b - a)
                .map(([prodi, count]) => (
                  <div
                    key={prodi}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm font-medium text-gray-700 truncate mr-2">
                      {prodi}
                    </span>
                    <span className="text-sm font-bold text-gray-900 bg-white px-2 py-1 rounded">
                      {count}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </ScrollRevealComponent>
      )}

      {/* Mahasiswa Grid */}
      <ScrollRevealComponent offset={10} animations="fade-up" delay={200}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mahasiswaList.map((mahasiswa, index) => (
            <MahasiswaCard
              key={mahasiswa.id}
              mahasiswa={mahasiswa}
              index={index}
              onClick={onMahasiswaClick}
            />
          ))}
        </div>
      </ScrollRevealComponent>

      {/* Pagination */}
      <ScrollRevealComponent animations="fade-up" delay={300}>
        <PaginationComponent />
      </ScrollRevealComponent>
    </div>
  );
};

export default MahasiswaGrid;
