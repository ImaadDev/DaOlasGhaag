"use client";

import Image from "next/image";
import ScrollBasedAnimation from "../ScrollBasedAnimations";
import { usePathname } from "next/navigation";

export default function Multimedia() {
  const pathname = usePathname();
  const isUrdu = pathname.startsWith("/ur"); // Detect Urdu route

  // Sample captions for both languages
  const media = isUrdu
    ? [
        { caption: "پہلا کیپشن" },
        { caption: "دوسرا کیپشن" },
        { caption: "تیسرا کیپشن" },
      ]
    : [
        { caption: "First caption" },
        { caption: "Second caption" },
        { caption: "Third caption" },
      ];

  // Sample images
  const images = [
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
  ];

  return (
    <section className="max-w-7xl mx-auto px-8 py-16 md:py-24 border-t border-gray-100">
      {/* Section Header */}
      <ScrollBasedAnimation direction="up" offset={60}>
        <div className={`flex items-center gap-4 mb-12 ${isUrdu ? "rtl" : "ltr"}`}>
          <div className="w-1 h-8 bg-black" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">
            {isUrdu ? "ملٹی میڈیا" : "Multimedia"}
          </h2>
        </div>
      </ScrollBasedAnimation>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {media.map((item, idx) => (
          <ScrollBasedAnimation
            key={idx}
            direction="up"
            delay={idx * 0.15}
            offset={80}
          >
            <div className="relative h-72 overflow-hidden cursor-pointer group">
              <Image
                src={images[idx]}
                alt={item.caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Overlay caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-sm font-medium tracking-wide">
                  {item.caption}
                </p>
              </div>
            </div>
          </ScrollBasedAnimation>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-16 text-center">
        <ScrollBasedAnimation direction="up" delay={0.4}>
          <button className="border-2 border-black px-8 py-3 font-bold text-sm tracking-widest hover:bg-black hover:text-white transition-colors duration-300">
            {isUrdu ? "تمام گیلری دیکھیں" : "View All Galleries"}
          </button>
        </ScrollBasedAnimation>
      </div>
    </section>
  );
}
