import React from 'react'
import Image from './image'
import ModalImage from './imageWithModal'

export default function zoomableImage(props) {
  const { isZoomable, alt, fluid, fixed, hasBorder } = props
  return isZoomable ? (
    <ModalImage fixed={fixed} fluid={fluid} alt={alt} hasBorder={hasBorder} />
  ) : (
    <Image fixed={fixed} fluid={fluid} alt={alt} hasBorder={hasBorder} />
  )
}
