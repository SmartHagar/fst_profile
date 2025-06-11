/** @format */

// types/mahasiswa.types.ts
export interface FakultasType {
  id: number;
  nm_fakultas: string;
  singkat: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProdiType {
  id: number;
  fakultas_id: string;
  kode: string;
  nm_prodi: string;
  singkat: string;
  created_at?: string;
  updated_at?: string;
  fakultas?: FakultasType;
}

export interface StatusMhsType {
  id: number;
  mhs_id: string;
  status: string;
  keterangan?: string;
  tanggal?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MahasiswaType {
  id: string;
  prodi_id: string;
  NPM: string;
  nm_mhs: string;
  jenkel: "Laki-laki" | "Perempuan";
  thn_angkatan: number;
  status: "aktif" | "tidak aktif" | "lulus";
  img_mhs?: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
  prodi?: ProdiType;
  statusMhs?: StatusMhsType;
}

export interface PaginationMeta {
  current_page: number;
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

export interface MahasiswaResponse extends PaginationMeta {
  data: MahasiswaType[];
}

export interface ApiWrapperResponse<T> {
  type: "success" | "error";
  message: string;
  data: T;
}

// Use type alias instead of empty interface
export type MahasiswaApiResponse = ApiWrapperResponse<MahasiswaResponse>;

export interface MahasiswaFilters {
  search: string;
  status: "all" | "active" | "inactive" | "lulus";
  prodi_id: string;
  thn_angkatan: string;
  jenkel: "all" | "Laki-laki" | "Perempuan";
  sort_by:
    | "nm_mhs"
    | "NPM"
    | "thn_angkatan"
    | "prodi"
    | "created_at"
    | "status";
  sort_order: "asc" | "desc";
  limit: number;
  page: number;
}

export interface FilterOptionsType {
  tahun_angkatan: number[];
  prodi: ProdiType[];
  statistics: {
    total: number;
    aktif: number;
    tidak_aktif: number;
    lulus: number;
  };
}

export interface StatisticsType {
  total: number;
  by_prodi: Record<
    string,
    {
      total: number;
      aktif: number;
      tidak_aktif: number;
      lulus: number;
    }
  >;
  by_angkatan: Record<
    string,
    {
      total: number;
      aktif: number;
    }
  >;
  by_jenkel: Record<string, number>;
}

export interface KontrakDetType {
  id: number;
  kontrak_id: number;
  jadwal_id: number;
  jadwal?: {
    id: number;
    matkul_id: number;
    matkul?: {
      id: number;
      kd_matkul: string;
      nm_matkul: string;
      sks: number;
    };
  };
}

export interface KontrakType {
  id: number;
  mhs_id: string;
  semester: number;
  tahun: number;
  created_at: string;
  updated_at: string;
}

export interface MahasiswaKontrakType extends MahasiswaType {
  kontrakDet?: KontrakDetType[];
}
