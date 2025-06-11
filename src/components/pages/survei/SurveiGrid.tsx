/** @format */

// components/survei/SurveiGrid.tsx
import React from "react";
import { DokumenType, GroupedSurvei } from "@/types";
import ProdiGroup from "./ProdiGroup";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";
import { FileX } from "lucide-react";

interface SurveiGridProps {
  dokumenList: DokumenType[];
  loading?: boolean;
}

const SurveiGrid: React.FC<SurveiGridProps> = ({ dokumenList, loading }) => {
  // Group dokumen berdasarkan prodi
  const groupDokumenByProdi = (dokumens: DokumenType[]): GroupedSurvei => {
    return dokumens.reduce((groups: GroupedSurvei, dokumen) => {
      const prodiName = dokumen.prodi?.nm_prodi || "Tidak Diketahui";
      if (!groups[prodiName]) {
        groups[prodiName] = [];
      }
      groups[prodiName].push(dokumen);
      return groups;
    }, {});
  };

  const groupedDokumen = groupDokumenByProdi(dokumenList);
  const prodiNames = Object.keys(groupedDokumen).sort();

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data survei...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (dokumenList.length === 0) {
    return (
      <ScrollRevealComponent animations="fade-up">
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <FileX className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Belum Ada Dokumen Survei
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Saat ini belum ada dokumen survei kepuasan yang tersedia. Silakan
            periksa kembali nanti.
          </p>
        </div>
      </ScrollRevealComponent>
    );
  }

  return (
    <div className="space-y-8">
      {/* Grouped Content */}
      <div className="space-y-8 ">
        {prodiNames.map((prodiName, index) => (
          <ProdiGroup
            key={prodiName}
            prodiName={prodiName}
            dokumenList={groupedDokumen[prodiName]}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default SurveiGrid;
