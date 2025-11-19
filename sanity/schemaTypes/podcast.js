export default {
  name: 'podcast',
  type: 'document',
  title: 'Podcast',
  fields: [
    {
      name: 'title',
      type: 'object',
      title: 'Title',
      description: 'Enter the podcast title in multiple languages',
      fields: [
        {
          name: 'en',
          type: 'string',
          title: 'English',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'ur',
          type: 'string',
          title: 'Urdu',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'description',
      type: 'object',
      title: 'Description',
      description: 'Detailed description of the podcast in multiple languages',
      fields: [
        {
          name: 'en',
          type: 'text',
          title: 'English',
        },
        {
          name: 'ur',
          type: 'text',
          title: 'Urdu',
        },
      ],
    },
    {
      name: 'youtubeUrl',
      type: 'url',
      title: 'YouTube Video URL',
      description: 'Enter the full YouTube video URL',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'duration',
      type: 'string',
      title: 'Duration',
      description: 'Duration of the podcast (e.g., "45:30")',
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      description: 'Date and time when the podcast was published',
    },
    {
      name: 'thumbnail',
      type: 'image',
      title: 'Thumbnail',
      description: 'Podcast thumbnail image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      description: 'Select categories for this podcast',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Politics / سیاست', value: 'politics' },
              { title: 'Technology / ٹیکنالوجی', value: 'technology' },
              { title: 'Health / صحت', value: 'health' },
              { title: 'Environment / ماحولیات', value: 'environment' },
              { title: 'Culture / ثقافت', value: 'culture' },
              { title: 'Education / تعلیم', value: 'education' },
              { title: 'Entertainment / تفریح', value: 'entertainment' },
              { title: 'Sports / کھیل', value: 'sports' },
            ],
          },
        },
      ],
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Generated from the English title',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isFeatured',
      type: 'boolean',
      title: 'Featured Podcast',
      description: 'Mark as featured podcast to display prominently',
      initialValue: false,
    },
  ],

  preview: {
    select: {
      title: 'title.en',
      subtitle: 'duration',
      media: 'thumbnail',
    },
  },
};