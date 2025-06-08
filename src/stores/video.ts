/** @format */

// src/stores/video.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { VideoStore } from "../types";
import { api } from "@/services/baseURL";

export const useVideo = create<VideoStore>()(
  devtools(
    (set) => ({
      dataVideo: [],

      setVideo: async (page: number = 1) => {
        try {
          const res = await api({
            method: "get",
            url: `/video`,
            params: {
              page,
            },
          });
          set((state) => ({ ...state, dataVideo: res.data.data }));
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

      setVideoUtama: async () => {
        try {
          const res = await api({
            method: "get",
            url: `/video`,
          });
          const { data } = res.data;
          const utama = data.filter((el: any) => el.status === "Utama");
          set((state) => ({ ...state, dataVideo: utama }));
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
      name: "video-store",
    }
  )
);
