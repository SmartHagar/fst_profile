/** @format */

// Base API Response
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: string;
}

// Prodi (Program Studi)
export interface Prodi {
  id: number;
  kd_prodi: string;
  nm_prodi: string;
  created_at?: string;
  updated_at?: string;
}

// Kegiatan
export interface Kegiatan {
  id: number;
  nm_kegiatan: string;
  deskripsi?: string;
  created_at?: string;
  updated_at?: string;
}

// Kegiatan Detail
export interface KegiatanDetail {
  id: number;
  kegiatan_id: number;
  kegiatan: Kegiatan;
  created_at?: string;
  updated_at?: string;
}

// Slide
export interface Slide {
  id: number;
  path_gambar: string;
  kegiatan_det_id: number;
  kegiatan_det: KegiatanDetail;
  status: string;
  created_at?: string;
  updated_at?: string;
}

// Pengumuman
export interface Pengumuman {
  id: number;
  judul_pengumuman: string;
  isi_pengumuman: string;
  tgl_pengumuman: string;
  prodi_id: number;
  prodi: Prodi;
  status: string;
  created_at?: string;
  updated_at?: string;
}

// Berita
export interface Berita {
  id: number;
  judul: string;
  isi_berita: string;
  gambar_berita: string;
  tag: string;
  penulis: string;
  tgl_berita: string;
  status: string;
  views?: number;
  created_at?: string;
  updated_at?: string;
}

// Video
export interface Video {
  id: number;
  judul: string;
  url: string;
  deskripsi?: string;
  status: string;
  thumbnail?: string;
  created_at?: string;
  updated_at?: string;
}

// Menu Navigation
export interface SubMenu {
  name: string;
  href: string;
  blank?: boolean;
}

export interface MenuItem {
  name: string;
  href?: string;
  icon?: React.ReactNode;
  children?: SubMenu[];
  blank?: boolean;
}

// Store State Interfaces
export interface BeritaStore {
  dataBerita: ApiResponse<Berita[]>;
  dataRandomBerita: Berita[];
  dtShowBerita: Berita | null;
  setBerita: () => Promise<{ status: string; data?: any; error?: any }>;
  setShowBerita: (params: {
    id: string;
    tag: string;
  }) => Promise<{ status: string; data?: any; error?: any }>;
  setRandomBerita: () => Promise<{ status: string; data?: any; error?: any }>;
}

export interface PengumumanStore {
  dataPengumuman: ApiResponse<Pengumuman[]>;
  setPengumuman: () => Promise<{ status: string; data?: any; error?: any }>;
}

export interface SlideStore {
  dataSlide: Slide[];
  setSlide: () => Promise<{ status: string; data?: any; error?: any }>;
}

export interface VideoStore {
  dataVideo: Video[];
  setVideo: (
    page?: number
  ) => Promise<{ status: string; data?: any; error?: any }>;
  setVideoUtama: () => Promise<{ status: string; data?: any; error?: any }>;
}

// Dashboard Context
export interface DashboardContextType {
  dataSlide: Slide[];
  dataPengumuman: ApiResponse<Pengumuman[]>;
  setOpen: (open: boolean) => void;
  open: boolean;
  setRow: (row: Pengumuman | object) => void;
  row: Pengumuman | object;
}
