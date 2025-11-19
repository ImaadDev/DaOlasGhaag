"use client";

import { useState, useEffect } from "react";
import ScrollBasedAnimation from "../ScrollBasedAnimations";
import sanityClient from "@/lib/sanityClient";
import { usePathname } from "next/navigation";

const ITEMS_PER_PAGE = 6;

export default function TechnologyNewsPage() {
  const pathname = usePathname();
  const isUrdu = pathname.startsWith("/ur");

  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const query = `*[_type == "news" && "technology" in categories] | order(publishedAt desc) {
        title, summary, slug, images[0]{asset->{url}}, categories, publishedAt
      }`;
      const data = await sanityClient.fetch(query);
      setNews(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="flex justify-center items-center h-screen text-gray-600">
        {isUrdu ? "لوڈ ہو رہا ہے..." : "Loading technology news..."}
      </main>
    );
  }

  if (!news.length) {
    return (
      <main className="flex justify-center items-center h-screen text-gray-600">
        {isUrdu ? "ٹیکنالوجی کی خبریں دستیاب نہیں ہیں۔" : "No technology news available."}
      </main>
    );
  }

  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);
  const paginatedNews = news.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <main className="bg-white text-black max-w-7xl mx-auto px-8 py-16 md:py-24">
      {/* Header */}
      <ScrollBasedAnimation direction="up" delay={0.1}>
        <div className="flex items-center gap-4 mb-12">
          <div className="w-1 h-8 bg-black" />
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">
            {isUrdu ? "ٹیکنالوجی خبریں" : "Technology News"}
          </h1>
        </div>
      </ScrollBasedAnimation>

      {/* Featured News */}
      <ScrollBasedAnimation direction="up" delay={0.2}>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div className="relative h-96 lg:h-[32rem] overflow-hidden">
            <img
              src={news[0].images?.asset?.url || "/placeholder.png"}
              alt={isUrdu ? news[0].title.ur : news[0].title.en}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 px-3 py-1 border border-white bg-black/80">
              <span className="text-white text-xs font-semibold tracking-widest">
                {isUrdu ? news[0].categories[0] : news[0].categories[0]}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 leading-snug">
              {isUrdu ? news[0].title.ur : news[0].title.en}
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              {isUrdu ? news[0].summary?.ur : news[0].summary?.en || "Read more about this technology news."}
            </p>
            <a
              href={`/${isUrdu ? "ur" : "en"}/news/${news[0].slug.current}`}
              className="mt-6 border-2 border-black px-8 py-3 font-bold text-sm tracking-widest hover:bg-black hover:text-white transition inline-block"
            >
              {isUrdu ? "مزید پڑھیں" : "READ MORE"}
            </a>
          </div>
        </section>
      </ScrollBasedAnimation>

      {/* Grid Section */}
      <ScrollBasedAnimation direction="up" delay={0.3}>
        <section>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-1 h-8 bg-black" />
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">
              {isUrdu ? "تازہ ترین ٹیکنالوجی خبریں" : "Latest Technology Updates"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedNews.map((item, idx) => (
              <article
                key={idx}
                className="group cursor-pointer bg-white border border-gray-200 hover:bg-gray-50 transition"
              >
                <a href={`/${isUrdu ? "ur" : "en"}/news/${item.slug.current}`} className="block">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.images?.asset?.url || "/placeholder.png"}
                      alt={isUrdu ? item.title.ur : item.title.en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 border border-white bg-black/80">
                      <span className="text-white text-xs font-semibold tracking-widest">
                        {isUrdu ? item.categories[0] : item.categories[0]}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-lg group-hover:translate-x-1 transition-transform">
                      {isUrdu ? item.title.ur : item.title.en}
                    </h3>
                    <p className="text-xs text-gray-500 font-mono">
                      {item.publishedAt
                        ? new Date(item.publishedAt).toLocaleDateString(isUrdu ? "ur-PK" : "en-US")
                        : isUrdu ? "حال ہی میں" : "Recently"}
                    </p>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </section>
      </ScrollBasedAnimation>

      {/* Pagination */}
      <ScrollBasedAnimation direction="up" delay={0.4}>
        <div className="flex justify-center items-center gap-4 mt-16">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="border-2 border-black px-6 py-2 text-sm font-bold uppercase tracking-widest disabled:opacity-30 hover:bg-black hover:text-white transition"
          >
            {isUrdu ? "پچھلا" : "Prev"}
          </button>
          <span className="text-sm font-mono">
            {isUrdu ? "صفحہ" : "Page"} {page} {isUrdu ? "کا" : "of"} {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="border-2 border-black px-6 py-2 text-sm font-bold uppercase tracking-widest disabled:opacity-30 hover:bg-black hover:text-white transition"
          >
            {isUrdu ? "اگلا" : "Next"}
          </button>
        </div>
      </ScrollBasedAnimation>
    </main>
  );
}