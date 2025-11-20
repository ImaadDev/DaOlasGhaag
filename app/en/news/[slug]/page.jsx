import React from 'react'
import NewsDetails from '@/components/NewsDetails'
import sanityClient from '@/lib/sanityClient'

export async function generateMetadata({ params }) {
  try {
    const query = `*[_type == "news" && slug.current == $slug][0]{
      title, summary, publishedAt, images, categories, videoUrl
    }`;
    const news = await sanityClient.fetch(query, { slug: params.slug });

    if (!news) {
      return {
        title: 'Article Not Found - Da Olass Ghag',
        description: 'The requested article could not be found.',
      };
    }

    const title = news.title?.en || 'News Article';
    const description = news.summary?.en || 'Read the latest news article on Da Olass Ghag.';
    const imageUrl = news.images?.[0]?.asset?.url || 'https://daolasghaag.com/og-image.jpg';

    return {
      title: `${title} - Da Olass Ghag`,
      description: description,
      keywords: `Da Olass Ghag, ${news.categories?.join(', ') || 'news'}, Pakistan news, latest news`,
      openGraph: {
        title: `${title} - Da Olass Ghag`,
        description: description,
        url: `https://daolasghaag.com/en/news/${params.slug}`,
        siteName: 'Da Olass Ghag',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        locale: 'en_US',
        type: 'article',
        publishedTime: news.publishedAt,
        section: news.categories?.[0] || 'News',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} - Da Olass Ghag`,
        description: description,
        images: [imageUrl],
        creator: '@da_olass_ghag',
      },
      alternates: {
        canonical: `https://daolasghaag.com/en/news/${params.slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'News Article - Da Olass Ghag',
      description: 'Read the latest news on Da Olass Ghag.',
    };
  }
}

const NewsDetailsPage = () => {
  return (
    <>
    <NewsDetails/>
    </>
  )
}

export default NewsDetailsPage