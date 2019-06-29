export default {
  name: 'video',
  title: 'Video',
  type: 'object',
  options: {
    hotspot: true
  },
  fields: [
    {
      name: 'url',
      title: 'URL',
      description: 'Youtube and Vimeo are supported',
      type: 'url'
    },
    {
      name: 'alt',
      title: 'Alternative text (for screen readers)',
      type: 'string',
      options: {
        isHighlighted: true
      }
    }
  ],
  preview: {
    select: {
      title: 'alt',
      url: 'url'
    },
    prepare ({ title = 'No title', url }) {
      return {
        title: title + ', ' + url
      }
    }
  }
}
