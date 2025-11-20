"use client";

import { usePathname } from "next/navigation";
import ScrollBasedAnimation from "../ScrollBasedAnimations";
import { useState, useEffect } from "react";
import sanityClient from "@/lib/sanityClient";
import { Clock, Tag, Calendar, Play } from "lucide-react"; // Using Lucide icons for cleaner look

// Helper to safely handle localized content
const getLocalizedContent = (obj, isUrdu, fallback = "") => {
    if (!obj) return fallback;
    return isUrdu ? obj.ur || fallback : obj.en || fallback;
};

export default function Podcasts() {
  const pathname = usePathname();
  const isUrdu = pathname.startsWith("/ur");
  const [playingId, setPlayingId] = useState(null);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPodcasts() {
      const query = `*[_type == "podcast"] | order(publishedAt desc) {
        _id,
        title,
        description,
        youtubeUrl,
        duration,
        publishedAt,
        thumbnail{asset->{url}},
        categories,
        slug,
        isFeatured
      }`;
      const data = await sanityClient.fetch(query);
      setPodcasts(data);
      setLoading(false);
    }
    fetchPodcasts();
  }, []);

  const togglePlay = (id) => {
    setPlayingId(playingId === id ? null : id);
  };

  const featuredPodcast = podcasts.find(podcast => podcast.isFeatured) || podcasts[0];
  const otherPodcasts = podcasts.filter(podcast => podcast._id !== featuredPodcast?._id);

  if (loading) {
    return (
      <main className="flex justify-center items-center h-screen text-gray-600">
        {isUrdu ? "لوڈ ہو رہا ہے..." : "Loading podcasts..."}
      </main>
    );
  }

  return (
    <main className={`bg-white text-black mx-auto px-6 md:px-16 py-20 md:py-28 ${isUrdu ? "rtl font-urdu" : "ltr font-sans"}`}>
      
      {/* Header */}
      <ScrollBasedAnimation direction="up" delay={0.1}>
        <header className="max-w-5xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-1 h-10 bg-[#B80000]" /> {/* Red accent bar */}
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
              {isUrdu ? "پوڈ کاسٹ" : "Podcasts"}
            </h1>
          </div>
          <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto font-serif italic">
            {isUrdu
              ? "ہماری دلچسپ پوڈ کاسٹ سیریز سنیں اور مختلف موضوعات پر گہری بصیرت حاصل کریں۔"
              : "Listen to our interesting podcast series and gain deep insights on various topics."
            }
          </p>
        </header>
      </ScrollBasedAnimation>

      {/* Featured Podcast */}
      {featuredPodcast && (
        <ScrollBasedAnimation direction="up" delay={0.2}>
          <section className="max-w-7xl mx-auto mb-20">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest mb-8 border-b-4 border-[#B80000] pb-2 inline-block">
              {isUrdu ? "نمایاں پوڈ کاسٹ" : "Featured Podcast"}
            </h2>
            <div className="border-4 border-black p-6 md:p-10 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
              <div className="flex flex-col lg:flex-row items-stretch gap-8">
                
                {/* Image/Media Area */}
                <div className="w-full lg:w-2/5 flex-shrink-0 relative aspect-video overflow-hidden">
                  <img
                    src={featuredPodcast.thumbnail?.asset?.url || "/placeholder-podcast.jpg"}
                    alt={getLocalizedContent(featuredPodcast.title, isUrdu)}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Play Button Overlay */}
                  <a
                    href={featuredPodcast.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-[#B80000]/70 transition-colors"
                    aria-label={isUrdu ? "نمایاں پوڈ کاسٹ چلائیں" : "Play featured podcast"}
                  >
                     <Play className="w-16 h-16 text-white" fill="currentColor" />
                  </a>
                </div>
                
                {/* Details */}
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 leading-snug">
                    {getLocalizedContent(featuredPodcast.title, isUrdu)}
                  </h3>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    {getLocalizedContent(featuredPodcast.description, isUrdu)}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8 text-sm font-medium uppercase tracking-wider text-gray-600 border-t border-b border-gray-200 py-3">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#B80000]" />
                      {isUrdu ? "دورانیہ" : "Duration"}: {featuredPodcast.duration}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#B80000]" />
                      {featuredPodcast.publishedAt
                        ? new Date(featuredPodcast.publishedAt).toLocaleDateString(isUrdu ? "ur-PK" : "en-US")
                        : isUrdu ? "تاریخ دستیاب نہیں" : "Date N/A"
                      }
                    </span>
                  </div>
                  
                  <a
                    href={featuredPodcast.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#B80000] text-white px-8 py-3 font-bold text-lg uppercase tracking-widest hover:bg-black transition-colors inline-flex items-center justify-center gap-2 border-2 border-[#B80000] rounded-none self-start"
                  >
                    {/* YouTube SVG remains for style consistency if desired, or replace with Lucide's Youtube icon */}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    {isUrdu ? "یوٹیوب پر دیکھیں" : "Watch on YouTube"}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </ScrollBasedAnimation>
      )}

      {/* Podcast List */}
      <ScrollBasedAnimation direction="up" delay={0.3}>
        <section className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest mb-8 border-b-4 border-[#B80000] pb-2 inline-block">
            {isUrdu ? "تمام پوڈ کاسٹ" : "All Episodes"}
          </h2>

          {otherPodcasts.length > 0 ? (
            <div className="border border-gray-200">
              {otherPodcasts.map((podcast, index) => (
                <article 
                  key={podcast._id} 
                  className={`p-6 transition-colors duration-300 hover:bg-gray-50 ${index < otherPodcasts.length - 1 ? 'border-b border-gray-200' : ''}`}
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Image */}
                    <div className="w-full sm:w-40 h-24 flex-shrink-0 relative overflow-hidden border border-gray-300">
                      <img
                        src={podcast.thumbnail?.asset?.url || "/placeholder-podcast.jpg"}
                        alt={getLocalizedContent(podcast.title, isUrdu)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold uppercase tracking-wide mb-2">
                        {getLocalizedContent(podcast.title, isUrdu)}
                      </h3>
                      <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                        {getLocalizedContent(podcast.description, isUrdu)}
                      </p>
                      <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          {podcast.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          {podcast.publishedAt
                            ? new Date(podcast.publishedAt).toLocaleDateString(isUrdu ? "ur-PK" : "en-US")
                            : isUrdu ? "تاریخ دستیاب نہیں" : "Date N/A"
                          }
                        </span>
                        {podcast.categories?.length > 0 && (
                            <span className="flex items-center gap-1">
                                <Tag className="w-3 h-3 text-gray-400" />
                                {podcast.categories[0]}
                            </span>
                        )}
                      </div>
                      <a
                        href={podcast.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-[#B80000] text-[#B80000] px-4 py-1.5 font-bold text-xs tracking-widest hover:bg-[#B80000] hover:text-white transition-colors inline-flex items-center gap-2 rounded-none mt-2"
                      >
                        <Play className="w-3 h-3" fill="currentColor" />
                        {isUrdu ? "سنیں" : "Listen Now"}
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-gray-300">
              <p className="text-gray-600 text-lg">
                {isUrdu
                  ? "ابھی تک کوئی پوڈ کاسٹ دستیاب نہیں ہے۔"
                  : "No podcasts available yet."
                }
              </p>
            </div>
          )}
        </section>
      </ScrollBasedAnimation>

      {/* Subscribe Section */}
      <ScrollBasedAnimation direction="up" delay={0.4}>
        <section className="max-w-6xl mx-auto text-center mt-20 border-t-4 border-gray-300 pt-16">
          <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-widest mb-6">
            {isUrdu ? "ہمارے پوڈ کاسٹ کو سبسکرائب کریں" : "Subscribe to Our Podcasts"}
          </h3>
          <p className="text-gray-700 text-lg mb-10 max-w-2xl mx-auto">
            {isUrdu
              ? "نئی اقساط کے لیے اپ ڈیٹ رہیں اور ہمارے پوڈ کاسٹ کو اپنے پسندیدہ پلیٹ فارم پر سنیں۔"
              : "Stay updated for new episodes and listen to our podcasts on your favorite platform."
            }
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="bg-[#B80000] text-white px-6 py-3 font-bold uppercase tracking-wider hover:bg-black transition-colors inline-flex items-center gap-2 rounded-none border border-[#B80000]"
            >
              YouTube
            </a>
            <a
              href="#"
              className="bg-black text-white px-6 py-3 font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors inline-flex items-center gap-2 rounded-none border border-black"
            >
              Spotify
            </a>
            <a
              href="#"
              className="bg-black text-white px-6 py-3 font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors inline-flex items-center gap-2 rounded-none border border-black"
            >
              Apple Podcasts
            </a>
            <a
              href="#"
              className="bg-black text-white px-6 py-3 font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors inline-flex items-center gap-2 rounded-none border border-black"
            >
              Google Podcasts
            </a>
          </div>
        </section>
      </ScrollBasedAnimation>
    </main>
  );
}