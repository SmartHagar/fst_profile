/** @format */

// src/stores/slide.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { SlideStore } from "../types";
import { api } from "../services/baseURL";

export const useSlide = create<SlideStore>()(
  devtools(
    (set) => ({
      dataSlide: [],

      setSlide: async () => {
        try {
          const res = await api({
            method: "get",
            url: `/slide`,
          });
          set((state) => ({ ...state, dataSlide: res.data.data }));
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
      name: "slide-store",
    }
  )
);
