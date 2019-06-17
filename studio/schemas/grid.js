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
      of: [{ type: 'figure' }, { type: 'video' }, { type: 'contentBlock' }],
      preview: {
        select: {
          image: 'gridMedia'
        },
        prepare ({ image }) {
          return {
            media: image[0]
          }
        }
      }
    }
  ],
  preview: {
    select: {
      title: 'colCount'
    },
    prepare ({ title = 'No title' }) {
      return {
        title: `Grid, Column count: ` + title
      }
    }
  }
}
