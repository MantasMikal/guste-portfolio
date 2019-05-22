import React, { Component } from 'react'
import Img from './image'

export default class MultiImage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentImageIdx: 0,
      mouseMoveSkip: 8, // Skips pixels for image swaping
      initialSkip: 8
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
        mouseMoveSkip: this.state.initialSkip
      })
    }
  }

  render () {
    const image = this.props.images ? this.props.images[this.state.currentImageIdx] : null
    const fluid = image && image.asset && image.asset.fluid ? image.asset.fluid : null
    const alt = image.alt ? image.alt : 'Image'

    return (
      <>
        <div onMouseMove={this.handleHover}>
          <Img fluid={fluid} alt={alt} />
        </div>
      </>
    )
  }
}
