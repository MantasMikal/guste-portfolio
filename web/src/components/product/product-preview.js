import { Link } from 'gatsby'
import React from 'react'
import { cn, buildImageObj } from '../../lib/helpers'
import { imageUrlFor } from '../../lib/image-url'
import BlockText from '../block-text'
import Image from '../image/image'
import styles from './product-preview.module.css'
import { responsiveTitle4, paragraphLimited } from '../typography.module.css'

function ProductPreview (props) {
  return (
    <Link className={styles.root} to={`/store/${props.slug.current}`}>
      {/* <div className={styles.leadMediaThumb}> */}
      <Image fluid={props.mainImage.asset.fluid} alt={props.mainImage.asset.alt} />
      {/* </div> */}
      <h4 className={cn(responsiveTitle4, styles.title)}>{props.title}</h4>
      {props._rawExcerpt && (
        <div className={styles.excerpt}>
          <BlockText blocks={props._rawExcerpt} />
        </div>
      )}
    </Link>
  )
}

export default ProductPreview
