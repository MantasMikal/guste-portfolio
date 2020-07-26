import React from 'react'

import styles from './Hero.module.css'
import Head from './Head'

const Hero = props => {
  return (
    <div className={styles.Hero}>
      {/* <div className={styles.TextWrapper}>
        HELLO, HUMAN
      </div> */}
      <div className={styles.HeadWrapper}>
        <Head className={styles.Head} />
      </div>
    </div>
  )
}

Hero.propTypes = {}

export default Hero
