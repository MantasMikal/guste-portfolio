import React, { Component } from 'react'
import styles from './multiImage.module.css'
import Img from 'gatsby-image'

export default class MultiImage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentImageIdx: 0,
      mouseMoveSkip: 8, // Skips pixels for image swaping
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
    const skipAmount = this.props.skipAmount ? this.props.skipAmount : 8 // How much pixels to go trough to change image
    this.setState({
      mouseMoveSkip: this.state.mouseMoveSkip - 1
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
    return (
      <>
        <div onMouseMove={this.handleHover}>
          {
            this.props.images.map((item, i) => {
              if (this.state.currentImageIdx === i) {
                const fluid = item.asset && item.asset.fluid ? item.asset.fluid : null
                const alt = item.alt ? item.alt : ''
                return (
                  <Img key={item.asset.id} className={[styles.multiImage, styles.active].join('')} fluid={fluid} alt={alt} />
                )
              }
              // else {
              //   const fluid = item.asset && item.asset.fluid ? item.asset.fluid : null
              //   const alt = item.alt ? item.alt : 'Image'
              //   return (
              //     <Img key={item.asset.id}  className={styles.multiImage} fluid={fluid} alt={alt} fadeIn={false} />
              //   )
              // }
            })
          }
        </div>
      </>
    )
  }
}
