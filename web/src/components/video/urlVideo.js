import React, { Component } from 'react'
import styles from './urlVideo.module.css'

export default class UrlVideo extends Component {
  render () {
    const { url, alt } = this.props
    return (
      <div className={styles.videoWrapper}>
        <iframe src={url} alt={alt} allow='autoplay; fullscreen' allowfullscreen/>
      </div>
    )
  }
}
