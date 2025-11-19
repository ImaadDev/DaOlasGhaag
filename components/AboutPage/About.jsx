"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

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
      case "up": return "translate-y-12 opacity-0";
      case "down": return "-translate-y-12 opacity-0";
      case "left": return "translate-x-12 opacity-0";
      case "right": return "-translate-x-12 opacity-0";
      default: return "opacity-0";
    }
  };

  return (
    <div
      ref={setRef}
      className={`transition-all duration-1000 ease-out ${getTransform()}`}
    >
      {children}
    </div>
  );
}

export default function About() {
  const pathname = usePathname();
  const isUrdu = pathname.startsWith("/ur");

  return (
    <main className={`bg-white text-black mx-auto px-6 md:px-16 py-20 md:py-28 ${isUrdu ? "rtl" : "ltr"}`}>
      {/* Hero Section */}
      <ScrollBasedAnimation direction="up" delay={0.1}>
        <section className="relative max-w-7xl mx-auto mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-0.5 bg-red-600"></div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-600">
                  {isUrdu ? "نیوز ایجنسی" : "News Agency"}
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-[-0.03em] leading-[0.9]">
                {isUrdu ? "ہمارے بارے میں" : "About"}
                <br />
                <span className="text-red-600 inline-block mt-2">{isUrdu ? "جانیں" : "Us"}</span>
              </h1>
              <div className="space-y-6">
                <div className="w-16 h-0.5 bg-black"></div>
                <p className="text-xl text-gray-700 max-w-lg leading-relaxed">
                  {isUrdu
                    ? "ہم ایک آزاد اور معتبر نیوز ایجنسی ہیں جو دنیا بھر سے تازہ ترین خبریں اور گہری تجزیہ فراہم کرتی ہے۔"
                    : "We are an independent and trusted news agency providing the latest news and in-depth analysis from around the world."
                  }
                </p>
              </div>
            </div>
            <div className="relative lg:h-[500px] flex items-center justify-center">
              <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-black"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-600 opacity-10"></div>
              <div className="relative w-full max-w-md">
                <div className="space-y-8 p-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-0.5 bg-black"></div>
                    <div className="flex-1 h-0.5 bg-gray-200"></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-0.5 bg-red-600"></div>
                    <div className="flex-1 h-0.5 bg-gray-200"></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-0.5 bg-black"></div>
                    <div className="flex-1 h-0.5 bg-gray-200"></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-0.5 bg-red-600"></div>
                    <div className="flex-1 h-0.5 bg-gray-200"></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-0.5 bg-black"></div>
                    <div className="flex-1 h-0.5 bg-gray-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollBasedAnimation>

      {/* Stats Section */}
      <ScrollBasedAnimation direction="up" delay={0.2}>
        <section className="max-w-7xl mx-auto mb-40">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-black">
            <div className="border-r border-b lg:border-b-0 border-black p-10 text-center hover:bg-black hover:text-white transition-all duration-500">
              <div className="text-5xl md:text-7xl font-black mb-3">2020</div>
              <div className="text-xs uppercase tracking-[0.25em] opacity-70">
                {isUrdu ? "شروع" : "Founded"}
              </div>
            </div>
            <div className="border-b lg:border-b-0 lg:border-r border-black p-10 text-center hover:bg-red-600 hover:text-white transition-all duration-500">
              <div className="text-5xl md:text-7xl font-black mb-3">50+</div>
              <div className="text-xs uppercase tracking-[0.25em] opacity-70">
                {isUrdu ? "صحافی" : "Journalists"}
              </div>
            </div>
            <div className="border-r border-black p-10 text-center hover:bg-black hover:text-white transition-all duration-500">
              <div className="text-5xl md:text-7xl font-black mb-3">10M+</div>
              <div className="text-xs uppercase tracking-[0.25em] opacity-70">
                {isUrdu ? "قاری" : "Readers"}
              </div>
            </div>
            <div className="p-10 text-center hover:bg-red-600 hover:text-white transition-all duration-500">
              <div className="text-5xl md:text-7xl font-black mb-3">24/7</div>
              <div className="text-xs uppercase tracking-[0.25em] opacity-70">
                {isUrdu ? "کوریج" : "Coverage"}
              </div>
            </div>
          </div>
        </section>
      </ScrollBasedAnimation>

      {/* Story Section */}
      <ScrollBasedAnimation direction="left" delay={0.3}>
        <section className="max-w-7xl mx-auto mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <div className="w-12 h-0.5 bg-red-600 mb-8"></div>
                <h2 className="text-5xl md:text-6xl font-black uppercase leading-none mb-8">
                  {isUrdu ? "ہماری" : "Our"}
                  <br />
                  <span className="text-red-600">{isUrdu ? "کہانی" : "Story"}</span>
                </h2>
              </div>
            </div>
            <div className="lg:col-span-3 space-y-12">
              <div className="border-l-2 border-black pl-8 py-4">
                <div className="text-xs uppercase tracking-[0.25em] text-red-600 mb-4 font-bold">
                  {isUrdu ? "شروعات" : "The Beginning"}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {isUrdu
                    ? "ہماری کہانی 2020 میں شروع ہوئی جب ایک گروپ صحافیوں نے محسوس کیا کہ دنیا کو ایک ایسی نیوز ایجنسی کی ضرورت ہے جو سچائی کو فروغ دے اور غیر جانبدار رپورٹنگ کرے۔"
                    : "Our story began in 2020 when a group of journalists realized that the world needed a news agency that promotes truth and provides impartial reporting."
                  }
                </p>
              </div>
              <div className="border-l-2 border-red-600 pl-8 py-4">
                <div className="text-xs uppercase tracking-[0.25em] text-red-600 mb-4 font-bold">
                  {isUrdu ? "ترقی" : "Growth"}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {isUrdu
                    ? "ہم نے مسلسل بہتری اور توسیع کا سفر جاری رکھا، نئے صحافیوں کو شامل کیا اور اپنی رسائی کو بڑھایا۔"
                    : "We continued our journey of continuous improvement and expansion, bringing in new journalists and extending our reach."
                  }
                </p>
              </div>
              <div className="border-l-2 border-black pl-8 py-4">
                <div className="text-xs uppercase tracking-[0.25em] text-red-600 mb-4 font-bold">
                  {isUrdu ? "موجودہ" : "Present"}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {isUrdu
                    ? "آج ہم دنیا کے مختلف حصوں میں کام کرتے ہیں اور ہر روز لاکھوں لوگوں تک پہنچتے ہیں، انہیں درست اور بروقت معلومات فراہم کرتے ہیں۔"
                    : "Today we work across different parts of the world and reach millions of people every day, providing them with accurate and timely information."
                  }
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollBasedAnimation>

      {/* Mission & Vision */}
      <ScrollBasedAnimation direction="up" delay={0.4}>
        <section className="max-w-7xl mx-auto mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-black">
            <div className="p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-black">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-black"></div>
                  <h3 className="text-3xl font-black uppercase tracking-tight">
                    {isUrdu ? "مشن" : "Mission"}
                  </h3>
                </div>
                <div className="w-20 h-0.5 bg-red-600"></div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {isUrdu
                    ? "ہماری مشن صحت مند جمہوریت، انسانی حقوق اور شفافیت کو فروغ دینا ہے۔ ہم دنیا بھر سے خبریں جمع کرتے ہیں اور انہیں درست اور غیر جانبدار طریقے سے پیش کرتے ہیں۔"
                    : "Our mission is to promote healthy democracy, human rights, and transparency. We gather news from around the world and present it accurately and impartially."
                  }
                </p>
              </div>
            </div>
            <div className="p-12 lg:p-16 bg-red-50">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-red-600"></div>
                  <h3 className="text-3xl font-black uppercase tracking-tight">
                    {isUrdu ? "ویژن" : "Vision"}
                  </h3>
                </div>
                <div className="w-20 h-0.5 bg-black"></div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {isUrdu
                    ? "ہماری ویژن ایک ایسی دنیا ہے جہاں ہر شخص درست معلومات تک رسائی رکھتا ہے اور آزاد صحافت کا احترام کیا جاتا ہے۔"
                    : "Our vision is a world where everyone has access to accurate information and freedom of the press is respected."
                  }
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollBasedAnimation>

      {/* Values Section */}
      <ScrollBasedAnimation direction="up" delay={0.5}>
        <section className="max-w-7xl mx-auto mb-40">
          <div className="text-center mb-20">
            <div className="w-16 h-0.5 bg-red-600 mx-auto mb-8"></div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
              {isUrdu ? "ہماری اقدار" : "Our Values"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-black">
            <div className="group p-10 border-b md:border-r md:border-b-0 border-black hover:bg-black transition-all duration-500">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-black uppercase text-xl tracking-tight group-hover:text-white transition-colors">
                    {isUrdu ? "سچائی اور درستگی" : "Truth & Accuracy"}
                  </h4>
                  <div className="w-6 h-6 border-2 border-black group-hover:border-white transition-colors"></div>
                </div>
                <p className="text-gray-700 group-hover:text-gray-300 leading-relaxed transition-colors">
                  {isUrdu
                    ? "ہم ہمیشہ سچائی اور درستگی کو ترجیح دیتے ہیں اور ہماری رپورٹنگ میں کوئی سمجھوتہ نہیں کرتے۔"
                    : "We always prioritize truth and accuracy and make no compromises in our reporting."
                  }
                </p>
              </div>
            </div>

            <div className="group p-10 border-b border-black hover:bg-red-600 transition-all duration-500">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-black uppercase text-xl tracking-tight group-hover:text-white transition-colors">
                    {isUrdu ? "غیر جانبداری" : "Impartiality"}
                  </h4>
                  <div className="w-6 h-6 border-2 border-black group-hover:border-white transition-colors"></div>
                </div>
                <p className="text-gray-700 group-hover:text-white leading-relaxed transition-colors">
                  {isUrdu
                    ? "ہم تمام فریقوں کی نمائندگی کرتے ہیں اور ہماری رپورٹنگ میں کوئی تعصب نہیں ہوتا۔"
                    : "We represent all parties and there is no bias in our reporting."
                  }
                </p>
              </div>
            </div>

            <div className="group p-10 border-b md:border-b-0 md:border-r border-black hover:bg-red-600 transition-all duration-500">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-black uppercase text-xl tracking-tight group-hover:text-white transition-colors">
                    {isUrdu ? "شفافیت" : "Transparency"}
                  </h4>
                  <div className="w-6 h-6 border-2 border-black group-hover:border-white transition-colors"></div>
                </div>
                <p className="text-gray-700 group-hover:text-white leading-relaxed transition-colors">
                  {isUrdu
                    ? "ہم اپنے کام میں شفافیت کو یقینی بناتے ہیں اور اپنے سامعین کے ساتھ ایمانداری سے کام کرتے ہیں۔"
                    : "We ensure transparency in our work and deal honestly with our audience."
                  }
                </p>
              </div>
            </div>

            <div className="group p-10 hover:bg-black transition-all duration-500">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-black uppercase text-xl tracking-tight group-hover:text-white transition-colors">
                    {isUrdu ? "جدت" : "Innovation"}
                  </h4>
                  <div className="w-6 h-6 border-2 border-black group-hover:border-white transition-colors"></div>
                </div>
                <p className="text-gray-700 group-hover:text-gray-300 leading-relaxed transition-colors">
                  {isUrdu
                    ? "ہم جدید ٹیکنالوجی اور طریقوں کا استعمال کرتے ہیں تاکہ بہترین تجربہ فراہم کریں۔"
                    : "We use modern technology and methods to provide the best experience."
                  }
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollBasedAnimation>

      {/* Call to Action */}
      <ScrollBasedAnimation direction="up" delay={0.6}>
        <section className="max-w-5xl mx-auto">
          <div className="border-2 border-black p-12 md:p-20 text-center relative">
            <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-red-600"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-red-600"></div>
            <div className="space-y-8">
              <div className="w-16 h-0.5 bg-black mx-auto"></div>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
                {isUrdu ? "ہم سے جڑیں" : "Connect With Us"}
              </h3>
              <p className="text-gray-700 text-xl max-w-2xl mx-auto leading-relaxed">
                {isUrdu
                  ? "اگر آپ ہماری کہانی سے متاثر ہوئے ہیں تو ہم سے رابطہ کریں اور ہمارے ساتھ شامل ہوں۔"
                  : "If you've been inspired by our story, contact us and join us."
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a
                  href={isUrdu ? "/ur/contact" : "/en/contact"}
                  className="border-2 border-black px-10 py-5 font-bold text-sm uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300"
                >
                  {isUrdu ? "رابطہ کریں" : "Contact"}
                </a>
                <a
                  href={isUrdu ? "/ur/newsletter" : "/en/newsletter"}
                  className="bg-red-600 text-white px-10 py-5 font-bold text-sm uppercase tracking-[0.2em] hover:bg-black transition-all duration-300"
                >
                  {isUrdu ? "نیوز لیٹر" : "Newsletter"}
                </a>
              </div>
            </div>
          </div>
        </section>
      </ScrollBasedAnimation>
    </main>
  );
}