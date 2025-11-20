import React from 'react'
import Podcasts from '@/components/PodcastsPage/Podcasts'

export const metadata = {
  title: 'پوڈکاسٹ - ڈا اولس غگ | ماحولیات، اے آئی، فیکٹ چیک اور عالمی خبریں پر آڈیو مواد',
  description: 'ہماری دلچسپ پوڈکاسٹ سیریز سنیں اور مختلف موضوعات پر گہری بصیرت حاصل کریں بشمول ماحولیات، مصنوعی ذہانت، فیکٹ چیک رپورٹس، پاکستان، سعودی عرب، عالمی خبریں، کھیلوں، اور موسم کی اپ ڈیٹس۔',
  keywords: 'ڈا اولس غگ پوڈکاسٹ, پاکستان پوڈکاسٹ خبریں, سعودی عرب پوڈکاسٹ, اے آئی پوڈکاسٹ, ماحولیات پوڈکاسٹ, فیکٹ چیک پوڈکاسٹ, عالمی خبریں پوڈکاسٹ, کھیلوں پوڈکاسٹ, موسم پوڈکاسٹ, پاکستان آڈیو صحافت',
  openGraph: {
    title: 'پوڈکاسٹ - ڈا اولس غگ | آڈیو مواد',
    description: 'ہماری دلچسپ پوڈکاسٹ سیریز سنیں اور مختلف موضوعات پر گہری بصیرت حاصل کریں۔',
    url: 'https://daolasghaag.com/ur/podcasts',
    siteName: 'ڈا اولس غگ',
    images: [
      {
        url: 'https://daolasghaag.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ڈا اولس غگ پوڈکاسٹ',
      },
    ],
    locale: 'ur_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'پوڈکاسٹ - ڈا اولس غگ | آڈیو مواد',
    description: 'ہماری دلچسپ پوڈکاسٹ سیریز سنیں اور مختلف موضوعات پر گہری بصیرت حاصل کریں۔',
    images: ['https://daolasghaag.com/og-image.jpg'],
    creator: '@da_olass_ghag',
  },
  alternates: {
    canonical: 'https://daolasghaag.com/ur/podcasts',
  },
};

const PodcastsPage = () => {
  return (
    <div dir="rtl">
    <Podcasts/>
    </div>
  )
}

export default PodcastsPage