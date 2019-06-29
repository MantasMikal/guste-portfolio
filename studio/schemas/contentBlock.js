export default {
  name: 'contentBlock',
  title: 'Content Block',
  type: 'object',
  options: {
    hotspot: true
  },
  fields: [
    {
      name: 'contentBlock',
      title: 'Content Block',
      type: 'blockContent'
    }
  ],
  preview: {
    select: {
      image: 'mainImages'
    },
    prepare ({ title = 'Content Block' }) {
      return {
        title
      }
    }
  }
}
