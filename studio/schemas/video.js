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
      name: 'hasBorder',
      title: 'Border',
      description: 'Wether the image has broder',
      type: 'boolean',
      options: {
        isHighlighted: true
      }
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
