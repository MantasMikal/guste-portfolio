import React from 'react'
import styles from './gallery-preview.module.css'
import { responsiveTitle3 } from './typography.module.css'
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

  render () {
    const { item } = this.props
    console.log(this.props)
    return (
      <div className={styles.itemWrapper}>
        <h1 className={cn(responsiveTitle3, styles.title)}>{item.title}</h1>
        {item.mainImage && item.mainImage.asset && (<MainImage isZoomable fluid={item.mainImage.asset.fluid} />)}
        {item._rawExcerpt && (<BlockText blocks={item._rawExcerpt || []} />)}
        {item._rawBody && (
          <>
            <button className={styles.button} onClick={this.handleOpen}>Read More</button>
            <div className={this.state.isOpen? styles.open : styles.closed}>
              <BlockContent blocks={item._rawBody || []} />
            </div>
          </>
        )}

      </div>
    )
  }
}
