"use client";

import ScrollAnimation from "../components/ScrollBasedAnimations"; // adjust path
import Image from "next/image";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
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
    <footer className={`bg-red-700 text-gray-700 ${isUrdu ? "rtl" : "ltr"}`}>
      <ScrollAnimation direction="up" delay={0.3}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & About */}
          <ScrollAnimation direction="left" delay={0.3}>
            <div className="flex items-start gap-4">
              <div className="relative w-14 h-14 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                {footerText.about}
              </p>
            </div>
          </ScrollAnimation>

          {/* Quick Links */}
          <ScrollAnimation direction="up" delay={0.4}>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">
                {footerText.quickLinks}
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><Link href="/" className="hover:text-red-600 transition">{footerText.home}</Link></li>
                <li><Link href="/videos" className="hover:text-red-600 transition">{footerText.videos}</Link></li>
                <li><Link href="/podcasts" className="hover:text-red-600 transition">{footerText.podcasts}</Link></li>
                <li><Link href="/environment" className="hover:text-red-600 transition">Environment</Link></li>
                <li><Link href="/contact" className="hover:text-red-600 transition">{footerText.contact}</Link></li>
              </ul>
            </div>
          </ScrollAnimation>

          {/* Categories */}
          <ScrollAnimation direction="up" delay={0.5}>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">{footerText.categories}</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><Link href="/videos?category=Business" className="hover:text-red-600 transition">{footerText.business}</Link></li>
                <li><Link href="/videos?category=Technology" className="hover:text-red-600 transition">{footerText.technology}</Link></li>
                <li><Link href="/videos?category=Health" className="hover:text-red-600 transition">{footerText.health}</Link></li>
                <li><Link href="/videos?category=Sports" className="hover:text-red-600 transition">{footerText.sports}</Link></li>
                <li><Link href="/videos?category=Entertainment" className="hover:text-red-600 transition">{footerText.entertainment}</Link></li>
              </ul>
            </div>
          </ScrollAnimation>

          {/* Contact & Social */}
          <ScrollAnimation direction="right" delay={0.6}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-red-600 inline-block pb-1">
                {footerText.contactTitle}
              </h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2 text-gray-300">
                  <span className="text-red-500">📧</span> {footerText.email}
                </p>
                <p className="flex items-center gap-2 text-gray-300">
                  <span className="text-red-500">📞</span> {footerText.phone}
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-5 mt-4">
                <a href="https://www.facebook.com/mudam675" className="p-2 bg-blue-800 rounded-full hover:bg-blue-900 transition" aria-label="Facebook">
                  <Facebook className="w-4 h-4 text-white" />
                </a>
                <a href="https://www.instagram.com/da_olass_ghag?igsh=MXAwa2R1a3V3cnUxMw%3D%3D&utm_source=qr" className="p-2 bg-pink-800 rounded-full hover:bg-pink-600 transition" aria-label="Instagram">
                  <Instagram className="w-4 h-4 text-white" />
                </a>
                <a href="https://x.com/da_olass_ghag?s=11" className="p-2 bg-black rounded-full hover:bg-gray-800 transition" aria-label="Twitter">
                  <Twitter className="w-4 h-4 text-white" />
                </a>
                <a href="https://www.youtube.com/@DaOlassGhag" className="p-2 bg-white rounded-full hover:bg-gray-600 transition" aria-label="YouTube">
                  <Youtube className="w-4 h-4 text-red-600" />
                </a>
              </div>

              {/* Developer Credit */}
              <div className="pt-4 border-t border-gray-800 mt-4">
                <p className="text-sm text-gray-300 tracking-wide text-center">
                  {footerText.developedBy} <span className="text-red-500">♥</span> by{" "}
                  <a href="https://www.imadkhan.online" target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-red-400 transition-colors duration-300">
                    {footerText.developerName}
                  </a>
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        {/* Bottom */}
        <ScrollAnimation direction="up" delay={0.7}>
          <div className="border-t border-gray-800 mt-8 pt-4 text-center text-white text-sm">
            &copy; {new Date().getFullYear()} Da Olass Ghag. {footerText.copyright}
          </div>
        </ScrollAnimation>
      </ScrollAnimation>
    </footer>
  );
}
