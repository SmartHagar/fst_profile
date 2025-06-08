/** @format */

"use client";

import { useState } from "react";
import {
  Facebook,
  Twitter,
  MessageCircle,
  Link as LinkIcon,
  Send,
} from "lucide-react";

interface SocialShareProps {
  shareUrl: string;
  title: string;
}

const SocialShare = ({ shareUrl, title }: SocialShareProps) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank"
    );
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareToWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(title + "\n" + shareUrl)}`,
      "_blank"
    );
  };

  const shareToTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent(title)}`,
      "_blank"
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => {
        console.error("Gagal menyalin URL: ", err);
      });
  };

  const shareButtons = [
    {
      onClick: shareToFacebook,
      icon: Facebook,
      bgColor: "btn-primary",
      label: "Share to Facebook",
    },
    {
      onClick: shareToTwitter,
      icon: Twitter,
      bgColor: "btn-info",
      label: "Share to Twitter",
    },
    {
      onClick: shareToWhatsApp,
      icon: MessageCircle,
      bgColor: "btn-success",
      label: "Share to WhatsApp",
    },
    {
      onClick: shareToTelegram,
      icon: Send,
      bgColor: "btn-accent",
      label: "Share to Telegram",
    },
  ];

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <span className="font-bold text-sm">Bagikan:</span>
      <div className="flex flex-wrap gap-2">
        {shareButtons.map((button, index) => {
          const IconComponent = button.icon;
          return (
            <button
              key={index}
              onClick={button.onClick}
              className={`btn btn-sm btn-circle ${button.bgColor}`}
              aria-label={button.label}
              title={button.label}
            >
              <IconComponent size={16} />
            </button>
          );
        })}

        <div className="relative">
          <button
            onClick={copyToClipboard}
            className="btn btn-sm btn-circle btn-neutral"
            aria-label="Copy link"
            title="Copy link"
          >
            <LinkIcon size={16} />
          </button>
          {copySuccess && (
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <div className="alert alert-success alert-sm">
                <span className="text-xs">Tersalin!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
