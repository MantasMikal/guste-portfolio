import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { FaShoppingCart } from 'react-icons/fa'
import reduce from 'lodash/reduce'
import { cn } from '../../lib/helpers'
import StoreContext from '../../context/store-context'
import styles from './cart.module.css'

const useQuantity = () => {
  const {
    store: { checkout }
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}
const Cart = ({ className }) => {
  const [hasItems, quantity] = useQuantity()
  return (
    <Link id='Cart' to="/cart" className={cn(styles.wrapper, className)}>
      CART
      <FaShoppingCart style={{ margin: 'auto', padding: '0.125em 0.425em' }} />
      {hasItems && (
        <div className={cn(styles.itemCount)}>
          <span className={styles.quantity}>{quantity}</span>
        </div>
      )}
    </Link>
  )
}

export default Cart
