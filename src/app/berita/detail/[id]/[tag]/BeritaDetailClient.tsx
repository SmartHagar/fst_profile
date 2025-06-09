/** @format */

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useBerita from "@/stores/berita";
import SocialShare from "@/components/social/SocialShare";
import BeritaImage from "@/components/pages/berita/BeritaImage";
import BeritaContent from "@/components/pages/berita/BeritaContent";
import RandomBeritaSidebar from "@/components/pages/berita/RandomBeritaSidebar";
import moment from "moment";
import { User, Calendar, ArrowLeft, Tag } from "lucide-react";
import { BASE_URL } from "@/services/baseURL";
import Link from "next/link";

interface BeritaDetail {
  id: number;
  judul: string;
  isi_berita: string;
  gambar_berita: string;
  penulis: string;
  tag: string;
  tgl_terbit: string;
}

interface BeritaDetailClientProps {
  params: {
    id: string;
    tag: string;
  };
  staticData: BeritaDetail;
}

const BeritaDetailClient = ({ staticData }: BeritaDetailClientProps) => {
  const [shareUrl, setShareUrl] = useState("");
  const [beritaDetail] = useState<BeritaDetail>(staticData);

  const { setBerita, dataRandomBerita, setRandomBerita } = useBerita();

  useEffect(() => {
    setBerita();
    setRandomBerita();
  }, [setBerita, setRandomBerita]);

  // Set URLs for sharing
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  // JSON-LD structured data untuk SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: beritaDetail.judul,
    image: [`${BASE_URL}/storage/${beritaDetail.gambar_berita}`],
    datePublished: beritaDetail.tgl_terbit,
    dateModified: beritaDetail.tgl_terbit,
    author: {
      "@type": "Person",
      name: beritaDetail.penulis,
    },
    publisher: {
      "@type": "Organization",
      name: "Fakultas Sains & Teknologi",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/uogp.png`, // Sesuaikan dengan logo
      },
    },
    description: beritaDetail.isi_berita
      .replace(/<[^>]*>?/gm, "")
      .substring(0, 160),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": shareUrl,
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap lg:flex-nowrap gap-8">
          <motion.article
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="flex-1"
          >
            {/* Back Button */}
            <div className="mb-6">
              <Link href="/berita" className="btn btn-ghost btn-sm gap-2">
                <ArrowLeft size={16} />
                Kembali ke Berita
              </Link>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                {/* Tag */}
                <div className="flex justify-start mb-4">
                  <div className="badge badge-primary gap-2">
                    <Tag size={12} />
                    {beritaDetail.tag}
                  </div>
                </div>

                {/* Title */}
                <h1 className="card-title text-2xl lg:text-3xl text-center mb-6 leading-tight">
                  {beritaDetail.judul}
                </h1>

                {/* Meta Info */}
                <div className="flex items-center justify-center gap-6 mb-6 text-sm text-base-content/70 flex-wrap">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span className="font-medium">{beritaDetail.penulis}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>
                      {moment(beritaDetail.tgl_terbit).format("DD MMMM YYYY")}
                    </span>
                  </div>
                  <div className="text-xs opacity-60">
                    {moment(beritaDetail.tgl_terbit).fromNow()}
                  </div>
                </div>

                {/* Featured Image */}
                <BeritaImage
                  src={`${BASE_URL}/storage/${beritaDetail.gambar_berita}`}
                  alt={beritaDetail.judul}
                  priority={true}
                  className="mb-6 rounded-lg"
                  width={800}
                  height={400}
                />

                {/* Social Share */}
                <SocialShare
                  shareUrl={shareUrl}
                  title={beritaDetail.judul}
                  description={beritaDetail.isi_berita
                    .replace(/<[^>]*>?/gm, "")
                    .substring(0, 100)}
                />

                {/* Content */}
                <div className="divider"></div>
                <BeritaContent content={beritaDetail.isi_berita} />

                {/* Tags Footer */}
                <div className="divider"></div>
                <div className="flex items-center gap-2 mt-6">
                  <span className="text-sm font-medium">Tags:</span>
                  <div className="badge badge-outline">{beritaDetail.tag}</div>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Sidebar */}
          <aside className="w-full lg:w-80">
            <RandomBeritaSidebar dataRandomBerita={dataRandomBerita} />
          </aside>
        </div>
      </div>
    </>
  );
};

export default BeritaDetailClient;
