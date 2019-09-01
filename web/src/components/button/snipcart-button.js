import React from 'react'
import styles from './snipcart-button.module.css'

export default function SnipcartButton (props) {
  const { id, price, name, url, description, image, details, currentOption, sizePriceList } = props
  const priceStr = JSON.stringify(price)
  return (
    <button
      href='#'
      data-item-name={name}
      data-item-description={description}
      data-item-image={image}
      className={[styles.button, 'snipcart-add-item'].join(' ')}
      data-item-id={id}
      data-item-price={priceStr}
      data-item-url={url}
      data-item-custom1-name="Size"
      data-item-custom1-options={sizePriceList}
      data-item-custom1-value={details[currentOption].size}
      role='button'
    >
      {props.children}
    </button>
  )
}
