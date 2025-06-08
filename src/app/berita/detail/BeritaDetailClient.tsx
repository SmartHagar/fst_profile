/** @format */

// app/berita/detail/BeritaDetailClient.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import useBerita from "@/stores/berita";
import SocialShare from "@/components/social/SocialShare";
import BeritaImage from "@/components/pages/berita/BeritaImage";
import BeritaContent from "@/components/pages/berita/BeritaContent";
import RandomBeritaSidebar from "@/components/pages/berita/RandomBeritaSidebar";
import moment from "moment";
import { User, Calendar } from "lucide-react";
import { api, BASE_URL } from "@/services/baseURL";

interface BeritaDetail {
  id: number;
  judul: string;
  isi_berita: string;
  gambar_berita: string;
  penulis: string;
  tag: string;
  tanggal: string;
}

const BeritaDetailClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [shareUrl, setShareUrl] = useState("");
  const [beritaDetail, setBeritaDetail] = useState<BeritaDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { setBerita, dataRandomBerita, setRandomBerita } = useBerita();

  // Parse parameters from URL hash or search params
  const parseUrlParams = () => {
    // Method 1: Using search params (?id=123&tag=example)
    const id = searchParams.get("id");
    const tag = searchParams.get("tag");

    if (id && tag) {
      return { id, tag };
    }

    // Method 2: Parse from hash (#fst-123/example)
    if (typeof window !== "undefined") {
      const hash = window.location.hash.slice(1); // Remove #
      const parts = hash.split("/");

      if (parts.length >= 2) {
        const idPart = parts[0];
        const tagPart = parts[1];

        // Extract ID from format like "fst-123"
        const idMatch = idPart.match(/fst-(\d+)/);
        if (idMatch) {
          return { id: idMatch[1], tag: tagPart };
        }
      }
    }

    return null;
  };

  // Fetch berita detail
  const fetchBeritaDetail = async (id: string, tag: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(`/berita/detail/${id}/${tag}`);

      if (response.data) {
        setBeritaDetail(response.data);

        // Update page title dynamically
        if (typeof window !== "undefined") {
          document.title = `${response.data.judul} - Fakultas Sains & Teknologi`;
        }
      } else {
        setError("Berita tidak ditemukan");
      }
    } catch (err) {
      console.error("Error fetching berita:", err);
      setError("Gagal memuat berita");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = parseUrlParams();

    if (!params) {
      setError("Parameter URL tidak valid");
      setLoading(false);
      return;
    }

    fetchBeritaDetail(params.id, params.tag);
  }, [searchParams]);

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[50vh]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <span>Error: {error}</span>
        </div>
        <div className="mt-4">
          <button
            onClick={() => router.push("/berita")}
            className="btn btn-primary"
          >
            Kembali ke Daftar Berita
          </button>
        </div>
      </div>
    );
  }

  if (!beritaDetail) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-warning">
          <span>Berita tidak ditemukan</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap lg:flex-nowrap gap-8">
        <motion.article
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="flex-1"
        >
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h1 className="card-title text-2xl lg:text-3xl text-center mb-6">
                {beritaDetail.judul}
              </h1>

              <div className="flex items-center justify-center gap-6 mb-6 text-sm text-base-content/70">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{beritaDetail.penulis}</span>
                </div>
                {beritaDetail.tanggal && (
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>
                      {moment(beritaDetail.tanggal).format("DD MMMM YYYY")}
                    </span>
                  </div>
                )}
              </div>

              <BeritaImage
                src={`${BASE_URL}/storage/${beritaDetail.gambar_berita}`}
                alt={beritaDetail.judul}
                priority={true}
                className="mb-6"
              />

              <SocialShare shareUrl={shareUrl} title={beritaDetail.judul} />

              <BeritaContent content={beritaDetail.isi_berita} />
            </div>
          </div>
        </motion.article>

        <aside className="w-full lg:w-80">
          <RandomBeritaSidebar dataRandomBerita={dataRandomBerita} />
        </aside>
      </div>
    </div>
  );
};

export default BeritaDetailClient;
