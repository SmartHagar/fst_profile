/** @format */

// components/jadwal/JadwalFilter.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Search, Filter, X, RotateCcw } from "lucide-react";
import { debounce } from "lodash";
import useJadwal from "@/stores/jadwal";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";

const JadwalFilter: React.FC = () => {
  const {
    filters,
    filterOptions,
    loadingOptions,
    setFilters,
    applyFilters,
    resetFilters,
    setFilterOptions,
  } = useJadwal();

  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.search);

  useEffect(() => {
    setFilterOptions();
  }, [setFilterOptions]);

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      setFilters({ search: searchValue });
      applyFilters();
    }, 500), // 500ms delay
    [setFilters, applyFilters]
  );

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Cancel debounced call and execute immediately
    debouncedSearch.cancel();
    setFilters({ search: searchInput });
    applyFilters();
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters({ [field]: value });
    // Auto apply filters when changed
    setTimeout(() => applyFilters(), 100);
  };

  const handleApplyFilters = () => {
    applyFilters();
    setShowAdvancedFilter(false);
  };

  const handleResetFilters = () => {
    // Cancel any pending debounced search
    debouncedSearch.cancel();
    resetFilters();
    setSearchInput("");
    setShowAdvancedFilter(false);
  };

  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) => key !== "page" && key !== "limit" && value !== ""
  );

  return (
    <ScrollRevealComponent animations="fade-up" delay={100}>
      <div className="bg-base-100 rounded-lg shadow-sm border border-base-200 p-6 mb-6">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mb-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari mata kuliah, dosen, atau hari..."
                className="input input-bordered w-full pl-10"
                value={searchInput}
                onChange={handleSearchChange}
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    debouncedSearch.cancel();
                    setFilters({ search: "" });
                    applyFilters();
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loadingOptions}
            >
              <Search className="w-4 h-4" />
              Cari
            </button>
          </div>
        </form>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <button
            onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
            className={`btn btn-sm ${
              showAdvancedFilter ? "btn-primary" : "btn-outline"
            }`}
          >
            <Filter className="w-4 h-4" />
            Filter Lanjutan
          </button>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="btn btn-sm btn-ghost"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Filter
            </button>
          )}

          {hasActiveFilters && (
            <div className="text-sm text-base-content/60">
              Filter aktif diterapkan
            </div>
          )}
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilter && (
          <div className="border-t border-base-200 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {/* Tahun Filter */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Tahun</span>
                </label>
                <select
                  className="select select-bordered select-sm"
                  value={filters.tahun}
                  onChange={(e) => handleFilterChange("tahun", e.target.value)}
                  disabled={loadingOptions}
                >
                  <option value="">Semua Tahun</option>
                  {filterOptions?.tahun?.map((tahun) => (
                    <option key={tahun} value={tahun}>
                      {tahun}
                    </option>
                  ))}
                </select>
              </div>

              {/* Semester Filter */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Semester</span>
                </label>
                <select
                  className="select select-bordered select-sm"
                  value={filters.semester}
                  onChange={(e) =>
                    handleFilterChange("semester", e.target.value)
                  }
                  disabled={loadingOptions}
                >
                  <option value="">Semua Semester</option>
                  <option value="Ganjil">Ganjil</option>
                  <option value="Genap">Genap</option>
                </select>
              </div>

              {/* Hari Filter */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Hari</span>
                </label>
                <select
                  className="select select-bordered select-sm"
                  value={filters.hari}
                  onChange={(e) => handleFilterChange("hari", e.target.value)}
                  disabled={loadingOptions}
                >
                  <option value="">Semua Hari</option>
                  {filterOptions?.hari?.map((hari) => (
                    <option key={hari} value={hari}>
                      {hari}
                    </option>
                  ))}
                </select>
              </div>

              {/* Program Studi Filter */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Program Studi</span>
                </label>
                <select
                  className="select select-bordered select-sm"
                  value={filters.prodi_id}
                  onChange={(e) =>
                    handleFilterChange("prodi_id", e.target.value)
                  }
                  disabled={loadingOptions}
                >
                  <option value="">Semua Program Studi</option>
                  {filterOptions?.prodi?.map((prodi) => (
                    <option key={prodi.id} value={prodi.id}>
                      {prodi.nm_prodi} ({prodi.fakultas?.nm_fakultas})
                    </option>
                  ))}
                </select>
              </div>

              {/* Dosen Filter */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Dosen</span>
                </label>
                <select
                  className="select select-bordered select-sm"
                  value={filters.pegawai_id}
                  onChange={(e) =>
                    handleFilterChange("pegawai_id", e.target.value)
                  }
                  disabled={loadingOptions}
                >
                  <option value="">Semua Dosen</option>
                  {filterOptions?.dosen?.map((dosen) => (
                    <option key={dosen.id} value={dosen.id}>
                      {dosen.nm_pegawai}
                    </option>
                  ))}
                </select>
              </div>

              {/* Items per page */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Items per halaman
                  </span>
                </label>
                <select
                  className="select select-bordered select-sm"
                  value={filters.limit}
                  onChange={(e) => handleFilterChange("limit", e.target.value)}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleApplyFilters}
                className="btn btn-primary btn-sm"
                disabled={loadingOptions}
              >
                Terapkan Filter
              </button>
              <button
                onClick={handleResetFilters}
                className="btn btn-ghost btn-sm"
              >
                <X className="w-4 h-4" />
                Reset Semua
              </button>
              <button
                onClick={() => setShowAdvancedFilter(false)}
                className="btn btn-ghost btn-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-base-200">
            <div className="text-sm font-medium text-base-content/70 mb-2">
              Filter Aktif:
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <div className="badge badge-primary gap-2">
                  Pencarian: {filters.search}
                  <button
                    onClick={() => {
                      debouncedSearch.cancel();
                      setFilters({ search: "" });
                      setSearchInput("");
                      applyFilters();
                    }}
                    className="btn btn-ghost btn-xs p-0 min-h-0 h-auto"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {filters.tahun && (
                <div className="badge badge-secondary gap-2">
                  Tahun: {filters.tahun}
                  <button
                    onClick={() => {
                      setFilters({ tahun: "" });
                      applyFilters();
                    }}
                    className="btn btn-ghost btn-xs p-0 min-h-0 h-auto"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {filters.semester && (
                <div className="badge badge-accent gap-2">
                  Semester: {filters.semester}
                  <button
                    onClick={() => {
                      setFilters({ semester: "" });
                      applyFilters();
                    }}
                    className="btn btn-ghost btn-xs p-0 min-h-0 h-auto"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {filters.hari && (
                <div className="badge badge-info gap-2">
                  Hari: {filters.hari}
                  <button
                    onClick={() => {
                      setFilters({ hari: "" });
                      applyFilters();
                    }}
                    className="btn btn-ghost btn-xs p-0 min-h-0 h-auto"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {filters.prodi_id && filterOptions?.prodi && (
                <div className="badge badge-warning gap-2">
                  Prodi:{" "}
                  {
                    filterOptions.prodi.find((p) => p.id === filters.prodi_id)
                      ?.nm_prodi
                  }
                  <button
                    onClick={() => {
                      setFilters({ prodi_id: "" });
                      applyFilters();
                    }}
                    className="btn btn-ghost btn-xs p-0 min-h-0 h-auto"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {filters.pegawai_id && filterOptions?.dosen && (
                <div className="badge badge-success gap-2">
                  Dosen:{" "}
                  {
                    filterOptions.dosen.find((d) => d.id === filters.pegawai_id)
                      ?.nm_pegawai
                  }
                  <button
                    onClick={() => {
                      setFilters({ pegawai_id: "" });
                      applyFilters();
                    }}
                    className="btn btn-ghost btn-xs p-0 min-h-0 h-auto"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ScrollRevealComponent>
  );
};

export default JadwalFilter;
