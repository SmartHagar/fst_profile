/** @format */
"use client";
import React, { useEffect } from "react";
import { useBanner } from "@/context/BannerContext";

const SejarahPage = () => {
  const { setBannerConfig } = useBanner();

  useEffect(() => {
    // Set banner config untuk halaman ini
    setBannerConfig({
      type: "minimal",
      title: "Sejarah dan Visi Misi",
      breadcrumbs: [
        {
          label: "Profile",
          href: "/",
        },
        {
          label: "Sejarah dan Visi Misi",
        },
      ],
      show: true,
    });

    // Cleanup saat component unmount
    return () => {
      setBannerConfig(null);
    };
  }, [setBannerConfig]);
  return (
    <main className="flex flex-col gap-10">
      {/* sejarah */}
      <section>
        <h2 className="mb-5 mt-2 font-bold text-2xl">
          Sejarah Fakultas Sains & Teknologi
        </h2>
        <p className="text-justify leading-6">
          Sebagai suatu Perguruan Tinggi Kristen Nasional, maka perancangan dan
          penyelenggaraan organisasi dan manajemen FST UOG Papua selalu mengacu
          kepada peraturan perundangan dan yang berlaku serta kebijakan GKI Di
          Tanah Papua, Yayasan Ottow Geissler (YOG) Di Tanah Papua, dan
          Universitas Ottow Geissler (UOG) Papua. Sejak berdirinya UOG Papua
          sebagai hasil perubahan bentuk dari STIE Ottow & Geissler Jayapura,
          maka FST selalu menghadapi lingkungan eksternal yang terus menerus
          berubah, yang menimbulkan peluang-peluang dan ancaman-ancaman. Agar
          FST UOG Papua tetap eksis, bertumbuh, dan bahkan berkembang untuk
          mewujudkan Visi, Misi, dan Tujuannya, maka harus dilakukan perubahan
          internal yang sesuai (match) dan bersifat adaptif terhadap desakan
          perubahan eksternal dan internal, terutama perubahan aturan pemerintah
          yang relevan dengan bidang pendidikan tinggi secara nasional dan lokal
          (daerah) untuk memenuhi kebutuhan dunia kerja.
        </p>
        <p className="text-justify mt-2 leading-6">
          Fakultas Sains dan Teknologi (FST) Universitas Ottow Geissler Papua
          (UOGP) berdiri tanggal 23 maret 2011 berdasarkan keputusan Dirjen
          DIKTI Nomor. 52/E/O/2011. Latar belakang utama berdirinya FST UOGP
          adalah sebagai bentuk partisipasi UOGP serta mencerdaskan kehidupan
          rakyat dan bangsa. Selain itu sebagai respon UOGP terhadap
          perkembangan dunia ilmu pengetahuan dan teknologi yang sangat pesat
          dengan tetap mengutamakan nilai-nillai kekristenan dalam segala bentuk
          kegiataanya.
        </p>
      </section>
      {/* visimisi */}
      <section>
        <h2 className="mb-5 mt-2 font-bold text-2xl">
          Visi Misi Fakultas Sains & Teknologi
        </h2>
        <h2 className="text-center mb-3 mt-2 font-bold text-xl">Visi</h2>
        <p className="text-justify leading-6 text-lg">
          “Menjadi Fakultas yang andal dan berintegras di bidang Bidang Sains &
          Teknologi dalam mewujudkan kualitas Sumber Daya Manusia yang unggul
          dan berkarakter Kristen”.
        </p>
        <h2 className="text-center mb-3 mt-8 font-bold text-xl">Misi</h2>
        <div className="text-justify leading-6">
          <ol className="list-decimal text-lg">
            <li className="mb-2">
              Menyelenggarakan pendidikan dan pengajaran yang bermutu untuk
              menghasilkan SDM yang handal, kompetitif dan beriman di bidang
              keilmuan (sains) dan teknologi.
            </li>
            <li className="mb-2">
              Menyelenggarakan, mengembangkan dan meyebarluaskan karya ilmiah
              dan penelitian yang berbasis IPTEK.
            </li>
            <li className="mb-2">
              Mengimplementasikan hasil karya ilmiah dan penelitian di bidang
              sains dan teknologi yang bermanfaat bagi peningkatan kesejahteraan
              ,masyarakat.
            </li>
            <li className="mb-2">
              Menjalin dan mengembangkan kemitraan dan meyediakan jasa/layanan
              di bidang sains dan teknologi.
            </li>
            <li className="mb-2">
              Menciptakan dan mengembangkan atmosfir lingkungan yang kondusif
              untuk mendukung peningkatan budaya akademik bagi civitas dan
              tenaga kependidikan.
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
};

export default SejarahPage;
