import React, { Component } from 'react'
import Modal from '../modal/modal'
import Img from 'gatsby-image'
import { cn } from '../../lib/helpers'
import styles from './imageWithModal.module.css'

export default class ModalImage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   // console.log(this.state.modalIsOpen, nextState.modalIsOpen)
  //   if (this.state.modalIsOpen === nextState.modalIsOpen) {
  //     console.log('NO UPDATE FOR YOU')
  //     console.log('Prev: ', this.state)
  //     console.log("Next: ", nextState)
  //     return false
  //   } else {
  //     console.log('UPDATE')
  //     return true
  //   }
  // }

  openModal () {
    this.setState({ modalIsOpen: true })
  }

  closeModal () {
    this.setState({ modalIsOpen: false })
  }
  // It is possbile to optimize this by using css to place image on click and add Overlay
  render () {
    const fluid = this.props.fluid ? this.props.fluid : ''
    const caption = this.props.caption ? this.props.caption : 'Image '
    const hasBorder = this.props.hasBorder
    return (
      <>
        <div onClick={this.openModal} className={ hasBorder ? cn(styles.Overlay, styles.border) : styles.Overlay} >
          <Img fluid={fluid} alt={caption} className={styles.hoverEffect} />
        </div>

        <Modal isOpen={this.state.modalIsOpen} closeModal={this.closeModal}>
          <div className={styles.wrapper}>
            <Img fluid={fluid} alt={caption} className={styles.zoomedImage} />
          </div>
        </Modal>
      </>
    )
  }
}
