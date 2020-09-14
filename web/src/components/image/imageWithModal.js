import React from 'react'
import Img from 'gatsby-image'
import Zoom from 'react-medium-image-zoom'

import styles from './imageWithModal.module.css'
import 'react-medium-image-zoom/dist/styles.css'

// Will not work without this!
const wrapperStyle = {
  width: '100%',
  height: '100%'
}

const ModalImage = ({ fluid, fixed, hasBorder, alt }) => {
  return (
    <div className={hasBorder && styles.border}>
      <Zoom
        overlayBgColorEnd='rgba(0, 0, 0, 0.85)'
        overlayBgColorStart='rgba(0, 0, 0, 0)'
        zoomMargin={20}
        transitionDuration={200}
      >
        <Img style={wrapperStyle} fixed={fixed} fluid={fluid} alt={alt} />
      </Zoom>
    </div>
  )
}

export default ModalImage
