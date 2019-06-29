// Facts are going to come as array of object that include image and text
// The main component will handle which fact is displayed

import React, { Component } from 'react'
import Image from '../image/zoomableImage'
import BlockContent from '../block-content'
import Button from '../button/button'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa'

import styles from './factSlider.module.css'

export default class FactSlider extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentFact: 0
    }
  }

  handleNext = () => {
    const total = this.props.facts.length - 1
    const nextFact = this.state.currentFact + 1 > total ? 0 : this.state.currentFact + 1
    this.setState({
      currentFact: nextFact
    })
  }

  handlePrev = () => {
    const total = this.props.facts.length - 1
    const nextFact = this.state.currentFact - 1 < 0 ? total : this.state.currentFact - 1
    this.setState({
      currentFact: nextFact
    })
  }

  render () {
    const fact = this.props.facts[this.state.currentFact]
    return (
      <div className={styles.factsWrapper}>
        <div className={styles.factText}>
          {fact && fact._rawBody && (
              <BlockContent blocks={fact._rawBody} />
          )}
        </div>
        <div className={styles.imageWrapper}>
          { fact && fact.image && fact.image.asset && fact.image.asset.fluid && (
            <Image fluid={fact.image.asset.fluid} alt={fact.image.alt} />
          )}
        </div>
        {
          this.props.facts.length > 1 && (
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
