import { Link } from 'gatsby'
import React from 'react'
import { cn } from '../../lib/helpers'
import Image from '../image/image'
import styles from './product-preview.module.css'
import { responsiveTitle4 } from '../typography.module.css'


function ProductPreview(props) {
  console.log("Product preview: ", props)
  const { details } = props
  return (
    <div className={styles.itemWrapper}>
      <Link to={`/store/${props.slug.current}`}>
        <div className={styles.inner}>
          {props.mainImage && props.mainImage.asset && (
            <Image fluid={props.mainImage.asset.fluid} />
          )}
        </div>
        <div className={styles.titleWrapper}>
          <h1 className={cn(responsiveTitle4, styles.title)}>{props.title}</h1>
          <div className={styles.price}>{`${details[0].price}£`}</div>
        </div>
      </Link>
    </div>
  )
}

export default ProductPreview
