/* eslint-disable react/jsx-no-bind */
import React from 'react'
import Image from '../image/image'
import styles from './product-showcase-grid.module.css'

export default function productImageGrid (props) {
  const { images, handleClick } = props
  return (
    <div className={styles.grid}>
      {
        images && images.map((img, i) => {
          return (
            <div key={img.asset.id} className={styles.gridWrapper}>
              <div className={styles.clickHandler} onClick={handleClick.bind(this)} imgidx={i} />
              <Image hasBorder fluid={img.asset.fluid} alt={img.asset.alt} />
            </div>
          )
        })
      }
    </div>
  )
}
