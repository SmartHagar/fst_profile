/** @format */

// components/survei/SurveiCard.tsx
import React from "react";
import { DokumenType } from "@/types";
import { FileText, Download } from "lucide-react";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";
import { BASE_URL } from "@/services/baseURL";

interface SurveiCardProps {
  dokumen: DokumenType;
  index: number;
}

const SurveiCard: React.FC<SurveiCardProps> = ({ dokumen, index }) => {
  const handleDownload = () => {
    const fileUrl = `${BASE_URL}/storage/${dokumen.file}`;
    window.open(fileUrl, "_blank");
  };

  const getFileExtension = (filename: string) => {
    return filename.split(".").pop()?.toUpperCase() || "FILE";
  };

  return (
    <ScrollRevealComponent
      animations="fade-up"
      delay={index * 100}
      className="h-full"
    >
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 h-full flex flex-col">
        {/* Header Card */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight"
                title={dokumen.nama}
              >
                {dokumen.nama}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {getFileExtension(dokumen.file)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="space-y-3 flex-1">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Jenis: </span>
              {dokumen.jenis_dokumen.nama}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-gray-100 mt-4">
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Unduh Dokumen
            </button>
          </div>
        </div>
      </div>
    </ScrollRevealComponent>
  );
};

export default SurveiCard;
