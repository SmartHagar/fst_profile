/** @format */

// components/jadwal/JadwalCard.tsx
"use client";

import React from "react";
import { Clock, MapPin, User, BookOpen, GraduationCap } from "lucide-react";
import { JadwalType } from "@/types/jadwal.types";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";

interface JadwalCardProps {
  jadwal: JadwalType;
  index: number;
}

const JadwalCard: React.FC<JadwalCardProps> = ({ jadwal, index }) => {
  const formatTime = (time: string) => {
    return time.substring(0, 5); // Remove seconds
  };

  const getHariColor = (hari: string) => {
    const colors = {
      Senin: "badge-primary",
      Selasa: "badge-secondary",
      Rabu: "badge-accent",
      Kamis: "badge-info",
      Jumat: "badge-success",
      Sabtu: "badge-warning",
    };
    return colors[hari as keyof typeof colors] || "badge-neutral";
  };

  const getSemesterColor = (semester: string) => {
    return semester === "Ganjil" ? "badge-error" : "badge-success";
  };

  return (
    <ScrollRevealComponent
      animations="fade-up"
      delay={index * 50}
      className="h-full"
    >
      <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-base-200 h-full">
        <div className="card-body p-4">
          {/* Header with Hari and Semester */}
          <div className="flex justify-between items-start mb-3">
            <div
              className={`badge ${getHariColor(
                jadwal.hari
              )} text-white font-medium`}
            >
              {jadwal.hari}
            </div>
            <div
              className={`badge ${getSemesterColor(
                jadwal.semester
              )} text-white`}
            >
              {jadwal.semester} {jadwal.tahun}
            </div>
          </div>

          {/* Mata Kuliah */}
          <div className="mb-3">
            <h3 className="font-bold text-lg text-base-content line-clamp-2">
              {jadwal.matkul?.nm_matkul || "Mata Kuliah Tidak Tersedia"}
            </h3>
            {jadwal.matkul?.singkat && (
              <p className="text-sm text-base-content/60 font-medium">
                {jadwal.matkul.singkat}
              </p>
            )}
          </div>

          {/* Time */}
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">
              {formatTime(jadwal.mulai)} - {formatTime(jadwal.seles)}
            </span>
          </div>

          {/* Dosen */}
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-secondary" />
            <span className="text-sm line-clamp-1">
              {jadwal.pegawai?.nm_pegawai || "Dosen Tidak Tersedia"}
            </span>
          </div>

          {/* Team Teaching (if exists) */}
          {jadwal.pegawai_1 && (
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-accent" />
              <span className="text-sm line-clamp-1">
                {jadwal.pegawai_1.nm_pegawai}
              </span>
            </div>
          )}

          {/* Ruangan */}
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-warning" />
            <span className="text-sm">
              {jadwal.ruangan?.nm_ruangan || "Ruangan Tidak Tersedia"}
            </span>
          </div>

          {/* Program Studi */}
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="w-4 h-4 text-info" />
            <span className="text-sm line-clamp-1">
              {jadwal.prodi?.nm_prodi || "Program Studi Tidak Tersedia"}
            </span>
          </div>

          {/* SKS and Additional Info */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {jadwal.matkul?.sks && (
              <div className="badge badge-outline badge-sm">
                <BookOpen className="w-3 h-3 mr-1" />
                {jadwal.matkul.sks} SKS
              </div>
            )}
            {jadwal.reguler && (
              <div className="badge badge-outline badge-sm">
                {jadwal.reguler}
              </div>
            )}
            {jadwal.team === "1" && (
              <div className="badge badge-warning badge-sm">Team Teaching</div>
            )}
          </div>

          {/* Fakultas */}
          {jadwal.prodi?.fakultas && (
            <div className="text-xs text-base-content/50 mt-2">
              {jadwal.prodi.fakultas.nm_fakultas}
            </div>
          )}
        </div>
      </div>
    </ScrollRevealComponent>
  );
};

export default JadwalCard;
