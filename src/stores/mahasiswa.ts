/** @format */

// stores/mahasiswa.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  MahasiswaType,
  MahasiswaResponse,
  MahasiswaFilters,
  FilterOptionsType,
  StatisticsType,
  MahasiswaApiResponse,
} from "@/types/mahasiswa.types";
import { api_siakad } from "@/services/baseURL";

interface MahasiswaState {
  dataMahasiswa: MahasiswaResponse | null;
  dtShowMahasiswa: MahasiswaType | null;
  filterOptions: FilterOptionsType | null;
  statistics: StatisticsType | null;
  loading: boolean;
  loadingOptions: boolean;
  error: string | null;

  // Filter state
  filters: MahasiswaFilters;

  // Actions
  setMahasiswa: () => Promise<any>;
  setShowMahasiswa: (id: string) => Promise<any>;
  setFilterOptions: () => Promise<any>;
  setStatistics: () => Promise<any>;

  // Filter actions
  setFilters: (newFilters: Partial<MahasiswaFilters>) => void;
  applyFilters: () => Promise<any>;
  resetFilters: () => void;
  changePage: (page: number) => Promise<any>;
  changeLimit: (limit: number) => Promise<any>;
  clearError: () => void;
}

const initialFilters: MahasiswaFilters = {
  search: "",
  status: "all",
  prodi_id: "",
  thn_angkatan: "",
  jenkel: "all",
  sort_by: "thn_angkatan",
  sort_order: "desc",
  limit: 16,
  page: 1,
};

const useMahasiswa = create<MahasiswaState>()(
  devtools(
    (set, get) => ({
      dataMahasiswa: null,
      dtShowMahasiswa: null,
      filterOptions: null,
      statistics: null,
      loading: false,
      loadingOptions: false,
      error: null,
      filters: initialFilters,

      clearError: () => set({ error: null }),

      setMahasiswa: async () => {
        set({ loading: true, error: null });
        try {
          const { filters } = get();
          const params = new URLSearchParams();

          // Add all non-empty filters to params
          Object.entries(filters).forEach(([key, value]) => {
            if (value && value !== "all" && value !== "") {
              params.append(key, value.toString());
            }
          });

          const res = await api_siakad.get(`/mhs?${params.toString()}`);
          const apiResponse: MahasiswaApiResponse = res.data;

          if (apiResponse.type === "success") {
            set({
              dataMahasiswa: apiResponse.data,
              loading: false,
            });
            return { status: "berhasil", data: apiResponse };
          } else {
            throw new Error(apiResponse.message || "Failed to fetch data");
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ error: errorMessage, loading: false });
          return { status: "error", error: errorMessage };
        }
      },

      setShowMahasiswa: async (id: string) => {
        set({ loading: true, error: null });
        try {
          const { dataMahasiswa } = get();
          if (dataMahasiswa?.data) {
            const mahasiswa = dataMahasiswa.data.find((mhs) => mhs.id === id);
            if (mahasiswa) {
              set({ dtShowMahasiswa: mahasiswa, loading: false });
              return { status: "berhasil", data: mahasiswa };
            }
          }

          // If not found in current data, we could fetch individual record
          // For now, just return error
          throw new Error("Mahasiswa tidak ditemukan");
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ error: errorMessage, loading: false });
          return { status: "error", error: errorMessage };
        }
      },

      setFilterOptions: async () => {
        set({ loadingOptions: true });
        try {
          const res = await api_siakad.get("/mhs/filter-options");
          const apiResponse = res.data;

          if (apiResponse.type === "success") {
            set({
              filterOptions: apiResponse.data,
              loadingOptions: false,
            });
            return { status: "berhasil", data: apiResponse };
          } else {
            throw new Error(
              apiResponse.message || "Failed to fetch filter options"
            );
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ error: errorMessage, loadingOptions: false });
          return { status: "error", error: errorMessage };
        }
      },

      setStatistics: async () => {
        try {
          const { filters } = get();
          const params = new URLSearchParams();

          if (filters.prodi_id) params.append("prodi_id", filters.prodi_id);
          if (filters.thn_angkatan)
            params.append("thn_angkatan", filters.thn_angkatan);

          const res = await api_siakad.get(
            `/mhs/statistics?${params.toString()}`
          );
          const apiResponse = res.data;

          if (apiResponse.type === "success") {
            set({ statistics: apiResponse.data });
            return { status: "berhasil", data: apiResponse };
          } else {
            throw new Error(
              apiResponse.message || "Failed to fetch statistics"
            );
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ error: errorMessage });
          return { status: "error", error: errorMessage };
        }
      },

      setFilters: (newFilters: Partial<MahasiswaFilters>) => {
        set((state) => ({
          filters: {
            ...state.filters,
            ...newFilters,
            // Reset page when filters change (except when explicitly setting page)
            page: newFilters.page !== undefined ? newFilters.page : 1,
          },
        }));
        // Don't auto-apply here to prevent infinite loops
        // Let components explicitly call applyFilters when needed
      },

      applyFilters: async () => {
        return await get().setMahasiswa();
      },

      changePage: async (page: number) => {
        get().setFilters({ page });
        const result = await get().setMahasiswa();

        // Enhanced scroll behavior
        if (typeof window !== "undefined") {
          // Small delay to ensure data is loaded and DOM is updated
          setTimeout(() => {
            const contentElement = document.querySelector(
              "[data-mahasiswa-content]"
            ) as HTMLElement;
            const statisticsElement = document.querySelector(
              "[data-statistics]"
            ) as HTMLElement;

            // Try to scroll to statistics section first (more relevant for pagination)
            if (statisticsElement) {
              const statsRect = statisticsElement.getBoundingClientRect();
              const absoluteStatsTop = statsRect.top + window.pageYOffset;
              const optimalPosition = Math.max(0, absoluteStatsTop - 100); // 100px offset

              window.scrollTo({
                top: optimalPosition,
                behavior: "smooth",
              });
            } else if (contentElement) {
              // Fallback to content element
              const contentRect = contentElement.getBoundingClientRect();
              const absoluteContentTop = contentRect.top + window.pageYOffset;
              const optimalPosition = Math.max(0, absoluteContentTop - 120); // 120px offset

              window.scrollTo({
                top: optimalPosition,
                behavior: "smooth",
              });
            } else {
              // Final fallback: scroll with fixed offset
              window.scrollTo({
                top: 150, // 150px from top to keep header and some content visible
                behavior: "smooth",
              });
            }
          }, 200); // 200ms delay to ensure loading is done
        }

        return result;
      },

      changeLimit: async (limit: number) => {
        get().setFilters({ limit, page: 1 }); // Reset to page 1 when changing limit
        return await get().setMahasiswa();
      },

      resetFilters: () => {
        set({ filters: initialFilters });
        get().setMahasiswa();
      },
    }),
    { name: "mahasiswa-store" }
  )
);

export default useMahasiswa;
