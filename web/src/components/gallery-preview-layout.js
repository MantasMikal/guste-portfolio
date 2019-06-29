import React from 'react'
import styles from './gallery-preview-layout.module.css'
import GalleryPreview from './gallery-preview'
export default class GalleryPreviewLayout extends React.Component {
  render () {
    return (
      <div className={styles.masonry}>
        {this.props.nodes.map((item) => {
          return (
            <GalleryPreview item={item} key={item.id} />
          )
        })}
      </div>
    )
  }
}
