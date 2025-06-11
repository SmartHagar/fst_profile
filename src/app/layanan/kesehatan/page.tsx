/** @format */
"use client";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";
import { useBanner } from "@/context/BannerContext";
import React, { useEffect } from "react";

const KesehatanPage = () => {
  const { setBannerConfig } = useBanner();

  useEffect(() => {
    setBannerConfig({
      type: "minimal",
      title: "Pelayanan Kesehatan FST-UOGP",
      show: true,
      breadcrumbs: [
        {
          label: "Beranda",
          href: "/",
        },
        {
          label: "Layanan",
        },
        {
          label: "Pelayanan Kesehatan FST-UOGP",
        },
      ],
    });

    return () => {
      setBannerConfig(null);
    };
  }, [setBannerConfig]);
  return (
    <main className="w-full font-arvo text-sm md:mx-10">
      <ScrollRevealComponent className="mb-5 mt-4 font-bold text-lg sm:text-3xl text-center">
        Kolaborasi Pelayanan Kesehatan dengan EL&apos; Homecare Jayapura
      </ScrollRevealComponent>
      <div className="min-h-screen">
        {/* Introduction Section */}
        <ScrollRevealComponent className="py-16 bg-white/[0.3]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">Tentang Kami</h2>
            <p className="text-gray-800 sm:text-lg">
              Fakultas Sains & Teknologi Universitas Ottow Geissler Papua
              berkomitmen untuk menyediakan layanan kesehatan yang mendukung
              kesejahteraan mahasiswa dan masyarakat sekitar. Kami bekerja sama
              dengan EL&apos; Homecare Jayapura untuk menyediakan layanan
              kesehatan berkualitas tinggi dalam rangka mendukung tujuan
              pendidikan dan kesehatan.
            </p>
          </div>
        </ScrollRevealComponent>

        {/* Collaboration Section */}
        <ScrollRevealComponent className="py-8 bg-white/[0.3]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">Kolaborasi Kami</h2>
            <p className="text-gray-800 sm:text-lg">
              Kami bangga mengumumkan bahwa Fakultas Sains & Teknologi
              Universitas Ottow Geissler Papua telah menjalin kerjasama dengan
              EL&apos; Homecare Jayapura untuk menyediakan layanan kesehatan
              yang melibatkan pengajaran, penelitian, dan pengembangan dalam
              bidang kesehatan. Kerjasama ini dimulai pada{" "}
              <strong>24 November 2022</strong> dan akan berlangsung hingga
              <strong>24 November 2026</strong>.
            </p>
          </div>
        </ScrollRevealComponent>

        {/* Services Section */}
        <ScrollRevealComponent className="py-16 bg-white/[0.3]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-12">
              Layanan Kesehatan Fakultas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                  Pemeriksaan Kesehatan Umum
                </h3>
                <p className="text-gray-800">
                  Kami menyediakan layanan pemeriksaan kesehatan umum yang dapat
                  diakses oleh mahasiswa dan masyarakat untuk mendukung
                  kesehatan fisik mereka.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                  Pelatihan Kesehatan dan Kewirausahaan
                </h3>
                <p className="text-gray-800">
                  Pelatihan dan seminar tentang kesehatan dan kewirausahaan,
                  termasuk pengelolaan klinik atau layanan kesehatan berbasis
                  komunitas.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                  Layanan Kesehatan Berbasis Teknologi
                </h3>
                <p className="text-gray-800">
                  Mengembangkan aplikasi atau teknologi untuk meningkatkan
                  kualitas layanan kesehatan di lingkungan universitas dan
                  sekitarnya.
                </p>
              </div>
            </div>
          </div>
        </ScrollRevealComponent>

        {/* Link to Agreement Section */}
        <ScrollRevealComponent className="py-8 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">
              Surat Perjanjian Kerjasama
            </h2>
            <p className="sm:text-lg text-gray-800">
              Untuk informasi lebih lanjut, Anda dapat melihat surat perjanjian
              kerjasama antara Fakultas Sains & Teknologi Universitas Ottow
              Geissler Papua dan EL&apos; Homecare Jayapura melalui link
              berikut:
            </p>
            <a
              href="/surat/perjanian_kesehatan.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Lihat Surat Perjanjian Kerjasama
            </a>
          </div>
        </ScrollRevealComponent>
      </div>
    </main>
  );
};

export default KesehatanPage;
