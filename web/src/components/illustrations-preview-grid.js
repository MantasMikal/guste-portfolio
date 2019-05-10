import React from 'react'
import ImageWithModal from './image/imageWithModal'
import styles from './illustrations-preview-grid.module.css'
export default class IllustrationsPreviewGrid extends React.Component {
  render () {
    const { media } = this.props
    return (
      <>
        <div className={styles.grid}>
          {media.map(item => {
            return (
              <ImageWithModal
                key={item.id}
                fluid={item.illustration.asset.fluid}
                alt={item.illustration.alt}
              />
            )
          })}
        </div>
      </>
    )
  }
}
