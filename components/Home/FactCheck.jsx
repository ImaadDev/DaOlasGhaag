"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ScrollBasedAnimation from "../ScrollBasedAnimations";
import { usePathname } from "next/navigation";
import sanityClient from "@/lib/sanityClient";
import Link from "next/link";

export default function FactCheck() {
  const pathname = usePathname();
  const isUrdu = pathname.startsWith("/ur"); // Detect Urdu route
  const [news, setNews] = useState([]);

  useEffect(() => {
    const query = `*[_type == "news" && "fact-check" in categories]{
      title, description, summary, images[0]{asset->{url}}, slug, publishedAt, categories
    } | order(publishedAt desc)`;
    sanityClient.fetch(query).then((data) => setNews(data));
  }, []);

  const categoryDisplay = (category) => {
    const displays = {
      "fact-check": isUrdu ? "فیکٹ چیک" : "Fact Check",
      verification: isUrdu ? "تصدیق" : "Verification",
      truth: isUrdu ? "حقیقت" : "Truth",
      review: isUrdu ? "جائزہ" : "Review",
    };
    return displays[category] || category;
  };

  return (
    <ScrollBasedAnimation direction="up" delay={0.2}>
      <section id="fact-check" className={`max-w-7xl mx-auto px-8 py-16 md:py-24 ${isUrdu ? "rtl" : "ltr"}`}>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 bg-black" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">
              {isUrdu ? "فیکٹ چیک خبریں" : "Fact Check"}
            </h2>
          </div>
          <a href="/fact-check" className="text-sm font-medium hover:underline transition">
            {isUrdu ? "سب دیکھیں" : "View All"}
          </a>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item, idx) => (
            <Link key={idx} href={`/${isUrdu ? 'ur' : 'en'}/news/${item.slug.current}`}>
              <article className="cursor-pointer group">
              <div className="relative w-full h-64 overflow-hidden bg-black">
                <Image
                  src={item.images?.asset?.url || "/placeholder.png"}
                  alt={isUrdu ? item.title.ur : item.title.en}
                  fill
                  className="object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-500"
                />
                <div className="absolute top-4 left-4">
                  <div className="border border-white bg-black/80 px-3 py-1">
                    <span className="text-white text-xs font-medium tracking-widest">
                      {categoryDisplay(item.categories[0])}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="font-bold text-xl leading-tight group-hover:translate-x-1 transition-transform duration-300">
                  {isUrdu ? item.title.ur : item.title.en}
                </h3>
                <p className="text-gray-500 text-sm">{isUrdu ? item.summary.ur : item.summary.en}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 font-mono">
                  <span>2 {isUrdu ? "گھنٹے پہلے" : "hours ago"}</span>
                  <span>•</span>
                  <span>5 {isUrdu ? "منٹ پڑھیں" : "min read"}</span>
                </div>
              </div>
            </article>
            </Link>
          ))}
        </div>
      </section>
    </ScrollBasedAnimation>
  );
}