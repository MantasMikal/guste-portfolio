import { format, distanceInWords, differenceInDays } from 'date-fns'
import React from 'react'
import { Link } from 'gatsby'
import { buildImageObj } from '../../lib/helpers'
import { imageUrlFor } from '../../lib/image-url'
import BlockContent from '../block-content'
import Container from '../container'
import RoleList from '../role-list'
import ImageWithModal from '../image/imageWithModal'
import Button from '../button/button'
import ProductImageGrid from './productImageGrid'
import ProductShowcase from './productShowcase'
import { paragraphLimited } from '../typography.module.css'
import styles from './product.module.css'

class Product extends React.Component {
  render () {
    const { _rawBody, title, quantity, images, id, price, discount, categories, mainImage, publishedAt, slug } = this.props
    let allImages = [mainImage, ...images]
    return (
      <article className={styles.root}>
        <Container>
          <div className={styles.grid}>
            <div className={styles.mainContent}>
              <ProductShowcase image={mainImage.asset.fluid} alt={mainImage.asset.alt} images={allImages} />
              {/* <ProductImageGrid images={images} /> */}
            </div>
            <aside className={styles.metaContent}>
              <h1 className={styles.title}>{title}</h1>
              <h3>Price: {price}</h3>
              <h3>Quantity: {quantity}</h3>
              <div className={paragraphLimited}>
                {_rawBody && <BlockContent blocks={_rawBody || []} />}
              </div>
              {publishedAt && (
                <div className={styles.publishedAt}>
                  {differenceInDays(new Date(publishedAt), new Date()) > 3
                    ? distanceInWords(new Date(publishedAt), new Date())
                    : format(new Date(publishedAt), 'MMMM Do YYYY')}
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
              <Button
                id={id}
                price={price}
                name={title}
                url={`http://gustore.netlify.com/store/${slug.current}`} > GRAB NOW </Button>
            </aside>
          </div>
        </Container>
      </article>
    )
  }
}

export default Product

// Aside - For future reference
/* <aside className={styles.metaContent}>
{publishedAt && (
  <div className={styles.publishedAt}>
    {differenceInDays(new Date(publishedAt), new Date()) > 3
      ? distanceInWords(new Date(publishedAt), new Date())
      : format(new Date(publishedAt), 'MMMM Do YYYY')}
  </div>
)}
{members && <RoleList items={members} title='Authors' />}
{categories && (
  <div className={styles.categories}>
    <h3 className={styles.categoriesHeadline}>Categories</h3>
    <ul>
      {categories.map(category => (
        <li key={category._id}>{category.title}</li>
      ))}
    </ul>
  </div>
)}
{relatedProjects && (
  <div className={styles.relatedProjects}>
    <h3 className={styles.relatedProjectsHeadline}>Related projects</h3>
    <ul>
      {relatedProjects.map(project => (
        <li key={`related_${project._id}`}>
          <Link to={`/project/${project.slug.current}`}>{project.title}</Link>
        </li>
      ))}
    </ul>
  </div>
)}
</aside> */
