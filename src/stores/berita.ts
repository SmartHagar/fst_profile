/** @format */

// stores/berita.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";

interface BeritaData {
  id: number;
  judul: string;
  isi_berita: string;
  gambar_berita: string;
  penulis: string;
  tag: string;
  tanggal: string;
}

interface BeritaState {
  dataBerita: { data?: BeritaData[] };
  dataRandomBerita: { data?: BeritaData[] };
  dtShowBerita: BeritaData | null;
  loading: boolean;
  error: string | null;
  setBerita: () => Promise<any>;
  setShowBerita: (params: { id: string; tag: string }) => Promise<any>;
  setRandomBerita: () => Promise<any>;
  clearError: () => void;
}

const useBerita = create<BeritaState>()(
  devtools(
    (set) => ({
      dataBerita: {},
      dataRandomBerita: {},
      dtShowBerita: null,
      loading: false,
      error: null,

      clearError: () => set({ error: null }),

      setBerita: async () => {
        set({ loading: true, error: null });
        try {
          const res = await api.get("/berita");
          set({ dataBerita: res.data, loading: false });
          return { status: "berhasil", data: res.data };
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ error: errorMessage, loading: false });
          return { status: "error", error: errorMessage };
        }
      },

      setShowBerita: async ({ id, tag }) => {
        set({ loading: true, error: null });
        try {
          const res = await api.get(`/berita/detail/${id}/${tag}`);
          set({ dtShowBerita: res.data, loading: false });
          return { status: "berhasil", data: res.data };
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ error: errorMessage, loading: false });
          return { status: "error", error: errorMessage };
        }
      },

      setRandomBerita: async () => {
        try {
          const res = await api.get("/berita/random");
          set({ dataRandomBerita: res.data });
          return { status: "berhasil", data: res.data };
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message;
          return { status: "error", error: errorMessage };
        }
      },
    }),
    { name: "berita-store" }
  )
);

export default useBerita;
