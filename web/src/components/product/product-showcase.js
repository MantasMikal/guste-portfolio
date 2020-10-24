import React, { useState } from 'react'
import ImageWithModal from '../image/imageWithModal'
import ProductShowcaseGrid from './product-showcase-grid'
import styles from './product-showcase.module.css'

const ProductShowcase = ({ images, alt }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const image =
    images[currentImage] &&
    images[currentImage].localFile &&
    images[currentImage].localFile.childImageSharp &&
    images[currentImage].localFile.childImageSharp.fluid
  
  const handleClick = e => {
    const newImageIdx = e.target.attributes.imgidx.value
    setCurrentImage(newImageIdx)
  }
  return (
    <div className={styles.showcaseWrapper}>
      <ImageWithModal hasBorder fluid={image} alt={alt} />
      <ProductShowcaseGrid alt={alt} images={images} handleClick={handleClick} />
    </div>
  )
}

export default ProductShowcase
