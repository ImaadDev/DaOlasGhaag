import React from 'react'
import About from '@/components/AboutPage/About'

export const metadata = {
  title: 'ہمارے بارے میں - ڈا اولس غگ | 2017 سے ڈیجیٹل نیوز پلیٹ فارم',
  description: 'ڈا اولس غگ کے بارے میں جانیں، جو 2017 میں قائم کیا گیا تھا، ایک ڈیجیٹل نیوز پلیٹ فارم جو ماحولیات، اے آئی، فیکٹ چیک، پاکستان، سعودی عرب، عالمی خبریں، کھیلوں، اور موسم کی اپ ڈیٹس کا احاطہ کرتا ہے۔ ہمارا مشن اصلی صحافت فراہم کرنا ہے۔',
  keywords: 'ڈا اولس غگ کے بارے میں, پاکستان ڈیجیٹل نیوز پلیٹ فارم, پاکستان قابل اعتماد خبریں, پاکستان صحافت, پاکستان نیوز ویب سائٹ, ڈا اولس غگ تاریخ, پاکستانی ڈیجیٹل میڈیا',
  openGraph: {
    title: 'ہمارے بارے میں - ڈا اولس غگ | 2017 سے ڈیجیٹل نیوز پلیٹ فارم',
    description: 'ڈا اولس غگ کے بارے میں جانیں، جو 2017 میں قائم کیا گیا تھا، ایک ڈیجیٹل نیوز پلیٹ فارم جو ماحولیات، اے آئی، فیکٹ چیک، پاکستان، سعودی عرب، عالمی خبریں، کھیلوں، اور موسم کی اپ ڈیٹس کا احاطہ کرتا ہے۔',
    url: 'https://daolasghaag.com/ur/about',
    siteName: 'ڈا اولس غگ',
    images: [
      {
        url: 'https://daolasghaag.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ڈا اولس غگ کے بارے میں',
      },
    ],
    locale: 'ur_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ہمارے بارے میں - ڈا اولس غگ | 2017 سے ڈیجیٹل نیوز پلیٹ فارم',
    description: 'ڈا اولس غگ کے بارے میں جانیں، جو 2017 میں قائم کیا گیا تھا، ایک ڈیجیٹل نیوز پلیٹ فارم جو ماحولیات، اے آئی، فیکٹ چیک، پاکستان، سعودی عرب، عالمی خبریں، کھیلوں، اور موسم کی اپ ڈیٹس کا احاطہ کرتا ہے۔',
    images: ['https://daolasghaag.com/og-image.jpg'],
    creator: '@da_olass_ghag',
  },
  alternates: {
    canonical: 'https://daolasghaag.com/ur/about',
  },
};

const AboutPage = () => {
  return (
    <div dir="rtl">
    <About/>
    </div>
  )
}

export default AboutPage