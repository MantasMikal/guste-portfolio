export default {
  name: 'contentBlock',
  title: 'Content Block',
  type: 'object',
  options: {
    hotspot: true
  },
  fields: [
    {
      name: 'maxWidth',
      title: 'Max width',
      type: 'number'
    },
    {
      name: 'contentBlock',
      title: 'Content Block',
      type: 'blockContent'
    }
  ],
  preview: {
    select: {
      image: 'mainImages',
      maxWidth: 'maxWidth'
    },
    prepare ({ title = 'Content Block', maxWidth }) {
      return {
        title,
        maxWidth: maxWidth || '100'
      }
    }
  }
}
