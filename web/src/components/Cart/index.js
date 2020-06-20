import React, { useContext } from 'react'
import StoreContext from '../../context/store-context'
import LineItem from './LineItem'
import Button from '../button/button'
import Container from '../container'
import { cn, getCurrencySymbol } from '../../lib/helpers'
import { uppercase, border } from '../typography.module.css'
import styles from './Cart.module.css'

const Cart = () => {
  const {
    store: { checkout }
  } = useContext(StoreContext)

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  const lineItems = checkout.lineItems.map(item => (
    <LineItem key={item.id.toString()} item={item} />
  ))

  return (
    <Container className={styles.root}>
      <div className={cn(border, styles.titleWrapper)}>
        <h1 className={cn(styles.title, uppercase)}>SHOPPING CART</h1>
      </div>
      <div className={styles.checkoutWrapper}>
        {lineItems}
        <div className={styles.checkout}>
          <div className={styles.priceWrapper}>
            <div className={styles.price}>
              <p>Subtotal</p>
              <p>
                {getCurrencySymbol(checkout.currencyCode)} {checkout.subtotalPrice}
              </p>
            </div>
            <div className={styles.price}>
              <p>Taxes</p>
              <p>
                {getCurrencySymbol(checkout.currencyCode)} {checkout.totalTax}
              </p>
            </div>
            <div className={styles.price}>
              <p>Total</p>
              <p>
                {getCurrencySymbol(checkout.currencyCode)} {checkout.totalPrice}
              </p>
            </div>
          </div>
          <Button
            onClick={handleCheckout}
            disabled={checkout.lineItems.length === 0}
            buttonStyle='large'
            border
            className={styles.checkoutButton}
          >
            Check out
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default Cart
