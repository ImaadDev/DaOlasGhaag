"use client";

import { usePathname } from "next/navigation";
import ScrollBasedAnimation from "../ScrollBasedAnimations";
export default function About() {
  const pathname = usePathname();
  const isUrdu = pathname.startsWith("/ur");

  return (
    <main className={`bg-white text-black mx-auto px-6 md:px-16 py-20 md:py-28 leading-relaxed ${isUrdu ? "rtl" : "ltr"}`}>
      {/* Intro */}
      <ScrollBasedAnimation direction="up" delay={0.1}>
        <header className="max-w-5xl mx-auto mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-10 bg-black" />
            <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
              {isUrdu ? "ہمارے بارے میں" : "About Us"}
            </h1>
          </div>
          <p className="text-gray-700 text-lg md:text-xl max-w-3xl">
            {isUrdu
              ? "ہم ایک آزاد اور معتبر نیوز ایجنسی ہیں جو دنیا بھر سے تازہ ترین خبریں اور گہری تجزیہ فراہم کرتی ہے۔"
              : "We are an independent and trusted news agency providing the latest news and in-depth analysis from around the world."
            }
          </p>
        </header>
      </ScrollBasedAnimation>

      {/* Story Section */}
      <ScrollBasedAnimation direction="right" delay={0.2}>
        <section className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-6 border-b border-black pb-3">
            {isUrdu ? "ہماری کہانی" : "Our Story"}
          </h2>
          <div className="space-y-6 text-gray-700 text-lg md:text-xl">
            <p>
              {isUrdu
                ? "ہماری کہانی 2020 میں شروع ہوئی جب ایک گروپ صحافیوں نے محسوس کیا کہ دنیا کو ایک ایسی نیوز ایجنسی کی ضرورت ہے جو سچائی کو فروغ دے اور غیر جانبدار رپورٹنگ کرے۔"
                : "Our story began in 2020 when a group of journalists realized that the world needed a news agency that promotes truth and provides impartial reporting."
              }
            </p>
            <p>
              {isUrdu
                ? "آج ہم دنیا کے مختلف حصوں میں کام کرتے ہیں اور ہر روز لاکھوں لوگوں تک پہنچتے ہیں، انہیں درست اور بروقت معلومات فراہم کرتے ہیں۔"
                : "Today we work across different parts of the world and reach millions of people every day, providing them with accurate and timely information."
              }
            </p>
          </div>
        </section>
      </ScrollBasedAnimation>

      {/* Mission Section */}
      <ScrollBasedAnimation direction="left" delay={0.3}>
        <section className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-6 border-b border-black pb-3">
            {isUrdu ? "ہماری مشن" : "Our Mission"}
          </h2>
          <p className="text-gray-700 text-lg md:text-xl">
            {isUrdu
              ? "ہماری مشن صحت مند جمہوریت، انسانی حقوق اور شفافیت کو فروغ دینا ہے۔ ہم دنیا بھر سے خبریں جمع کرتے ہیں اور انہیں درست اور غیر جانبدار طریقے سے پیش کرتے ہیں۔"
              : "Our mission is to promote healthy democracy, human rights, and transparency. We gather news from around the world and present it accurately and impartially."
            }
          </p>
        </section>
      </ScrollBasedAnimation>

      {/* Vision Section */}
      <ScrollBasedAnimation direction="up" delay={0.4}>
        <section className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-6 border-b border-black pb-3">
            {isUrdu ? "ہماری ویژن" : "Our Vision"}
          </h2>
          <p className="text-gray-700 text-lg md:text-xl">
            {isUrdu
              ? "ہماری ویژن ایک ایسی دنیا ہے جہاں ہر شخص درست معلومات تک رسائی رکھتا ہے اور آزاد صحافت کا احترام کیا جاتا ہے۔"
              : "Our vision is a world where everyone has access to accurate information and freedom of the press is respected."
            }
          </p>
        </section>
      </ScrollBasedAnimation>

      {/* Values Section */}
      <ScrollBasedAnimation direction="up" delay={0.5}>
        <section className="max-w-5xl mx-auto mb-24">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-10 border-b border-black pb-3">
            {isUrdu ? "ہماری اقدار" : "Our Values"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 text-gray-700 text-lg md:text-xl">
            <div>
              <h3 className="font-bold uppercase mb-3">
                {isUrdu ? "سچائی اور درستگی" : "Truth & Accuracy"}
              </h3>
              <p>
                {isUrdu
                  ? "ہم ہمیشہ سچائی اور درستگی کو ترجیح دیتے ہیں اور ہماری رپورٹنگ میں کوئی سمجھوتہ نہیں کرتے۔"
                  : "We always prioritize truth and accuracy and make no compromises in our reporting."
                }
              </p>
            </div>
            <div>
              <h3 className="font-bold uppercase mb-3">
                {isUrdu ? "غیر جانبداری" : "Impartiality"}
              </h3>
              <p>
                {isUrdu
                  ? "ہم تمام فریقوں کی نمائندگی کرتے ہیں اور ہماری رپورٹنگ میں کوئی تعصب نہیں ہوتا۔"
                  : "We represent all parties and there is no bias in our reporting."
                }
              </p>
            </div>
            <div>
              <h3 className="font-bold uppercase mb-3">
                {isUrdu ? "شفافیت" : "Transparency"}
              </h3>
              <p>
                {isUrdu
                  ? "ہم اپنے کام میں شفافیت کو یقینی بناتے ہیں اور اپنے سامعین کے ساتھ ایمانداری سے کام کرتے ہیں۔"
                  : "We ensure transparency in our work and deal honestly with our audience."
                }
              </p>
            </div>
            <div>
              <h3 className="font-bold uppercase mb-3">
                {isUrdu ? "انویسٹیشن" : "Innovation"}
              </h3>
              <p>
                {isUrdu
                  ? "ہم جدید ٹیکنالوجی اور طریقوں کا استعمال کرتے ہیں تاکہ بہترین تجربہ فراہم کریں۔"
                  : "We use modern technology and methods to provide the best experience."
                }
              </p>
            </div>
          </div>
        </section>
      </ScrollBasedAnimation>

      {/* Closing Section */}
      <ScrollBasedAnimation direction="up" delay={0.6}>
        <footer className="max-w-4xl mx-auto text-center border-t border-gray-300 pt-16">
          <h3 className="text-3xl md:text-4xl font-bold uppercase mb-4">
            {isUrdu ? "ہم سے جڑیں" : "Connect With Us"}
          </h3>
          <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            {isUrdu
              ? "اگر آپ ہماری کہانی سے متاثر ہوئے ہیں تو ہم سے رابطہ کریں اور ہمارے ساتھ شامل ہوں۔"
              : "If you've been inspired by our story, contact us and join us."
            }
          </p>
          <a
            href="/contact"
            className="inline-block border-2 border-black px-10 py-3 font-bold text-sm tracking-widest hover:bg-black hover:text-white transition-all"
          >
            {isUrdu ? "رابطہ کریں" : "Contact Us"}
          </a>
        </footer>
      </ScrollBasedAnimation>
    </main>
  );
}