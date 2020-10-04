import React from 'react'
import { array } from 'prop-types'
import styles from './ColorPallet.module.css'

const ColorPallet = ({ colors, onColorClick, onClear }) => {
  return (
    <div className={styles.ColorPallet}>
      {colors.map((color, i) => (
        <button
          onClick={() => onColorClick(color)}
          style={{ backgroundColor: `#${color}` }}
          key={`COLOR-${i}`}
          className={styles.Color}
        />
      ))}
    </div>
  )
}

ColorPallet.propTypes = {
  colors: array
}

export default ColorPallet
