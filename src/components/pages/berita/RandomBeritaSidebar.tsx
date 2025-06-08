/** @format */

// components/sidebar/RandomBeritaSidebar.tsx
"use client";

import BeritaCard from "@/components/pages/berita/BeritaCard";

interface RandomBeritaSidebarProps {
  dataRandomBerita: any;
}

const RandomBeritaSidebar = ({
  dataRandomBerita,
}: RandomBeritaSidebarProps) => {
  return (
    <div className="w-full lg:w-[24%]">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-primary">
            Berita Random
          </h2>
          <BeritaCard dataCard={dataRandomBerita} random={true} />
        </div>
      </div>
    </div>
  );
};

export default RandomBeritaSidebar;
