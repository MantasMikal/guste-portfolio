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
            {({currency, rates, calcPrice}) => {
              // Calculate value in difference currency if it is not euros
              //console.log(Math.round((rates[currency.name.toUpperCase()] * props.price)))
              // console.log(rates)
              // console.log(currency.name.toUpperCase())
              // console.log((rates[currency.name.toUpperCase()]))
              // const { price, sign } = calcPrice(props.details[0].price, rates)

              if(currency && rates && props.details[0]){
                // const newPrice = Math.round((rates[currency.name.toUpperCase()] * props.details[0].price))
                console.log("DETAILS: ", props.details)
                const priceList = calcPrice(props.details[0].price, rates)
                return (
                  <span className={styles.price}>{`${priceList[currency.name]}${currency.sign}`}</span>
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
