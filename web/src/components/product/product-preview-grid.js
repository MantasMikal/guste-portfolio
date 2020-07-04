import React, { useState } from 'react'
import ProductPreview from './product-preview'
import LazyLoader from '../lazy-loader/lazyLoader'
import MasonryLayout from '../masonry/masonry-layout'

import styles from './product-preview-grid.module.css'

const ProductPreviewGrid = ({ nodes, title }) => {
  const [layoutState, setLayoutState] = useState({
    loaded: 10,
    amountToLoad: 10,
    hasMore: true
  })

  const loadMore = () => {
    const productsLeft = nodes.length - layoutState.loaded // Posts left
    const totalAmount = layoutState.loaded + layoutState.amountToLoad // Total amount of posts to load

    if (productsLeft > 0) {
      setLayoutState({
        loaded: totalAmount,
        hasMore: true,
        amountToLoad: 10
      })
    } else {
      setLayoutState({
        hasMore: false,
        amountToLoad: 10,
        loaded: totalAmount
      })
    }
  }

  const products = []

  for (let i = 0; i < layoutState.loaded; i++) {
    nodes[i] && products.push(<ProductPreview {...nodes[i]} key={`Shop-node-${i}}`} />)
  }

  return (
    <div className={styles.root}>
      <LazyLoader loadMore={loadMore} hasMore={layoutState.hasMore}>
        <MasonryLayout gap={10} colCount={3}>
          {products}
        </MasonryLayout>
      </LazyLoader>
    </div>
  )
}

ProductPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default ProductPreviewGrid
