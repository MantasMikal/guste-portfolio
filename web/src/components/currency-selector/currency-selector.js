import React from 'react'
import { cn } from '../../lib/helpers'
import { currencies } from '../../context/currency-context'
import styles from './currency-selector.module.css'

export default function CurrnecySelector({ switchCurrency, currentCurrency }) {
  return (
    <div className={styles.currencyWrapper}>
      {Object.values(currencies).map(currency => {
        return (
          <div
            key={currency.name}
            onClick={switchCurrency}
            currency={`${currency.name}`}
            className={
              currentCurrency.name === currency.name
                ? cn(styles.currency, styles.active)
                : styles.currency
            }
          >
            {currency.name.toUpperCase()}
          </div>
        )
      })}
    </div>
  )
}
