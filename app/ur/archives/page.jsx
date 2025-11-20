import React from 'react'
import Archives from '@/components/ArchivesPage/Archives'

export const metadata = {
  title: 'خبریں آرکائیوز - ڈا اولس غگ | تاریخی خبر آرٹیکلز براؤز کریں',
  description: 'ہمارے جامع خبریں آرکائیوز کے ذریعے براؤز کریں۔ ڈا اولس غگ سے ماحولیات، اے آئی، فیکٹ چیک، پاکستان، سعودی عرب، عالمی خبریں، کھیلوں، اور موسم کی اپ ڈیٹس پر تاریخی آرٹیکلز تک رسائی حاصل کریں۔',
  keywords: 'ڈا اولس غگ آرکائیوز, پاکستان خبریں آرکائیوز, پاکستان تاریخی خبریں, گزشتہ خبر آرٹیکلز, پاکستان آرکائیوڈ خبریں, پاکستان پرانی خبریں, پاکستان خبر ڈیٹابیس',
  openGraph: {
    title: 'خبریں آرکائیوز - ڈا اولس غگ | تاریخی خبر آرٹیکلز براؤز کریں',
    description: 'ہمارے جامع خبریں آرکائیوز کے ذریعے براؤز کریں۔ ڈا اولس غگ سے ماحولیات، اے آئی، فیکٹ چیک، پاکستان، سعودی عرب، عالمی خبریں، کھیلوں، اور موسم کی اپ ڈیٹس پر تاریخی آرٹیکلز تک رسائی حاصل کریں۔',
    url: 'https://daolasghaag.com/ur/archives',
    siteName: 'ڈا اولس غگ',
    images: [
      {
        url: 'https://daolasghaag.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ڈا اولس غگ خبریں آرکائیوز',
      },
    ],
    locale: 'ur_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'خبریں آرکائیوز - ڈا اولس غگ | تاریخی خبر آرٹیکلز براؤز کریں',
    description: 'ہمارے جامع خبریں آرکائیوز کے ذریعے براؤز کریں۔',
    images: ['https://daolasghaag.com/og-image.jpg'],
    creator: '@da_olass_ghag',
  },
  alternates: {
    canonical: 'https://daolasghaag.com/ur/archives',
  },
};

const ArchivesPage = () => {
  return (
    <div dir="rtl">
    <Archives/>
    </div>
  )
}

export default ArchivesPage