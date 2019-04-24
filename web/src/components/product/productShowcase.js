import React, { Component } from 'react'
import ImageWithModal from '../image/imageWithModal'
import Image from '../image/image'
import ProductImageGrid from './productImageGrid'

export default class ProductShowcase extends Component {
  constructor(props) {
    super(props)

    this.state = {
       currentImage: this.props.images[0]
    }
  }



  handleClick = (e) => {
    //e.preventDefault()
    console.log('O: ', e.target.attributes.imgid.value)
    const newImageIdx = e.target.attributes.imgid.value

    this.setState({
      currentImage: this.props.images[newImageIdx]
    })

    console.log(this.state)
  }

  render() {

    return (
      <div>
          <ImageWithModal image={this.state.currentImage.asset.fluid} alt={this.props.alt}></ImageWithModal>
        <ProductImageGrid images={this.props.images} handleClick={this.handleClick}></ProductImageGrid>
      </div>
    )
  }
}
