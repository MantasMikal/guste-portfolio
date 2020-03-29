import React from 'react'
import { object, bool } from 'prop-types'
import Img from 'gatsby-image'
import Zoom from 'react-medium-image-zoom'

import styles from './zoomable-image.module.css'
import 'react-medium-image-zoom/dist/styles.css'

// Will not work without this!
const wrapperStyle = {
  width: '100%',
  height: '100%'
}

const Image = ({ fluid, alt, isZoomable }) => {
  return fluid && isZoomable ? (
    <Zoom zoomMargin={20} transitionDuration={200}>
      <div style={wrapperStyle}>
        <Img style={wrapperStyle} fluid={fluid} alt={alt} />
      </div>
    </Zoom>
  ) : (
    <Img fluid={fluid} alt={alt} />
  )
}

Image.defaultProps = {
  isZoomable: true
}

Image.propTypes = {
  fluid: object,
  isZoomable: bool
}

export default Image
