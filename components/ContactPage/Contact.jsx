"use client";

import { usePathname } from "next/navigation";
import ScrollBasedAnimation from "../ScrollBasedAnimations";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Contact() {
  const pathname = usePathname();
  const isUrdu = pathname.startsWith("/ur");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(isUrdu ? "پیغام بھیج دیا گیا!" : "Message sent!");
  };

  return (
    <main className={`bg-white text-black min-h-screen ${isUrdu ? "rtl font-urdu" : "ltr font-sans"}`}>
      
      {/* 1. Hero / Header Section */}
      <ScrollBasedAnimation direction="up" delay={0.1}>
        <header className="relative border-b border-gray-200">
          {/* Top Red Strip */}
          <div className="w-full h-2 bg-[#B80000]"></div>
          
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <div className="max-w-4xl">
              <div className="inline-block bg-[#B80000] text-white px-4 py-1 text-xs font-bold uppercase tracking-widest mb-6">
                {isUrdu ? "رابطہ" : "Get in Touch"}
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                {isUrdu ? "ہم سے" : "Contact"} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B80000] to-red-700">
                  {isUrdu ? "رابطہ کریں" : "Our Newsroom"}
                </span>
              </h1>
              <p className="text-xl text-gray-600 font-serif max-w-2xl leading-relaxed border-l-4 border-gray-300 pl-6">
                {isUrdu
                  ? "ہم آپ کی رائے اور سوالات کا استقبال کرتے ہیں۔ ہماری ٹیم 24/7 دستیاب ہے۔"
                  : "We value your feedback. Whether it's a breaking tip, a correction, or a general inquiry, our team is ready to listen."
                }
              </p>
            </div>
          </div>
        </header>
      </ScrollBasedAnimation>

      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Contact Form (Span 7) */}
          <div className="lg:col-span-7">
            <ScrollBasedAnimation direction="up" delay={0.2}>
              <div className="mb-10 border-b-2 border-[#B80000] pb-3 inline-block w-full">
                <h2 className="text-2xl font-bold uppercase tracking-widest flex items-center gap-3">
                  <Send className="w-6 h-6 text-[#B80000]" />
                  {isUrdu ? "پیغام بھیجیں" : "Send a Message"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-[#B80000] transition-colors">
                      {isUrdu ? "نام" : "Name"} <span className="text-[#B80000]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 px-4 py-4 border-b-2 border-gray-300 focus:border-[#B80000] outline-none transition-colors font-medium rounded-none"
                      placeholder={isUrdu ? "آپ کا نام" : "Full Name"}
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-[#B80000] transition-colors">
                      {isUrdu ? "ای میل" : "Email"} <span className="text-[#B80000]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 px-4 py-4 border-b-2 border-gray-300 focus:border-[#B80000] outline-none transition-colors font-medium rounded-none"
                      placeholder={isUrdu ? "آپ کا ای میل" : "Email Address"}
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-[#B80000] transition-colors">
                    {isUrdu ? "موضوع" : "Subject"} <span className="text-[#B80000]">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 px-4 py-4 border-b-2 border-gray-300 focus:border-[#B80000] outline-none transition-colors font-medium rounded-none"
                    placeholder={isUrdu ? "موضوع" : "Subject Matter"}
                  />
                </div>

                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-[#B80000] transition-colors">
                    {isUrdu ? "پیغام" : "Message"} <span className="text-[#B80000]">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-gray-50 px-4 py-4 border-b-2 border-gray-300 focus:border-[#B80000] outline-none transition-colors font-medium resize-none rounded-none"
                    placeholder={isUrdu ? "تفصیلات..." : "Type your message here..."}
                  />
                </div>

                <button
                  type="submit"
                  className="group relative overflow-hidden bg-[#B80000] text-white px-10 py-4 font-bold text-sm uppercase tracking-[0.2em] transition-all hover:bg-black rounded-none"
                >
                  <span className="relative z-10">{isUrdu ? "بھیجیں" : "Submit Inquiry"}</span>
                </button>
              </form>
            </ScrollBasedAnimation>
          </div>

          {/* Right Column: Info & Details (Span 5) */}
          <div className="lg:col-span-5">
            <ScrollBasedAnimation direction="up" delay={0.3}>
              <div className="bg-gray-50 p-8 md:p-12 border border-gray-200 h-full">
                <div className="mb-10 border-b-2 border-[#B80000] pb-3">
                  <h2 className="text-xl font-bold uppercase tracking-widest">
                    {isUrdu ? "رابطہ کی تفصیلات" : "Corporate Info"}
                  </h2>
                </div>

                <div className="space-y-10">
                  {/* Email */}
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center text-[#B80000] group-hover:bg-[#B80000] group-hover:text-white transition-colors shadow-sm">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-1">
                        {isUrdu ? "ای میل" : "Email Inquiries"}
                      </h3>
                      <a href="mailto:info@daolassghag.com" className="text-lg font-bold text-black hover:text-[#B80000] transition-colors border-b border-gray-300 hover:border-[#B80000]">
                        info@daolassghag.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center text-[#B80000] group-hover:bg-[#B80000] group-hover:text-white transition-colors shadow-sm">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-1">
                        {isUrdu ? "فون" : "Direct Line"}
                      </h3>
                      <a href="tel:+1234567890" className="text-lg font-serif text-black hover:text-[#B80000] transition-colors">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center text-[#B80000] group-hover:bg-[#B80000] group-hover:text-white transition-colors shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-1">
                        {isUrdu ? "ہیڈ آفس" : "Headquarters"}
                      </h3>
                      <p className="text-lg text-gray-800 font-serif leading-snug">
                        {isUrdu
                          ? "123 نیوز اسٹریٹ، اسلام آباد، پاکستان"
                          : "123 Media Center, Blue Area, Islamabad, Pakistan"
                        }
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center text-[#B80000] group-hover:bg-[#B80000] group-hover:text-white transition-colors shadow-sm">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-1">
                        {isUrdu ? "اوقات کار" : "Operating Hours"}
                      </h3>
                      <p className="text-base text-gray-800">
                        {isUrdu ? "پیر - جمعہ: 9:00 - 18:00" : "Mon - Fri: 09:00 - 18:00"}
                      </p>
                      <p className="text-sm text-[#B80000] font-bold mt-1 uppercase tracking-wider">
                        {isUrdu ? "ہفتہ - اتوار: بند" : "Weekend: Closed"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Follow */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="font-bold text-sm uppercase tracking-widest mb-6">
                    {isUrdu ? "ہمیں فالو کریں" : "Follow Our Feed"}
                  </h3>
                  <div className="flex gap-4">
                    {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                      <a 
                        key={idx} 
                        href="#" 
                        className="w-10 h-10 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-[#B80000] hover:text-white hover:border-[#B80000] transition-all duration-300"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </ScrollBasedAnimation>
          </div>

        </div>
      </div>
    </main>
  );
}