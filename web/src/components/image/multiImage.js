import React, { Component } from 'react'
import styles from './multiImage.module.css'
import Img from 'gatsby-image'
import { cn } from '../../lib/helpers'

export default class MultiImage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentImageIdx: 0,
      mouseMoveSkip: this.props.skipAmount || 8 // Skips pixels for image swaping
    }
    this.handleHover = this.handleHover.bind(this)
  }

  // Prevent from updating on every pixel moved
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.currentImageIdx === nextState.currentImageIdx) {
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  handleHover() {
    // Decrease counter on mouse move and change images
    const skipAmount = this.props.skipAmount // How much pixels to go trough to change image
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
  render() {
    const imageId = this.state.currentImageIdx
    const { square } = this.props

    // true if first or current. Used to put image on top
    const isActive = (i, id) => i == id || (i == 0 && i != id)
    return (
      <>
        <div className={cn(styles.Wrapper, square && styles.square)} onMouseMove={this.handleHover}>
          {this.props.images.map((img, i) => {
            return img && img.asset && (
              <div
                key={`MultImage-${i}-${imageId}-${img.alt}`}
                className={cn(styles.MultiImage, isActive(i + 1, imageId) && styles.active)}
              >
                <Img fluid={img.asset.fluid} alt={img.alt} />
              </div>
            )
          })}
        </div>
      </>
    )
  }
}

MultiImage.defaultProps = {
  skipAmount: 8
}
