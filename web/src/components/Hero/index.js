import React from 'react'

import styles from './Hero.module.css'
import Head from './Head'

const Hero = props => {
  return (
    <div className={styles.Hero}>
      <Head className={styles.Head} />
    </div>
  )
}

Hero.propTypes = {}

export default Hero
