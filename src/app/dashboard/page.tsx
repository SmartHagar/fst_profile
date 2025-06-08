/** @format */

"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ReactPlayer from "react-player";

// import PengumumanModal from "@/components/modals/PengumumanModal";

import Image from "next/image";
import { Berita } from "@/types";
import { BASE_URL } from "@/services/baseURL";
import ImagesCarousel from "@/components/carousel/Images";
import Pengumuman from "@/components/carousel/Pengumuman";
import { useVideo } from "@/stores/video";
import useBerita from "@/stores/berita";
import { MonitorSpeaker, Newspaper } from "lucide-react";

const Dashboard: React.FC = () => {
  // store
  const { setVideoUtama, dataVideo } = useVideo();
  const { setBerita, dataBerita } = useBerita();

  useEffect(() => {
    setVideoUtama();
    setBerita();
  }, [setVideoUtama, setBerita]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-4 lg:row-span-2">
          <>
            <div className="lg:row-span-2 lg:h-[36rem] h-20 lg:mt-2 lg:order-1 order-2">
              <Pengumuman />
            </div>
            <div className="lg:col-span-3 lg:order-2 order-1">
              <ImagesCarousel />
            </div>
          </>

          <div className="lg:col-span-3 lg:order-3 mt-4 order-3">
            <div className="flex gap-10 justify-center flex-wrap">
              {/* Pengumuman */}
              <div className="lg:w-1/3 lg:order-1 w-full order-2">
                <div className="card w-full mt-5 mx-auto bg-base-100 shadow-xl">
                  <div className="card-body">
                    <div className="card-title flex justify-center items-center gap-2 bg-primary text-primary-content p-3 rounded-lg">
                      <MonitorSpeaker />
                      <div className="font-comic-neue italic font-bold">
                        Kumpulan Pengumuman
                      </div>
                    </div>
                    <div className="font-comic-neue mt-2 pl-6">
                      <ul className="space-y-2">
                        <Link href="/pengumuman/4" className="hover:underline">
                          <li className="text-indigo-800 hover:underline cursor-pointer">
                            Fakultas
                          </li>
                        </Link>
                        <Link href="/pengumuman/1" className="hover:underline">
                          <li className="text-blue-800 hover:underline cursor-pointer">
                            Sistem Informasi
                          </li>
                        </Link>
                        <Link href="/pengumuman/3" className="hover:underline">
                          <li className="text-green-800 hover:underline cursor-pointer">
                            Biologi
                          </li>
                        </Link>
                        <Link href="/pengumuman/2" className="hover:underline">
                          <li className="text-orange-800 hover:underline cursor-pointer">
                            Geologi
                          </li>
                        </Link>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* <PengumumanModal /> */}
              </div>

              {/* Video */}
              <div className="lg:w-6/12 lg:order-2 w-full order-1">
                <div className="card w-full mt-5 mx-auto bg-base-100 shadow-xl">
                  <div className="card-body">
                    <div className="card-title flex justify-center items-center gap-2 bg-primary text-primary-content p-3 rounded-lg">
                      <Newspaper />
                      <div className="font-comic-neue italic font-bold">
                        Video
                      </div>
                    </div>
                    <div className="font-comic-neue h-72 w-full mt-2">
                      {dataVideo.length > 0 ? (
                        <ReactPlayer
                          url={dataVideo[0].url}
                          controls
                          width="100%"
                          height="100%"
                          title={dataVideo[0].judul}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <h1 className="text-xl">Tidak Ada Video</h1>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Berita */}
        <div className="container mx-auto w-full mt-10">
          <div className="card w-full mt-5 mx-auto bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="card-title flex justify-center items-center gap-2 bg-primary text-primary-content p-3 rounded-lg">
                <Newspaper />
                <div className="font-comic-neue italic font-bold">
                  Berita Terbaru
                </div>
              </div>
              <div className="font-comic-neue mt-2">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                  {dataBerita.data &&
                    dataBerita.data.map((newsItem: Berita) => (
                      <Link
                        key={newsItem.id}
                        href={`/berita/detail/fst-${newsItem.id}/${newsItem.tag}`}
                        className="group relative block bg-black h-80 overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300"
                      >
                        <Image
                          alt={newsItem.judul}
                          src={`${BASE_URL}/storage/${newsItem.gambar_berita}`}
                          width={500}
                          height={500}
                          className="absolute inset-0 h-full w-full object-cover opacity-75 transition ease-in-out delay-150 group-hover:opacity-50 group-hover:scale-125"
                        />
                        <div className="relative p-8">
                          <p className="text-xl font-bold text-white">
                            {newsItem.judul.substring(0, 200)}
                            {newsItem.judul.length > 150 ? "......" : ""}
                          </p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Dashboard;
