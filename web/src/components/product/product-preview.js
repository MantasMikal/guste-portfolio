import { Link } from 'gatsby'
import React from 'react'
import { cn } from '../../lib/helpers'
import Image from '../image/image'
import MainImage from '../image/zoomableImage'
import styles from './product-preview.module.css'
import { responsiveTitle5 } from '../typography.module.css'
import { CurrencyContext, currencies } from '../../context/currency-context'

function ProductPreview(props) {
  console.log("RENDER!", )
  return (
    <div className={styles.itemWrapper}>
      <Link to={`/store/${props.slug.current}`}>
        <div className={styles.inner}>
          {props.mainImage && props.mainImage.asset && (
            <Image fluid={props.mainImage.asset.fluid} />
          )}
        </div>
        <div className={styles.titleWrapper}>
          <h1 className={cn(responsiveTitle5, styles.title)}>{props.title}</h1>
          <CurrencyContext.Consumer>
            {({currency, rates}) => {
              // Calculate value in difference currency if it is not euros
              //console.log(Math.round((rates[currency.name.toUpperCase()] * props.price)))
              // console.log(rates)
              // console.log(currency.name.toUpperCase())
              // console.log((rates[currency.name.toUpperCase()]))
              console.log("RATES: ", rates)
              console.log("CUR", currency)
              if(currency && rates){
                const newPrice = Math.round((rates[currency.name.toUpperCase()] * props.price))
                return (
                  <span className={styles.price}>{`${newPrice}${currency.sign}`}</span>
                )
              }
            }}
          </CurrencyContext.Consumer>
        </div>
      </Link>
    </div>
  )
}

export default ProductPreview