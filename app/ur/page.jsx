import React from 'react'

import BreakingNews from '@/components/Home/BreakingNews';
import LatestNews from '@/components/Home/LatestNews';
import FeaturedStories from '@/components/Home/FeaturedStories';
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
  title: 'بی بی سی خبریں - خبریں اور معلومات کے لیے آپ کا قابل اعتماد ذریعہ',
  description: 'دنیا بھر سے تازہ ترین خبریں، توڑنے والی خبریں اور گہری تجزیہ حاصل کریں۔',
  alternates: {
    canonical: '/ur',
    languages: {
      'en': '/en',
      'ur': '/ur',
    },
  },
};

const Home = () => {
  const featuredArticles = [
    {
      id: 1,
      title: "توڑنے والی خبر: دنیا کو ہلا دینے والا بڑا واقعہ",
      excerpt: "ایک اہم واقعہ پیش آیا ہے جو عالمی امور کو متاثر کرے گا...",
      image: "/placeholder-news.jpg",
      category: "دنیا",
      date: "2024-01-15",
      slug: "/ur/news/breaking-news"
    },
    {
      id: 2,
      title: "مصنوعی ذہانت میں ٹیکنالوجی کی پیش رفت",
      excerpt: "مصنوعی ذہانت کی ٹیکنالوجی میں نئی کامیابیاں صنعتوں کو تبدیل کرنے کا وعدہ کرتی ہیں...",
      image: "/placeholder-tech.jpg",
      category: "ٹیکنالوجی",
      date: "2024-01-14",
      slug: "/ur/news/ai-advances"
    },
    {
      id: 3,
      title: "کھیلوں کی چیمپئن شپ فائنلز کا خلاصہ",
      excerpt: "فائنلز نے ٹاپ ٹیموں کے درمیان ایک ناقابل فراموش مقابلہ پیش کیا...",
      image: "/placeholder-sports.jpg",
      category: "کھیل",
      date: "2024-01-13",
      slug: "/ur/news/sports-finals"
    }
  ];

  return (
    <div dir="rtl">
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
    </div>
  )
}

export default Home