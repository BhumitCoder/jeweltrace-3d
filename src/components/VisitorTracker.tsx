import { useEffect } from "react";
import { saveVisitor } from "@/lib/db";

function parseUA(ua: string) {
  const browser =
    ua.includes("Edg/") ? "Edge" :
    ua.includes("OPR/") || ua.includes("Opera") ? "Opera" :
    ua.includes("Chrome") ? "Chrome" :
    ua.includes("Firefox") ? "Firefox" :
    ua.includes("Safari") ? "Safari" :
    "Other";

  const os =
    ua.includes("Android") ? "Android" :
    ua.includes("iPhone") || ua.includes("iPad") ? "iOS" :
    ua.includes("Windows NT") ? "Windows" :
    ua.includes("Macintosh") ? "macOS" :
    ua.includes("Linux") ? "Linux" :
    "Other";

  const device =
    ua.includes("Mobi") || ua.includes("Android") ? "Mobile" :
    ua.includes("Tablet") || ua.includes("iPad") ? "Tablet" :
    "Desktop";

  return { browser, os, device };
}

export function VisitorTracker() {
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const ua = navigator.userAgent;
        const { browser, os, device } = parseUA(ua);

        let ipData: Record<string, unknown> = {};
        try {
          const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(5000) });
          if (res.ok) ipData = await res.json();
        } catch {
          // IP lookup failed — continue without it
        }

        const base = {
          timestamp: Date.now(),
          page: window.location.pathname,
          referrer: document.referrer || null,
          userAgent: ua,
          browser,
          os,
          device,
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          ip: (ipData.ip as string) ?? null,
          city: (ipData.city as string) ?? null,
          region: (ipData.region as string) ?? null,
          country: (ipData.country_name as string) ?? null,
          countryCode: (ipData.country_code as string) ?? null,
          lat: (ipData.latitude as number) ?? null,
          lon: (ipData.longitude as number) ?? null,
          isp: (ipData.org as string) ?? null,
          timezone: (ipData.timezone as string) ?? null,
          locationSource: "ip" as const,
        };

        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (pos) => {
              await saveVisitor({
                ...base,
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
                locationAccuracy: pos.coords.accuracy,
                locationSource: "browser",
              });
            },
            async () => {
              await saveVisitor({ ...base, locationSource: "denied" });
            },
            { timeout: 10000 }
          );
        } else {
          await saveVisitor(base);
        }
      } catch {
        // silent fail — never break the user's experience
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
