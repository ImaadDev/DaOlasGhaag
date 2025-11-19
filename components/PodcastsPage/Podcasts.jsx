"use client";

import { usePathname } from "next/navigation";
import ScrollBasedAnimation from "../ScrollBasedAnimations";
import { useState, useEffect } from "react";
import sanityClient from "@/lib/sanityClient";

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
        thumbnail,
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
    <main className={`bg-white text-black mx-auto px-6 md:px-16 py-20 md:py-28 ${isUrdu ? "rtl" : "ltr"}`}>
      {/* Header */}
      <ScrollBasedAnimation direction="up" delay={0.1}>
        <header className="max-w-5xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-1 h-10 bg-black" />
            <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
              {isUrdu ? "پوڈ کاسٹ" : "Podcasts"}
            </h1>
          </div>
          <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
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
          <section className="max-w-6xl mx-auto mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 border-b border-black pb-3">
              {isUrdu ? "نمایاں پوڈ کاسٹ" : "Featured Podcast"}
            </h2>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="w-full lg:w-1/3">
                  <img
                    src={featuredPodcast.thumbnail?.asset?.url || "/placeholder-podcast.jpg"}
                    alt={isUrdu ? featuredPodcast.title.ur : featuredPodcast.title.en}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    {isUrdu ? featuredPodcast.title.ur : featuredPodcast.title.en}
                  </h3>
                  <p className="text-gray-700 text-lg mb-6">
                    {isUrdu ? featuredPodcast.description.ur : featuredPodcast.description.en}
                  </p>
                  <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                    <span className="text-sm text-gray-600">
                      {isUrdu ? "دورانیہ" : "Duration"}: {featuredPodcast.duration}
                    </span>
                    <span className="text-sm text-gray-600">
                      {featuredPodcast.publishedAt
                        ? new Date(featuredPodcast.publishedAt).toLocaleDateString(isUrdu ? "ur-PK" : "en-US")
                        : isUrdu ? "تاریخ دستیاب نہیں" : "Date not available"
                      }
                    </span>
                  </div>
                  <a
                    href={featuredPodcast.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white px-8 py-3 font-bold text-lg hover:bg-red-700 transition-colors rounded-lg inline-flex items-center gap-2"
                  >
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
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 border-b border-black pb-3">
            {isUrdu ? "تمام پوڈ کاسٹ" : "All Podcasts"}
          </h2>

          {otherPodcasts.length > 0 ? (
            <div className="space-y-6">
              {otherPodcasts.map((podcast) => (
                <article key={podcast._id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-full sm:w-32 h-32 flex-shrink-0">
                      <img
                        src={podcast.thumbnail?.asset?.url || "/placeholder-podcast.jpg"}
                        alt={isUrdu ? podcast.title.ur : podcast.title.en}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">
                        {isUrdu ? podcast.title.ur : podcast.title.en}
                      </h3>
                      <p className="text-gray-700 mb-3">
                        {isUrdu ? podcast.description.ur : podcast.description.en}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span>{isUrdu ? "دورانیہ" : "Duration"}: {podcast.duration}</span>
                        <span>
                          {podcast.publishedAt
                            ? new Date(podcast.publishedAt).toLocaleDateString(isUrdu ? "ur-PK" : "en-US")
                            : isUrdu ? "تاریخ دستیاب نہیں" : "Date not available"
                          }
                        </span>
                      </div>
                      <a
                        href={podcast.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-red-600 text-red-600 px-6 py-2 font-bold text-sm tracking-widest hover:bg-red-600 hover:text-white transition-colors inline-flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        {isUrdu ? "یوٹیوب پر دیکھیں" : "Watch on YouTube"}
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
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
        <section className="max-w-4xl mx-auto text-center mt-20 border-t border-gray-300 pt-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {isUrdu ? "ہمارے پوڈ کاسٹ کو سبسکرائب کریں" : "Subscribe to Our Podcasts"}
          </h3>
          <p className="text-gray-700 text-lg mb-8">
            {isUrdu
              ? "نئی اقساط کے لیے اپ ڈیٹ رہیں اور ہمارے پوڈ کاسٹ کو اپنے پسندیدہ پلیٹ فارم پر سنیں۔"
              : "Stay updated for new episodes and listen to our podcasts on your favorite platform."
            }
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="bg-red-600 text-white px-6 py-3 font-bold hover:bg-red-700 transition-colors rounded-lg inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169-.093-.363-.139-.56-.139-.506 0-.945.189-1.3.528-.283.27-.457.648-.457 1.058 0 .421.174.799.457 1.068.355.339.794.528 1.3.528.197 0 .391-.046.56-.139.474-.26.8-.781.8-1.457 0-.676-.326-1.197-.8-1.457zM12 2.4c4.899 0 8.88 3.981 8.88 8.88 0 .592-.06 1.168-.173 1.728-.077.382-.345.676-.709.676-.442 0-.766-.358-.766-.8 0-.103.008-.206.024-.308.09-.56.136-1.136.136-1.728 0-4.285-3.475-7.76-7.76-7.76s-7.76 3.475-7.76 7.76c0 .592.046 1.168.136 1.728.016.102.024.205.024.308 0 .442-.324.8-.766.8-.364 0-.632-.294-.709-.676C3.18 12.448 3.12 11.872 3.12 11.28c0-4.899 3.981-8.88 8.88-8.88z"/>
              </svg>
              YouTube
            </a>
            <a
              href="#"
              className="bg-black text-white px-6 py-3 font-bold hover:bg-gray-800 transition-colors rounded-lg"
            >
              Spotify
            </a>
            <a
              href="#"
              className="bg-black text-white px-6 py-3 font-bold hover:bg-gray-800 transition-colors rounded-lg"
            >
              Apple Podcasts
            </a>
            <a
              href="#"
              className="bg-black text-white px-6 py-3 font-bold hover:bg-gray-800 transition-colors rounded-lg"
            >
              Google Podcasts
            </a>
          </div>
        </section>
      </ScrollBasedAnimation>
    </main>
  );
}