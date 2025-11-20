import React from 'react'
import BreakingNews from '@/components/Home/BreakingNews';
import FeaturedStories from '@/components/Home/FeaturedStories';
import LatestNews from '@/components/Home/LatestNews';
import BusinessNews from '@/components/Home/Business';
import PKNews from '@/components/Home/PKNews';
import WorldNews from '@/components/Home/WorldNews';
import Technology from '@/components/Home/Technology';
import Health from '@/components/Home/Health';
import Climate from '@/components/Home/Climate';
import Sports from '@/components/Home/Sports';
import Entertainment from '@/components/Home/Entertainment';
import FactCheck from '@/components/Home/FactCheck';

export const metadata = {
  title: 'Da Olass Ghag – Latest News on Environment, AI, Fact Check, Pakistan, Saudi Arabia, Global Updates, Sports & Weather',
  description: 'Welcome to Da Olass Ghag — your digital hub for verified, fast, and impactful news. We cover Environment, Artificial Intelligence, Fact-Checking, Pakistan and Saudi Arabia updates, Global News, Sports highlights, and daily Weather reports. Our mission is to deliver authentic journalism on every platform — Facebook, YouTube, TikTok, Instagram, and WhatsApp. Stay informed with Da Olass Ghag, where truth meets technology.',
  keywords: 'Da Olass Ghag, Da Olass Ghag news, Pakistan news, Saudi news, global news, AI news, environment news, fact check Pakistan, breaking news Pakistan, Urdu news, Pashto news, sports news, weather updates, digital journalism Pakistan, online news website, trustworthy news Pakistan, technology news, climate change news',
  openGraph: {
    title: 'Da Olass Ghag – Latest Verified News & Global Updates',
    description: 'Reliable news coverage on Environment, AI, Fact-Check, Pakistan, Saudi Arabia, Sports & Weather.',
    url: 'https://daolasghaag.com/en',
    siteName: 'Da Olass Ghag',
    images: [
      {
        url: 'https://daolasghaag.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'Da Olass Ghag - Latest News',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Da Olass Ghag – Latest Verified News & Global Updates',
    description: 'Reliable news coverage on Environment, AI, Fact-Check, Pakistan, Saudi Arabia, Sports & Weather.',
    images: ['https://daolasghaag.com/logo.png'],
    creator: '@da_olass_ghag',
  },
  alternates: {
    canonical: 'https://daolasghaag.com/en',
    languages: {
      'en': 'https://daolasghaag.com/en',
      'ur': 'https://daolasghaag.com/ur',
    },
  },
};

const Home = () => {
 
  return (
    <>
      <BreakingNews/>
      <FeaturedStories/>
      <LatestNews/>
      <BusinessNews/>
      <PKNews/>
      <WorldNews/>
      <Technology/>
      <Health/>
      <Climate/>
      <Sports/>
      <Entertainment/>
      <FactCheck/>
    </>
  )
}

export default Home