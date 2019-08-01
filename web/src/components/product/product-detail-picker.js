import React, { Component } from 'react'
import styles from './product-detail-picker.module.css'

export default class ProductDetailPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
       current: undefined
    }
  }

  handleSelectSize = (e) => {
    e.preventDefault()
    const selectedIdx = e.target.getAttribute('idx')
    console.log("Slected: ", selectedIdx)

    this.setState({
      current: this.props.details[selectedIdx]
    })
  }

  render() {
    const { details, calcPrice, rates } = this.props
    const current = this.state.current? this.state.current : details[0]
    const { price, sign } = calcPrice(current.price, rates)
    if(!current){
      return (
        <div style={{padding: '1em 0'}}>NOT AVAILABLE</div>
      )
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.priceWrapper}>
          <div>Price: </div>
          <div className={styles.price}>{`${price}${sign}`}</div>
        </div>
        <div className={styles.sizeWrapper}>
          <div>Size: </div>
          <div className={styles.sizeGrid} style={{gridTemplateColumns: `repeat(${details.length}, 1fr)`}}>
            {
              details.map((detail, i) => {
                return (
                  <div idx={i} key={`${i}-${detail.size}`} className={styles.size} onClick={this.handleSelectSize}>{detail.size}</div>
                )
              })
            }
            {/* For each size add div */}
          </div>
        </div>
        <div className={styles.inStockWrapper}>
          <div>In Stock: </div>
          <div className={styles.inStock}>{current.instock}</div>
        </div>
      </div>
    )
  }
}
