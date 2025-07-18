/** @format */

"use client";

import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Pagination, EffectCube } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cube";

import Image from "next/image";
import { SlideType } from "@/types";
import { useSlide } from "@/stores/slide";
import { BASE_URL } from "@/services/baseURL";

const ImagesCarousel: React.FC = () => {
  const { dataSlide, setSlide } = useSlide();
  useEffect(() => {
    setSlide();
  }, [setSlide]);

  if (dataSlide?.length === 0) {
    return null;
  }

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      effect={"cube"}
      grabCursor={true}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      modules={[Autoplay, Pagination, Mousewheel, EffectCube]}
      className="mySwiper"
    >
      {dataSlide &&
        dataSlide.map((row: SlideType, index: number) => (
          <SwiperSlide key={index}>
            <div className="h-48 overflow-hidden lg:h-96 md:h-80 cursor-grab rounded-lg">
              <Image
                src={`${BASE_URL}/storage/${row.path_gambar}`}
                className="object-cover h-48 w-full lg:h-96 md:h-80"
                width={500}
                height={500}
                alt={row.kegiatan_det.kegiatan.nm_kegiatan}
              />
              <div className="absolute top-0">
                <div className="mt-2 mx-2 font-comic-neue bg-white/50 backdrop-blur-sm py-2 px-4 rounded-lg">
                  <p className="text-sm lg:text-base font-semibold">
                    {row.kegiatan_det.kegiatan.nm_kegiatan}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default ImagesCarousel;
