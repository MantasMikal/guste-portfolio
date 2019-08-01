import React from 'react'
import {FaShoppingCart} from 'react-icons/fa'
import {cn} from '../../lib/helpers'
import styles from './cart.module.css'

export default function() {

  return (
    <a href="#" className={cn('snipcart-checkout', styles.wrapper)}>
      <FaShoppingCart style={{margin: 'auto', padding: '0.125em 0.425em'}}/>
      <div className={cn("snipcart-summary", styles.itemCount)}>
        <span className="snipcart-total-items" style={{padding: '0 0.325em', margin: 'auto'}}/>
      </div>
    </a>
  )
}
