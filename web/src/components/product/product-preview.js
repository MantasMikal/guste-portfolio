import { Link } from 'gatsby'
import React, { useState } from 'react'
import { cn } from '../../lib/helpers'
import Image from '../image/image'

import styles from './product-preview.module.css'
import { responsiveTitle4 } from '../typography.module.css'

const ProductPreview = ({ images, variants, title, handle, gridLayout }) => {
  const { price } = variants[0]
  const [isLoaded, setLoaded] = useState(false)
  return (
    <div className={cn(styles.itemWrapper, gridLayout && styles.gridLayout)}>
      <Link to={`/store/${handle}`} onMouseEnter={() => setLoaded(true)}>
        <div className={styles.inner}>
          {images.length > 1 && images[1].localFile.childImageSharp && isLoaded && (
            <div className={styles.Image}>
              <Image fluid={images[1].localFile.childImageSharp.fluid} />
            </div>
          )}
          {images.length > 0 && images[0] && images[0].localFile.childImageSharp && (
            <div className={styles.Image}>
              <Image className={styles.Image} fluid={images[0].localFile.childImageSharp.fluid} />
            </div>
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
