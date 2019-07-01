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
      name: 'mainImage',
      title: 'Main image',
      description: 'Main image of the document (thumbnail)',
      type: 'mainImage'
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
      name: 'excerpt',
      title: 'Excerpt',
      description: 'Short post description',
      type: 'blockText'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    }
  ],
  preview: {
    select: {
      title: 'title',
      image: 'mainImage',
      publishedAt: 'publishedAt'
    },
    prepare ({ title = 'No title', publishedAt, image }) {
      return {
        title,
        media: image,
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString()
          : 'Missing publishing date'
      }
    }
  }
}
