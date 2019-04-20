import MdSettings from 'react-icons/lib/md/settings'

export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  liveEdit: false,
  __experimental_actions: ['update', 'publish', /*'create', 'delete'*/],
  icon: MdSettings,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'titleShort',
      title: 'Short Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'siteUrl',
      title: 'Site URL',
      type: 'string',
    },
    {
      name: 'themeColor',
      title: 'Theme color',
      type: 'string'
    },
    {
      name: 'backgroundColor',
      title: 'Background color',
      type: 'string'
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image'
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
  ]
}
