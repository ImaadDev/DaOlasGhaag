import React from 'react'
import Videos from '@/components/VideosPage/Videos'

export const metadata = {
  title: 'Videos - Da Olass Ghag | Latest Video Content on Environment, AI, Fact Check & Global News',
  description: 'Watch our interesting video series and gain deep insights on various topics including Environment, Artificial Intelligence, Fact-Check reports, Pakistan, Saudi Arabia, Global News, Sports, and Weather Updates.',
  keywords: 'Da Olass Ghag videos, Pakistan video news, Saudi Arabia videos, AI videos, environment videos, fact check videos, global news videos, sports videos, weather videos, video journalism Pakistan',
  openGraph: {
    title: 'Videos - Da Olass Ghag | Latest Video Content',
    description: 'Watch our interesting video series and gain deep insights on various topics including Environment, AI, Fact-Check reports, Pakistan, Saudi Arabia, Global News, Sports, and Weather Updates.',
    url: 'https://daolasghaag.com/en/videos',
    siteName: 'Da Olass Ghag',
    images: [
      {
        url: 'https://daolasghaag.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Da Olass Ghag Videos',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Videos - Da Olass Ghag | Latest Video Content',
    description: 'Watch our interesting video series and gain deep insights on various topics.',
    images: ['https://daolasghaag.com/og-image.jpg'],
    creator: '@da_olass_ghag',
  },
  alternates: {
    canonical: 'https://daolasghaag.com/en/videos',
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