import { Link } from 'gatsby'
import React from 'react'
import { cn } from '../../lib/helpers'
import Image from '../image/multiImage'

import styles from './product-preview.module.css'
import { responsiveTitle4 } from '../typography.module.css'

function ProductPreview({ images, variants, title, handle, gridLayout }) {
  const { price } = variants[0]

  const mainImages = [
    {
      asset: {
        id: images[0] && images[0].id,
        fluid: images[0] && images[0].localFile.childImageSharp.fluid,
        alt: title
      }
    },
    images[1] && {
      asset: {
        id: images[1] && images[1].id,
        fluid: images[1] && images[1].localFile.childImageSharp.fluid,
        alt: title
      }
    }
  ]

  return (
    <div className={cn(styles.itemWrapper, gridLayout && styles.gridLayout)}>
      <Link to={`/store/${handle}`}>
        <div className={styles.inner}>
          {images.length > 0 && (
            <Image images={mainImages} square />
          )}
        </div>
        <div className={styles.titleWrapper}>
          <h1 className={cn(responsiveTitle4, styles.title)}>{title}</h1>
          <div className={styles.price}>{`${price ? price + '£' : 'NOT FOR SALE'}`}</div>
        </div>
      </Link>
    </div>
  )
}

export default ProductPreview
