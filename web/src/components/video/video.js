import React, { Component } from 'react'
import styles from './video.module.css'

export default class Video extends Component {
  // componentWillUnmount () {
  //   this.refs.video.src = ''
  //   this.refs.video.load()
  // }

  render() {
    const { src, alt, controls, autoPlay } = this.props
    console.log('SRC ', src)
    return (
      <div className={styles.videoWrapper}>
        <video
          className={styles.video}
          style={{ width: '100%', height: '100%' }}
          src={src}
          type="video/mp4"
          alt={alt}
          muted
          controls={controls || false}
          autoPlay={autoPlay || true}
          loop
          playsInline
          // ref='video'
        >
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }
}
