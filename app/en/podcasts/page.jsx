import React from 'react'
import Podcasts from '@/components/PodcastsPage/Podcasts'

export const metadata = {
  title: 'Podcasts - Da Olass Ghag | Audio Content on Environment, AI, Fact Check & Global News',
  description: 'Listen to our interesting podcast series and gain deep insights on various topics including Environment, Artificial Intelligence, Fact-Check reports, Pakistan, Saudi Arabia, Global News, Sports, and Weather Updates.',
  keywords: 'Da Olass Ghag podcasts, Pakistan podcast news, Saudi Arabia podcasts, AI podcasts, environment podcasts, fact check podcasts, global news podcasts, sports podcasts, weather podcasts, audio journalism Pakistan',
  openGraph: {
    title: 'Podcasts - Da Olass Ghag | Audio Content',
    description: 'Listen to our interesting podcast series and gain deep insights on various topics including Environment, AI, Fact-Check reports, Pakistan, Saudi Arabia, Global News, Sports, and Weather Updates.',
    url: 'https://daolasghaag.com/en/podcasts',
    siteName: 'Da Olass Ghag',
    images: [
      {
        url: 'https://daolasghaag.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Da Olass Ghag Podcasts',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Podcasts - Da Olass Ghag | Audio Content',
    description: 'Listen to our interesting podcast series and gain deep insights on various topics.',
    images: ['https://daolasghaag.com/og-image.jpg'],
    creator: '@da_olass_ghag',
  },
  alternates: {
    canonical: 'https://daolasghaag.com/en/podcasts',
  },
};

const PodcastsPage = () => {
  return (
    <>
    <Podcasts/>
    </>
  )
}

export default PodcastsPage