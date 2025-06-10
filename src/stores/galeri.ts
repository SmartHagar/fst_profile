/** @format */

// stores/galeri.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";

// Types untuk Galeri
interface KegiatanType {
  id: number;
  nm_kegiatan: string;
  deskripsi?: string;
}

interface KegiatanDetailType {
  id: number;
  kegiatan_id: number;
  kegiatan: KegiatanType;
}

interface GaleriData {
  id: number;
  path_gambar: string;
  kegiatan_det_id: number;
  kegiatan_det: KegiatanDetailType;
  ket?: string;
  status: string;
  caption?: string;
  created_at?: string;
  updated_at?: string;
}

interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface GaleriResponse {
  data?: GaleriData[];
  meta?: PaginationMeta;
}

interface GaleriState {
  dataGaleri: { data?: GaleriResponse };
  dtShowGaleri: GaleriData | null;
  loading: boolean;
  error: string | null;
  currentPage: number;

  setGaleri: (page?: number) => Promise<any>;
  setShowGaleri: (id: number) => Promise<any>;
  clearError: () => void;
}

const useGaleri = create<GaleriState>()(
  devtools(
    (set) => ({
      dataGaleri: {},
      dtShowGaleri: null,
      loading: false,
      error: null,
      currentPage: 1,

      clearError: () => set({ error: null }),

      setGaleri: async (page = 1) => {
        set({ loading: true, error: null, currentPage: page });
        try {
          const res = await api.get(`/galeri`, {
            params: { page, per_page: 12 },
          });
          set({
            dataGaleri: res.data,
            loading: false,
          });
          return { status: "berhasil", data: res.data };
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ error: errorMessage, loading: false });
          return { status: "error", error: errorMessage };
        }
      },

      setShowGaleri: async (id: number) => {
        set({ loading: true, error: null });
        try {
          const res = await api.get(`/galeri/detail/${id}`);
          set({ dtShowGaleri: res.data, loading: false });
          return { status: "berhasil", data: res.data };
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ error: errorMessage, loading: false });
          return { status: "error", error: errorMessage };
        }
      },
    }),
    { name: "galeri-store" }
  )
);

export default useGaleri;
export type { GaleriData, KegiatanType, KegiatanDetailType };
