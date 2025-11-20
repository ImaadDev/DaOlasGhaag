import React from 'react'
import Contact from '@/components/ContactPage/Contact'

export const metadata = {
  title: 'ہم سے رابطہ کریں - ڈا اولس غگ | ہماری نیوز ٹیم سے رابطہ کریں',
  description: 'خبر ٹپس، پارٹنرشپس، یا سوالات کے لیے ڈا اولس غگ سے رابطہ کریں۔ ہمارے ڈیجیٹل نیوز پلیٹ فارم سے رابطہ کریں جو ماحولیات، اے آئی، فیکٹ چیک، پاکستان، سعودی عرب، عالمی خبریں، کھیلوں، اور موسم کی اپ ڈیٹس کا احاطہ کرتا ہے۔',
  keywords: 'ڈا اولس غگ رابطہ, پاکستان خبریں رابطہ, پاکستان خبر ٹپس, پاکستان میڈیا پارٹنرشپس, پاکستان ڈیجیٹل خبریں رابطہ, ڈا اولس غگ ای میل, پاکستان خبر سوالات',
  openGraph: {
    title: 'ہم سے رابطہ کریں - ڈا اولس غگ | ہماری نیوز ٹیم سے رابطہ کریں',
    description: 'خبر ٹپس، پارٹنرشپس، یا سوالات کے لیے ڈا اولس غگ سے رابطہ کریں۔ ہمارے ڈیجیٹل نیوز پلیٹ فارم سے رابطہ کریں جو ماحولیات، اے آئی، فیکٹ چیک، پاکستان، سعودی عرب، عالمی خبریں، کھیلوں، اور موسم کی اپ ڈیٹس کا احاطہ کرتا ہے۔',
    url: 'https://daolasghaag.com/ur/contact',
    siteName: 'ڈا اولس غگ',
    images: [
      {
        url: 'https://daolasghaag.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ڈا اولس غگ سے رابطہ کریں',
      },
    ],
    locale: 'ur_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ہم سے رابطہ کریں - ڈا اولس غگ | ہماری نیوز ٹیم سے رابطہ کریں',
    description: 'خبر ٹپس، پارٹنرشپس، یا سوالات کے لیے ڈا اولس غگ سے رابطہ کریں۔',
    images: ['https://daolasghaag.com/og-image.jpg'],
    creator: '@da_olass_ghag',
  },
  alternates: {
    canonical: 'https://daolasghaag.com/ur/contact',
  },
};

const ContactPage = () => {
  return (
    <div dir="rtl">
    <Contact/>
    </div>
  )
}

export default ContactPage