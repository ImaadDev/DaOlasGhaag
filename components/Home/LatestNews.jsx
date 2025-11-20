"use client";

import Image from "next/image";
import ScrollBasedAnimation from "../ScrollBasedAnimations";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import sanityClient from "@/lib/sanityClient";
import Spinner from "@/components/Spinner";

export default function LatestNews() {
  const pathname = usePathname();
  const isUrdu = pathname.startsWith("/ur");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestNews() {
      try {
        const query = `*[_type == "news" && isPublished == true] | order(publishedAt desc)[0...6] {
          _id,
          title,
          summary,
          slug,
          images,
          publishedAt
        }`;
        const data = await sanityClient.fetch(query);
        setNews(data || []);
      } catch (error) {
        console.error("Error fetching latest news:", error);
        setNews([]);
      }
      setLoading(false);
    }
    fetchLatestNews();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-8 py-16 md:py-24 border-t border-gray-100">
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-8 py-16 md:py-24 border-t border-gray-100">
      {/* Section Header */}
      <ScrollBasedAnimation direction="up" offset={60}>
        <div className={`flex items-center justify-between mb-12 ${isUrdu ? "rtl" : "ltr"}`}>
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 bg-black" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">
              {isUrdu ? "تازہ ترین خبریں" : "Latest News"}
            </h2>
          </div>
          <a
            href={isUrdu ? "/ur/news" : "/en/news"}
            className="text-sm font-medium hover:underline transition"
          >
            {isUrdu ? "سب دیکھیں" : "View All"}
          </a>
        </div>
      </ScrollBasedAnimation>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, idx) => (
          <ScrollBasedAnimation
            key={item._id}
            direction="up"
            delay={idx * 0.15}
            offset={80}
          >
            <article className="cursor-pointer group border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={
                    item.images && Array.isArray(item.images) && item.images.length > 0 && item.images[0]?.asset?.url
                      ? item.images[0].asset.url
                      : "/placeholder-news.jpg"
                  }
                  alt={isUrdu ? item.title.ur : item.title.en}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">
                  <a href={`/${isUrdu ? "ur" : "en"}/news/${item.slug.current}`}>
                    {isUrdu ? item.title.ur : item.title.en}
                  </a>
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {isUrdu ? item.summary.ur : item.summary.en}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {item.publishedAt
                      ? new Date(item.publishedAt).toLocaleDateString(isUrdu ? "ur-PK" : "en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })
                      : isUrdu ? "تاریخ دستیاب نہیں" : "Date not available"
                    }
                  </span>
                  <a
                    href={`/${isUrdu ? "ur" : "en"}/news/${item.slug.current}`}
                    className="text-black font-medium hover:underline"
                  >
                    {isUrdu ? "مزید پڑھیں" : "Read More"}
                  </a>
                </div>
              </div>
            </article>
          </ScrollBasedAnimation>
        ))}
      </div>

      {/* View All Button */}
      {news.length > 0 && (
        <div className="mt-16 text-center">
          <ScrollBasedAnimation direction="up" delay={0.4}>
            <a
              href={isUrdu ? "/ur/news" : "/en/news"}
              className="border-2 border-black px-8 py-3 font-bold text-sm tracking-widest hover:bg-black hover:text-white transition-colors duration-300 inline-block"
            >
              {isUrdu ? "تمام خبریں دیکھیں" : "View All News"}
            </a>
          </ScrollBasedAnimation>
        </div>
      )}
    </section>
  );
}