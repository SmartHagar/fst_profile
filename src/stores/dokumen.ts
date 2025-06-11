/** @format */

// stores/dokumen.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
import { DokumenType } from "@/types";

interface DokumenResponse {
  data: DokumenType[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
}

interface DokumenState {
  dataDokumen: DokumenResponse;
  loading: boolean;
  error: string | null;
  currentPage: number;

  setDokumen: ({
    page,
    limit,
    jenis_id,
    no_jenis_id,
    search,
    prodi_id,
  }: {
    page?: number;
    limit?: number;
    jenis_id?: number | string;
    no_jenis_id?: number | string;
    search?: string;
    prodi_id?: number | string;
  }) => Promise<any>;
  clearError: () => void;
}

const useDokumen = create<DokumenState>()(
  devtools(
    (set) => ({
      dataDokumen: { data: [] },
      loading: false,
      error: null,
      currentPage: 1,

      clearError: () => set({ error: null }),

      setDokumen: async ({
        page = 1,
        limit = 12,
        jenis_id,
        no_jenis_id,
        search,
        prodi_id,
      }: {
        page?: number;
        limit?: number;
        jenis_id?: number | string;
        no_jenis_id?: number | string;
        search?: string;
        prodi_id?: number | string;
      }) => {
        set({ loading: true, error: null, currentPage: page });
        try {
          const res = await api.get(`/dokumen`, {
            params: {
              page,
              per_page: limit,
              jenis_id,
              no_jenis_id,
              search,
              prodi_id,
            },
          });
          set({
            dataDokumen: res.data,
            loading: false,
          });
          return { status: "berhasil", data: res.data };
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ error: errorMessage, loading: false });
          return { status: "error", error: errorMessage };
        }
      },
    }),
    { name: "dokumen-store" }
  )
);

export default useDokumen;
