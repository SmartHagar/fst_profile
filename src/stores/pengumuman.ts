/** @format */

// stores/pengumuman.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
import { PengumumanType } from "@/types";

interface PengumumanState {
  dataPengumuman: { data?: PengumumanType[] };
  dtShowPengumuman: PengumumanType | null;
  loading: boolean;
  error: string | null;
  selectedCategory: string; // "all", "1", "2", "3", "4"
  filteredData: PengumumanType[];

  setPengumuman: () => Promise<any>;
  setShowPengumuman: (id: number) => Promise<any>;
  setSelectedCategory: (category: string) => void;
  filterPengumuman: () => void;
  clearError: () => void;
}

const usePengumuman = create<PengumumanState>()(
  devtools(
    (set, get) => ({
      dataPengumuman: {},
      dtShowPengumuman: null,
      loading: false,
      error: null,
      selectedCategory: "all",
      filteredData: [],

      clearError: () => set({ error: null }),

      setPengumuman: async () => {
        set({ loading: true, error: null });
        try {
          const res = await api.get("/pengumuman");
          set({
            dataPengumuman: res.data,
            loading: false,
          });
          // Auto filter setelah data dimuat
          get().filterPengumuman();
          return { status: "berhasil", data: res.data };
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ error: errorMessage, loading: false });
          return { status: "error", error: errorMessage };
        }
      },

      setShowPengumuman: async (id: number) => {
        set({ loading: true, error: null });
        try {
          const res = await api.get(`/pengumuman/detail/${id}`);
          set({ dtShowPengumuman: res.data, loading: false });
          return { status: "berhasil", data: res.data };
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ error: errorMessage, loading: false });
          return { status: "error", error: errorMessage };
        }
      },

      setSelectedCategory: (category: string) => {
        set({ selectedCategory: category });
        get().filterPengumuman();
      },

      filterPengumuman: () => {
        const { dataPengumuman, selectedCategory } = get();
        const allData = dataPengumuman.data || [];

        if (selectedCategory === "all") {
          set({ filteredData: allData });
        } else {
          const filtered = allData.filter(
            (item) => item.prodi_id === selectedCategory
          );
          set({ filteredData: filtered });
        }
      },
    }),
    { name: "pengumuman-store" }
  )
);

export default usePengumuman;
