/** @format */

// stores/jadwal.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  JadwalType,
  JadwalResponse,
  JadwalFilters,
  FilterOptionsType,
  JadwalApiResponse,
  FilterOptionsApiResponse,
} from "@/types/jadwal.types";
import { api_siakad } from "@/services/baseURL";

interface JadwalState {
  dataJadwal: JadwalResponse | null;
  dtShowJadwal: JadwalType | null;
  filterOptions: FilterOptionsType | null;
  loading: boolean;
  loadingOptions: boolean;
  error: string | null;

  // Filter state
  filters: JadwalFilters;

  // Actions
  setJadwal: () => Promise<any>;
  setShowJadwal: (id: string) => Promise<any>;
  setFilterOptions: () => Promise<any>;

  // Filter actions
  setFilters: (newFilters: Partial<JadwalFilters>) => void;
  applyFilters: () => Promise<any>;
  resetFilters: () => void;
  changePage: (page: number) => Promise<any>;
  changeLimit: (limit: number) => Promise<any>;
  clearError: () => void;
}

const initialFilters: JadwalFilters = {
  search: "",
  semester: "",
  tahun: "",
  prodi_id: "",
  hari: "",
  pegawai_id: "",
  page: 1,
  limit: 10,
};

const useJadwal = create<JadwalState>()(
  devtools(
    (set, get) => ({
      dataJadwal: null,
      dtShowJadwal: null,
      filterOptions: null,
      loading: false,
      loadingOptions: false,
      error: null,
      filters: initialFilters,

      clearError: () => set({ error: null }),

      setJadwal: async () => {
        set({ loading: true, error: null });
        try {
          const { filters } = get();
          const params = new URLSearchParams();

          // Add all non-empty filters to params
          Object.entries(filters).forEach(([key, value]) => {
            if (value && value !== "") {
              params.append(key, value.toString());
            }
          });

          const res = await api_siakad.get(`/jadwal?${params.toString()}`);
          const apiResponse: JadwalApiResponse = res.data;

          if (apiResponse.type === "success") {
            set({
              dataJadwal: apiResponse.data,
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

      setShowJadwal: async (id: string) => {
        set({ loading: true, error: null });
        try {
          const { dataJadwal } = get();
          if (dataJadwal?.data) {
            const jadwal = dataJadwal.data.find((item) => item.id === id);
            if (jadwal) {
              set({ dtShowJadwal: jadwal, loading: false });
              return { status: "berhasil", data: jadwal };
            }
          }

          throw new Error("Jadwal tidak ditemukan");
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ error: errorMessage, loading: false });
          return { status: "error", error: errorMessage };
        }
      },

      setFilterOptions: async () => {
        set({ loadingOptions: true });
        try {
          const res = await api_siakad.get("/jadwal/filter-options");
          const apiResponse: FilterOptionsApiResponse = res.data;

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

      setFilters: (newFilters: Partial<JadwalFilters>) => {
        set((state) => ({
          filters: {
            ...state.filters,
            ...newFilters,
            // Reset page when filters change (except when explicitly setting page)
            page: newFilters.page !== undefined ? newFilters.page : 1,
          },
        }));
      },

      applyFilters: async () => {
        return await get().setJadwal();
      },

      changePage: async (page: number) => {
        get().setFilters({ page });
        const result = await get().setJadwal();

        // Enhanced scroll behavior
        if (typeof window !== "undefined") {
          setTimeout(() => {
            const contentElement = document.querySelector(
              "[data-jadwal-content]"
            ) as HTMLElement;

            if (contentElement) {
              const contentRect = contentElement.getBoundingClientRect();
              const absoluteContentTop = contentRect.top + window.pageYOffset;
              const optimalPosition = Math.max(0, absoluteContentTop - 120);

              window.scrollTo({
                top: optimalPosition,
                behavior: "smooth",
              });
            } else {
              window.scrollTo({
                top: 150,
                behavior: "smooth",
              });
            }
          }, 200);
        }

        return result;
      },

      changeLimit: async (limit: number) => {
        get().setFilters({ limit, page: 1 });
        return await get().setJadwal();
      },

      resetFilters: () => {
        set({ filters: initialFilters });
        get().setJadwal();
      },
    }),
    { name: "jadwal-store" }
  )
);

export default useJadwal;
