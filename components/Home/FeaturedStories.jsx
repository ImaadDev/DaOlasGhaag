"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import sanityClient from "@/lib/sanityClient";
import Spinner from "@/components/Spinner";
import { ChevronLeft, ChevronRight, ArrowRight, Clock } from "lucide-react";

export default function FeaturedStories() {
  const pathname = usePathname();
  const isUrdu = pathname.startsWith("/ur");
  const [index, setIndex] = useState(0);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef(null);

  // Helper to handle Sanity localization objects safely
  const getLocalizedContent = (obj) => {
    if (!obj) return "";
    return isUrdu ? obj.ur || obj : obj.en || obj;
  };

  useEffect(() => {
    async function fetchLatestNews() {
      try {
        const query = `*[_type == "news" && isFeatured == true] | order(publishedAt desc)[0...5] {
          _id,
          title,
          slug,
          categories,
          publishedAt,
          excerpt, 
          "images": images[].asset->url
        }`;
        const data = await sanityClient.fetch(query);
        // Fallback if no featured news found, just get latest
        if (!data || data.length === 0) {
            const fallbackQuery = `*[_type == "news"] | order(publishedAt desc)[0...5] {
                _id, title, slug, categories, publishedAt, excerpt, "images": images[].asset->url
            }`;
            const fallbackData = await sanityClient.fetch(fallbackQuery);
            setStories(fallbackData || []);
        } else {
            setStories(data);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setStories([]);
      }
      setLoading(false);
    }
    fetchLatestNews();
  }, []);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    if (stories.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setIndex((prevIndex) => (prevIndex === stories.length - 1 ? 0 : prevIndex + 1));
      }, 6000); // 6 seconds per slide
    }
    return () => resetTimeout();
  }, [index, stories.length]);

  const nextSlide = () => {
    setIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  if (loading) {
    return (
      <section className="relative h-[80vh] bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <Spinner size="xl" />
            <p className="text-gray-500 text-xs uppercase tracking-widest animate-pulse">
                {isUrdu ? "خبریں لوڈ ہو رہی ہیں..." : "Loading Headlines..."}
            </p>
        </div>
      </section>
    );
  }

  if (stories.length === 0) return null;

  const activeStory = stories[index];

  return (
    <section className={`relative h-[85vh] md:h-[80vh] bg-black overflow-hidden group text-white ${isUrdu ? "rtl" : "ltr"}`}>
      
      {/* --- 1. Background Images with Ken Burns Effect --- */}
      {stories.map((story, i) => (
        <div
          key={story._id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Image Container with Scale Animation */}
          <div className={`w-full h-full overflow-hidden relative`}>
            <img
              src={story.images?.[0] || "/placeholder-news.jpg"}
              alt={getLocalizedContent(story.title)}
              className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-linear ${
                i === index ? "scale-110" : "scale-100"
              }`}
            />
             {/* Cinematic Gradient Overlay (Darker at bottom/sides for text readability) */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90`} />
            <div className={`absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent ${isUrdu ? "bg-gradient-to-l" : ""}`} />
          </div>
        </div>
      ))}

      {/* --- 2. Content Layer --- */}
      <div className="absolute inset-0 z-20 flex items-end pb-24 md:pb-20 px-6 md:px-16 max-w-[1600px] mx-auto w-full">
        <div className="w-full md:w-2/3 lg:w-1/2">
          
          {/* Animated Content Container */}
          <div key={index} className="animate-slideUp">
            
            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-6">
               <span className="bg-[#B80000] text-white text-xs font-extrabold uppercase tracking-widest px-3 py-1">
                 {activeStory.categories?.[0] || (isUrdu ? "نمایاں" : "Breaking")}
               </span>
               <span className="text-gray-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                 <Clock className="w-3 h-3" />
                 {activeStory.publishedAt 
                    ? new Date(activeStory.publishedAt).toLocaleDateString(isUrdu ? "ur-PK" : "en-US") 
                    : ""}
               </span>
            </div>

            {/* Headline with Accent Line */}
            <div className={`relative ${isUrdu ? "border-r-4 pr-6" : "border-l-4 pl-6"} border-[#B80000] mb-6`}>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.95] tracking-tight drop-shadow-lg">
                <a href={`/${isUrdu ? "ur" : "en"}/news/${activeStory.slug?.current}`} className="hover:text-gray-200 transition-colors">
                  {getLocalizedContent(activeStory.title)}
                </a>
              </h2>
            </div>

            {/* Excerpt (Optional - Hidden on very small screens) */}
            <p className="text-gray-300 text-lg md:text-xl font-serif leading-relaxed mb-8 line-clamp-2 opacity-90 hidden md:block">
                {getLocalizedContent(activeStory.excerpt) || getLocalizedContent(activeStory.description)}
            </p>

            {/* CTA Button */}
            <a
              href={`/${isUrdu ? "ur" : "en"}/news/${activeStory.slug?.current}`}
              className="inline-flex items-center gap-3 border-2 border-white text-white px-8 py-3 font-bold text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 group/btn"
            >
              {isUrdu ? "مکمل خبر پڑھیں" : "Read Full Story"}
              <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isUrdu ? "rotate-180 group-hover/btn:-translate-x-1" : "group-hover/btn:translate-x-1"}`} />
            </a>
          </div>
        </div>
      </div>

      {/* --- 3. Controls & Progress Interface --- */}
      <div className="absolute bottom-0 left-0 w-full z-30 border-t border-white/10 bg-black/40 backdrop-blur-md h-16 md:h-20 flex items-center">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 w-full flex justify-between items-center">
            
            {/* Index Indicator */}
            <div className="hidden md:flex items-end gap-2 font-mono">
                <span className="text-3xl font-bold leading-none text-white">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-gray-400 mb-1">
                    / {String(stories.length).padStart(2, '0')}
                </span>
            </div>

            {/* Progress Bars */}
            <div className="flex-1 max-w-md mx-6 md:mx-12 flex gap-2 h-1">
                {stories.map((_, i) => (
                    <div key={i} className="flex-1 bg-gray-700 relative overflow-hidden h-full">
                        {/* Active Progress Fill Animation */}
                        <div 
                            className={`absolute top-0 left-0 h-full bg-[#B80000] transition-all duration-300 ${
                                i < index ? "w-full" : i === index ? "animate-progress w-full" : "w-0"
                            } ${isUrdu ? "right-0 origin-right" : "left-0 origin-left"}`}
                            style={{ 
                                animationDuration: i === index ? '6000ms' : '0ms',
                                animationTimingFunction: 'linear'
                            }}
                        ></div>
                    </div>
                ))}
            </div>

            {/* Arrows */}
            <div className={`flex items-center gap-1 ${isUrdu ? "flex-row-reverse" : ""}`}>
                <button 
                    onClick={prevSlide}
                    className="p-3 hover:bg-white hover:text-black transition-colors border-r border-l border-white/10"
                    aria-label="Previous Slide"
                >
                    <ChevronLeft className={`w-5 h-5 ${isUrdu ? "rotate-180" : ""}`} />
                </button>
                <button 
                    onClick={nextSlide}
                    className="p-3 hover:bg-[#B80000] hover:text-white transition-colors border-r border-white/10"
                    aria-label="Next Slide"
                >
                    <ChevronRight className={`w-5 h-5 ${isUrdu ? "rotate-180" : ""}`} />
                </button>
            </div>
        </div>
      </div>

      {/* --- Animation Styles --- */}
      <style jsx global>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation-name: progress;
          animation-fill-mode: forwards;
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
}