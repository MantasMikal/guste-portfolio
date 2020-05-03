import {AiOutlineDash} from 'react-icons/ai'

export default {
    type: 'object',
    name: 'line',
    title: 'Line',
    icon: AiOutlineDash,
    fields: [
      {
        type: 'string',
        name: 'lineStyle',
        title: 'Line style',
        description: 'Adds line. More info: https://www.w3schools.com/css/css_border.asp'
      },
      {
        type: 'string',
        name: 'margin',
        title: 'Margin',
        description: 'More info: https://www.w3schools.com/css/css_margin.asp',
      }
    ]
  }