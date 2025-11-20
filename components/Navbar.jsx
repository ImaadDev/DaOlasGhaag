"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Search, Globe, TrendingUp, PlayCircle, Mic, FileText, Mail } from "lucide-react";
import sanityClient from "@/lib/sanityClient";

// --- Hooks & Utilities ---

const usePathnameSimulation = () => {
  const [pathname, setPathname] = useState('/');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname || '/');
    }
  }, []);
  return pathname;
};

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const updatePosition = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", updatePosition);
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);
  return scrollPosition;
};

export default function Navbar() {
  const pathname = usePathnameSimulation();
  const scrollPosition = useScrollPosition();
  const isUrdu = pathname.startsWith("/ur");

  // UI States
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'news' | 'more' | null
  const [latestNews, setLatestNews] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => window.innerWidth >= 1024 && setMobileOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchOpen && !event.target.closest('.search-container')) {
        setSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    };

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileOpen]);

  // Fetch latest news for ticker
  useEffect(() => {
    async function fetchLatestNews() {
      try {
        const query = `*[_type == "news" && isPublished == true] | order(publishedAt desc)[0...5] {
          _id,
          title,
          slug
        }`;
        const data = await sanityClient.fetch(query);
        setLatestNews(data || []);
      } catch (error) {
        console.error("Error fetching latest news:", error);
        setLatestNews([]);
      }
    }
    fetchLatestNews();
  }, []);

  // Fetch trending news for dropdown
  useEffect(() => {
    async function fetchTrendingNews() {
      try {
        const query = `*[_type == "news" && isPublished == true] | order(publishedAt desc)[0...4] {
          _id,
          title,
          slug
        }`;
        const data = await sanityClient.fetch(query);
        setTrendingNews(data || []);
      } catch (error) {
        console.error("Error fetching trending news:", error);
        setTrendingNews([]);
      }
    }
    fetchTrendingNews();
  }, []);

  // Handle search functionality
  useEffect(() => {
    const performSearch = async (query) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const searchQuery = `*[_type == "news" && isPublished == true && (
          title.en match "*${query}*" ||
          title.ur match "*${query}*" ||
          summary.en match "*${query}*" ||
          summary.ur match "*${query}*"
        )] | order(publishedAt desc)[0...5] {
          _id,
          title,
          summary,
          slug,
          publishedAt
        }`;
        const data = await sanityClient.fetch(searchQuery);
        setSearchResults(data || []);
      } catch (error) {
        console.error("Error searching news:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300); // 300ms debounce

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // --- Localization Data ---
  const navText = isUrdu
    ? {
        home: "ہوم",
        news: "خبریں",
        videos: "ویڈیوز",
        more: "مزید",
        latest: "تازہ ترین",
        trending: "رجحانات",
        searchPlaceholder: "خبر تلاش کریں...",
        pakistan: "پاکستان",
        world: "عالم",
        business: "کاروبار",
        technology: "ٹیکنالوجی",
        ai: "مصنوعی ذہانت",
        health: "صحت",
        climate: "ماحولیات",
        sports: "کھیل",
        entertainment: "تفریح",
        factCheck: "فیکٹ چیک",
        aboutUs: "ہمارے بارے میں",
        contact: "رابطہ کریں",
        archives: "آرکائیوز",
        newsletter: "نیوز لیٹر",
        podcasts: "پوڈ کاسٹ",
        subscribe: "سبسکرائب کریں",
        logo1: "دا اولس",
        logo2: "غگ",
      }
    : {
        home: "HOME",
        news: "NEWS",
        videos: "VIDEOS",
        more: "MORE",
        latest: "LATEST",
        trending: "TRENDING",
        searchPlaceholder: "Search news...",
        pakistan: "PAKISTAN",
        world: "WORLD",
        business: "BUSINESS",
        technology: "TECHNOLOGY",
        ai: "AI",
        health: "HEALTH",
        climate: "CLIMATE",
        sports: "SPORTS",
        entertainment: "ENTERTAINMENT",
        factCheck: "FACT CHECK",
        aboutUs: "ABOUT US",
        contact: "CONTACT",
        archives: "ARCHIVES",
        newsletter: "NEWSLETTER",
        podcasts: "PODCASTS",
        subscribe: "SUBSCRIBE",
        logo1: "DA OLASS",
        logo2: "GHAG",
      };

  const newsCategories = [
    { name: navText.pakistan, path: "/pk-news" },
    { name: navText.world, path: "/world-news" },
    { name: navText.business, path: "/business-news" },
    { name: navText.technology, path: "/tech-news" },
    { name: navText.ai, path: "/ai-news" },
    { name: navText.health, path: "/health-news" },
    { name: navText.climate, path: "/climate-news" },
    { name: navText.sports, path: "/sports-news" },
    { name: navText.entertainment, path: "/showbiz-news" },
    { name: navText.factCheck, path: "/fact-check" },
  ];

  const moreLinks = [
    { name: navText.archives, path: "/archives", icon: FileText },
    { name: navText.podcasts, path: "/podcasts", icon: Mic },
    { name: navText.newsletter, path: "/newsletter", icon: Mail },
    { name: navText.subscribe, path: "/subscribe", icon: PlayCircle },
  ];

  const getLocalizedPath = (path) => {
    const basePath = path.replace(/^\/(en|ur)/, '');
    return isUrdu ? `/ur${basePath}` : `/en${basePath}`;
  };

  // --- Sub-Components ---

  // 1. The Breaking News Ticker
  const Ticker = () => (
    <div className="bg-black text-white text-xs md:text-sm py-2 overflow-hidden flex items-center relative z-50 border-b border-gray-800">
      <div className={`px-4 font-bold bg-[#B80000] h-full absolute top-0 flex items-center z-10 uppercase tracking-wider ${isUrdu ? "right-0 pl-6" : "left-0 pr-6"}`}>
        {navText.latest}
      </div>
      <div className="whitespace-nowrap animate-marquee flex items-center gap-12 px-4 w-full">
        {latestNews.length > 0 ? (
          latestNews.map((news, index) => (
            <a
              key={news._id}
              href={getLocalizedPath(`/news/${news.slug.current}`)}
              className="inline-flex items-center gap-2 hover:text-[#B80000] transition-colors no-underline"
            >
              <span className="w-2 h-2 bg-[#B80000] rounded-full animate-pulse"></span>
              {isUrdu ? news.title.ur : news.title.en}
            </a>
          ))
        ) : (
          <>
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-[#B80000] rounded-full animate-pulse"></span>
              {isUrdu ? "تازہ ترین خبریں لوڈ ہو رہی ہیں..." : "Loading latest news..."}
            </span>
          </>
        )}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );

  // 2. Language Switcher (Compact)
  const CompactLangSwitcher = () => {
    const toggleLang = () => {
      const newLang = isUrdu ? "en" : "ur";
      const newPath = pathname.replace(/^\/(en|ur)/, `/${newLang}`);
      window.location.href = newPath === pathname ? `/${newLang}` : newPath;
    };

    return (
      <button 
        onClick={toggleLang}
        className="flex items-center gap-2 text-xs font-bold border border-gray-300 px-3 py-1 hover:bg-black hover:text-white transition-all uppercase tracking-wider"
      >
        <Globe className="w-3 h-3" />
        {isUrdu ? "English" : "اردو"}
      </button>
    );
  };

  // --- Render ---

  return (
    <header className={`font-sans ${isUrdu ? "rtl" : "ltr"}`}>
      {/* Top Ticker */}
      <Ticker />

      {/* Main Navigation Container */}
      <div className={`bg-white transition-all duration-300 border-b border-gray-200 ${scrollPosition > 50 ? "shadow-md sticky top-0 z-40" : "relative"}`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          
          {/* Header Row */}
          <div className="flex items-center justify-between h-20 md:h-24">
            
            {/* Left: Hamburger (Mobile) or Date (Desktop) */}
            <div className="flex-1 flex items-center justify-start">
              <button 
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 -ml-2 hover:bg-gray-100 text-black transition-colors"
              >
                <Menu className="w-8 h-8" />
              </button>
              
              <div className="hidden lg:flex flex-col text-xs font-medium text-gray-500 uppercase tracking-wider border-l-2 border-[#B80000] pl-3">
                <span className="text-black font-bold block">
                  {new Date().toLocaleDateString(isUrdu ? "ur-PK" : "en-US", { weekday: 'long' })}
                </span>
                <span>
                  {new Date().toLocaleDateString(isUrdu ? "ur-PK" : "en-US", { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Center: Logo */}
            <div className="flex-shrink-0 group cursor-pointer">
               <a href={getLocalizedPath("/")} className="flex flex-col items-center justify-center">
                 <div className="flex items-center gap-3">
                    {/* Actual Logo Image */}
                    <div className="relative w-12 h-12 md:w-14 md:h-14 transition-transform duration-300 group-hover:scale-105">
                       <img src="/logo.png" alt="Logo" className="object-contain w-full h-full" />
                    </div>
                    <div className="hidden md:flex flex-col items-start">
                        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">
                            {navText.logo1}
                            <span className="text-[#B80000] ml-1">.</span>
                        </h1>
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 w-full text-justify">
                            {navText.logo2}
                        </span>
                    </div>
                 </div>
               </a>
            </div>

            {/* Right: Actions */}
            <div className="flex-1 flex items-center justify-end gap-4 md:gap-6">
               <div className="hidden md:block">
                 <CompactLangSwitcher />
               </div>
               
               {/* Expanding Search */}
               <div className={`search-container relative flex items-center ${searchOpen ? "bg-gray-100" : ""} transition-colors duration-300`}>
                  <input
                    type="text"
                    placeholder={navText.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`bg-transparent border-none outline-none text-sm px-3 transition-all duration-300 ${searchOpen ? "w-32 md:w-48 opacity-100" : "w-0 opacity-0"}`}
                  />
                  <button
                    onClick={() => {
                      setSearchOpen(!searchOpen);
                      if (searchOpen) {
                        setSearchQuery('');
                        setSearchResults([]);
                      }
                    }}
                    className="p-2 hover:text-[#B80000] transition-colors"
                  >
                    <Search className="w-5 h-5" />
                  </button>

                  {/* Search Results Dropdown */}
                  {searchOpen && (searchQuery.trim() || searchResults.length > 0) && (
                    <div className="absolute top-full right-0 mt-2 w-80 max-w-sm bg-white shadow-2xl border border-gray-200 rounded-lg z-50 max-h-96 overflow-y-auto">
                      {isSearching ? (
                        <div className="p-4 text-center text-gray-500">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#B80000] mx-auto mb-2"></div>
                          {isUrdu ? "تلاش کر رہے ہیں..." : "Searching..."}
                        </div>
                      ) : searchResults.length > 0 ? (
                        <div className="py-2">
                          {searchResults.map((result) => (
                            <a
                              key={result._id}
                              href={getLocalizedPath(`/news/${result.slug.current}`)}
                              className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                              onClick={() => {
                                setSearchOpen(false);
                                setSearchQuery('');
                                setSearchResults([]);
                              }}
                            >
                              <h4 className="font-medium text-sm text-gray-900 line-clamp-1">
                                {isUrdu ? result.title.ur : result.title.en}
                              </h4>
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                {isUrdu ? result.summary?.ur : result.summary?.en}
                              </p>
                              <span className="text-xs text-gray-400 mt-1 block">
                                {new Date(result.publishedAt).toLocaleDateString(isUrdu ? "ur-PK" : "en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric"
                                })}
                              </span>
                            </a>
                          ))}
                        </div>
                      ) : searchQuery.trim() ? (
                        <div className="p-4 text-center text-gray-500">
                          {isUrdu ? "کوئی نتائج نہیں ملے" : "No results found"}
                        </div>
                      ) : null}
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* Desktop Nav Links Row */}
          <div className="hidden lg:flex items-center justify-center border-t border-gray-100 h-14">
            <nav className="flex items-center gap-8">
              
              <NavLink href={getLocalizedPath("/")} text={navText.home} isActive={pathname === getLocalizedPath("/")} />
              
              {/* News Mega-Menu Trigger */}
              <div 
                className="relative h-full flex items-center group"
                onMouseEnter={() => setActiveDropdown('news')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`flex items-center gap-1 text-sm font-bold uppercase tracking-widest hover:text-[#B80000] transition-colors h-full border-b-2 ${activeDropdown === 'news' ? 'border-[#B80000] text-[#B80000]' : 'border-transparent text-black'}`}>
                  {navText.news}
                  <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'news' ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Mega Dropdown Panel */}
                <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white shadow-2xl border-t-4 border-[#B80000] transition-all duration-300 z-50 grid grid-cols-12 gap-0 ${activeDropdown === 'news' ? "opacity-100 visible mt-0" : "opacity-0 invisible mt-4"}`}>
                  <div className="col-span-4 p-6 bg-gray-50">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-200 pb-2">{navText.trending}</h4>
                    <ul className="space-y-3">
                      {trendingNews.length > 0 ? (
                        trendingNews.map((news) => (
                          <li key={news._id}>
                            <a href={getLocalizedPath(`/news/${news.slug.current}`)} className="flex items-center gap-2 text-sm font-medium hover:text-[#B80000] hover:translate-x-1 transition-all line-clamp-2">
                              <TrendingUp className="w-3 h-3 text-[#B80000] flex-shrink-0" />
                              <span className="line-clamp-2">{isUrdu ? news.title.ur : news.title.en}</span>
                            </a>
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-gray-500">
                          {isUrdu ? "کوئی رجحان سازی خبریں دستیاب نہیں" : "No trending news available"}
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="col-span-8 p-6 grid grid-cols-2 gap-4">
                    {newsCategories.map((cat) => (
                        <a key={cat.path} href={getLocalizedPath(cat.path)} className="block text-sm font-medium text-gray-600 hover:text-black hover:underline decoration-[#B80000] decoration-2 underline-offset-4 transition-all">
                            {cat.name}
                        </a>
                    ))}
                  </div>
                </div>
              </div>

              <NavLink href={getLocalizedPath("/videos")} text={navText.videos} isActive={pathname.includes("/videos")} />

              {/* "More" Dropdown */}
              <div 
                className="relative h-full flex items-center group"
                onMouseEnter={() => setActiveDropdown('more')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`flex items-center gap-1 text-sm font-bold uppercase tracking-widest hover:text-[#B80000] transition-colors h-full border-b-2 ${activeDropdown === 'more' ? 'border-[#B80000] text-[#B80000]' : 'border-transparent text-black'}`}>
                  {navText.more}
                  <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'more' ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white shadow-2xl border-t-4 border-[#B80000] transition-all duration-300 z-50 ${activeDropdown === 'more' ? "opacity-100 visible mt-0" : "opacity-0 invisible mt-4"}`}>
                  <div className="p-4 space-y-2">
                     {moreLinks.map((link) => (
                        <a key={link.path} href={getLocalizedPath(link.path)} className="flex items-center gap-3 p-2 hover:bg-gray-50 transition-colors group/item">
                            <link.icon className="w-4 h-4 text-gray-400 group-hover/item:text-[#B80000]" />
                            <span className="text-sm font-medium text-gray-700 group-hover/item:text-black">{link.name}</span>
                        </a>
                     ))}
                  </div>
                </div>
              </div>

              <NavLink href={getLocalizedPath("/about")} text={navText.aboutUs} isActive={pathname.includes("/about")} />
              <NavLink href={getLocalizedPath("/contact")} text={navText.contact} isActive={pathname.includes("/contact")} />
              
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Full-Screen Menu Overlay */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity duration-300 lg:hidden ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setMobileOpen(false)}>
        <div 
          className={`fixed top-0 ${isUrdu ? "right-0" : "left-0"} w-[85%] max-w-sm h-full bg-white shadow-2xl transform transition-transform duration-500 ease-out ${mobileOpen ? "translate-x-0" : (isUrdu ? "translate-x-full" : "-translate-x-full")}`}
          onClick={(e) => e.stopPropagation()} 
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                <span className="font-black text-xl tracking-tight">{navText.logo1}</span>
            </div>
            <button onClick={() => setMobileOpen(false)} className="p-2 bg-gray-100 rounded-none hover:bg-[#B80000] hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Content */}
          <div className="overflow-y-auto h-[calc(100vh-80px)] p-6 pb-20">
            <div className="flex flex-col space-y-6">
               <a href={getLocalizedPath("/")} className="text-xl font-black uppercase hover:text-[#B80000]">{navText.home}</a>
               
               {/* News Section */}
               <div>
                 <div className="text-xl font-black uppercase text-gray-400 mb-3 border-b border-gray-100 pb-1">{navText.news}</div>
                 <div className="grid grid-cols-1 gap-3 pl-2">
                    {newsCategories.map(cat => (
                        <a key={cat.path} href={getLocalizedPath(cat.path)} className="text-base font-medium text-gray-700 hover:text-[#B80000] flex items-center gap-2">
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span> {cat.name}
                        </a>
                    ))}
                 </div>
               </div>

               <a href={getLocalizedPath("/videos")} className="text-xl font-black uppercase hover:text-[#B80000]">{navText.videos}</a>
               
               {/* More Section */}
               <div>
                 <div className="text-xl font-black uppercase text-gray-400 mb-3 border-b border-gray-100 pb-1">{navText.more}</div>
                 <div className="grid grid-cols-1 gap-3 pl-2">
                    {moreLinks.map(link => (
                        <a key={link.path} href={getLocalizedPath(link.path)} className="text-base font-medium text-gray-700 hover:text-[#B80000] flex items-center gap-2">
                            <link.icon className="w-3 h-3" /> {link.name}
                        </a>
                    ))}
                 </div>
               </div>

               <a href={getLocalizedPath("/about")} className="text-xl font-black uppercase hover:text-[#B80000]">{navText.aboutUs}</a>
               <a href={getLocalizedPath("/contact")} className="text-xl font-black uppercase hover:text-[#B80000]">{navText.contact}</a>
               
               <div className="pt-8 border-t border-gray-100">
                 <div className="flex justify-center mb-6">
                    <CompactLangSwitcher />
                 </div>
                 <p className="text-center text-xs text-gray-400 uppercase tracking-widest">
                    &copy; 2025 {navText.logo1} {navText.logo2}
                 </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// --- Helper for Desktop Links ---
const NavLink = ({ href, text, isActive }) => (
  <a 
    href={href}
    className={`
      relative py-4 text-sm font-bold uppercase tracking-widest transition-colors duration-300
      ${isActive ? "text-[#B80000]" : "text-black hover:text-[#B80000]"}
    `}
  >
    {text}
    {/* Animated Underline */}
    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#B80000] transform transition-transform duration-300 origin-left ${isActive ? "scale-x-100" : "scale-x-0 hover:scale-x-100"}`}></span>
  </a>
);