/* eslint-disable react/jsx-no-bind */
import React from 'react'
import Image from '../image/image'
import styles from './product-showcase-grid.module.css'

const ProductImageGrid = ({ images, handleClick, alt }) => (
  <div
    className={styles.grid}
    style={{
      gridTemplateColumns: images.length < 3 && 'repeat(auto-fill, minmax(200px, 1fr))'
    }}
  >
    {images &&
      images.map((img, i) => {
        return (
          <div key={`Product-image-${i}`} className={styles.gridWrapper}>
            <div className={styles.clickHandler} onClick={e => handleClick(e)} imgidx={i} />
            <Image hasBorder fluid={img.localFile.childImageSharp.fluid} alt={alt} />
          </div>
        )
      })}
  </div>
)

export default ProductImageGrid
