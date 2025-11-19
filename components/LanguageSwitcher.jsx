"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const currentLocale = pathname.startsWith("/ur") ? "ur" : "en";

  const getPath = (locale) => {
    if (!pathname || pathname === "/") return `/${locale}`;
    return pathname.replace(/^\/(en|ur)/, `/${locale}`);
  };

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      <Link
        href={getPath("en")}
        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
          currentLocale === "en"
            ? "bg-white text-black shadow-sm"
            : "text-gray-600 hover:text-black"
        }`}
      >
        EN
      </Link>
      <Link
        href={getPath("ur")}
        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
          currentLocale === "ur"
            ? "bg-white text-black shadow-sm"
            : "text-gray-600 hover:text-black"
        }`}
      >
        UR
      </Link>
    </div>
  );
}
