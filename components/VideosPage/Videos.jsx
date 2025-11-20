"use client";

import { usePathname } from "next/navigation";
import ScrollBasedAnimation from "../ScrollBasedAnimations";
import { useState, useEffect } from "react";
import sanityClient from "@/lib/sanityClient";
import Spinner from "@/components/Spinner";

export default function Videos() {
  const pathname = usePathname();
  const isUrdu = pathname.startsWith("/ur");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      const query = `*[_type == "video"] | order(publishedAt desc) {
        _id,
        title,
        description,
        youtubeUrl,
        duration,
        publishedAt,
        thumbnail {
          asset->{
            url
          }
        },
        categories,
        slug,
        isFeatured
      }`;
      const data = await sanityClient.fetch(query);
      setVideos(data);
      setLoading(false);
    }
    fetchVideos();
  }, []);

  const featuredVideo = videos.find((video) => video.isFeatured) || videos[0];
  const otherVideos = videos.filter((video) => video._id !== featuredVideo?._id);

  // Helper to safely get title/desc based on lang
  const getLocalizedContent = (obj) => {
    if (!obj) return "";
    // Assuming Sanity stores it as object { en: "...", ur: "..." }
    // If your schema is just a string, remove this check
    return isUrdu ? obj.ur || obj : obj.en || obj;
  };

  if (loading) {
    return (
      <main className="flex justify-center items-center h-screen bg-white">
        <Spinner size="xl" />
      </main>
    );
  }

  return (
    <main
      className={`bg-white text-black min-h-screen ${
        isUrdu ? "rtl font-urdu" : "ltr font-sans"
      }`}
    >
      {/* Top Red Accent Line (BBC Style) */}
      <div className="w-full h-1 bg-[#B80000]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* Header Section */}
        <ScrollBasedAnimation direction="up" delay={0.1}>
          <header className="mb-12 border-b border-gray-200 pb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-black mb-2">
              {isUrdu ? "ویڈیوز" : "Videos"}
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              {isUrdu
                ? "ہماری خصوصی رپورٹس اور دستاویزی فلمیں دیکھیں۔"
                : "Watch our exclusive reports, documentaries, and deep dives."}
            </p>
          </header>
        </ScrollBasedAnimation>

        {/* Featured Video - Cinematic Layout */}
        {featuredVideo && (
          <ScrollBasedAnimation direction="up" delay={0.2}>
            <section className="mb-20">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-[#B80000]" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#B80000]">
                  {isUrdu ? "نمایاں کہانی" : "Featured Story"}
                </h2>
              </div>

              <div className="group cursor-pointer">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-gray-200 bg-gray-50 hover:shadow-xl transition-shadow duration-300">
                  {/* Thumbnail Side */}
                  <div className="lg:col-span-8 relative overflow-hidden aspect-video bg-black">
                    <a 
                      href={featuredVideo.youtubeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full h-full"
                    >
                      <img
                        src={featuredVideo.thumbnail?.asset?.url || "/placeholder-video.jpg"}
                        alt={getLocalizedContent(featuredVideo.title)}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#B80000] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* Content Side */}
                  <div className="lg:col-span-4 p-8 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-4 group-hover:text-[#B80000] transition-colors">
                      {getLocalizedContent(featuredVideo.title)}
                    </h3>
                    <p className="text-gray-600 text-base md:text-lg mb-6 line-clamp-4">
                      {getLocalizedContent(featuredVideo.description)}
                    </p>
                    
                    <div className="mt-auto border-t border-gray-300 pt-4 flex items-center justify-between text-sm font-medium text-gray-500">
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {featuredVideo.duration}
                      </span>
                      <span>
                        {featuredVideo.publishedAt
                          ? new Date(featuredVideo.publishedAt).toLocaleDateString(
                              isUrdu ? "ur-PK" : "en-GB", { day: 'numeric', month: 'short', year: 'numeric' }
                            )
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ScrollBasedAnimation>
        )}

        {/* Video Grid */}
        <ScrollBasedAnimation direction="up" delay={0.3}>
          <section>
            <div className="flex items-center justify-between border-b border-black mb-8 pb-2">
              <h2 className="text-2xl font-bold text-black">
                {isUrdu ? "تازہ ترین" : "Latest Videos"}
              </h2>
            </div>

            {otherVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {otherVideos.map((video) => (
                  <article key={video._id} className="group flex flex-col h-full">
                    {/* Thumbnail */}
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative aspect-video overflow-hidden bg-gray-100 mb-4"
                    >
                      <img
                        src={video.thumbnail?.asset?.url || "/placeholder-video.jpg"}
                        alt={getLocalizedContent(video.title)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      {/* Small Play Icon Corner */}
                      <div className="absolute bottom-0 left-0 bg-black bg-opacity-80 p-2">
                         <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                      </div>
                      {/* Duration Badge */}
                      <div className="absolute bottom-2 right-2 bg-black text-white text-xs font-bold px-2 py-1">
                        {video.duration}
                      </div>
                    </a>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-xl font-bold leading-snug mb-3 group-hover:text-[#B80000] transition-colors">
                        <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer">
                           {getLocalizedContent(video.title)}
                        </a>
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
                        {getLocalizedContent(video.description)}
                      </p>
                      <time className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-auto pt-4 border-t border-gray-100 block">
                         {video.publishedAt
                            ? new Date(video.publishedAt).toLocaleDateString(isUrdu ? "ur-PK" : "en-GB")
                            : ""}
                      </time>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center border border-gray-100 bg-gray-50">
                <p className="text-gray-500">
                  {isUrdu ? "کوئی ویڈیو دستیاب نہیں" : "No videos found."}
                </p>
              </div>
            )}
          </section>
        </ScrollBasedAnimation>

        {/* Subscribe Banner - Sharp & Bold */}
        <ScrollBasedAnimation direction="up" delay={0.4}>
          <section className="mt-24 bg-black text-white p-10 md:p-16 text-center relative overflow-hidden">
             {/* Decorative accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#B80000]"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                {isUrdu ? "ہمارا یوٹیوب چینل سبسکرائب کریں" : "Subscribe to our Channel"}
              </h3>
              <p className="text-gray-400 text-lg mb-8">
                {isUrdu
                  ? "کبھی بھی اپ ڈیٹ سے محروم نہ ہوں. ہماری ویڈیوز براہ راست یوٹیوب پر دیکھیں۔"
                  : "Never miss an update. Watch our latest content directly on YouTube."}
              </p>
              <a
                href="#"
                className="inline-block bg-[#B80000] text-white px-10 py-4 font-bold text-sm uppercase tracking-widest hover:bg-red-700 transition-colors"
              >
                {isUrdu ? "ابھی سبسکرائب کریں" : "Subscribe Now"}
              </a>
            </div>
          </section>
        </ScrollBasedAnimation>
      </div>
    </main>
  );
}