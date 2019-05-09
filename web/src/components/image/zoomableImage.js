import React from 'react'
import Image from './image'
import ModalImage from './imageWithModal'

export default function zoomableImage (props) {
  const { isZoomable, alt, fluid } = props
  return isZoomable ? <ModalImage fluid={fluid} alt={alt} /> : <Image fluid={fluid} alt={alt} />
}
