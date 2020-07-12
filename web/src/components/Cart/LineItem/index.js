import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { getCurrencySymbol } from '../../../lib/helpers'
import StoreContext from '../../../context/store-context'
import { MdClose } from 'react-icons/md'
import styles from './LineItem.module.css'

const LineItem = props => {
  const { item } = props
  const {
    removeLineItem,
    store: { client, checkout }
  } = useContext(StoreContext)

  const variantImage = item.variant.image ? (
    <img
      className={styles.productImage}
      src={item.variant.image.src}
      alt={`${item.title} product shot`}
    />
  ) : null

  const selectedOptions = item.variant.selectedOptions
    ? item.variant.selectedOptions.map(option => (
      <div className={styles.options} key={`option-${option.name}`}>
        <p>
          {option.name}: {option.value}
        </p>
      </div>
    ))
    : null

  const handleRemove = () => {
    removeLineItem(client, checkout.id, item.id)
  }
  return (
    <div className={styles.LineItem}>
      <div className={styles.productTitle}>
        {item.title}
        <button className={styles.removeButton} onClick={handleRemove}>
          <MdClose />
        </button>
      </div>
      <div className={styles.product}>
        <Link className={styles.imageWrapper} to={`/store/${item.variant.product.handle}/`}>
          {variantImage}
        </Link>
        <div className={styles.details}>
          <div className={styles.quantity}>
            <p>Quantity: {item.quantity}</p>
          </div>
          {selectedOptions}
        </div>
        <div className={styles.price}>
          {getCurrencySymbol(item.variant.priceV2.currencyCode)} {item.variant.priceV2.amount}
        </div>
      </div>
    </div>
  )
}

export default LineItem
