"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search, ServerCrash, Zap, ArrowLeft } from "lucide-react";

// --- New: Glitch/Scanline effect component for a creative touch ---
const GlitchText = ({ children, className = "" }) => (
  <span className={`relative inline-block ${className}`}>
    <span className="absolute inset-0 text-red-500 transform translate-x-1 translate-y-1 mix-blend-multiply opacity-75 pointer-events-none">
      {children}
    </span>
    <span className="absolute inset-0 text-cyan-500 transform -translate-x-1 -translate-y-1 mix-blend-multiply opacity-75 pointer-events-none">
      {children}
    </span>
    <span className="relative z-10">{children}</span>
  </span>
);
// ------------------------------------------------------------------

export default function NotFound() {
  const pathname = usePathname();
  const isUrdu = pathname.startsWith("/ur");
  const locale = isUrdu ? "ur" : "en";

  const messages = {
    en: {
      title: "File Not Found",
      code: "404",
      tagline: "🚨 PROTOCOL FAILURE: DATA CORRUPTION 🚨",
      message: "The requested document could not be located on the server. The connection link may be broken, or the page ID was never assigned.",
      actionPrompt: "Initiate recovery sequence:",
      backHome: "Return to Base Command",
      errorDetails: "System Log Entry"
    },
    ur: {
      title: "فائل نہیں ملی",
      code: "404",
      tagline: "🚨 پروٹوکول ناکام: ڈیٹا کرپشن 🚨",
      message: "مطلوبہ دستاویز سرور پر نہیں مل سکی۔ کنکشن لنک ٹوٹ گیا ہو گا یا صفحہ ID کبھی تفویض نہیں کی گئی تھی۔",
      actionPrompt: "بازیافت کا تسلسل شروع کریں:",
      backHome: "بنیادی کمانڈ پر واپس جائیں",
      errorDetails: "سسٹم لاگ اندراج"
    }
  };

  const msg = messages[locale];

  return (
    <div className={`min-h-screen flex items-center justify-center bg-white text-gray-800 ${isUrdu ? "rtl font-urdu" : "ltr font-sans"}`}>
      
      {/* Background Grid/Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAnIGhlaWdodD0nMTAwJz4KICA8cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlIGZpbGw9J2JsYWNrJy8+CiAgPGNpcmNsZSBjeD0nNTAnIGN5PSc1MCcgcj0nMScgZmlsbD0ncmVkJy8+Cjwvc3ZnPg==')] bg-repeat bg-size-[20px_20px] animate-pulse-slow"></div>
      </div>
      
      {/* Main Container - High Contrast Panel */}
      <div className="relative z-10 text-center p-10 md:p-16 max-w-4xl w-full">
        
        {/* Header Tagline */}
        <div className="flex flex-col items-center justify-center mb-8">
          <Zap className="w-10 h-10 text-[#B80000] mb-3 animate-ping-slow" />
          <h3 className="text-sm md:text-md font-bold text-red-400 uppercase tracking-[0.3em]">
            {msg.tagline}
          </h3>
        </div>

        {/* Error Code and Title */}
        <div className="mb-8 border-b border-gray-700 pb-6">
          <h1 className="text-8xl md:text-10xl font-extrabold text-[#B80000] leading-none mb-4 font-mono">
            <GlitchText>{msg.code}</GlitchText>
          </h1>
          <h2 className="text-3xl font-bold text-white uppercase tracking-wider border-t border-gray-700 pt-4 mt-4">
            {msg.title}
          </h2>
        </div>

        {/* Message */}
        <p className="text-lg text-gray-400 mb-10 leading-relaxed border-l-4 border-l-gray-600 pl-4 pr-4">
          {msg.message}
        </p>
        
        {/* Call to Action Prompt */}
        <p className="text-md font-semibold text-gray-500 mb-4">{msg.actionPrompt}</p>

        {/* Action Button */}
        <Link
          href={isUrdu ? "/ur" : "/en"}
          className={`inline-flex items-center gap-3 px-8 py-4 bg-[#B80000] text-white text-lg font-bold uppercase transition-all duration-300 shadow-xl hover:bg-red-700 hover:shadow-[0_0_20px_rgba(184,0,0,0.8)] border border-white/20`}
        >
          {isUrdu ? <ArrowLeft className="w-5 h-5" /> : null}
          {msg.backHome}
          {!isUrdu ? <ArrowLeft className="w-5 h-5 rotate-180" /> : null}
        </Link>
        
        {/* Footer Detail */}
        <div className="mt-12 pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
            <ServerCrash className="w-4 h-4 text-gray-700" />
            {msg.errorDetails}: <span className="font-mono text-gray-400">{msg.code}</span>
          </p>
        </div>
      </div>
      
      {/* Required CSS for effects (place this inside a global style or use Tailwind's arbitrary values if available) 
          Note: For a Next.js component, you might need to add these keyframes to your global CSS file.
      */}
      <style jsx global>{`
        .animate-ping-slow {
          animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-pulse-slow {
             animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .font-urdu {
            /* Ensure the desired Urdu font is loaded */
            font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.15;
          }
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
        
        /* Apply glitch effect to the component */
        .glitch-effect {
          animation: glitch 1s infinite;
        }

        /* Glitch Text specific styling */
        .relative.inline-block {
          animation: glitch 4s infinite linear alternate-reverse;
        }
      `}</style>
    </div>
  );
}