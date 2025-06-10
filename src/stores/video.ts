/** @format */

// stores/video.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";

export interface VideoData {
  id: number;
  judul: string;
  url: string;
  deskripsi?: string;
  created_at?: string;
  updated_at?: string;
}

interface VideoResponse {
  data: VideoData[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
}

interface VideoState {
  dataVideo: { data?: VideoResponse };
  dtShowVideo: VideoData | null;
  dataVideoUtama: VideoData[];
  loading: boolean;
  error: string | null;
  currentPage: number;

  setVideo: (page?: number) => Promise<any>;
  setVideoUtama: (page?: number) => Promise<any>;
  setShowVideo: (id: number) => Promise<any>;
  clearError: () => void;
}

const useVideo = create<VideoState>()(
  devtools(
    (set) => ({
      dataVideo: {},
      dtShowVideo: null,
      dataVideoUtama: [],
      loading: false,
      error: null,
      currentPage: 1,

      clearError: () => set({ error: null }),

      setVideo: async (page = 1) => {
        set({ loading: true, error: null, currentPage: page });
        try {
          const res = await api.get(`/video?page=${page}`);
          set({
            dataVideo: res.data,
            loading: false,
          });
          return { status: "berhasil", data: res.data };
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ error: errorMessage, loading: false });
          return { status: "error", error: errorMessage };
        }
      },

      setShowVideo: async (id: number) => {
        set({ loading: true, error: null });
        try {
          const res = await api.get(`/video/detail/${id}`);
          set({ dtShowVideo: res.data, loading: false });
          return { status: "berhasil", data: res.data };
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ error: errorMessage, loading: false });
          return { status: "error", error: errorMessage };
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
          set((state) => ({ ...state, dataVideoUtama: utama }));
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
    { name: "video-store" }
  )
);

export default useVideo;
