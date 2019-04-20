import React from 'react'
import styles from './grid.module.css'

function Grid (props) {
  return (
    <div className={styles.grid}>
      {props.children}
    </div>
  )
}

export default Grid
