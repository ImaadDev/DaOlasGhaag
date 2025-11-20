export default {
  name: 'news',
  type: 'document',
  title: 'News',
  fields: [
    {
      name: 'title',
      type: 'object',
      title: 'Title',
      description: 'Enter the news title in multiple languages',
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
      name: 'summary',
      type: 'object',
      title: 'Summary',
      description: 'Short summary of the news in multiple languages',
      fields: [
        {
          name: 'en',
          type: 'string',
          title: 'English',
        },
        {
          name: 'ur',
          type: 'string',
          title: 'Urdu',
        },
      ],
    },
    {
      name: 'description',
      type: 'object',
      title: 'Description',
      description: 'Detailed description in multiple languages',
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
      name: 'categories',
      type: 'array',
      title: 'Categories',
      description: 'Select categories for this news',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Pakistan / پاکستان', value: 'pakistan' },
              { title: 'World / عالم', value: 'world' },
              { title: 'Business / کاروبار', value: 'business' },
              { title: 'Technology / ٹیکنالوجی', value: 'technology' },
              { title: 'Health / صحت', value: 'health' },
              { title: 'Climate / ماحولیات', value: 'climate' },
              { title: 'Sports / کھیل', value: 'sports' },
              { title: 'Entertainment / تفریح', value: 'entertainment' },
              { title: 'Fact Check / فیکٹ چیک', value: 'fact-check' },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'videoUrl',
      type: 'url',
      title: 'Video URL',
      description: 'YouTube or other video URL for this news article (optional)',
    },
    {
      name: 'sections',
      type: 'array',
      title: 'Sections',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'object',
              title: 'Section Title',
              fields: [
                { name: 'en', type: 'string', title: 'English' },
                { name: 'ur', type: 'string', title: 'Urdu' },
              ],
            },
            {
              name: 'content',
              type: 'object',
              title: 'Section Content',
              fields: [
                { name: 'en', type: 'text', title: 'English' },
                { name: 'ur', type: 'text', title: 'Urdu' },
              ],
            },
          ],
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
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      description: 'Date and time when the news is published',
    },
    {
      name: 'isBreaking',
      type: 'boolean',
      title: 'Breaking News',
      description: 'Mark as breaking news for special highlighting',
      initialValue: false,
    },
    {
      name: 'isLatest',
      type: 'boolean',
      title: 'Latest News',
      description: 'Mark as latest news for priority display',
      initialValue: false,
    },
    {
      name: 'isPublished',
      type: 'boolean',
      title: 'Published',
      description: 'Control whether this news is published and visible',
      initialValue: false,
    },
  ],

  preview: {
    select: {
      title: 'title.en',
      media: 'images.0',
    },
  },
};
