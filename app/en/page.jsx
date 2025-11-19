import React from 'react'
import BreakingNews from '@/components/Home/BreakingNews';
import FeaturedStories from '@/components/Home/FeaturedStories';
import LatestNews from '@/components/Home/LatestNews';
import BusinessNews from '@/components/Home/Business';
import PKNews from '@/components/Home/PKNews';
import WorldNews from '@/components/Home/WorldNews';
import Technology from '@/components/Home/Technology';
import Health from '@/components/Home/Health';
import Climate from '@/components/Home/Climate';
import Sports from '@/components/Home/Sports';
import Entertainment from '@/components/Home/Entertainment';
import FactCheck from '@/components/Home/FactCheck';

export const metadata = {
  title: 'BBC News - Your trusted source for news',
  description: 'Get the latest news, breaking news, and in-depth analysis from around the world.',
  alternates: {
    canonical: '/en',
    languages: {
      'en': '/en',
      'ur': '/ur',
    },
  },
};

const Home = () => {
  const featuredArticles = [
    {
      id: 1,
      title: "Breaking News: Major Event Shakes the World",
      excerpt: "A significant event has occurred that will impact global affairs...",
      image: "/placeholder-news.jpg",
      category: "World",
      date: "2024-01-15",
      slug: "/en/news/breaking-news"
    },
    {
      id: 2,
      title: "Technology Advances in Artificial Intelligence",
      excerpt: "New breakthroughs in AI technology promise to revolutionize industries...",
      image: "/placeholder-tech.jpg",
      category: "Technology",
      date: "2024-01-14",
      slug: "/en/news/ai-advances"
    },
    {
      id: 3,
      title: "Sports Championship Finals Recap",
      excerpt: "The finals delivered an unforgettable showdown between top teams...",
      image: "/placeholder-sports.jpg",
      category: "Sports",
      date: "2024-01-13",
      slug: "/en/news/sports-finals"
    }
  ];

  return (
    <>
      <BreakingNews/>
      <FeaturedStories/>
      <LatestNews/>
      <BusinessNews/>
      <PKNews/>
      <WorldNews/>
      <Technology/>
      <Health/>
      <Climate/>
      <Sports/>
      <Entertainment/>
      <FactCheck/>
    </>
  )
}

export default Home