/** @format */

// components/jadwal/JadwalTable.tsx
"use client";

import React from "react";
import {
  Calendar,
  AlertCircle,
  Loader2,
  Clock,
  MapPin,
  User,
} from "lucide-react";
import useJadwal from "@/stores/jadwal";
import Paginate from "@/components/pagination/Paginate";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";

const JadwalTable: React.FC = () => {
  const { dataJadwal, loading, error, changePage } = useJadwal();

  const formatTime = (time: string) => {
    return time.substring(0, 5);
  };

  const getHariColor = (hari: string) => {
    const colors = {
      Senin: "text-primary font-medium",
      Selasa: "text-secondary font-medium",
      Rabu: "text-accent font-medium",
      Kamis: "text-info font-medium",
      Jumat: "text-success font-medium",
      Sabtu: "text-warning font-medium",
    };
    return colors[hari as keyof typeof colors] || "text-neutral font-medium";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <p className="text-base-content/60">Memuat data jadwal...</p>
      </div>
    );
  }

  if (error) {
    return (
      <ScrollRevealComponent animations="fade-up">
        <div className="alert alert-error shadow-lg">
          <AlertCircle className="w-6 h-6" />
          <div>
            <h3 className="font-bold">Error!</h3>
            <div className="text-xs">{error}</div>
          </div>
        </div>
      </ScrollRevealComponent>
    );
  }

  if (!dataJadwal?.data || dataJadwal.data.length === 0) {
    return (
      <ScrollRevealComponent animations="fade-up">
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 mx-auto text-base-content/30 mb-4" />
          <h3 className="text-xl font-semibold text-base-content/70 mb-2">
            Tidak ada jadwal ditemukan
          </h3>
          <p className="text-base-content/50">
            Coba ubah filter pencarian atau reset filter untuk melihat semua
            jadwal.
          </p>
        </div>
      </ScrollRevealComponent>
    );
  }

  return (
    <div data-jadwal-content className="space-y-6">
      {/* Header Info */}
      <ScrollRevealComponent offset={10} animations="fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-base-100 rounded-lg p-4 border border-base-200">
          <div>
            <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Jadwal Perkuliahan
            </h2>
            <p className="text-sm text-base-content/60 mt-1">
              Menampilkan {dataJadwal.from} - {dataJadwal.to} dari{" "}
              {dataJadwal.total} jadwal
            </p>
          </div>
        </div>
      </ScrollRevealComponent>

      {/* Table */}
      <ScrollRevealComponent offset={10} animations="fade-up" delay={100}>
        <div className="bg-base-100 rounded-lg shadow-sm border border-base-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead className="bg-base-200">
                <tr>
                  <th className="text-left">Hari/Waktu</th>
                  <th className="text-left">Mata Kuliah</th>
                  <th className="text-left">Dosen</th>
                  <th className="text-left">Ruangan</th>
                  <th className="text-left">Program Studi</th>
                  <th className="text-left">Semester/Tahun</th>
                </tr>
              </thead>
              <tbody>
                {dataJadwal.data.map((jadwal) => (
                  <tr key={jadwal.id} className="hover:bg-base-50">
                    {/* Hari/Waktu */}
                    <td>
                      <div className="space-y-1">
                        <div className={getHariColor(jadwal.hari)}>
                          {jadwal.hari}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-base-content/60">
                          <Clock className="w-3 h-3" />
                          {formatTime(jadwal.mulai)} -{" "}
                          {formatTime(jadwal.seles)}
                        </div>
                      </div>
                    </td>

                    {/* Mata Kuliah */}
                    <td>
                      <div className="space-y-1">
                        <div className="font-medium text-base-content line-clamp-2">
                          {jadwal.matkul?.nm_matkul || "N/A"}
                        </div>
                        {jadwal.matkul?.singkat && (
                          <div className="text-xs text-base-content">
                            {jadwal.matkul.kd_matkul}
                          </div>
                        )}
                        {jadwal.matkul?.sks && (
                          <div className="badge badge-outline badge-xs p-2">
                            {jadwal.matkul.sks} SKS
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Dosen */}
                    <td>
                      <div className="space-y-1">
                        <div className="flex items-start gap-1">
                          <User className="w-3 h-3 mt-0.5 text-secondary" />
                          <span className="text-sm line-clamp-2">
                            {jadwal.pegawai?.nm_pegawai || "N/A"}
                          </span>
                        </div>
                        {jadwal.pegawai_1 && (
                          <div className="flex items-start gap-1">
                            <User className="w-3 h-3 mt-0.5 text-accent" />
                            <span className="text-sm line-clamp-2">
                              {jadwal.pegawai_1.nm_pegawai}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Ruangan */}
                    <td>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-warning" />
                        <span className="text-sm">
                          {jadwal.ruangan?.nm_ruangan || "N/A"}
                        </span>
                      </div>
                    </td>

                    {/* Program Studi */}
                    <td>
                      <div className="space-y-1">
                        <div className="text-sm font-medium line-clamp-1">
                          {jadwal.prodi?.nm_prodi || "N/A"}
                        </div>
                        {/* {jadwal.prodi?.fakultas && (
                          <div className="text-xs text-base-content/60 line-clamp-1">
                            {jadwal.prodi.fakultas.nm_fakultas}
                          </div>
                        )} */}
                      </div>
                    </td>

                    {/* Semester/Tahun */}
                    <td>
                      <div className="space-y-1">
                        <div className="badge badge-sm badge-outline">
                          {jadwal.semester}
                        </div>
                        <div className="text-sm text-base-content/60">
                          {jadwal.tahun}
                        </div>
                      </div>
                    </td>

                    {/* Info */}
                    {/* <td>
                      <div className="space-y-1">
                        {jadwal.team === "1" && (
                          <div className="badge badge-warning badge-xs">
                            Team Teaching
                          </div>
                        )}
                        {jadwal.reguler && (
                          <div className="badge badge-info badge-xs">
                            {jadwal.reguler}
                          </div>
                        )}
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollRevealComponent>

      {/* Pagination */}
      {dataJadwal.last_page > 1 && (
        <ScrollRevealComponent animations="fade-up" delay={200}>
          <div className="mt-8">
            <Paginate
              current_page={dataJadwal.current_page}
              last_page={dataJadwal.last_page}
              total={dataJadwal.total}
              setPage={changePage}
              className="justify-center"
            />
          </div>
        </ScrollRevealComponent>
      )}
    </div>
  );
};

export default JadwalTable;
