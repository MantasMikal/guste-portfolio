export default {
  name: 'illustrations',
  title: 'Illustrations',
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
      name: 'illustration',
      title: 'Illustration',
      type: 'illustration',
      of: { type: 'image' }
    }
  ],
  preview: {
    select: {
      title: 'title',
      image: 'illustration',
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
