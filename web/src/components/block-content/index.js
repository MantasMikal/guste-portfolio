import BaseBlockContent from '@sanity/block-content-to-react'
import React from 'react'
import Figure from './figure'
import Slideshow from './slideshow'
import { makeGrid } from '../../templates/dynamicComponents'

import typography from '../typography.module.css'

const serializers = {
  types: {
    block (props) {
      switch (props.node.style) {
      case 'h1':
        return <h1 className={typography.responsiveTitle1}>{props.children}</h1>

      case 'h2':
        return <h2 className={typography.responsiveTitle2}>{props.children}</h2>

      case 'h3':
        return <h3 className={typography.responsiveTitle3}>{props.children}</h3>

      case 'h4':
        return <h4 className={typography.responsiveTitle4}>{props.children}</h4>

      case 'blockquote':
        return <blockquote className={typography.blockQuote}>{props.children}</blockquote>
      default:
        return <p className={typography.paragraph}>{props.children}</p>
      }
    },
    figure (props) {
      return <Figure {...props.node} />
    },
    slideshow (props) {
      return <Slideshow {...props.node} />
    },
    grid (props) {
      return makeGrid(props.node)
    }
  },
  marks: {
    center (props) {
      return (
        <p style={{ margin: '0 auto' }}>
          {props.children}
        </p>
      )
    }
    // mark (props) {
    //   console.log('MARK PROPS: ', props)
    //   switch (props.node.marks) {
    //   case 'center':
    //     console.log('IT WORKS!')
    //     break

    //   default:
    //     console.log('default')
    //   }
  }
}

const BlockContent = ({ blocks }) => <BaseBlockContent blocks={blocks} serializers={serializers} />
export default BlockContent
