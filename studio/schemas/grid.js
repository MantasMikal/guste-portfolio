export default {
  name: 'grid',
  title: 'Grid',
  type: 'object',
  options: {
    hotspot: true
  },
  fields: [
    {
      name: 'colCount',
      title: 'Column Count',
      type: 'number'
    },
    {
      name: 'gridMedia',
      title: 'Grid Media',
      type: 'array',
      of: [{ type: 'figure' }, { type: 'video' }]
    }
  ]
}
