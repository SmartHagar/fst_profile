/** @format */

// components/pages/dokumen/DokumenGrid.tsx
"use client";

import React from "react";
import { DokumenType } from "@/types";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";
import { FileText, Download, Calendar, Tag } from "lucide-react";
import moment from "moment";
import { groupBy } from "lodash";

interface DokumenGridProps {
  data: DokumenType[];
}

const DokumenGrid: React.FC<DokumenGridProps> = ({ data }) => {
  // Group documents by prodi
  const groupedDokumen = groupBy(
    data,
    (item) => item.prodi?.nm_prodi || "Lainnya"
  );

  const handleDownload = (file: string, nama: string) => {
    // Assuming your base URL for documents
    const baseUrl = "https://admin.fstuogp.com/storage/";
    const downloadUrl = `${baseUrl}${file}`;

    // Create temporary link for download
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = nama;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-12">
      {Object.entries(groupedDokumen).map(
        ([prodiName, dokumenList], prodiIndex) => (
          <ScrollRevealComponent
            key={prodiName}
            animations="fade-up"
            delay={prodiIndex * 100}
            className="space-y-6"
          >
            {/* Prodi Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-base-300">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Tag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-base-content">
                  {prodiName}
                </h2>
                <p className="text-sm text-base-content/60">
                  {dokumenList.length} dokumen tersedia
                </p>
              </div>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dokumenList.map((dokumen, index) => (
                <ScrollRevealComponent
                  key={dokumen.id}
                  animations="zoom-in"
                  delay={prodiIndex * 100 + index * 50}
                >
                  <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-200">
                    <div className="card-body p-6">
                      {/* Document Icon & Type */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div className="badge badge-secondary badge-sm">
                          {dokumen.jenis_dokumen?.nama || "Dokumen"}
                        </div>
                      </div>

                      {/* Document Title */}
                      <h3 className="card-title text-lg font-semibold text-base-content mb-2 line-clamp-2">
                        {dokumen.nama}
                      </h3>

                      {/* Document Info */}
                      <div className="space-y-2 text-sm text-base-content/60 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {moment(dokumen.created_at).format("DD MMM YYYY")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          <span>{dokumen.prodi?.kd_prodi || "N/A"}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="card-actions justify-end mt-auto">
                        <button
                          onClick={() =>
                            handleDownload(dokumen.file, dokumen.nama)
                          }
                          className="btn btn-primary btn-sm gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollRevealComponent>
              ))}
            </div>
          </ScrollRevealComponent>
        )
      )}

      {/* Empty State */}
      {data.length === 0 && (
        <ScrollRevealComponent animations="fade-up">
          <div className="text-center py-16">
            <div className="p-6 bg-base-200 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <FileText className="w-12 h-12 text-base-content/40" />
            </div>
            <h3 className="text-xl font-semibold text-base-content mb-2">
              Tidak ada dokumen
            </h3>
            <p className="text-base-content/60">
              Belum ada dokumen yang tersedia saat ini.
            </p>
          </div>
        </ScrollRevealComponent>
      )}
    </div>
  );
};

export default DokumenGrid;

// components/pages/dokumen/DokumenList.tsx (Alternative list view)
export const DokumenList: React.FC<DokumenGridProps> = ({ data }) => {
  const groupedDokumen = groupBy(
    data,
    (item) => item.prodi?.nm_prodi || "Lainnya"
  );

  const handleDownload = (file: string, nama: string) => {
    const baseUrl = "https://admin.fstuogp.com/storage/";
    const downloadUrl = `${baseUrl}${file}`;

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = nama;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {Object.entries(groupedDokumen).map(
        ([prodiName, dokumenList], prodiIndex) => (
          <ScrollRevealComponent
            offset={10}
            key={prodiName}
            animations="fade-up"
            delay={prodiIndex * 100}
            className="space-y-4"
          >
            {/* Prodi Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-base-300">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Tag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-base-content">
                  {prodiName}
                </h2>
                <p className="text-sm text-base-content/60">
                  {dokumenList.length} dokumen
                </p>
              </div>
            </div>

            {/* Documents List */}
            <div className="space-y-3">
              {dokumenList.map((dokumen, index) => (
                <ScrollRevealComponent
                  offset={10}
                  key={dokumen.id}
                  animations="slide-left"
                  delay={prodiIndex * 100 + index * 30}
                >
                  <div className="flex items-center gap-4 p-4 bg-base-100 rounded-lg border border-base-200 hover:shadow-md transition-all duration-200">
                    {/* Icon */}
                    <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="flex-grow min-w-0">
                      <h3 className="font-semibold text-base-content truncate">
                        {dokumen.nama}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-base-content/60 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {moment(dokumen.created_at).format("DD/MM/YYYY")}
                        </span>
                        <span className="badge badge-secondary badge-xs">
                          {dokumen.jenis_dokumen?.nama}
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    <button
                      onClick={() => handleDownload(dokumen.file, dokumen.nama)}
                      className="btn btn-primary btn-sm gap-2 flex-shrink-0"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                  </div>
                </ScrollRevealComponent>
              ))}
            </div>
          </ScrollRevealComponent>
        )
      )}
    </div>
  );
};

// components/pages/dokumen/DokumenStats.tsx (Statistics component)
export const DokumenStats: React.FC<DokumenGridProps> = ({ data }) => {
  const groupedByProdi = groupBy(
    data,
    (item) => item.prodi?.nm_prodi || "Lainnya"
  );
  const groupedByJenis = groupBy(
    data,
    (item) => item.jenis_dokumen?.nama || "Lainnya"
  );

  return (
    <ScrollRevealComponent animations="fade-up" className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat bg-base-100 rounded-lg border border-base-200">
          <div className="stat-figure text-primary">
            <FileText className="w-8 h-8" />
          </div>
          <div className="stat-title">Total Dokumen</div>
          <div className="stat-value text-primary">{data.length}</div>
          <div className="stat-desc">Dokumen tersedia</div>
        </div>

        <div className="stat bg-base-100 rounded-lg border border-base-200">
          <div className="stat-figure text-secondary">
            <Tag className="w-8 h-8" />
          </div>
          <div className="stat-title">Program Studi</div>
          <div className="stat-value text-secondary">
            {Object.keys(groupedByProdi).length}
          </div>
          <div className="stat-desc">Prodi berbeda</div>
        </div>

        <div className="stat bg-base-100 rounded-lg border border-base-200">
          <div className="stat-figure text-accent">
            <FileText className="w-8 h-8" />
          </div>
          <div className="stat-title">Jenis Dokumen</div>
          <div className="stat-value text-accent">
            {Object.keys(groupedByJenis).length}
          </div>
          <div className="stat-desc">Kategori berbeda</div>
        </div>
      </div>
    </ScrollRevealComponent>
  );
};
