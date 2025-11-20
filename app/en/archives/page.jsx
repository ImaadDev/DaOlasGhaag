import React from 'react'
import Archives from '@/components/ArchivesPage/Archives'

export const metadata = {
  title: 'News Archives - Da Olass Ghag | Browse Historical News Articles',
  description: 'Browse through our comprehensive news archives. Access historical articles on Environment, AI, Fact-Check, Pakistan, Saudi Arabia, Global News, Sports, and Weather Updates from Da Olass Ghag.',
  keywords: 'Da Olass Ghag archives, news archives Pakistan, historical news Pakistan, past news articles, archived news Pakistan, old news Pakistan, news database Pakistan',
  openGraph: {
    title: 'News Archives - Da Olass Ghag | Browse Historical News Articles',
    description: 'Browse through our comprehensive news archives. Access historical articles on Environment, AI, Fact-Check, Pakistan, Saudi Arabia, Global News, Sports, and Weather Updates from Da Olass Ghag.',
    url: 'https://daolasghaag.com/en/archives',
    siteName: 'Da Olass Ghag',
    images: [
      {
        url: 'https://daolasghaag.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Da Olass Ghag News Archives',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News Archives - Da Olass Ghag | Browse Historical News Articles',
    description: 'Browse through our comprehensive news archives.',
    images: ['https://daolasghaag.com/og-image.jpg'],
    creator: '@da_olass_ghag',
  },
  alternates: {
    canonical: 'https://daolasghaag.com/en/archives',
  },
};

const ArchivesPage = () => {
  return (
    <>
    <Archives/>
    </>
  )
}

export default ArchivesPage