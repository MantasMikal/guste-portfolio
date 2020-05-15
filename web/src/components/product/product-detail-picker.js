import React, { Component } from "react";
import styles from "./product-detail-picker.module.css";
import BuyButton from "../button/snipcart-button";
import cn from "../../lib/helpers";
import PropTypes from "prop-types";

export default class ProductDetailPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIdx: 0,
      qty: 1
    };
  }

  handleSelectSize = (e) => {
    this.setState({currentIdx: e.target.value});
  };

  handleSelectQty = (e) => {

    this.setState({
      qty: e.target.value
    });
  };

  render() {
    const {
      id,
      title,
      shortDescription,
      slug,
      mainImage,
      details,
    } = this.props.productProps;
    const { currentIdx } = this.state;
    // console.log('Current: ', currentIdx)
    // Calculate prices for different sizes
    const sizePriceList = details
      .map((detail) => {
        const basePrice = details[0].price;
        const price = detail.price - basePrice;
        return `${detail.size}[${price > 0 ? "+" : ""}${price}]`;
      })
      .join("|");

    console.log('Sizepricem, ',sizePriceList, details)
      console.log( Array(details[currentIdx].instock))
      console.log('st', this.state)
    return (
      <div className={styles.wrapper}>
          <div className={styles.title}>{title}</div>
          <div className={styles.price}>{`£${details[currentIdx].price}`}</div>
     
            <div className={styles.label}>SIZE </div>

            <select value={this.state.selectedIdx} onChange={this.handleSelectSize} className={styles.selector}>
              {details &&
                details.map((det, i) => (
                  <option value={i} key={det.name + i} className={styles.option}>
                    {det.size}
                  </option>
                ))}
            </select>
            <div className={styles.label}>QUANTITY </div>
            <select value={this.state.qty} onChange={this.handleSelectQty} className={styles.selector}>
              {details &&
                Array(details[currentIdx].instock + 1).fill().map((q, i) => (
                  <option value={i + 1} key={q + i} className={styles.option}>
                    {i + 1}
                  </option>
                ))}
            </select>

          
          {/* <div
            className={styles.sizeGrid}
            style={{ gridTemplateColumns: `repeat(${details.length}, 1fr)` }}
          >
            {details.map((detail, i) => {
              const isActive = currentIdx == i ? true : false;
              return (
                <div
                  idx={i}
                  key={`${i}-${detail.size}`}
                  className={
                    isActive
                      ? [styles.size, styles.isActive].join(" ")
                      : styles.size
                  }
                  onClick={this.handleSelectSize}
                >
                  {detail.size}
                </div>
              );
            })}
          </div> */}
        
        {/* <div className={styles.inStockWrapper}>
          <div>Available: </div>
          <div className={styles.inStock}>{details[currentIdx].instock}</div>
        </div> */}
        {details[0] && (
          <BuyButton
            id={id}
            price={details[currentIdx].price}
            name={title}
            description={shortDescription}
            image={mainImage.asset.url}
            sizePriceList={sizePriceList}
            qty={this.state.qty}
            selectedSize={details[currentIdx].size}
            url={`http://guste.design/store/${slug.current}`}
          >
            PURCHASE
          </BuyButton>
        )}
      </div>
    );
  }
}

ProductDetailPicker.propTypes = {
  details: PropTypes.array.isRequired,
};
