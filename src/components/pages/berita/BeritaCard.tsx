/** @format */

// components/pages/berita/BeritaCard.tsx
"use client";

import Link from "next/link";
import BeritaImage from "@/components/pages/berita/BeritaImage";
import BeritaLoading from "@/components/loading/BeritaLoading";
import { User, Calendar, Clock } from "lucide-react";
import moment from "moment";
import "moment/locale/id";

moment.locale("id");

interface BeritaData {
  id: number;
  gambar_berita: string;
  judul: string;
  isi_berita: string;
  penulis: string;
  tag: string;
  tanggal?: string;
}

interface BeritaCardProps {
  dataCard: {
    data?: BeritaData[];
  };
  random: boolean;
  baseUrl?: string;
  viewMode?: "list" | "grid";
}

const BeritaCard = ({
  dataCard,
  random,
  baseUrl,
  viewMode = "list",
}: BeritaCardProps) => {
  if (!dataCard?.data) {
    return <BeritaLoading viewMode={viewMode} />;
  }

  // Helper function to create static-friendly URLs
  const createBeritaUrl = (row: BeritaData) => {
    return `/berita/detail?id=${row.id}&tag=${row.tag}`;
  };

  // Helper function to strip HTML and limit text
  const getPreviewText = (html: string, limit: number) => {
    const text = html.replace(/<[^>]*>?/gm, "");
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  // List View Component
  const ListView = () => (
    <div className="space-y-4">
      {dataCard.data!.map((row, index) => {
        const { gambar_berita, judul, isi_berita, penulis, tanggal } = row;

        return (
          <div
            key={index}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="card-body p-4">
              <div className="flex items-start space-x-4">
                {!random && (
                  <div className="shrink-0">
                    <BeritaImage
                      src={`${baseUrl}/storage/${gambar_berita}`}
                      alt={judul}
                      className="w-40 h-32 rounded-lg"
                      width={160}
                      height={128}
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="card-title text-base lg:text-lg line-clamp-2 mb-2">
                    <Link
                      href={createBeritaUrl(row)}
                      className="link link-hover"
                    >
                      {!random ? judul : judul.substring(0, 50) + "..."}
                    </Link>
                  </h3>

                  {!random && (
                    <div className="mt-2">
                      <p className="text-sm text-base-content/70 line-clamp-3">
                        {getPreviewText(isi_berita, 200)}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-3 text-xs text-base-content/60">
                    <div className="flex items-center gap-1">
                      <User size={12} />
                      <span>{penulis}</span>
                    </div>
                    {tanggal && (
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{moment(tanggal).format("DD MMM YYYY")}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{moment(tanggal).fromNow()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // Grid View Component
  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dataCard.data!.map((row, index) => {
        const { gambar_berita, judul, isi_berita, penulis, tanggal } = row;

        return (
          <div
            key={index}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <figure className="relative overflow-hidden">
              <BeritaImage
                src={`${baseUrl}/storage/${gambar_berita}`}
                alt={judul}
                className="w-full h-48 object-cover"
                width={300}
                height={192}
              />
              <div className="absolute top-2 right-2">
                <div className="badge badge-primary badge-sm">{row.tag}</div>
              </div>
            </figure>

            <div className="card-body p-4">
              <h3 className="card-title text-sm lg:text-base line-clamp-2 min-h-[2.5rem]">
                <Link href={createBeritaUrl(row)} className="link link-hover">
                  {judul}
                </Link>
              </h3>

              <p className="text-xs text-base-content/70 line-clamp-2 mt-2">
                {getPreviewText(isi_berita, 100)}
              </p>

              <div className="card-actions justify-between items-center mt-4">
                <div className="flex flex-col gap-1 text-xs text-base-content/60">
                  <div className="flex items-center gap-1">
                    <User size={10} />
                    <span className="truncate">{penulis}</span>
                  </div>
                  {tanggal && (
                    <div className="flex items-center gap-1">
                      <Calendar size={10} />
                      <span>{moment(tanggal).format("DD MMM")}</span>
                    </div>
                  )}
                </div>

                <Link
                  href={createBeritaUrl(row)}
                  className="btn btn-primary btn-xs"
                >
                  Baca
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // Return appropriate view based on viewMode
  if (viewMode === "grid") {
    return <GridView />;
  }

  return <ListView />;
};

export default BeritaCard;
