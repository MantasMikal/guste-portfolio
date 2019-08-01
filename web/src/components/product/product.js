import { format, distanceInWords, differenceInDays } from 'date-fns'
import React from 'react'
import Container from '../container'
import BuyButton from '../button/snipcart-button'
import ProductShowcase from './product-showcase'
import BlockText from '../block-text'
import { paragraphLimited } from '../typography.module.css'
import { CurrencyContext, currencies } from '../../context/currency-context'
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
        {({ currency, rates }) => {
          console.log("CUrr: ", currency, "Rate: ", rates)
          console.log("CURRENCY", rates[currency.name.toUpperCase()])
          const newPrice = Math.round(rates[currency.name.toUpperCase()] * price)
          return (
            <article className={styles.root}>
              <Container>
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
                    <h3>Price: {newPrice}{currency.sign}</h3>
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
                      price={{ eur: price, gbp: Math.round(rates['gbp'] * price)}}
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
