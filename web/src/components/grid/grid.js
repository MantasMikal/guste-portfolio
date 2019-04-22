import React from 'react'
import styles from './grid.module.css'

function Grid (props) {
  const { colCount } = props
  return (
    <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}>
      {props.children}
    </div>
  )
}

export default Grid
