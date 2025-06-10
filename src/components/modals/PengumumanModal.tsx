/** @format */

// components/modals/PengumumanModal.tsx

"use client";

import React, { useEffect } from "react";
import ScrollRevealComponent from "../effects/ScrollRevealComponent";
import moment from "moment";
import "moment/locale/id";

moment.locale("id");

interface PengumumanModalProps {
  isOpen: boolean;
  onClose: () => void;
  pengumuman: {
    id?: string;
    judul_pengumuman?: string;
    isi_pengumuman?: string;
    tgl_pengumuman?: string;
    prodi?: {
      nm_prodi?: string;
      kd_prodi?: string;
    };
    author?: string;
    file_attachment?: string;
  };
}

const PengumumanModal: React.FC<PengumumanModalProps> = ({
  isOpen,
  onClose,
  pengumuman,
}) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleShare = () => {
    if (navigator.share && pengumuman.judul_pengumuman) {
      navigator
        .share({
          title: pengumuman.judul_pengumuman,
          text: pengumuman.isi_pengumuman?.substring(0, 100) + "...",
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        // You could add a toast notification here
        alert("Link pengumuman telah disalin!");
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <ScrollRevealComponent
        animations="zoom-in"
        duration={400}
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <div className="modal-box max-w-none w-full h-auto max-h-[90vh] p-0 bg-base-100 shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary px-6 py-6 relative">
            <button
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost absolute top-4 right-4 text-primary-content hover:bg-white/20"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5"
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

            <div className="pr-12">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <svg
                    className="w-6 h-6 text-primary-content"
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
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary-content leading-tight">
                    {pengumuman.judul_pengumuman || "Pengumuman"}
                  </h2>
                  {pengumuman.prodi && (
                    <div className="badge badge-accent mt-2">
                      {pengumuman.prodi.kd_prodi !== "FST"
                        ? "Program Studi"
                        : "Fakultas"}{" "}
                      {pengumuman.prodi.nm_prodi}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-primary-content/80 text-sm">
                {pengumuman.tgl_pengumuman && (
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-accent"
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
                    <span>
                      {moment(pengumuman.tgl_pengumuman).format(
                        "dddd, DD MMMM YYYY"
                      )}
                    </span>
                  </div>
                )}
                {pengumuman.author && (
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Oleh: {pengumuman.author}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[60vh]">
            <div className="p-6 lg:p-8">
              {/* Main Content */}
              <ScrollRevealComponent animations="fade-up" delay={200}>
                <div className="prose prose-lg max-w-none">
                  {pengumuman.isi_pengumuman ? (
                    <div
                      className="text-base-content leading-relaxed prose prose-lg prose-headings:text-primary prose-a:text-secondary prose-strong:text-neutral"
                      dangerouslySetInnerHTML={{
                        __html: pengumuman.isi_pengumuman,
                      }}
                    />
                  ) : (
                    <div className="alert alert-warning">
                      <svg
                        className="w-6 h-6 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      <span>Konten pengumuman tidak tersedia.</span>
                    </div>
                  )}
                </div>
              </ScrollRevealComponent>

              {/* File Attachment */}
              {pengumuman.file_attachment && (
                <ScrollRevealComponent animations="fade-up" delay={300}>
                  <div className="mt-8 card bg-info/10 border border-info/30">
                    <div className="card-body">
                      <h4 className="card-title text-info flex items-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                          />
                        </svg>
                        File Lampiran
                      </h4>
                      <div className="card-actions">
                        <a
                          href={pengumuman.file_attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-info btn-sm"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          Download File
                        </a>
                      </div>
                    </div>
                  </div>
                </ScrollRevealComponent>
              )}

              {/* Additional Info */}
              <ScrollRevealComponent animations="fade-up" delay={400}>
                <div className="mt-8 pt-6 border-t border-base-300">
                  <div className="flex flex-wrap gap-4 text-sm text-base-content/60">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4 text-neutral"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        ID Pengumuman:{" "}
                        <span className="font-mono">
                          #{pengumuman.id || "N/A"}
                        </span>
                      </span>
                    </div>
                    {pengumuman.tgl_pengumuman && (
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4 text-neutral"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>
                          Dipublikasikan{" "}
                          {moment(pengumuman.tgl_pengumuman).fromNow()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollRevealComponent>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-base-200 border-t border-base-300">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-sm text-base-content/60 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Pengumuman resmi dari{" "}
                  {pengumuman.prodi?.nm_prodi || "Institusi"}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleShare}
                    className="btn btn-ghost btn-sm"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                    Bagikan
                  </button>
                  <button onClick={onClose} className="btn btn-primary btn-sm">
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollRevealComponent>
    </div>
  );
};

export default PengumumanModal;
