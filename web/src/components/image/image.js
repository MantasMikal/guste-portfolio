import React from 'react'
import GatsbyImage from 'gatsby-image'
import NoImage from '../../images/noImage.svg'
import styles from './image.module.css'

export default function Image (props) {
  const { fluid, alt, imageStyles } = props
  return (
    fluid
      ? <GatsbyImage fluid={fluid} alt={alt} className={styles.image} />
      : <NoImage />
  )
}
