import React, { Component } from 'react'
import styles from './multiImage.module.css'
import Img from 'gatsby-image'

export default class MultiImage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentImageIdx: 0,
      mouseMoveSkip: 10 // Skips pixels for image swaping
    }
    this.handleHover = this.handleHover.bind(this)
  }

  // Prevent from updating on every pixel moved
  shouldComponentUpdate (nextProps, nextState) {
    if (this.state.currentImageIdx === nextState.currentImageIdx) {
      return false
    } else {
      return true
    }
  }

  handleHover () {
    const skipAmount = this.props.skipAmount ? this.props.skipAmount : 10 // How much pixels to go trough to change image
    this.setState({
      mouseMoveSkip: this.state.mouseMoveSkip - 1 // Decrease pixels left before changing image
    })

    if (this.state.mouseMoveSkip < 0) {
      const imageIdx =
        this.state.currentImageIdx < this.props.images.length - 1
          ? this.state.currentImageIdx + 1
          : 0
      this.setState({
        currentImageIdx: imageIdx,
        mouseMoveSkip: skipAmount
      })
    }
  }
  // TODO
  // Render all on load and then just switch between with css to improve performance
  render () {
    const imageId = this.state.currentImageIdx
    const image = this.props.images[imageId]
    return (
      <>
        <div onMouseMove={this.handleHover}>
          <Img
            key={image.asset.id}
            className={[styles.multiImage, styles.active].join('')}
            fluid={image.asset.fluid}
            alt={image.alt}
          />
        </div>
      </>
    )
  }
}
