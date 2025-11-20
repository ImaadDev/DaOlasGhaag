"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { usePathname, useParams } from "next/navigation";
import sanityClient from "@/lib/sanityClient";
import Link from "next/link";
import { Clock, Tag, Share2, Facebook, Twitter, Mail, ArrowRight, X } from "lucide-react"; // Added X for Twitter, Share2 for general share

// Mock Component for Spinner - assuming it's available
const Spinner = ({ size }) => <div className={`text-[#B80000] text-${size}`}>Loading...</div>;

export default function NewsDetails() {
  const params = useParams();
  const pathname = usePathname();
  const isUrdu = pathname.startsWith("/ur");

  const [newsItem, setNewsItem] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareOpen, setShareOpen] = useState(false); // For share dropdown
  const heroRef = useRef(null); // Ref for hero image parallax

  // Helper to safely handle localized content
  const getLocalizedContent = (obj) => {
    if (!obj) return "";
    return isUrdu ? obj.ur || obj : obj.en || obj;
  };

  useEffect(() => {
    async function fetchNews() {
      const query = `*[_type == "news" && slug.current == $slug][0]{
        title, summary, description, images[]{asset->{url, metadata{dimensions{width, height}}}},
        sections[]{title, content}, categories, publishedAt, author->{name, bio, image{asset->{url}}}
      }`;
      const data = await sanityClient.fetch(query, { slug: params.slug });
      setNewsItem(data);

      // Fetch related news based on categories
      if (data?.categories?.length > 0) {
        const relatedQuery = `*[_type == "news" && slug.current != $slug && isPublished == true && count(categories[@ in $categories]) > 0] | order(publishedAt desc)[0...3]{
          _id, title, summary, slug, publishedAt, images
        }`;
        const relatedData = await sanityClient.fetch(relatedQuery, {
          slug: params.slug,
          categories: data.categories
        });
        setRelatedNews(relatedData || []);
      }

      setLoading(false);
    }
    fetchNews();
  }, [params.slug]);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        // Simple parallax effect
        heroRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
        heroRef.current.style.opacity = 1 - scrollY / 1000; // Fade out slightly
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]); // Only attach after content is loaded

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="text-center py-40 text-2xl font-bold bg-white text-black">
        {isUrdu ? "خبر نہیں ملی" : "Article Not Found"}
      </div>
    );
  }

  // --- Content Interleaving Logic ---
  const contentBlocks = [];

  // 1. Add Summary as the first block (often treated as the lead paragraph/pull quote)
  if (getLocalizedContent(newsItem.summary)) {
    contentBlocks.push({ 
      type: 'summary', 
      content: getLocalizedContent(newsItem.summary) 
    });
  }

  // 2. Add Description as the second block (if distinct from summary)
  if (getLocalizedContent(newsItem.description)) {
    contentBlocks.push({ 
      type: 'description', 
      content: getLocalizedContent(newsItem.description) 
    });
  }

  // 3. Add Sections
  newsItem.sections?.forEach((section) => {
    contentBlocks.push({
      type: 'section',
      title: getLocalizedContent(section.title),
      content: getLocalizedContent(section.content),
    });
  });
  // -----------------------------------
  
  // Format published date
  const publishedDate = new Date(newsItem.publishedAt).toLocaleDateString(isUrdu ? "ur-PK" : "en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://yourwebsite.com/news-details'; // Fallback
  const shareTitle = getLocalizedContent(newsItem.title);

  return (
    <section className={`bg-white text-black min-h-screen relative ${isUrdu ? "rtl font-urdu" : "ltr font-sans"}`}>
      
      {/* --- 1. Hero Section: Full Width Image + Title Overlay --- */}
      <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
        {newsItem.images?.[0] && (
          <div ref={heroRef} className="absolute inset-0 transition-transform duration-500 ease-out opacity-100">
            <Image
              src={newsItem.images[0].asset.url}
              alt={getLocalizedContent(newsItem.title)}
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        )}
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent"></div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-7xl mx-auto text-white z-10">
          {/* Breadcrumb & Date */}
          <div className="flex items-center gap-2 text-xs md:text-sm uppercase tracking-widest mb-4">
            <Link href={isUrdu ? "/ur" : "/en"} className="hover:text-[#B80000] transition-colors">
              {isUrdu ? "ہوم" : "Home"}
            </Link>{" "}
            <ArrowRight className={`w-3 h-3 ${isUrdu ? "rotate-180" : ""}`} />
            <span className="text-[#B80000]">
              {getLocalizedContent(newsItem.categories?.[0]) || (isUrdu ? "خبر" : "News")}
            </span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mx-2 hidden md:inline-block"></span>
            <span className="flex items-center gap-1 text-gray-400 hidden md:flex">
              <Clock className="w-4 h-4" /> {publishedDate}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-7xl font-black uppercase leading-none tracking-tight mb-6 drop-shadow-lg">
            {getLocalizedContent(newsItem.title)}
          </h1>
          
          {/* Author / Metadata Below Title */}
          <div className="flex items-center gap-4 text-sm md:text-base text-gray-300">
            {newsItem.author && (
              <div className="flex items-center gap-2">
                {newsItem.author.image?.asset?.url && (
                  <Image
                    src={newsItem.author.image.asset.url}
                    alt={newsItem.author.name}
                    width={32}
                    height={32}
                    className="rounded-full border border-gray-600 object-cover"
                  />
                )}
                <span className="font-bold text-white">{newsItem.author.name}</span>
              </div>
            )}
            <span className="hidden md:inline-block text-gray-500">•</span>
            <div className="relative">
              <button 
                onClick={() => setShareOpen(!shareOpen)}
                className="flex items-center gap-2 bg-black/50 hover:bg-[#B80000] px-4 py-2 transition-colors text-white"
              >
                <Share2 className="w-4 h-4" />
                <span>{isUrdu ? "شیئر کریں" : "Share"}</span>
              </button>
              {shareOpen && (
                <div className={`absolute top-full mt-2 w-40 bg-black border border-gray-700 shadow-lg ${isUrdu ? "left-0" : "right-0"}`}>
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
                  >
                    <Facebook className="w-4 h-4" /> Facebook
                  </a>
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
                  >
                    <X className="w-4 h-4" /> Twitter
                  </a>
                  <a 
                    href={`mailto:?subject=${shareTitle}&body=${shareUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
                  >
                    <Mail className="w-4 h-4" /> Email
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- 2. Main Article Content Area --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-24">
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12">
          
          {/* Main Content Column (Larger part of the grid) */}
          <div className="lg:col-span-8">
            {contentBlocks.map((block, idx) => (
              <React.Fragment key={idx}>
                {/* Text Blocks */}
                {block.type === 'summary' && (
                  <p className={`text-xl md:text-2xl mb-10 leading-relaxed font-serif italic text-gray-800 border-l-4 border-[#B80000] pl-6 ${isUrdu ? "font-urdu" : "font-serif"}`}>
                    {block.content}
                  </p>
                )}

                {(block.type === 'description' || block.type === 'section') && (
                  <div className={`mb-10 ${block.type === 'section' ? 'pt-8 border-t border-gray-100 mt-8' : ''}`}>
                    {block.type === 'section' && (
                      <h2 className="text-3xl font-bold uppercase mb-6 tracking-tight text-gray-900">
                        {block.title}
                      </h2>
                    )}
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                      {block.content}
                    </p>
                  </div>
                )}

                {/* Dynamic Image Interleaving - Show images after every 2 text sections */}
                {newsItem.images && newsItem.images.length > 1 &&
                 idx >= 1 && idx % 2 === 1 && newsItem.images[Math.floor(idx / 2) + 1] && (
                    <figure className="my-12 w-full">
                      <div className="relative w-full aspect-[16/9] bg-gray-100 border border-gray-300 shadow-md">
                        <Image
                          src={newsItem.images[Math.floor(idx / 2) + 1].asset.url}
                          alt={`${getLocalizedContent(newsItem.title)} illustration ${Math.floor(idx / 2) + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="text-sm text-gray-600 mt-3 border-l-4 border-gray-200 pl-4">
                         {isUrdu ? `متعلقہ تصویر ${Math.floor(idx / 2) + 1}` : `Illustration: ${getLocalizedContent(newsItem.title)}`}
                      </figcaption>
                    </figure>
                  )
                }
              </React.Fragment>
            ))}
          </div>

          {/* Sidebar (Smaller part of the grid) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-8 h-fit bg-gray-50 p-6 border border-gray-200">
            <h3 className="text-lg font-bold uppercase tracking-widest text-[#B80000] mb-6 border-b border-gray-300 pb-2">
              {isUrdu ? "متعلقہ خبریں" : "Related Stories"}
            </h3>
            <ul className="space-y-4">
              {relatedNews.length > 0 ? (
                relatedNews.map((news) => (
                  <li key={news._id} className="pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
                    <Link
                      href={`/${isUrdu ? "ur" : "en"}/news/${news.slug.current}`}
                      className="block group"
                    >
                      {news.images?.[0] && (
                        <div className="relative w-full h-24 mb-2 overflow-hidden rounded">
                          <Image
                            src={news.images[0].asset.url}
                            alt={getLocalizedContent(news.title)}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <h4 className="text-base font-semibold leading-snug group-hover:text-[#B80000] transition-colors line-clamp-2">
                        {getLocalizedContent(news.title)}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {getLocalizedContent(news.summary)}
                      </p>
                      <span className="text-xs text-gray-400 mt-2 block">
                        {new Date(news.publishedAt).toLocaleDateString(isUrdu ? "ur-PK" : "en-US", {
                          month: "short",
                          day: "numeric"
                        })}
                      </span>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500">
                  {isUrdu ? "کوئی متعلقہ خبریں دستیاب نہیں" : "No related stories available"}
                </li>
              )}
            </ul>

         
          </aside>
        </article>
      </div>
    </section>
  );
}