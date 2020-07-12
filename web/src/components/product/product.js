import React from 'react'
import Container from '../container'
import Prose from '../prose'
import ProductShowcase from './product-showcase'
import { uppercase, border } from '../typography.module.css'
import { cn } from '../../lib/helpers'
import Cart from '../snipcart/cart'
import styles from './product.module.css'
import ProductDetailPicker from './product-detail-picker'
import ProductPreview from './product-preview'

const Product = ({ product, similarProducts }) => {
  const { title, images, descriptionHtml } = product
  return (
    <article className={styles.root}>
      <Container>
        <div className={cn(border, styles.productWrapper)}>
          <h1 className={cn(styles.title, uppercase)}>{title}</h1>
          <Cart />
        </div>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            <ProductShowcase
              image={images[0].localFile.childImageSharp.fluid}
              alt={title}
              images={images}
            />
          </div>
          <aside className={styles.metaContent}>
            <ProductDetailPicker product={product} />
            {descriptionHtml && (
              <div className={styles.description}>
                <Prose html={descriptionHtml} />
              </div>
            )}
          </aside>
        </div>
        <div className={cn(border, styles.productWrapper)}>
          <h1 className={cn(styles.title, uppercase)}>SIMILAR PRODUCTS</h1>
        </div>
        <div className={styles.similarProducts}>
          {similarProducts.map((prod, i) => (
            <ProductPreview {...prod.node} handle={prod.node.handle} key={`similarProd-${i}`} />
          ))}
        </div>
      </Container>
    </article>
  )
}

export default Product
