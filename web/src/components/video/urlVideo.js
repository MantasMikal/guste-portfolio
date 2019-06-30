import React, { Component } from 'react'
import styles from './urlVideo.module.css'
import { cn } from '../../lib/helpers'
export default class UrlVideo extends Component {
  render () {
    const { url, alt, hasBorder } = this.props
    return (
      <div className={hasBorder ? styles.border : null}>
        <div className={styles.videoWrapper}>
          <iframe src={url} alt={alt} allow='autoplay; fullscreen' allowFullScreen />
        </div>
      </div>
    )
  }
}
