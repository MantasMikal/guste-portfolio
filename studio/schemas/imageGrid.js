export default {
  name: 'imageGrid',
  title: 'Image Grid',
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
      name: 'gridImages',
      title: 'Grid Images',
      type: 'array',
      of: [{ type: 'figure' }]
    }
  ]
}
