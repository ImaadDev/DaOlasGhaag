"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Search } from "lucide-react";

// NOTE: Next.js dependencies (usePathname, Link, Image) cannot be resolved.
// We are using standard React features (useState, useEffect) and native HTML elements
// to make the component runnable, testable, and maintain the functionality.

/**
 * Custom hook to simulate usePathname by reading window.location.pathname.
 */
const usePathnameSimulation = () => {
  const [pathname, setPathname] = useState('/');
  
  useEffect(() => {
    // Check if running in a browser environment
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname || '/');
    }
  }, []);
  
  return pathname;
};

// Simplified LanguageSwitcher for embedding since its import path is now local and complex
const LanguageSwitcher = () => {
  const pathname = usePathnameSimulation();
  const currentLocale = pathname.startsWith("/ur") ? "ur" : "en";

  const getPath = (locale) => {
    if (!pathname || pathname === "/") return `/${locale}`;
    const hasLocalePrefix = /^\/(en|ur)/.test(pathname);
    if (hasLocalePrefix) {
      return pathname.replace(/^\/(en|ur)/, `/${locale}`);
    } else {
      return `/${locale}${pathname}`;
    }
  };

  return (
    // Reusing the creative red/white/no-shadow design from the previous file
    <div className="flex items-center gap-0 bg-white border-2 border-red-700 font-sans">
      <a
        href={getPath("en")}
        className={`
          px-4 py-2 text-base font-extrabold transition-all duration-300 ease-in-out cursor-pointer 
          border-r-2 border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500
          ${
            currentLocale === "en"
              ? "bg-red-700 text-white" 
              : "text-red-700 hover:bg-red-50" 
          }
        `}
      >
        ENGLISH
      </a>
      <a
        href={getPath("ur")}
        className={`
          px-4 py-2 text-base font-extrabold transition-all duration-300 ease-in-out cursor-pointer 
          focus:outline-none focus:ring-2 focus:ring-red-500
          ${
            currentLocale === "ur"
              ? "bg-red-700 text-white" 
              : "text-red-700 hover:bg-red-50" 
          }
        `}
        lang="ur"
        dir="rtl"
      >
        اردو
      </a>
    </div>
  );
};


export default function Navbar() {
  const pathname = usePathnameSimulation();
  const isUrdu = pathname.startsWith("/ur");

  const [mobileOpen, setMobileOpen] = useState(false);
  const [newsDropdown, setNewsDropdown] = useState(false);
  const [moreDropdown, setMoreDropdown] = useState(false);
  const [mobileNewsOpen, setMobileNewsOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  // Updated navigation text to ensure English is capitalized
  const navText = isUrdu
    ? {
        home: "ہوم",
        news: "خبریں",
        videos: "ویڈیوز",
        more: "مزید",
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
    { name: navText.aboutUs, path: "/about" },
    { name: navText.contact, path: "/contact" },
    { name: navText.archives, path: "/archives" },
    { name: navText.podcasts, path: "/podcasts" },
  ];
  
  // Utility function to generate full paths with locale prefix
  const getLocalizedPath = (path) => {
      // Logic from LanguageSwitcher's getPath, simplified for a general utility
      const basePath = path.replace(/^\/(en|ur)/, '');
      return isUrdu ? `/ur${basePath}` : `/en${basePath}`;
  };

  return (
    <nav dir={isUrdu ? "rtl" : "ltr"} className="bg-white border-b-4 border-red-700 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className={`max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between text-xs md:text-sm ${isUrdu ? "md:flex-row-reverse" : ""}`}>
          <div className="flex items-center gap-2 text-gray-700 font-medium tracking-wider">
            {/* Date Display */}
            <span className="uppercase">
              {new Date().toLocaleDateString(isUrdu ? "ur-PK" : "en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className={`mt-2 md:mt-0 flex items-center gap-4 ${isUrdu ? "flex-row-reverse" : ""}`}>
            {/* Language Switcher (Embedded fixed version) */}
            <LanguageSwitcher />
            
          
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className={`flex items-center justify-between h-20 ${isUrdu ? "flex-row-reverse" : ""}`}>
          {/* Logo (Added scale and shadow on hover for creativity) */}
          <a 
            href={isUrdu ? "/ur" : "/"} 
            className="flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg rounded-sm"
          >
            {/* Replacing Next/Image with native <img> */}
            <div className="relative w-14 h-14 flex-shrink-0">
              <img src="/logo.png" alt="Da Olass Ghag Logo" className="object-contain w-full h-full" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter text-black hover:text-red-700 transition">
              {navText.logo1} <span className="bg-red-700 text-white px-2 py-0.5 ml-0.5 inline-block">{navText.logo2}</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 h-full">
            <NavLink isUrdu={isUrdu} currentPath={pathname} path={isUrdu ? "/ur" : "/"} text={navText.home} />

            {/* News Dropdown */}
            <div
              className="relative flex items-center h-full"
              onMouseEnter={() => setNewsDropdown(true)}
              onMouseLeave={() => setNewsDropdown(false)}
            >
              <button className="flex items-center gap-1 font-bold text-sm uppercase text-black hover-red-underline transition-all duration-300">
                {navText.news}{" "}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${newsDropdown ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`absolute top-full ${isUrdu ? "right-0" : "left-0"} mt-0.5 w-64 bg-white border-2 border-red-700 overflow-hidden transition-all duration-300 ease-in-out origin-top ${
                  newsDropdown ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-0 invisible"
                }`}
              >
                {newsCategories.map(({ name, path }) => (
                  <a
                    key={path}
                    href={getLocalizedPath(path)}
                    className="block px-4 py-3 font-medium text-sm border-b border-gray-200 last:border-b-0 text-black hover:bg-red-700 hover:text-white transition-colors duration-200"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>

            <NavLink isUrdu={isUrdu} currentPath={pathname} path="/videos" text={navText.videos} />
          
            <NavLink isUrdu={isUrdu} currentPath={pathname} path="/contact" text={navText.contact} />

            {/* More Dropdown */}
            <div
              className="relative flex items-center h-full"
              onMouseEnter={() => setMoreDropdown(true)}
              onMouseLeave={() => setMoreDropdown(false)}
            >
              <button className="flex items-center gap-1 font-bold text-sm uppercase text-black hover-red-underline transition-all duration-300">
                {navText.more}{" "}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${moreDropdown ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`absolute top-full ${isUrdu ? "left-0" : "right-0"} mt-0.5 w-52 bg-white border-2 border-red-700 overflow-hidden transition-all duration-300 ease-in-out origin-top ${
                  moreDropdown ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-0 invisible"
                }`}
              >
                {moreLinks.map(({ name, path }) => (
                  <a
                    key={path}
                    href={getLocalizedPath(path)}
                    className="block px-4 py-3 font-medium text-sm border-b border-gray-200 last:border-b-0 text-black hover:bg-red-700 hover:text-white transition-colors duration-200"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Search & Mobile Menu */}
          <div className={`flex items-center gap-4 ${isUrdu ? "flex-row-reverse" : ""}`}>
            <button className="text-black hover:text-red-700 transition" aria-label="Search">
              <Search className="w-6 h-6" />
            </button>
            <button
              className="lg:hidden text-black hover:text-red-700 transition"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`lg:hidden border-t-2 border-red-700 overflow-hidden transition-all duration-500 ease-in-out ${
          mobileOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className={`px-4 py-4 space-y-1 bg-white ${isUrdu ? "text-right" : "text-left"}`} dir={isUrdu ? "rtl" : "ltr"}>
          <MobileNavLink isUrdu={isUrdu} path={isUrdu ? "/ur" : "/"} text={navText.home} />

          {/* Mobile News Dropdown (Button hover updated) */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => setMobileNewsOpen(!mobileNewsOpen)}
              className="w-full flex items-center justify-between px-4 py-3 font-bold text-sm text-black hover:bg-red-50 transition-colors duration-200 uppercase"
            >
              {navText.news}{" "}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${mobileNewsOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`bg-gray-50 overflow-hidden transition-all duration-300 ease-in-out ${
                mobileNewsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {newsCategories.map(({ name, path }) => (
                <a
                  key={path}
                  href={getLocalizedPath(path)}
                  className="block px-8 py-2 text-sm font-medium text-black hover:bg-red-700 hover:text-white transition-colors duration-200"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>

          <MobileNavLink isUrdu={isUrdu} path="/videos" text={navText.videos} />
          <MobileNavLink isUrdu={isUrdu} path="/about" text={navText.aboutUs} />
          <MobileNavLink isUrdu={isUrdu} path="/contact" text={navText.contact} />

          {/* Mobile More Dropdown (Button hover updated) */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
              className="w-full flex items-center justify-between px-4 py-3 font-bold text-sm text-black hover:bg-red-50 transition-colors duration-200 uppercase"
            >
              {navText.more}{" "}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${mobileMoreOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`bg-gray-50 overflow-hidden transition-all duration-300 ease-in-out ${
                mobileMoreOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {moreLinks.map(({ name, path }) => (
                <a
                  key={path}
                  href={getLocalizedPath(path)}
                  className="block px-8 py-2 text-sm font-medium text-black hover:bg-red-700 hover:text-white transition-colors duration-200"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Helper component for Desktop Nav Links
const NavLink = ({ isUrdu, currentPath, path, text }) => {
    const localizedPath = isUrdu ? `/ur${path}` : `/en${path}`;
    
    // Check if the current path (including locale) matches the link's target path
    const isActive = currentPath === localizedPath || 
                     (currentPath === '/en' && path === '/') ||
                     (currentPath === '/ur' && path === '/');

    return (
        <a 
            href={localizedPath}
            className={`
                relative h-full flex items-center font-bold text-sm uppercase px-1 
                text-black transition-colors duration-300 group
                ${isActive ? 'text-red-700' : 'hover:text-red-700'}
            `}
        >
            {text}
            {/* Professional underline effect */}
            <span className={`
                absolute bottom-0 left-0 w-full h-1 bg-red-700 transform origin-left transition-transform duration-300 ease-out
                ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
            `}></span>
        </a>
    );
};

// Helper component for Mobile Nav Links
const MobileNavLink = ({ isUrdu, path, text }) => {
    const getLocalizedPath = (p) => {
        const basePath = p.replace(/^\/(en|ur)/, '');
        return isUrdu ? `/ur${basePath}` : `/en${basePath}`;
    };
    
    return (
        <a
            href={getLocalizedPath(path)}
            className="block px-4 py-3 font-bold text-sm border-b border-gray-200 text-black hover:bg-red-700 hover:text-white transition-colors duration-200 uppercase"
        >
            {text}
        </a>
    );
};