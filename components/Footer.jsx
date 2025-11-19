"use client";

import React, { useState, useEffect } from "react";
// import ScrollAnimation from "../components/ScrollBasedAnimations"; // Mocked for runnable code
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
// import Link from "next/link"; // Replaced with <a>
// import { usePathname } from "next/navigation"; // Replaced with simulation

/**
 * Custom hook to simulate usePathname by reading window.location.pathname.
 */
const usePathnameSimulation = () => {
  const [pathname, setPathname] = useState('/');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname || '/');
    }
  }, []);
  
  return pathname;
};

// Mock Component for ScrollAnimation
const ScrollAnimation = ({ children, direction, delay }) => {
    // In a real environment, this component would handle animations.
    // Here, we return the children directly.
    return <div className={`animate-fade-in-up duration-[${delay * 1000}ms]`}>{children}</div>;
};

// Helper component for standard anchor links
const CustomLink = ({ href, children, className = "" }) => (
    <a 
        href={href} 
        className={`hover:text-red-400 font-medium transition-colors duration-300 ${className}`}
    >
        {children}
    </a>
);

export default function Footer() {
  const pathname = usePathnameSimulation();
  const isUrdu = pathname.startsWith("/ur"); // Detect Urdu route

  // Footer text for EN/UR
  const footerText = isUrdu
    ? {
        about: "یہاں ہماری ویب سائٹ کے بارے میں مختصر معلومات ہیں۔",
        quickLinks: "فوری لنکس",
        home: "ہوم",
        videos: "ویڈیوز",
        podcasts: "پوڈکاسٹ",
        contact: "رابطہ کریں",
        categories: "اقسام",
        business: "کاروبار",
        technology: "ٹیکنالوجی",
        health: "صحت",
        sports: "کھیل",
        entertainment: "تفریح",
        contactTitle: "رابطہ",
        email: "info@example.com",
        phone: "+92 300 1234567",
        developedBy: "تیار کیا گیا",
        developerName: "Imad Khan",
        copyright: "تمام حقوق محفوظ ہیں",
      }
    : {
        about: "Here is a brief info about our website.",
        quickLinks: "Quick Links",
        home: "Home",
        videos: "Videos",
        podcasts: "Podcasts",
        contact: "Contact",
        categories: "Categories",
        business: "Business",
        technology: "Technology",
        health: "Health",
        sports: "Sports",
        entertainment: "Entertainment",
        contactTitle: "Contact",
        email: "info@example.com",
        phone: "+92 300 1234567",
        developedBy: "Developed by",
        developerName: "Imad Khan",
        copyright: "All rights reserved",
      };

  return (
    // Updated footer background to dark gray
    <footer className={`bg-red-800 text-white ${isUrdu ? "rtl" : "ltr"} border-t-4 border-red-700 font-sans`}>
      <ScrollAnimation direction="up" delay={0.3}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Logo & About */}
          <ScrollAnimation direction="left" delay={0.3}>
            <div className="flex flex-col items-start gap-4">
              
              {/* Logo Area */}
              <div className="flex items-center gap-2">
                {/* Image Placeholder/Logo Simulation */}
                <div className="relative w-12 h-12 flex-shrink-0">
                    {/* Replaced Next/Image with native <img> */}
                    <img src="/logo.png" alt="Da Olass Ghag Logo" className="object-contain w-full h-full" />
                </div>
                <span className="text-xl font-black tracking-tighter text-white">
                  DA OLASS <span className="bg-red-700 text-white px-1 py-0.5 ml-0.5 inline-block text-lg">GHAG</span>
                </span>
              </div>

              {/* About Text */}
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs pt-2">
                {footerText.about}
              </p>
            </div>
          </ScrollAnimation>

          {/* Quick Links */}
          <ScrollAnimation direction="up" delay={0.4}>
            <div>
              {/* Strong Red Underline Heading */}
              <h3 className="text-lg font-extrabold text-white mb-6 uppercase border-b-2 border-red-700 pb-1 inline-block">
                {footerText.quickLinks}
              </h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li><CustomLink href="/">{footerText.home}</CustomLink></li>
                <li><CustomLink href="/videos">{footerText.videos}</CustomLink></li>
                <li><CustomLink href="/podcasts">{footerText.podcasts}</CustomLink></li>
                <li><CustomLink href="/environment">Environment</CustomLink></li>
                <li><CustomLink href="/contact">{footerText.contact}</CustomLink></li>
              </ul>
            </div>
          </ScrollAnimation>

          {/* Categories */}
          <ScrollAnimation direction="up" delay={0.5}>
            <div>
               {/* Strong Red Underline Heading */}
              <h3 className="text-lg font-extrabold text-white mb-6 uppercase border-b-2 border-red-700 pb-1 inline-block">
                {footerText.categories}
              </h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li><CustomLink href="/videos?category=Business">{footerText.business}</CustomLink></li>
                <li><CustomLink href="/videos?category=Technology">{footerText.technology}</CustomLink></li>
                <li><CustomLink href="/videos?category=Health">{footerText.health}</CustomLink></li>
                <li><CustomLink href="/videos?category=Sports">{footerText.sports}</CustomLink></li>
                <li><CustomLink href="/videos?category=Entertainment">{footerText.entertainment}</CustomLink></li>
              </ul>
            </div>
          </ScrollAnimation>

          {/* Contact & Social */}
          <ScrollAnimation direction="right" delay={0.6}>
            <div className="space-y-6">
               {/* Strong Red Underline Heading */}
              <h3 className="text-lg font-extrabold text-white mb-6 uppercase border-b-2 border-red-700 pb-1 inline-block">
                {footerText.contactTitle}
              </h3>
              <div className="space-y-3 text-sm">
                {/* Contact Info with enhanced text color */}
                <p className="flex items-center gap-3 text-gray-300">
                  <span className="text-red-600 flex-shrink-0">📧</span> <span className="text-white font-medium">{footerText.email}</span>
                </p>
                <p className="flex items-center gap-3 text-gray-300">
                  <span className="text-red-600 flex-shrink-0">📞</span> <span className="text-white font-medium">{footerText.phone}</span>
                </p>
              </div>

              {/* Social Icons - Clean, High-Contrast Style */}
              <div className="flex items-center gap-3 pt-2">
                {/* Base Black/Gray, Red Hover */}
                <a href="https://www.facebook.com/mudam675" className="p-2 border-2 border-white text-white hover:bg-red-700 hover:border-red-700 transition-all duration-300" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/da_olass_ghag?igsh=MXAwa2R1a3V3cnUxMw%3D%3D&utm_source=qr" className="p-2 border-2 border-white text-white hover:bg-red-700 hover:border-red-700 transition-all duration-300" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://x.com/da_olass_ghag?s=11" className="p-2 border-2 border-white text-white hover:bg-red-700 hover:border-red-700 transition-all duration-300" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://www.youtube.com/@DaOlassGhag" className="p-2 border-2 border-white text-white hover:bg-red-700 hover:border-red-700 transition-all duration-300" aria-label="YouTube">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        {/* Bottom - Separated Copyright & Developer Credit */}
        <ScrollAnimation direction="up" delay={0.7}>
          <div className="border-t-2 border-gray-800 pt-6 pb-4">
            <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between text-white text-sm">
                {/* Copyright */}
                <div className="order-2 md:order-1 mt-4 md:mt-0 text-gray-400">
                    &copy; {new Date().getFullYear()} Da Olass Ghag. {footerText.copyright}
                </div>

                {/* Developer Credit */}
                <div className={`order-1 md:order-2 text-center text-gray-400 tracking-wide ${isUrdu ? "md:text-right" : "md:text-left"}`}>
                    {footerText.developedBy} <span className="text-red-500">♥</span> by{" "}
                    <a href="https://www.imadkhan.online" target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-red-400 transition-colors duration-300">
                      {footerText.developerName}
                    </a>
                </div>
            </div>
          </div>
        </ScrollAnimation>
      </ScrollAnimation>
    </footer>
  );
}