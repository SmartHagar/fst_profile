/** @format */

// Base API Response
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: string;
}

// Prodi (Program Studi)
export interface ProdiType {
  id: number;
  kd_prodi: string;
  nm_prodi: string;
  created_at?: string;
  updated_at?: string;
}

// Kegiatan
export interface KegiatanType {
  id: number;
  nm_kegiatan: string;
  deskripsi?: string;
  created_at?: string;
  updated_at?: string;
}

// Kegiatan Detail
export interface KegiatanDetailType {
  id: number;
  kegiatan_id: number;
  kegiatan: KegiatanType;
  created_at?: string;
  updated_at?: string;
}

// Slide
export interface SlideType {
  id: number;
  path_gambar: string;
  kegiatan_det_id: number;
  kegiatan_det: KegiatanDetailType;
  status: string;
  created_at?: string;
  updated_at?: string;
}

// Pengumuman
export interface PengumumanType {
  id: number;
  judul_pengumuman: string;
  isi_pengumuman: string;
  tgl_pengumuman: string;
  prodi_id: number | string;
  prodi: ProdiType;
  status: string;
  created_at?: string;
  updated_at?: string;
}

// Berita
export interface BeritaType {
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
export interface VideoType {
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
  dataBerita: ApiResponse<BeritaType[]>;
  dataRandomBerita: BeritaType[];
  dtShowBerita: BeritaType | null;
  setBerita: () => Promise<{ status: string; data?: any; error?: any }>;
  setShowBerita: (params: {
    id: string;
    tag: string;
  }) => Promise<{ status: string; data?: any; error?: any }>;
  setRandomBerita: () => Promise<{ status: string; data?: any; error?: any }>;
}

export interface PengumumanStore {
  dataPengumuman: ApiResponse<PengumumanType[]>;
  setPengumuman: () => Promise<{ status: string; data?: any; error?: any }>;
}

export interface SlideStore {
  dataSlide: SlideType[];
  setSlide: () => Promise<{ status: string; data?: any; error?: any }>;
}

export interface VideoStore {
  dataVideo: VideoType[];
  setVideo: (
    page?: number
  ) => Promise<{ status: string; data?: any; error?: any }>;
  setVideoUtama: () => Promise<{ status: string; data?: any; error?: any }>;
}

// Dashboard Context
export interface DashboardContextType {
  dataSlide: SlideType[];
  dataPengumuman: ApiResponse<PengumumanType[]>;
  setOpen: (open: boolean) => void;
  open: boolean;
  setRow: (row: PengumumanType | object) => void;
  row: PengumumanType | object;
}

export interface DokumenType {
  id: number;
  jenis_id: string;
  nama: string;
  file: string;
  created_at: string;
  updated_at: string;
  prodi_id: string;
  jenis_dokumen: {
    id: number;
    nama: string;
    created_at: string;
    updated_at: string;
  };
  prodi: {
    id: number;
    kd_prodi: string;
    nm_prodi: string;
    created_at: string;
    updated_at: string;
  };
}

export interface DokumenResponse {
  current_page: number;
  data: DokumenType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface GroupedSurvei {
  [prodiName: string]: DokumenType[];
}
