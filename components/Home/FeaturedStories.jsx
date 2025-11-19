"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import sanityClient from "@/lib/sanityClient";

export default function FeaturedStories() {
  const pathname = usePathname();
  const isUrdu = pathname.startsWith("/ur"); // Detect Urdu route
  const [index, setIndex] = useState(0);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestNews() {
      try {
        const query = `*[_type == "news" && isPublished == true] | order(publishedAt desc)[0...5] {
          _id,
          title,
          slug,
          categories,
          "images": images[].asset->url
        }`;
        const data = await sanityClient.fetch(query);
        setStories(data || []);
      } catch (error) {
        console.error("Error fetching latest news:", error);
        setStories([]);
      }
      setLoading(false);
    }
    fetchLatestNews();
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    if (stories.length > 0) {
      const slide = setInterval(() => {
        setIndex((i) => (i + 1) % stories.length);
      }, 5000);
      return () => clearInterval(slide);
    }
  }, [stories.length]);

  if (loading) {
    return (
      <section className="relative h-[70vh] overflow-hidden bg-black flex items-center justify-center">
        <div className="text-white text-xl">
          {isUrdu ? "لوڈ ہو رہا ہے..." : "Loading..."}
        </div>
      </section>
    );
  }

  if (stories.length === 0) {
    return (
      <section className="relative h-[70vh] overflow-hidden bg-black flex items-center justify-center">
        <div className="text-white text-xl text-center">
          {isUrdu ? "فیچرڈ اسٹوریز دستیاب نہیں ہیں" : "No featured stories available"}
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[70vh] overflow-hidden bg-black">
      {stories.map((story, i) => (
        <div
          key={story._id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={story.images?.[0] || "/placeholder-news.jpg"}
            alt={isUrdu ? story.title.ur : story.title.en}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          <div className={`absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16 ${isUrdu ? "rtl" : "ltr"}`}>
            <div className="max-w-7xl mx-auto">
              <div className="inline-block border border-white/30 px-4 py-1 mb-4">
                <span className="text-white text-xs font-medium tracking-widest">
                  {story.categories?.[0] || (isUrdu ? "عام" : "General")}
                </span>
              </div>
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl leading-tight">
                {isUrdu ? story.title.ur : story.title.en}
              </h2>
              <a
                href={`/${isUrdu ? "ur" : "en"}/news/${story.slug.current}`}
                className="inline-block bg-white text-black px-8 py-3 font-semibold text-sm tracking-wide hover:bg-white/90 transition-colors"
              >
                {isUrdu ? "مزید پڑھیں" : "Read More"}
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Progress indicators */}
      <div className="absolute bottom-8 right-8 md:right-12 lg:right-16 flex gap-2">
        {stories.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="group"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div
              className={`h-1 transition-all duration-300 ${
                i === index
                  ? "w-12 bg-white"
                  : "w-8 bg-white/40 group-hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Story counter */}
      <div className="absolute top-8 right-8 md:right-12 lg:right-16 text-white font-mono text-sm">
        <span className="text-2xl font-bold">{String(index + 1).padStart(2, "0")}</span>
        <span className="text-white/50"> / {String(stories.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}
