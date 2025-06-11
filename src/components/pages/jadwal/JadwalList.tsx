/** @format */

// components/jadwal/JadwalList.tsx
"use client";

import React from "react";
import { Calendar, AlertCircle, Loader2 } from "lucide-react";
import useJadwal from "@/stores/jadwal";
import JadwalCard from "./JadwalCard";
import Paginate from "@/components/pagination/Paginate";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";

const JadwalList: React.FC = () => {
  const { dataJadwal, loading, error, changePage } = useJadwal();

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
      <ScrollRevealComponent animations="fade-up">
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

          {/* Quick Stats */}
          <div className="flex gap-4">
            <div className="stat-mini">
              <div className="text-xs text-base-content/60">Total Jadwal</div>
              <div className="text-lg font-bold text-primary">
                {dataJadwal.total}
              </div>
            </div>
            <div className="stat-mini">
              <div className="text-xs text-base-content/60">Halaman</div>
              <div className="text-lg font-bold text-secondary">
                {dataJadwal.current_page} / {dataJadwal.last_page}
              </div>
            </div>
          </div>
        </div>
      </ScrollRevealComponent>

      {/* Jadwal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dataJadwal.data.map((jadwal, index) => (
          <JadwalCard key={jadwal.id} jadwal={jadwal} index={index} />
        ))}
      </div>

      {/* Pagination */}
      {dataJadwal.last_page > 1 && (
        <ScrollRevealComponent animations="fade-up" delay={200}>
          <div className="mt-8">
            <Paginate
              responses={{ data: { meta: dataJadwal } }}
              setPage={changePage}
              className="justify-center"
            />
          </div>
        </ScrollRevealComponent>
      )}
    </div>
  );
};

export default JadwalList;
