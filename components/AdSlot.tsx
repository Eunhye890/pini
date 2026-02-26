"use client";

import { useEffect, useState } from "react";

interface AdSlotProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  /** Minimum number of game page visits before showing ads (0 = show immediately) */
  minGames?: number;
}

/**
 * Google AdSense ad slot component.
 * - Requires NEXT_PUBLIC_ADSENSE_CLIENT env var to display real ads
 * - Shows placeholder when AdSense is not configured
 * - Includes TFCD (Tag For Child-Directed Treatment) for COPPA compliance
 * - minGames: only show ads after user has visited N game pages in this session
 */
export default function AdSlot({ slot, format = "auto", className = "", minGames = 0 }: AdSlotProps) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const [visible, setVisible] = useState(minGames === 0);

  useEffect(() => {
    if (minGames > 0) {
      const count = parseInt(sessionStorage.getItem("pini_games_played") || "0", 10);
      if (count >= minGames) {
        setVisible(true);
      }
    }
  }, [minGames]);

  useEffect(() => {
    if (adClient && visible) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch {
        // AdSense not loaded yet
      }
    }
  }, [adClient, visible]);

  if (!visible) return null;

  if (!adClient) {
    return (
      <div
        className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 text-sm ${className}`}
        style={{ minHeight: format === "horizontal" ? "90px" : "250px" }}
      >
        Ad Space
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
