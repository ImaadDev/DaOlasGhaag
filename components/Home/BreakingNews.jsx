"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function BreakingNews() {
  const pathname = usePathname();
  const isUrdu = pathname.startsWith("/ur"); // Detect Urdu route
  const [index, setIndex] = useState(0);

  // English & Urdu headlines
  const headlines = isUrdu
    ? [
        "اہم خبر 1",
        "اہم خبر 2",
        "اہم خبر 3",
      ]
    : [
        "Breaking News 1",
        "Breaking News 2",
        "Breaking News 3",
      ];

  useEffect(() => {
    const ticker = setInterval(() => {
      setIndex((i) => (i + 1) % headlines.length);
    }, 3000); // change every 3 seconds
    return () => clearInterval(ticker);
  }, [headlines.length]);

  return (
    <div className={`bg-red-600 text-white py-3 px-6 text-sm tracking-wide uppercase ${isUrdu ? "rtl" : "ltr"}`}>
      <span className="font-semibold">
        {isUrdu ? "اہم خبریں:" : "Breaking:"}
      </span>{" "}
      <span>{headlines[index]}</span>
    </div>
  );
}
