import React from 'react'
import Contact from '@/components/ContactPage/Contact'

export const metadata = {
  title: 'Contact Us - Da Olass Ghag | Get in Touch with Our News Team',
  description: 'Contact Da Olass Ghag for news tips, partnerships, or inquiries. Reach out to our digital news platform covering Environment, AI, Fact-Check, Pakistan, Saudi Arabia, Global News, Sports, and Weather Updates.',
  keywords: 'Da Olass Ghag contact, Pakistan news contact, news tips Pakistan, media partnerships Pakistan, contact digital news Pakistan, Da Olass Ghag email, news inquiries Pakistan',
  openGraph: {
    title: 'Contact Us - Da Olass Ghag | Get in Touch with Our News Team',
    description: 'Contact Da Olass Ghag for news tips, partnerships, or inquiries. Reach out to our digital news platform covering Environment, AI, Fact-Check, Pakistan, Saudi Arabia, Global News, Sports, and Weather Updates.',
    url: 'https://daolasghaag.com/en/contact',
    siteName: 'Da Olass Ghag',
    images: [
      {
        url: 'https://daolasghaag.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Da Olass Ghag',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Da Olass Ghag | Get in Touch with Our News Team',
    description: 'Contact Da Olass Ghag for news tips, partnerships, or inquiries.',
    images: ['https://daolasghaag.com/og-image.jpg'],
    creator: '@da_olass_ghag',
  },
  alternates: {
    canonical: 'https://daolasghaag.com/en/contact',
  },
};

const ContactPage = () => {
  return (
    <>
    <Contact/>
    </>
  )
}

export default ContactPage