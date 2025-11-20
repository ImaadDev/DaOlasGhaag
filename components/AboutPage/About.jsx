"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// --- Animation Component (Preserved & Optimized) ---
function ScrollBasedAnimation({ children, direction = "up", delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, delay]);

  const getTransform = () => {
    if (isVisible) return "translate-y-0 translate-x-0 opacity-100";
    switch (direction) {
      case "up": return "translate-y-8 opacity-0"; // Reduced distance for subtler effect
      case "down": return "-translate-y-8 opacity-0";
      case "left": return "translate-x-8 opacity-0";
      case "right": return "-translate-x-8 opacity-0";
      default: return "opacity-0";
    }
  };

  return (
    <div ref={setRef} className={`transition-all duration-1000 ease-out ${getTransform()}`}>
      {children}
    </div>
  );
}

export default function About() {
  const pathname = usePathname();
  const isUrdu = pathname.startsWith("/ur");

  return (
    <main className={`bg-white text-black min-h-screen ${isUrdu ? "rtl font-urdu" : "ltr font-sans"}`}>
      
      {/* 1. MASTHEAD / HERO SECTION */}
      <section className="relative border-b-4 border-black pt-20 md:pt-32 pb-16 px-6 md:px-12 max-w-[1400px] mx-auto">
        <ScrollBasedAnimation direction="up" delay={0.1}>
          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Headline Area */}
            <div className="flex-1">
              <div className="inline-block bg-[#B80000] text-white px-3 py-1 text-xs font-bold uppercase tracking-widest mb-6">
                {isUrdu ? "ادارتی نوٹ" : "Editorial Note"}
              </div>
              <h1 className="text-6xl md:text-8xl font-extrabold uppercase leading-[0.9] tracking-tight mb-8">
                {isUrdu ? "سچائی کی" : "Defining"} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B80000] to-red-900">
                  {isUrdu ? "تلاش" : "The Truth"}
                </span>
              </h1>
            </div>

            {/* Manifesto Area */}
            <div className="flex-1 md:pt-12 md:border-l md:border-gray-200 md:pl-12">
              <p className="text-xl md:text-2xl font-serif text-gray-800 leading-relaxed">
                {isUrdu
                  ? "ہم ایک آزاد اور معتبر نیوز ایجنسی ہیں جو دنیا بھر سے تازہ ترین خبریں اور گہری تجزیہ فراہم کرتی ہے۔ ہمارا مقصد صرف خبر دینا نہیں، بلکہ شعور بیدار کرنا ہے۔"
                  : "We are an independent news agency dedicated to unearthing the facts. In an era of noise, we provide the signal—delivering depth, analysis, and unwavering accuracy."
                }
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-[1px] w-12 bg-black"></div>
                <p className="text-sm font-bold uppercase tracking-widest">
                  {isUrdu ? "چف ایڈیٹر" : "Editor in Chief"}
                </p>
              </div>
            </div>
          </div>
        </ScrollBasedAnimation>
      </section>

      {/* 2. DATA STRIP (Stats) */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollBasedAnimation direction="up" delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-300 border-x border-gray-300">
              {[
                { label: isUrdu ? "قیام" : "Est.", value: "2020" },
                { label: isUrdu ? "صحافی" : "Journalists", value: "50+" },
                { label: isUrdu ? "روزانہ قاری" : "Daily Readers", value: "10M+" },
                { label: isUrdu ? "ممالک" : "Countries", value: "12" },
              ].map((stat, index) => (
                <div key={index} className="p-6 md:p-10 text-center hover:bg-white transition-colors duration-300">
                  <div className="text-3xl md:text-5xl font-black text-[#B80000] mb-2">{stat.value}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollBasedAnimation>
        </div>
      </div>

      {/* 3. TIMELINE CHRONICLE */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <ScrollBasedAnimation direction="up" delay={0.3}>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-4 h-4 bg-[#B80000]"></div>
            <h2 className="text-2xl font-bold uppercase tracking-wider">
              {isUrdu ? "ہمارا سفر" : "Our Chronicle"}
            </h2>
          </div>

          <div className="space-y-0">
            {/* Year 1 */}
            <div className="group grid grid-cols-1 md:grid-cols-12 border-t border-black py-12 hover:bg-gray-50 transition-colors duration-500">
              <div className="md:col-span-4">
                <span className="text-6xl md:text-8xl font-black text-gray-200 group-hover:text-black transition-colors duration-500">
                  2020
                </span>
              </div>
              <div className="md:col-span-8 pt-4 md:pt-6">
                <h3 className="text-xl font-bold uppercase mb-4 text-[#B80000]">
                  {isUrdu ? "شروعات" : "The Inception"}
                </h3>
                <p className="text-lg font-serif text-gray-700 max-w-2xl leading-relaxed">
                  {isUrdu
                    ? "صحافیوں کے ایک چھوٹے گروپ نے محسوس کیا کہ دنیا کو غیر جانبدار رپورٹنگ کی اشد ضرورت ہے۔ ہم نے بغیر کسی فنڈنگ کے شروعات کی۔"
                    : "A collective of independent journalists recognized a void in impartial reporting. We launched with zero corporate backing, driven solely by the pursuit of truth."}
                </p>
              </div>
            </div>

            {/* Year 2 */}
            <div className="group grid grid-cols-1 md:grid-cols-12 border-t border-gray-300 py-12 hover:bg-gray-50 transition-colors duration-500">
              <div className="md:col-span-4">
                <span className="text-6xl md:text-8xl font-black text-gray-200 group-hover:text-black transition-colors duration-500">
                  2022
                </span>
              </div>
              <div className="md:col-span-8 pt-4 md:pt-6">
                <h3 className="text-xl font-bold uppercase mb-4 text-[#B80000]">
                  {isUrdu ? "عالمی توسیع" : "Global Expansion"}
                </h3>
                <p className="text-lg font-serif text-gray-700 max-w-2xl leading-relaxed">
                  {isUrdu
                    ? "ڈیجیٹل جدت کو اپناتے ہوئے، ہم نے 5 نئے ممالک میں بیورو کھولے اور اپنی ٹیم کو تین گنا بڑھایا۔"
                    : "Leveraging digital innovation, we opened bureaus in 5 new territories and tripled our investigative team, breaking several major international stories."}
                </p>
              </div>
            </div>

            {/* Year 3 */}
            <div className="group grid grid-cols-1 md:grid-cols-12 border-t border-gray-300 border-b py-12 hover:bg-gray-50 transition-colors duration-500">
              <div className="md:col-span-4">
                <span className="text-6xl md:text-8xl font-black text-gray-200 group-hover:text-black transition-colors duration-500">
                  2024
                </span>
              </div>
              <div className="md:col-span-8 pt-4 md:pt-6">
                <h3 className="text-xl font-bold uppercase mb-4 text-[#B80000]">
                  {isUrdu ? "آج کا دن" : "The Present"}
                </h3>
                <p className="text-lg font-serif text-gray-700 max-w-2xl leading-relaxed">
                  {isUrdu
                    ? "آج ہم لاکھوں لوگوں کی آواز ہیں۔ ہم ٹیکنالوجی اور روایتی صحافت کا بہترین امتزاج پیش کرتے ہیں۔"
                    : "Today, we stand as a pillar of reliability. We combine AI-driven data analysis with boots-on-the-ground journalism to cover the stories that matter."}
                </p>
              </div>
            </div>
          </div>
        </ScrollBasedAnimation>
      </section>

      {/* 4. MISSION & VISION (High Contrast) */}
      <ScrollBasedAnimation direction="up" delay={0.4}>
        <section className="grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-black text-white p-16 md:p-24 flex flex-col justify-center">
            <div className="w-16 h-1 bg-[#B80000] mb-8"></div>
            <h3 className="text-4xl font-black uppercase tracking-tight mb-6">
              {isUrdu ? "ہمارا مشن" : "Our Mission"}
            </h3>
            <p className="text-xl md:text-2xl font-serif leading-relaxed text-gray-300">
              {isUrdu
                ? "جمہوریت، انسانی حقوق اور شفافیت کا فروغ۔ ہم طاقتوروں سے جواب طلب کرتے ہیں اور کمزوروں کو آواز دیتے ہیں۔"
                : "To hold power accountable. To champion transparency. To provide a clear, unbiased window into the events shaping our world without fear or favor."
              }
            </p>
          </div>
          <div className="bg-[#F4F4F4] text-black p-16 md:p-24 flex flex-col justify-center">
            <div className="w-16 h-1 bg-black mb-8"></div>
            <h3 className="text-4xl font-black uppercase tracking-tight mb-6">
              {isUrdu ? "ہمارا وژن" : "Our Vision"}
            </h3>
            <p className="text-xl md:text-2xl font-serif leading-relaxed text-gray-800">
              {isUrdu
                ? "ایک ایسی دنیا جہاں ہر شہری کو درست معلومات تک رسائی حاصل ہو اور صحافت کسی دباؤ کے بغیر کام کر سکے۔"
                : "A world where information is a right, not a privilege. We envision a future where informed citizens drive positive global change through access to truth."
              }
            </p>
          </div>
        </section>
      </ScrollBasedAnimation>

      {/* 5. CORE VALUES (Grid) */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <ScrollBasedAnimation direction="up" delay={0.5}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight inline-block border-b-4 border-[#B80000] pb-2">
              {isUrdu ? "بنیادی اقدار" : "Core Values"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
            {[
              { 
                title: isUrdu ? "سچائی" : "Integrity", 
                desc: isUrdu ? "ہم حقائق سے سمجھوتہ نہیں کرتے۔" : "Uncompromising adherence to moral and ethical principles." 
              },
              { 
                title: isUrdu ? "غیر جانبداری" : "Impartiality", 
                desc: isUrdu ? "ہم کسی ایک طرف کا ساتھ نہیں دیتے۔" : "Fair representation of all perspectives without bias." 
              },
              { 
                title: isUrdu ? "بہادری" : "Courage", 
                desc: isUrdu ? "مشکل حالات میں بھی سچ بولنا۔" : "The bravery to report difficult stories in dangerous places." 
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-12 hover:bg-black hover:text-white transition-all duration-300 group">
                <h4 className="text-xl font-bold uppercase tracking-wider mb-4 group-hover:text-[#B80000] transition-colors">
                  {item.title}
                </h4>
                <p className="font-serif text-lg text-gray-600 group-hover:text-gray-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </ScrollBasedAnimation>
      </section>

      {/* 6. CALL TO ACTION (Minimalist) */}
      <ScrollBasedAnimation direction="up" delay={0.6}>
        <section className="bg-[#B80000] text-white py-20 text-center px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
              {isUrdu ? "باخبر رہیں۔" : "Stay Informed."}
            </h2>
            <p className="text-xl font-serif opacity-90 max-w-2xl mx-auto">
              {isUrdu
                ? "روزانہ کی اہم خبریں سیدھا اپنے ان باکس میں حاصل کریں۔ کوئی شور نہیں، صرف خبریں۔"
                : "Get the most critical stories delivered straight to your inbox. No noise, just news."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <a
                href={isUrdu ? "/ur/newsletter" : "/en/newsletter"}
                className="bg-white text-black px-10 py-4 font-bold text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300"
              >
                {isUrdu ? "سبسکرائب کریں" : "Subscribe Free"}
              </a>
              <a
                href={isUrdu ? "/ur/contact" : "/en/contact"}
                className="border-2 border-white text-white px-10 py-4 font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
              >
                {isUrdu ? "رابطہ کریں" : "Contact Us"}
              </a>
            </div>
          </div>
        </section>
      </ScrollBasedAnimation>

    </main>
  );
}