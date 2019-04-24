import React from 'react'
import styles from './grid.module.css'

function Grid (props) {
  const { colCount, colWidth, rowHeight } = props
  console.log(colCount)
  return (
    <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${colCount}, ${colWidth || `1fr`})`, gridAutoRows: `${rowHeight || 'fr'}` }}>
      {props.children}
    </div>
  )
}

export default Grid
