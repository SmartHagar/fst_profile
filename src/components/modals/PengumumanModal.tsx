/** @format */

"use client";

import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/id";

import { Pengumuman as PengumumanType } from "@/types";

moment.locale("id");

const PengumumanModal: React.FC = () => {
  const [modalSize, setModalSize] = useState<string>("modal-box");

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 900) {
        setModalSize("modal-box max-w-5xl");
      } else {
        setModalSize("modal-box");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pengumumanData = row as PengumumanType;

  if (!pengumumanData.prodi) return null;

  return (
    <div className={`modal ${open ? "modal-open" : ""}`}>
      <div className={modalSize}>
        <div className="modal-action mt-0">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleClose}
          >
            ✕
          </button>
        </div>

        <div className="overflow-auto max-h-[80vh]">
          <div className="font-cabin mb-4">
            <div className="flex justify-between mb-2 text-sm">
              <h2>Prodi {pengumumanData.prodi.nm_prodi}</h2>
              <h2>
                Tgl.{" "}
                {moment(pengumumanData.tgl_pengumuman).format("DD MMMM YYYY")}
              </h2>
            </div>
            <div className="divider my-2"></div>
            <h1 className="text-center lg:text-xl text-lg font-bold">
              {pengumumanData.judul_pengumuman}
            </h1>
          </div>

          <div className="font-cabin">
            <div
              className="prose max-w-none overflow-auto"
              dangerouslySetInnerHTML={{
                __html: pengumumanData.isi_pengumuman,
              }}
            />
          </div>
        </div>

        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default PengumumanModal;
