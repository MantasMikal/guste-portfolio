import { Link } from 'gatsby'
import React from 'react'
import { cn } from '../../lib/helpers'
import Image from '../image/image'
import MainImage from '../image/zoomableImage'
import styles from './product-preview.module.css'
import { responsiveTitle5 } from '../typography.module.css'

function ProductPreview(props) {
  console.log(props)
  return (
    <div className={styles.itemWrapper}>
      <Link to={`/store/${props.slug.current}`}>
        <div className={styles.inner}>
          {props.mainImage && props.mainImage.asset && (
            <Image fluid={props.mainImage.asset.fluid} />
          )}
        </div>
        <div className={styles.titleWrapper}>
          <h1 className={cn(responsiveTitle5, styles.title)}>{props.title}</h1>
          <span className={styles.price}>{props.price + '$'}</span>
        </div>
      </Link>
    </div>
  )
}

export default ProductPreview
