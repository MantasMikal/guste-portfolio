import { format, distanceInWords, differenceInDays } from 'date-fns'
import React from 'react'
import Container from '../container'
import BuyButton from '../button/snipcart-button'
import ProductShowcase from './product-showcase'
import BlockText from '../block-text'
import { paragraphLimited } from '../typography.module.css'
import styles from './product.module.css'

export default class Product extends React.Component {

  calcPrice = (price, rates) => {
    // Use current currency if not specified
    let priceList = {}
    const currencies = {
      eur: { name: 'eur', symbol: '€' },
      gbp: { name: 'gbp', symbol: '£' }
    }
    Object.entries(currencies).forEach(([key, val]) => {
      priceList[key] = Math.round(rates[val.name.toUpperCase()] * price)

    })
    //console.log("Prices: ", priceList)
    return priceList
  }

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
    const shortDescription = _rawDescription[0].children[0].text // Nasty TODO
    const productProps = { title, id, quantity, price, slug, shortDescription, mainImage, details }
    const { currency, rates, switchCurrency } = this.props.currencyContext
    console.log('CONTEXT: ', this.props.currencyContext)


    return (
      <article className={styles.root}>
        <Container>
          <div className={styles.grid}>
            <div className={styles.mainContent}>
              <ProductShowcase image={mainImage.asset.fluid} alt={mainImage.asset.alt} images={allImages} />
            </div>
            <aside className={styles.metaContent}>
              <h1 className={styles.title}>{title}</h1>
              <h3>Price: {price}</h3>
              <h3>Quantity: {quantity}</h3>
              {_rawDescription && (
                <div className={paragraphLimited}>
                  <BlockText blocks={_rawDescription} />
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
                      calcPrice={this.calcPrice}
                      rates={rates}
                      currentCurrency={currency}
                      productProps={productProps}
                    />
                  </aside>
                </div>
              )}
              {categories && (
                <div className={[styles.categories, styles.limitWidth].join(' ')}>
                  <h3 className={styles.categoriesHeadline}>Categories</h3>
                  <ul>
                    {categories.map(category => (
                      <li key={category._id}>{category.title}</li>
                    ))}
                  </ul>
                </div>
              )}

              <BuyButton
                id={id}
                price={{'usd': price, 'gbp': price}}
                name={title}
                description={shortDescription}
                image={mainImage.asset.url}
                url={`http://gustedesigndev.netlify.com/store/${slug.current}`} > GRAB NOW </BuyButton>
            </aside>
          </div>
        </Container>
      </article>
    )
  }
}
