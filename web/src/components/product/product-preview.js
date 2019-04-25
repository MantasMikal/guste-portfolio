import { Link } from 'gatsby'
import React from 'react'
import { cn } from '../../lib/helpers'
import Image from '../image/image'
import styles from './product-preview.module.css'
import { responsiveTitle4 } from '../typography.module.css'

function ProductPreview (props) {
  return (
    <Link className={styles.root} to={`/store/${props.slug.current}`}>
      <Image fluid={props.mainImage.asset.fluid} alt={props.mainImage.asset.alt} />
      <h4 className={cn(responsiveTitle4, styles.title)}>{props.title}</h4>
    </Link>
  )
}

export default ProductPreview
