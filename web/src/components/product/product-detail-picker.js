import React, { useState, useContext, useCallback, useEffect } from 'react'
import Button from '../button/button'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import { cn } from '../../lib/helpers'
import PropTypes from 'prop-types'
import StoreContext from '../../context/store-context'

import styles from './product-detail-picker.module.css'

const ProductDetailPicker = ({ product }) => {
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRange: { minVariantPrice }
  } = product
  const [variant, setVariant] = useState({ ...initialVariant })
  const [quantity, setQuantity] = useState(1)
  const {
    addVariantToCart,
    store: { client, adding }
  } = useContext(StoreContext)

  const productVariant = client.product.helpers.variantForOptions(product, variant) || variant
  const [available, setAvailable] = useState(productVariant.availableForSale)

  const checkAvailability = useCallback(
    productId => {
      client.product.fetch(productId).then(fetchedProduct => {
        // this checks the currently selected variant for availability
        const result = fetchedProduct.variants.filter(
          variant => variant.id === productVariant.shopifyId
        )
        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [client.product, productVariant.shopifyId, variants]
  )

  useEffect(() => {
    checkAvailability(product.shopifyId)
  }, [productVariant, checkAvailability, product.shopifyId])

  const handleQuantityChange = ({ target }) => {
    setQuantity(target.value)
  }

  const handleOptionChange = (optionIndex, { target }) => {
    const { value } = target
    const currentOptions = [...variant.selectedOptions]

    currentOptions[optionIndex] = {
      ...currentOptions[optionIndex],
      value
    }

    const selectedVariant = find(variants, ({ selectedOptions }) =>
      isEqual(currentOptions, selectedOptions)
    )

    setVariant({ ...selectedVariant })
  }

  const handleAddToCart = () => {
    console.log('productVariant.shopifyId', productVariant.shopifyId)
    console.log('quantity', quantity)
    addVariantToCart(productVariant.shopifyId, quantity)
  }

  /*
Using this in conjunction with a select input for variants
can cause a bug where the buy button is disabled, this
happens when only one variant is available and it's not the
first one in the dropdown list. I didn't feel like putting
in time to fix this since its an edge case and most people
wouldn't want to use dropdown styled selector anyways -
at least if the have a sense for good design lol.
*/
  const checkDisabled = (name, value) => {
    const match = find(variants, {
      selectedOptions: [
        {
          name: name,
          value: value
        }
      ]
    })
    if (match === undefined) return true
    if (match.availableForSale === true) return false
    return true
  }

  const price = Intl.NumberFormat(undefined, {
    currency: minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency'
  }).format(variant.price)
  console.log('options', options)
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{product.title}</div>
      <div className={styles.price}>{price}</div>
      <div className={styles.optionWrapper}>
        {options.map(
          ({ id, name, values }, index) =>
            name !== 'Title' && (
              <div key={id}>
                <label htmlFor={name} className={styles.label}>
                  {name}{' '}
                </label>
                <select
                  name={name}
                  key={id}
                  onChange={event => handleOptionChange(index, event)}
                  className={styles.selector}
                >
                  {values.map(value => (
                    <option
                      value={value}
                      key={`${name}-${value}`}
                      disabled={checkDisabled(name, value)}
                      className={styles.option}
                    >
                      {value}
                    </option>
                  ))}
                </select>
                <br />
              </div>
            )
        )}
      </div>
      <label htmlFor="quantity" className={styles.label}>
        QUANTITY
      </label>
      <select
        className={cn(styles.qualitySelector, styles.selector)}
        value={quantity}
        onChange={handleQuantityChange}
      >
        {variants &&
          Array(5)
            .fill()
            .map((q, i) => (
              <option value={i + 1} key={'q' + i} className={styles.option}>
                {i + 1}
              </option>
            ))}
      </select>
      <Button
        border
        buttonStyle="large"
        type="submit"
        disabled={!available || adding}
        className={styles.addToCartButton}
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
      {!available && <p>This Product is out of Stock!</p>}
    </div>
  )
}

ProductDetailPicker.propTypes = {
  product: PropTypes.shape({
    descriptionHtml: PropTypes.string,
    handle: PropTypes.string,
    id: PropTypes.string,
    shopifyId: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        originalSrc: PropTypes.string
      })
    ),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.string)
      })
    ),
    productType: PropTypes.string,
    title: PropTypes.string,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        availableForSale: PropTypes.bool,
        id: PropTypes.string,
        price: PropTypes.string,
        title: PropTypes.string,
        shopifyId: PropTypes.string,
        selectedOptions: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string
          })
        )
      })
    )
  }),
  addVariantToCart: PropTypes.func
}

export default ProductDetailPicker
