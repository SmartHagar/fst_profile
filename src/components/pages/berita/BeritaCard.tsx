/** @format */

// components/cards/BeritaCard.tsx
"use client";

import Link from "next/link";
import BeritaImage from "@/components/pages/berita/BeritaImage";
import BeritaLoading from "@/components/loading/BeritaLoading";
import { User, Calendar } from "lucide-react";
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
}

const BeritaCard = ({ dataCard, random, baseUrl }: BeritaCardProps) => {
  if (!dataCard?.data) {
    return <BeritaLoading />;
  }

  return (
    <div className="space-y-4">
      {dataCard.data.map((row, index) => {
        const { gambar_berita, judul, isi_berita, penulis, tanggal } = row;

        return (
          <div
            key={index}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div className="card-body p-4">
              <div className="flex items-start space-x-4">
                {!random && (
                  <div className="shrink-0">
                    <BeritaImage
                      src={`${baseUrl}/storage/${gambar_berita}`}
                      alt={judul}
                      className="w-40 h-32"
                      width={160}
                      height={128}
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="card-title text-base lg:text-lg line-clamp-2">
                    <Link
                      href={`/berita/detail/fst-${row.id}/${row.tag}`}
                      className="link link-hover"
                    >
                      {!random ? judul : judul.substring(0, 50) + "..."}
                    </Link>
                  </h3>

                  {!random && (
                    <div className="mt-2">
                      <div
                        className="text-sm text-base-content/70 line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: isi_berita.substring(0, 200) + "...",
                        }}
                      />
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BeritaCard;
