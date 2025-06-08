/** @format */

// src/stores/pengumuman.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { PengumumanStore } from "@/types";
import { api } from "@/services/baseURL";

export const usePengumuman = create<PengumumanStore>()(
  devtools(
    (set) => ({
      dataPengumuman: { data: [] },

      setPengumuman: async () => {
        try {
          const res = await api({
            method: "get",
            url: `/pengumuman`,
          });
          set((state) => ({ ...state, dataPengumuman: res.data }));
          return {
            status: "berhasil",
            data: res.data,
          };
        } catch (error: any) {
          return {
            status: "error",
            error: error.response?.data || error.message,
          };
        }
      },
    }),
    {
      name: "pengumuman-store",
    }
  )
);
