import React, { Component } from 'react'
import styles from './video.module.css'

export default class Video extends Component {
  componentWillUnmount () {
    this.refs.video.src = ''
    this.refs.video.load()
  }

  render () {
    const { src, alt } = this.props
    return (
      <div className={styles.videoWrapper}>
        <video className={styles.video} width='100%' height='auto' src={src} type='video/mp4' alt={alt} muted controls autoPlay loop playsInline ref={'video'}>
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }
}
