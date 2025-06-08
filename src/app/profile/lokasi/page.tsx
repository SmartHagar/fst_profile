/** @format */
"use client";
import { useBanner } from "@/context/BannerContext";
import React, { useEffect } from "react";

const LokasiPage = () => {
  const { setBannerConfig } = useBanner();

  useEffect(() => {
    setBannerConfig({
      type: "minimal",
      title: "Lokasi FST-UOGP",
      breadcrumbs: [
        {
          label: "Profile",
          href: "/",
        },
        {
          label: "Lokasi FST-UOGP",
        },
      ],
      show: true,
    });

    return () => {
      setBannerConfig(null);
    };
  }, [setBannerConfig]);
  return (
    <main>
      <iframe
        className="w-full"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d715.3555787347723!2d140.67009173422562!3d-2.59471227925858!2m3!1f332.6612903225808!2f28.558834225175328!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x686cf5fab51e5e33%3A0x5bbfb6ec998abf1e!2sFakultas%20Sains%20UOG%20Kotaraja!5e1!3m2!1sen!2sid!4v1616280206075!5m2!1sen!2sid"
        height="500"
        title="peta-fst"
      ></iframe>
    </main>
  );
};

export default LokasiPage;
