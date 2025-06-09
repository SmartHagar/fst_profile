/** @format */
// src/components/social/SocialShare.tsx - Updated untuk PHP
"use client";

import { useState, useEffect } from "react";
import { generateSocialUrls, testSocialSharing } from "@/utils/beritaUtils";
import { Facebook, Linkedin, MessageCircle, PlaneIcon } from "lucide-react";

interface SocialShareProps {
  title: string;
  description: string;
  beritaData: {
    id: number;
    tag: string;
    judul: string;
    isi_berita: string;
    [key: string]: any;
  };
  showTestButton?: boolean; // untuk development
}

const SocialShare = ({
  title,
  description,
  beritaData,
  showTestButton = false,
}: SocialShareProps) => {
  const [socialUrls, setSocialUrls] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (beritaData) {
      const urls = generateSocialUrls(beritaData);
      setSocialUrls(urls);
    }
  }, [beritaData]);

  const handleShare = (platform: string) => {
    if (!socialUrls) return;

    const url = socialUrls[platform];
    if (platform === "copy") {
      handleCopyLink();
    } else {
      window.open(
        url,
        "_blank",
        "width=600,height=400,scrollbars=yes,resizable=yes"
      );
    }
  };

  const handleCopyLink = async () => {
    if (!socialUrls) return;

    try {
      await navigator.clipboard.writeText(socialUrls.copy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      // Fallback untuk browser lama
      const textArea = document.createElement("textarea");
      textArea.value = socialUrls.copy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (!socialUrls || !navigator.share) return;

    try {
      await navigator.share({
        title: title,
        text: description,
        url: socialUrls.copy,
      });
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const handleTestSharing = () => {
    if (process.env.NODE_ENV === "development" && beritaData) {
      testSocialSharing(beritaData);
    }
  };

  if (!socialUrls) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="loading loading-spinner loading-sm"></div>
        <span className="ml-2">Memuat opsi share...</span>
      </div>
    );
  }

  return (
    <div className="bg-base-200 rounded-lg p-4">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className="text-sm font-medium text-base-content/70">
          📤 Bagikan artikel ini:
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Native Share (Mobile) */}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        {navigator.share && (
          <button
            onClick={handleNativeShare}
            className="btn btn-sm btn-primary"
            title="Bagikan"
          >
            📱 Share
          </button>
        )}

        {/* Facebook */}
        <button
          onClick={() => handleShare("facebook")}
          className="btn btn-sm btn-ghost hover:btn-primary hover:text-white"
          title="Bagikan ke Facebook"
        >
          <span className="text-blue-600">
            <Facebook className="w-4 h-4" />
          </span>
          <span className="hidden md:inline">Facebook</span>
        </button>

        {/* Twitter */}
        <button
          onClick={() => handleShare("twitter")}
          className="btn btn-sm btn-ghost hover:btn-info hover:text-white"
          title="Bagikan ke Twitter"
        >
          <span className="text-sky-500">🐦</span>
          <span className="hidden md:inline">Twitter</span>
        </button>

        {/* WhatsApp */}
        <button
          onClick={() => handleShare("whatsapp")}
          className="btn btn-sm btn-ghost hover:btn-success hover:text-white"
          title="Bagikan ke WhatsApp"
        >
          <span className="text-green-500">
            <MessageCircle className="w-4 h-4" />
          </span>
          <span className="hidden md:inline">WhatsApp</span>
        </button>

        {/* LinkedIn */}
        <button
          onClick={() => handleShare("linkedin")}
          className="btn btn-sm btn-ghost hover:btn-info hover:text-white"
          title="Bagikan ke LinkedIn"
        >
          <span className="text-blue-700">
            <Linkedin className="w-4 h-4" />
          </span>
          <span className="hidden md:inline">LinkedIn</span>
        </button>

        {/* Telegram */}
        <button
          onClick={() => handleShare("telegram")}
          className="btn btn-sm btn-ghost hover:btn-info hover:text-white"
          title="Bagikan ke Telegram"
        >
          <span className="text-blue-500">
            <PlaneIcon className="w-4 h-4" />
          </span>
          <span className="hidden md:inline">Telegram</span>
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className={`btn btn-sm btn-ghost hover:btn-warning hover:text-white ${
            copied ? "btn-success" : ""
          }`}
          title="Salin Link"
        >
          {copied ? (
            <>
              <span>✅</span>
              Tersalin!
            </>
          ) : (
            <>
              <span>🔗</span>
              <span className="hidden md:inline">Salin Link</span>
            </>
          )}
        </button>
      </div>

      {/* Test Button untuk Development */}
      {showTestButton && process.env.NODE_ENV === "development" && (
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-800">
                🧪 Development Mode
              </p>
              <p className="text-xs text-yellow-700">
                Test social sharing URLs dan preview
              </p>
            </div>
            <button
              onClick={handleTestSharing}
              className="btn btn-xs btn-warning"
            >
              Test URLs
            </button>
          </div>
        </div>
      )}

      {/* URL Preview untuk Development */}
      {process.env.NODE_ENV === "development" && (
        <details className="mt-3">
          <summary className="text-xs text-base-content/50 cursor-pointer hover:text-base-content/70">
            🔍 Debug Info (Development)
          </summary>
          <div className="mt-2 p-2 bg-base-300 rounded text-xs font-mono overflow-x-auto">
            <div className="space-y-1">
              <div>
                <strong>Share URL:</strong> {socialUrls.copy}
              </div>
              <div>
                <strong>Facebook:</strong> {socialUrls.facebook}
              </div>
              <div>
                <strong>Twitter:</strong> {socialUrls.twitter}
              </div>
            </div>
          </div>
        </details>
      )}
    </div>
  );
};

export default SocialShare;
