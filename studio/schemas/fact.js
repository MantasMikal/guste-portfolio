import MdApps from 'react-icons/lib/md/apps'

export default {
  name: 'fact',
  title: 'Fact',
  icon: MdApps,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'figure'
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
      image: 'image'
    },
    prepare ({ title = 'No title', image }) {
      return {
        title,
        media: image
      }
    }
  }
}
