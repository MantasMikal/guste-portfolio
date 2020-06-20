import React from 'react'
import { bool, node, string } from 'prop-types'
import { cn } from '../../lib/helpers'
import styles from './prose.module.css'

const Prose = ({ children, className, html, inverse }) => {
  if (!children && !html) return null

  return (
    <div
      className={cn(styles.Prose, inverse && styles.inverse, className)}
      {...(html && { dangerouslySetInnerHTML: { __html: html } })}
    >
      {children}
    </div>
  )
}

Prose.propTypes = {
  children: node,
  className: string,
  html: string,
  inverse: bool
}

export default Prose
