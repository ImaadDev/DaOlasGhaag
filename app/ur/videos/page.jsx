import React from 'react'
import Videos from '@/components/VideosPage/Videos'

export const metadata = {
  title: 'ویڈیوز - ڈا اولس غگ | ماحولیات، اے آئی، فیکٹ چیک اور عالمی خبریں پر تازہ ترین ویڈیو مواد',
  description: 'ہماری دلچسپ ویڈیو سیریز دیکھیں اور مختلف موضوعات پر گہری بصیرت حاصل کریں بشمول ماحولیات، مصنوعی ذہانت، فیکٹ چیک رپورٹس، پاکستان، سعودی عرب، عالمی خبریں، کھیلوں، اور موسم کی اپ ڈیٹس۔',
  keywords: 'ڈا اولس غگ ویڈیوز, پاکستان ویڈیو خبریں, سعودی عرب ویڈیوز, اے آئی ویڈیوز, ماحولیات ویڈیوز, فیکٹ چیک ویڈیوز, عالمی خبریں ویڈیوز, کھیلوں ویڈیوز, موسم ویڈیوز, پاکستان ویڈیو صحافت',
  openGraph: {
    title: 'ویڈیوز - ڈا اولس غگ | تازہ ترین ویڈیو مواد',
    description: 'ہماری دلچسپ ویڈیو سیریز دیکھیں اور مختلف موضوعات پر گہری بصیرت حاصل کریں۔',
    url: 'https://daolasghaag.com/ur/videos',
    siteName: 'ڈا اولس غگ',
    images: [
      {
        url: 'https://daolasghaag.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ڈا اولس غگ ویڈیوز',
      },
    ],
    locale: 'ur_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ویڈیوز - ڈا اولس غگ | تازہ ترین ویڈیو مواد',
    description: 'ہماری دلچسپ ویڈیو سیریز دیکھیں اور مختلف موضوعات پر گہری بصیرت حاصل کریں۔',
    images: ['https://daolasghaag.com/og-image.jpg'],
    creator: '@da_olass_ghag',
  },
  alternates: {
    canonical: 'https://daolasghaag.com/ur/videos',
  },
};

const VideosPage = () => {
  return (
    <>
    <Videos/>
    </>
  )
}

export default VideosPage