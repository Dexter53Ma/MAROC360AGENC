"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, Suspense } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function GoogleAnalyticsPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID) return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    window.gtag?.("config", GA_ID, { page_path: url });
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        id="ga-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { send_page_view: false });
          `,
        }}
      />
      <Suspense fallback={null}>
        <GoogleAnalyticsPageview />
      </Suspense>
    </>
  );
}
