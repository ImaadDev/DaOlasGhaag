"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { Menu, X, ChevronDown, Search } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const isUrdu = pathname.startsWith("/ur");

  const [mobileOpen, setMobileOpen] = useState(false);
  const [newsDropdown, setNewsDropdown] = useState(false);
  const [moreDropdown, setMoreDropdown] = useState(false);
  const [mobileNewsOpen, setMobileNewsOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

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
        home: "Home",
        news: "News",
        videos: "Videos",
        more: "More",
        pakistan: "Pakistan",
        world: "World",
        business: "Business",
        technology: "Technology",
        ai: "AI",
        health: "Health",
        climate: "Climate",
        sports: "Sports",
        entertainment: "Entertainment",
        factCheck: "Fact Check",
        aboutUs: "About Us",
        contact: "Contact",
        archives: "Archives",
        newsletter: "Newsletter",
        podcasts: "Podcasts",
        subscribe: "Subscribe",
        logo1: "Da Olass",
        logo2: "Ghag",
      };

  const newsCategories = [
    { name: navText.pakistan, path: "/pk-news" },
    { name: navText.world, path: "/world-news" },
    { name: navText.business, path: "/business-news" },
    { name: navText.technology, path: "/tech-news" },
    { name: navText.ai, path: "/ai-news" },              // ← ADDED AI
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

  return (
    <nav dir={isUrdu ? "rtl" : "ltr"} className="bg-white border-b-2 border-black sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-100 border-b border-gray-300">
        <div className={`max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between text-xs md:text-sm ${isUrdu ? "md:flex-row-reverse" : ""}`}>
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <span className="uppercase tracking-wide">
              {new Date().toLocaleDateString(isUrdu ? "ur-PK" : "en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className={`mt-2 md:mt-0 flex items-center gap-4 ${isUrdu ? "flex-row-reverse" : ""}`}>
           
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className={`flex items-center justify-between h-16 ${isUrdu ? "flex-row-reverse" : ""}`}>
          {/* Logo */}
          <Link href={isUrdu ? "/ur" : "/"} className="flex items-center gap-2">
            <div className="relative w-12 h-12">
              <Image src="/logo.png" alt="Logo" fill className="object-contain" priority />
            </div>
            <span className="text-sm md:text-lg font-bold tracking-tighter text-black hover:opacity-80 transition">
              {navText.logo1} <span className="bg-red-700 text-white px-1">{navText.logo2}</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href={isUrdu ? "/ur" : "/"} className="font-bold text-sm hover:opacity-70 transition">
              {navText.home}
            </Link>

            {/* News Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setNewsDropdown(true)}
              onMouseLeave={() => setNewsDropdown(false)}
            >
              <button className="flex items-center gap-1 font-bold text-sm hover:opacity-70 transition">
                {navText.news}{" "}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${newsDropdown ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`absolute top-full ${isUrdu ? "right-0" : "left-0"} mt-2 w-56 bg-white border-2 border-black overflow-hidden transition-all duration-300 origin-top ${
                  newsDropdown ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-0 invisible"
                }`}
              >
                {newsCategories.map(({ name, path }) => (
                  <Link
                    key={path}
                    href={isUrdu ? `/ur${path}` : `/en${path}`}
                    className="block px-4 py-3 font-medium text-sm border-b border-gray-200 last:border-b-0 text-black hover:bg-red-600 hover:text-white transition"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/videos" className="font-bold text-sm hover:opacity-70 transition">
              {navText.videos}
            </Link>
          
            <Link href={isUrdu ? "/ur/contact" : "/en/contact"} className="font-bold text-sm hover:opacity-70 transition">
              {navText.contact}
            </Link>

            {/* More Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMoreDropdown(true)}
              onMouseLeave={() => setMoreDropdown(false)}
            >
              <button className="flex items-center gap-1 font-bold text-sm hover:opacity-70 transition">
                {navText.more}{" "}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${moreDropdown ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`absolute top-full ${isUrdu ? "left-0" : "right-0"} mt-2 w-48 bg-white border-2 border-black overflow-hidden transition-all duration-300 origin-top ${
                  moreDropdown ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-0 invisible"
                }`}
              >
                {moreLinks.map(({ name, path }) => (
                  <Link
                    key={path}
                    href={isUrdu ? `/ur${path}` : `/en${path}`}
                    className="block px-4 py-3 font-medium text-sm border-b border-gray-200 last:border-b-0 text-black hover:bg-red-600 hover:text-white transition"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Search & Mobile Menu */}
          <div className={`flex items-center gap-4 ${isUrdu ? "flex-row-reverse" : ""}`}>
            <button className="text-black hover:opacity-70 transition">
              <Search className="w-5 h-5" />
            </button>
            <button
              className="lg:hidden text-black hover:opacity-70 transition"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`lg:hidden border-t-2 border-black overflow-hidden transition-all duration-500 ease-in-out ${
          mobileOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className={`px-4 py-4 space-y-1 bg-white ${isUrdu ? "text-right" : "text-left"}`} dir={isUrdu ? "rtl" : "ltr"}>
          <Link
            href={isUrdu ? "/ur" : "/"}
            className="block px-4 py-3 font-bold text-sm border-b border-gray-200 text-black hover:bg-gray-50 transition"
          >
            {navText.home}
          </Link>

          {/* Mobile News Dropdown */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => setMobileNewsOpen(!mobileNewsOpen)}
              className="w-full flex items-center justify-between px-4 py-3 font-bold text-sm text-black hover:bg-gray-50 transition"
            >
              {navText.news}{" "}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${mobileNewsOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`bg-gray-50 overflow-hidden transition-all duration-300 ${
                mobileNewsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {newsCategories.map(({ name, path }) => (
                <Link
                  key={path}
                  href={isUrdu ? `/ur${path}` : `/en${path}`}
                  className="block px-8 py-2 text-sm font-medium text-black hover:bg-gray-100 transition"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/videos"
            className="block px-4 py-3 font-bold text-sm border-b border-gray-200 text-black hover:bg-gray-50 transition"
          >
            {navText.videos}
          </Link>
          <Link
            href={isUrdu ? "/ur/about" : "/en/about"}
            className="block px-4 py-3 font-bold text-sm border-b border-gray-200 text-black hover:bg-gray-50 transition"
          >
            {navText.aboutUs}
          </Link>
          <Link
            href={isUrdu ? "/ur/contact" : "/en/contact"}
            className="block px-4 py-3 font-bold text-sm border-b border-gray-200 text-black hover:bg-gray-50 transition"
          >
            {navText.contact}
          </Link>

          {/* Mobile More Dropdown */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
              className="w-full flex items-center justify-between px-4 py-3 font-bold text-sm text-black hover:bg-gray-50 transition"
            >
              {navText.more}{" "}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${mobileMoreOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`bg-gray-50 overflow-hidden transition-all duration-300 ${
                mobileMoreOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {moreLinks.map(({ name, path }) => (
                <Link
                  key={path}
                  href={isUrdu ? `/ur${path}` : `/en${path}`}
                  className="block px-8 py-2 text-sm font-medium text-black hover:bg-gray-100 transition"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
