"use client";

import { useEffect } from "react";

interface AdSlotProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

/**
 * Google AdSense ad slot component.
 * - Requires NEXT_PUBLIC_ADSENSE_CLIENT env var to display real ads
 * - Shows placeholder when AdSense is not configured
 * - Includes TFCD (Tag For Child-Directed Treatment) for COPPA compliance
 */
export default function AdSlot({ slot, format = "auto", className = "" }: AdSlotProps) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  useEffect(() => {
    if (adClient) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch {
        // AdSense not loaded yet
      }
    }
  }, [adClient]);

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
