import React from 'react'
import Image from './image/image'
import BlockContent from './block-content'
import styles from './about.module.css'
import { border } from './typography.module.css'
import ZomableImage from './image/zoomableImage'

const About = ({ pageImage, heroImage, _rawBody, title, instagram }) => {
  return (
    <div className={styles.wrapper}>
      {title && (
        <div className={border}>
          <h2 className={styles.headline}>{title}</h2>
        </div>
      )}
      {/* <div className={styles.header}>
        <Image fluid={heroImage.asset.fluid} />
      </div> */}
      <div className={styles.aboutContent}>
        <div className={styles.pageImage}>
          <Image className={styles.image} fluid={pageImage.asset.fluid} />
        </div>
        <div className={styles.about}>
          <BlockContent className={styles.content} blocks={_rawBody} />
        </div>
      </div>
      <div className={styles.instagramWrapper}>
        {instagram &&
          instagram.map((insta, i) => (
            <a
              href='https://www.instagram.com/guste.vasiliauskaite'
              target='__blank'
              rel='noreferer noopener'
              className={styles.imageWrapper}
              key={insta.node.id}
            >
              <ZomableImage
                isZoomable={false}
                fluid={insta.node.localFile.childImageSharp.fluid}
                alt={insta.node.caption}
                hasBorder
              />
            </a>
          ))}
      </div>
    </div>
  )
}

About.propTypes = {}

export default About
