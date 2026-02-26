"use client";

import Script from "next/script";

const AD_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

/**
 * Google AdSense script loader.
 * - Only loads when NEXT_PUBLIC_ADSENSE_CLIENT is set
 * - Includes TFCD (Tag For Child-Directed Treatment) for COPPA compliance
 *   since Pini is a kid-directed site
 */
export default function GoogleAdSense() {
  if (!AD_CLIENT) return null;

  return (
    <>
      <Script
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <Script id="adsense-config" strategy="afterInteractive">
        {`
          (adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1;
        `}
      </Script>
    </>
  );
}
