/** @format */

// pages/survei/page.tsx
"use client";
import { useBanner } from "@/context/BannerContext";
import useDokumen from "@/stores/dokumen";
import React, { useEffect } from "react";
import SurveiGrid from "@/components/pages/survei/SurveiGrid";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";
import { ClipboardCheck, Info } from "lucide-react";
import { DokumenType } from "@/types";

const SurveiPage = () => {
  const { setBannerConfig } = useBanner();

  useEffect(() => {
    setBannerConfig({
      type: "minimal",
      title: "Layanan Survei Kepuasan",
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
          label: "Layanan Survei Kepuasan",
        },
      ],
    });

    return () => {
      setBannerConfig(null);
    };
  }, [setBannerConfig]);

  // Store
  const { setDokumen, dataDokumen, loading } = useDokumen();

  useEffect(() => {
    setDokumen({
      limit: 100,
      jenis_id: 8,
    });
  }, [setDokumen]);

  const dokumenList = dataDokumen?.data || [];

  return (
    <main className="flex flex-col gap-10">
      {/* Introduction Section */}
      <ScrollRevealComponent animations="fade-up">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Tentang Survei Kepuasan
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Halaman ini menyediakan akses kepada dokumen-dokumen laporan
                survei terhadap layanan universitas. Dokumen dikelompokkan
                berdasarkan program studi untuk memudahkan pencarian dan akses
                informasi yang relevan.
              </p>
            </div>
          </div>
        </div>
      </ScrollRevealComponent>

      {/* Info Alert */}
      <ScrollRevealComponent animations="fade-up" delay={100}>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <strong>Informasi:</strong> Semua dokumen survei tersedia dalam
              format PDF dan dapat diunduh untuk referensi lebih lanjut. Data
              survei diperbarui secara berkala.
            </div>
          </div>
        </div>
      </ScrollRevealComponent>

      {/* Main Content */}
      <SurveiGrid
        dokumenList={dokumenList as DokumenType[]}
        loading={loading}
      />

      {/* Footer Info */}
      {!loading && (dokumenList as any).length > 0 && (
        <ScrollRevealComponent animations="fade-up">
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-sm text-gray-600">
              Untuk informasi lebih lanjut mengenai survei kepuasan atau
              memiliki pertanyaan, silakan hubungi bagian akademik universitas.
            </p>
          </div>
        </ScrollRevealComponent>
      )}
    </main>
  );
};

export default SurveiPage;
