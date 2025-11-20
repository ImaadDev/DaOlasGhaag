import sanityClient from '@/lib/sanityClient'

export default async function sitemap() {
  const baseUrl = 'https://daolasghaag.com'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/ur`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ur/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ur/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/archives`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ur/archives`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/videos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ur/videos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/podcasts`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ur/podcasts`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  // News category pages
  const newsCategories = [
    'pk-news', 'world-news', 'business-news', 'tech-news', 'ai-news',
    'health-news', 'climate-news', 'sports-news', 'showbiz-news', 'fact-check'
  ]

  const categoryPages = newsCategories.flatMap(category => [
    {
      url: `${baseUrl}/en/${category}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ur/${category}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ])

  // Dynamic content: News articles
  let newsPages = []
  try {
    const newsQuery = `*[_type == "news" && isPublished == true] {
      slug,
      publishedAt,
      _updatedAt
    }`
    const news = await sanityClient.fetch(newsQuery)

    newsPages = news.flatMap(article => [
      {
        url: `${baseUrl}/en/news/${article.slug.current}`,
        lastModified: new Date(article._updatedAt || article.publishedAt),
        changeFrequency: 'weekly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/ur/news/${article.slug.current}`,
        lastModified: new Date(article._updatedAt || article.publishedAt),
        changeFrequency: 'weekly',
        priority: 0.6,
      },
    ])
  } catch (error) {
    console.error('Error fetching news for sitemap:', error)
  }

  // Dynamic content: Videos
  let videoPages = []
  try {
    const videoQuery = `*[_type == "video"] {
      slug,
      publishedAt,
      _updatedAt
    }`
    const videos = await sanityClient.fetch(videoQuery)

    videoPages = videos.flatMap(video => [
      {
        url: `${baseUrl}/en/videos/${video.slug.current}`,
        lastModified: new Date(video._updatedAt || video.publishedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/ur/videos/${video.slug.current}`,
        lastModified: new Date(video._updatedAt || video.publishedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
    ])
  } catch (error) {
    console.error('Error fetching videos for sitemap:', error)
  }

  // Dynamic content: Podcasts
  let podcastPages = []
  try {
    const podcastQuery = `*[_type == "podcast"] {
      slug,
      publishedAt,
      _updatedAt
    }`
    const podcasts = await sanityClient.fetch(podcastQuery)

    podcastPages = podcasts.flatMap(podcast => [
      {
        url: `${baseUrl}/en/podcasts/${podcast.slug.current}`,
        lastModified: new Date(podcast._updatedAt || podcast.publishedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/ur/podcasts/${podcast.slug.current}`,
        lastModified: new Date(podcast._updatedAt || podcast.publishedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
    ])
  } catch (error) {
    console.error('Error fetching podcasts for sitemap:', error)
  }

  return [
    ...staticPages,
    ...categoryPages,
    ...newsPages,
    ...videoPages,
    ...podcastPages,
  ]
}