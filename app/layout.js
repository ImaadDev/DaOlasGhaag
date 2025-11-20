import { Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  weight: ["400", "700"],
  variable: "--font-cairo",
});

export const metadata = {
  title: "Da Olass Ghag – Latest News on Environment, AI, Fact Check, Pakistan, Saudi Arabia, Global Updates, Sports & Weather",
  description:
    "Da Olass Ghag is your trusted digital news platform covering Environment, Artificial Intelligence, Fact-Check reports, Pakistan & Saudi News, Global Affairs, Sports, and Weather Updates.",
  keywords:
    "Da Olass Ghag, Da Olass Ghag news, Pakistan news, Saudi news, global news, AI news, environment news, fact check Pakistan, breaking news Pakistan, Urdu news, Pashto news, sports news, weather updates, digital journalism Pakistan, online news website, trustworthy news Pakistan, technology news, climate change news",
  metadataBase: new URL("https://daolasghaag.com"),
  alternates: {
    canonical: "https://daolasghaag.com",
  },
  openGraph: {
    title: "Da Olass Ghag – Latest Verified News & Global Updates",
    description:
      "Reliable news coverage on Environment, AI, Fact-Check, Pakistan, Saudi Arabia, Sports & Weather.",
    url: "https://daolasghaag.com",
    siteName: "Da Olass Ghag",
    images: [
      {
        url: "https://daolasghaag.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Da Olass Ghag - Latest News",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Da Olass Ghag – Latest Verified News & Global Updates",
    description:
      "Reliable news coverage on Environment, AI, Fact-Check, Pakistan, Saudi Arabia, Sports & Weather.",
    images: ["https://daolasghaag.com/logo.png"],
    creator: "@da_olass_ghag",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />

        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              name: "Da Olass Ghag",
              foundingDate: "2017",
              url: "https://daolasghaag.com",
              logo: "https://daolasghaag.com/logo.png",
              sameAs: [
                "https://www.facebook.com/mudam675",
                "https://www.instagram.com/da_olass_ghag",
                "https://x.com/da_olass_ghag",
                "https://www.youtube.com/@DaOlassGhag",
              ],
            }),
          }}
        />

        {/* GOOGLE ANALYTICS SCRIPTS */}
        <GoogleAnalytics GA_ID={process.env.NEXT_PUBLIC_GA_ID} />
      </head>

      <body className={`${cairo.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
