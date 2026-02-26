"use client";

import { useState } from "react";

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  className?: string;
  label?: string;
}

export default function ShareButton({
  title,
  text,
  url,
  className = "",
  label = "SHARE",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
    const shareText = text || `Play ${title} for FREE! 🎮`;

    // Web Share API (mobile native share sheet)
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url: shareUrl });
        return;
      } catch {
        // User cancelled or error — fall through to clipboard
      }
    }

    // Fallback: clipboard copy
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Last resort: prompt
      if (typeof window !== "undefined") {
        window.prompt("Copy this link:", shareUrl);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`pixel-btn font-pixel text-[9px] transition-colors ${className}`}
    >
      {copied ? "✓ COPIED!" : `↗ ${label}`}
    </button>
  );
}
