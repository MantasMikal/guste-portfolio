import React from 'react'
import styles from './snipcart-button.module.css'

export default function SnipcartButton (props) {
  const { id, price, name, url, description, image, details, currentOption, sizePriceList, codeName } = props
 
  const priceStr = JSON.stringify(price)
  console.log('%c%s', 'color: #733d00',"Price:", price);
  console.log('%c%s', 'color: #f2ceb6', "Url", url);

  console.log('%c%s', 'color: #f200e2', 'ID', id);
  return (
    <button
      href='#'
      data-item-name={name}
      data-item-description={description}
      data-item-image={image}
      className={[styles.button, 'snipcart-add-item'].join(' ')}
      data-item-id={codeName}
      data-item-price="30.00"
      data-item-url={url}
      // data-item-custom1-name="Size"
      // data-item-custom1-options={sizePriceList}
      // data-item-custom1-value={details[currentOption].size}
      role='button'
    >
      {props.children}
    </button>
  )
}
