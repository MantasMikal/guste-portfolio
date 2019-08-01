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
                    <h1 className={styles.title}>{title}</h1>
                    <h3>Quantity: {quantity}</h3>
                    <h3>
                      Price: {newPrice}
                      {currency.sign}
                    </h3>
                    {_rawDescription && (
                      <div className={paragraphLimited}>
                        <BlockText blocks={_rawDescription} />
                      </div>
                    )}
                    {publishedAt && (
                      <div className={styles.publishedAt}>
                        {differenceInDays(new Date(publishedAt), new Date()) > 3
                          ? distanceInWords(new Date(publishedAt), new Date())
                          : format(new Date(publishedAt), 'MMMM Do YYYY')}
                      </div>
                    )}
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
                <div className="snipcart-summary">
                  <a href="#" className="snipcart-checkout">
                    Customer dashboard
                  </a>
                </div>
                <div>Lots of content</div>
                <div className="snipcart-summary">
                  Number of items: <span className="snipcart-total-items" />
                  Total price: <span className="snipcart-total-price" />
                </div>
              </Container>
            </article>
          )
        }}
      </CurrencyContext.Consumer>
    )
  }
}
