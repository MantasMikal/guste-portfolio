import { Link } from 'gatsby'
import React from 'react'
import ProductPreview from './product-preview'
import LazyLoader from '../lazy-loader/lazyLoader'
import MasonryLayout from '../masonry/masonry-layout'

import styles from './product-preview-grid.module.css'

export default class ProductPreviewGrid extends React.Component {
  constructor(props) {
    super(props)

      this.state = {
         loaded: 10,
         amountToLoad: 10,
         hasMore: true,
      }
    }

    loadMore = () => {
      const productsLeft = this.props.nodes.length - this.state.loaded // Posts left
      const totalAmount = this.state.loaded + this.state.amountToLoad // Total amount of posts to load

      if(productsLeft > 0){
          this.setState({
              loaded: totalAmount,
              hasMore: true
          })
      }else {
          this.setState({
              hasMore: false
          })
      }
  }

  render () {
    //console.log("Product layout render")
    const products = []
    let nodes = this.props.nodes

    for(let i = 0; i < this.state.loaded; i++){
      nodes[i] && products.push(<ProductPreview {...nodes[i]} key={nodes[i].id} />)
    }
    return (
          <div className={styles.root}>
          <LazyLoader loadMore={this.loadMore} hasMore={this.state.hasMore}>
            <MasonryLayout gap={10} colCount={3}>
            {products}
            </MasonryLayout>
          </LazyLoader>
        </div>
    )
  }
}

ProductPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

