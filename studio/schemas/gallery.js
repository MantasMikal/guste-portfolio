export default {
  name: 'gallery',
  title: 'Gallery Items',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      options: {
        isHighlighted: true
      }
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      description: 'You can use this field to schedule projects where you show them',
      type: 'datetime'
    },
    {
      name: 'artworkCategory',
      title: 'Artwork Category',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'artworkCategory' } }]
    },
    {
      name: 'artwork',
      title: 'Artwork',
      type: 'figure'
    }
  ],
  preview: {
    select: {
      title: 'title',
      image: 'artwork',
      publishedAt: 'publishedAt'
    },
    prepare ({ title = 'No title', image, publishedAt }) {
      return {
        title,
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString()
          : 'Missing publishing date',
        media: image
      }
    }
  }
}
