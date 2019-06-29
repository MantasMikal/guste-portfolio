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
      title: 'Column Count - DO NOT USE. For compatability only. Use colTemplate instead',
      type: 'number'
    },
    {
      name: 'colTemplate',
      title: 'Column Template',
      description: 'E.g.: "1fr 2fr". Defines size of each column in the grid. Available units: px, em, %, fr, rem. You can mix units if you need fixed size: "100px 1fr 30em" ',
      type: 'string'
    },
    {
      name: 'rowGap',
      title: 'Row Gap',
      description: 'eg.: "10px". Defines size of gap in the grid. Available units: px, em, %, rem',
      type: 'string'
    },
    {
      name: 'colGap',
      title: 'Column Gap',
      description: 'eg.: "10px". Defines size of gap in the grid. Available units: px, em, %, rem',
      type: 'string'
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
      colTemplate: 'colTemplate'
    },
    prepare ({ colTemplate = 'No title' }) {
      return {
        title: `Grid, ` + colTemplate
      }
    }
  }
}
