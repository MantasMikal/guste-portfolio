import { Link } from 'gatsby'
import React from 'react'
import { cn, getBlogUrl } from '../lib/helpers'
// import { imageUrlFor } from '../lib/image-url'
import BlockText from './block-text'
import Image from './image/image'
import styles from './blog-post-preview.module.css'
import { responsiveTitle5 } from './typography.module.css'

function BlogPostPreview (props) {
  const { publishedAt } = props
  const date = publishedAt && publishedAt.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$3-$2-$1')
  return (
    <>
      <Link className={styles.root} to={getBlogUrl(props.publishedAt, props.slug.current)}>
        {props.mainImage && props.mainImage.asset && (
          <Image fluid={props.mainImage.asset.fluid} alt={props.mainImage.alt} />
        )}
      </Link>
      <Link
        className={cn(styles.descriptionWrapper, styles.root)}
        to={getBlogUrl(props.publishedAt, props.slug.current)}
      >
        <h6 className={cn(responsiveTitle5, styles.title)}>{props.title}</h6>
        <div>{date}</div>
      </Link>
      {props._rawExcerpt && (
        <div className={styles.excerpt}>
          {/* <div>{date}</div> */}
          <BlockText blocks={props._rawExcerpt} />
        </div>
      )}
    </>
  )
}

export default BlogPostPreview
