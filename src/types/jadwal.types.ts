/** @format */

// types/jadwal.types.ts

export interface PegawaiType {
  id: string;
  user_id: string;
  NIDN: string;
  nm_pegawai: string;
  jenkel: string;
  no_hp: string | null;
  tgl_masuk: string | null;
  img_pegawai: string | null;
  tgl_lahir: string | null;
  alamat: string | null;
  jabatan: string;
  created_at: string;
  updated_at: string;
  prodi_id: string | null;
}

export interface MatkulType {
  id: string;
  nm_matkul: string;
  singkat: string;
  sks: number;
  semester: string;
  prodi_id: string;
  created_at: string;
  updated_at: string;
  kd_matkul: string;
}

export interface RuanganType {
  id: string;
  nm_ruangan: string;
  kapasitas: number;
  created_at: string;
  updated_at: string;
}

export interface FakultasType {
  id: string;
  nm_fakultas: string;
  singkat: string;
  created_at: string;
  updated_at: string;
}

export interface ProdiType {
  id: string;
  nm_prodi: string;
  singkat: string;
  fakultas_id: string;
  created_at: string;
  updated_at: string;
  fakultas: FakultasType;
}

export interface JadwalType {
  id: string;
  prodi_id: string;
  matkul_id: string;
  pegawai_id: string;
  ruangan_id: string;
  hari: "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu";
  mulai: string;
  seles: string;
  semester: "Ganjil" | "Genap";
  tahun: string;
  created_at: string;
  updated_at: string;
  team: string;
  pegawai_id_1: string | null;
  reguler: string;
  pegawai: PegawaiType;
  pegawai_1?: PegawaiType;
  matkul: MatkulType;
  ruangan: RuanganType;
  prodi: ProdiType;
}

export interface JadwalFilters {
  search: string;
  semester: string;
  tahun: string;
  prodi_id: string;
  hari: string;
  pegawai_id: string;
  page: number;
  limit: number;
}

export interface PaginationMeta {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface JadwalResponse {
  current_page: number;
  data: JadwalType[];
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

export interface FilterOptionsType {
  tahun: string[];
  semester: string[];
  hari: string[];
  dosen: PegawaiType[];
  prodi: ProdiType[];
}

export interface JadwalApiResponse {
  type: "success" | "error";
  message: string;
  data: JadwalResponse;
}

export interface FilterOptionsApiResponse {
  type: "success" | "error";
  message: string;
  data: FilterOptionsType;
}
