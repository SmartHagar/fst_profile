/** @format */
// app/jadwal/page.tsx
"use client";

import React, { useEffect } from "react";
import useJadwal from "@/stores/jadwal";
import JadwalFilter from "@/components/pages/jadwal/JadwalFilter";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";
import JadwalTable from "@/components/pages/jadwal/JadwalTable";
import { useBanner } from "@/context/BannerContext";

const JadwalPage: React.FC = () => {
  // banner
  const { setBannerConfig } = useBanner();

  useEffect(() => {
    setBannerConfig({
      type: "minimal",
      title: "Jadwal Perkuliahan",
      show: true,
      breadcrumbs: [
        {
          label: "Beranda",
          href: "/",
        },
        {
          label: "Akademik",
        },
        {
          label: "Jadwal",
        },
      ],
    });

    return () => {
      setBannerConfig(null);
    };
  }, [setBannerConfig]);

  // store
  const { setJadwal, setFilterOptions, clearError } = useJadwal();

  useEffect(() => {
    // Initialize data when component mounts
    const initializeData = async () => {
      clearError();
      await Promise.all([setJadwal(), setFilterOptions()]);
    };

    initializeData();
  }, [setJadwal, setFilterOptions, clearError]);

  return (
    <div className="min-h-screen bg-base-200">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Filter Section */}
        <JadwalFilter />

        {/* List Section */}
        <JadwalTable />
      </div>

      {/* Footer Info */}
      <ScrollRevealComponent animations="fade-up">
        <div className="bg-base-100 border-t border-base-200 mt-12">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-sm text-base-content/60">
              <p>
                Data jadwal diperbarui secara berkala. Untuk informasi lebih
                lanjut, hubungi bagian akademik.
              </p>
            </div>
          </div>
        </div>
      </ScrollRevealComponent>
    </div>
  );
};

export default JadwalPage;
