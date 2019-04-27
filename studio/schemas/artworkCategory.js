import MdApps from 'react-icons/lib/md/apps'

export default {
  name: 'artworkCategory',
  title: 'Art Category',
  type: 'document',
  icon: MdApps,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    }
  ],
  liveEdit: true
}
