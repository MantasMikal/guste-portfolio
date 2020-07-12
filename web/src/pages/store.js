import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { mapEdgesToNodes, cn } from '../lib/helpers'
import ProductPreviewGrid from '../components/product/product-preview-grid'
import Container from '../components/container'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { responsiveTitle3, uppercase, border } from '../components/typography.module.css'
import { FaFilter, FaArrowRight } from 'react-icons/fa'
import { FiGrid } from 'react-icons/fi'
import { RiLayoutRowLine } from 'react-icons/ri'
import CategoryButton from '../components/button/button'

import styles from './store.module.css'

function collectCategories(nodes) {
  const categories = []
  for (let i = 0; i < nodes.length; i++) {
    if (categories.indexOf(nodes[i].productType) === -1) categories.push(nodes[i].productType)
  }
  return categories
}

const StorePage = () => {
  const { products } = useStaticQuery(
    graphql`
      query {
        products: allShopifyProduct(sort: { fields: [createdAt], order: DESC }) {
          edges {
            node {
              id
              title
              handle
              createdAt
              description
              descriptionHtml
              productType
              images {
                id
                originalSrc
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 910) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
              variants {
                price
                compareAtPriceV2 {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    `
  )
  const galleryNodes = products && mapEdgesToNodes(products)
  const categories = collectCategories(galleryNodes)
  const firstCategory = galleryNodes[0] && galleryNodes[0].productType
  const [filter, setFilter] = useState({
    activeFilter: ''
  })

  const [grid, setGrid] = useState(false)

  const [showFilter, setShowFilter] = useState(true)

  const handleShowFilter = () => {
    setShowFilter(true)
  }

  const handleHideFilter = () => {
    setShowFilter(false)
  }

  const handleClick = e => {
    e.preventDefault()
    const category = e.target.getAttribute('cattitle')
    const nextActiveFilter = category !== filter.activeFilter ? category : null

    setFilter({
      activeFilter: nextActiveFilter
    })
  }

  const filterdNodes = (() => {
    if (filter.activeFilter) {
      return galleryNodes.filter(node => {
        if (node.productType === filter.activeFilter) return true
        else return false
      })
    } else {
      return galleryNodes
    }
  })()

  return (
    <Layout>
      <SEO title="Store" />
      <Container>
        <div className={cn(border, styles.wrapper)}>
          <div>
            <h1 className={cn(responsiveTitle3, uppercase, styles.title)}>Store</h1>
          </div>
          <div className={styles.gridIcon} onClick={() => setGrid(!grid)}>
            {!grid ? (
              <FiGrid size="0.9rem" style={{ margin: 'auto 0' }} />
            ) : (
              <RiLayoutRowLine size="0.9rem" style={{ margin: 'auto 0' }} />
            )}
          </div>
          <div className={styles.filterWrapper}>
            <button
              onClick={showFilter ? handleHideFilter : handleShowFilter}
              className={styles.iconWrapper}
            >
              <label className={styles.filterLabel}>CATEGORIES</label>
              <FaFilter size="0.9rem" style={{ margin: 'auto 0' }} />
              <FaArrowRight size="0.9rem" className={showFilter ? styles.closeBtn : styles.hide} />
            </button>
            <div className={showFilter ? styles.categoryWrapper : styles.hide}>
              {categories.map(category => {
                // Check if filter is active to change its color
                const isActive = filter.activeFilter === category
                return (
                  <CategoryButton
                    isActive={isActive}
                    cattitle={category}
                    key={category}
                    onClick={handleClick}
                    className={styles.categoryButton}
                  >
                    {category}
                  </CategoryButton>
                )
              })}
            </div>
          </div>
        </div>
        {filterdNodes && filterdNodes.length > 0 && (
          <ProductPreviewGrid nodes={filterdNodes} gridLayout={grid} colCount={3} title="Store" />
        )}
      </Container>
    </Layout>
  )
}

export default StorePage
