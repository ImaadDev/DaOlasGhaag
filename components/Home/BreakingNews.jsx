"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import sanityClient from "@/lib/sanityClient";

export default function BreakingNews() {
  const pathname = usePathname();
  const isUrdu = pathname.startsWith("/ur"); // Detect Urdu route
  const [index, setIndex] = useState(0);
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBreakingNews() {
      try {
        const query = `*[_type == "news" && isPublished == true] | order(publishedAt desc)[0...5] {
          _id,
          title,
          slug
        }`;
        const data = await sanityClient.fetch(query);
        const headlinesData = data.map(item => ({
          title: isUrdu ? item.title.ur : item.title.en,
          slug: item.slug.current
        }));
        setHeadlines(headlinesData.length > 0 ? headlinesData : [{ title: isUrdu ? "کوئی اہم خبر دستیاب نہیں" : "No breaking news available", slug: null }]);
      } catch (error) {
        console.error("Error fetching breaking news:", error);
        setHeadlines([{ title: isUrdu ? "کوئی اہم خبر دستیاب نہیں" : "No breaking news available", slug: null }]);
      }
      setLoading(false);
    }
    fetchBreakingNews();
  }, [isUrdu]);

  useEffect(() => {
    if (headlines.length > 0) {
      const ticker = setInterval(() => {
        setIndex((i) => (i + 1) % headlines.length);
      }, 3000); // change every 3 seconds
      return () => clearInterval(ticker);
    }
  }, [headlines.length]);

  if (loading) {
    return (
      <div className={`bg-red-600 text-white py-3 px-6 text-sm tracking-wide uppercase ${isUrdu ? "rtl" : "ltr"}`}>
        <span className="font-semibold">
          {isUrdu ? "لوڈ ہو رہا ہے..." : "Loading..."}
        </span>
      </div>
    );
  }

  const currentHeadline = headlines[index];

  return (
    <div className={`bg-red-600 text-white py-3 px-6 text-sm tracking-wide uppercase ${isUrdu ? "rtl" : "ltr"}`}>
      <span className="font-semibold">
        {isUrdu ? "اہم خبریں:" : "Breaking:"}
      </span>{" "}
      {currentHeadline?.slug ? (
        <a
          href={`/${isUrdu ? "ur" : "en"}/news/${currentHeadline.slug}`}
          className="hover:underline transition-all"
        >
          {currentHeadline.title}
        </a>
      ) : (
        <span>{currentHeadline?.title}</span>
      )}
    </div>
  );
}
