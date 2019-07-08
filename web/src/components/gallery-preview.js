import React from 'react'
import styles from './gallery-preview.module.css'
import { responsiveTitle5 } from './typography.module.css'
import BlockContent from '../components/block-content'
import BlockText from './block-text'
import MainImage from './image/zoomableImage'
import { cn } from '../lib/helpers'
import Button from './button/button'
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
    const { item } = this.props
    return (
      <div className={styles.itemWrapper}>
        <div className={styles.inner}>
          {item.mainImage && item.mainImage.asset && (
            <MainImage isZoomable fluid={item.mainImage.asset.fluid} />
          )}
        </div>
        <div className={styles.titleWrapper}>
          <h1 className={cn(responsiveTitle5, styles.title)}>{item.title}</h1>
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
