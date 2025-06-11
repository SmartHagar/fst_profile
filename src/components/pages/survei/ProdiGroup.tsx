/** @format */

// components/survei/ProdiGroup.tsx
import React from "react";
import { DokumenType } from "@/types";
import SurveiCard from "./SurveiCard";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";
import { GraduationCap, FileText } from "lucide-react";

interface ProdiGroupProps {
  prodiName: string;
  dokumenList: DokumenType[];
  index: number;
}

const ProdiGroup: React.FC<ProdiGroupProps> = ({
  prodiName,
  dokumenList,
  index,
}) => {
  const prodiCode = dokumenList[0]?.prodi?.kd_prodi || "";

  return (
    <ScrollRevealComponent
      animations="fade-up"
      delay={index * 150}
      className="mb-8"
    >
      <div className="space-y-4">
        {/* Header Prodi */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">Program Studi {prodiName}</h2>
              {prodiCode && (
                <p className="text-blue-100 mt-1">Kode Prodi: {prodiCode}</p>
              )}
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-blue-100">
                <FileText className="w-5 h-5" />
                <span className="text-sm">{dokumenList.length} Dokumen</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Dokumen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {dokumenList.map((dokumen, docIndex) => (
            <SurveiCard key={dokumen.id} dokumen={dokumen} index={docIndex} />
          ))}
        </div>
      </div>
    </ScrollRevealComponent>
  );
};

export default ProdiGroup;
