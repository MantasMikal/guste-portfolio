import React from 'react'
import styles from './button.module.css'
import { cn } from '../../lib/helpers'

export default function Button (props) {
  const { onClick, isActive, buttonStyle, border, className, ...other } = props
  return (
    <button
      role='button'
      className={cn(
        styles.button,
        isActive && styles.btnActive,
        buttonStyle && styles[buttonStyle],
        border && styles.border,
        className
      )}
      {...other}
      onClick={onClick}
    >
      {props.children}
    </button>
  )
}
