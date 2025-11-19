"use client";

import { usePathname } from "next/navigation";
import ScrollBasedAnimation from "../ScrollBasedAnimations";
import { useState } from "react";

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
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert(isUrdu ? "پیغام بھیج دیا گیا!" : "Message sent!");
  };

  return (
    <main className={`bg-white text-black mx-auto px-6 md:px-16 py-20 md:py-28 ${isUrdu ? "rtl" : "ltr"}`}>
      {/* Header */}
      <ScrollBasedAnimation direction="up" delay={0.1}>
        <header className="max-w-5xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-1 h-10 bg-black" />
            <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
              {isUrdu ? "ہم سے رابطہ کریں" : "Contact Us"}
            </h1>
          </div>
          <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
            {isUrdu
              ? "ہم آپ کی رائے اور سوالات کا استقبال کرتے ہیں۔ براہ کرم ہم سے رابطہ کریں۔"
              : "We welcome your feedback and questions. Please get in touch with us."
            }
          </p>
        </header>
      </ScrollBasedAnimation>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <ScrollBasedAnimation direction="left" delay={0.2}>
          <section>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-8 border-b border-black pb-3">
              {isUrdu ? "پیغام بھیجیں" : "Send Message"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isUrdu ? "نام" : "Name"} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                    placeholder={isUrdu ? "آپ کا نام" : "Your name"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isUrdu ? "ای میل" : "Email"} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                    placeholder={isUrdu ? "آپ کا ای میل" : "Your email"}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isUrdu ? "موضوع" : "Subject"} *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                  placeholder={isUrdu ? "پیغام کا موضوع" : "Message subject"}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isUrdu ? "پیغام" : "Message"} *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors resize-none"
                  placeholder={isUrdu ? "آپ کا پیغام یہاں لکھیں..." : "Write your message here..."}
                />
              </div>
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-black text-white font-bold text-sm tracking-widest hover:bg-gray-800 transition-colors"
              >
                {isUrdu ? "بھیجیں" : "Send Message"}
              </button>
            </form>
          </section>
        </ScrollBasedAnimation>

        {/* Contact Information */}
        <ScrollBasedAnimation direction="right" delay={0.3}>
          <section className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-8 border-b border-black pb-3">
              {isUrdu ? "رابطہ کی معلومات" : "Contact Information"}
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    {isUrdu ? "ای میل" : "Email"}
                  </h3>
                  <p className="text-gray-600">
                    <a href="mailto:info@daolassghag.com" className="hover:text-black transition-colors">
                      info@daolassghag.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    {isUrdu ? "فون" : "Phone"}
                  </h3>
                  <p className="text-gray-600">
                    <a href="tel:+1234567890" className="hover:text-black transition-colors">
                      +1 (234) 567-890
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    {isUrdu ? "پتہ" : "Address"}
                  </h3>
                  <p className="text-gray-600">
                    {isUrdu
                      ? "123 نیوز اسٹریٹ، اسلام آباد، پاکستان"
                      : "123 News Street, Islamabad, Pakistan"
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    {isUrdu ? "آفس کے اوقات" : "Office Hours"}
                  </h3>
                  <p className="text-gray-600">
                    {isUrdu ? "پیر سے جمعہ: 9:00 AM - 6:00 PM" : "Mon - Fri: 9:00 AM - 6:00 PM"}
                  </p>
                  <p className="text-gray-600">
                    {isUrdu ? "ہفتہ اور اتوار: بند" : "Sat - Sun: Closed"}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-8 border-t border-gray-300">
              <h3 className="font-bold text-lg mb-4">
                {isUrdu ? "ہمارے ساتھ جڑیں" : "Follow Us"}
              </h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <span className="text-sm font-bold">F</span>
                </a>
                <a href="#" className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <span className="text-sm font-bold">T</span>
                </a>
                <a href="#" className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <span className="text-sm font-bold">I</span>
                </a>
                <a href="#" className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <span className="text-sm font-bold">Y</span>
                </a>
              </div>
            </div>
          </section>
        </ScrollBasedAnimation>
      </div>
    </main>
  );
}