import MdApps from 'react-icons/lib/md/apps'

export default {
  name: 'slide',
  title: 'Home Page Slide',
  icon: MdApps,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
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
