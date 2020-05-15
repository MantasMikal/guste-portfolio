import { format, distanceInWords, differenceInDays } from 'date-fns'
import React from 'react'
import Container from '../container'
import BuyButton from '../button/snipcart-button'
import ProductShowcase from './product-showcase'
import BlockText from '../block-text'
import { paragraphLimited } from '../typography.module.css'
import { cn } from '../../lib/helpers'
import { uppercase, responsiveTitle2, border } from '../typography.module.css'
import CurrencySelector from '../currency-selector/currency-selector'
import Cart from '../snipcart/cart'
// import Snipcart from 'gatsby-plugin-snipcart'
import styles from './product.module.css'
import ProductDetailPicker from './product-detail-picker'

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
      slug,
      details
    } = this.props
    const allImages = images ? [mainImage, ...images] : [mainImage] // Concat main image with other product images
    const shortDescription = _rawDescription && _rawDescription[0].children[0].text // Nasty TODO
    const productProps = { title, id, quantity, price, slug, shortDescription, mainImage, details }
  
    return (
            <article className={styles.root}>
              <Container>
                <div className={border} style={{ display: 'flex' }}>
                  <h1 className={cn(styles.title, uppercase)} style={{ padding: '0.125em 0 0 0' }}>
                    {title}
                  </h1>
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
                    <ProductDetailPicker
                      details={details}
                      productProps={productProps}
                    />
                  </aside>
                </div>
              </Container>
            </article>
    )
  }
}
