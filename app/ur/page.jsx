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
  title: 'ڈا اولس غگ – ماحولیات، اے آئی، فیکٹ چیک، پاکستان، سعودی عرب، عالمی اپ ڈیٹس، کھیلوں اور موسم کی تازہ ترین خبریں',
  description: 'ڈا اولس غگ میں خوش آمدید — تصدیق شدہ، تیز اور مؤثر خبریں کے لیے آپ کا ڈیجیٹل مرکز۔ ہم ماحولیات، مصنوعی ذہانت، فیکٹ چیکنگ، پاکستان اور سعودی عرب کی اپ ڈیٹس، عالمی خبریں، کھیلوں کی خصوصیات، اور روزانہ موسم کی رپورٹس کا احاطہ کرتے ہیں۔ ہمارا مشن ہر پلیٹ فارم پر اصلی صحافت فراہم کرنا ہے — فیس بک، یوٹیوب، ٹک ٹاک، انسٹاگرام، اور واٹس ایپ۔ ڈا اولس غگ کے ساتھ باخبر رہیں، جہاں سچائی ٹیکنالوجی سے ملتی ہے۔',
  keywords: 'ڈا اولس غگ, ڈا اولس غگ خبریں, پاکستان خبریں, سعودی خبریں, عالمی خبریں, اے آئی خبریں, ماحولیات خبریں, پاکستان فیکٹ چیک, پاکستان بریکنگ خبریں, اردو خبریں, پشتو خبریں, کھیلوں خبریں, موسم اپ ڈیٹس, پاکستان ڈیجیٹل صحافت, آن لائن خبریں ویب سائٹ, پاکستان قابل اعتماد خبریں, ٹیکنالوجی خبریں, آب و ہوا تبدیلی خبریں',
  openGraph: {
    title: 'ڈا اولس غگ – تصدیق شدہ خبریں اور عالمی اپ ڈیٹس',
    description: 'ماحولیات، اے آئی، فیکٹ چیک، پاکستان، سعودی عرب، کھیلوں اور موسم پر قابل اعتماد خبریں کوریج۔',
    url: 'https://daolasghaag.com/ur',
    siteName: 'ڈا اولس غگ',
    images: [
      {
        url: 'https://daolasghaag.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ڈا اولس غگ - تازہ ترین خبریں',
      },
    ],
    locale: 'ur_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ڈا اولس غگ – تصدیق شدہ خبریں اور عالمی اپ ڈیٹس',
    description: 'ماحولیات، اے آئی، فیکٹ چیک، پاکستان، سعودی عرب، کھیلوں اور موسم پر قابل اعتماد خبریں کوریج۔',
    images: ['https://daolasghaag.com/og-image.jpg'],
    creator: '@da_olass_ghag',
  },
  alternates: {
    canonical: 'https://daolasghaag.com/ur',
    languages: {
      'en': 'https://daolasghaag.com/en',
      'ur': 'https://daolasghaag.com/ur',
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