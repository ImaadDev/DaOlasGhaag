"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { usePathname, useParams } from "next/navigation";
import sanityClient from "@/lib/sanityClient";
import Link from "next/link";
import { Clock, Tag, Share2, Facebook, Twitter, Mail, ArrowRight, X, User } from "lucide-react";

// Mock Component for Spinner - assuming it's available
const Spinner = ({ size = "lg", isUrdu = false }) => (
  <div className={`flex items-center justify-center text-[#B80000] h-full ${isUrdu ? 'flex-row-reverse' : ''}`}>
    <svg className={`animate-spin ${size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'} text-[#B80000]`} viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span className={`${isUrdu ? 'mr-3' : 'ml-3'}`}>{size === 'xl' ? (isUrdu ? 'مواد لوڈ ہو رہا ہے...' : 'Loading Content...') : (isUrdu ? 'لوڈ ہو رہا ہے...' : 'Loading...')}</span>
  </div>
);


// --- New: Article Block Renderer Component for better rich content styling ---
const ArticleBlock = ({ content, isUrdu, type, title }) => {
  const baseClasses = `text-gray-900 leading-relaxed ${isUrdu ? "font-urdu" : "font-serif"}`;

  // Simple Paragraph split for basic formatting (in a real app, you'd use a Sanity Portable Text Renderer)
  const paragraphs = content.split('\n').filter(p => p.trim() !== '');

  if (type === 'summary') {
    return (
      <div className={`mb-10 p-6 ${isUrdu ? 'border-r-4 border-r-[#B80000]' : 'border-l-4 border-l-[#B80000]'} bg-gray-50 shadow-inner`}>
        <p className={`text-xl md:text-2xl italic font-medium ${baseClasses} text-gray-700 ${isUrdu ? 'text-right' : 'text-left'}`}>
          {content}
        </p>
      </div>
    );
  }

  if (type === 'section' && title) {
    return (
      <div className="mt-12 mb-8 pt-4 border-t border-gray-200">
        <h2 className={`text-3xl font-extrabold uppercase mb-6 tracking-tight text-gray-900 border-b border-[#B80000] pb-2 ${isUrdu ? 'text-right' : 'text-left'}`}>
          {title}
        </h2>
        {paragraphs.map((p, i) => (
          <p key={i} className={`text-lg mb-6 ${baseClasses} text-gray-700 ${isUrdu ? 'text-right' : 'text-left'}`}>{p}</p>
        ))}
      </div>
    );
  }

  // description/plain content rendering
  return (
    <div className="mb-8">
      {paragraphs.map((p, i) => (
        <p key={i} className={`text-lg mb-6 ${baseClasses} text-gray-700 ${isUrdu ? 'text-right' : 'text-left'}`}>{p}</p>
      ))}
    </div>
  );
};
// -----------------------------------------------------------------------------


export default function NewsDetails() {
  const params = useParams();
  const pathname = usePathname();
  const isUrdu = pathname.startsWith("/ur");

  const [newsItem, setNewsItem] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);
  const heroRef = useRef(null);

  // Helper to safely handle localized content
  const getLocalizedContent = (obj) => {
    if (!obj) return "";
    return isUrdu ? obj.ur || obj : obj.en || obj;
  };

  // Helper to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  useEffect(() => {
    async function fetchNews() {
      try {
        const query = `*[_type == "news" && slug.current == $slug][0]{
          title, summary, description, images[]{asset->{url, metadata{dimensions{width, height}}}},
          sections[]{title, content}, categories, publishedAt, author->{name, bio, image{asset->{url}}}, videoUrl
        }`;
        const data = await sanityClient.fetch(query, { slug: params.slug });
        setNewsItem(data);

        // Fetch related news based on categories
        if (data?.categories?.length > 0) {
          const relatedQuery = `*[_type == "news" && slug.current != $slug && isPublished == true && count(categories[@ in $categories]) > 0] | order(publishedAt desc)[0...4]{
            _id, title, summary, slug, publishedAt, images
          }`;
          const relatedData = await sanityClient.fetch(relatedQuery, {
            slug: params.slug,
            categories: data.categories
          });
          setRelatedNews(relatedData || []);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [params.slug]);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        // Subtle parallax and fade out
        heroRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
        heroRef.current.style.opacity = Math.max(0.4, 1 - scrollY / 1000); 
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-black">
        <Spinner size="xl" isUrdu={isUrdu} />
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

  // 1. Add Summary (Lead/Pull Quote)
  const summaryContent = getLocalizedContent(newsItem.summary);
  if (summaryContent) {
    contentBlocks.push({ type: 'summary', content: summaryContent });
  }

  // 2. Add Description (Main body start)
  const descriptionContent = getLocalizedContent(newsItem.description);
  if (descriptionContent) {
    contentBlocks.push({ type: 'description', content: descriptionContent });
  }

  // 3. Add Sections
  newsItem.sections?.forEach((section) => {
    const content = getLocalizedContent(section.content);
    const title = getLocalizedContent(section.title);
    if (content) {
      contentBlocks.push({
        type: 'section',
        title: title,
        content: content,
      });
    }
  });
  // -----------------------------------
  
  // Format published date
  const publishedDate = new Date(newsItem.publishedAt).toLocaleDateString(isUrdu ? "ur-PK" : "en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC' // Important for consistent date display
  });

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://yourwebsite.com/news-details'; 
  const shareTitle = getLocalizedContent(newsItem.title);
  const primaryImage = newsItem.images?.[0]?.asset?.url;

  return (
    <section className={`bg-white text-black min-h-screen relative ${isUrdu ? "rtl font-urdu" : "ltr font-sans"}`}>
      
      {/* --- 1. Hero Section: Image Background + Title/Metadata --- */}
      <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-gray-900">
        {primaryImage && (
          <div ref={heroRef} className="absolute inset-0 transition-transform duration-500 ease-out">
            <Image
              src={primaryImage}
              alt={shareTitle}
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        )}
        {/* Dark Overlay for Text Readability - Stronger Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-black/40"></div> {/* Uniform dark tint */}

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-7xl mx-auto text-white z-10">
          
          {/* Breadcrumb & Date Block (Top Line) */}
          <div className={`flex items-center gap-2 text-xs md:text-sm uppercase tracking-widest mb-4 ${isUrdu ? 'border-r-4 border-r-[#B80000] pr-3 flex-row-reverse' : 'border-l-4 border-l-[#B80000] pl-3'}`}>
            <Link href={isUrdu ? "/ur" : "/en"} className="hover:text-white transition-colors text-gray-300">
              {isUrdu ? "ہوم" : "Home"}
            </Link>{" "}
            <ArrowRight className={`w-3 h-3 text-gray-500 ${isUrdu ? "rotate-180" : ""}`} />
            <span className="font-bold text-[#B80000]">
              {getLocalizedContent(newsItem.categories?.[0]) || (isUrdu ? "خبر" : "News")}
            </span>
          </div>

          {/* Main Title - Extremely Bold and Large */}
          <h1 className="text-4xl md:text-7xl font-extrabold uppercase leading-tight tracking-tighter mb-8 drop-shadow-2xl">
            {shareTitle}
          </h1>
          
          {/* Author / Date / Share Metadata Bar */}
          <div className={`flex flex-col md:flex-row md:items-center gap-4 text-sm md:text-base text-gray-300 border-t border-b border-gray-700 py-3 ${isUrdu ? 'md:flex-row-reverse' : ''}`}>

            {/* Author */}
            {newsItem.author && (
              <div className={`flex items-center gap-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                {newsItem.author.image?.asset?.url ? (
                  <Image
                    src={newsItem.author.image.asset.url}
                    alt={newsItem.author.name}
                    width={40}
                    height={40}
                    className="border-2 border-[#B80000] object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-[#B80000]" />
                )}
                <span className="font-bold text-white uppercase tracking-wider">{newsItem.author.name}</span>
              </div>
            )}

            <span className="hidden md:inline-block text-gray-500 text-xl font-light">|</span>

            {/* Date */}
            <span className={`flex items-center gap-2 text-gray-400 ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <Clock className="w-5 h-5 text-[#B80000]" />
              {publishedDate}
            </span>

            <span className="hidden md:inline-block text-gray-500 text-xl font-light">|</span>

            {/* Share Button with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShareOpen(!shareOpen)}
                className={`flex items-center gap-2 bg-[#B80000] hover:bg-red-800 px-4 py-2 transition-colors text-white uppercase font-bold text-xs ${isUrdu ? 'flex-row-reverse' : ''}`}
              >
                <Share2 className="w-4 h-4" />
                <span>{isUrdu ? "شیئر کریں" : "Share Article"}</span>
              </button>
              {shareOpen && (
                <div className={`absolute top-full mt-2 w-40 bg-black border border-[#B80000] shadow-2xl z-20 ${isUrdu ? "left-0" : "right-0"}`}>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-[#B80000] transition-colors ${isUrdu ? 'flex-row-reverse' : ''}`}
                  >
                    <Facebook className="w-4 h-4" /> Facebook
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-[#B80000] transition-colors ${isUrdu ? 'flex-row-reverse' : ''}`}
                  >
                    <X className="w-4 h-4" /> Twitter
                  </a>
                  <a
                    href={`mailto:?subject=${shareTitle}&body=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-[#B80000] transition-colors ${isUrdu ? 'flex-row-reverse' : ''}`}
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
        <article className={`grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12 ${isUrdu ? 'lg:grid-flow-col-dense' : ''}`}>

          {/* Main Content Column (Larger part of the grid) */}
          <div className={`lg:col-span-8 ${isUrdu ? 'lg:col-start-5' : ''}`}>
            {contentBlocks.map((block, idx) => (
              <React.Fragment key={idx}>
                
                {/* Text Blocks using the new Renderer */}
                <ArticleBlock 
                  content={block.content} 
                  isUrdu={isUrdu} 
                  type={block.type} 
                  title={block.title} 
                />

                {/* Dynamic Image Interleaving - Show images after summary and then after every 2 content blocks */}
                {newsItem.images && newsItem.images.length > 1 &&
                 (idx === 0 || (idx >= 1 && idx % 2 === 1)) && newsItem.images[Math.floor(idx / 2) + 1] && (
                    <figure className="my-12 w-full border border-gray-300 shadow-xl">
                      <div className="relative w-full aspect-[16/9] bg-gray-100">
                        <Image
                          src={newsItem.images[Math.floor(idx / 2) + 1].asset.url}
                          alt={`${shareTitle} illustration ${Math.floor(idx / 2) + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="text-sm text-gray-600 mt-3 p-3 bg-gray-50 border-t border-gray-200">
                         {isUrdu ? `تصویر: ${shareTitle} - متعلقہ منظر ${Math.floor(idx / 2) + 1}` : `Illustration: ${shareTitle} - Related View ${Math.floor(idx / 2) + 1}`}
                      </figcaption>
                    </figure>
                  )
                }
              </React.Fragment>

              
            ))}

          {/* --- Video Section (If available, placed after main content flow) --- */}
          {newsItem.videoUrl && (
            <div className="mt-16 pt-8 border-t-8 border-t-gray-900 shadow-2xl bg-gray-900 text-white">

              {/* Video Header */}
              <div className={`px-6 py-4 bg-[#B80000] flex items-center gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                <h3 className="text-2xl font-bold uppercase">
                  {isUrdu ? "ویڈیو تجزیہ" : "Video Analysis"}
                </h3>
              </div>

              {/* Video Player */}
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(newsItem.videoUrl)}?rel=0&modestbranding=1&showinfo=0`}
                  title={shareTitle}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              {/* Video Info Footer */}
              <div className={`p-6 ${isUrdu ? 'text-right' : 'text-left'}`}>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {isUrdu ? "اس ویڈیو میں اس خبر کے بارے میں مزید تفصیلات اور ماہرین کا تجزیہ شامل ہے۔" : "Watch the expert discussion and detailed coverage related to this news story."}
                </p>
                <a
                  href={newsItem.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-3 inline-flex items-center gap-2 text-[#B80000] hover:text-white border-b-2 border-transparent hover:border-[#B80000] transition-colors font-medium text-sm ${isUrdu ? 'flex-row-reverse' : ''}`}
                >
                  {isUrdu ? "یوٹیوب پر مکمل دیکھیں" : "View Full Video on YouTube"}
                  <ArrowRight className={`w-3 h-3 ${isUrdu ? "rotate-180" : ""}`} />
                </a>
              </div>
            </div>
          )}
           
          </div>

          

          {/* Sidebar (Smaller part of the grid) */}
          <aside className={`lg:col-span-4 lg:sticky lg:top-8 h-fit bg-gray-50 ${isUrdu ? 'border-r-4 border-r-[#B80000] lg:col-start-1' : 'border-l-4 border-l-[#B80000]'} p-6 shadow-lg`}>
            
            {/* Category / Author Bio Block */}
            <div className="mb-8 pb-4 border-b border-gray-300">
                <h3 className="text-lg font-bold uppercase tracking-wider text-gray-800 mb-2">
                    {isUrdu ? "زمرہ" : "Category"}
                </h3>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#B80000] text-white text-sm font-semibold">
                    <Tag className="w-4 h-4" />
                    {getLocalizedContent(newsItem.categories?.[0]) || (isUrdu ? "عام" : "General")}
                </span>
            </div>

            {/* Related Stories Block */}
            <h3 className="text-xl font-bold uppercase tracking-widest text-gray-900 mb-6 border-b border-gray-900 pb-2">
              {isUrdu ? "متعلقہ خبریں" : "More Related Stories"}
            </h3>
            <ul className="space-y-6">
              {relatedNews.length > 0 ? (
                relatedNews.map((news) => (
                  <li key={news._id} className="pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
                    <Link
                      href={`/${isUrdu ? "ur" : "en"}/news/${news.slug.current}`}
                      className="block group"
                    >
                      <div className={`flex items-start gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                        {news.images?.[0] && (
                          <div className="relative w-20 h-20 flex-shrink-0 border border-gray-200">
                            <Image
                              src={news.images[0].asset.url}
                              alt={getLocalizedContent(news.title)}
                              fill
                              className="object-cover object-center group-hover:opacity-80 transition-opacity duration-300"
                            />
                          </div>
                        )}
                        <div className={`flex-1 ${isUrdu ? 'text-right' : 'text-left'}`}>
                          <h4 className="text-base font-semibold leading-snug group-hover:text-[#B80000] transition-colors line-clamp-3">
                            {getLocalizedContent(news.title)}
                          </h4>
                          <span className="text-xs text-gray-500 mt-1 block">
                            {new Date(news.publishedAt).toLocaleDateString(isUrdu ? "ur-PK" : "en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </span>
                        </div>
                      </div>
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