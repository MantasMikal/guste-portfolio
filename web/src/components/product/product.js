import { format, distanceInWords, differenceInDays } from 'date-fns'
import React from 'react'
import Container from '../container'
import BuyButton from '../button/snipcart-button'
import ProductShowcase from './product-showcase'
import BlockText from '../block-text'
import { paragraphLimited } from '../typography.module.css'
import { CurrencyContext, currencies } from '../../context/currency-context'
import { cn } from '../../lib/helpers'
import { uppercase, responsiveTitle2, border } from '../typography.module.css'
import CurrencySelector from '../currency-selector/currency-selector'
import Cart from '../snipcart/cart'
// import Snipcart from 'gatsby-plugin-snipcart'
import styles from './product.module.css'

export default class Product extends React.Component {
  render() {
    const {
      title,
      quantity,
      images,
      id,
      price,
      _rawDescription,
      discount,
      mainImage,
      publishedAt,
      slug
    } = this.props
    const allImages = images ? [mainImage, ...images] : [mainImage] // Concat main image with other product images
    const shortDescription = _rawDescription[0].children[0].text // Nasty TODO
    return (
      <CurrencyContext.Consumer>
        {({ currency, rates, switchCurrency }) => {
          // Get price based on selected currency
          const newPrice = Math.round(rates[currency.name.toUpperCase()] * price)
          return (
            <article className={styles.root}>
              <Container>
                <div className={border} style={{ display: 'flex' }}>
                  <h1 className={cn(styles.title, uppercase)}>{title}</h1>
                  <CurrencySelector switchCurrency={switchCurrency} currentCurrency={currency} />
                  <Cart />
                </div>
                <div className={styles.grid}>
                  <div className={styles.mainContent}>
                    <ProductShowcase
                      image={mainImage.asset.fluid}
                      alt={mainImage.asset.alt}
                      images={allImages}
                    />
                  </div>
                  <aside className={styles.metaContent}>
                    {_rawDescription && (
                      <div className={paragraphLimited}>
                        <BlockText blocks={_rawDescription} />
                      </div>
                    )}
                    <p>Quantity: {quantity}</p>
                    <p>
                      Price: {newPrice}
                      {currency.sign}
                    </p>
                    <BuyButton
                      id={id}
                      price={{ eur: price, gbp: Math.round(rates['gbp'] * price) }}
                      name={title}
                      description={shortDescription}
                      image={mainImage.asset.url}
                      url={`http://guste.design/store/${slug.current}`}
                    >
                      GRAB NOW
                    </BuyButton>
                  </aside>
                </div>
              </Container>
            </article>
          )
        }}
      </CurrencyContext.Consumer>
    )
  }
}
