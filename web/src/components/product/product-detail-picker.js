import React, { Component } from 'react'
import styles from './product-detail-picker.module.css'
import BuyButton from '../button/snipcart-button'
import cn from '../../lib/helpers'
import PropTypes from 'prop-types'

export default class ProductDetailPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentIdx: 0
    }
  }

  handleSelectSize = e => {
    e.preventDefault()
    const selectedIdx = e.target.getAttribute('idx')
    this.setState({
      currentIdx: selectedIdx
    })
  }

  render() {
    const { id, title, shortDescription, slug, mainImage, details} = this.props.productProps
    const { currentIdx } = this.state

    // Calculate prices for different sizes
    const sizePriceList = details.map(detail => {
      const basePrice = details[0].price
      const price = detail.price - basePrice
      return `${detail.size}[${price > 0 ? '+' : ''}${price}]`
    }).join('|')

    return (
      <div className={styles.wrapper}>
        <div className={styles.priceWrapper}>
          <div>Price: </div>
          <div className={styles.price}>{`${details[currentIdx].price}£`}</div>
        </div>
        <div className={styles.sizeWrapper}>
          <div>Size: </div>
          <div
            className={styles.sizeGrid}
            style={{ gridTemplateColumns: `repeat(${details.length}, 1fr)` }}
          >
            {details.map((detail, i) => {
              const isActive = currentIdx == i ? true : false
              return (
                <div
                  idx={i}
                  key={`${i}-${detail.size}`}
                  className={isActive? [styles.size, styles.isActive].join(' ') : styles.size}
                  onClick={this.handleSelectSize}
                >
                  {detail.size}
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.inStockWrapper}>
          <div>Available: </div>
          <div className={styles.inStock}>{details[currentIdx].instock}</div>
        </div>
        {details[0] && (
          <BuyButton
            id={id}
            price={details[currentIdx].price}
            name={title}
            description={shortDescription}
            image={mainImage.asset.url}
            sizePriceList={sizePriceList}
            currentOption={currentIdx}
            url={`http://guste.design/store/${slug.current}`}
          >
            GRAB NOW
          </BuyButton>
        )}
      </div>
    )
  }
}


ProductDetailPicker.propTypes = {
  details: PropTypes.array.isRequired
}
