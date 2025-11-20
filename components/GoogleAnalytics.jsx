"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GoogleAnalytics({ GA_ID }) {
  const pathname = usePathname();

  // Track route changes (SPA navigation)
  useEffect(() => {
    if (!GA_ID) return;

    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.dataLayer = window.dataLayer || [];

    window.gtag("js", new Date());
    window.gtag("config", GA_ID, {
      page_path: pathname,
    });
  }, [pathname, GA_ID]);

  return (
    <>
      {/* Load GA Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      {/* Init GA */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
