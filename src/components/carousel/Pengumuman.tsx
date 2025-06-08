/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel } from "swiper/modules";
import moment from "moment";
import "moment/locale/id";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pengumuman as PengumumanType } from "@/types";
import { usePengumuman } from "@/stores/pengumuman";

moment.locale("id");

const Pengumuman: React.FC = () => {
  // store
  const { dataPengumuman, setPengumuman } = usePengumuman();
  // state
  const [width, setWidth] = useState<number>(0);

  //   get data
  useEffect(() => {
    setPengumuman();
  }, [setPengumuman]);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getColorClasses = (kd_prodi: string) => {
    const colors = {
      FST: {
        text: "text-primary",
        bg: "bg-primary",
        hover: "hover:bg-primary",
        border: "border-primary",
      },
      SI: {
        text: "text-blue-500",
        bg: "bg-blue-500",
        hover: "hover:bg-blue-600",
        border: "border-blue-600",
      },
      BI: {
        text: "text-green-600",
        bg: "bg-green-600",
        hover: "hover:bg-green-700",
        border: "border-green-600",
      },
      TG: {
        text: "text-orange-600",
        bg: "bg-orange-600",
        hover: "hover:bg-orange-700",
        border: "border-orange-600",
      },
    };
    return colors[kd_prodi as keyof typeof colors] || colors.FST;
  };

  const handleClick = (row: PengumumanType) => {
    console.log({ row });
    // setOpen(true);
    // setRow(row);
  };

  return (
    <Swiper
      direction={"vertical"}
      slidesPerView={width > 955 ? 6 : 1}
      mousewheel={true}
      loop={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Mousewheel]}
      className="mySwiper h-full"
    >
      {dataPengumuman &&
        dataPengumuman.data.map((row: PengumumanType, index: number) => {
          const colors = getColorClasses(row.prodi.kd_prodi);
          return (
            <SwiperSlide key={index}>
              <div
                className={`cursor-pointer lg:ml-2 font-comic-neue group relative block text-sm font-medium focus:outline-none focus:ring transition-all duration-300 ${colors.hover}`}
                onClick={() => handleClick(row)}
              >
                <div
                  className={`${colors.bg} lg:rounded-lg absolute inset-0 translate-x-0.5 translate-y-0.5 transition-transform group-hover:translate-y-0 group-hover:translate-x-0`}
                />

                <div
                  className={`${colors.bg} ${colors.border} lg:text-white text-white h-[5.3rem] overflow-hidden lg:rounded-lg border relative block px-2 py-3 group-hover:shadow-lg transition-shadow duration-300`}
                >
                  <h1 className="text-center font-bold text-xs lg:text-sm">
                    {row.prodi.nm_prodi} -{" "}
                    {moment(row.tgl_pengumuman).format("DD MMM YYYY")}
                  </h1>
                  <p className="text-center text-xs lg:text-sm line-clamp-2">
                    {row.judul_pengumuman}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default Pengumuman;
