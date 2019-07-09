export default {
  name: 'grid',
  title: 'Grid',
  type: 'object',
  options: {
    hotspot: true
  },
  fields: [
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
    },
    {
      name: 'margin',
      title: 'Margin',
      description: 'Used to create space around elements, outside of any defined borders. Setting this to "auto" will center it! Default: "0.625rem 0 0.625rem 0" More info: https://www.w3schools.com/css/css_margin.asp',
      type: 'string'
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
