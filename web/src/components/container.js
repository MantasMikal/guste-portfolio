import React from 'react'
import { cn } from '../lib/helpers'
import styles from './container.module.css'

const Container = ({ children, className }) => {
  return <div className={cn(styles.root, className)}>{children}</div>
}

export default Container
