"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function FeaturedStories() {
  const pathname = usePathname();
  const isUrdu = pathname.startsWith("/ur"); // Detect Urdu route
  const [index, setIndex] = useState(0);

  // Featured stories for EN/UR
  const stories = isUrdu
    ? [
        { title: "پہلی کہانی", category: "ٹیکنالوجی" },
        { title: "دوسری کہانی", category: "سپورٹس" },
        { title: "تیسری کہانی", category: "تفریح" },
      ]
    : [
        { title: "First Story", category: "Technology" },
        { title: "Second Story", category: "Sports" },
        { title: "Third Story", category: "Entertainment" },
      ];

  const images = [
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1581093588401-22bfc4ab6b79?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1600&q=80",
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const slide = setInterval(() => {
      setIndex((i) => (i + 1) % stories.length);
    }, 5000);
    return () => clearInterval(slide);
  }, [stories.length]);

  return (
    <section className="relative h-[70vh] overflow-hidden bg-black">
      {stories.map((story, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={images[i]}
            alt={story.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          <div className={`absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16 ${isUrdu ? "rtl" : "ltr"}`}>
            <div className="max-w-7xl mx-auto">
              <div className="inline-block border border-white/30 px-4 py-1 mb-4">
                <span className="text-white text-xs font-medium tracking-widest">
                  {story.category}
                </span>
              </div>
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl leading-tight">
                {story.title}
              </h2>
              <button className="bg-white text-black px-8 py-3 font-semibold text-sm tracking-wide hover:bg-white/90 transition-colors">
                {isUrdu ? "مزید پڑھیں" : "Read More"}
              </button>
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
