// Facts are going to come as array of object that include image and text
// The main component will handle which fact is displayed

import React, { Component } from 'react'
import Image from '../image/zoomableImage'
import BlockContent from '../block-content'
import Button from '../button/button'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa'

import styles from './slider.module.css'

export default class slider extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentSlide: 0
    }
  }

  handleNext = () => {
    const total = this.props.slides.length - 1
    const nextSlide = this.state.currentSlide + 1 > total ? 0 : this.state.currentSlide + 1
    this.setState({
      currentSlide: nextSlide
    })
  }

  handlePrev = () => {
    const total = this.props.slides.length - 1
    const nextSlide = this.state.currentSlide - 1 < 0 ? total : this.state.currentSlide - 1
    this.setState({
      currentSlide: nextSlide
    })
  }

  render () {
    const slide = this.props.slides[this.state.currentSlide]
    return (
      <div className={styles.slidesWrapper}>
        <div className={styles.slideText}>
          {slide && slide._rawBody && (
              <BlockContent blocks={slide._rawBody} />
          )}
        </div>
        {/* <div className={styles.imageWrapper}>
          { slide && slide.image && slide.image.asset && slide.image.asset.fluid && (
            <Image fluid={slide.image.asset.fluid} alt={slide.image.alt} />
          )}
        </div> */}
        {
          this.props.slides.length > 1 && (
            <div className={styles.buttonWrapper}>
              <FaAngleLeft onClick={this.handlePrev} className={styles.arrow}
              size={'2em'} > Previous </FaAngleLeft>
              <FaAngleRight onClick={this.handleNext} size={'2em'} className={styles.arrow} > Next </FaAngleRight>
          </div>
          )
        }
      </div>
    )
  }
}
