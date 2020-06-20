import React, { useState } from 'react'
import ProductPreview from './product-preview'
import LazyLoader from '../lazy-loader/lazyLoader'
import MasonryLayout from '../masonry/masonry-layout'

import { border } from '../typography.module.css'
import styles from './product-preview-grid.module.css'

const ProductPreviewGrid = ({ nodes, title }) => {
  console.log('ProductPreviewGrid -> nodes', nodes) 
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
        hasMore: true
      })
    } else {
      setLayoutState({
        hasMore: false
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
