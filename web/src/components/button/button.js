import React from 'react'
import styles from './button.module.css'
import { cn } from '../../lib/helpers'

export default function Button (props) {
  const { cattitle, onClick, isActive } = props
  return (
    <button
      role='button'
      className={isActive ? cn(styles.button, styles.btnActive) : styles.button}
      cattitle={cattitle}
      onClick={onClick}
    >
      {props.children}
    </button>
  )
}
