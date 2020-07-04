export default {
  name: 'customerServicePage',
  title: 'Customer Service',
  type: 'document',
  __experimental_actions: ['update', 'publish', 'create', 'delete' ],
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
  ]
}
