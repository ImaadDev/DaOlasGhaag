"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useParams } from "next/navigation";
import sanityClient from "@/lib/sanityClient"; // Make sure your Sanity client is correctly set up
import Link from "next/link";
import Spinner from "@/components/Spinner";

export default function NewsDetails() {
  const params = useParams(); // { slug: "news-slug" }
  const pathname = usePathname();
  const isUrdu = pathname.startsWith("/ur");

  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      const query = `*[_type == "news" && slug.current == $slug][0]{
        title, summary, description, images[]{asset->{url}}, sections, categories, publishedAt
      }`;
      const data = await sanityClient.fetch(query, { slug: params.slug });
      setNewsItem(data);
      setLoading(false);
    }
    fetchNews();
  }, [params.slug]);

  if (loading) {
    return <div className="text-center py-20"><Spinner size="lg" /></div>;
  }

  if (!newsItem) {
    return <div className="text-center py-20">{isUrdu ? "خبر نہیں ملی" : "News not found"}</div>;
  }

  return (
    <section className={`max-w-5xl mx-auto px-4 py-16 ${isUrdu ? "rtl" : "ltr"}`}>
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-500">
        <Link href={isUrdu ? "/ur" : "/en"} className="hover:underline">
          {isUrdu ? "ہوم" : "Home"}
        </Link>{" "}
        / <span>{isUrdu ? newsItem.title.ur : newsItem.title.en}</span>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        {isUrdu ? newsItem.title.ur : newsItem.title.en}
      </h1>

      {/* Categories and Published Date */}
      <div className="flex flex-wrap items-center gap-3 mb-8 text-gray-500 text-sm">
        {newsItem.categories?.map((cat) => (
          <span key={cat} className="bg-gray-200 px-2 py-1 rounded">
            {cat}
          </span>
        ))}
        <span>• {new Date(newsItem.publishedAt).toLocaleDateString(isUrdu ? "ur-PK" : "en-US")}</span>
      </div>

      {/* Images */}
      {newsItem.images?.map((img, idx) => (
        <div key={idx} className="relative w-full h-96 mb-8">
          <Image
            src={img.asset.url}
            alt={isUrdu ? newsItem.title.ur : newsItem.title.en}
            fill
            className="object-cover rounded"
          />
        </div>
      ))}

      {/* Summary */}
      {newsItem.summary && (
        <p className="text-lg mb-6 font-medium">{isUrdu ? newsItem.summary.ur : newsItem.summary.en}</p>
      )}

      {/* Description */}
      {newsItem.description && (
        <p className="text-gray-700 mb-6 text-base md:text-lg">
          {isUrdu ? newsItem.description.ur : newsItem.description.en}
        </p>
      )}

      {/* Sections */}
      {newsItem.sections?.map((section, idx) => (
        <div key={idx} className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">
            {isUrdu ? section.title.ur : section.title.en}
          </h2>
          <p className="text-gray-700 text-base md:text-lg">
            {isUrdu ? section.content.ur : section.content.en}
          </p>
        </div>
      ))}
    </section>
  );
}
