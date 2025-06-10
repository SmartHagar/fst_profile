/** @format */

// app/pengumuman/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import usePengumuman from "../../stores/pengumuman";
import ScrollRevealComponent from "../../components/effects/ScrollRevealComponent";
import moment from "moment";
import "moment/locale/id";

// Dynamic import untuk menghindari SSR issues
const PengumumanModal = dynamic(
  () => import("../../components/modals/PengumumanModal"),
  {
    ssr: false,
  }
);

moment.locale("id");

// Data kategori pengumuman dengan warna sesuai tema
const pengumumanCategories = [
  {
    id: "4",
    name: "Fakultas",
    color: "text-primary",
    bgColor: "bg-primary/10 border-primary/20",
    hoverColor: "hover:bg-primary/20",
  },
  {
    id: "1",
    name: "Sistem Informasi",
    color: "text-secondary",
    bgColor: "bg-secondary/10 border-secondary/20",
    hoverColor: "hover:bg-secondary/20",
  },
  {
    id: "3",
    name: "Biologi",
    color: "text-success",
    bgColor: "bg-success/10 border-success/20",
    hoverColor: "hover:bg-success/20",
  },
  {
    id: "2",
    name: "Geologi",
    color: "text-warning",
    bgColor: "bg-warning/10 border-warning/20",
    hoverColor: "hover:bg-warning/20",
  },
];

const PengumumanPage = () => {
  const {
    setPengumuman,
    dataPengumuman,
    filteredData,
    selectedCategory,
    setSelectedCategory,
    loading,
    error,
    clearError,
  } = usePengumuman();

  const [open, setOpen] = useState(false);
  const [selectedPengumuman, setSelectedPengumuman] = useState({});

  // Fetch data pengumuman saat komponen mount
  useEffect(() => {
    setPengumuman();
  }, [setPengumuman]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handlePengumumanClick = (pengumuman: any) => {
    setSelectedPengumuman(pengumuman);
    setOpen(true);
  };

  const getCurrentCategoryName = () => {
    if (selectedCategory === "all") return "Semua Pengumuman";
    const category = pengumumanCategories.find(
      (cat) => cat.id === selectedCategory
    );
    return category
      ? `Pengumuman ${category.id !== "4" ? "Prodi" : ""} ${category.name}`
      : "Pengumuman";
  };

  const getCategoryCount = (categoryId: string) => {
    const allData = dataPengumuman.data || [];
    if (categoryId === "all") return allData.length;
    return allData.filter((item) => item.prodi_id === categoryId).length;
  };

  return (
    <>
      {/* Modal */}
      {open && (
        <PengumumanModal
          isOpen={open}
          onClose={() => setOpen(false)}
          pengumuman={selectedPengumuman}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header Section */}
          <ScrollRevealComponent animations="fade-down" duration={800}>
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-base-content mb-4">
                Portal Pengumuman
              </h1>
              <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                Dapatkan informasi terkini mengenai pengumuman resmi dari
                fakultas dan program studi
              </p>
            </div>
          </ScrollRevealComponent>

          {/* Error Message */}
          {error && (
            <ScrollRevealComponent animations="fade-up">
              <div className="alert alert-error mb-6 flex items-center justify-between">
                <span>{error}</span>
                <button
                  onClick={clearError}
                  className="btn btn-sm btn-ghost text-error"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </ScrollRevealComponent>
          )}

          {/* Filter Categories */}
          <ScrollRevealComponent animations="fade-up" delay={200}>
            <div className="card bg-base-100 shadow-xl mb-8">
              <div className="card-body">
                <h3 className="card-title text-base-content mb-4 justify-center">
                  Filter Pengumuman
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => handleCategoryChange("all")}
                    className={`btn transition-all duration-300 ${
                      selectedCategory === "all"
                        ? "btn-accent shadow-lg scale-105"
                        : "btn-outline btn-ghost hover:btn-accent"
                    }`}
                  >
                    Semua Pengumuman
                    <div className="badge badge-neutral ml-2">
                      {getCategoryCount("all")}
                    </div>
                  </button>
                  {pengumumanCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`btn transition-all duration-300 ${
                        selectedCategory === category.id
                          ? `btn-primary shadow-lg scale-105`
                          : `btn-outline hover:btn-primary`
                      }`}
                    >
                      {category.name}
                      <div
                        className={`badge ml-2 ${
                          selectedCategory === category.id
                            ? "badge-primary-content"
                            : "badge-neutral"
                        }`}
                      >
                        {getCategoryCount(category.id)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollRevealComponent>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <ScrollRevealComponent animations="fade-right" delay={400}>
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title text-base-content mb-6 flex items-center">
                      <div className="w-1 h-8 bg-primary rounded-full mr-4"></div>
                      {getCurrentCategoryName()}
                      <div className="badge badge-primary ml-3">
                        {filteredData.length} Pengumuman
                      </div>
                    </h2>

                    {loading ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, index) => (
                          <div key={index} className="animate-pulse">
                            <div className="bg-base-200 rounded-lg p-6">
                              <div className="h-6 bg-base-300 rounded mb-3"></div>
                              <div className="h-4 bg-base-300 rounded mb-2 w-3/4"></div>
                              <div className="h-4 bg-base-300 rounded w-1/2"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : filteredData.length > 0 ? (
                      <div className="space-y-4">
                        {filteredData.map((pengumuman, index) => (
                          <ScrollRevealComponent
                            key={pengumuman.id}
                            animations="zoom-in"
                            delay={index * 100}
                            duration={600}
                          >
                            <article
                              onClick={() => handlePengumumanClick(pengumuman)}
                              className="group cursor-pointer card bg-gradient-to-r from-base-100 to-base-200 shadow-md hover:shadow-xl border border-base-300 hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1"
                            >
                              <div className="card-body">
                                <div className="flex items-start justify-between mb-3">
                                  <h3 className="card-title text-base-content group-hover:text-primary transition-colors duration-300 flex-1 mr-4">
                                    {pengumuman.judul_pengumuman}
                                  </h3>
                                  <div className="flex items-center space-x-2">
                                    {pengumuman.prodi && (
                                      <div className="badge badge-secondary">
                                        {pengumuman.prodi.nm_prodi}
                                      </div>
                                    )}
                                    <svg
                                      className="w-5 h-5 text-base-content/40 group-hover:text-primary transition-colors duration-300"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                      />
                                    </svg>
                                  </div>
                                </div>

                                <div className="text-base-content/70 mb-4">
                                  <div
                                    className="line-clamp-3 text-sm leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        pengumuman.isi_pengumuman?.substring(
                                          0,
                                          200
                                        ) + "...",
                                    }}
                                  />
                                </div>

                                <div className="flex items-center justify-between text-sm text-base-content/60">
                                  <div className="flex items-center">
                                    <svg
                                      className="w-4 h-4 mr-2 text-info"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      />
                                    </svg>
                                    {moment(pengumuman.tgl_pengumuman).format(
                                      "DD MMMM YYYY"
                                    )}
                                  </div>
                                  <span className="text-primary font-medium group-hover:underline">
                                    Baca Selengkapnya
                                  </span>
                                </div>
                              </div>
                            </article>
                          </ScrollRevealComponent>
                        ))}
                      </div>
                    ) : (
                      <ScrollRevealComponent animations="fade-up">
                        <div className="text-center py-16">
                          <div className="w-24 h-24 mx-auto mb-6 bg-base-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-12 h-12 text-base-content/40"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold text-base-content/70 mb-2">
                            Belum Ada Pengumuman
                          </h3>
                          <p className="text-base-content/50">
                            Tidak ada pengumuman untuk kategori yang dipilih
                            saat ini.
                          </p>
                        </div>
                      </ScrollRevealComponent>
                    )}
                  </div>
                </div>
              </ScrollRevealComponent>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ScrollRevealComponent animations="fade-left" delay={600}>
                <div className="card bg-base-100 shadow-xl sticky top-8">
                  <div className="bg-gradient-to-r from-primary to-secondary rounded-t-box px-6 py-4">
                    <h3 className="text-xl font-bold text-primary-content flex items-center">
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                        />
                      </svg>
                      Kategori Pengumuman
                    </h3>
                  </div>
                  <div className="card-body pt-6">
                    <ul className="menu menu-compact space-y-2">
                      <li>
                        <button
                          onClick={() => handleCategoryChange("all")}
                          className={`btn btn-ghost justify-between w-full ${
                            selectedCategory === "all"
                              ? "bg-accent/20 text-accent font-semibold"
                              : "hover:bg-base-200"
                          }`}
                        >
                          <span>Semua Pengumuman</span>
                          <div className="badge badge-neutral">
                            {getCategoryCount("all")}
                          </div>
                        </button>
                      </li>
                      {pengumumanCategories.map((category) => {
                        const count = getCategoryCount(category.id);
                        return (
                          <li key={category.id}>
                            <button
                              onClick={() => handleCategoryChange(category.id)}
                              className={`btn btn-ghost justify-between w-full ${
                                selectedCategory === category.id
                                  ? `${category.bgColor} ${category.color} font-semibold border`
                                  : `hover:bg-base-200 ${category.hoverColor}`
                              }`}
                            >
                              <span>{category.name}</span>
                              <div
                                className={`badge ${
                                  selectedCategory === category.id
                                    ? "badge-neutral"
                                    : "badge-ghost"
                                }`}
                              >
                                {count}
                              </div>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </ScrollRevealComponent>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PengumumanPage;
