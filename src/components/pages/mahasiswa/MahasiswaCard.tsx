/** @format */

// components/mahasiswa/MahasiswaCard.tsx
import React from "react";
import { MahasiswaType } from "@/types/mahasiswa.types";
import {
  User,
  Calendar,
  GraduationCap,
  MapPin,
  CheckCircle,
  XCircle,
  Medal,
} from "lucide-react";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";
import Image from "next/image";
import { BASE_URL_SIAKAD } from "@/services/baseURL";

interface MahasiswaCardProps {
  mahasiswa: MahasiswaType;
  index: number;
  onClick?: (mahasiswa: MahasiswaType) => void;
}

const MahasiswaCard: React.FC<MahasiswaCardProps> = ({
  mahasiswa,
  index,
  onClick,
}) => {
  const getStatusConfig = (mahasiswa: MahasiswaType) => {
    // Check if mahasiswa has statusMhs (meaning inactive)
    if (mahasiswa.statusMhs) {
      return {
        label: "Tidak Aktif",
        color: "bg-red-100 text-red-800",
        icon: XCircle,
      };
    }

    // Check status field
    switch (mahasiswa.status) {
      case "lulus":
        return {
          label: "Lulus",
          color: "bg-blue-100 text-blue-800",
          icon: Medal,
        };
      case "aktif":
        return {
          label: "Aktif",
          color: "bg-green-100 text-green-800",
          icon: CheckCircle,
        };
      case "tidak aktif":
        return {
          label: "Tidak Aktif",
          color: "bg-red-100 text-red-800",
          icon: XCircle,
        };
      default:
        return {
          label: "Aktif",
          color: "bg-green-100 text-green-800",
          icon: CheckCircle,
        };
    }
  };

  const getJenkelConfig = (jenkel: "Laki-laki" | "Perempuan") => {
    return jenkel === "Laki-laki"
      ? { label: "Laki-laki", color: "bg-blue-50 text-blue-700", icon: "👨" }
      : { label: "Perempuan", color: "bg-pink-50 text-pink-700", icon: "👩" };
  };

  const getImageUrl = (imgPath?: string | null) => {
    if (!imgPath) return null;
    return imgPath.startsWith("http")
      ? imgPath
      : `${BASE_URL_SIAKAD}/storage/${imgPath}`;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const statusConfig = getStatusConfig(mahasiswa);
  const jenkelConfig = getJenkelConfig(mahasiswa.jenkel);
  const StatusIcon = statusConfig.icon;
  const imageUrl = getImageUrl(mahasiswa.img_mhs);

  return (
    <ScrollRevealComponent
      offset={10}
      animations="fade-up"
      delay={index * 50}
      className="h-full"
    >
      <div
        className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 h-full flex flex-col ${
          onClick ? "cursor-pointer hover:border-blue-300" : ""
        }`}
        onClick={() => onClick?.(mahasiswa)}
      >
        {/* Header with Photo */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-start gap-3">
            {/* Profile Photo */}
            <div className="flex-shrink-0 relative">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={mahasiswa.nm_mhs}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling?.classList.remove(
                      "hidden"
                    );
                  }}
                />
              ) : null}
              <div
                className={`w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                  imageUrl ? "hidden" : ""
                }`}
              >
                {getInitials(mahasiswa.nm_mhs)}
              </div>

              {/* Gender Icon */}
              <div className="absolute -bottom-1 -right-1 text-xs">
                {jenkelConfig.icon}
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 leading-tight">
                {mahasiswa.nm_mhs}
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                NPM: {mahasiswa.npm_full}
              </p>

              {/* Status Badge */}
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
                >
                  <StatusIcon className="w-3 h-3" />
                  {statusConfig.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="space-y-3 flex-1">
            {/* Program Studi */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <GraduationCap className="w-4 h-4 flex-shrink-0" />
              <div className="min-w-0">
                <div className="font-medium text-gray-900 text-xs">
                  {mahasiswa.prodi?.nm_prodi || "Prodi tidak tersedia"}
                </div>
                {mahasiswa.prodi?.kode && (
                  <div className="text-xs text-gray-500">
                    Kode: {mahasiswa.prodi.kode} ({mahasiswa.prodi.singkat})
                  </div>
                )}
              </div>
            </div>

            {/* Fakultas */}
            {mahasiswa.prodi?.fakultas && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-medium text-gray-700">
                    {mahasiswa.prodi.fakultas.nm_fakultas}
                  </div>
                  <div className="text-xs text-gray-500">
                    ({mahasiswa.prodi.fakultas.singkat})
                  </div>
                </div>
              </div>
            )}

            {/* Tahun Angkatan */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <div className="text-xs">
                <span className="font-medium">
                  Angkatan {mahasiswa.thn_angkatan}
                </span>
                <div className="text-gray-500">
                  {new Date().getFullYear() - mahasiswa.thn_angkatan} tahun
                </div>
              </div>
            </div>

            {/* Jenis Kelamin */}
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 flex-shrink-0 text-gray-600" />
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${jenkelConfig.color}`}
              >
                {jenkelConfig.label}
              </span>
            </div>
          </div>

          {/* Additional Status Info */}
          {mahasiswa.statusMhs && (
            <div className="pt-3 border-t border-gray-100 mt-3">
              <div className="text-xs text-gray-600">
                <span className="font-medium">Detail Status: </span>
                <span className="text-red-600">
                  {mahasiswa.statusMhs.status}
                </span>
                {mahasiswa.statusMhs.keterangan && (
                  <div className="mt-1 text-red-600 italic">
                    &quot;{mahasiswa.statusMhs.keterangan}&quot;
                  </div>
                )}
                {mahasiswa.statusMhs.tanggal && (
                  <div className="mt-1 text-gray-500">
                    Sejak:{" "}
                    {new Date(mahasiswa.statusMhs.tanggal).toLocaleDateString(
                      "id-ID"
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 pb-4">
          <div className="text-xs text-gray-500 text-center">
            Terdaftar:{" "}
            {new Date(mahasiswa.created_at).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </ScrollRevealComponent>
  );
};

export default MahasiswaCard;
