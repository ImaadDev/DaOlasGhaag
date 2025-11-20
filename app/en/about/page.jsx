import React from 'react'
import About from '@/components/AboutPage/About'

export const metadata = {
  title: 'About Us - Da Olass Ghag | Digital News Platform Since 2017',
  description: 'Learn about Da Olass Ghag, established in 2017, a digital news platform covering Environment, AI, Fact-Check, Pakistan, Saudi Arabia, Global News, Sports, and Weather Updates. Our mission is to deliver authentic journalism.',
  keywords: 'Da Olass Ghag about, digital news platform Pakistan, trustworthy news Pakistan, journalism Pakistan, news website Pakistan, Da Olass Ghag history, Pakistani digital media',
  openGraph: {
    title: 'About Us - Da Olass Ghag | Digital News Platform Since 2017',
    description: 'Learn about Da Olass Ghag, established in 2017, a digital news platform covering Environment, AI, Fact-Check, Pakistan, Saudi Arabia, Global News, Sports, and Weather Updates.',
    url: 'https://daolasghaag.com/en/about',
    siteName: 'Da Olass Ghag',
    images: [
      {
        url: 'https://daolasghaag.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About Da Olass Ghag',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Da Olass Ghag | Digital News Platform Since 2017',
    description: 'Learn about Da Olass Ghag, established in 2017, a digital news platform covering Environment, AI, Fact-Check, Pakistan, Saudi Arabia, Global News, Sports, and Weather Updates.',
    images: ['https://daolasghaag.com/og-image.jpg'],
    creator: '@da_olass_ghag',
  },
  alternates: {
    canonical: 'https://daolasghaag.com/en/about',
  },
};

const AboutPage = () => {
  return (
    <>
    <About/>
    </>
  )
}

export default AboutPage