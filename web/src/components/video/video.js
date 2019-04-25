import React from 'react'
import styles from './video.module.css'

export default function Video (props) {
  const { src, alt } = props

  return (
    <div className={styles.videoWrapper}>
      <video className={styles.video} width='100%' height='auto' alt={alt} autoPlay muted loop>
        <source src={src} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
