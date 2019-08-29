import React from 'react'
import styles from './snipcart-button.module.css'

export default function SnipcartButton (props) {
  const { id, price, name, url, description, image, details } = props
  console.log(details)

  const sizes = details.map((detail) => {
    const basePrice = details[0].price
    const price = detail.price - basePrice
    return `${detail.size}[${price > 0 ? '+' : ''}${price}]`
  }).join('|')

  console.log("List: ", sizes)
  console.log(details[0].size)
  console.log(`${JSON.stringify(price)}`)
  const priceStr = JSON.stringify(price)
  const tempPrice = JSON.stringify({"eur": 12, "gbp": 11})
  return (
    <button
      href='#'
      data-item-name={name}
      data-item-description={description}
      data-item-image={image}
      className={[styles.button, 'snipcart-add-item'].join(' ')}
      data-item-id={id}
      data-item-price={tempPrice}
      data-item-url={url}
      data-item-custom1-name="Size"
      data-item-custom1-options={sizes}
      data-item-custom1-value={details[0].size}
      role='button'
    >
      {props.children}
    </button>
  )
}
