import { Link } from 'gatsby'
import React from 'react'
import { cn, buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import Image from './image/image'
import MultiImage from './image/multiImage'
import styles from './project-preview.module.css'
import { responsiveTitle5 } from './typography.module.css'

function ProjectPreview (props) {
  return (
    <>
      <Link className={styles.root} to={`/project/${props.slug.current}`}>
        {props.mainImages && (
          <MultiImage images={props.mainImages} />
        )}
      </Link>
      <Link
        className={cn(styles.descriptionWrapper, styles.root)}
        to={`/project/${props.slug.current}`}
      >
        <div>0{props.index}</div>
        <h6 className={cn(responsiveTitle5, styles.title)}>{props.title}</h6>
      </Link>
    </>
  )
}

export default ProjectPreview
