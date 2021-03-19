import React from 'react'
import styles from './gallery-preview.module.css'
import { responsiveTitle5 } from './typography.module.css'
import BlockContent from '../components/block-content'
import BlockText from './block-text'
import { cn } from '../lib/helpers'
import Button from './button/button'
import Image from './image/zoomableImage'
import Video from './video/video'

// import Image from './zomable-image'
// Takes in artwork nodes and returns list of components
export default class GalleryPreviewLayout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  handleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { item, gridLayout } = this.props
    console.log(
      '🚀 ~ file: gallery-preview.js ~ line 29 ~ GalleryPreviewLayout ~ render ~ item',
      item
    )
    return (
      <div className={cn(styles.itemWrapper, gridLayout && styles.gridLayout)}>
        <div className={styles.inner}>
          <div className={styles.image}>
            {!item.mainVideo && item.mainImage && item.mainImage.asset && (
              <Image isZoomable fluid={item.mainImage.asset.fluid} />
            )}
            {item.mainVideo && (
              <div className={styles.Video}>
                <Video controls={false} src={item.mainVideo.asset.url} />
              </div>
            )}
          </div>
        </div>
        <div className={styles.titleWrapper}>
          <h3 className={cn(responsiveTitle5, styles.title)}>{item.title}</h3>
          {item._rawBody && item._rawBody.length > 0 && (
            <button to="#" className={styles.readMore} onClick={this.handleOpen}>
              {' '}
              {this.state.isOpen ? 'Close' : 'Read More'}
            </button>
          )}
        </div>
        <div className={styles.descriptionWrapper}>
          {item._rawExcerpt && <BlockText blocks={item._rawExcerpt || []} />}
          {item._rawBody && (
            <div className={this.state.isOpen ? styles.open : styles.closed}>
              <BlockContent blocks={item._rawBody || []} />
            </div>
          )}
        </div>
      </div>
    )
  }
}
