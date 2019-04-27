import React from 'react'
import ImageWithModal from './image/imageWithModal'
import styles from './art-preview-grid.module.css'

export default function ArtPrieviewGrid (props) {
  const { media } = props
  return (
    <div className={styles.grid}>
      {
        media.map((item) => {
          return (
            <ImageWithModal key={item.id} image={item.artwork.asset.fluid} alt={item.artwork.alt} />
          )
        })
      }
    </div>
  )
}
