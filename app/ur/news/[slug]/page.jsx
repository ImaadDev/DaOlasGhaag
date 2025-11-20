import React from 'react'
import NewsDetails from '@/components/NewsDetails'
import sanityClient from '@/lib/sanityClient'

export async function generateMetadata({ params }) {
  try {
    const query = `*[_type == "news" && slug.current == $slug][0]{
      title, summary, publishedAt, images, categories
    }`;
    const news = await sanityClient.fetch(query, { slug: params.slug });

    if (!news) {
      return {
        title: 'خبر نہیں ملی - ڈا اولس غگ',
        description: 'درخواست کردہ خبر نہیں ملی۔',
      };
    }

    const title = news.title?.ur || 'خبر کا آرٹیکل';
    const description = news.summary?.ur || 'ڈا اولس غگ پر تازہ ترین خبر پڑھیں۔';
    const imageUrl = news.images?.[0]?.asset?.url || 'https://daolasghaag.com/og-image.jpg';

    return {
      title: `${title} - ڈا اولس غگ`,
      description: description,
      keywords: `ڈا اولس غگ, ${news.categories?.join(', ') || 'خبریں'}, پاکستان خبریں, تازہ ترین خبریں`,
      openGraph: {
        title: `${title} - ڈا اولس غگ`,
        description: description,
        url: `https://daolasghaag.com/ur/news/${params.slug}`,
        siteName: 'ڈا اولس غگ',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        locale: 'ur_PK',
        type: 'article',
        publishedTime: news.publishedAt,
        section: news.categories?.[0] || 'خبریں',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} - ڈا اولس غگ`,
        description: description,
        images: [imageUrl],
        creator: '@da_olass_ghag',
      },
      alternates: {
        canonical: `https://daolasghaag.com/ur/news/${params.slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'خبر کا آرٹیکل - ڈا اولس غگ',
      description: 'ڈا اولس غگ پر تازہ ترین خبریں پڑھیں۔',
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