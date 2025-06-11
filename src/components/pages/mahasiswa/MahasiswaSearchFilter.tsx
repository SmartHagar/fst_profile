/** @format */

// components/mahasiswa/MahasiswaSearchFilter.tsx (FIXED VERSION)
import React, { useState, useEffect, useRef } from "react";
import { Search, Filter, Users, X, RotateCcw, ArrowUpDown } from "lucide-react";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";
import { MahasiswaFilters, ProdiType } from "@/types/mahasiswa.types";

interface MahasiswaSearchFilterProps {
  filters: MahasiswaFilters;
  onFiltersChange: (filters: Partial<MahasiswaFilters>) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  prodiOptions: ProdiType[];
  tahunAngkatanOptions: number[];
  totalResults?: number;
  loading?: boolean;
}

const MahasiswaSearchFilter: React.FC<MahasiswaSearchFilterProps> = ({
  filters,
  onFiltersChange,
  onApplyFilters,
  onResetFilters,
  prodiOptions,
  tahunAngkatanOptions,
  totalResults = 0,
  loading = false,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchDebounce, setSearchDebounce] = useState(filters.search);
  const isInitialMount = useRef(true);
  const appliedFiltersRef = useRef(filters);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchDebounce !== filters.search) {
        onFiltersChange({ search: searchDebounce });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchDebounce, filters.search, onFiltersChange]);

  // Only auto-apply filters when they actually change (not on initial mount)
  useEffect(() => {
    // Skip initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      appliedFiltersRef.current = filters;
      return;
    }

    // Check if filters actually changed
    const hasChanged =
      filters.status !== appliedFiltersRef.current.status ||
      filters.prodi_id !== appliedFiltersRef.current.prodi_id ||
      filters.thn_angkatan !== appliedFiltersRef.current.thn_angkatan ||
      filters.jenkel !== appliedFiltersRef.current.jenkel ||
      filters.sort_by !== appliedFiltersRef.current.sort_by ||
      filters.sort_order !== appliedFiltersRef.current.sort_order ||
      filters.search !== appliedFiltersRef.current.search ||
      filters.limit !== appliedFiltersRef.current.limit;

    if (hasChanged) {
      appliedFiltersRef.current = filters;
      onApplyFilters();
    }
  }, [
    filters.status,
    filters.prodi_id,
    filters.thn_angkatan,
    filters.jenkel,
    filters.sort_by,
    filters.sort_order,
    filters.search,
    filters.limit,
  ]);

  const handleSearchChange = (value: string) => {
    setSearchDebounce(value);
  };

  const handleFilterChange = (newFilter: Partial<MahasiswaFilters>) => {
    onFiltersChange(newFilter);
  };

  const hasActiveFilters =
    filters.search ||
    filters.status !== "all" ||
    filters.prodi_id ||
    filters.thn_angkatan ||
    filters.jenkel !== "all" ||
    filters.sort_by !== "nm_mhs" ||
    filters.sort_order !== "asc";

  const statusOptions = [
    { value: "all", label: "Semua Status", color: "text-gray-700" },
    { value: "active", label: "Aktif", color: "text-green-700" },
    { value: "inactive", label: "Tidak Aktif", color: "text-red-700" },
    { value: "lulus", label: "Lulus", color: "text-blue-700" },
  ];

  const jenkelOptions = [
    { value: "all", label: "Semua Jenis Kelamin" },
    { value: "Laki-laki", label: "Laki-laki" },
    { value: "Perempuan", label: "Perempuan" },
  ];

  const sortOptions = [
    { value: "nm_mhs", label: "Nama Mahasiswa" },
    { value: "NPM", label: "NPM" },
    { value: "thn_angkatan", label: "Tahun Angkatan" },
    { value: "prodi", label: "Program Studi" },
    { value: "created_at", label: "Tanggal Daftar" },
    { value: "status", label: "Status" },
  ];

  return (
    <ScrollRevealComponent animations="fade-down">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        {/* Main Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari nama mahasiswa atau NPM..."
              value={searchDebounce}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              disabled={loading}
            />
            {loading && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>

          {/* Quick Status Filter */}
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() =>
                  handleFilterChange({ status: option.value as any })
                }
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filters.status === option.value
                    ? "bg-blue-100 text-blue-700 border border-blue-300"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                }`}
                disabled={loading}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Advanced Filter Toggle */}
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              showAdvancedFilters || hasActiveFilters
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
            disabled={loading}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter Lanjutan</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {/* Program Studi Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program Studi
                </label>
                <select
                  value={filters.prodi_id}
                  onChange={(e) =>
                    handleFilterChange({ prodi_id: e.target.value })
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  disabled={loading}
                >
                  <option value="">Semua Prodi</option>
                  {prodiOptions.map((prodi) => (
                    <option key={prodi.id} value={prodi.id.toString()}>
                      {prodi.kode} - {prodi.nm_prodi}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tahun Angkatan Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tahun Angkatan
                </label>
                <select
                  value={filters.thn_angkatan}
                  onChange={(e) =>
                    handleFilterChange({ thn_angkatan: e.target.value })
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  disabled={loading}
                >
                  <option value="">Semua Tahun</option>
                  {tahunAngkatanOptions.map((tahun) => (
                    <option key={tahun} value={tahun.toString()}>
                      {tahun}
                    </option>
                  ))}
                </select>
              </div>

              {/* Jenis Kelamin Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenis Kelamin
                </label>
                <select
                  value={filters.jenkel}
                  onChange={(e) =>
                    handleFilterChange({ jenkel: e.target.value as any })
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  disabled={loading}
                >
                  {jenkelOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urutkan Berdasarkan
                </label>
                <div className="flex gap-1">
                  <select
                    value={filters.sort_by}
                    onChange={(e) =>
                      handleFilterChange({ sort_by: e.target.value as any })
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    disabled={loading}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() =>
                      handleFilterChange({
                        sort_order:
                          filters.sort_order === "asc" ? "desc" : "asc",
                      })
                    }
                    className={`px-3 py-2 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-50 transition-colors ${
                      filters.sort_order === "desc" ? "bg-gray-100" : ""
                    }`}
                    disabled={loading}
                    title={`Saat ini: ${
                      filters.sort_order === "asc" ? "A-Z" : "Z-A"
                    }`}
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Items per page */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item per Halaman
                </label>
                <select
                  value={filters.limit}
                  onChange={(e) =>
                    handleFilterChange({ limit: parseInt(e.target.value) })
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  disabled={loading}
                >
                  <option value={8}>8</option>
                  <option value={12}>12</option>
                  <option value={16}>16</option>
                  <option value={20}>20</option>
                  <option value={24}>24</option>
                  <option value={32}>32</option>
                  <option value={48}>48</option>
                  <option value={64}>64</option>
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span className="font-medium">
                  {totalResults} mahasiswa ditemukan
                </span>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={onResetFilters}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                  disabled={loading}
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Filter
                </button>
              )}
            </div>
          </div>
        )}

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700">
                Filter aktif:
              </span>

              {filters.search && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  Pencarian: &quot;{filters.search}&quot;
                  <button onClick={() => handleFilterChange({ search: "" })}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.status !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Status:{" "}
                  {statusOptions.find((s) => s.value === filters.status)?.label}
                  <button onClick={() => handleFilterChange({ status: "all" })}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.prodi_id && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                  Prodi:{" "}
                  {
                    prodiOptions.find(
                      (p) => p.id.toString() === filters.prodi_id
                    )?.nm_prodi
                  }
                  <button onClick={() => handleFilterChange({ prodi_id: "" })}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.thn_angkatan && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                  Angkatan: {filters.thn_angkatan}
                  <button
                    onClick={() => handleFilterChange({ thn_angkatan: "" })}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.jenkel !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-xs">
                  {filters.jenkel}
                  <button onClick={() => handleFilterChange({ jenkel: "all" })}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {(filters.sort_by !== "nm_mhs" ||
                filters.sort_order !== "asc") && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                  Sort:{" "}
                  {sortOptions.find((s) => s.value === filters.sort_by)?.label}{" "}
                  ({filters.sort_order === "asc" ? "A-Z" : "Z-A"})
                  <button
                    onClick={() =>
                      handleFilterChange({
                        sort_by: "nm_mhs",
                        sort_order: "asc",
                      })
                    }
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </ScrollRevealComponent>
  );
};

export default MahasiswaSearchFilter;
