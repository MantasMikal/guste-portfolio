import React from 'react'
import styles from './grid.module.css'

function Grid (props) {
  const { colCount, colWidth, rowHeight, colTemplate, colGap, rowGap } = props
  return (
    <div
      className={styles.grid}
      style={{
        gridTemplateColumns: `${colTemplate || `repeat(${colCount}, ${colWidth || `1fr`})`}`,
        gridAutoRows: `${rowHeight || 'fr'}`,
        gridColumnGap: `${colGap}`,
        gridRowGap: `${rowGap}`
      }}
    >
      {props.children}
    </div>
  )
}

export default Grid
