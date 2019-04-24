import React from 'react'
import styles from './button.module.css'

export default function Button (props) {
  const { id, price, name, url } = props
  console.log(props)
  return (
    <button href='#' data-item-name={name} className={[styles.button, 'snipcart-add-item'].join(' ')} data-item-id={id} data-item-price={price} data-item-url={url}>
      {props.children}
    </button>
  )
}
