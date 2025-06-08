/** @format */
"use client";
import { useBanner } from "@/context/BannerContext";
import Image from "next/image";
import React, { useEffect } from "react";

const PimpinanFSTPage = () => {
  const { setBannerConfig } = useBanner();

  useEffect(() => {
    setBannerConfig({
      type: "minimal",
      title: "Pimpinan FST-UOGP",
      show: true,
      breadcrumbs: [
        {
          label: "Profile",
          href: "/",
        },
        {
          label: "Pimpinan FST-UOGP",
        },
      ],
    });

    return () => {
      setBannerConfig(null);
    };
  }, [setBannerConfig]);

  return (
    <main className="flex flex-col items-center gap-y-20">
      <section>
        <h2 className="mb-5 mt-2 font-bold text-2xl text-center">
          Pimpinan Fakultas
        </h2>
        <div className="flex w-full justify-center flex-col items-center gap-y-8">
          {/* dekan */}
          <div className="flex flex-col items-center">
            <Image
              src="/images/pimpinan/IbuFegie.jpeg"
              alt=""
              width={200}
              height={200}
              className="rounded-md h-72"
            />
            <div className="text-center mt-2">
              <h1 className="text-xl font-bold">Dekan</h1>
              <h2 className="font-bold">Fegie Y Wattimena,S.T.,M.Kom</h2>
            </div>
          </div>
          {/* wakil dekan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-16 ">
            <div className="flex flex-col items-center">
              <Image
                src="/images/pimpinan/IbuIra.jpeg"
                alt=""
                width={200}
                height={200}
                className="rounded-md h-64"
              />
              <div className="text-center mt-2">
                <h1 className="text-lg font-bold">Wakil Dekan I</h1>
                <h2 className=" font-bold">Iriani. Ira Bukorpioper, M. Si</h2>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <Image
                src="/images/pimpinan/IbuDikta.jpeg"
                alt=""
                width={200}
                height={200}
                className="rounded-md h-64"
              />
              <div className="text-center mt-2">
                <h1 className="text-lg font-bold">Wakil Dekan II</h1>
                <h2 className=" font-bold">Ermy Dikta Sumanik, S.Pd.,M.Li</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full font-arvo text-sm">
        <h2 className="mb-5 mt-2 font-bold text-2xl text-center">
          Pimpinan Program Studi
        </h2>
        <div className="flex w-full justify-center flex-col items-center gap-4">
          {/* wakil dekan */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
            <div className="flex flex-col items-center">
              <Image
                src="/images/pimpinan/bpk_axel.jpeg"
                alt=""
                width={200}
                height={200}
                className="rounded-md h-64"
              />
              <div className="text-center mt-2">
                <h1 className="text-lg font-bold">Prodi Sistem Informasi</h1>
                <h2 className=" font-bold">Axelon S Renyaan,S.SI.,M.T</h2>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <Image
                src="/images/pimpinan/bingkai.png"
                alt="Prodi Biologi"
                width={200}
                height={200}
                className="rounded-md h-64"
              />
              <div className="text-center mt-2">
                <h1 className="text-lg font-bold">Prodi Biologi</h1>
                <h2 className=" font-bold">Inggrid Nortalia Kailola, M. Si</h2>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <Image
                src="/images/pimpinan/PakDandy.jpeg"
                alt="Prodi Geologi"
                width={200}
                height={200}
                className="rounded-md h-64"
              />
              <div className="text-center mt-2">
                <h1 className="text-lg font-bold">Prodi Geologi</h1>
                <h2 className=" font-bold">Doodle Dandy Waromi, S.T., M.T</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PimpinanFSTPage;
