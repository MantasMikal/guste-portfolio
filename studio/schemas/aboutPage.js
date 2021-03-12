export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  __experimental_actions: ['update', 'publish', 'create', 'delete' ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'figure',
    },
    {
      name: 'pageImage',
      title: 'Page Image',
      type: 'figure',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    },
    {
      name: 'body2',
      title: 'Body 2',
      type: 'blockContent'
    }
  ]
}
