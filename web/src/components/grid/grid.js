import React from 'react'
import styles from './grid.module.css'

function Grid (props) {
  const { style } = props
  return (
    <div
      className={styles.grid}
      style={style}
    >
      {props.children}
    </div>
  )
}

export default Grid
