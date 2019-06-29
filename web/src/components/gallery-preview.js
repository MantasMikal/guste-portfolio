import React from 'react'
import styles from './gallery-preview.module.css'
import { responsiveTitle3 } from './typography.module.css'
import BlockContent from '../components/block-content'
import { cn } from '../lib/helpers'

// Takes in artwork nodes and returns list of components
export default class GalleryPreviewLayout extends React.Component {
  render () {
    const { item } = this.props
    return (
      <div className={styles.itemWrapper} key={item.id}>
        <h1 className={cn(responsiveTitle3, styles.title)}>{item.title}</h1>
        <div className={styles.item}>
          <BlockContent blocks={item._rawBody || []} />
        </div>
      </div>
    )
  }
}
