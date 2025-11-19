"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const pathname = usePathname();
  const locale = pathname.startsWith("/ur") ? "ur" : "en";

  const messages = {
    en: {
      title: "404 - Page Not Found",
      message: "The page you're looking for doesn't exist.",
      backHome: "Go back home"
    },
    ur: {
      title: "404 - صفحہ نہیں ملا",
      message: "جو صفحہ آپ تلاش کر رہے ہیں وہ موجود نہیں ہے۔",
      backHome: "گھر واپس جائیں"
    }
  };

  const msg = messages[locale];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">{msg.title.split(' - ')[0]}</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-8">{msg.title.split(' - ')[1]}</h2>
        <p className="text-lg text-gray-600 mb-8">{msg.message}</p>
        <Link
          href={locale === "ur" ? "/ur" : "/en"}
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {msg.backHome}
        </Link>
      </div>
    </div>
  );
}