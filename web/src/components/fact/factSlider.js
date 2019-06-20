// Facts are going to come as array of object that include image and text
// The main component will handle which fact is displayed

import React, { Component } from 'react'
import Image from '../image/zoomableImage'
import BlockContent from '../block-content'
import Button from '../button/button'
import styles from './factSlider.module.css'

export default class FactSlider extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentFact: 1
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
    const { image, _rawBody } = this.props.facts[this.state.currentFact]
    return (
      <div className={styles.factsWrapper}>
        <div>
          { image && image.asset.fluid && (
            <Image fluid={image.asset.fluid} alt={image.alt} />
          )}
        </div>
        <div className={styles.factText}>
          {_rawBody && (
              <BlockContent blocks={_rawBody} />
          )}
        </div>
        <div className={styles.buttonWrapper}>
          <Button onClick={this.handlePrev} > Previous </Button>
          <Button onClick={this.handleNext} > Next </Button>
        </div>
      </div>
    )
  }
}
