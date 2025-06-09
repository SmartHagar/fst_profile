/** @format */

"use client";

import { useState } from "react";
import {
  Facebook,
  Twitter,
  MessageCircle,
  Link as LinkIcon,
  Send,
  Share2,
} from "lucide-react";

interface SocialShareProps {
  shareUrl: string;
  title: string;
  description?: string;
  hashtags?: string[];
}

const SocialShare = ({
  shareUrl,
  title,
  description = "",
  hashtags = [],
}: SocialShareProps) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Format hashtags untuk Twitter
  const formatHashtags = (tags: string[]) => {
    return tags.map((tag) => `#${tag.replace(/\s+/g, "")}`).join(" ");
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareToTwitter = () => {
    const text = `${title}${
      hashtags.length ? " " + formatHashtags(hashtags) : ""
    }`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareToWhatsApp = () => {
    const text = `*${title}*${
      description ? "\n\n" + description : ""
    }\n\n${shareUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const shareToTelegram = () => {
    const text = `${title}${description ? "\n\n" + description : ""}`;
    const url = `https://t.me/share/url?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin URL: ", err);
      // Fallback untuk browser lama
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // Web Share API untuk mobile
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const shareButtons = [
    {
      onClick: shareToFacebook,
      icon: Facebook,
      bgColor: "btn-primary",
      label: "Share to Facebook",
      color: "#1877F2",
    },
    {
      onClick: shareToTwitter,
      icon: Twitter,
      bgColor: "btn-info",
      label: "Share to Twitter",
      color: "#1DA1F2",
    },
    {
      onClick: shareToWhatsApp,
      icon: MessageCircle,
      bgColor: "btn-success",
      label: "Share to WhatsApp",
      color: "#25D366",
    },
    {
      onClick: shareToTelegram,
      icon: Send,
      bgColor: "btn-accent",
      label: "Share to Telegram",
      color: "#0088CC",
    },
  ];

  return (
    <div className="mt-4 p-4 bg-base-200 rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <span className="font-semibold text-sm flex items-center gap-2">
          <Share2 size={16} />
          Bagikan Artikel:
        </span>

        <div className="flex flex-wrap gap-2">
          {/* Desktop - Show all buttons */}
          <div className="hidden sm:flex gap-2">
            {shareButtons.map((button, index) => {
              const IconComponent = button.icon;
              return (
                <button
                  key={index}
                  onClick={button.onClick}
                  className={`btn btn-sm btn-circle ${button.bgColor} hover:scale-110 transition-transform`}
                  aria-label={button.label}
                  title={button.label}
                  style={{ backgroundColor: button.color }}
                >
                  <IconComponent size={16} />
                </button>
              );
            })}

            {/* Copy Link Button */}
            <div className="relative">
              <button
                onClick={copyToClipboard}
                className="btn btn-sm btn-circle btn-neutral hover:scale-110 transition-transform"
                aria-label="Copy link"
                title="Copy link"
              >
                <LinkIcon size={16} />
              </button>

              {copySuccess && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="alert alert-success alert-sm shadow-lg">
                    <span className="text-xs">Link tersalin!</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile - Show native share or toggle menu */}
          <div className="sm:hidden">
            <button
              onClick={handleNativeShare}
              className="btn btn-primary btn-sm gap-2"
            >
              <Share2 size={16} />
              Bagikan
            </button>

            {/* Fallback share menu untuk mobile tanpa Web Share API */}
            {showShareMenu && !navigator.share && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
                <div className="bg-base-100 w-full rounded-t-2xl p-4 space-y-2">
                  <div className="text-center font-semibold mb-4">
                    Bagikan ke:
                  </div>

                  {shareButtons.map((button, index) => {
                    const IconComponent = button.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          button.onClick();
                          setShowShareMenu(false);
                        }}
                        className="btn btn-ghost justify-start w-full gap-3"
                      >
                        <IconComponent size={20} color={button.color} />
                        {button.label}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => {
                      copyToClipboard();
                      setShowShareMenu(false);
                    }}
                    className="btn btn-ghost justify-start w-full gap-3"
                  >
                    <LinkIcon size={20} />
                    Copy Link
                  </button>

                  <button
                    onClick={() => setShowShareMenu(false)}
                    className="btn btn-outline w-full mt-4"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hashtags Display */}
      {hashtags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {hashtags.map((tag, index) => (
            <span key={index} className="badge badge-outline badge-sm">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialShare;
