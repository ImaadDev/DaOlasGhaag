"use client";

import { usePathname } from "next/navigation";
import ScrollBasedAnimation from "../ScrollBasedAnimations";
import { useState, useEffect } from "react";
import sanityClient from "@/lib/sanityClient";

export default function Archives() {
  const pathname = usePathname();
  const isUrdu = pathname.startsWith("/ur");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      const query = `*[_type == "news"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        categories
      }`;
      const data = await sanityClient.fetch(query);
      setNews(data);

      // Set default year to the most recent year
      if (data.length > 0) {
        const mostRecentYear = new Date(data[0].publishedAt).getFullYear().toString();
        setSelectedYear(mostRecentYear);
      }

      setLoading(false);
    }
    fetchNews();
  }, []);

  // Group news by year and month
  const groupedNews = news.reduce((acc, item) => {
    const date = new Date(item.publishedAt);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    if (!acc[year]) acc[year] = {};
    if (!acc[year][month]) acc[year][month] = [];
    if (!acc[year]["all"]) acc[year]["all"] = [];

    acc[year][month].push(item);
    acc[year]["all"].push(item);

    return acc;
  }, {});

  const years = Object.keys(groupedNews).sort((a, b) => parseInt(b) - parseInt(a));

  const months = [
    { value: "all", label: isUrdu ? "تمام" : "All" },
    { value: "12", label: isUrdu ? "دسمبر" : "December" },
    { value: "11", label: isUrdu ? "نومبر" : "November" },
    { value: "10", label: isUrdu ? "اکتوبر" : "October" },
    { value: "09", label: isUrdu ? "ستمبر" : "September" },
    { value: "08", label: isUrdu ? "اگست" : "August" },
    { value: "07", label: isUrdu ? "جولائی" : "July" },
    { value: "06", label: isUrdu ? "جون" : "June" },
    { value: "05", label: isUrdu ? "مئی" : "May" },
    { value: "04", label: isUrdu ? "اپریل" : "April" },
    { value: "03", label: isUrdu ? "مارچ" : "March" },
    { value: "02", label: isUrdu ? "فروری" : "February" },
    { value: "01", label: isUrdu ? "جنوری" : "January" },
  ];

  const currentData = selectedYear && groupedNews[selectedYear]?.[selectedMonth] || [];

  if (loading) {
    return (
      <main className="flex justify-center items-center h-screen text-gray-600">
        {isUrdu ? "لوڈ ہو رہا ہے..." : "Loading archives..."}
      </main>
    );
  }

  return (
    <main className={`bg-white text-black mx-auto px-6 md:px-16 py-20 md:py-28 ${isUrdu ? "rtl" : "ltr"}`}>
      {/* Header */}
      <ScrollBasedAnimation direction="up" delay={0.1}>
        <header className="max-w-5xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-1 h-10 bg-black" />
            <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
              {isUrdu ? "آرکائیوز" : "Archives"}
            </h1>
          </div>
          <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
            {isUrdu
              ? "ہماری پرانی خبروں اور آرٹیکلز کو تلاش کریں اور تاریخ کا جائزہ لیں۔"
              : "Browse our past news and articles and review history."
            }
          </p>
        </header>
      </ScrollBasedAnimation>

      {/* Filters */}
      <ScrollBasedAnimation direction="up" delay={0.2}>
        <section className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">
                {isUrdu ? "سال منتخب کریں" : "Select Year"}
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 focus:border-black focus:outline-none"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">
                {isUrdu ? "ماہ منتخب کریں" : "Select Month"}
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 focus:border-black focus:outline-none"
              >
                {months.map(month => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
              </select>
            </div>
          </div>
        </section>
      </ScrollBasedAnimation>

      {/* Archive List */}
      <ScrollBasedAnimation direction="up" delay={0.3}>
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 border-b border-black pb-3">
            {isUrdu ? "آرکائیوڈ خبریں" : "Archived News"}
            {selectedMonth !== "all" && selectedYear && (
              <span className="text-lg font-normal ml-2">
                - {months.find(m => m.value === selectedMonth)?.label} {selectedYear}
              </span>
            )}
          </h2>

          {currentData.length > 0 ? (
            <div className="space-y-6">
              {currentData.map((item) => (
                <article key={item._id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 hover:text-gray-700 transition-colors">
                        <a href={`/${isUrdu ? "ur" : "en"}/news/${item.slug.current}`}>
                          {isUrdu ? item.title.ur : item.title.en}
                        </a>
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="bg-black text-white px-2 py-1 text-xs font-medium">
                          {item.categories?.[0] || (isUrdu ? "عام" : "General")}
                        </span>
                        <span>
                          {item.publishedAt
                            ? new Date(item.publishedAt).toLocaleDateString(isUrdu ? "ur-PK" : "en-US")
                            : isUrdu ? "تاریخ دستیاب نہیں" : "Date not available"
                          }
                        </span>
                      </div>
                    </div>
                    <a
                      href={`/${isUrdu ? "ur" : "en"}/news/${item.slug.current}`}
                      className="border-2 border-black px-6 py-2 font-bold text-sm tracking-widest hover:bg-black hover:text-white transition-colors whitespace-nowrap"
                    >
                      {isUrdu ? "پڑھیں" : "Read"}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {isUrdu
                  ? "اس مدت کے لیے کوئی آرٹیکل دستیاب نہیں ہے۔"
                  : "No articles available for this period."
                }
              </p>
            </div>
          )}
        </section>
      </ScrollBasedAnimation>
    </main>
  );
}