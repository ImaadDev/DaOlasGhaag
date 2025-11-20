import { Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  weight: ['400', '700'], // you can add multiple weights
  variable: '--font-cairo', // optional: CSS variable
});

export const metadata = {
  title: "Da Olass Ghag – Latest News on Environment, AI, Fact Check, Pakistan, Saudi Arabia, Global Updates, Sports & Weather",
  description: "Da Olass Ghag is your trusted digital news platform covering Environment, Artificial Intelligence, Fact-Check reports, Pakistan & Saudi News, Global Affairs, Sports, and Weather Updates. Fast, reliable, and available on all social media platforms.",
  keywords: "Da Olass Ghag, Da Olass Ghag news, Pakistan news, Saudi news, global news, AI news, environment news, fact check Pakistan, breaking news Pakistan, Urdu news, Pashto news, sports news, weather updates, digital journalism Pakistan, online news website, trustworthy news Pakistan, technology news, climate change news",
  authors: [{ name: "Da Olass Ghag" }],
  creator: "Da Olass Ghag",
  publisher: "Da Olass Ghag",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://daolasghaag.com'),
  alternates: {
    canonical: 'https://daolasghaag.com',
  },
  openGraph: {
    title: "Da Olass Ghag – Latest Verified News & Global Updates",
    description: "Reliable news coverage on Environment, AI, Fact-Check, Pakistan, Saudi Arabia, Sports & Weather.",
    url: "https://daolasghaag.com",
    siteName: "Da Olass Ghag",
    images: [
      {
        url: "https://daolasghaag.com/og-image.jpg",
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
    description: "Reliable news coverage on Environment, AI, Fact-Check, Pakistan, Saudi Arabia, Sports & Weather.",
    images: ["https://daolasghaag.com/og-image.jpg"],
    creator: "@da_olass_ghag",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              "name": "Da Olass Ghag",
              "foundingDate": "2017",
              "url": "https://daolasghaag.com",
              "logo": "https://daolasghaag.com/logo.png",
              "description": "Da Olass Ghag, established in 2017, is a digital news platform covering Environment, AI, Fact-Check, Pakistan, Saudi Arabia, Global News, Sports, and Weather.",
              "sameAs": [
                "https://www.facebook.com/mudam675",
                "https://www.instagram.com/da_olass_ghag?igsh=MXAwa2R1a3V3cnUxMw%3D%3D&utm_source=qr",
                "https://x.com/da_olass_ghag?s=11",
                "https://www.youtube.com/@DaOlassGhag"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${cairo.variable} antialiased`}
      >
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
