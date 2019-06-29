export default {
  name: 'figure',
  title: 'Figure',
  type: 'image',
  options: {
    hotspot: true
  },
  fields: [
    {
      name: 'isZoomable',
      title: 'Zoom',
      description: 'Wether the image can be zoomed',
      type: 'boolean',
      options: {
        isHighlighted: true
      }
    },
    {
      name: 'alt',
      title: 'Alternative text (for screen readers)',
      type: 'string',
      options: {
        isHighlighted: true
      }
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      options: {
        isHighlighted: true
      }
    }]
}
