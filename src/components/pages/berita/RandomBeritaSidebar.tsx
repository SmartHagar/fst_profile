/** @format */

// components/pages/berita/RandomBeritaSidebar.tsx
"use client";

import Link from "next/link";
import BeritaImage from "./BeritaImage";
import moment from "moment";
import { BASE_URL } from "@/services/baseURL";

interface RandomBeritaData {
  id: number;
  gambar_berita: string;
  judul: string;
  penulis: string;
  tag: string;
  tanggal?: string;
}

interface RandomBeritaSidebarProps {
  dataRandomBerita: {
    data?: RandomBeritaData[];
  };
}

const RandomBeritaSidebar = ({
  dataRandomBerita,
}: RandomBeritaSidebarProps) => {
  if (!dataRandomBerita?.data) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Berita Lainnya</h2>
          <div className="flex justify-center py-4">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        </div>
      </div>
    );
  }

  const createBeritaUrl = (row: RandomBeritaData) => {
    return `/berita/detail?id=${row.id}&tag=${row.tag}`;
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title mb-4">Berita Lainnya</h2>
        <div className="space-y-4">
          {dataRandomBerita.data.slice(0, 5).map((row, index) => (
            <div
              key={index}
              className="border-b border-base-200 pb-4 last:border-b-0"
            >
              <div className="flex gap-3">
                <div className="shrink-0">
                  <BeritaImage
                    src={`${BASE_URL}/storage/${row.gambar_berita}`}
                    alt={row.judul}
                    className="w-16 h-12"
                    width={64}
                    height={48}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium line-clamp-2 mb-1">
                    <Link
                      href={createBeritaUrl(row)}
                      className="link link-hover"
                    >
                      {row.judul.substring(0, 60)}...
                    </Link>
                  </h3>
                  <div className="text-xs text-base-content/60">
                    {row.tanggal && (
                      <span>{moment(row.tanggal).format("DD MMM YYYY")}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RandomBeritaSidebar;
