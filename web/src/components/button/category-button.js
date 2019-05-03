import React from 'react'
import styles from './button.module.css'

export default function SnipcartButton (props) {
  const {cattitle, onClick} = props
  return (
    <button
      className={styles.button}
      cattitle={cattitle}
      onClick={onClick}
    >
      {props.children}
    </button>
  )
}
